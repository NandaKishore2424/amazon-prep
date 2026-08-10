/* ------------------------------------------------------------------
   Amazon Prep — DBMS syllabus, scratch → Amazon level
------------------------------------------------------------------- */

const SYLLABUS = {
  key: "dbms",
  subject: "Database Management Systems",
  tagline: "From what a primary key is, to defending a DynamoDB partition-key choice.",
  intro: "Of the three fundamentals subjects, this is the one Amazon leans on hardest, because every design question eventually becomes a data question. Modules 2 (SQL), 4 (indexing) and 5 (transactions) are the core. Module 6 is the one that separates candidates in a design round — and it is the one most people skip.",
  evidence: "In the collected experiences, an SDE-II HackerRank round included scenario questions on DATABASE SELECTION and queue systems. A technical round covered transactions, deadlocks and critical sections. Design rounds — parking garage, BookMyShow, concert booking with concurrency — all become concurrency-control and schema questions the moment you go one level deep.",

  modules: [
  {
    id: "db-1", num: 1, title: "Foundations — the relational model", level: "foundation",
    why: "One session. You need the vocabulary — relation, key, constraint — before SQL or normalisation makes sense.",
    topics: [
      { t: "Why a DBMS", sub: [
        "What a file-based system cannot give you: data redundancy control, concurrent access, integrity constraints, atomicity, security, recovery",
        "DBMS vs RDBMS",
        "Three-schema architecture: physical, logical, view level",
        "Logical vs physical data independence"
      ]},
      { t: "ER modelling", sub: [
        "Entity, entity set, attribute (simple, composite, multivalued, derived)",
        "Relationships and cardinality: 1:1, 1:N, M:N; participation (total vs partial)",
        "Weak entity sets and identifying relationships",
        "Generalisation, specialisation, aggregation",
        "Converting an ER diagram to relational tables — including how you resolve an M:N relationship (a junction table). This is a common whiteboard exercise."
      ]},
      { t: "Relational model", sub: [
        "Relation (table), tuple (row), attribute (column), domain",
        "Degree (number of columns) vs cardinality (number of rows)",
        "NULL semantics and why NULL is not a value",
        "Relational algebra basics: selection σ, projection π, join ⋈, union, set difference, Cartesian product — worth knowing the symbols exist"
      ]},
      { t: "Keys", sub: [
        "Super key ⊇ candidate key ⊇ primary key",
        "Alternate key, composite key, foreign key, surrogate key",
        "Primary key vs unique key — a table has one primary key, which cannot be NULL; unique keys can be many and can allow one NULL",
        "Referential integrity; ON DELETE CASCADE / SET NULL / RESTRICT"
      ]},
      { t: "Constraints", sub: ["NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK, DEFAULT", "Entity integrity vs referential integrity vs domain integrity"] }
    ],
    asked: [
      "Primary key vs unique key vs candidate key.",
      "What is a foreign key and what does it enforce?",
      "How do you convert an M:N relationship into tables?",
      "Design the schema for [a library / a food delivery app / a parking lot]."
    ]
  },

  {
    id: "db-2", num: 2, title: "SQL — writing it, not describing it", level: "core",
    why: "You will be asked to WRITE a query, not to define one. Window functions and self joins are the two things that separate people who practised from people who read.",
    topics: [
      { t: "The sublanguages", sub: [
        "DDL: CREATE, ALTER, DROP, TRUNCATE",
        "DML: SELECT, INSERT, UPDATE, DELETE",
        "DCL: GRANT, REVOKE",
        "TCL: COMMIT, ROLLBACK, SAVEPOINT",
        "DELETE vs TRUNCATE vs DROP — a classic three-way comparison (rollback-able? resets identity? removes structure?)"
      ]},
      { t: "Query evaluation order — know this cold", sub: [
        "Written order: SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT",
        "LOGICAL evaluation order: FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT",
        "This is why you cannot use a SELECT alias in WHERE but can in ORDER BY. Exactly this gets asked."
      ]},
      { t: "Joins", sub: [
        "INNER, LEFT, RIGHT, FULL OUTER, CROSS",
        "SELF JOIN — the employee/manager table is the canonical interview question",
        "Join vs subquery vs EXISTS — and which the optimiser prefers",
        "What a LEFT JOIN with a WHERE on the right table does (it silently becomes an INNER JOIN — a classic trap)",
        "Anti-join pattern: LEFT JOIN … WHERE right.id IS NULL"
      ]},
      { t: "Aggregation and grouping", sub: [
        "COUNT(*) vs COUNT(col) vs COUNT(DISTINCT col) — NULL handling differs",
        "SUM, AVG, MIN, MAX",
        "GROUP BY, and the rule that every non-aggregated SELECT column must be grouped",
        "WHERE (before grouping) vs HAVING (after grouping) — asked constantly"
      ]},
      { t: "Subqueries", sub: [
        "Scalar, row and table subqueries",
        "Correlated vs non-correlated — and the performance implication (a correlated subquery runs per row)",
        "IN vs EXISTS vs JOIN; the NULL trap with NOT IN",
        "Derived tables and CTEs (WITH), including RECURSIVE CTEs for hierarchies"
      ]},
      { t: "Window functions — practise these", sub: [
        "OVER (PARTITION BY … ORDER BY …)",
        "ROW_NUMBER vs RANK vs DENSE_RANK — the difference on ties is a guaranteed question",
        "LAG and LEAD for comparing to the previous/next row",
        "Running totals and moving averages with SUM() OVER",
        "NTILE, FIRST_VALUE, LAST_VALUE",
        "Window functions turn several hard interview queries into three lines. Learn them."
      ]},
      { t: "Other SQL you should be able to write", sub: [
        "CASE WHEN, COALESCE, NULLIF",
        "UNION vs UNION ALL (dedup cost), INTERSECT, EXCEPT",
        "String and date functions at a basic level",
        "Views and materialised views — a view is a stored query, a materialised view stores results and must be refreshed",
        "Stored procedures, functions, triggers, cursors — know what each is and when a trigger is a bad idea"
      ]},
      { t: "The query set to actually practise", sub: [
        "Nth highest salary (with and without window functions)",
        "Find and delete duplicate rows",
        "Department-wise top N earners",
        "Employees earning more than their manager (self join)",
        "Consecutive records — e.g. numbers appearing three times in a row",
        "Customers who never ordered (anti-join)",
        "Running total per user per month",
        "Second-highest without LIMIT/OFFSET",
        "Pivot rows into columns with conditional aggregation"
      ]}
    ],
    asked: [
      "Write a query for the Nth highest salary.",
      "WHERE vs HAVING.",
      "RANK vs DENSE_RANK vs ROW_NUMBER.",
      "DELETE vs TRUNCATE vs DROP.",
      "Find duplicate emails in a table and delete all but one.",
      "Write a query to find each employee whose salary exceeds their manager's.",
      "What is a correlated subquery and why can it be slow?",
      "Why can't I use a column alias in the WHERE clause?"
    ]
  },

  {
    id: "db-3", num: 3, title: "Normalisation & schema design", level: "core",
    why: "Standard interview territory, and the theory directly informs the design question you will actually be asked ('design the schema for X').",
    topics: [
      { t: "Functional dependencies", sub: [
        "X → Y: what it means",
        "Trivial vs non-trivial; full vs partial dependency; transitive dependency",
        "Armstrong's axioms: reflexivity, augmentation, transitivity",
        "Attribute closure (X+) — and using it to find candidate keys. Practise this; it is the mechanical part of the topic.",
        "Canonical / minimal cover"
      ]},
      { t: "Normal forms", sub: [
        "1NF — atomic values, no repeating groups",
        "2NF — 1NF + no PARTIAL dependency of a non-prime attribute on a composite key",
        "3NF — 2NF + no TRANSITIVE dependency (non-prime attribute depending on another non-prime attribute)",
        "BCNF — for every dependency X → Y, X must be a super key. Stricter than 3NF.",
        "3NF vs BCNF: 3NF always preserves dependencies, BCNF may not. This is the standard follow-up.",
        "4NF (multivalued dependencies) and 5NF (join dependencies) — know they exist",
        "Be ready to normalise a badly designed table from 1NF up to BCNF on a whiteboard"
      ]},
      { t: "Decomposition", sub: [
        "Lossless join decomposition — and how to check it",
        "Dependency preservation",
        "Why you cannot always have both (BCNF may sacrifice dependency preservation)"
      ]},
      { t: "Denormalisation", sub: [
        "Deliberately introducing redundancy to avoid joins",
        "When it is right: read-heavy workloads, analytics, precomputed aggregates",
        "The cost: update anomalies and the burden of keeping copies consistent",
        "Saying 'I would denormalise here because the read:write ratio is 1000:1' is a senior-sounding answer. Have a reason."
      ]}
    ],
    asked: [
      "What is normalisation and why do we do it?",
      "Explain 1NF through BCNF with an example.",
      "Difference between 3NF and BCNF.",
      "Given these functional dependencies, find the candidate keys and the highest normal form.",
      "When would you deliberately denormalise?"
    ]
  },

  {
    id: "db-4", num: 4, title: "Indexing, storage & query performance", level: "core",
    why: "The highest-value DBMS module for Amazon. 'Why is this query slow?' is a real interview question, and B+ tree vs hash index vs LSM tree is exactly the kind of trade-off reasoning a design round rewards.",
    topics: [
      { t: "How data is physically stored", sub: [
        "Pages / blocks; a heap file; row-oriented vs column-oriented storage and when each wins",
        "The buffer pool — why the database caches pages in memory",
        "Why a full table scan costs what it costs"
      ]},
      { t: "Index fundamentals", sub: [
        "An index is a separate structure mapping key → row location. It speeds reads and slows writes.",
        "CLUSTERED index — determines the physical order of rows; one per table. In InnoDB, the primary key IS the clustered index.",
        "NON-CLUSTERED / secondary index — separate structure pointing back to the row",
        "Dense vs sparse index; primary vs secondary index",
        "COMPOSITE index and the LEFT-PREFIX RULE: an index on (a, b, c) helps queries filtering on a, or a+b, or a+b+c — but not on b alone. This is asked and it is a great answer to give unprompted.",
        "COVERING index — the index contains every column the query needs, so the table is never touched",
        "Unique index, partial/filtered index"
      ]},
      { t: "Index data structures", sub: [
        "B-TREE vs B+ TREE — and WHY databases use B+ trees: all data lives in the leaves, the leaves are linked so range scans are sequential, and internal nodes hold only keys so fanout is higher and the tree is shallower. This is the single most asked DBMS data-structure question.",
        "HASH INDEX — O(1) equality lookup, useless for range queries or ORDER BY",
        "Bitmap index — good for low-cardinality columns in analytics",
        "LSM TREE — write-optimised: memtable + SSTables + compaction. Used by Cassandra, RocksDB, and behind DynamoDB. Compare to B-trees: LSM favours writes, B-tree favours reads. Very worth knowing for an Amazon interview.",
        "Full-text and inverted indexes"
      ]},
      { t: "When indexes hurt", sub: [
        "Every INSERT/UPDATE/DELETE must maintain every index",
        "Low-cardinality columns (a boolean) — the index does not narrow anything",
        "Too many indexes on a write-heavy table",
        "Index on a column wrapped in a function (WHERE YEAR(created_at) = 2026) is not used — this is a real, common bug"
      ]},
      { t: "Query planning", sub: [
        "EXPLAIN / EXPLAIN ANALYZE — read the plan, not the query",
        "Sequential scan vs index scan vs index-only scan",
        "Join algorithms: nested loop, hash join, sort-merge join — and when the optimiser picks each",
        "Statistics and cardinality estimation; why stale statistics produce bad plans",
        "The N+1 QUERY PROBLEM — one query for the list, then one per item. Know the name and the fix (join or batch fetch)."
      ]},
      { t: "Practical tuning", sub: [
        "Add the index that matches the WHERE and ORDER BY clauses",
        "SELECT only the columns you need",
        "Pagination: OFFSET is O(offset); keyset/cursor pagination is O(1)",
        "Connection pooling and why opening a connection per request kills you",
        "Batching writes"
      ]}
    ],
    asked: [
      "What is an index and how does it work internally?",
      "Why do databases use B+ trees instead of B-trees or binary search trees?",
      "Clustered vs non-clustered index.",
      "You have an index on (a, b, c). Which queries use it?",
      "When would an index make things worse?",
      "This query is slow. How do you diagnose and fix it?",
      "Hash index vs B+ tree index — when would you pick a hash index?",
      "What is the N+1 query problem?"
    ]
  },

  {
    id: "db-5", num: 5, title: "Transactions, concurrency & recovery", level: "core",
    why: "Asked directly in the corpus ('transactions, deadlocks, critical sections'). It is also the backbone of every concurrency-flavoured design question — the concert-booking and parking-garage LLD rounds both come down to this.",
    topics: [
      { t: "ACID", sub: [
        "Atomicity — all or nothing (implemented by undo logs / rollback)",
        "Consistency — the database moves from one valid state to another, constraints hold",
        "Isolation — concurrent transactions do not see each other's intermediate state",
        "Durability — once committed, it survives a crash (implemented by WAL + fsync)",
        "Give a concrete example for each. 'Transfer money between two accounts' covers all four."
      ]},
      { t: "Concurrency anomalies", sub: [
        "DIRTY READ — reading uncommitted data",
        "NON-REPEATABLE READ — reading the same row twice and getting different values",
        "PHANTOM READ — re-running the same query and getting different ROWS",
        "LOST UPDATE — two writes, one silently overwrites the other",
        "Write skew",
        "Be able to describe each with a two-transaction timeline"
      ]},
      { t: "Isolation levels — build the table", sub: [
        "READ UNCOMMITTED — allows dirty reads",
        "READ COMMITTED — prevents dirty reads (Postgres default)",
        "REPEATABLE READ — prevents non-repeatable reads (MySQL InnoDB default)",
        "SERIALIZABLE — prevents phantoms; behaves as if transactions ran one at a time",
        "Draw the 4×3 grid of level vs anomaly. This is the highest-yield thing to memorise in the whole module.",
        "The trade-off: higher isolation, less concurrency, more locking"
      ]},
      { t: "Schedules and serialisability", sub: [
        "Serial vs concurrent schedule",
        "Conflict serialisability; building a precedence graph and checking for a cycle",
        "View serialisability (know it exists)",
        "Recoverable and cascadeless schedules"
      ]},
      { t: "Locking", sub: [
        "Shared (read) vs exclusive (write) locks; the compatibility matrix",
        "TWO-PHASE LOCKING (2PL): a growing phase then a shrinking phase. Guarantees serialisability.",
        "Strict 2PL — hold all locks until commit. What real systems do.",
        "Lock granularity: row, page, table. Intention locks for the hierarchy.",
        "Gap locks and next-key locks (how InnoDB prevents phantoms)",
        "Optimistic vs pessimistic concurrency control. Optimistic = version check on write, retry on conflict; good for low-contention. Pessimistic = lock first; good for high-contention. Say which you would use and why."
      ]},
      { t: "Deadlocks in the database", sub: [
        "Same four conditions as OS deadlocks",
        "Detection with a wait-for graph; the database picks a victim and rolls it back",
        "Prevention: wait-die and wound-wait (timestamp-based)",
        "The practical fix: always acquire locks in a consistent order, and keep transactions short",
        "Lock timeouts"
      ]},
      { t: "MVCC", sub: [
        "Multi-Version Concurrency Control — readers see a snapshot, writers create a new version. READERS DO NOT BLOCK WRITERS and writers do not block readers.",
        "How Postgres does it (tuple versions + vacuum) and how InnoDB does it (undo log + read view)",
        "Why MVCC is the default answer to 'how do you get high read concurrency?'"
      ]},
      { t: "Recovery", sub: [
        "WRITE-AHEAD LOGGING — log the change before applying it. This is how atomicity and durability are actually implemented.",
        "Undo vs redo; checkpoints",
        "ARIES at a high level: analysis, redo, undo",
        "Shadow paging (contrast)"
      ]}
    ],
    asked: [
      "Explain ACID with an example.",
      "What are the isolation levels and which anomalies does each prevent?",
      "Dirty read vs non-repeatable read vs phantom read.",
      "What is two-phase locking?",
      "How does a database detect and resolve deadlocks?",
      "What is MVCC and why is it useful?",
      "Two users try to book the last seat at the same time. How do you make sure only one succeeds?",
      "Optimistic vs pessimistic locking — which would you use for a booking system?"
    ]
  },

  {
    id: "db-6", num: 6, title: "Distributed data, NoSQL & scaling", level: "advanced",
    why: "The Amazon-specific module. A scenario round in the corpus asked about DATABASE SELECTION outright. This is also where DynamoDB knowledge pays off — it is Amazon's own database and it comes up by name.",
    topics: [
      { t: "Scaling a database", sub: [
        "Vertical vs horizontal scaling",
        "READ REPLICAS — offload reads; the cost is REPLICATION LAG and therefore stale reads. Know the read-your-own-writes problem.",
        "Connection pooling, caching layer in front",
        "When you have genuinely outgrown a single node"
      ]},
      { t: "Partitioning / sharding", sub: [
        "Range partitioning — good for range scans, prone to hot partitions",
        "Hash partitioning — even distribution, bad for range scans",
        "Consistent hashing — minimises reshuffling when nodes join or leave; virtual nodes to smooth distribution",
        "Directory/lookup-based sharding",
        "HOT PARTITIONS / hot keys — the practical failure mode. Mitigation: better shard key, key salting.",
        "Choosing a shard key: high cardinality, even distribution, aligned with your query pattern",
        "Cross-shard joins and transactions — why they are the thing you design to avoid"
      ]},
      { t: "Replication", sub: [
        "Leader-follower (single leader), multi-leader, leaderless (Dynamo-style)",
        "Synchronous vs asynchronous replication — durability vs latency",
        "QUORUM: R + W > N gives strong consistency. Be able to work an example (N=3, W=2, R=2).",
        "Failover, split brain, and why you need a consensus protocol",
        "Raft and Paxos — know what they are for, you will not be asked to derive them"
      ]},
      { t: "CAP and consistency models", sub: [
        "CAP theorem: under a network Partition, choose Consistency or Availability. The honest framing: partitions are not optional, so CAP is really CP vs AP.",
        "PACELC — the extension: Else (no partition), choose Latency or Consistency. Better answer than plain CAP.",
        "Strong vs eventual consistency",
        "Read-your-writes, monotonic reads, causal consistency",
        "'Eventually consistent' means the system converges — say what the client should do about it in the meantime"
      ]},
      { t: "SQL vs NoSQL — the scenario question", sub: [
        "Relational: strong schema, joins, ACID transactions, mature tooling. Pick it when relationships and correctness dominate.",
        "Key-value (DynamoDB, Redis): O(1) lookup by key, massive scale, no joins",
        "Document (MongoDB): flexible schema, nested documents, good when the aggregate is the access unit",
        "Wide-column (Cassandra, HBase): huge write throughput, query-driven schema",
        "Graph (Neo4j): when the relationships ARE the query",
        "Time-series, search (Elasticsearch)",
        "The interview answer is never 'NoSQL is faster'. It is: here is my access pattern, here is my consistency requirement, here is my scale, therefore this."
      ]},
      { t: "DynamoDB — worth knowing by name at Amazon", sub: [
        "Partition key and sort key; the composite primary key",
        "How the partition key determines physical distribution — and therefore hot partitions",
        "GSI (global secondary index) vs LSI (local secondary index)",
        "Single-table design and why it exists (no joins, so you model access patterns not entities)",
        "Eventually consistent vs strongly consistent reads, and the cost difference",
        "Provisioned vs on-demand capacity; RCU/WCU",
        "DynamoDB Streams; TTL",
        "You do not need depth here. Knowing the vocabulary signals you have thought about Amazon's own stack."
      ]},
      { t: "Distributed transactions", sub: [
        "Two-phase commit (2PC): prepare then commit. Its failure mode: the coordinator dies and participants block.",
        "Three-phase commit (why it exists, why nobody uses it)",
        "SAGA pattern — a sequence of local transactions with compensating actions. The practical answer for microservices.",
        "Outbox pattern for reliably publishing events alongside a database write",
        "Idempotency as the foundation of all of it"
      ]},
      { t: "Caching with a database", sub: [
        "Redis / Memcached in front of the database",
        "Cache-aside vs write-through vs write-behind",
        "TTL, eviction policy, and cache invalidation as the hard problem",
        "Thundering herd on cache expiry, and mitigations",
        "What NOT to cache"
      ]}
    ],
    asked: [
      "SQL vs NoSQL — which would you pick for this feature and why? (Asked as a scenario question in the corpus.)",
      "Explain the CAP theorem. Which do you give up, and when?",
      "How would you shard this table? What is your shard key and why?",
      "What is replication lag and how does it bite you?",
      "How do you keep two services' data consistent without a distributed transaction?",
      "Design the data model for [a booking system / a feed / an order service].",
      "What is a hot partition and how do you avoid one?"
    ]
  },

  {
    id: "db-7", num: 7, title: "Amazon-level — data decisions you can defend", level: "advanced",
    why: "The bridge between DBMS theory and the design round. Everything here is a decision, not a definition — which is exactly how these questions are actually posed.",
    topics: [
      { t: "Designing a schema live", sub: [
        "Start from ACCESS PATTERNS, not from entities. What queries must be fast?",
        "Decide the primary key and the indexes before you decide anything else",
        "State the read:write ratio and the expected scale out loud — it justifies every later choice",
        "Where you would denormalise, and what that costs you on writes",
        "Soft deletes, audit columns, created_at/updated_at, versioning"
      ]},
      { t: "Concurrency in a real feature", sub: [
        "Seat booking / inventory decrement: pessimistic row lock, optimistic version column, or a conditional update (UPDATE … WHERE version = ?). Be able to argue for one.",
        "Preventing double-booking and double-charging",
        "Handling the retry that arrives after the first request already succeeded",
        "Where you would put a queue instead of a lock"
      ]},
      { t: "Operational reality", sub: [
        "Migrations on a live table with millions of rows — why ALTER TABLE can lock you out, and the expand/contract pattern",
        "Backups, point-in-time recovery, RPO and RTO",
        "Monitoring: slow query log, p99 query latency, connection count, replication lag",
        "What you would do if the database is at 100% CPU right now"
      ]}
    ],
    asked: [
      "Design the database for [the feature we just discussed]. Walk me through your keys and indexes.",
      "Two requests decrement the same inventory row concurrently. What happens, and how do you fix it?",
      "How would you add a column to a 500-million-row table with no downtime?",
      "Your read replica is 30 seconds behind and users are seeing stale data. What are your options?",
      "The database is the bottleneck. What do you try, in what order?"
    ]
  }
  ],

  resources: [
    { name: "Database System Concepts (Silberschatz, Korth, Sudarshan)", url: "https://db-book.com/", note: "The standard textbook. Use it for normalisation, transactions and recovery." },
    { name: "Designing Data-Intensive Applications (Kleppmann)", url: "https://dataintensive.net/", note: "The single best book for modules 4, 5 and 6. If you read one thing for the design round, read chapters 3, 5, 6 and 7." },
    { name: "GeeksforGeeks — DBMS", url: "https://www.geeksforgeeks.org/dbms/", note: "Fastest path to interview-shaped answers, normalisation practice and FD closure problems." },
    { name: "LeetCode — Database problems", url: "https://leetcode.com/problemset/database/", note: "Where to actually practise SQL. Do the top 50; they cover joins, window functions and self joins." },
    { name: "Use The Index, Luke", url: "https://use-the-index-luke.com/", note: "Free, and the clearest explanation anywhere of how B+ tree indexes behave in practice." },
    { name: "DynamoDB developer guide — core components", url: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html", note: "Half an hour here is worth it before an Amazon interview." },
    { name: "Gate Smashers — DBMS", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFAN6I8CuViBuCdJgiOkT2Y", note: "For normalisation and serialisability numericals." }
  ]
};
