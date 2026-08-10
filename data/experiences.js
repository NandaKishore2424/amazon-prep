/* ------------------------------------------------------------------
   Amazon Prep — interview experience corpus
   Each entry mirrors the content of the linked source page.
   Collected 10 Aug 2026 for the 13–18 Aug in-person hiring event.
------------------------------------------------------------------- */

const EXPERIENCES = [

/* ============================================================ 1 */
{
  id: "ie-sde1-india-2026",
  title: "Amazon SDE-1 — India, Feb 2026",
  level: "SDE-1",
  loc: "India",
  when: "Feb 2026",
  verdict: "Selected",
  era: "2026",
  tags: ["OA", "3 onsite rounds", "Tree DP", "Project deep-dive", "LP"],
  source: { name: "interviewexperiences.in", url: "https://interviewexperiences.in/experience/amazon/amazon-sde-1-interview-experience-india-2026" },
  why: "Closest match to your situation: 2026, India, SDE-1, OA then three back-to-back onsite rounds.",
  html: `
<h4>Background</h4>
<p>YOE / college not stated. Two things the candidate flags about themselves: they had <b>taken the OA multiple times before</b> (repeat attempts are normal and not disqualifying), and they had a side project with <b>real users and decent scale</b> — which ended up eating 40 minutes of one round.</p>

<h4>Timeline</h4>
<ul>
  <li>Applied &rarr; OA invite: <b>~10 days</b></li>
  <li>OA &rarr; onsite invite: <b>~1 week</b></li>
  <li>Interview date: <b>27 February 2026</b></li>
</ul>

<h4>Online Assessment</h4>
<p>Format: 2 DSA coding questions + Leadership-Principle-based questions (work simulation / workstyles).</p>
<ul>
  <li><b>Q1</b> — Binary Search on Answer (Medium)</li>
  <li><b>Q2</b> — Greedy problem using a Priority Queue (Medium)</li>
</ul>
<blockquote>The candidate credits clearing the OA to how the LP section was answered — deliberately steering answers toward <b>teamwork and collaboration</b>, <b>reliability and ownership</b>, and <b>leadership and initiative</b>. The workstyles section is not a throwaway.</blockquote>

<h4>Round 1 — DSA focused</h4>
<p><b>Question 1: 1D DP</b>, described as a standard setup similar to <b>House Robber</b>. The interviewer walked the candidate up the optimisation ladder rather than accepting the first answer:</p>
<ul>
  <li>Plain recursion</li>
  <li>&rarr; memoisation (top-down with caching)</li>
  <li>&rarr; tabulation (bottom-up, O(n) space)</li>
  <li>&rarr; O(1) space</li>
</ul>
<p>Follow-ups probed: the transition from recursion &rarr; memoisation &rarr; tabulation, <i>why</i> only previous states were needed, whether overwriting values broke correctness, and time/space trade-offs at each step.</p>
<p><b>Question 2: CP-style array problem</b> that required a compound data structure — <code>HashMap&lt;Integer, Stack&lt;Integer&gt;&gt;</code>. The candidate says it felt like a structured competitive-programming problem. Scoring emphasis was on <b>identifying the correct data structure quickly</b>, then correctness, clarity, and narrating the thought process.</p>

<h4>Round 2 — Project discussion + coding</h4>
<p>The interviewer opened by saying there would be two DSA questions, then pivoted entirely into the candidate's project for <b>~40 minutes</b>. Covered:</p>
<ul>
  <li>Architecture decisions and why</li>
  <li>Data storage choices</li>
  <li>Verification logic</li>
  <li>Edge cases</li>
  <li>Scalability concerns</li>
  <li>Failure scenarios</li>
  <li>Possible improvements</li>
</ul>
<p><b>Coding: 4Sum</b> — only ~15 minutes left. ~10 min explaining the approach, ~7 min implementing (handwritten). Focus: avoiding duplicates, sort + two-pointer, complexity reasoning, clean implementation. The candidate admits the handwritten code was <i>not the absolute cleanest</i>, but the logic was right and edge cases were handled — and it still passed.</p>

<h4>Round 3 — Leadership + Tree DP</h4>
<p><b>LP section, ~40 minutes.</b> The candidate calls this <b>the toughest round</b>. The interviewer kept a neutral, poker-faced expression and gave zero signal about whether answers landed. Areas dug into:</p>
<ul>
  <li>Deep dive on past experiences</li>
  <li>Ownership examples</li>
  <li>Conflict resolution</li>
  <li>Handling failures</li>
</ul>
<blockquote>The interviewer went very deep into each situation, asking multiple follow-up questions and challenging my decisions from different angles.</blockquote>
<p>What was actually being tested: depth of understanding, <b>consistency across answers</b>, patience under pressure, staying calm, and honesty/authenticity.</p>
<p><b>Coding: Binary Tree Cameras</b> (DP on trees), ~30 minutes. Originally budgeted at 20 min, extended by ~10 more. Discussion covered defining clear states, bottom-up recursion, why a pure greedy fails, and careful handling of leaf and null nodes. The candidate did <b>not</b> finish inside the original 20 minutes; with the extension they clarified the state definition and completed the approach. The interviewer weighted <b>correctness of reasoning over speed</b>.</p>

<h4>Other questions the candidate reports from parallel / variant rounds</h4>
<ul>
  <li>Topological Sort — Course Schedule I and II</li>
  <li>Binary Search on Answer — Capacity To Ship Packages Within D Days</li>
  <li>Find Median from Data Stream</li>
  <li>Logger Rate Limiter</li>
  <li>0/1 Knapsack / Target Sum</li>
  <li>LRU Cache</li>
  <li>Prefix Sums — Subarray Sums Divisible by K</li>
</ul>

<h4>Verdict</h4>
<p><b>Selected.</b></p>

<h4>The candidate's own takeaways</h4>
<ul>
  <li>Competitive programming helped a lot with structured thinking.</li>
  <li>Being able to deeply explain your project can significantly influence a round — one round was almost entirely project.</li>
  <li>DP concepts are extremely important.</li>
  <li>The leadership round requires concrete and honest examples.</li>
  <li>Clarity and structured communication matter as much as correctness.</li>
</ul>
`
},

/* ============================================================ 2 */
{
  id: "gfg-sde1-selected",
  title: "Amazon SDE-1 — 3 rounds, Verdict: Selected",
  level: "SDE-1",
  loc: "India",
  when: "2025",
  verdict: "Selected",
  era: "2025",
  tags: ["3 rounds", "Prefix Sum", "Graph", "DP", "Hiring Manager"],
  source: { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/interview-experiences/sde-1-amazon-experience-verdict-selected/" },
  why: "Exactly the 3-round shape a one-day hiring event compresses into: 2 technical + 1 managerial.",
  html: `
<h4>Shape of the loop</h4>
<p><b>3 rounds total</b> — 2 technical + 1 managerial / hiring-manager round. Overall difficulty rated at <b>LeetCode Medium</b>.</p>

<h4>Round 1 — Technical (DSA &amp; coding)</h4>
<p>Topics: <b>Strings</b> and <b>Prefix Sum</b>.</p>
<blockquote>How I handled edge cases and optimized the time/space complexity. Communication was key — explaining the logic before typing was vital.</blockquote>

<h4>Round 2 — Technical (DSA &amp; problem solving)</h4>
<p>Topics: <b>Graphs</b> and <b>Dynamic Programming</b>.</p>
<p>The candidate stresses dry-running the code against sample inputs <i>before</i> presenting it to the interviewer.</p>

<h4>Round 3 — Managerial &amp; culture fit</h4>
<p>Behavioural, driven by Amazon's Leadership Principles:</p>
<ul>
  <li>Technical challenges you have faced</li>
  <li>Problem-solving with limited information</li>
  <li>Conflicts with teammates or with your manager</li>
</ul>
<p>What worked: describing <b>the exact steps taken, the challenges faced, and quantifiable results</b> — not vague summaries.</p>

<h4>Verdict</h4>
<p><b>Selected.</b></p>

<h4>Takeaways</h4>
<ul>
  <li>Do not treat the behavioural / HR round as a formality — it is a real gate.</li>
  <li>LeetCode Medium proficiency plus clean code is enough at SDE-1.</li>
  <li>Explain your thought process thoroughly and address edge cases out loud.</li>
  <li>Past experiences must be specific, not generic.</li>
</ul>
`
},

/* ============================================================ 3 */
{
  id: "gfg-sde1-referral-5rounds",
  title: "Amazon SDE-1 — India, via referral (5 rounds incl. Bar Raiser)",
  level: "SDE-1",
  loc: "India",
  when: "—",
  verdict: "Unknown",
  era: "older",
  tags: ["Written round", "Pen & paper", "System design", "Bar Raiser", "OS"],
  source: { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/interview-experiences/amazon-interview-experience-for-sde-1/" },
  why: "The richest single question list in the corpus — good raw practice material even though the loop is longer than yours.",
  html: `
<h4>Background</h4>
<p>Applied for SDE-1 at Amazon India through an <b>employee referral</b>.</p>

<h4>Round 1 — Written round (90 min)</h4>
<ul>
  <li>20 MCQs on data structures and operating systems</li>
  <li><b>Course Schedule</b> (LeetCode)</li>
  <li><b>Reverse String II</b> (LeetCode)</li>
</ul>
<p>Solved both coding problems and most MCQs.</p>

<h4>Round 2 — Technical interview 1 (1 hr, pen and paper)</h4>
<ul>
  <li><b>Convert Array into Zig-Zag Fashion</b></li>
  <li><b>Bottom View of Binary Tree</b> — follow-up: implement top <i>or</i> bottom view based on a user-supplied choice</li>
  <li><b>Sliding Window Maximum</b></li>
</ul>
<p>The candidate got stuck 2–3 times but solved everything with interviewer hints. Getting stuck is not fatal; going silent is.</p>

<h4>Round 3 — Technical interview 2 (1 hr)</h4>
<ul>
  <li><b>Project discussion (20 min)</b> — explained one of three résumé projects, with clarifying questions throughout</li>
  <li><b>Internship discussion (5 min)</b></li>
  <li><b>Algorithm:</b> Find Minimum Element in Sorted and Rotated Array</li>
  <li><b>System design (20–25 min):</b> design a data structure that supports
    <ul>
      <li>inserting post offices with a hierarchy: Country &rarr; State &rarr; City &rarr; Town &rarr; Post Office Name</li>
      <li>querying all post offices by region</li>
    </ul>
    The candidate proposed tree-based solutions using hash maps or BSTs at each level.
  </li>
</ul>

<h4>Round 4 — Technical interview 3 (1 hr)</h4>
<ul>
  <li><b>Project discussion</b> — same project, fresh questions (note: they re-interrogate the same project across rounds and compare answers)</li>
  <li><b>Vertical Order Traversal of Binary Tree</b></li>
  <li><b>Largest Subarray with 0 Sum</b> — pushed to optimise to a single pass</li>
  <li><b>Operating systems:</b> transactions, deadlocks, critical sections, and semaphore solutions for multi-process scenarios</li>
</ul>

<h4>Round 5 — Bar Raiser (35 min, phone + collaborative editor)</h4>
<ul>
  <li>Introduction and internship discussion</li>
  <li><b>Problem:</b> given equations like <code>a/b = 2.3</code>, evaluate expressions like <code>a/a</code>, <code>b/a</code> — graph traversal where nodes are variables and edges carry the division ratio. (This is LeetCode <b>Evaluate Division</b>.)</li>
</ul>

<h4>Takeaways</h4>
<ul>
  <li>Ask clarifying questions when the problem statement is vague.</li>
  <li>Reason through problems rather than reciting memorised solutions — they can tell.</li>
  <li>Stay calm when stuck and ask for a hint.</li>
  <li>Only put projects on your résumé that you can explain to the floor.</li>
  <li>Be confident about your <i>approach</i>, not just your answer.</li>
</ul>
`
},

/* ============================================================ 4 */
{
  id: "gfg-sde1-1.5yoe-chennai-drive",
  title: "Amazon SDE-1 — Chennai drive (1.5 yrs experienced)",
  level: "SDE-1",
  loc: "Chennai drive, held in Delhi",
  when: "28 Sep",
  verdict: "Selected",
  era: "older",
  tags: ["Actual drive / hiring event", "F2F", "Whiteboard", "Bar Raiser", "OS"],
  source: { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/interview-experiences/amazon-interview-experience-for-sde-1-1-5-years-experienced/" },
  why: "This one WAS a drive — a written screen followed by back-to-back face-to-face rounds on the same day. Structurally the closest analogue to a hiring event.",
  html: `
<h4>Background</h4>
<p>1.5 years of experience, interviewing for SDE-1 at <b>Amazon's Chennai drive, held in Delhi, on 28 September</b>. This is a genuine hiring-drive format — written screen, then back-to-back face-to-face rounds.</p>

<h4>Written round</h4>
<p>Three medium-level algorithmic problems:</p>
<ul>
  <li>Check whether a given linked list is a palindrome</li>
  <li>Find the row with the maximum number of 1s in a sorted binary matrix</li>
  <li>Wildcard pattern matching</li>
</ul>

<h4>Round 1 (face to face)</h4>
<ul>
  <li>Binary tree: <b>difference between the sum of elements at odd and even levels</b>, with diagonal-level consideration. Expected <b>O(1) space, O(n) time</b>.</li>
  <li>DP on a matrix: maximum sum path from top-left to the bottom row, moving down and diagonally right.</li>
  <li>Behavioural questions mixed in.</li>
</ul>

<h4>Round 2 (face to face)</h4>
<ul>
  <li><b>Maximum sum path in a binary tree</b></li>
  <li>A story-framed DP problem that turned out to be <b>Word Break</b>. The candidate went for a Trie approach and never reached the optimal DP solution — and was still selected.</li>
</ul>

<h4>Round 3 (face to face, hiring manager)</h4>
<p>Senior manager. Self-introduction, then a pure behavioural assessment against Amazon's Leadership Principles.</p>

<h4>Round 4 (Bar Raiser, video, two weeks later)</h4>
<p>Senior manager with 10+ years at Amazon:</p>
<ul>
  <li>Behavioural: cross-team collaboration; managing a product-release crisis</li>
  <li>Operating systems: scheduling algorithms, race conditions, mutex vs. semaphore implementation</li>
  <li>An algorithmic problem on file compression</li>
</ul>

<h4>Verdict</h4>
<p><b>Selected</b>, two weeks later.</p>

<h4>Key tip</h4>
<blockquote>At every stage you are expected to write clean, simple and efficient code with minimal possible time complexity <b>on paper or whiteboard</b>.</blockquote>
<p>Worth internalising for 13–18 Aug: in-person rounds are frequently whiteboard or paper, not an IDE. Practise writing at least a few solutions by hand.</p>
`
},

/* ============================================================ 5 */
{
  id: "gfg-sde1-oncampus",
  title: "Amazon SDE-1 — On-campus (OA + 3 interviews)",
  level: "SDE-1",
  loc: "India (on-campus)",
  when: "Updated Jul 2025",
  verdict: "Selected",
  era: "2025",
  tags: ["Full OA breakdown", "Code debugging", "Amazon Chime", "Trees"],
  source: { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/interview-experiences/amazon-interview-experience-for-sde-i-on-campus/" },
  why: "The clearest section-by-section breakdown of Amazon's OA, plus three rounds of tree/greedy questions.",
  html: `
<h4>Round 1 — Online Assessment (Amazon's own platform, 4 sections)</h4>
<ul>
  <li><b>Code debugging</b> (C, C++, Java) — 6–7 questions in <b>20 minutes</b></li>
  <li><b>Aptitude and reasoning ability</b> — <b>35 minutes</b></li>
  <li><b>Workstyles assessment</b> — <b>20 minutes</b></li>
  <li><b>Coding round</b> — <b>70 minutes</b></li>
</ul>
<p>The candidate found the first three sections fairly easy but <b>speed-limited</b>. The two coding problems resembled <b>Maximum Units on a Truck</b> and <b>Minimum Platforms</b>.</p>

<h4>Round 2, interview 1 (Amazon Chime)</h4>
<ul>
  <li>Self-introduction with follow-up questions</li>
  <li><b>Palindrome Linked List</b> — with variations</li>
  <li><b>Knight's Shortest Path</b> — with variations</li>
</ul>

<h4>Round 2, interview 2</h4>
<ul>
  <li>Self-introduction</li>
  <li>Rearrange an array so no element equals the mean of its adjacent elements</li>
  <li>Height of a special binary tree</li>
  <li>One managerial / HR question</li>
</ul>

<h4>Round 3</h4>
<ul>
  <li>Self-introduction</li>
  <li><b>Minimum cost merge</b> (connect ropes / sticks family — greedy + min-heap)</li>
  <li><b>Bottom view of a binary tree</b></li>
  <li>One managerial question</li>
</ul>

<h4>Tips</h4>
<ul>
  <li>Interviews ran on <b>Amazon Chime</b>; each lasted 45–60 minutes.</li>
  <li>Review the Amazon Leadership Principles beforehand.</li>
  <li>Write code <i>and</i> articulate your thought process simultaneously.</li>
  <li>Dry-run your code.</li>
  <li>Stating time and space complexity is mandatory, not optional.</li>
</ul>

<h4>Verdict</h4>
<p><b>Selected</b> (6-month internship).</p>
`
},

/* ============================================================ 6 */
{
  id: "medium-sde1-offcampus-vineeth",
  title: "Amazon SDE-1 — Off-campus, M. Vineeth (Selected)",
  level: "SDE-1",
  loc: "India",
  when: "Oct 2021 – Mar 2022",
  verdict: "Selected",
  era: "older",
  tags: ["Full OA breakdown", "Bar Raiser", "STAR", "Long timeline"],
  source: { name: "Medium — vinscoder", url: "https://vinscoder1627.medium.com/amazon-sde-1-off-campus-interview-experience-selected-c111ca8a6689" },
  why: "Best round-by-round narration of the off-campus SDE-1 loop, with explicit interview technique advice.",
  html: `
<div class="stale">Dated 2021–22. The OA format has since changed (Work Simulation replaced parts of it) but the interview rounds are still representative.</div>

<h4>Background</h4>
<p>M. Vineeth, final-year CS undergrad at Bennett University, Greater Noida. Received a full-time SDE-1 offer from Amazon India. Total process: <b>~5.5 months</b>.</p>

<h4>Timeline</h4>
<ul>
  <li><b>9 Oct 2021</b> — applied for a 6-month SDE internship</li>
  <li><b>13–14 Nov 2021</b> — Online Assessment</li>
  <li><b>21 Dec 2021</b> — notified of an FTE opportunity</li>
  <li><b>25 Jan 2022</b> — Technical Round 1</li>
  <li><b>1–2 Feb 2022</b> — Technical Round 2</li>
  <li><b>11 Feb 2022</b> — Bar Raiser</li>
  <li><b>22 Mar 2022</b> — selected</li>
</ul>

<h4>Online Assessment (2.5 hours, 4 components)</h4>
<ul>
  <li><b>Code debugging</b> — 20 min, 7 questions: find the error, fix the logic</li>
  <li><b>Coding test</b> — 70 min, two problems (one easy, one hard)</li>
  <li><b>Workstyle assessment</b> — 20 min, behavioural, mapped to Leadership Principles</li>
  <li><b>Reasoning ability</b> — 35 min, basic aptitude</li>
</ul>

<h4>Technical Round 1 (25 Jan, ~1 hr)</h4>
<ul>
  <li><b>Find K Closest Elements</b> — first posed on an <i>unsorted</i> variation, then the sorted-array version requiring binary search + two pointers</li>
  <li><b>Rotting Oranges</b> — BFS with a queue</li>
</ul>
<p>Advice from the round: think aloud while coding, keep the code clean, modular and commented, and actively engage the interviewer rather than going heads-down.</p>

<h4>Technical Round 2 (1–2 Feb, ~1 hr)</h4>
<ul>
  <li>Detailed discussion of the candidate's ongoing internship (Business Technology Solutions Associate at ZS Associates)</li>
  <li>Leadership-based behavioural questions answered in <b>STAR</b> format</li>
  <li><b>Word Search II</b> — with a variation asking for the occurrences of the words within the grid</li>
</ul>
<p>Recommendation: lay out <b>all</b> the approaches you can see before committing to the optimal one.</p>

<h4>Bar Raiser / final round (11 Feb, ~1 hr)</h4>
<p>Conducted by a senior SDM with 25+ years of experience.</p>
<ul>
  <li>Résumé walk-through: academics, internship, projects</li>
  <li>Behavioural questions tied to the Leadership Principles</li>
  <li><b>Design Circular Queue</b> using a fixed-size array, with heavy edge-case handling</li>
  <li><b>Lowest Common Ancestor of a Binary Search Tree</b></li>
</ul>
<p>Critical advice from this round: dry-run on test cases, actively hunt for the edge cases you missed, and be able to <b>explain recursion execution step by step</b> — how the stack builds up and the order statements execute.</p>

<h4>Takeaways</h4>
<ul>
  <li>Patience is the key to off-campus placements — 1.5 months of silence after the final round before the offer.</li>
  <li>Understand recursion depth and stack mechanics, not just the recurrence.</li>
  <li>STAR format for every behavioural answer.</li>
  <li>Reference the Leadership Principles explicitly during the interview.</li>
</ul>
`
},

/* ============================================================ 7 */
{
  id: "gfg-sde1-supratik",
  title: "Amazon SDE-I — On-campus FTE, Supratik Mitra",
  level: "SDE-1",
  loc: "India (on-campus)",
  when: "Mar–Apr 2021",
  verdict: "Selected",
  era: "older",
  tags: ["Partial test cases still passed", "Trees", "Binary search", "LRU"],
  source: { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/interview-experiences/amazon-interview-experience-for-sde-i-on-campus/" },
  why: "The single most reassuring data point in the corpus: partial test cases and an unfinished last question, still selected.",
  html: `
<div class="stale">Dated 2021. Included for the process insight, not for current OA format.</div>

<h4>Background</h4>
<p>Amazon FTE hiring through campus, March 2021. One online coding round, then three virtual interviews.</p>

<h4>Online coding round</h4>
<p>About 40 candidates were shortlisted from it for the interview process the following week. Two coding problems. The candidate passed <b>8 of 13 test cases</b> on one and <b>2 of 9</b> on the other — and still advanced.</p>
<blockquote>The developers who make those questions actually go through your code thoroughly and find out whether you used the correct logic.</blockquote>

<h4>Interview round 1</h4>
<p>Brief self-introduction, then three coding questions:</p>
<ul>
  <li><b>Search in Rotated Sorted Array</b> — explained the binary search O(log n) solution</li>
  <li><b>Lowest Common Ancestor in a Binary Tree</b> — implemented successfully; the interviewer then modified the question</li>
  <li><b>Maximum Gap</b> — an O(n) solution was required. The candidate attempted a stack-based approach and could not fully optimise. The interviewer's response: <i>"Quite close."</i></li>
</ul>

<h4>Interview round 2</h4>
<p>Questions on the candidate's Machine Learning project, then the <b>Circular Tour</b> problem (a.k.a. Gas Station). Solved in O(n) time and O(1) space with no extra data structures; found and corrected mistakes during manual testing.</p>

<h4>Interview round 3</h4>
<p>Thorough examination of the project background and underlying concepts, then behavioural questions on the Leadership Principles. Final technical challenge: <b>implement a cache with get() and set()</b>. The candidate attempted an LRU cache using an array list plus a hashmap and acknowledged it was not optimal.</p>

<h4>Verdict</h4>
<p><b>Selected</b> — alongside seven other students from the same university, despite the imperfect final round.</p>

<h4>Tips</h4>
<ul>
  <li>Prioritise logic and approach over a perfect submission.</li>
  <li>Study the Leadership Principles; use STAR.</li>
  <li>Always state time and space complexity.</li>
  <li>Stay composed — interviews are <b>interactive, not interrogative</b> discussions of 45–60 minutes.</li>
</ul>
`
},

/* ============================================================ 8 */
{
  id: "medium-sde2-2026",
  title: "Amazon SDE-2 — 2026 (OA + virtual + 3-round onsite loop)",
  level: "SDE-2",
  loc: "India",
  when: "Mar 2026",
  verdict: "Unknown",
  era: "2026",
  tags: ["Onsite loop", "System design", "Monotonic stack", "Sliding window"],
  source: { name: "Medium — Code Prismo", url: "https://codeprismo.medium.com/amazon-interview-experience-sde-2-2026-c2cd6e71c035" },
  why: "The most recent full onsite-loop account. SDE-2 bar, but the round structure and LP questions carry down to SDE-1.",
  html: `
<h4>Round 1 — Online Assessment</h4>
<ul>
  <li><b>Technical:</b> two coding problems on <b>Dynamic Programming</b> and <b>Graph Theory</b></li>
  <li><b>Behavioural:</b> work-style assessment aligned to the Leadership Principles</li>
</ul>

<h4>Round 2 — Virtual technical interview (60 min)</h4>
<ul>
  <li><b>Coding:</b> sliding-window problems — window sum calculation and maximum-element identification</li>
  <li><b>LP:</b> "Tell me about a time you went above expectations." Answer in <b>STAR</b>.</li>
</ul>

<h4>Onsite loop — Round 1</h4>
<ul>
  <li><b>System design:</b> design YouTube — video uploads, likes, comments</li>
  <li><b>DSA:</b> a two-pointer problem</li>
  <li><b>LP:</b> handling a production failure</li>
</ul>

<h4>Onsite loop — Round 2</h4>
<ul>
  <li><b>DSA:</b> <b>Next Greater Element</b> using a monotonic stack</li>
  <li><b>DSA:</b> currency conversion rate calculation (graph / Evaluate Division family)</li>
  <li><b>LP:</b> a time you missed a deadline</li>
</ul>

<h4>Onsite loop — Round 3</h4>
<ul>
  <li><b>System design:</b> concert booking with concurrency (seat locking, double-booking prevention)</li>
  <li><b>LP:</b> a disagreement you had</li>
  <li><b>LP:</b> receiving critical feedback</li>
</ul>

<h4>Preparation resources the candidate recommends</h4>
<ul>
  <li>LeetCode and Striver's DSA series for algorithms</li>
  <li>Hello Interview for high-level design</li>
  <li>Shrayansh Jain's Udemy playlist for low-level design</li>
  <li>Deliberate STAR-method practice for behavioural rounds</li>
</ul>
`
},

/* ============================================================ 9 */
{
  id: "roundz-sde2-l5-blr",
  title: "Amazon SDE-2 / L5 — Bangalore, 5 YOE (Offer)",
  level: "SDE-2",
  loc: "Bangalore",
  when: "2025/26",
  verdict: "Selected",
  era: "2025",
  tags: ["Bangalore", "LLD + HLD", "Bar Raiser", "Amazon culture questions"],
  source: { name: "Roundz (Substack)", url: "https://roundz.substack.com/p/interview-experience-143-amazon-sde2-l5" },
  why: "Bangalore-specific, with the per-round minute-by-minute time split — useful for pacing your own rounds.",
  html: `
<h4>Background</h4>
<p><b>5 years of experience.</b> An Amazon recruiter made direct contact; the first two rounds were scheduled within a week. Whole process: <b>~15–20 days</b>. Location: <b>Bangalore</b>. Four rounds, 60 minutes each.</p>

<h4>Round 1 — DSA (Medium)</h4>
<ul>
  <li>Interviewer intro: 3 min</li>
  <li>Candidate intro: ~3 min</li>
  <li>Leadership-oriented situational question: 8–10 min</li>
  <li><b>Problem involving DFS and Knapsack approaches:</b> 25–30 min</li>
  <li><b>Intersection point of two linked lists:</b> 15 min</li>
  <li>Final 5 min: candidate asked about <b>Amazon's on-call culture</b> and patent policy</li>
</ul>

<h4>Round 2 — LLD and HLD (Medium, 2 interviewers, one shadowing)</h4>
<ul>
  <li>Intro: 5 min</li>
  <li><b>Design a scalable and concurrent parking garage system:</b> ~40 min</li>
  <li>Discussion of a challenging past project with follow-ups: 15 min</li>
  <li>Amazon culture and on-call differences between teams: 5 min</li>
</ul>
<p>Candidate's self-rated confidence: 80–90%.</p>

<h4>Round 3 — Behavioural (Medium, hiring manager)</h4>
<ul>
  <li>Intro: 3 min</li>
  <li>Leadership-principle questions and team scenarios: <b>45 min</b></li>
  <li>General Amazon culture discussion: 5–10 min</li>
</ul>

<h4>Round 4 — Bar Raiser (Hard, hiring manager + HR shadowing)</h4>
<ul>
  <li>Intro: 5 min</li>
  <li>Past experiences, projects and leadership principles: <b>50 min</b></li>
  <li>Questions on patent policy, team structure, task prioritisation, and SDE-2 role expectations</li>
</ul>
<p>Candidate's self-rated confidence: 90%.</p>

<h4>Outcome</h4>
<p><b>Offer extended.</b></p>

<h4>Preparation tips</h4>
<ul>
  <li>Master DSA fundamentals with multiple solution approaches per problem.</li>
  <li>Focus system design prep on <b>concurrency</b>.</li>
  <li>Prepare detailed stories aligned to the leadership principles.</li>
  <li>Research Amazon's internal culture, on-call responsibilities and patent policy — and ask about them.</li>
  <li>Clear communication and visible confidence count alongside technical skill.</li>
</ul>
`
},

/* ============================================================ 10 */
{
  id: "gfg-sde2-blr-rejected",
  title: "Amazon SDE-II — Bangalore (Rejected on LP rating)",
  level: "SDE-2",
  loc: "Bangalore",
  when: "—",
  verdict: "Rejected",
  era: "older",
  tags: ["Bangalore", "LLD", "Bar Raiser", "Rejected on Customer Obsession"],
  source: { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/amazon-interview-experience-for-sde-ii-bangalore/amp/" },
  why: "Read this one for the failure mode: technically clean across every round, rejected purely on an average Customer Obsession rating.",
  html: `
<h4>Background</h4>
<p>Approached by an Amazon recruiter on LinkedIn for an SDE-2 role in Bangalore. Initial call covered role expectations both ways.</p>

<h4>HackerRank online round (Medium)</h4>
<ul>
  <li>Two coding problems</li>
  <li>Scenario-based system-design questions: database selection, queue systems, PRD grooming, project initiation</li>
</ul>

<h4>Technical round 1 (Medium, 20–25 min)</h4>
<ul>
  <li>Leadership-principle evaluation</li>
  <li><b>Zig-Zag level order traversal of a binary tree</b></li>
  <li><b>Sliding Window Maximum</b></li>
</ul>

<h4>Technical round 2 (Medium)</h4>
<ul>
  <li><b>Low-level design:</b> a BookMyShow-like service</li>
  <li>10–15 min of LP discussion</li>
</ul>

<h4>Technical round 3 — Hiring manager (Medium)</h4>
<ul>
  <li>High-level design evaluation</li>
  <li>Extensive project discussion</li>
  <li>LP questions woven throughout</li>
</ul>

<h4>Bar Raiser round (Hard)</h4>
<ul>
  <li><b>30–35 minutes of LP questioning</b></li>
  <li><b>Buy-and-sell stocks</b> with modifications</li>
  <li><b>Maximum number arrangement from lists of numbers</b> (Largest Number family)</li>
  <li>Pseudocode and dry runs were explicitly required</li>
</ul>

<h4>Outcome</h4>
<p><b>Rejected.</b> HR cited an <b>average LP rating on "Customer Obsession"</b> as the deciding factor — after clean technical performance in every round.</p>

<h4>Takeaways</h4>
<ul>
  <li>Prepare <b>concise</b> LP answers — rambling hurts.</li>
  <li>Practise dry runs out loud with another person.</li>
  <li>Expect DP, greedy and BST questions.</li>
  <li>Behavioural assessment carries decisive weight. You can be rejected on LPs alone.</li>
</ul>
`
},

/* ============================================================ 11 */
{
  id: "gfg-sde-intern-india",
  title: "Amazon SDE Intern — India (Rejected)",
  level: "Intern",
  loc: "India",
  when: "Jul–Aug 2023",
  verdict: "Rejected",
  era: "older",
  tags: ["Hiring Interest Form", "Single interview", "Rejected"],
  source: { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/interview-experiences/amazon-india-interview-experience-sde-intern/" },
  why: "Included because it starts with the same 'Hiring Interest Form' step you just went through, and shows a fast-fail path.",
  html: `
<h4>Timeline</h4>
<ul>
  <li><b>21 Jul 2023</b> — invitation received for a 6-month internship; <b>Hiring Interest Form</b> to complete</li>
  <li><b>24 Jul</b> — follow-up communication</li>
  <li><b>26 Jul</b> — Online Assessment</li>
  <li><b>29 Jul</b> — cleared the OA</li>
  <li><b>9 Aug</b> — interview</li>
  <li><b>11 Aug</b> — rejection</li>
</ul>

<h4>Online Assessment</h4>
<ul>
  <li>Coding assessment: <b>70 minutes</b></li>
  <li>Workstyles assessment: <b>15 minutes</b></li>
  <li>Feedback survey: <b>5 minutes</b></li>
</ul>

<h4>Interview (45–60 min, three parts)</h4>
<ol>
  <li><b>Introduction</b> — background, education, career aspirations</li>
  <li><b>Project discussion</b> — three projects: a Mental Health Prediction App, a Chat Application, and a Music Web App. Focus on technologies used, challenges hit, and personal contribution.</li>
  <li><b>Coding:</b> in a given sorted array, find the index of a specified element. Solved with binary search, explaining logic, edge cases and time complexity.</li>
</ol>

<h4>Outcome</h4>
<p><b>Rejected</b> on 11 August.</p>

<h4>Takeaways</h4>
<ul>
  <li>Time management during the assessment matters as much as correctness.</li>
  <li>Be able to articulate your projects clearly and crisply.</li>
  <li>Strong DSA fundamentals — binary search in particular.</li>
  <li>A single easy coding question does not mean an easy round; the project articulation was the real gate.</li>
</ul>
`
}

];
