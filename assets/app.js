/* Amazon Prep — shared page logic */

/* ---------- countdown to the hiring-event window ---------- */
(function countdown() {
  const el = document.querySelector("[data-countdown]");
  if (!el) return;
  const start = new Date(2026, 7, 13); // 13 Aug 2026
  const end = new Date(2026, 7, 18, 23, 59);
  const now = new Date();
  const day = 24 * 60 * 60 * 1000;
  if (now > end) { el.textContent = "hiring event window has passed"; return; }
  const days = Math.ceil((start - now) / day);
  el.textContent = days > 0
    ? days + (days === 1 ? " day" : " days") + " to the 13–18 Aug window"
    : "hiring event window is live (13–18 Aug)";
})();

/* ---------- mark active nav link ---------- */
(function navActive() {
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navlinks a").forEach(a => {
    if (a.getAttribute("href") === here) a.classList.add("active");
  });
})();

/* ---------- helpers ---------- */
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const practiceUrl = r => r.slug
  ? "https://leetcode.com/problems/" + r.slug + "/"
  : "https://duckduckgo.com/?q=" + encodeURIComponent(r.search || r.q);

/* Verified against leetcode.com/api/problems/all on 10 Aug 2026:
   all slugs on this site resolve; these six sit behind LeetCode Premium. */
const LC_PREMIUM = new Set([
  "logger-rate-limiter", "design-hit-counter", "meeting-rooms-ii",
  "alien-dictionary", "design-in-memory-file-system", "design-search-autocomplete-system"
]);

function practiceCell(r) {
  const label = r.slug ? "LeetCode ↗" : "Search ↗";
  const lock = r.slug && LC_PREMIUM.has(r.slug)
    ? '<span class="lock" title="LeetCode Premium — find it on GeeksforGeeks or a mirror instead">Premium</span>' : "";
  return `<a href="${practiceUrl(r)}" target="_blank" rel="noopener">${label}</a>${lock}`;
}

const verdictPill = v =>
  v === "Selected" ? '<span class="pill green">✓ Selected</span>'
  : v === "Rejected" ? '<span class="pill red">✕ Rejected</span>'
  : '<span class="pill">outcome not stated</span>';

const diffPill = d =>
  d === "Easy" ? '<span class="pill green">Easy</span>'
  : d === "Medium" ? '<span class="pill orange">Medium</span>'
  : d === "Hard" ? '<span class="pill red">Hard</span>'
  : '<span class="pill">—</span>';

/* ================================================================
   EXPERIENCES PAGE
================================================================ */
function renderExperiences() {
  const root = document.getElementById("exp-root");
  const nav = document.getElementById("exp-nav");
  if (!root) return;

  root.innerHTML = EXPERIENCES.map(e => `
    <article class="exp" id="${e.id}" data-era="${e.era}" data-level="${e.level}"
             data-text="${esc((e.title + " " + e.tags.join(" ") + " " + e.loc + " " + e.html).toLowerCase())}">
      <header class="exp-head">
        <h2>${esc(e.title)}</h2>
        <div class="pills">
          <span class="pill blue">${esc(e.level)}</span>
          <span class="pill">${esc(e.loc)}</span>
          <span class="pill">${esc(e.when)}</span>
          ${verdictPill(e.verdict)}
          ${e.era === "2026" ? '<span class="pill orange">2026</span>' : ""}
          ${e.tags.map(t => `<span class="pill">${esc(t)}</span>`).join("")}
        </div>
        <a class="src" href="${e.source.url}" target="_blank" rel="noopener">↗ ${esc(e.source.name)}</a>
        ${e.why ? `<p style="margin:10px 0 0;color:var(--text-dim);font-size:13.5px"><b style="color:var(--accent)">Why it's here:</b> ${esc(e.why)}</p>` : ""}
      </header>
      <div class="exp-body">${e.html}</div>
    </article>
  `).join("");

  if (nav) {
    nav.innerHTML =
      '<h3>Experiences</h3>' +
      EXPERIENCES.map(e => `<a href="#${e.id}">${esc(e.title.replace("Amazon ", ""))}</a>`).join("");
  }

  // filters
  const q = document.getElementById("exp-search");
  const lvl = document.getElementById("exp-level");
  const only26 = document.getElementById("exp-2026");
  let recentOnly = false;

  function apply() {
    const term = (q?.value || "").trim().toLowerCase();
    const level = lvl?.value || "all";
    let shown = 0;
    root.querySelectorAll(".exp").forEach(card => {
      const okText = !term || card.dataset.text.includes(term);
      const okLvl = level === "all" || card.dataset.level === level;
      const okEra = !recentOnly || card.dataset.era !== "older";
      const ok = okText && okLvl && okEra;
      card.classList.toggle("hidden", !ok);
      if (ok) shown++;
    });
    document.getElementById("exp-count").textContent =
      shown + " of " + EXPERIENCES.length + " experiences";
  }

  q?.addEventListener("input", apply);
  lvl?.addEventListener("change", apply);
  only26?.addEventListener("click", () => {
    recentOnly = !recentOnly;
    only26.classList.toggle("on", recentOnly);
    apply();
  });
  apply();
  scrollSpy("#exp-nav a", ".exp");
}

/* ================================================================
   QUESTIONS PAGE
================================================================ */
const STORE = "amazonPrepDone.v1";
const loadDone = () => { try { return new Set(JSON.parse(localStorage.getItem(STORE) || "[]")); } catch { return new Set(); } };
const saveDone = s => localStorage.setItem(STORE, JSON.stringify([...s]));

function renderQuestions() {
  const root = document.getElementById("q-root");
  const nav = document.getElementById("q-nav");
  if (!root) return;

  const done = loadDone();
  let total = 0;

  root.innerHTML = QUESTION_GROUPS.map(g => {
    const rows = g.rows.map((r, i) => {
      const key = g.id + "::" + r.q;
      total++;
      return `
        <tr data-key="${esc(key)}" class="${done.has(key) ? "done" : ""}"
            data-text="${esc((r.q + " " + r.topic + " " + (r.note || "") + " " + r.src.name).toLowerCase())}"
            data-diff="${esc(r.diff)}">
          <td class="col-chk"><input type="checkbox" ${done.has(key) ? "checked" : ""}></td>
          <td>
            <span class="qname">${esc(r.q)}</span>
            ${r.note ? `<span class="qnote">${esc(r.note)}</span>` : ""}
          </td>
          <td class="col-topic"><span class="pill">${esc(r.topic)}</span></td>
          <td class="col-diff">${diffPill(r.diff)}</td>
          <td class="col-src"><a href="${r.src.url}" target="_blank" rel="noopener">${esc(r.src.name)} ↗</a></td>
          <td class="col-link">${practiceCell(r)}</td>
        </tr>`;
    }).join("");

    return `
      <section class="qgroup" id="${g.id}">
        <h2>${esc(g.title)} <span class="pill orange">${g.rows.length}</span></h2>
        <p class="sub">${esc(g.sub)}</p>
        <table class="qtable">
          <thead><tr>
            <th class="col-chk"></th><th>Question</th><th class="col-topic">Topic</th>
            <th class="col-diff">Level</th><th class="col-src">Reported in</th><th class="col-link">Practise</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>
        <p class="empty hidden">Nothing matches the current filter in this section.</p>
      </section>`;
  }).join("") + renderLP();

  if (nav) {
    nav.innerHTML =
      '<h3>Rounds</h3>' +
      QUESTION_GROUPS.map(g => `<a href="#${g.id}">${esc(g.title)}</a>`).join("") +
      '<h3>Behavioural</h3><a href="#g-lp-reported">Reported LP questions</a><a href="#g-lp-bank">All 16 Leadership Principles</a>';
  }

  // checkbox persistence
  root.addEventListener("change", e => {
    if (e.target.type !== "checkbox") return;
    const tr = e.target.closest("tr");
    const key = tr.dataset.key;
    if (e.target.checked) done.add(key); else done.delete(key);
    tr.classList.toggle("done", e.target.checked);
    saveDone(done);
    updateProgress(total, done.size);
  });

  document.getElementById("q-reset")?.addEventListener("click", () => {
    done.clear(); saveDone(done);
    root.querySelectorAll("tr[data-key]").forEach(tr => {
      tr.classList.remove("done");
      tr.querySelector("input").checked = false;
    });
    updateProgress(total, 0);
  });

  // filters
  const q = document.getElementById("q-search");
  const diff = document.getElementById("q-diff");
  const hide = document.getElementById("q-hide-done");
  let hideDone = false;

  function apply() {
    const term = (q?.value || "").trim().toLowerCase();
    const d = diff?.value || "all";
    root.querySelectorAll(".qgroup").forEach(sec => {
      let shown = 0;
      sec.querySelectorAll("tr[data-key]").forEach(tr => {
        const ok = (!term || tr.dataset.text.includes(term))
          && (d === "all" || tr.dataset.diff === d)
          && (!hideDone || !tr.classList.contains("done"));
        tr.classList.toggle("hidden", !ok);
        if (ok) shown++;
      });
      const tbl = sec.querySelector(".qtable");
      const empty = sec.querySelector(".empty");
      if (tbl && empty) { tbl.classList.toggle("hidden", shown === 0); empty.classList.toggle("hidden", shown !== 0); }
    });
  }
  q?.addEventListener("input", apply);
  diff?.addEventListener("change", apply);
  hide?.addEventListener("click", () => { hideDone = !hideDone; hide.classList.toggle("on", hideDone); apply(); });

  updateProgress(total, [...done].filter(k => root.querySelector(`tr[data-key="${CSS.escape(k)}"]`)).length);
  scrollSpy("#q-nav a", ".qgroup, #g-lp-reported, #g-lp-bank");
}

function updateProgress(total, n) {
  const label = document.getElementById("q-progress-label");
  const bar = document.querySelector("#q-progress-bar > i");
  if (label) label.textContent = n + " / " + total + " done";
  if (bar) bar.style.width = (total ? (n / total) * 100 : 0) + "%";
}

function renderLP() {
  return `
  <section class="qgroup" id="g-lp-reported">
    <h2>Leadership Principle questions actually asked <span class="pill purple">${LP_REPORTED.items.length}</span></h2>
    <p class="sub">${esc(LP_REPORTED.note)}</p>
    <table class="qtable">
      <thead><tr><th>Question</th><th class="col-src">Reported in</th></tr></thead>
      <tbody>
        ${LP_REPORTED.items.map(i => `
          <tr><td>${esc(i.q)}</td>
          <td class="col-src"><a href="${i.src.url}" target="_blank" rel="noopener">${esc(i.src.name)} ↗</a></td></tr>`).join("")}
      </tbody>
    </table>
  </section>

  <section class="qgroup" id="g-lp-bank">
    <h2>All 16 Leadership Principles <span class="pill purple">16</span></h2>
    <p class="sub">Every round in the loop carries 20–30 minutes of this. Write one STAR story per principle; several stories can cover two or three principles each, so 8–10 well-chosen stories is enough.</p>
    ${LP_BANK.map(l => `
      <div class="lp">
        <b>${esc(l.lp)}</b>
        <ul>${l.qs.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
        ${l.warn ? `<p style="margin:8px 0 0;font-size:13px;color:var(--red)">⚠ ${esc(l.warn)}</p>` : ""}
      </div>`).join("")}
  </section>`;
}

/* ---------- sidebar scroll spy ---------- */
function scrollSpy(navSel, secSel) {
  const links = [...document.querySelectorAll(navSel)];
  const secs = [...document.querySelectorAll(secSel)];
  if (!links.length || !secs.length) return;
  const map = new Map(links.map(a => [a.getAttribute("href").slice(1), a]));
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      const a = map.get(en.target.id);
      if (!a) return;
      if (en.isIntersecting) {
        links.forEach(x => x.classList.remove("active"));
        a.classList.add("active");
      }
    });
  }, { rootMargin: "-80px 0px -70% 0px", threshold: 0 });
  secs.forEach(s => obs.observe(s));
}

/* ================================================================
   DSA SHEET PAGE
================================================================ */
const DSA_STORE = "amazonPrepDSA.v1";
const loadSet = k => { try { return new Set(JSON.parse(localStorage.getItem(k) || "[]")); } catch { return new Set(); } };
const saveSet = (k, s) => localStorage.setItem(k, JSON.stringify([...s]));

function renderDSA() {
  const root = document.getElementById("dsa-root");
  const nav = document.getElementById("dsa-nav");
  if (!root) return;

  const done = loadSet(DSA_STORE);
  let total = 0, corpusCount = 0;

  root.innerHTML = DSA_TOPICS.map(t => {
    const count = t.tiers.reduce((a, x) => a + x.items.length, 0);
    const tiers = t.tiers.map(tier => {
      const rows = tier.items.map(r => {
        const key = t.id + "::" + r.q;
        total++; if (r.corpus) corpusCount++;
        return `
        <tr data-key="${esc(key)}" class="${done.has(key) ? "done" : ""}"
            data-text="${esc((r.q + " " + r.tag + " " + (r.note || "")).toLowerCase())}"
            data-diff="${esc(r.d)}" data-corpus="${r.corpus ? 1 : 0}">
          <td class="col-chk"><input type="checkbox" ${done.has(key) ? "checked" : ""}></td>
          <td>
            <span class="qname">${esc(r.q)}</span>
            ${r.corpus ? '<span class="pill orange" title="This exact problem appears in the collected interview experiences">★ asked</span>' : ""}
            ${r.note ? `<span class="qnote">${esc(r.note)}</span>` : ""}
          </td>
          <td class="col-topic"><span class="pill">${esc(r.tag)}</span></td>
          <td class="col-diff">${diffPill(r.d === "E" ? "Easy" : r.d === "M" ? "Medium" : "Hard")}</td>
          <td class="col-link">${practiceCell(r)}</td>
        </tr>`;
      }).join("");
      return `
        <div class="tier">
          <h3>${esc(tier.name)}</h3>
          ${tier.note ? `<p class="tier-note">${esc(tier.note)}</p>` : ""}
          <table class="qtable"><tbody>${rows}</tbody></table>
          <p class="empty hidden">Nothing here matches the filter.</p>
        </div>`;
    }).join("");

    return `
      <section class="topic qgroup" id="${t.id}">
        <h2>${esc(t.title)} <span class="pill orange">${count}</span></h2>
        <p class="sub">${esc(t.why)}</p>
        <details class="learn" open>
          <summary>Learn this before you start solving</summary>
          <ul>${t.learn.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
          <div class="pills" style="margin-top:10px">
            <span style="font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--text-faint);margin-right:4px">Patterns</span>
            ${t.patterns.map(p => `<span class="pill blue">${esc(p)}</span>`).join("")}
          </div>
        </details>
        ${tiers}
      </section>`;
  }).join("");

  if (nav) nav.innerHTML = '<h3>Topics</h3>' +
    DSA_TOPICS.map(t => `<a href="#${t.id}">${esc(t.title)}</a>`).join("");

  root.addEventListener("change", e => {
    if (e.target.type !== "checkbox") return;
    const tr = e.target.closest("tr");
    if (e.target.checked) done.add(tr.dataset.key); else done.delete(tr.dataset.key);
    tr.classList.toggle("done", e.target.checked);
    saveSet(DSA_STORE, done);
    countDSA(root, total);
  });

  document.getElementById("dsa-reset")?.addEventListener("click", () => {
    done.clear(); saveSet(DSA_STORE, done);
    root.querySelectorAll("tr[data-key]").forEach(tr => { tr.classList.remove("done"); tr.querySelector("input").checked = false; });
    countDSA(root, total);
  });

  const q = document.getElementById("dsa-search");
  const diff = document.getElementById("dsa-diff");
  const corpusBtn = document.getElementById("dsa-corpus");
  const hideBtn = document.getElementById("dsa-hide");
  let corpusOnly = false, hideDone = false;

  function apply() {
    const term = (q?.value || "").trim().toLowerCase();
    const d = diff?.value || "all";
    root.querySelectorAll(".topic").forEach(sec => {
      let secShown = 0;
      sec.querySelectorAll(".tier").forEach(tier => {
        let shown = 0;
        tier.querySelectorAll("tr[data-key]").forEach(tr => {
          const ok = (!term || tr.dataset.text.includes(term))
            && (d === "all" || tr.dataset.diff === d)
            && (!corpusOnly || tr.dataset.corpus === "1")
            && (!hideDone || !tr.classList.contains("done"));
          tr.classList.toggle("hidden", !ok);
          if (ok) shown++;
        });
        tier.querySelector(".qtable").classList.toggle("hidden", shown === 0);
        tier.querySelector(".empty").classList.toggle("hidden", shown !== 0);
        secShown += shown;
      });
      sec.classList.toggle("dim", secShown === 0);
    });
  }
  q?.addEventListener("input", apply);
  diff?.addEventListener("change", apply);
  corpusBtn?.addEventListener("click", () => { corpusOnly = !corpusOnly; corpusBtn.classList.toggle("on", corpusOnly); apply(); });
  hideBtn?.addEventListener("click", () => { hideDone = !hideDone; hideBtn.classList.toggle("on", hideDone); apply(); });

  const cLabel = document.getElementById("dsa-corpus-count");
  if (cLabel) cLabel.textContent = corpusCount;
  countDSA(root, total);
  scrollSpy("#dsa-nav a", ".topic");
}

function countDSA(root, total) {
  const n = root.querySelectorAll("tr.done").length;
  const label = document.getElementById("dsa-progress-label");
  const bar = document.querySelector("#dsa-progress-bar > i");
  if (label) label.textContent = n + " / " + total + " solved";
  if (bar) bar.style.width = (total ? (n / total) * 100 : 0) + "%";
}

/* ================================================================
   SYLLABUS PAGES (OS / CN / DBMS)
================================================================ */
function renderSyllabus() {
  const root = document.getElementById("syl-root");
  const nav = document.getElementById("syl-nav");
  if (!root || typeof SYLLABUS === "undefined") return;

  const STORE_KEY = "amazonPrepSyl." + SYLLABUS.key + ".v1";
  const done = loadSet(STORE_KEY);
  let total = 0;

  const levelPill = l =>
    l === "core" ? '<span class="pill orange">core — study properly</span>'
    : l === "foundation" ? '<span class="pill blue">foundation — one session</span>'
    : l === "advanced" ? '<span class="pill purple">advanced — the differentiator</span>'
    : '<span class="pill">supporting — skim if short on time</span>';

  document.getElementById("syl-title").textContent = SYLLABUS.subject;
  document.getElementById("syl-tagline").textContent = SYLLABUS.tagline;
  document.getElementById("syl-intro").innerHTML =
    esc(SYLLABUS.intro) +
    `<span class="evidence"><b>From the interview corpus:</b> ${esc(SYLLABUS.evidence)}</span>`;
  document.title = SYLLABUS.subject + " — Amazon Prep";

  root.innerHTML = SYLLABUS.modules.map(m => {
    const topics = m.topics.map(tp => {
      const key = m.id + "::" + tp.t;
      total++;
      return `
        <div class="topic-item ${done.has(key) ? "done" : ""}" data-key="${esc(key)}"
             data-text="${esc((tp.t + " " + tp.sub.join(" ")).toLowerCase())}">
          <label class="topic-head">
            <input type="checkbox" ${done.has(key) ? "checked" : ""}>
            <span>${esc(tp.t)}</span>
          </label>
          <ul>${tp.sub.map(s => `<li>${esc(s)}</li>`).join("")}</ul>
        </div>`;
    }).join("");

    return `
      <section class="mod" id="${m.id}" data-level="${m.level}">
        <div class="mod-head">
          <h2><span class="mod-num">${m.num}</span> ${esc(m.title)}</h2>
          <div class="pills">${levelPill(m.level)}<span class="pill">${m.topics.length} topics</span></div>
          <p class="sub">${esc(m.why)}</p>
        </div>
        <div class="mod-body">
          ${topics}
          <div class="asked">
            <b>Questions asked from this module</b>
            <ul>${m.asked.map(a => `<li>${esc(a)}</li>`).join("")}</ul>
          </div>
        </div>
      </section>`;
  }).join("") + `
    <section class="card" id="syl-resources">
      <h2 style="font-size:19px;margin-top:0">Where to learn it</h2>
      <ul style="font-size:14px">
        ${SYLLABUS.resources.map(r => `<li><a href="${r.url}" target="_blank" rel="noopener">${esc(r.name)} ↗</a>${r.note ? ` — <span style="color:var(--text-dim)">${esc(r.note)}</span>` : ""}</li>`).join("")}
      </ul>
    </section>`;

  if (nav) nav.innerHTML = '<h3>Modules</h3>' +
    SYLLABUS.modules.map(m => `<a href="#${m.id}">${m.num}. ${esc(m.title.split(" — ")[0])}</a>`).join("") +
    '<h3>Extras</h3><a href="#syl-resources">Where to learn it</a>';

  root.addEventListener("change", e => {
    if (e.target.type !== "checkbox") return;
    const item = e.target.closest(".topic-item");
    if (e.target.checked) done.add(item.dataset.key); else done.delete(item.dataset.key);
    item.classList.toggle("done", e.target.checked);
    saveSet(STORE_KEY, done);
    countSyl(root, total);
  });

  document.getElementById("syl-reset")?.addEventListener("click", () => {
    done.clear(); saveSet(STORE_KEY, done);
    root.querySelectorAll(".topic-item").forEach(i => { i.classList.remove("done"); i.querySelector("input").checked = false; });
    countSyl(root, total);
  });

  const q = document.getElementById("syl-search");
  const lvl = document.getElementById("syl-level");
  function apply() {
    const term = (q?.value || "").trim().toLowerCase();
    const l = lvl?.value || "all";
    root.querySelectorAll(".mod").forEach(sec => {
      const okLvl = l === "all" || sec.dataset.level === l;
      let shown = 0;
      sec.querySelectorAll(".topic-item").forEach(i => {
        const ok = okLvl && (!term || i.dataset.text.includes(term));
        i.classList.toggle("hidden", !ok);
        if (ok) shown++;
      });
      sec.classList.toggle("hidden", !okLvl || (term && shown === 0));
    });
  }
  q?.addEventListener("input", apply);
  lvl?.addEventListener("change", apply);

  countSyl(root, total);
  scrollSpy("#syl-nav a", ".mod, #syl-resources");
}

function countSyl(root, total) {
  const n = root.querySelectorAll(".topic-item.done").length;
  const label = document.getElementById("syl-progress-label");
  const bar = document.querySelector("#syl-progress-bar > i");
  if (label) label.textContent = n + " / " + total + " covered";
  if (bar) bar.style.width = (total ? (n / total) * 100 : 0) + "%";
}

/* ================================================================
   LEADERSHIP PRINCIPLES PAGE
================================================================ */
const LP_STORE = "amazonPrepStories.v1";
const LP_SLOTS = 10;

function renderLP_Page() {
  const root = document.getElementById("lp-root");
  const nav = document.getElementById("lp-nav");
  if (!root || typeof LP_GUIDE === "undefined") return;
  const G = LP_GUIDE;

  const weightPill = w =>
    w === "critical" ? '<span class="pill red">critical — expect this</span>'
    : w === "high" ? '<span class="pill orange">high</span>'
    : w === "medium" ? '<span class="pill blue">medium</span>'
    : '<span class="pill">rarely primary at SDE-1</span>';

  /* ---- section 1: mechanics ---- */
  const mech = `
    <section class="qgroup" id="lp-mechanics">
      <h2>How the LP round actually works</h2>
      <p class="sub">${esc(G.mechanics.intro)}</p>
      ${G.mechanics.points.map(p => `
        <div class="mech">
          <b>${esc(p.t)}</b>
          <p>${esc(p.d)}</p>
        </div>`).join("")}
    </section>`;

  /* ---- section 2: STAR ---- */
  const s = G.star;
  const star = `
    <section class="qgroup" id="lp-star">
      <h2>STAR, done properly</h2>
      <p class="sub">${esc(s.intro)}</p>
      <div class="star-grid">
        ${s.breakdown.map(b => `
          <div class="star-cell">
            <div class="star-k">${esc(b.k)} <span class="pill orange">${esc(b.pct)}</span></div>
            <p>${esc(b.d)}</p>
          </div>`).join("")}
      </div>

      <h3 class="sub-h">The same question, answered badly and answered well</h3>
      <p class="prompt-line"><b>Prompt:</b> ${esc(s.worked.prompt)}</p>
      <div class="compare">
        <div class="cmp bad">
          <div class="cmp-h">${esc(s.worked.weak.label)}</div>
          <p class="quote">${esc(s.worked.weak.text)}</p>
          <b>Why it scores nothing</b>
          <ul>${s.worked.weak.problems.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
        </div>
        <div class="cmp good">
          <div class="cmp-h">${esc(s.worked.strong.label)}</div>
          ${s.worked.strong.text.map(t => `<p class="quote">${esc(t)}</p>`).join("")}
          <b>Why it works</b>
          <ul>${s.worked.strong.why.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
        </div>
      </div>

      <h3 class="sub-h">Non-negotiable rules</h3>
      <ol class="rules">${s.rules.map(r => `<li>${esc(r)}</li>`).join("")}</ol>
    </section>`;

  /* ---- section 3: strategy + story bank tool ---- */
  const strat = `
    <section class="qgroup" id="lp-strategy">
      <h2>Building your story bank</h2>
      <p class="sub">${esc(G.strategy.intro)}</p>
      ${G.strategy.steps.map(x => `<div class="mech"><b>${esc(x.t)}</b><p>${esc(x.d)}</p></div>`).join("")}
      <div class="fresher"><b>If you are a fresher</b><p>${esc(G.strategy.fresherNote)}</p></div>

      <h3 class="sub-h">Your story matrix</h3>
      <p class="sub">Write a one-line title for each story, then tick every principle it can serve. Saved in this browser. The coverage bar below shows which principles you still have no story for — those are the holes a Bar Raiser will find.</p>
      <div id="lp-coverage" class="coverage"></div>
      <div id="lp-stories"></div>
    </section>`;

  /* ---- section 4: the 16 ---- */
  const principles = G.principles.map(p => `
    <section class="qgroup lp-p" id="${p.id}">
      <h2><span class="mod-num">${p.n}</span> ${esc(p.name)}</h2>
      <div class="pills" style="margin-bottom:10px">${weightPill(p.weight)}</div>
      <blockquote class="official">${esc(p.official)}</blockquote>

      <h4 class="lp-h">What they are actually testing</h4>
      <p>${esc(p.testing)}</p>

      <div class="sig-grid">
        <div class="sig good"><b>Strong signals</b><ul>${p.strong.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
        <div class="sig bad"><b>Anti-signals</b><ul>${p.weak.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
      </div>

      <div class="fresher"><b>If you are a fresher</b><p>${esc(p.fresher)}</p></div>

      <h4 class="lp-h">Worked example — ${esc(p.example.title)}</h4>
      <p class="quote example">${esc(p.example.text)}</p>

      <h4 class="lp-h">Questions asked for this principle</h4>
      <ul class="qlist">${p.questions.map(q => `<li>${esc(q)}</li>`).join("")}</ul>

      <h4 class="lp-h">Back-to-back drilling — how they actually take this apart</h4>
      ${p.drills.map(d => `
        <div class="drill">
          <div class="drill-open"><span class="tagq">Opener</span> ${esc(d.opener)}</div>
          <ol class="chain">
            ${d.chain.map(c => `
              <li>
                <div class="chain-q">${esc(c.q)}</div>
                <div class="chain-why"><b>What is being tested:</b> ${esc(c.why)}</div>
              </li>`).join("")}
          </ol>
          <div class="crack">${esc(d.crack)}</div>
        </div>`).join("")}

      <h4 class="lp-h">Traps</h4>
      <ul class="traps">${p.traps.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
    </section>`).join("");

  /* ---- section 5-8 ---- */
  const universal = `
    <section class="qgroup" id="lp-universal">
      <h2>Universal follow-ups <span class="pill orange">${G.universal.groups.reduce((a, g) => a + g.qs.length, 0)}</span></h2>
      <p class="sub">${esc(G.universal.intro)}</p>
      <div class="ugrid">
        ${G.universal.groups.map(g => `
          <div class="ucell">
            <b>${esc(g.g)}</b>
            <ul>${g.qs.map(q => `<li>${esc(q)}</li>`).join("")}</ul>
          </div>`).join("")}
      </div>
    </section>

    <section class="qgroup" id="lp-redflags">
      <h2>Red flags <span class="pill red">${G.redFlags.length}</span></h2>
      <p class="sub">Each of these is scored against you even when it is not what the question was about.</p>
      ${G.redFlags.map(r => `<div class="flag"><b>${esc(r.f)}</b><p>${esc(r.d)}</p></div>`).join("")}
    </section>

    <section class="qgroup" id="lp-ask">
      <h2>What to ask them</h2>
      <p class="sub">${esc(G.askThem.intro)}</p>
      <div class="sig-grid">
        <div class="sig good"><b>Worth asking</b><ul>${G.askThem.good.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
        <div class="sig bad"><b>Do not ask</b><ul>${G.askThem.avoid.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
      </div>
    </section>

    <section class="qgroup" id="lp-dayof">
      <h2>On the day</h2>
      <ol class="rules">${G.dayOf.map(x => `<li>${esc(x)}</li>`).join("")}</ol>
    </section>`;

  root.innerHTML = mech + star + strat + principles + universal;

  if (nav) nav.innerHTML =
    '<h3>Foundations</h3>' +
    '<a href="#lp-mechanics">How the round works</a>' +
    '<a href="#lp-star">STAR, done properly</a>' +
    '<a href="#lp-strategy">Your story bank</a>' +
    '<h3>The 16 principles</h3>' +
    G.principles.map(p => `<a href="#${p.id}">${p.n}. ${esc(p.name)}</a>`).join("") +
    '<h3>Cross-cutting</h3>' +
    '<a href="#lp-universal">Universal follow-ups</a>' +
    '<a href="#lp-redflags">Red flags</a>' +
    '<a href="#lp-ask">What to ask them</a>' +
    '<a href="#lp-dayof">On the day</a>';

  renderStoryBank(G);

  const q = document.getElementById("lp-search");
  q?.addEventListener("input", () => {
    const term = q.value.trim().toLowerCase();
    root.querySelectorAll(".qgroup").forEach(sec => {
      sec.classList.toggle("hidden", !!term && !sec.textContent.toLowerCase().includes(term));
    });
  });

  scrollSpy("#lp-nav a", ".qgroup");
}

/* ---------- story matrix tool ---------- */
function renderStoryBank(G) {
  const wrap = document.getElementById("lp-stories");
  const cov = document.getElementById("lp-coverage");
  if (!wrap) return;

  let data;
  try { data = JSON.parse(localStorage.getItem(LP_STORE) || "null"); } catch { data = null; }
  if (!Array.isArray(data)) data = Array.from({ length: LP_SLOTS }, () => ({ title: "", lps: [] }));
  while (data.length < LP_SLOTS) data.push({ title: "", lps: [] });

  const save = () => localStorage.setItem(LP_STORE, JSON.stringify(data));

  wrap.innerHTML = data.map((st, i) => `
    <div class="story" data-i="${i}">
      <div class="story-top">
        <span class="story-n">${i + 1}</span>
        <input type="text" class="story-title" placeholder="Story ${i + 1} — one line, e.g. 'Chat app: found N+1 on read path, p99 4.1s → 210ms'"
               value="${esc(st.title)}">
      </div>
      <div class="story-lps">
        ${G.principles.map(p => `
          <button type="button" class="lpchip ${st.lps.includes(p.n) ? "on" : ""}" data-n="${p.n}"
                  title="${esc(p.name)}">${p.n}. ${esc(p.name.split(";")[0])}</button>`).join("")}
      </div>
    </div>`).join("");

  function paintCoverage() {
    const counts = {};
    G.principles.forEach(p => counts[p.n] = 0);
    data.forEach(st => { if (st.title.trim()) st.lps.forEach(n => counts[n]++); });
    const gaps = G.principles.filter(p => counts[p.n] === 0);
    cov.innerHTML =
      `<div class="cov-row">${G.principles.map(p => {
        const c = counts[p.n];
        const cls = c === 0 ? "zero" : c === 1 ? "one" : "many";
        return `<span class="cov ${cls}" title="${esc(p.name)} — ${c} ${c === 1 ? "story" : "stories"}">${p.n}</span>`;
      }).join("")}</div>` +
      (gaps.length
        ? `<p class="cov-note warn"><b>${gaps.length} principle${gaps.length === 1 ? "" : "s"} with no story:</b> ${gaps.map(p => esc(p.name)).join(", ")}. Read the fresher angle under each and find something you did not think counted.</p>`
        : `<p class="cov-note ok">Every principle has at least one story. Now check that the critical ones — Customer Obsession, Ownership, Bias for Action, Earn Trust, Dive Deep, Backbone, Deliver Results — have two.</p>`);
  }

  wrap.addEventListener("input", e => {
    if (!e.target.classList.contains("story-title")) return;
    data[+e.target.closest(".story").dataset.i].title = e.target.value;
    save(); paintCoverage();
  });
  wrap.addEventListener("click", e => {
    const chip = e.target.closest(".lpchip");
    if (!chip) return;
    const i = +chip.closest(".story").dataset.i;
    const n = +chip.dataset.n;
    const arr = data[i].lps;
    const at = arr.indexOf(n);
    if (at === -1) arr.push(n); else arr.splice(at, 1);
    chip.classList.toggle("on", at === -1);
    save(); paintCoverage();
  });

  document.getElementById("lp-reset")?.addEventListener("click", () => {
    if (!confirm("Clear all your saved stories? This cannot be undone.")) return;
    data = Array.from({ length: LP_SLOTS }, () => ({ title: "", lps: [] }));
    save();
    renderStoryBank(G);
  });

  paintCoverage();
}

/* ================================================================
   SYSTEM DESIGN PAGE
================================================================ */
function renderSD() {
  const root = document.getElementById("sd-root");
  const nav = document.getElementById("sd-nav");
  if (!root || typeof SD_GUIDE === "undefined") return;
  const S = SD_GUIDE;

  const cal = `
    <section class="qgroup" id="sd-calibration">
      <h2>How much of this applies to you</h2>
      <p class="sub">${esc(S.calibration.intro)}</p>
      ${S.calibration.levels.map(l => `
        <div class="lvl">
          <div class="lvl-h"><b>${esc(l.lvl)}</b> <span class="lvl-v">${esc(l.verdict)}</span></div>
          <p>${esc(l.d)}</p>
          <p class="lvl-f"><b>Study:</b> ${esc(l.focus)}</p>
        </div>`).join("")}
      <div class="fresher"><b>If you are interviewing for SDE-1</b><p>${esc(S.calibration.note)}</p></div>
    </section>`;

  const fw = `
    <section class="qgroup" id="sd-framework">
      <h2>The 45-minute framework</h2>
      <p class="sub">${esc(S.framework.intro)}</p>
      ${S.framework.clock.map(c => `
        <div class="clock">
          <div class="clock-t">${esc(c.t)}</div>
          <div class="clock-b"><b>${esc(c.h)}</b><p>${esc(c.d)}</p></div>
        </div>`).join("")}
      <h3 class="sub-h">Habits that are scored regardless of the question</h3>
      <ol class="rules">${S.framework.habits.map(h => `<li>${esc(h)}</li>`).join("")}</ol>
    </section>`;

  const nums = `
    <section class="qgroup" id="sd-numbers">
      <h2>Numbers to have in your head</h2>
      <p class="sub">${esc(S.numbers.intro)}</p>
      <div class="numgrid">
        <div class="numcell"><b>Latency</b><table class="ntable">${S.numbers.latency.map(x => `<tr><td>${esc(x.k)}</td><td class="nv">${esc(x.v)}</td></tr>`).join("")}</table></div>
        <div class="numcell"><b>Sizes</b><table class="ntable">${S.numbers.sizes.map(x => `<tr><td>${esc(x.k)}</td><td class="nv">${esc(x.v)}</td></tr>`).join("")}</table></div>
      </div>
      <h3 class="sub-h">Back-of-envelope math</h3>
      ${S.numbers.math.map(m => `<div class="mech"><b>${esc(m.t)}</b><p>${esc(m.d)}</p></div>`).join("")}
      <h3 class="sub-h">${esc(S.numbers.worked.t)}</h3>
      <div class="drill">${S.numbers.worked.lines.map(l => `<p class="quote">${esc(l)}</p>`).join("")}</div>
    </section>`;

  const blocks = `
    <section class="qgroup" id="sd-blocks">
      <h2>Building blocks <span class="pill orange">${S.blocks.items.length}</span></h2>
      <p class="sub">${esc(S.blocks.intro)}</p>
      ${S.blocks.items.map(b => `
        <div class="block">
          <div class="block-h">${esc(b.n)}</div>
          <p class="block-w">${esc(b.what)}</p>
          <div class="block-uc">
            <div><span class="lab use">Reach for it when</span> ${esc(b.use)}</div>
            <div><span class="lab cost">It costs you</span> ${esc(b.cost)}</div>
          </div>
          <ul class="block-d">${b.depth.map(d => `<li>${esc(d)}</li>`).join("")}</ul>
        </div>`).join("")}
    </section>`;

  const lld = `
    <section class="qgroup" id="sd-lld">
      <h2>Low-level design</h2>
      <p class="sub">${esc(S.lld.intro)}</p>
      <h3 class="sub-h">How to run an LLD round</h3>
      ${S.lld.process.map(p => `<div class="mech"><b>${esc(p.t)}</b><p>${esc(p.d)}</p></div>`).join("")}
      <h3 class="sub-h">SOLID — with the smell that tells you it is violated</h3>
      ${S.lld.solid.map(s => `<div class="mech"><b>${esc(s.k)}</b><p>${esc(s.d)}</p></div>`).join("")}
      <h3 class="sub-h">Patterns that actually come up</h3>
      <table class="qtable">
        <thead><tr><th style="width:150px">Pattern</th><th style="width:270px">Use when</th><th>Where it shows up</th></tr></thead>
        <tbody>${S.lld.patterns.map(p => `<tr><td><b>${esc(p.p)}</b></td><td>${esc(p.u)}</td><td>${esc(p.ex)}</td></tr>`).join("")}</tbody>
      </table>
      <h3 class="sub-h">Concurrency in LLD — the differentiator</h3>
      <p class="sub">${esc(S.lld.concurrency.intro)}</p>
      <ol class="rules">${S.lld.concurrency.points.map(p => `<li>${esc(p)}</li>`).join("")}</ol>
    </section>`;

  const designs = S.designs.map(d => `
    <section class="qgroup design" id="${d.id}">
      <h2>${esc(d.name)}</h2>
      <div class="pills" style="margin-bottom:10px">
        <span class="pill blue">${esc(d.kind)}</span>
        <span class="pill">${esc(d.level)}</span>
        ${d.corpus ? '<span class="pill orange">★ asked in the corpus</span>' : ""}
      </div>
      <p class="sub">${esc(d.why)}</p>

      <h4 class="lp-h">Requirements</h4>
      <div class="sig-grid">
        <div class="sig good"><b>Functional</b><ul>${d.req.fn.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
        <div class="sig bad" style="border-left-color:var(--blue)"><b style="color:var(--blue)">Non-functional</b><ul>${d.req.nfn.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
      </div>

      <h4 class="lp-h">How to walk through it</h4>
      ${d.approach.map(a => `<div class="mech"><b>${esc(a.t)}</b><p>${esc(a.d)}</p></div>`).join("")}

      <h4 class="lp-h">Sketch</h4>
      <pre class="code">${d.code.map(l => esc(l)).join("\n")}</pre>

      <h4 class="lp-h">Deep-dive follow-ups, with answers</h4>
      ${d.deep.map(x => `<div class="qa"><div class="qa-q">${esc(x.q)}</div><div class="qa-a">${esc(x.a)}</div></div>`).join("")}

      <h4 class="lp-h">Back-to-back drilling</h4>
      ${d.drills.map(dr => `
        <div class="drill">
          <div class="drill-open"><span class="tagq">Opener</span> ${esc(dr.opener)}</div>
          <ol class="chain">
            ${dr.chain.map(c => `<li><div class="chain-q">${esc(c.q)}</div><div class="chain-why"><b>What is being tested:</b> ${esc(c.why)}</div></li>`).join("")}
          </ol>
          <div class="crack">${esc(dr.crack)}</div>
        </div>`).join("")}
    </section>`).join("");

  const tail = `
    <section class="qgroup" id="sd-redflags">
      <h2>Red flags <span class="pill red">${S.redFlags.length}</span></h2>
      ${S.redFlags.map(r => `<div class="flag"><b>${esc(r.f)}</b><p>${esc(r.d)}</p></div>`).join("")}
    </section>
    <section class="card" id="sd-resources">
      <h2 style="font-size:19px;margin-top:0">Where to learn it</h2>
      <ul style="font-size:14px">
        ${S.resources.map(r => `<li><a href="${r.url}" target="_blank" rel="noopener">${esc(r.name)} ↗</a> — <span style="color:var(--text-dim)">${esc(r.note)}</span></li>`).join("")}
      </ul>
    </section>`;

  root.innerHTML = cal + fw + nums + blocks + lld + designs + tail;

  if (nav) nav.innerHTML =
    '<h3>Foundations</h3>' +
    '<a href="#sd-calibration">Does this apply to you?</a>' +
    '<a href="#sd-framework">The 45-min framework</a>' +
    '<a href="#sd-numbers">Numbers to know</a>' +
    '<a href="#sd-blocks">Building blocks</a>' +
    '<a href="#sd-lld">Low-level design</a>' +
    '<h3>Worked designs</h3>' +
    S.designs.map(d => `<a href="#${d.id}">${d.corpus ? "★ " : ""}${esc(d.name.replace("Design a ", "").replace("Design ", ""))}</a>`).join("") +
    '<h3>Cross-cutting</h3><a href="#sd-redflags">Red flags</a><a href="#sd-resources">Where to learn it</a>';

  const q = document.getElementById("sd-search");
  const only = document.getElementById("sd-corpus");
  const lvl = document.getElementById("sd-level");
  let corpusOnly = false;

  function apply() {
    const term = (q?.value || "").trim().toLowerCase();
    const L = lvl?.value || "all";
    root.querySelectorAll(".qgroup").forEach(sec => {
      const isDesign = sec.classList.contains("design");
      const d = isDesign ? S.designs.find(x => x.id === sec.id) : null;
      const okFilter = !isDesign
        ? (!corpusOnly && L === "all")
        : ((!corpusOnly || d.corpus) && (L === "all" || d.level === L));
      const okText = !term || sec.textContent.toLowerCase().includes(term);
      sec.classList.toggle("hidden", !(okFilter && okText));
    });
    document.getElementById("sd-resources")?.classList.toggle("hidden", corpusOnly || (lvl?.value || "all") !== "all");
  }
  q?.addEventListener("input", apply);
  lvl?.addEventListener("change", apply);
  only?.addEventListener("click", () => { corpusOnly = !corpusOnly; only.classList.toggle("on", corpusOnly); apply(); });

  scrollSpy("#sd-nav a", ".qgroup");
}

/* Every page builds its content in JS, so a #hash in the URL points at an
   element that does not exist yet at native-scroll time. Re-apply it after render
   so bookmarks and shared deep links land where they should. */
function applyHash() {
  if (!location.hash) return;
  const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (el) requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
}

document.addEventListener("DOMContentLoaded", () => {
  renderExperiences();
  renderQuestions();
  renderDSA();
  renderSyllabus();
  renderLP_Page();
  renderSD();
  applyHash();
});
