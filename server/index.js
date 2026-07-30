// store.js
// AirVantage's Alert API has no concept of "who ran this" or a campaign
// log — it only knows about rules, hooks, and alert firings. This is a
// minimal local store that pairs each AirVantage rule with the Product
// context around it: who set it up, in plain words what it targets, and
// when.
//
// It's a flat JSON file, which is plenty for an internal tool used by a
// small team. If this grows past a handful of concurrent editors, swap
// this for a real database — the interface (list/get/upsert/remove)
// stays the same either way.

const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "..", "data", "campaigns.json");

function ensureFile() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, "[]", "utf8");
}

function readAll() {
  ensureFile();
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
  } catch {
    return [];
  }
}

function writeAll(records) {
  ensureFile();
  fs.writeFileSync(DB_PATH, JSON.stringify(records, null, 2), "utf8");
}

function list() {
  return readAll();
}

function getByRuleId(ruleId) {
  return readAll().find((c) => String(c.ruleId) === String(ruleId)) || null;
}

function upsert(record) {
  const all = readAll();
  const idx = all.findIndex((c) => String(c.ruleId) === String(record.ruleId));
  if (idx >= 0) {
    all[idx] = { ...all[idx], ...record, updatedAt: Date.now() };
  } else {
    all.push({ ...record, createdAt: Date.now(), updatedAt: Date.now() });
  }
  writeAll(all);
  return getByRuleId(record.ruleId);
}

function remove(ruleId) {
  const all = readAll().filter((c) => String(c.ruleId) !== String(ruleId));
  writeAll(all);
}

module.exports = { list, getByRuleId, upsert, remove };
