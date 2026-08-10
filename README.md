# Amazon Prep

A static, self-contained prep site for Amazon India SDE interviews, built from published interview experiences.

**Live:** https://nandakishore2424.github.io/amazon-prep/

No build step, no dependencies, no tracking. Nine HTML pages, one stylesheet, one script, and plain JS data files. Open `index.html` locally or use the link above.

---

## What's in it

| Page | What it is |
|---|---|
| `index.html` | Overview — what an Amazon "in-person hiring event" is, what the corpus shows, where to start |
| `experiences.html` | 11 published interview experiences, reproduced in full with timelines, rounds, questions and verdicts |
| `questions.html` | 86 coding/design questions grouped by the round they were asked in, plus the Leadership Principle bank |
| `lp.html` | Leadership Principles — all 16 with worked examples, anti-signals and fresher angles, 107 questions, 95 back-to-back drill follow-ups, and a story-matrix tool |
| `dsa.html` | 301 problems across 16 topics, tiered, each topic opening with the concepts to learn before solving |
| `sd.html` | 9 worked system/low-level designs with deep-dive answers and drill chains |
| `os.html` `cn.html` `dbms.html` | Operating Systems, Computer Networks and DBMS — 129 topics, 568 subtopics, from scratch to interview level |

Everything traces back to a source. Questions link to the interview experience that reported them; every LeetCode link was verified against `leetcode.com/api/problems/all` (all 251 slugs resolve; the six behind Premium are labelled).

## Two ideas the site is built around

**Evidence over folklore.** Rather than a generic question list, the content is derived from published interview experiences and cross-linked to them. A problem marked ★ on the DSA sheet is one a real candidate was really given.

**Drill chains.** The Leadership Principles and system design pages don't stop at the opening question. Each shows the four-to-six follow-ups an interviewer actually asks, what each one is testing, and where candidates break — because that drilling is what the source experiences describe and it's what thin answers fail.

## Your data stays in your browser

Progress checkboxes and the LP story matrix use `localStorage`. Nothing is uploaded, nothing is committed to this repo, and there is no analytics or third-party script anywhere on the site. If you write your own STAR stories into the story matrix, they exist only in your browser profile.

## Editing it

Content lives in `data/*.js` as plain JS objects — add material there rather than editing HTML. `assets/app.js` renders every page and guards on element presence, so one script serves all nine. The three fundamentals pages share a single renderer and differ only in which `SYLLABUS` object they load.

```
├── index.html, experiences.html, questions.html, lp.html,
│   dsa.html, sd.html, os.html, cn.html, dbms.html
├── assets/
│   ├── app.js        renderers, filtering, localStorage, scroll-spy
│   └── style.css
└── data/
    ├── experiences.js  questions.js  lp.js
    ├── dsa.js          sd.js
    └── os.js  cn.js  dbms.js
```

## Sources

The interview experiences are summarised from these published accounts, each linked in-page. Treat them as a snapshot — interview processes change, so check the source links for anything newer. Credit for the raw experiences belongs to the candidates who wrote them up.

- [Amazon SDE-1 India Interview Experience (2026)](https://interviewexperiences.in/experience/amazon/amazon-sde-1-interview-experience-india-2026)
- [Amazon SDE-2 Interview Experience, 2026](https://codeprismo.medium.com/amazon-interview-experience-sde-2-2026-c2cd6e71c035) — Medium
- [Interview Experience 143 — Amazon SDE2 / L5, Bangalore](https://roundz.substack.com/p/interview-experience-143-amazon-sde2-l5)
- [Amazon SDE-1 off-campus, selected](https://vinscoder1627.medium.com/amazon-sde-1-off-campus-interview-experience-selected-c111ca8a6689) — Medium
- GeeksforGeeks: [SDE-1 verdict selected](https://www.geeksforgeeks.org/interview-experiences/sde-1-amazon-experience-verdict-selected/) · [SDE-1 via referral](https://www.geeksforgeeks.org/interview-experiences/amazon-interview-experience-for-sde-1/) · [SDE-1 Chennai drive](https://www.geeksforgeeks.org/interview-experiences/amazon-interview-experience-for-sde-1-1-5-years-experienced/) · [SDE-I on-campus](https://www.geeksforgeeks.org/interview-experiences/amazon-interview-experience-for-sde-i-on-campus/) · [SDE-II Bangalore](https://www.geeksforgeeks.org/amazon-interview-experience-for-sde-ii-bangalore/amp/) · [SDE Intern India](https://www.geeksforgeeks.org/interview-experiences/amazon-india-interview-experience-sde-intern/)
- [Amazon India SDE Interview 2026: Complete Guide](https://tryrehearsal.ai/blog/amazon-india-sde-interview-2026)
- [Amazon Interview Experiences, Last 6 Months](https://leetcode.com/discuss/post/7355849/amazon-interview-experiences-last-6-mont-cfv1/) — LeetCode Discuss

Leadership Principle wording is Amazon's own, from [amazon.jobs](https://www.amazon.jobs/content/en/our-workplace/leadership-principles).

Not affiliated with, endorsed by, or connected to Amazon. Shared in case it's useful to someone else preparing.
