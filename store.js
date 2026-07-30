<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Notifications</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css" />
</head>
<body>
  <div class="shell">
    <aside class="sidebar">
      <div class="workspace">
        <span class="workspace-mark">🪐</span>
        <span class="workspace-name">Product</span>
      </div>
      <nav class="side-nav">
        <button class="side-link is-active" data-view="notifications">
          <span class="side-icon">📋</span> Notifications
        </button>
        <button class="side-link" data-view="current">
          <span class="side-icon">🟢</span> Live status
        </button>
        <button class="side-link" data-view="history">
          <span class="side-icon">🕐</span> Raw history
        </button>
      </nav>
      <div class="side-foot">
        <span class="conn-dot" id="connDot"></span> AirVantage
      </div>
    </aside>

    <main class="stage">
      <!-- NOTIFICATIONS DATABASE -->
      <section class="view" id="view-notifications">
        <header class="page-head">
          <div class="page-title"><span class="page-emoji">📋</span> Notifications</div>
          <p class="page-sub">Every alert rule Product has set up — who ran it, what it targets, and how many customers it's reached.</p>
        </header>

        <div class="toolbar">
          <button class="btn btn-dark" id="newRuleBtn">+ New</button>
        </div>

        <div class="db">
          <div class="db-row db-head">
            <div class="col col-name">Name</div>
            <div class="col col-status">Status</div>
            <div class="col col-reached">Reached</div>
            <div class="col col-owner">Responsible</div>
            <div class="col col-date">Sent</div>
            <div class="col col-criteria">Criteria</div>
          </div>
          <div id="rulesBody">
            <div class="db-row"><div class="empty-row">Loading…</div></div>
          </div>
        </div>
      </section>

      <!-- LIVE STATUS -->
      <section class="view is-hidden" id="view-current">
        <header class="page-head">
          <div class="page-title"><span class="page-emoji">🟢</span> Live status</div>
          <p class="page-sub">Current state of every stateful rule, straight from AirVantage.</p>
        </header>
        <div class="toolbar">
          <button class="btn btn-light" id="refreshCurrentBtn">Refresh</button>
        </div>
        <div class="db plain-list" id="currentBody">
          <div class="db-row"><div class="empty-row">Loading…</div></div>
        </div>
      </section>

      <!-- RAW HISTORY -->
      <section class="view is-hidden" id="view-history">
        <header class="page-head">
          <div class="page-title"><span class="page-emoji">🕐</span> Raw history</div>
          <p class="page-sub">Every alert AirVantage fired in a date range.</p>
        </header>
        <form class="toolbar date-range" id="historyForm">
          <input type="date" id="historyFrom" required />
          <span>→</span>
          <input type="date" id="historyTo" required />
          <button class="btn btn-light" type="submit">Search</button>
        </form>
        <div class="db plain-list" id="historyBody">
          <div class="db-row"><div class="empty-row">Pick a date range to search.</div></div>
        </div>
      </section>
    </main>
  </div>

  <!-- NOTIFICATION PAGE (composer / editor) -->
  <div class="page-overlay is-hidden" id="drawerBackdrop">
    <aside class="page-panel">
      <header class="panel-topbar">
        <span class="crumb">Notifications / <strong id="crumbTitle">New</strong></span>
        <button class="icon-btn" id="closeDrawerBtn" aria-label="Close">×</button>
      </header>

      <form class="panel-body" id="ruleForm">
        <input type="hidden" id="ruleId" />

        <div class="page-icon-title">
          <span class="page-icon">📣</span>
          <input type="text" id="f-name" class="title-input" required placeholder="Untitled notification" />
        </div>

        <div class="props">
          <div class="prop-row">
            <span class="prop-label">🚦 Status</span>
            <label class="prop-value toggle-wrap">
              <input type="checkbox" id="f-active" checked />
              <span class="toggle"></span>
              <span id="statusText">Active</span>
            </label>
          </div>
          <div class="prop-row">
            <span class="prop-label">👤 Responsible</span>
            <input type="text" id="f-responsible" class="prop-input" required placeholder="Your name" />
          </div>
          <div class="prop-row">
            <span class="prop-label">🎯 Target</span>
            <select id="f-targetType" class="prop-input">
              <option value="SYSTEM">SYSTEM</option>
              <option value="__custom">Other…</option>
            </select>
          </div>
          <div class="prop-row" id="targetTypeCustomRow" style="display:none">
            <span class="prop-label"></span>
            <input type="text" id="f-targetType-custom" class="prop-input" placeholder="Custom target type" />
          </div>
          <div class="prop-row">
            <span class="prop-label">🔔 Notify</span>
            <select id="f-notifMode" class="prop-input">
              <option value="WHEN_STATE_CHANGES">When state changes</option>
              <option value="EVERY_TIME">Every time</option>
              <option value="WHEN_STATE_TRUE">When it becomes true</option>
              <option value="WHEN_STATE_FALSE">When it becomes false</option>
              <option value="IN_ALL_CASES">In all cases</option>
            </select>
          </div>
          <div class="prop-row">
            <span class="prop-label">🔁 Stateful</span>
            <label class="prop-value toggle-wrap">
              <input type="checkbox" id="f-stateful" checked />
              <span class="toggle"></span>
              <span id="statefulText">Tracks on/off</span>
            </label>
          </div>
          <div class="prop-row">
            <span class="prop-label">✉️ Emails</span>
            <input type="text" id="f-emails" class="prop-input" placeholder="growth@company.com, csm@company.com" />
          </div>
        </div>

        <label class="block-label" for="f-message">Message</label>
        <textarea id="f-message" class="block-textarea" rows="2" required placeholder="What the notification says to the customer or team"></textarea>

        <div class="section">
          <div class="section-head">
            <span>Criteria</span>
            <button type="button" class="link-btn" id="addConditionBtn">+ Add a condition</button>
          </div>
          <p class="hint">Fires when <strong>all</strong> of these are true for a customer's system.</p>
          <div id="conditionsList"></div>
        </div>

        <div class="section" id="reachedSection" style="display:none">
          <div class="section-head"><span>Results</span></div>
          <div class="stat-row">
            <div class="stat"><div class="stat-num" id="statReached">—</div><div class="stat-label">customers reached</div></div>
            <div class="stat"><div class="stat-num" id="statSent">—</div><div class="stat-label">sent</div></div>
          </div>
        </div>

        <div class="section">
          <div class="section-head">
            <span>Webhooks</span>
            <button type="button" class="link-btn" id="manageHooksInlineBtn" style="display:none">Manage</button>
          </div>
          <p class="hint">Save this notification first to attach webhooks.</p>
        </div>

        <div class="panel-actions">
          <button type="button" class="btn btn-danger-text" id="deleteRuleBtn" style="display:none">Delete</button>
          <div class="spacer"></div>
          <button type="submit" class="btn btn-dark">Run notification</button>
        </div>
      </form>
    </aside>
  </div>

  <!-- HOOKS PAGE -->
  <div class="page-overlay is-hidden" id="hooksBackdrop">
    <aside class="page-panel page-panel-narrow">
      <header class="panel-topbar">
        <span class="crumb">Webhooks</span>
        <button class="icon-btn" id="closeHooksBtn" aria-label="Close">×</button>
      </header>
      <div class="panel-body">
        <p class="hint">HTTP callbacks fired when this rule triggers.</p>
        <form id="hookForm" class="hook-form">
          <input type="url" id="f-hookUrl" placeholder="https://your-system.com/webhook" required />
          <button class="btn btn-dark btn-sm" type="submit">Add</button>
        </form>
        <ul class="hook-list" id="hookList"></ul>
      </div>
    </aside>
  </div>

  <div class="toast" id="toast"></div>

  <script src="app.js"></script>
</body>
</html>
