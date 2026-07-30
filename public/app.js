:root {
  --bg: #ffffff;
  --sidebar-bg: #fbfbfa;
  --border: rgba(55,53,47,0.09);
  --border-strong: rgba(55,53,47,0.16);
  --text: #37352f;
  --text-muted: rgba(55,53,47,0.65);
  --text-faint: rgba(55,53,47,0.45);
  --hover: rgba(55,53,47,0.055);
  --blue: #2383e2;
  --blue-tint: #e7f3fe;
  --gray-tag-bg: #f1f1ef; --gray-tag-fg: #787774;
  --green-tag-bg: #edf3ec; --green-tag-fg: #448361;
  --yellow-tag-bg: #fbf3db; --yellow-tag-fg: #a17c1f;
  --orange-tag-bg: #fbecdd; --orange-tag-fg: #cb7b37;
  --red-tag-bg: #fdebec; --red-tag-fg: #d44c47;
  --purple-tag-bg: #f6f3f9; --purple-tag-fg: #9065b0;
  --font: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --mono: "IBM Plex Mono", monospace;
  --radius: 6px;
  --radius-md: 8px;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font);
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}

.shell { display: grid; grid-template-columns: 232px 1fr; min-height: 100vh; }

/* ---------- Sidebar ---------- */
.sidebar {
  background: var(--sidebar-bg);
  border-right: 1px solid var(--border);
  padding: 18px 10px;
  display: flex; flex-direction: column;
  position: sticky; top: 0; height: 100vh;
}
.workspace { display: flex; align-items: center; gap: 8px; padding: 6px 8px 16px; }
.workspace-mark { font-size: 17px; }
.workspace-name { font-weight: 600; font-size: 14px; color: var(--text); }
.side-nav { display: flex; flex-direction: column; gap: 1px; }
.side-link {
  all: unset; cursor: pointer; display: flex; align-items: center; gap: 8px;
  padding: 6px 8px; border-radius: var(--radius); font-size: 14px;
  color: var(--text-muted); width: 100%;
}
.side-icon { font-size: 15px; width: 18px; text-align: center; }
.side-link:hover { background: var(--hover); color: var(--text); }
.side-link.is-active { background: var(--hover); color: var(--text); font-weight: 500; }
.side-foot {
  margin-top: auto; display: flex; align-items: center; gap: 6px;
  padding: 8px; font-size: 12px; color: var(--text-faint);
}
.conn-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--red-tag-fg); }
.conn-dot.is-live { background: var(--green-tag-fg); }

/* ---------- Stage / page ---------- */
.stage { padding: 48px 64px; max-width: 980px; }
.view.is-hidden { display: none; }
.page-head { margin-bottom: 22px; }
.page-title { font-size: 28px; font-weight: 700; letter-spacing: -0.01em; display: flex; align-items: center; gap: 10px; }
.page-emoji { font-size: 26px; }
.page-sub { color: var(--text-muted); margin: 8px 0 0; font-size: 14px; max-width: 60ch; }

.toolbar { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
.date-range { gap: 8px; }
.date-range input {
  border: 1px solid var(--border-strong); border-radius: var(--radius);
  padding: 7px 10px; font-family: var(--font); font-size: 13px; background: var(--bg);
}

/* ---------- Buttons ---------- */
.btn {
  font-family: var(--font); font-weight: 500; font-size: 13.5px;
  border-radius: var(--radius-md); padding: 6px 12px; border: 1px solid transparent;
  cursor: pointer; transition: background 0.12s, border-color 0.12s;
}
.btn-dark { background: var(--text); color: #fff; }
.btn-dark:hover { background: #2b2924; }
.btn-light { background: var(--bg); color: var(--text); border-color: var(--border-strong); }
.btn-light:hover { background: var(--hover); }
.btn-sm { padding: 5px 10px; font-size: 12.5px; }
.btn-danger-text { background: none; color: var(--red-tag-fg); border: none; padding: 6px 4px; }
.btn-danger-text:hover { text-decoration: underline; }
.link-btn {
  all: unset; cursor: pointer; color: var(--text-faint); font-size: 13px;
  padding: 3px 6px; border-radius: 4px;
}
.link-btn:hover { background: var(--hover); color: var(--text); }
.icon-btn {
  all: unset; cursor: pointer; font-size: 18px; line-height: 1;
  color: var(--text-faint); padding: 4px 8px; border-radius: 4px;
}
.icon-btn:hover { background: var(--hover); }

/* ---------- Database table ---------- */
.db { border-top: 1px solid var(--border); }
.db-row {
  display: grid;
  grid-template-columns: 2fr 1fr 0.8fr 1.2fr 1fr 2fr;
  gap: 8px;
  align-items: center;
  padding: 8px 6px;
  border-bottom: 1px solid var(--border);
  cursor: pointer;
}
.db-row.db-head { cursor: default; font-size: 12px; color: var(--text-faint); font-weight: 500; text-transform: uppercase; letter-spacing: 0.02em; padding-bottom: 6px; }
.db-row:not(.db-head):hover { background: var(--hover); }
.col { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.col-name { display: flex; align-items: center; gap: 8px; font-weight: 500; white-space: normal; }
.name-emoji { font-size: 14px; }
.col-criteria { color: var(--text-muted); font-family: var(--mono); font-size: 12px; white-space: normal; }
.col-date { color: var(--text-faint); font-size: 12.5px; }
.col-reached { font-variant-numeric: tabular-nums; color: var(--text); }
.owner { display: flex; align-items: center; gap: 6px; font-size: 13px; }
.avatar {
  width: 20px; height: 20px; border-radius: 50%; background: var(--purple-tag-bg);
  color: var(--purple-tag-fg); font-size: 10px; font-weight: 700;
  display: flex; align-items: center; justify-content: center; flex: none;
}
.empty-row { color: var(--text-faint); font-style: italic; padding: 24px 8px; grid-column: 1 / -1; text-align: center; }

.tag {
  display: inline-flex; align-items: center; font-weight: 500; font-size: 12px;
  padding: 2px 8px; border-radius: 4px;
}
.tag.status-active { background: var(--green-tag-bg); color: var(--green-tag-fg); }
.tag.status-paused { background: var(--gray-tag-bg); color: var(--gray-tag-fg); }
.tag.true { background: var(--orange-tag-bg); color: var(--orange-tag-fg); }
.tag.false { background: var(--green-tag-bg); color: var(--green-tag-fg); }

/* plain-list variant used by Live status / Raw history (no fixed columns) */
.plain-list .db-row { grid-template-columns: 1fr auto auto; cursor: default; }
.plain-list .db-row:hover { background: transparent; }

/* ---------- Page overlay (Notion-style page peek) ---------- */
.page-overlay {
  position: fixed; inset: 0; background: rgba(15,15,15,0.45);
  display: flex; justify-content: flex-end; z-index: 40;
}
.page-overlay.is-hidden { display: none; }
.page-panel {
  width: 640px; max-width: 94vw; background: var(--bg);
  height: 100vh; overflow-y: auto; box-shadow: -8px 0 32px rgba(0,0,0,0.12);
  display: flex; flex-direction: column;
}
.page-panel-narrow { width: 440px; }
.panel-topbar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 14px 24px; border-bottom: 1px solid var(--border);
  position: sticky; top: 0; background: var(--bg); z-index: 1;
}
.crumb { font-size: 13px; color: var(--text-faint); }
.crumb strong { color: var(--text); font-weight: 500; }
.panel-body { padding: 12px 64px 60px; display: flex; flex-direction: column; gap: 4px; flex: 1; }

.page-icon-title { display: flex; align-items: center; gap: 12px; margin: 24px 0 18px; }
.page-icon { font-size: 40px; }
.title-input {
  border: none; outline: none; font-size: 30px; font-weight: 700;
  font-family: var(--font); color: var(--text); flex: 1; padding: 4px 0;
  background: transparent;
}
.title-input::placeholder { color: var(--text-faint); }

.props { display: flex; flex-direction: column; margin-bottom: 20px; }
.prop-row {
  display: grid; grid-template-columns: 140px 1fr; align-items: center;
  padding: 5px 4px; border-radius: 4px;
}
.prop-row:hover { background: var(--hover); }
.prop-label { font-size: 13px; color: var(--text-faint); display: flex; align-items: center; gap: 6px; }
.prop-input, .prop-row select {
  border: none; background: transparent; font-family: var(--font); font-size: 14px;
  color: var(--text); padding: 4px 6px; border-radius: 4px; width: 100%;
}
.prop-input:hover, select.prop-input:hover { background: var(--hover); }
.prop-input:focus, select.prop-input:focus { outline: 1px solid var(--border-strong); background: var(--bg); }

.toggle-wrap { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 13.5px; color: var(--text-muted); }
.toggle-wrap input { display: none; }
.toggle {
  width: 30px; height: 17px; border-radius: 100px; background: var(--border-strong);
  position: relative; transition: background 0.15s; flex: none;
}
.toggle::after {
  content: ""; position: absolute; top: 2px; left: 2px; width: 13px; height: 13px;
  border-radius: 50%; background: #fff; transition: transform 0.15s;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
}
.toggle-wrap input:checked + .toggle { background: var(--green-tag-fg); }
.toggle-wrap input:checked + .toggle::after { transform: translateX(13px); }

.block-label { font-size: 13px; color: var(--text-faint); margin: 10px 4px 4px; }
.block-textarea {
  border: 1px solid var(--border); border-radius: var(--radius-md);
  font-family: var(--font); font-size: 14px; padding: 10px 12px; resize: vertical;
  background: var(--bg); color: var(--text);
}
.block-textarea:focus { outline: 1px solid var(--border-strong); }

.section { margin-top: 22px; padding-top: 14px; border-top: 1px solid var(--border); }
.section-head { display: flex; justify-content: space-between; align-items: center; }
.section-head > span { font-size: 13px; font-weight: 600; color: var(--text); }
.hint { font-size: 12.5px; color: var(--text-faint); margin: 4px 0 10px; }
.hint em { font-style: normal; }

.condition-row {
  display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: 6px;
  align-items: center; padding: 6px 0;
}
.condition-row input, .condition-row select {
  font-size: 12.5px; padding: 7px 9px; border: 1px solid var(--border);
  border-radius: var(--radius); background: var(--sidebar-bg); font-family: var(--mono);
  color: var(--text);
}
.condition-remove { all: unset; cursor: pointer; color: var(--red-tag-fg); font-size: 15px; padding: 4px; }

.stat-row { display: flex; gap: 32px; padding: 6px 4px 4px; }
.stat-num { font-size: 26px; font-weight: 700; }
.stat-label { font-size: 12px; color: var(--text-faint); margin-top: 2px; }

.panel-actions {
  display: flex; align-items: center; gap: 10px; margin-top: 28px;
  padding-top: 16px; border-top: 1px solid var(--border);
}
.spacer { flex: 1; }

.hook-form { display: flex; gap: 8px; margin: 8px 0 14px; }
.hook-form input {
  flex: 1; font-family: var(--mono); font-size: 13px; padding: 8px 10px;
  border: 1px solid var(--border); border-radius: var(--radius); background: var(--sidebar-bg);
}
.hook-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 6px; }
.hook-list li {
  display: flex; justify-content: space-between; align-items: center;
  border: 1px solid var(--border); border-radius: var(--radius); padding: 8px 10px;
  font-family: var(--mono); font-size: 12px; word-break: break-all; background: var(--sidebar-bg);
}

.toast {
  position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%) translateY(20px);
  background: var(--text); color: #fff; padding: 10px 18px;
  border-radius: var(--radius-md); font-size: 13px; opacity: 0; pointer-events: none;
  transition: opacity 0.2s, transform 0.2s; z-index: 100;
}
.toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
.toast.error { background: var(--red-tag-fg); }

@media (max-width: 760px) {
  .shell { grid-template-columns: 1fr; }
  .sidebar { position: relative; height: auto; flex-direction: row; align-items: center; }
  .side-nav { flex-direction: row; }
  .side-foot { display: none; }
  .stage { padding: 24px; }
  .db-row { grid-template-columns: 1fr; gap: 2px; }
  .panel-body { padding: 12px 20px 40px; }
}
