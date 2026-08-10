/* ------------------------------------------------------------------
   Amazon Prep — DSA practice sheet, topic by topic
   `corpus: 1` = this exact problem appears in the interview experiences
                 collected on the Experiences page.
   `slug` -> leetcode.com/problems/<slug>/   |  `search` -> web search
   d: E | M | H
------------------------------------------------------------------- */

const DSA_TOPICS = [

/* ================================================== ARRAYS */
{
  id: "t-arrays",
  title: "Arrays",
  order: 1,
  why: "Everything else sits on top of this. Roughly a third of Amazon coding questions are an array question wearing a costume.",
  learn: [
    "Indexing, in-place vs extra space, and why O(1) extra space gets asked for",
    "Two pointers — opposite ends (sorted) and same direction (fast/slow)",
    "Sliding window — fixed size and variable size; when to shrink",
    "Prefix sums, and prefix sum + hashmap for subarray-sum problems",
    "Kadane's algorithm and the general 'best ending here' DP idea",
    "Sorting as a preprocessing step — the cost is O(n log n), decide if you can afford it",
    "Binary search on a sorted array (see the Binary Search topic for the full treatment)",
    "Matrix as a 2D array: traversal orders, in-place rotation, boundary handling"
  ],
  patterns: ["Two pointers", "Sliding window", "Prefix sum", "Kadane", "Sort + scan", "In-place marking", "Cyclic sort"],
  tiers: [
    { name: "Warm-up", note: "Build the reflexes. Do these fast, do not linger.", items: [
      { q: "Two Sum", slug: "two-sum", d: "E", tag: "Hashing" },
      { q: "Best Time to Buy and Sell Stock", slug: "best-time-to-buy-and-sell-stock", d: "E", tag: "One pass" },
      { q: "Move Zeroes", slug: "move-zeroes", d: "E", tag: "Two pointers" },
      { q: "Merge Sorted Array", slug: "merge-sorted-array", d: "E", tag: "Two pointers, from the back" },
      { q: "Majority Element", slug: "majority-element", d: "E", tag: "Boyer-Moore" },
      { q: "Maximum Units on a Truck", slug: "maximum-units-on-a-truck", d: "E", tag: "Greedy", corpus: 1 },
      { q: "Remove Duplicates from Sorted Array", slug: "remove-duplicates-from-sorted-array", d: "E", tag: "Two pointers" }
    ]},
    { name: "Core — most asked", note: "If you only have time for one tier, this is the one.", items: [
      { q: "Maximum Subarray", slug: "maximum-subarray", d: "M", tag: "Kadane" },
      { q: "Product of Array Except Self", slug: "product-of-array-except-self", d: "M", tag: "Prefix/suffix" },
      { q: "3Sum", slug: "3sum", d: "M", tag: "Sort + two pointers" },
      { q: "4Sum", slug: "4sum", d: "M", tag: "Sort + two pointers", corpus: 1 },
      { q: "Container With Most Water", slug: "container-with-most-water", d: "M", tag: "Two pointers", corpus: 1 },
      { q: "Sort Colors (Dutch national flag)", slug: "sort-colors", d: "M", tag: "Three pointers" },
      { q: "Subarray Sum Equals K", slug: "subarray-sum-equals-k", d: "M", tag: "Prefix + hashmap", corpus: 1 },
      { q: "Subarray Sums Divisible by K", slug: "subarray-sums-divisible-by-k", d: "M", tag: "Prefix + modulo", corpus: 1 },
      { q: "Merge Intervals", slug: "merge-intervals", d: "M", tag: "Intervals", corpus: 1 },
      { q: "Insert Interval", slug: "insert-interval", d: "M", tag: "Intervals" },
      { q: "Gas Station", slug: "gas-station", d: "M", tag: "Greedy", corpus: 1, note: "Reported as 'circular tour'. Expected O(n) time, O(1) space." },
      { q: "Rotate Array", slug: "rotate-array", d: "M", tag: "Reversal trick" },
      { q: "Find the Duplicate Number", slug: "find-the-duplicate-number", d: "M", tag: "Floyd cycle" },
      { q: "Maximum Product Subarray", slug: "maximum-product-subarray", d: "M", tag: "Kadane variant" },
      { q: "Next Permutation", slug: "next-permutation", d: "M", tag: "In-place" },
      { q: "K Closest Points to Origin", slug: "k-closest-points-to-origin", d: "M", tag: "Heap / quickselect" }
    ]},
    { name: "Matrix", note: "In-person rounds like these because they are easy to draw on a whiteboard.", items: [
      { q: "Spiral Matrix", slug: "spiral-matrix", d: "M", tag: "Boundaries" },
      { q: "Rotate Image", slug: "rotate-image", d: "M", tag: "In-place transpose" },
      { q: "Set Matrix Zeroes", slug: "set-matrix-zeroes", d: "M", tag: "O(1) space marking" },
      { q: "Search a 2D Matrix", slug: "search-a-2d-matrix", d: "M", tag: "Binary search" },
      { q: "Row with maximum number of 1s in a sorted binary matrix", search: "row with max 1s sorted binary matrix geeksforgeeks", d: "E", tag: "Staircase search", corpus: 1 }
    ]},
    { name: "Stretch", note: "Only if the core list is done.", items: [
      { q: "Trapping Rain Water", slug: "trapping-rain-water", d: "H", tag: "Two pointers / stack" },
      { q: "First Missing Positive", slug: "first-missing-positive", d: "H", tag: "Cyclic sort" },
      { q: "Median of Two Sorted Arrays", slug: "median-of-two-sorted-arrays", d: "H", tag: "Binary search on partition" }
    ]}
  ]
},

/* ================================================== STRINGS */
{
  id: "t-strings",
  title: "Strings",
  order: 2,
  why: "A string is an array of characters, so every array pattern transfers. The extra content is immutability, character-frequency maps, and parsing.",
  learn: [
    "Mutability: in Java/Python strings are immutable — repeated concatenation in a loop is O(n^2). Use StringBuilder / list + join",
    "Character frequency as int[26] or int[128] vs a HashMap, and when each is right",
    "Sliding window on strings — the 'expand right, shrink left while invalid' template",
    "Two pointers for palindromes, including expand-around-centre",
    "Anagram checking by sort vs by frequency count",
    "Parsing: tokenising, handling signs, whitespace, overflow (atoi is a classic edge-case interview)",
    "String matching basics — brute force, and know that KMP/Rabin-Karp exist and roughly how"
  ],
  patterns: ["Sliding window", "Frequency map", "Two pointers", "Expand around centre", "Stack for nesting", "Trie for prefixes"],
  tiers: [
    { name: "Warm-up", items: [
      { q: "Valid Palindrome", slug: "valid-palindrome", d: "E", tag: "Two pointers" },
      { q: "Valid Anagram", slug: "valid-anagram", d: "E", tag: "Frequency" },
      { q: "Longest Common Prefix", slug: "longest-common-prefix", d: "E", tag: "Scan" },
      { q: "Reverse String II", slug: "reverse-string-ii", d: "E", tag: "Indexing", corpus: 1 },
      { q: "Ransom Note", slug: "ransom-note", d: "E", tag: "Frequency" },
      { q: "First Unique Character in a String", slug: "first-unique-character-in-a-string", d: "E", tag: "Frequency" },
      { q: "Roman to Integer", slug: "roman-to-integer", d: "E", tag: "Parsing" }
    ]},
    { name: "Core — most asked", items: [
      { q: "Longest Substring Without Repeating Characters", slug: "longest-substring-without-repeating-characters", d: "M", tag: "Sliding window" },
      { q: "Group Anagrams", slug: "group-anagrams", d: "M", tag: "Hashing on signature" },
      { q: "Longest Palindromic Substring", slug: "longest-palindromic-substring", d: "M", tag: "Expand around centre" },
      { q: "Find All Anagrams in a String", slug: "find-all-anagrams-in-a-string", d: "M", tag: "Fixed window" },
      { q: "Longest Repeating Character Replacement", slug: "longest-repeating-character-replacement", d: "M", tag: "Variable window" },
      { q: "String to Integer (atoi)", slug: "string-to-integer-atoi", d: "M", tag: "Parsing + overflow" },
      { q: "Reorganize String", slug: "reorganize-string", d: "M", tag: "Greedy + heap" },
      { q: "Sort Characters By Frequency", slug: "sort-characters-by-frequency", d: "M", tag: "Heap / bucket" },
      { q: "Decode String", slug: "decode-string", d: "M", tag: "Stack" },
      { q: "Compare Version Numbers", slug: "compare-version-numbers", d: "M", tag: "Parsing" }
    ]},
    { name: "Stretch", items: [
      { q: "Minimum Window Substring", slug: "minimum-window-substring", d: "H", tag: "Variable window", corpus: 1 },
      { q: "Text Justification", slug: "text-justification", d: "H", tag: "Simulation", note: "Pure edge-case grinding — exactly the kind of thing an in-person round uses to see if you are careful." },
      { q: "Valid Number", slug: "valid-number", d: "H", tag: "State machine" }
    ]}
  ]
},

/* ================================================== HASHING */
{
  id: "t-hash",
  title: "Hashing / HashMap & HashSet",
  order: 3,
  why: "The single highest-leverage data structure in an interview. Half of 'can you do better than O(n^2)?' is answered by a hashmap.",
  learn: [
    "How a hash table works internally: hash function, buckets, collision resolution (chaining vs open addressing), load factor, resizing",
    "Average O(1) vs worst-case O(n) — be able to say why, this is a standard follow-up",
    "HashMap vs HashSet vs LinkedHashMap vs TreeMap (ordered, O(log n)) — when you need each",
    "Using a hashmap to remember 'what have I seen, and where' — the core trick behind two-sum, subarray sums, longest consecutive",
    "Map of value -> index, value -> count, prefix -> count, and prefix -> earliest index",
    "Compound values: HashMap<Integer, List<...>>, HashMap<Integer, Stack<...>> — one 2026 candidate was scored on picking exactly this quickly",
    "Designing a good key: tuples, sorted signatures, string encodings",
    "HashMap + doubly linked list = LRU cache. Know this cold."
  ],
  patterns: ["Seen-set", "Value → index", "Frequency count", "Prefix → count", "Signature key", "Map + linked list"],
  tiers: [
    { name: "Warm-up", items: [
      { q: "Two Sum", slug: "two-sum", d: "E", tag: "Value → index" },
      { q: "Contains Duplicate", slug: "contains-duplicate", d: "E", tag: "Seen-set" },
      { q: "Intersection of Two Arrays", slug: "intersection-of-two-arrays", d: "E", tag: "Set" },
      { q: "Isomorphic Strings", slug: "isomorphic-strings", d: "E", tag: "Two-way map" },
      { q: "Design HashMap", slug: "design-hashmap", d: "E", tag: "Internals" }
    ]},
    { name: "Core — most asked", items: [
      { q: "Group Anagrams", slug: "group-anagrams", d: "M", tag: "Signature key" },
      { q: "Top K Frequent Elements", slug: "top-k-frequent-elements", d: "M", tag: "Count + heap/bucket" },
      { q: "Longest Consecutive Sequence", slug: "longest-consecutive-sequence", d: "M", tag: "Set, O(n)" },
      { q: "Subarray Sum Equals K", slug: "subarray-sum-equals-k", d: "M", tag: "Prefix → count", corpus: 1 },
      { q: "Contiguous Array (largest subarray with equal 0s and 1s)", slug: "contiguous-array", d: "M", tag: "Prefix → first index", corpus: 1, note: "Same technique as 'largest subarray with 0 sum', which was asked and then pushed to a single pass." },
      { q: "LRU Cache", slug: "lru-cache", d: "M", tag: "Map + DLL", corpus: 1, note: "Appears twice in the corpus. Non-negotiable." },
      { q: "Insert Delete GetRandom O(1)", slug: "insert-delete-getrandom-o1", d: "M", tag: "Map + array" },
      { q: "Copy List with Random Pointer", slug: "copy-list-with-random-pointer", d: "M", tag: "Old → new map" },
      { q: "Valid Sudoku", slug: "valid-sudoku", d: "M", tag: "Multiple sets" },
      { q: "Logger Rate Limiter", slug: "logger-rate-limiter", d: "E", tag: "Map + timestamp", corpus: 1 },
      { q: "CP-style problem needing HashMap<Integer, Stack<Integer>>", search: "hashmap of stacks problem interview", d: "M", tag: "Compound structure", corpus: 1, note: "Asked in Feb 2026 Round 1. Practise recognising when the value of a map should itself be a structure." }
    ]},
    { name: "Stretch", items: [
      { q: "LFU Cache", slug: "lfu-cache", d: "H", tag: "Map + freq buckets" },
      { q: "Design Underground System", slug: "design-underground-system", d: "M", tag: "Multiple maps" },
      { q: "Substring with Concatenation of All Words", slug: "substring-with-concatenation-of-all-words", d: "H", tag: "Window + counts" }
    ]}
  ]
},

/* ================================================== BINARY SEARCH */
{
  id: "t-bsearch",
  title: "Binary Search",
  order: 4,
  why: "Two of the corpus questions were binary search, and one OA question was explicitly 'binary search on answer'. It is the cheapest topic to master relative to how often it appears.",
  learn: [
    "Write the template once and never improvise it again: lo, hi, mid = lo + (hi-lo)/2, and be deliberate about lo<=hi vs lo<hi",
    "Overflow: use lo + (hi - lo) / 2, not (lo + hi) / 2. Interviewers notice.",
    "Lower bound vs upper bound — first index >= x, first index > x. Derive both from the template.",
    "Binary search on a rotated array: identify which half is sorted, then decide",
    "BINARY SEARCH ON ANSWER — the big one. When the answer is a number in a range and 'is X feasible?' is monotonic, binary search the answer space. Recognise it by phrases like 'minimum capacity', 'minimum days', 'maximum minimum'.",
    "Binary search on a 2D matrix by flattening the index",
    "Binary search over a function / predicate rather than an array"
  ],
  patterns: ["Classic search", "Lower/upper bound", "Rotated array", "Binary search on answer", "Peak finding", "Partition search"],
  tiers: [
    { name: "Warm-up", items: [
      { q: "Binary Search", slug: "binary-search", d: "E", tag: "Template", corpus: 1, note: "Literally asked as the only coding question in one intern round." },
      { q: "Search Insert Position", slug: "search-insert-position", d: "E", tag: "Lower bound" },
      { q: "First Bad Version", slug: "first-bad-version", d: "E", tag: "Predicate" },
      { q: "Sqrt(x)", slug: "sqrtx", d: "E", tag: "On answer" }
    ]},
    { name: "Core — most asked", items: [
      { q: "Search in Rotated Sorted Array", slug: "search-in-rotated-sorted-array", d: "M", tag: "Rotated", corpus: 1 },
      { q: "Find Minimum in Rotated Sorted Array", slug: "find-minimum-in-rotated-sorted-array", d: "M", tag: "Rotated", corpus: 1 },
      { q: "Find First and Last Position of Element in Sorted Array", slug: "find-first-and-last-position-of-element-in-sorted-array", d: "M", tag: "Bounds" },
      { q: "Find K Closest Elements", slug: "find-k-closest-elements", d: "M", tag: "Bounds + window", corpus: 1, note: "Asked first on an UNSORTED variation, then the sorted version. Be ready for both." },
      { q: "Find Peak Element", slug: "find-peak-element", d: "M", tag: "Peak" },
      { q: "Koko Eating Bananas", slug: "koko-eating-bananas", d: "M", tag: "On answer" },
      { q: "Capacity To Ship Packages Within D Days", slug: "capacity-to-ship-packages-within-d-days", d: "M", tag: "On answer", corpus: 1, note: "The named example of the 'binary search on answer' OA question." },
      { q: "Minimum Number of Days to Make m Bouquets", slug: "minimum-number-of-days-to-make-m-bouquets", d: "M", tag: "On answer" },
      { q: "Kth Smallest Element in a Sorted Matrix", slug: "kth-smallest-element-in-a-sorted-matrix", d: "M", tag: "On answer" },
      { q: "Allocate minimum number of pages / book allocation", search: "allocate minimum number of pages binary search geeksforgeeks", d: "M", tag: "On answer" }
    ]},
    { name: "Stretch", items: [
      { q: "Split Array Largest Sum", slug: "split-array-largest-sum", d: "H", tag: "On answer" },
      { q: "Median of Two Sorted Arrays", slug: "median-of-two-sorted-arrays", d: "H", tag: "Partition search" },
      { q: "Search in Rotated Sorted Array II", slug: "search-in-rotated-sorted-array-ii", d: "M", tag: "Duplicates" }
    ]}
  ]
},

/* ================================================== STACK */
{
  id: "t-stack",
  title: "Stack",
  order: 5,
  why: "Monotonic stack is one of the few patterns where the optimal solution is invisible unless you already know the pattern. Next Greater Element was asked outright and the interviewer named the technique.",
  learn: [
    "LIFO, push/pop/peek, and implementing a stack with an array vs a linked list",
    "Matching / nesting problems — parentheses, tags, nested encodings",
    "MONOTONIC STACK: keep the stack increasing or decreasing; when you pop, you have just found the next-greater / next-smaller for the popped element. Learn to write it as one loop.",
    "Previous smaller / next smaller — the pair that unlocks histogram and subarray-minimum problems",
    "Stack for expression evaluation: infix → postfix, evaluating postfix, operator precedence",
    "Using a stack to simulate recursion (iterative DFS, iterative inorder)",
    "Min stack — keeping an auxiliary invariant alongside the data"
  ],
  patterns: ["Matching/nesting", "Monotonic increasing", "Monotonic decreasing", "Auxiliary stack", "Iterative traversal", "Expression evaluation"],
  tiers: [
    { name: "Warm-up", items: [
      { q: "Valid Parentheses", slug: "valid-parentheses", d: "E", tag: "Matching" },
      { q: "Min Stack", slug: "min-stack", d: "M", tag: "Auxiliary stack" },
      { q: "Baseball Game", slug: "baseball-game", d: "E", tag: "Simulation" },
      { q: "Implement Queue using Stacks", slug: "implement-queue-using-stacks", d: "E", tag: "Amortised" },
      { q: "Next Greater Element I", slug: "next-greater-element-i", d: "E", tag: "Monotonic", corpus: 1, note: "Asked at SDE-2 with the technique named explicitly: 'use a monotonic stack'." }
    ]},
    { name: "Core — most asked", items: [
      { q: "Daily Temperatures", slug: "daily-temperatures", d: "M", tag: "Monotonic decreasing" },
      { q: "Next Greater Element II (circular)", slug: "next-greater-element-ii", d: "M", tag: "Monotonic + wrap" },
      { q: "Evaluate Reverse Polish Notation", slug: "evaluate-reverse-polish-notation", d: "M", tag: "Expression" },
      { q: "Decode String", slug: "decode-string", d: "M", tag: "Nesting" },
      { q: "Asteroid Collision", slug: "asteroid-collision", d: "M", tag: "Simulation" },
      { q: "Remove K Digits", slug: "remove-k-digits", d: "M", tag: "Monotonic greedy" },
      { q: "Simplify Path", slug: "simplify-path", d: "M", tag: "Parsing" },
      { q: "Online Stock Span", slug: "online-stock-span", d: "M", tag: "Monotonic" },
      { q: "Basic Calculator II", slug: "basic-calculator-ii", d: "M", tag: "Precedence" },
      { q: "Sum of Subarray Minimums", slug: "sum-of-subarray-minimums", d: "M", tag: "Prev/next smaller" }
    ]},
    { name: "Stretch", items: [
      { q: "Largest Rectangle in Histogram", slug: "largest-rectangle-in-histogram", d: "H", tag: "Monotonic", note: "The canonical monotonic-stack problem. If you understand this one, the pattern is yours." },
      { q: "Maximal Rectangle", slug: "maximal-rectangle", d: "H", tag: "Histogram per row" },
      { q: "Trapping Rain Water", slug: "trapping-rain-water", d: "H", tag: "Monotonic / two pointers" },
      { q: "Basic Calculator", slug: "basic-calculator", d: "H", tag: "Nested signs" }
    ]}
  ]
},

/* ================================================== QUEUE */
{
  id: "t-queue",
  title: "Queue & Deque",
  order: 6,
  why: "Small topic, but two things in it are heavily asked: BFS (every grid/graph shortest-path question) and the monotonic deque behind Sliding Window Maximum, which appears twice in the corpus.",
  learn: [
    "FIFO; implementing a queue with an array (circular buffer) vs a linked list",
    "Circular queue — the wrap-around arithmetic and the full-vs-empty ambiguity. This was a Bar Raiser question.",
    "Deque: push/pop at both ends; when a deque beats a queue",
    "MONOTONIC DEQUE for sliding window maximum/minimum in O(n) — the front holds the answer, the back is kept ordered",
    "BFS as a queue algorithm: level-by-level processing, the 'size = queue.size()' loop",
    "Multi-source BFS — seed the queue with every start node at once (this is Rotting Oranges)",
    "Queue via two stacks and stack via two queues — classic amortised-analysis questions"
  ],
  patterns: ["BFS", "Multi-source BFS", "Monotonic deque", "Circular buffer", "Two-stack queue"],
  tiers: [
    { name: "Warm-up", items: [
      { q: "Implement Queue using Stacks", slug: "implement-queue-using-stacks", d: "E", tag: "Amortised O(1)" },
      { q: "Implement Stack using Queues", slug: "implement-stack-using-queues", d: "E", tag: "Rotation" },
      { q: "Number of Recent Calls", slug: "number-of-recent-calls", d: "E", tag: "Sliding window queue" },
      { q: "Design Circular Queue", slug: "design-circular-queue", d: "M", tag: "Fixed array", corpus: 1, note: "Bar Raiser question, with heavy edge-case probing. Know the full-vs-empty distinction." }
    ]},
    { name: "Core — most asked", items: [
      { q: "Sliding Window Maximum", slug: "sliding-window-maximum", d: "H", tag: "Monotonic deque", corpus: 1, note: "Appears in two separate experiences. Learn the deque solution, not the heap one." },
      { q: "Rotting Oranges", slug: "rotting-oranges", d: "M", tag: "Multi-source BFS", corpus: 1 },
      { q: "Binary Tree Level Order Traversal", slug: "binary-tree-level-order-traversal", d: "M", tag: "BFS" },
      { q: "01 Matrix", slug: "01-matrix", d: "M", tag: "Multi-source BFS" },
      { q: "Shortest Path in Binary Matrix", slug: "shortest-path-in-binary-matrix", d: "M", tag: "BFS" },
      { q: "Knight's shortest path on a board", search: "steps by knight geeksforgeeks", d: "M", tag: "BFS", corpus: 1 }
    ]},
    { name: "Stretch", items: [
      { q: "Shortest Subarray with Sum at Least K", slug: "shortest-subarray-with-sum-at-least-k", d: "H", tag: "Monotonic deque + prefix" },
      { q: "Design Hit Counter", slug: "design-hit-counter", d: "M", tag: "Queue / buckets", note: "LeetCode Premium. Same idea as Number of Recent Calls." }
    ]}
  ]
},

/* ================================================== LINKED LIST */
{
  id: "t-ll",
  title: "Linked List",
  order: 7,
  why: "Amazon likes linked lists in person because they expose sloppy pointer handling instantly on a whiteboard. Three corpus questions are linked-list questions.",
  learn: [
    "Singly vs doubly vs circular; node structure; why you almost always want a dummy/sentinel head",
    "Reversal — iterative with prev/curr/next. Be able to write this without thinking; it is a building block, not a problem.",
    "Fast and slow pointers: find the middle, detect a cycle, find the cycle start (Floyd), find the nth from the end",
    "Merging two sorted lists, and by extension merging k lists with a heap",
    "In-place reordering without extra space — split, reverse, merge",
    "Reversing in groups of k — the hardest common variant",
    "Deep-copying a list with extra pointers",
    "Doubly linked list + hashmap = LRU cache",
    "Always trace your pointer updates on paper with a 2-3 node example before declaring done"
  ],
  patterns: ["Dummy head", "Fast/slow pointers", "Iterative reversal", "Split-reverse-merge", "Heap merge", "Node → node map"],
  tiers: [
    { name: "Warm-up", note: "Every one of these is a building block for a harder question.", items: [
      { q: "Reverse Linked List", slug: "reverse-linked-list", d: "E", tag: "Iterative + recursive" },
      { q: "Middle of the Linked List", slug: "middle-of-the-linked-list", d: "E", tag: "Fast/slow" },
      { q: "Merge Two Sorted Lists", slug: "merge-two-sorted-lists", d: "E", tag: "Dummy head" },
      { q: "Linked List Cycle", slug: "linked-list-cycle", d: "E", tag: "Floyd" },
      { q: "Remove Duplicates from Sorted List", slug: "remove-duplicates-from-sorted-list", d: "E", tag: "Pointer surgery" },
      { q: "Intersection of Two Linked Lists", slug: "intersection-of-two-linked-lists", d: "E", tag: "Two pointers", corpus: 1, note: "Given 15 minutes as the second question of an SDE-2 round." }
    ]},
    { name: "Core — most asked", items: [
      { q: "Palindrome Linked List", slug: "palindrome-linked-list", d: "E", tag: "Reverse half", corpus: 1, note: "Asked with variations, and separately in a written screen. Do the O(1) space version." },
      { q: "Remove Nth Node From End of List", slug: "remove-nth-node-from-end-of-list", d: "M", tag: "Two pointers + dummy" },
      { q: "Add Two Numbers", slug: "add-two-numbers", d: "M", tag: "Carry handling" },
      { q: "Linked List Cycle II", slug: "linked-list-cycle-ii", d: "M", tag: "Floyd, find start" },
      { q: "Reorder List", slug: "reorder-list", d: "M", tag: "Split-reverse-merge" },
      { q: "Copy List with Random Pointer", slug: "copy-list-with-random-pointer", d: "M", tag: "Map or interleave" },
      { q: "Odd Even Linked List", slug: "odd-even-linked-list", d: "M", tag: "Two chains" },
      { q: "Swap Nodes in Pairs", slug: "swap-nodes-in-pairs", d: "M", tag: "Pointer surgery" },
      { q: "Sort List", slug: "sort-list", d: "M", tag: "Merge sort on list" },
      { q: "LRU Cache", slug: "lru-cache", d: "M", tag: "DLL + map", corpus: 1 }
    ]},
    { name: "Stretch", items: [
      { q: "Reverse Nodes in k-Group", slug: "reverse-nodes-in-k-group", d: "H", tag: "Grouped reversal" },
      { q: "Merge k Sorted Lists", slug: "merge-k-sorted-lists", d: "H", tag: "Heap" },
      { q: "Flatten a Multilevel Doubly Linked List", slug: "flatten-a-multilevel-doubly-linked-list", d: "M", tag: "DFS on list" }
    ]}
  ]
},

/* ================================================== HEAP */
{
  id: "t-heap",
  title: "Heap / Priority Queue",
  order: 8,
  why: "One OA question was explicitly 'greedy problem using a priority queue'. Any question with the words top-k, kth, closest, median, or merge k should make you reach for a heap.",
  learn: [
    "Binary heap as an array: parent = (i-1)/2, children = 2i+1 and 2i+2",
    "sift-up / sift-down, and why insert and extract are O(log n) but peek is O(1)",
    "Heapify an array in O(n) — and why it is O(n) and not O(n log n)",
    "Min-heap vs max-heap, and the comparator trick to flip one into the other",
    "TOP-K PATTERN: for the k largest, keep a MIN-heap of size k. This inversion trips people up — be sure of it.",
    "TWO-HEAP PATTERN: a max-heap for the lower half and a min-heap for the upper half gives you a running median",
    "Heap vs quickselect for kth-largest: O(n log k) vs average O(n) — know the trade-off",
    "Merging k sorted sequences with a heap of size k",
    "Greedy + heap: repeatedly take the current best. This is 'minimum cost to connect ropes', task scheduling, and the OA question."
  ],
  patterns: ["Top-k with size-k heap", "Two heaps for median", "Merge k sorted", "Greedy with heap", "Heap for scheduling/intervals"],
  tiers: [
    { name: "Warm-up", items: [
      { q: "Last Stone Weight", slug: "last-stone-weight", d: "E", tag: "Max-heap" },
      { q: "Kth Largest Element in a Stream", slug: "kth-largest-element-in-a-stream", d: "E", tag: "Size-k min-heap" },
      { q: "Minimum cost to connect ropes / sticks", search: "minimum cost of ropes geeksforgeeks", d: "M", tag: "Greedy + heap", corpus: 1, note: "Asked as 'minimum cost merge'." }
    ]},
    { name: "Core — most asked", items: [
      { q: "Kth Largest Element in an Array", slug: "kth-largest-element-in-an-array", d: "M", tag: "Heap / quickselect" },
      { q: "Top K Frequent Elements", slug: "top-k-frequent-elements", d: "M", tag: "Count + heap" },
      { q: "Top K Frequent Words", slug: "top-k-frequent-words", d: "M", tag: "Custom comparator" },
      { q: "K Closest Points to Origin", slug: "k-closest-points-to-origin", d: "M", tag: "Size-k max-heap" },
      { q: "Task Scheduler", slug: "task-scheduler", d: "M", tag: "Greedy + heap" },
      { q: "Reorganize String", slug: "reorganize-string", d: "M", tag: "Greedy + heap" },
      { q: "Meeting Rooms II", slug: "meeting-rooms-ii", d: "M", tag: "Interval + heap", corpus: 1, note: "LeetCode Premium. Free equivalents: Minimum Platforms (GfG), Minimum Number of Arrows." },
      { q: "Minimum Number of Arrows to Burst Balloons", slug: "minimum-number-of-arrows-to-burst-balloons", d: "M", tag: "Intervals" },
      { q: "Furthest Building You Can Reach", slug: "furthest-building-you-can-reach", d: "M", tag: "Greedy + heap" },
      { q: "Minimum Platforms", search: "minimum platforms geeksforgeeks", d: "M", tag: "Sort + heap", corpus: 1 }
    ]},
    { name: "Stretch", items: [
      { q: "Find Median from Data Stream", slug: "find-median-from-data-stream", d: "H", tag: "Two heaps", corpus: 1 },
      { q: "Merge k Sorted Lists", slug: "merge-k-sorted-lists", d: "H", tag: "Heap of k" },
      { q: "Sliding Window Median", slug: "sliding-window-median", d: "H", tag: "Two heaps + lazy delete" },
      { q: "IPO", slug: "ipo", d: "H", tag: "Two heaps, greedy" }
    ]}
  ]
},

/* ================================================== TREES */
{
  id: "t-trees",
  title: "Trees & BST",
  order: 9,
  why: "The most over-represented topic in the whole corpus. Tree views, LCA, path sums, level order and tree DP all appear. If a round has two questions, one of them is often a tree.",
  learn: [
    "Terminology: root, leaf, height vs depth, complete vs full vs perfect vs balanced",
    "The four traversals — preorder, inorder, postorder, level order — recursively AND iteratively. Iterative inorder with a stack is a real question.",
    "Recursion on a tree: what you return up, what you pass down. Almost every tree problem is one of these two shapes.",
    "BST property, and that inorder traversal of a BST is sorted — this single fact solves a dozen problems",
    "BST insert / search / delete (all three delete cases), and why an unbalanced BST degrades to O(n)",
    "Lowest common ancestor — the BST version (compare values) and the general binary-tree version (return-up recursion)",
    "Tree views: top view, bottom view, left view, right view, vertical order. Solved with BFS + a horizontal-distance map.",
    "Path problems: root-to-leaf, any-node-to-any-node (the 'return the best single-branch, update a global' trick)",
    "Construct a tree from traversals; serialise and deserialise",
    "TREE DP: define a state per node, compute children first, combine bottom-up. This is Binary Tree Cameras and House Robber III.",
    "Morris traversal for O(1) space — bonus, but a strong answer to 'can you do it without a stack?'"
  ],
  patterns: ["Return-up recursion", "Pass-down recursion", "BFS by level", "Inorder = sorted (BST)", "Global + local answer", "Horizontal distance map", "Tree DP"],
  tiers: [
    { name: "Warm-up", note: "Get the recursion shape into your fingers.", items: [
      { q: "Maximum Depth of Binary Tree", slug: "maximum-depth-of-binary-tree", d: "E", tag: "Return-up" },
      { q: "Invert Binary Tree", slug: "invert-binary-tree", d: "E", tag: "Recursion" },
      { q: "Symmetric Tree", slug: "symmetric-tree", d: "E", tag: "Paired recursion" },
      { q: "Same Tree", slug: "same-tree", d: "E", tag: "Recursion" },
      { q: "Balanced Binary Tree", slug: "balanced-binary-tree", d: "E", tag: "Return height + flag" },
      { q: "Diameter of Binary Tree", slug: "diameter-of-binary-tree", d: "E", tag: "Global + local" },
      { q: "Binary Tree Inorder Traversal", slug: "binary-tree-inorder-traversal", d: "E", tag: "Iterative with stack" },
      { q: "Subtree of Another Tree", slug: "subtree-of-another-tree", d: "E", tag: "Recursion" }
    ]},
    { name: "Core — most asked", items: [
      { q: "Binary Tree Level Order Traversal", slug: "binary-tree-level-order-traversal", d: "M", tag: "BFS" },
      { q: "Binary Tree Zigzag Level Order Traversal", slug: "binary-tree-zigzag-level-order-traversal", d: "M", tag: "BFS + flip", corpus: 1 },
      { q: "Binary Tree Right Side View", slug: "binary-tree-right-side-view", d: "M", tag: "BFS last of level" },
      { q: "Bottom View of Binary Tree", search: "bottom view of binary tree geeksforgeeks", d: "M", tag: "HD map", corpus: 1, note: "Asked twice, once with a follow-up to support top OR bottom view from the same code." },
      { q: "Top View of Binary Tree", search: "top view of binary tree geeksforgeeks", d: "M", tag: "HD map" },
      { q: "Vertical Order Traversal of a Binary Tree", slug: "vertical-order-traversal-of-a-binary-tree", d: "H", tag: "HD + sort", corpus: 1 },
      { q: "Lowest Common Ancestor of a Binary Tree", slug: "lowest-common-ancestor-of-a-binary-tree", d: "M", tag: "Return-up", corpus: 1, note: "Asked, then modified by the interviewer on the spot." },
      { q: "Lowest Common Ancestor of a Binary Search Tree", slug: "lowest-common-ancestor-of-a-binary-search-tree", d: "M", tag: "BST property", corpus: 1, note: "Bar Raiser. Asked to explain the recursion stack step by step." },
      { q: "Path Sum II", slug: "path-sum-ii", d: "M", tag: "Backtracking on tree" },
      { q: "Path Sum III", slug: "path-sum-iii", d: "M", tag: "Prefix sum on tree" },
      { q: "Validate Binary Search Tree", slug: "validate-binary-search-tree", d: "M", tag: "Range pass-down" },
      { q: "Kth Smallest Element in a BST", slug: "kth-smallest-element-in-a-bst", d: "M", tag: "Inorder" },
      { q: "Construct Binary Tree from Preorder and Inorder Traversal", slug: "construct-binary-tree-from-preorder-and-inorder-traversal", d: "M", tag: "Divide + index map" },
      { q: "Count Good Nodes in Binary Tree", slug: "count-good-nodes-in-binary-tree", d: "M", tag: "Pass-down max" },
      { q: "All Nodes Distance K in Binary Tree", slug: "all-nodes-distance-k-in-binary-tree", d: "M", tag: "Parent map + BFS" },
      { q: "Flatten Binary Tree to Linked List", slug: "flatten-binary-tree-to-linked-list", d: "M", tag: "Reverse postorder" },
      { q: "Maximum Width of Binary Tree", slug: "maximum-width-of-binary-tree", d: "M", tag: "Index per node" },
      { q: "Difference between sum of odd and even level nodes", search: "difference between odd and even level sum binary tree", d: "M", tag: "Traversal", corpus: 1, note: "Asked with O(1) space and O(n) time expected." }
    ]},
    { name: "Tree DP — the differentiator", note: "This is what separated the selected SDE-1 in Feb 2026 from the rest of the room.", items: [
      { q: "Binary Tree Maximum Path Sum", slug: "binary-tree-maximum-path-sum", d: "H", tag: "Global + local", corpus: 1 },
      { q: "Binary Tree Cameras", slug: "binary-tree-cameras", d: "H", tag: "Tree DP, 3 states", corpus: 1, note: "Asked in Feb 2026. Define states clearly: covered-with-camera / covered-without / not-covered. Greedy alone fails." },
      { q: "House Robber III", slug: "house-robber-iii", d: "M", tag: "Tree DP, 2 states" },
      { q: "Distribute Coins in Binary Tree", slug: "distribute-coins-in-binary-tree", d: "M", tag: "Tree DP" },
      { q: "Longest Univalue Path", slug: "longest-univalue-path", d: "M", tag: "Global + local" }
    ]},
    { name: "Stretch", items: [
      { q: "Serialize and Deserialize Binary Tree", slug: "serialize-and-deserialize-binary-tree", d: "H", tag: "Design + traversal" },
      { q: "Binary Search Tree Iterator", slug: "binary-search-tree-iterator", d: "M", tag: "Controlled inorder" },
      { q: "Recover Binary Search Tree", slug: "recover-binary-search-tree", d: "M", tag: "Inorder anomalies" },
      { q: "Delete Node in a BST", slug: "delete-node-in-a-bst", d: "M", tag: "Three cases" }
    ]}
  ]
},

/* ================================================== GRAPHS */
{
  id: "t-graphs",
  title: "Graphs",
  order: 10,
  why: "Not on your original list, but Course Schedule, Course Schedule II, Rotting Oranges, Evaluate Division and 'currency conversion' all appear in the corpus. Amazon asks graphs constantly and disguises them as grids or as equations.",
  learn: [
    "Representations: adjacency list vs adjacency matrix, and the space/time trade-off",
    "Directed vs undirected, weighted vs unweighted, cyclic vs acyclic",
    "DFS (recursive and iterative) and BFS — and the rule: BFS gives shortest path on an UNWEIGHTED graph",
    "Visited-set discipline — mark on push, not on pop, or you will queue duplicates",
    "GRIDS ARE GRAPHS. Cell = node, 4 or 8 neighbours = edges. Most 'graph' questions at SDE-1 are grid questions.",
    "Cycle detection: undirected (parent check) vs directed (recursion stack / colouring)",
    "TOPOLOGICAL SORT — both Kahn's algorithm (BFS with in-degrees) and DFS post-order. This is Course Schedule.",
    "Connected components, and Union-Find (disjoint set) with path compression + union by rank",
    "Dijkstra for weighted shortest path; know that it fails with negative edges and that Bellman-Ford handles them",
    "Building a graph out of something that is not obviously a graph — equations (a/b = 2.3), word transformations, account merges"
  ],
  patterns: ["BFS shortest path", "Multi-source BFS", "DFS flood fill", "Topological sort", "Union-Find", "Dijkstra", "Graph-from-relations"],
  tiers: [
    { name: "Warm-up — grids", items: [
      { q: "Number of Islands", slug: "number-of-islands", d: "M", tag: "Flood fill", corpus: 1 },
      { q: "Max Area of Island", slug: "max-area-of-island", d: "M", tag: "Flood fill" },
      { q: "Flood Fill", slug: "flood-fill", d: "E", tag: "DFS" },
      { q: "Rotting Oranges", slug: "rotting-oranges", d: "M", tag: "Multi-source BFS", corpus: 1 },
      { q: "01 Matrix", slug: "01-matrix", d: "M", tag: "Multi-source BFS" },
      { q: "Surrounded Regions", slug: "surrounded-regions", d: "M", tag: "Border DFS" }
    ]},
    { name: "Core — most asked", items: [
      { q: "Course Schedule", slug: "course-schedule", d: "M", tag: "Cycle detect / topo", corpus: 1 },
      { q: "Course Schedule II", slug: "course-schedule-ii", d: "M", tag: "Topological order", corpus: 1 },
      { q: "Clone Graph", slug: "clone-graph", d: "M", tag: "DFS + map" },
      { q: "Evaluate Division", slug: "evaluate-division", d: "M", tag: "Weighted graph DFS", corpus: 1, note: "Appears twice: as 'a/b = 2.3, solve b/a' in a Bar Raiser, and as 'currency conversion rates' at SDE-2." },
      { q: "Number of Provinces", slug: "number-of-provinces", d: "M", tag: "Union-Find / DFS" },
      { q: "Pacific Atlantic Water Flow", slug: "pacific-atlantic-water-flow", d: "M", tag: "Reverse DFS" },
      { q: "Accounts Merge", slug: "accounts-merge", d: "M", tag: "Union-Find" },
      { q: "Redundant Connection", slug: "redundant-connection", d: "M", tag: "Union-Find" },
      { q: "Word Search", slug: "word-search", d: "M", tag: "Grid backtracking" },
      { q: "Network Delay Time", slug: "network-delay-time", d: "M", tag: "Dijkstra" },
      { q: "Cheapest Flights Within K Stops", slug: "cheapest-flights-within-k-stops", d: "M", tag: "Bellman-Ford / BFS" },
      { q: "Min Cost to Connect All Points", slug: "min-cost-to-connect-all-points", d: "M", tag: "MST (Prim/Kruskal)" },
      { q: "Problem combining DFS and Knapsack", search: "dfs with knapsack dp interview problem", d: "M", tag: "Graph + DP", corpus: 1, note: "The main 25-30 min question of an SDE-2 Bangalore round." }
    ]},
    { name: "Stretch", items: [
      { q: "Word Ladder", slug: "word-ladder", d: "H", tag: "BFS on words" },
      { q: "Alien Dictionary", slug: "alien-dictionary", d: "H", tag: "Topological sort", note: "LeetCode Premium. Findable on GfG as 'Alien Dictionary'." },
      { q: "Critical Connections in a Network", slug: "critical-connections-in-a-network", d: "H", tag: "Tarjan bridges" }
    ]}
  ]
},

/* ================================================== RECURSION */
{
  id: "t-backtrack",
  title: "Recursion & Backtracking",
  order: 11,
  why: "Underlies trees, graphs and DP. One Bar Raiser explicitly asked the candidate to narrate how the recursion stack builds and in what order statements execute — that is a comprehension test, not a coding test.",
  learn: [
    "Base case, recursive case, and the leap of faith — assume the recursive call is correct",
    "How the call stack actually works: frames, what is saved, the order in which statements before and after the recursive call execute. Be able to narrate this out loud.",
    "Recursion tree; counting the number of calls; deriving complexity from branching factor and depth",
    "Head vs tail recursion; converting recursion to iteration; stack overflow and recursion depth limits",
    "THE BACKTRACKING TEMPLATE: choose → explore → un-choose. Write it once, reuse it everywhere.",
    "Pruning — the difference between backtracking that passes and brute force that times out",
    "Handling duplicates in subsets/permutations: sort first, then skip equal siblings",
    "Subsets via bitmask as an alternative formulation"
  ],
  patterns: ["Choose-explore-unchoose", "Include/exclude", "Permutation with used[]", "Grid backtracking", "Pruning"],
  tiers: [
    { name: "Core — most asked", items: [
      { q: "Subsets", slug: "subsets", d: "M", tag: "Include/exclude" },
      { q: "Subsets II (duplicates)", slug: "subsets-ii", d: "M", tag: "Skip equal siblings" },
      { q: "Permutations", slug: "permutations", d: "M", tag: "used[] array" },
      { q: "Combination Sum", slug: "combination-sum", d: "M", tag: "Reuse allowed" },
      { q: "Combination Sum II", slug: "combination-sum-ii", d: "M", tag: "Duplicates" },
      { q: "Letter Combinations of a Phone Number", slug: "letter-combinations-of-a-phone-number", d: "M", tag: "Cartesian" },
      { q: "Generate Parentheses", slug: "generate-parentheses", d: "M", tag: "Constraint pruning" },
      { q: "Word Search", slug: "word-search", d: "M", tag: "Grid + visited" },
      { q: "Palindrome Partitioning", slug: "palindrome-partitioning", d: "M", tag: "Partition + check" },
      { q: "Restore IP Addresses", slug: "restore-ip-addresses", d: "M", tag: "Partition + validate" },
      { q: "Rat in a Maze", search: "rat in a maze geeksforgeeks", d: "M", tag: "Grid backtracking" }
    ]},
    { name: "Stretch", items: [
      { q: "N-Queens", slug: "n-queens", d: "H", tag: "Classic backtracking" },
      { q: "Sudoku Solver", slug: "sudoku-solver", d: "H", tag: "Constraint propagation" },
      { q: "Word Search II", slug: "word-search-ii", d: "H", tag: "Trie + backtracking", corpus: 1, note: "Asked with a variation: also report where each word occurs in the grid." }
    ]}
  ]
},

/* ================================================== GREEDY */
{
  id: "t-greedy",
  title: "Greedy",
  order: 12,
  why: "One OA question was explicitly a greedy + priority queue problem. The hard part is never the code — it is arguing that the greedy choice is safe.",
  learn: [
    "Greedy-choice property and optimal substructure — the two things that must hold",
    "How to ARGUE a greedy is correct: exchange argument (any optimal solution can be transformed into the greedy one without getting worse). Interviewers ask 'why does this work?' and this is the answer.",
    "How to DISPROVE a greedy: find one counterexample. Practise doing this fast — Word Break and Binary Tree Cameras both punish naive greedy.",
    "Sorting is the usual first move: by start, by end, by ratio, by custom comparator",
    "Interval scheduling: sort by END time for max non-overlapping; sort by START for merging",
    "Greedy + heap: repeatedly take the current cheapest/largest",
    "When greedy fails, the answer is usually DP. Knowing which one applies is the actual skill being tested."
  ],
  patterns: ["Sort by end", "Sort by start", "Greedy + heap", "Exchange argument", "Reach/jump tracking"],
  tiers: [
    { name: "Core — most asked", items: [
      { q: "Jump Game", slug: "jump-game", d: "M", tag: "Max reach" },
      { q: "Jump Game II", slug: "jump-game-ii", d: "M", tag: "Level BFS-ish" },
      { q: "Gas Station", slug: "gas-station", d: "M", tag: "Reset on deficit", corpus: 1 },
      { q: "Partition Labels", slug: "partition-labels", d: "M", tag: "Last-index scan" },
      { q: "Non-overlapping Intervals", slug: "non-overlapping-intervals", d: "M", tag: "Sort by end" },
      { q: "Minimum Number of Arrows to Burst Balloons", slug: "minimum-number-of-arrows-to-burst-balloons", d: "M", tag: "Sort by end" },
      { q: "Task Scheduler", slug: "task-scheduler", d: "M", tag: "Greedy + counting" },
      { q: "Largest Number", slug: "largest-number", d: "M", tag: "Custom comparator", corpus: 1, note: "Asked in a Bar Raiser as 'maximum number arrangement from lists of numbers'." },
      { q: "Best Time to Buy and Sell Stock II", slug: "best-time-to-buy-and-sell-stock-ii", d: "M", tag: "Local gains", corpus: 1, note: "Asked in a Bar Raiser 'with modifications' — expect a twist on the standard problem." },
      { q: "Maximum Units on a Truck", slug: "maximum-units-on-a-truck", d: "E", tag: "Sort by value", corpus: 1 },
      { q: "Minimum cost to connect ropes", search: "minimum cost of ropes geeksforgeeks", d: "M", tag: "Greedy + heap", corpus: 1 }
    ]},
    { name: "Stretch", items: [
      { q: "Candy", slug: "candy", d: "H", tag: "Two-pass greedy" },
      { q: "Huffman coding / file compression", search: "huffman coding implementation geeksforgeeks", d: "M", tag: "Greedy + heap", corpus: 1, note: "Asked as an algorithmic problem on file compression in a Bar Raiser round." }
    ]}
  ]
},

/* ================================================== DP */
{
  id: "t-dp",
  title: "Dynamic Programming",
  order: 13,
  why: "The Feb 2026 candidate's own words: 'DP concepts are extremely important.' Their Round 1 was a DP problem walked from recursion all the way to O(1) space, and their Round 3 was tree DP. Expect to be asked to climb the whole ladder, not just to produce an answer.",
  learn: [
    "THE LADDER — this is what you will actually be graded on: brute-force recursion → memoisation (top-down) → tabulation (bottom-up) → space optimisation. Practise narrating each transition and WHY it is valid.",
    "Identifying DP: overlapping subproblems + optimal substructure. If your recursion tree repeats states, memoise.",
    "Defining the STATE — the hardest part. Ask: what is the minimum information I need to solve the rest of the problem?",
    "Writing the recurrence/transition, then the base cases, then the iteration order",
    "Space optimisation: when the transition only looks back k rows, keep k rows. Be ready for 'does overwriting break correctness?' — one candidate got exactly this follow-up.",
    "1D DP: Fibonacci-shaped, House Robber-shaped, Climbing Stairs-shaped",
    "Knapsack family: 0/1 knapsack, subset sum, partition, target sum, unbounded knapsack, coin change",
    "Grid DP: unique paths, min path sum, with obstacles, with diagonal moves",
    "Subsequence DP: LIS (O(n^2) and O(n log n)), LCS, edit distance, distinct subsequences",
    "String DP: palindromes, word break, pattern matching (regex and wildcard)",
    "Interval / MCM DP: burst balloons, matrix chain multiplication",
    "DP on trees: compute children first, combine bottom-up, define states per node",
    "State-machine DP: stock problems with cooldown, transaction limits"
  ],
  patterns: ["Recursion→memo→tab→space", "0/1 Knapsack", "Unbounded knapsack", "LIS", "LCS/edit distance", "Grid paths", "Interval DP", "Tree DP", "State machine"],
  tiers: [
    { name: "Foundation — the ladder", note: "Do these THREE first, and do all four rungs of the ladder on each. This is more valuable than twenty problems solved one way.", items: [
      { q: "Climbing Stairs", slug: "climbing-stairs", d: "E", tag: "1D" },
      { q: "House Robber", slug: "house-robber", d: "M", tag: "1D", corpus: 1, note: "The exact shape asked in Feb 2026 Round 1. The interviewer walked all four rungs and asked why at every step." },
      { q: "House Robber II (circular)", slug: "house-robber-ii", d: "M", tag: "1D + case split" },
      { q: "Min Cost Climbing Stairs", slug: "min-cost-climbing-stairs", d: "E", tag: "1D" }
    ]},
    { name: "Knapsack family", items: [
      { q: "Coin Change", slug: "coin-change", d: "M", tag: "Unbounded, min" },
      { q: "Coin Change II", slug: "coin-change-ii", d: "M", tag: "Unbounded, count" },
      { q: "Partition Equal Subset Sum", slug: "partition-equal-subset-sum", d: "M", tag: "Subset sum" },
      { q: "Target Sum", slug: "target-sum", d: "M", tag: "0/1 knapsack", corpus: 1 },
      { q: "0/1 Knapsack", search: "0 1 knapsack problem geeksforgeeks", d: "M", tag: "Classic" },
      { q: "Perfect Squares", slug: "perfect-squares", d: "M", tag: "Unbounded" },
      { q: "Combination Sum IV", slug: "combination-sum-iv", d: "M", tag: "Order matters" }
    ]},
    { name: "Strings & subsequences", items: [
      { q: "Longest Increasing Subsequence", slug: "longest-increasing-subsequence", d: "M", tag: "LIS", note: "Know both O(n^2) and the O(n log n) patience-sorting version." },
      { q: "Longest Common Subsequence", slug: "longest-common-subsequence", d: "M", tag: "2D grid" },
      { q: "Edit Distance", slug: "edit-distance", d: "H", tag: "2D grid" },
      { q: "Word Break", slug: "word-break", d: "M", tag: "String DP", corpus: 1, note: "Delivered story-framed so the DP was hidden. The candidate went Trie and never found the DP." },
      { q: "Palindromic Substrings", slug: "palindromic-substrings", d: "M", tag: "Expand / DP" },
      { q: "Longest Palindromic Subsequence", slug: "longest-palindromic-subsequence", d: "M", tag: "Interval" },
      { q: "Decode Ways", slug: "decode-ways", d: "M", tag: "1D with parsing" },
      { q: "Interleaving String", slug: "interleaving-string", d: "M", tag: "2D" }
    ]},
    { name: "Grids", items: [
      { q: "Unique Paths", slug: "unique-paths", d: "M", tag: "Grid" },
      { q: "Unique Paths II (obstacles)", slug: "unique-paths-ii", d: "M", tag: "Grid" },
      { q: "Minimum Path Sum", slug: "minimum-path-sum", d: "M", tag: "Grid" },
      { q: "Triangle", slug: "triangle", d: "M", tag: "Grid, bottom-up" },
      { q: "Maximal Square", slug: "maximal-square", d: "M", tag: "Grid" },
      { q: "Max sum path in matrix (down + diagonal-right moves)", search: "maximum sum path in matrix down diagonal geeksforgeeks", d: "M", tag: "Grid", corpus: 1, note: "Asked face to face in a Chennai drive." }
    ]},
    { name: "State machine & stocks", items: [
      { q: "Best Time to Buy and Sell Stock with Cooldown", slug: "best-time-to-buy-and-sell-stock-with-cooldown", d: "M", tag: "State machine" },
      { q: "Best Time to Buy and Sell Stock III", slug: "best-time-to-buy-and-sell-stock-iii", d: "H", tag: "Two transactions" },
      { q: "Best Time to Buy and Sell Stock IV", slug: "best-time-to-buy-and-sell-stock-iv", d: "H", tag: "k transactions" }
    ]},
    { name: "Tree DP & stretch", items: [
      { q: "Binary Tree Cameras", slug: "binary-tree-cameras", d: "H", tag: "Tree DP", corpus: 1 },
      { q: "House Robber III", slug: "house-robber-iii", d: "M", tag: "Tree DP" },
      { q: "Burst Balloons", slug: "burst-balloons", d: "H", tag: "Interval DP" },
      { q: "Matrix Chain Multiplication", search: "matrix chain multiplication geeksforgeeks", d: "H", tag: "Interval DP" },
      { q: "Wildcard Matching", slug: "wildcard-matching", d: "H", tag: "Pattern DP", corpus: 1 },
      { q: "Regular Expression Matching", slug: "regular-expression-matching", d: "H", tag: "Pattern DP" },
      { q: "Longest Valid Parentheses", slug: "longest-valid-parentheses", d: "H", tag: "1D / stack" }
    ]}
  ]
},

/* ================================================== TRIE */
{
  id: "t-trie",
  title: "Trie",
  order: 14,
  why: "Small topic with a high payoff. Word Search II was asked directly, and one candidate reached for a Trie on Word Break — knowing when a Trie is and is not the answer matters.",
  learn: [
    "Node structure: children map or array[26], plus an isEndOfWord flag",
    "Insert, search, and startsWith — all O(length of word), independent of how many words are stored",
    "Space cost, and why a Trie beats a HashSet only when you need prefix queries",
    "Trie + DFS/backtracking on a grid — this is what makes Word Search II tractable",
    "Deleting from a Trie; counting words with a prefix",
    "Bit-trie for XOR maximisation (bonus)"
  ],
  patterns: ["Prefix lookup", "Trie + backtracking", "Autocomplete", "Bit trie"],
  tiers: [
    { name: "Core", items: [
      { q: "Implement Trie (Prefix Tree)", slug: "implement-trie-prefix-tree", d: "M", tag: "Build it once" },
      { q: "Design Add and Search Words Data Structure", slug: "design-add-and-search-words-data-structure", d: "M", tag: "Wildcard search" },
      { q: "Replace Words", slug: "replace-words", d: "M", tag: "Prefix" },
      { q: "Search Suggestions System", slug: "search-suggestions-system", d: "M", tag: "Autocomplete", note: "Very Amazon-flavoured — it is a product search box." },
      { q: "Word Search II", slug: "word-search-ii", d: "H", tag: "Trie + backtracking", corpus: 1 },
      { q: "Maximum XOR of Two Numbers in an Array", slug: "maximum-xor-of-two-numbers-in-an-array", d: "M", tag: "Bit trie" }
    ]}
  ]
},

/* ================================================== BITS */
{
  id: "t-bits",
  title: "Bit Manipulation",
  order: 15,
  why: "Low frequency but cheap to learn, and it shows up in OA debugging sections and as a follow-up ('can you do it with O(1) space?').",
  learn: [
    "AND, OR, XOR, NOT, left/right shift, and arithmetic vs logical right shift",
    "XOR properties: x^x = 0, x^0 = x, XOR is commutative and associative. This solves the entire single-number family.",
    "n & (n-1) clears the lowest set bit; n & -n isolates it",
    "Checking, setting, clearing and toggling the i-th bit",
    "Counting set bits (Brian Kernighan's algorithm)",
    "Bitmask as a set — subsets via 0..2^n-1, and bitmask DP (bonus)",
    "Overflow and signedness traps in Java/C++"
  ],
  patterns: ["XOR cancellation", "n & (n-1)", "Bitmask as set", "Shift arithmetic"],
  tiers: [
    { name: "Core", items: [
      { q: "Single Number", slug: "single-number", d: "E", tag: "XOR" },
      { q: "Single Number II", slug: "single-number-ii", d: "M", tag: "Bit counting" },
      { q: "Single Number III", slug: "single-number-iii", d: "M", tag: "XOR + partition" },
      { q: "Number of 1 Bits", slug: "number-of-1-bits", d: "E", tag: "Kernighan" },
      { q: "Counting Bits", slug: "counting-bits", d: "E", tag: "DP + bits" },
      { q: "Missing Number", slug: "missing-number", d: "E", tag: "XOR / sum" },
      { q: "Reverse Bits", slug: "reverse-bits", d: "E", tag: "Shifting" },
      { q: "Power of Two", slug: "power-of-two", d: "E", tag: "n & (n-1)" },
      { q: "Sum of Two Integers (no + or -)", slug: "sum-of-two-integers", d: "M", tag: "Carry via XOR/AND" }
    ]}
  ]
},

/* ================================================== DESIGN */
{
  id: "t-design",
  title: "Design-a-data-structure",
  order: 16,
  why: "At SDE-1 there is usually no dedicated system-design round, but a 'design a data structure that supports X' question inside a coding round is common — the post-office hierarchy question in the corpus took 20-25 minutes of a technical round.",
  learn: [
    "Clarify the API first: what operations, what complexity is expected for each, what are the constraints",
    "Combining structures to hit a complexity target — the core skill. Map + DLL for LRU. Map + array for O(1) random. Two heaps for median.",
    "Thread safety: if the interviewer says 'multiple threads', say the word 'lock' and reason about granularity",
    "Nested / hierarchical structures — nested hashmaps or a trie-like tree, with a decision about where to put the query index",
    "Trade-offs: read-optimised vs write-optimised, memory vs speed. State them out loud.",
    "Edge cases: empty, full, duplicate, capacity 0, concurrent modification"
  ],
  patterns: ["Map + linked list", "Map + array", "Two heaps", "Nested maps", "Circular buffer", "Bucket by time"],
  tiers: [
    { name: "Core", items: [
      { q: "LRU Cache", slug: "lru-cache", d: "M", tag: "Map + DLL", corpus: 1 },
      { q: "Min Stack", slug: "min-stack", d: "M", tag: "Auxiliary stack" },
      { q: "Design Circular Queue", slug: "design-circular-queue", d: "M", tag: "Fixed array", corpus: 1 },
      { q: "Insert Delete GetRandom O(1)", slug: "insert-delete-getrandom-o1", d: "M", tag: "Map + array" },
      { q: "Find Median from Data Stream", slug: "find-median-from-data-stream", d: "H", tag: "Two heaps", corpus: 1 },
      { q: "Logger Rate Limiter", slug: "logger-rate-limiter", d: "E", tag: "Map + timestamp", corpus: 1 },
      { q: "Serialize and Deserialize Binary Tree", slug: "serialize-and-deserialize-binary-tree", d: "H", tag: "Encoding" },
      { q: "Design Underground System", slug: "design-underground-system", d: "M", tag: "Multiple maps" },
      { q: "Design Twitter", slug: "design-twitter", d: "M", tag: "Map + heap merge" },
      { q: "Hierarchical data structure: post offices by Country > State > City > Town > Name, queryable by region", search: "design nested hierarchical lookup data structure interview", d: "M", tag: "Nested maps / tree", corpus: 1, note: "Asked for 20-25 min inside an SDE-1 technical round. Candidate proposed nested hash maps or BSTs per level." }
    ]},
    { name: "Stretch", items: [
      { q: "LFU Cache", slug: "lfu-cache", d: "H", tag: "Map + freq buckets" },
      { q: "Design In-Memory File System", slug: "design-in-memory-file-system", d: "H", tag: "Tree of nodes", note: "LeetCode Premium, but the shape is the post-office question." },
      { q: "Design Search Autocomplete System", slug: "design-search-autocomplete-system", d: "H", tag: "Trie + heap" }
    ]}
  ]
}

];
