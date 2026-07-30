// airvantageClient.js
// Thin wrapper around AirVantage's OAuth2 token endpoint + Alert API.
// Docs:
//   Auth:  https://doc.airvantage.net/av/reference/cloud/API/
//   Alert: https://openapi.airvantage.io/specs/av-alert-v1.yaml

const AUTH_BASE = process.env.AV_AUTH_BASE || `https://${process.env.AV_ENV}.airvantage.net`;
const API_BASE = process.env.AV_API_BASE || `https://${process.env.AV_ENV}.airvantage.io`;
const CLIENT_ID = process.env.AV_CLIENT_ID;
const CLIENT_SECRET = process.env.AV_CLIENT_SECRET;
const DEFAULT_COMPANY_ID = process.env.AV_COMPANY_ID;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.warn(
    "[airvantageClient] AV_CLIENT_ID / AV_CLIENT_SECRET are not set. " +
      "Copy .env.example to .env and fill in an AirVantage API Client " +
      "configured with the Client Credentials grant."
  );
}

// In-memory token cache. Fine for a single-instance internal tool;
// swap for a shared cache (Redis) if you ever run multiple instances.
let tokenCache = { accessToken: null, expiresAt: 0 };

async function getAccessToken() {
  const now = Date.now();
  // Refresh 60s before actual expiry to avoid races mid-request.
  if (tokenCache.accessToken && now < tokenCache.expiresAt - 60_000) {
    return tokenCache.accessToken;
  }

  const res = await fetch(`${AUTH_BASE}/api/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `AirVantage token request failed (${res.status}): ${body || res.statusText}`
    );
  }

  const data = await res.json();
  tokenCache = {
    accessToken: data.access_token,
    expiresAt: now + (data.expires_in ? data.expires_in * 1000 : 0),
  };
  return tokenCache.accessToken;
}

/**
 * Low-level call to the AirVantage Alert API.
 * @param {string} method HTTP verb
 * @param {string} path e.g. "/api/v2/alertrules"
 * @param {object} [opts]
 * @param {object} [opts.query] query params (companyId defaults in automatically)
 * @param {object} [opts.body] JSON body
 */
async function avRequest(method, path, opts = {}) {
  const token = await getAccessToken();

  const query = { company: DEFAULT_COMPANY_ID, ...opts.query };
  const qs = new URLSearchParams(
    Object.fromEntries(
      Object.entries(query).filter(([, v]) => v !== undefined && v !== null && v !== "")
    )
  ).toString();

  const url = `${API_BASE}${path}${qs ? `?${qs}` : ""}`;

  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const err = new Error(data?.error || `AirVantage API error (${res.status})`);
    err.status = res.status;
    err.details = data;
    throw err;
  }

  return data;
}

// ---- Alert rules ----
const listAlertRules = () => avRequest("GET", "/api/v2/alertrules");
const getAlertRule = (ruleId) => avRequest("GET", `/api/v2/alertrules/${ruleId}`);
const createAlertRule = (rule) => avRequest("POST", "/api/v2/alertrules", { body: rule });
const updateAlertRule = (ruleId, rule) =>
  avRequest("PUT", `/api/v2/alertrules/${ruleId}`, { body: rule });
const deleteAlertRule = (ruleId) => avRequest("DELETE", `/api/v2/alertrules/${ruleId}`);

// ---- Notification hooks ----
const listHooks = (ruleId) => avRequest("GET", `/api/v1/alerts/rules/${ruleId}/hooks`);
const createHook = (ruleId, hook) =>
  avRequest("POST", `/api/v1/alerts/rules/${ruleId}/hooks`, { body: hook });
const deleteHook = (ruleId, hookId) =>
  avRequest("DELETE", `/api/v1/alerts/rules/${ruleId}/hooks/${hookId}`);

// ---- Alerts ----
const getCurrentAlerts = (query) => avRequest("GET", "/api/v3/alerts/current", { query });
const getAlertHistory = (query) => avRequest("GET", "/api/v3/alerts/history", { query });

/**
 * Best-effort count of distinct customers/systems a given rule has fired
 * for, since a given timestamp. NOTE: the Alert API spec excerpt we have
 * doesn't document a dedicated `ruleId` filter param on /alerts/history,
 * so this fetches history for the date range and filters client-side.
 * If AirVantage does support a ruleId query param, swap this to pass it
 * directly for efficiency once confirmed.
 */
async function getReachedCount(ruleId, sinceTs) {
  try {
    const data = await getAlertHistory({
      from: sinceTs || 0,
      to: Date.now(),
    });
    const items = data?.items || [];
    const matching = items.filter((a) => String(a.ruleId) === String(ruleId));
    const distinctTargets = new Set(matching.map((a) => a.targetId));
    return distinctTargets.size;
  } catch {
    return null; // surfaced as "—" in the UI rather than breaking the page
  }
}

module.exports = {
  listAlertRules,
  getAlertRule,
  createAlertRule,
  updateAlertRule,
  deleteAlertRule,
  listHooks,
  createHook,
  deleteHook,
  getCurrentAlerts,
  getAlertHistory,
  getReachedCount,
};
