/* ------------------------------------------------------------------
   Amazon Prep — round-wise question bank
   Every row is traceable to one of the experiences in experiences.js
   `slug` -> leetcode.com/problems/<slug>/   |   no slug -> web search link
------------------------------------------------------------------- */

const SRC = {
  ie26:   { name: "SDE-1 India, Feb 2026",        url: "https://interviewexperiences.in/experience/amazon/amazon-sde-1-interview-experience-india-2026" },
  gfgSel: { name: "SDE-1, Verdict Selected",      url: "https://www.geeksforgeeks.org/interview-experiences/sde-1-amazon-experience-verdict-selected/" },
  gfgRef: { name: "SDE-1 referral, 5 rounds",     url: "https://www.geeksforgeeks.org/interview-experiences/amazon-interview-experience-for-sde-1/" },
  gfgChn: { name: "SDE-1 Chennai drive",          url: "https://www.geeksforgeeks.org/interview-experiences/amazon-interview-experience-for-sde-1-1-5-years-experienced/" },
  gfgOnC: { name: "SDE-1 on-campus",              url: "https://www.geeksforgeeks.org/interview-experiences/amazon-interview-experience-for-sde-i-on-campus/" },
  medVin: { name: "SDE-1 off-campus (Vineeth)",   url: "https://vinscoder1627.medium.com/amazon-sde-1-off-campus-interview-experience-selected-c111ca8a6689" },
  gfgSup: { name: "SDE-I on-campus (Supratik)",   url: "https://www.geeksforgeeks.org/interview-experiences/amazon-interview-experience-for-sde-i-on-campus/" },
  med26:  { name: "SDE-2 2026 onsite loop",       url: "https://codeprismo.medium.com/amazon-interview-experience-sde-2-2026-c2cd6e71c035" },
  roundz: { name: "SDE-2 / L5 Bangalore",         url: "https://roundz.substack.com/p/interview-experience-143-amazon-sde2-l5" },
  gfgS2:  { name: "SDE-II Bangalore (rejected)",  url: "https://www.geeksforgeeks.org/amazon-interview-experience-for-sde-ii-bangalore/amp/" },
  gfgInt: { name: "SDE Intern India",             url: "https://www.geeksforgeeks.org/interview-experiences/amazon-india-interview-experience-sde-intern/" },
  guide:  { name: "India SDE guide 2026",         url: "https://tryrehearsal.ai/blog/amazon-india-sde-interview-2026" },
  list:   { name: "LeetCode: last-6-months list", url: "https://leetcode.com/discuss/post/7355849/amazon-interview-experiences-last-6-mont-cfv1/" }
};

const QUESTION_GROUPS = [
{
  id: "g-oa",
  title: "Online Assessment",
  sub: "You have already cleared this. Kept for reference on what the OA signalled about the loop that follows.",
  rows: [
    { q: "Binary Search on Answer", topic: "Binary search", diff: "Medium", slug: "capacity-to-ship-packages-within-d-days", src: SRC.ie26, note: "OA Q1 in Feb 2026. Practise the pattern via Capacity To Ship Packages." },
    { q: "Greedy problem using a Priority Queue", topic: "Greedy / Heap", diff: "Medium", search: "amazon greedy priority queue problem leetcode", src: SRC.ie26, note: "OA Q2 in Feb 2026." },
    { q: "Two problems on DP and Graph Theory", topic: "DP / Graphs", diff: "Medium", search: "leetcode dynamic programming graph amazon oa", src: SRC.med26, note: "SDE-2 2026 OA technical section." },
    { q: "Maximum Units on a Truck", topic: "Greedy", diff: "Easy", slug: "maximum-units-on-a-truck", src: SRC.gfgOnC },
    { q: "Minimum Platforms", topic: "Greedy / Sorting", diff: "Medium", search: "minimum platforms required railway station geeksforgeeks", src: SRC.gfgOnC },
    { q: "Course Schedule", topic: "Graph / Topo sort", diff: "Medium", slug: "course-schedule", src: SRC.gfgRef, note: "Appeared in the 90-min written screen." },
    { q: "Reverse String II", topic: "Strings", diff: "Easy", slug: "reverse-string-ii", src: SRC.gfgRef },
    { q: "Code debugging section — 6-7 questions in 20 min (C / C++ / Java)", topic: "Debugging", diff: "—", search: "amazon online assessment code debugging questions", src: SRC.gfgOnC, note: "Speed-limited, not difficulty-limited." },
    { q: "Workstyles / Work Simulation assessment", topic: "Behavioural", diff: "—", search: "amazon work simulation assessment leadership principles", src: SRC.ie26, note: "The Feb 2026 candidate credits clearing the OA to steering these answers toward teamwork, ownership and initiative." }
  ]
},
{
  id: "g-r1",
  title: "Round 1 — DSA / Technical",
  sub: "Typically 45-60 min: 5-10 min intro, one LP question, then 1-2 coding problems. Expect to be pushed up the optimisation ladder rather than accepted at the first working answer.",
  rows: [
    { q: "House Robber (1D DP)", topic: "DP", diff: "Medium", slug: "house-robber", src: SRC.ie26, note: "Interviewer walked recursion -> memoisation -> tabulation -> O(1) space, asking why at every step. Be ready to defend each transition." },
    { q: "CP-style array problem requiring HashMap<Integer, Stack<Integer>>", topic: "Hashing / Stack", diff: "Medium", search: "hashmap of stacks array problem interview", src: SRC.ie26, note: "Scored on picking the right compound data structure quickly." },
    { q: "String + Prefix Sum problem", topic: "Prefix sum", diff: "Medium", slug: "subarray-sum-equals-k", src: SRC.gfgSel, note: "Round 1 topic pair. Subarray Sum Equals K is the canonical drill." },
    { q: "Find K Closest Elements", topic: "Binary search / Two pointers", diff: "Medium", slug: "find-k-closest-elements", src: SRC.medVin, note: "Posed first on an UNSORTED variation, then the sorted version." },
    { q: "Rotting Oranges", topic: "BFS", diff: "Medium", slug: "rotting-oranges", src: SRC.medVin },
    { q: "Search in Rotated Sorted Array", topic: "Binary search", diff: "Medium", slug: "search-in-rotated-sorted-array", src: SRC.gfgSup },
    { q: "Lowest Common Ancestor of a Binary Tree", topic: "Trees", diff: "Medium", slug: "lowest-common-ancestor-of-a-binary-tree", src: SRC.gfgSup, note: "Interviewer modified the question after the first solution landed." },
    { q: "Maximum Gap", topic: "Sorting / Bucket", diff: "Hard", slug: "maximum-gap", src: SRC.gfgSup, note: "O(n) required. Candidate could not fully optimise and was still selected." },
    { q: "Palindrome Linked List", topic: "Linked list", diff: "Easy", slug: "palindrome-linked-list", src: SRC.gfgOnC, note: "Asked with variations." },
    { q: "Knight's Shortest Path on a board", topic: "BFS", diff: "Medium", search: "steps by knight geeksforgeeks", src: SRC.gfgOnC, note: "Asked with variations." },
    { q: "Convert Array into Zig-Zag Fashion", topic: "Arrays / Greedy", diff: "Easy", search: "convert array into zig zag fashion geeksforgeeks", src: SRC.gfgRef, note: "Pen and paper." },
    { q: "Bottom View of Binary Tree", topic: "Trees", diff: "Medium", search: "bottom view of binary tree geeksforgeeks", src: SRC.gfgRef, note: "Follow-up: implement top OR bottom view based on a runtime choice." },
    { q: "Sliding Window Maximum", topic: "Deque / Monotonic", diff: "Hard", slug: "sliding-window-maximum", src: SRC.gfgRef, note: "Appears in two separate experiences (SDE-1 and SDE-2 Bangalore)." },
    { q: "Binary Tree Zigzag Level Order Traversal", topic: "Trees / BFS", diff: "Medium", slug: "binary-tree-zigzag-level-order-traversal", src: SRC.gfgS2 },
    { q: "Intersection of Two Linked Lists", topic: "Linked list", diff: "Easy", slug: "intersection-of-two-linked-lists", src: SRC.roundz, note: "Given 15 min as the second problem of the round." },
    { q: "Problem combining DFS and Knapsack", topic: "Graphs + DP", diff: "Medium", search: "dfs knapsack combined problem leetcode", src: SRC.roundz, note: "25-30 min, the main problem of the round." },
    { q: "Binary tree: difference between sum of elements at odd and even levels", topic: "Trees", diff: "Medium", search: "difference between odd and even level sum binary tree", src: SRC.gfgChn, note: "With diagonal-level consideration. O(1) space, O(n) time expected." },
    { q: "Matrix DP: max sum path top-left to bottom row (down + diagonal-right)", topic: "DP on grid", diff: "Medium", search: "maximum sum path in matrix down diagonal geeksforgeeks", src: SRC.gfgChn },
    { q: "Two-pointer problem", topic: "Two pointers", diff: "Medium", slug: "container-with-most-water", src: SRC.med26, note: "Onsite round 1, alongside a system design question." },
    { q: "Sliding window: window sums and maximum element", topic: "Sliding window", diff: "Medium", slug: "sliding-window-maximum", src: SRC.med26, note: "Virtual technical round, 60 min." }
  ]
},
{
  id: "g-r2",
  title: "Round 2 — Project deep-dive + coding",
  sub: "The round most people under-prepare. In the Feb 2026 SDE-1 loop the interviewer announced two DSA questions, then spent 40 of 60 minutes on the candidate's project and left only ~15 min for 4Sum.",
  rows: [
    { q: "4Sum", topic: "Two pointers", diff: "Medium", slug: "4sum", src: SRC.ie26, note: "Only ~15 min left after the project talk. Duplicates handling, sort + two-pointer, complexity reasoning." },
    { q: "Word Search II", topic: "Trie / Backtracking", diff: "Hard", slug: "word-search-ii", src: SRC.medVin, note: "Variation: also output where each word occurs in the grid." },
    { q: "Word Break", topic: "DP", diff: "Medium", slug: "word-break", src: SRC.gfgChn, note: "Delivered story-framed so the DP was not obvious. Candidate went Trie, never reached optimal DP, still selected." },
    { q: "Binary Tree Maximum Path Sum", topic: "Trees / DP", diff: "Hard", slug: "binary-tree-maximum-path-sum", src: SRC.gfgChn },
    { q: "Find Minimum in Rotated Sorted Array", topic: "Binary search", diff: "Medium", slug: "find-minimum-in-rotated-sorted-array", src: SRC.gfgRef },
    { q: "Gas Station / Circular Tour", topic: "Greedy", diff: "Medium", slug: "gas-station", src: SRC.gfgSup, note: "Solved in O(n) time, O(1) space with no extra data structures." },
    { q: "Vertical Order Traversal of a Binary Tree", topic: "Trees", diff: "Hard", slug: "vertical-order-traversal-of-a-binary-tree", src: SRC.gfgRef },
    { q: "Largest Subarray with 0 Sum", topic: "Prefix sum / Hashing", diff: "Medium", slug: "contiguous-array", src: SRC.gfgRef, note: "Pushed to optimise to a single pass. LeetCode Contiguous Array is the binary-array cousin of the same technique." },
    { q: "Next Greater Element", topic: "Monotonic stack", diff: "Easy", slug: "next-greater-element-i", src: SRC.med26, note: "Explicitly asked to use a monotonic stack." },
    { q: "Currency conversion rates", topic: "Graph / DFS", diff: "Medium", slug: "evaluate-division", src: SRC.med26, note: "Same problem shape as Evaluate Division. Also appeared in a Bar Raiser round as a/b = 2.3." },
    { q: "Graph + Dynamic Programming pair", topic: "Graphs / DP", diff: "Medium", search: "amazon graph dynamic programming interview questions", src: SRC.gfgSel, note: "The stated topic pair for round 2." },
    { q: "Rearrange array so no element equals the mean of its neighbours", topic: "Arrays", diff: "Medium", search: "rearrange array no element equal mean of adjacent elements", src: SRC.gfgOnC },
    { q: "Height of a special binary tree", topic: "Trees", diff: "Medium", search: "height of special binary tree geeksforgeeks", src: SRC.gfgOnC },
    { q: "Minimum cost merge (connect ropes / sticks)", topic: "Greedy / Heap", diff: "Medium", search: "minimum cost of ropes geeksforgeeks", src: SRC.gfgOnC },
    { q: "Find index of an element in a sorted array", topic: "Binary search", diff: "Easy", slug: "binary-search", src: SRC.gfgInt, note: "Sole coding question of an intern round. Easy problem, but the round was decided on project articulation." }
  ]
},
{
  id: "g-r3",
  title: "Round 3 — Leadership Principles (+ a hard coding question)",
  sub: "Do not read 'behavioural' as 'soft'. The Feb 2026 candidate called this the toughest round: ~40 min of poker-faced LP interrogation, then Binary Tree Cameras. One SDE-II was rejected here on LPs alone after clean technical rounds.",
  rows: [
    { q: "Binary Tree Cameras", topic: "Tree DP", diff: "Hard", slug: "binary-tree-cameras", src: SRC.ie26, note: "Budgeted 20 min, extended to ~30. State definition, bottom-up recursion, why greedy alone fails, leaf and null handling." },
    { q: "LRU Cache / implement a cache with get() and set()", topic: "Design / Hashing", diff: "Medium", slug: "lru-cache", src: SRC.gfgSup, note: "Candidate's array-list + hashmap answer was sub-optimal and they were still selected." },
    { q: "Design Circular Queue (fixed-size array)", topic: "Design", diff: "Medium", slug: "design-circular-queue", src: SRC.medVin, note: "Bar Raiser round. Heavy edge-case handling expected." },
    { q: "Lowest Common Ancestor of a Binary Search Tree", topic: "Trees / BST", diff: "Medium", slug: "lowest-common-ancestor-of-a-binary-search-tree", src: SRC.medVin, note: "Bar Raiser. Asked to explain the recursion stack step by step." },
    { q: "Buy and sell stocks (with modifications)", topic: "Greedy / DP", diff: "Medium", slug: "best-time-to-buy-and-sell-stock-ii", src: SRC.gfgS2, note: "Bar Raiser. Pseudocode and dry runs explicitly required." },
    { q: "Maximum number arrangement from a list of numbers", topic: "Sorting / Greedy", diff: "Medium", slug: "largest-number", src: SRC.gfgS2, note: "Bar Raiser, medium-hard." },
    { q: "Evaluate Division (a/b = 2.3, solve a/a, b/a)", topic: "Graph traversal", diff: "Medium", slug: "evaluate-division", src: SRC.gfgRef, note: "Bar Raiser, on a collaborative editor. Nodes are variables, edges carry the ratio." },
    { q: "File compression algorithm", topic: "Greedy / Huffman", diff: "Medium", search: "huffman coding file compression algorithm implementation", src: SRC.gfgChn, note: "Bar Raiser round." },
    { q: "Wildcard Pattern Matching", topic: "DP / Strings", diff: "Hard", slug: "wildcard-matching", src: SRC.gfgChn, note: "From the written screen of a Chennai drive." },
    { q: "Row with maximum number of 1s in a sorted binary matrix", topic: "Binary search / Matrix", diff: "Easy", search: "row with max 1s sorted binary matrix geeksforgeeks", src: SRC.gfgChn }
  ]
},
{
  id: "g-reported",
  title: "Also reported in parallel loops (same hiring cycle)",
  sub: "The Feb 2026 SDE-1 candidate listed these as questions asked in variant rounds of the same cycle. Cheapest high-value list in the whole page — every one is a named LeetCode problem.",
  rows: [
    { q: "Course Schedule", topic: "Topological sort", diff: "Medium", slug: "course-schedule", src: SRC.ie26 },
    { q: "Course Schedule II", topic: "Topological sort", diff: "Medium", slug: "course-schedule-ii", src: SRC.ie26 },
    { q: "Capacity To Ship Packages Within D Days", topic: "Binary search on answer", diff: "Medium", slug: "capacity-to-ship-packages-within-d-days", src: SRC.ie26 },
    { q: "Find Median from Data Stream", topic: "Two heaps", diff: "Hard", slug: "find-median-from-data-stream", src: SRC.ie26 },
    { q: "Logger Rate Limiter", topic: "Design / Hashing", diff: "Easy", slug: "logger-rate-limiter", src: SRC.ie26 },
    { q: "Target Sum (0/1 Knapsack)", topic: "DP", diff: "Medium", slug: "target-sum", src: SRC.ie26 },
    { q: "LRU Cache", topic: "Design", diff: "Medium", slug: "lru-cache", src: SRC.ie26 },
    { q: "Subarray Sums Divisible by K", topic: "Prefix sum", diff: "Medium", slug: "subarray-sums-divisible-by-k", src: SRC.ie26 }
  ]
},
{
  id: "g-highfreq",
  title: "High-frequency Amazon India list (not tied to one experience)",
  sub: "Compiled from the 2026 India SDE guide. Use as a gap-check after the round-specific lists above.",
  rows: [
    { q: "Two Sum", topic: "Hashing", diff: "Easy", slug: "two-sum", src: SRC.guide },
    { q: "Maximum Subarray", topic: "DP / Kadane", diff: "Medium", slug: "maximum-subarray", src: SRC.guide },
    { q: "Minimum Window Substring", topic: "Sliding window", diff: "Hard", slug: "minimum-window-substring", src: SRC.guide },
    { q: "Container With Most Water", topic: "Two pointers", diff: "Medium", slug: "container-with-most-water", src: SRC.guide },
    { q: "3Sum", topic: "Two pointers", diff: "Medium", slug: "3sum", src: SRC.guide },
    { q: "Merge Intervals", topic: "Intervals", diff: "Medium", slug: "merge-intervals", src: SRC.guide },
    { q: "Meeting Rooms II", topic: "Intervals / Heap", diff: "Medium", slug: "meeting-rooms-ii", src: SRC.guide, note: "LeetCode Premium. Free equivalent: Minimum Number of Arrows / GfG Minimum Platforms." },
    { q: "Number of Islands", topic: "BFS / DFS", diff: "Medium", slug: "number-of-islands", src: SRC.guide },
    { q: "Serialize and Deserialize Binary Tree", topic: "Trees / Design", diff: "Hard", slug: "serialize-and-deserialize-binary-tree", src: SRC.guide },
    { q: "Coin Change", topic: "DP", diff: "Medium", slug: "coin-change", src: SRC.guide },
    { q: "Longest Increasing Subsequence", topic: "DP", diff: "Medium", slug: "longest-increasing-subsequence", src: SRC.guide }
  ]
},
{
  id: "g-design",
  title: "Design questions (LLD / HLD)",
  sub: "Rare at SDE-1 as a dedicated round, but a design-flavoured question inside a coding round is common — usually 'design a data structure that supports X'. At SDE-2 it is a full round.",
  rows: [
    { q: "Data structure for post offices with hierarchy (Country > State > City > Town > Name) + query by region", topic: "LLD (SDE-1)", diff: "Medium", search: "design hierarchical data structure trie hashmap nested lookup", src: SRC.gfgRef, note: "20-25 min inside a technical round. Candidate proposed nested hash maps / BSTs per level." },
    { q: "Cache with get() and set()", topic: "LLD (SDE-1)", diff: "Medium", slug: "lru-cache", src: SRC.gfgSup },
    { q: "Design a scalable and concurrent parking garage system", topic: "LLD + concurrency", diff: "Medium", search: "parking lot low level design concurrency interview", src: SRC.roundz, note: "~40 min. Concurrency was the emphasis, not the class diagram." },
    { q: "Design a BookMyShow-like service", topic: "LLD", diff: "Medium", search: "bookmyshow low level design interview seat booking", src: SRC.gfgS2 },
    { q: "Design YouTube (uploads, likes, comments)", topic: "HLD", diff: "Medium", search: "design youtube system design interview", src: SRC.med26 },
    { q: "Concert booking with concurrency (seat locking, no double-booking)", topic: "HLD + concurrency", diff: "Medium", search: "ticket booking system design concurrency seat locking", src: SRC.med26 },
    { q: "URL shortener / rate limiter / notification system", topic: "HLD (SDE-2)", diff: "Medium", search: "url shortener rate limiter notification system design", src: SRC.guide },
    { q: "Scenario questions: database selection, queue systems, PRD grooming, project initiation", topic: "HLD scenarios", diff: "Medium", search: "sql vs nosql choose database message queue system design", src: SRC.gfgS2, note: "Asked as written scenario questions in a HackerRank round." }
  ]
},
{
  id: "g-fundas",
  title: "CS fundamentals asked live",
  sub: "Shows up more in drive / in-person formats than in virtual loops. Cheap to revise, expensive to fumble.",
  rows: [
    { q: "CPU scheduling algorithms", topic: "OS", diff: "—", search: "cpu scheduling algorithms fcfs sjf round robin", src: SRC.gfgChn, note: "Bar Raiser round." },
    { q: "Race conditions; mutex vs semaphore implementation", topic: "OS / Concurrency", diff: "—", search: "mutex vs semaphore difference implementation", src: SRC.gfgChn },
    { q: "Transactions, deadlocks, critical sections, semaphores for multi-process scenarios", topic: "OS / DB", diff: "—", search: "deadlock critical section semaphore multi process", src: SRC.gfgRef },
    { q: "MCQs on data structures and operating systems (20 questions)", topic: "OS / DS", diff: "—", search: "data structures operating systems mcq interview", src: SRC.gfgRef, note: "Part of a 90-min written screen." },
    { q: "Amazon on-call culture, patent policy, team structure, task prioritisation", topic: "Ask THEM", diff: "—", search: "amazon on call culture sde india", src: SRC.roundz, note: "Not a test - the L5 candidate used their 5 spare minutes each round on these and got an offer. Have 2-3 real questions ready." }
  ]
}
];

/* ---------- Leadership Principles ---------- */

const LP_REPORTED = {
  title: "LP questions actually reported in these loops",
  note: "These are the ones candidates in the corpus above were really asked. Prepare a STAR story for each.",
  items: [
    { q: "Deep dive into a past experience — with repeated follow-ups challenging your decision from different angles", src: SRC.ie26 },
    { q: "Tell me about a time you took ownership of something", src: SRC.ie26 },
    { q: "Describe a conflict and how you resolved it", src: SRC.ie26 },
    { q: "Tell me about a failure and how you handled it", src: SRC.ie26 },
    { q: "A technical challenge you faced", src: SRC.gfgSel },
    { q: "Solving a problem with limited information", src: SRC.gfgSel },
    { q: "A conflict with a teammate or with your manager", src: SRC.gfgSel },
    { q: "Tell me about a time you went above expectations", src: SRC.med26 },
    { q: "Tell me about a production failure you handled", src: SRC.med26 },
    { q: "Tell me about a time you missed a deadline", src: SRC.med26 },
    { q: "Tell me about a disagreement you had", src: SRC.med26 },
    { q: "Tell me about receiving critical feedback", src: SRC.med26 },
    { q: "Cross-team collaboration you drove", src: SRC.gfgChn },
    { q: "Managing a product release crisis", src: SRC.gfgChn },
    { q: "A leadership-oriented situational question (8-10 min, opening the DSA round)", src: SRC.roundz },
    { q: "Team scenarios — 45 minutes straight with the hiring manager", src: SRC.roundz }
  ]
};

const LP_BANK = [
  { lp: "1. Customer Obsession", qs: ["Tell me about a time you went above and beyond for a customer."], warn: "An SDE-II in Bangalore was rejected specifically on an average rating here, after clean technical rounds." },
  { lp: "2. Ownership", qs: ["Tell me about a time you took on something significant outside your area of responsibility."] },
  { lp: "3. Invent and Simplify", qs: ["Tell me about a time you invented something that seemed obvious in hindsight."] },
  { lp: "4. Are Right, A Lot", qs: ["Tell me about a time you were wrong. How did you know, and what did you do?"] },
  { lp: "5. Learn and Be Curious", qs: ["Tell me about something new you learned that changed your approach."] },
  { lp: "6. Hire and Develop the Best", qs: ["Tell me about someone you hired or developed. What did you see in them?"] },
  { lp: "7. Insist on the Highest Standards", qs: ["Tell me about a time your standards were higher than your team's."] },
  { lp: "8. Think Big", qs: ["Tell me about the biggest impact you have had."] },
  { lp: "9. Bias for Action", qs: ["Tell me about a decision you made without all the data you wanted."] },
  { lp: "10. Frugality", qs: ["Tell me about something you accomplished with very limited resources."] },
  { lp: "11. Earn Trust", qs: ["Tell me about a time you earned the trust of a group."] },
  { lp: "12. Dive Deep", qs: ["Tell me about a time you had to dive deep to solve a problem."] },
  { lp: "13. Have Backbone; Disagree and Commit", qs: ["Tell me about a time you disagreed with a decision."] },
  { lp: "14. Deliver Results", qs: ["Tell me about your most significant achievement."] },
  { lp: "15. Strive to be Earth's Best Employer", qs: ["Tell me about a time you helped a colleague who was struggling."] },
  { lp: "16. Success and Scale Bring Broad Responsibility", qs: ["Tell me about a time you considered the broader impact of a technical decision."] }
];
