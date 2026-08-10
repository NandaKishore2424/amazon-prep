/* ------------------------------------------------------------------
   Amazon Prep — System Design & LLD, scratch → Amazon level
------------------------------------------------------------------- */

const SD_GUIDE = {

/* ============================================================ CALIBRATION */
calibration: {
  intro: "Before you study anything here, know how much of it applies to you. Design is weighted very differently by level, and preparing for the wrong one wastes the three days you have.",
  levels: [
    { lvl: "SDE-1 (L4)", verdict: "No dedicated design round — but design questions appear INSIDE coding rounds.",
      d: "In the collected experiences, no SDE-1 loop had a standalone system design round. What they did have: a 20-25 minute 'design a data structure that supports X' question inside a technical round, a 'design a cache with get and set' in a Bar Raiser, and one round where 40 of 60 minutes went into the candidate's own project — architecture, storage choices, edge cases, failure scenarios and scaling. That last one is a design interview wearing a different name.",
      focus: "Sections 2, 3, 5 and the first two designs. Then rehearse your own project as a design walkthrough. Skip the large HLD designs unless you have time left over." },
    { lvl: "SDE-2 (L5)", verdict: "One full design round, usually HLD or LLD, sometimes both.",
      d: "The corpus records a 40-minute 'design a scalable and concurrent parking garage', a 'design a BookMyShow-like service' LLD round, a hiring-manager round on high-level design, plus onsite rounds covering 'design YouTube with uploads, likes and comments' and 'concert booking with concurrency'. Concurrency is the recurring theme, not scale for its own sake.",
      focus: "Everything on this page. Prioritise the concurrency deep-dives — they appear in three separate rounds." },
    { lvl: "SDE-3 (L6)", verdict: "Two design rounds.",
      d: "Distributed systems depth: consistency models, partitioning strategy, failure modes, multi-region. Out of scope for an SDE-1 hiring event.",
      focus: "Not this page." }
  ],
  note: "If you are interviewing for SDE-1: the single highest-value thing on this page is section 5 (LLD) and the 'design a data structure' walkthrough, because that is the form the question actually took in the corpus. The second highest is being able to narrate your own project like a design doc."
},

/* ============================================================ FRAMEWORK */
framework: {
  intro: "A design round has no correct answer, so what is being scored is your process. This is the equivalent of STAR for design: structure it this way and the interviewer can follow and score you. Ramble and they cannot, regardless of how good your ideas are.",
  clock: [
    { t: "0-5 min", h: "Clarify. Do not start designing.",
      d: "The single most common failure is starting to draw boxes in minute one. Ask: who uses this and for what, what are the two or three core features (and what is explicitly out of scope), how many users, read-heavy or write-heavy, does it need to be real-time, does it need to be strongly consistent. Write the answers where you both can see them. If the interviewer is vague, propose a number and ask them to correct you — 'let us say 10 million daily users, is that the right order of magnitude?'" },
    { t: "5-8 min", h: "Estimate, roughly, out loud.",
      d: "Convert users to QPS, and data to storage. You are not being graded on arithmetic; you are being graded on whether your design is sized for the problem. Round aggressively. 86,400 seconds in a day is 100,000 for our purposes. Say the assumption before every number." },
    { t: "8-12 min", h: "Define the API.",
      d: "Three to five endpoints with their parameters and what they return. This forces you to be concrete about what the system does and it constrains the data model. Skipping this is why people end up designing a system that cannot answer the actual question." },
    { t: "12-18 min", h: "Data model.",
      d: "The tables or items, the primary key, and the two or three access patterns that matter. Say which database type and why in one sentence. At Amazon, be ready for 'why not DynamoDB' or 'why not a relational database' — the answer must reference your access patterns, not general preference." },
    { t: "18-30 min", h: "High-level design.",
      d: "Draw the boxes and the arrows, and narrate the path of one request end to end. Start simple and correct — client, load balancer, service, database — then add components only when you can name the problem each one solves. A cache added without saying what it fixes is a red flag." },
    { t: "30-40 min", h: "Deep dive on whatever they pick.",
      d: "The interviewer will point at one box and ask you to open it. This is the real interview; everything before was setup. Common picks: the concurrency in the booking path, how the cache invalidates, how sharding works, what happens when this node dies." },
    { t: "40-45 min", h: "Bottlenecks and failure.",
      d: "Volunteer this rather than waiting. What breaks first at ten times the load, what happens when each dependency is down, where the single point of failure is, and what you would monitor. Ending here rather than trailing off is a strong finish." }
  ],
  habits: [
    "Drive the conversation. A design round where the interviewer has to ask 'what next?' every two minutes is scored as a fail even if the design is fine. Say what you are going to do, then do it.",
    "State a trade-off every time you make a choice. 'I am using a queue here — it decouples the write path and absorbs spikes, at the cost of the result no longer being immediately visible to the user.' The second half is what gets scored.",
    "Start simple and evolve. Design the single-server version, then say what breaks, then fix that. This is far stronger than opening with a microservices diagram.",
    "Never add a component you cannot justify. Every box needs a sentence naming the problem it solves. Kafka because Kafka is a red flag.",
    "Say your assumptions out loud and write them down. An interviewer will correct a wrong assumption; they cannot correct a hidden one.",
    "Think out loud, always. Silence reads as being stuck. 'I am weighing whether to denormalise here' is a sentence that buys you ten seconds and scores.",
    "Manage the clock yourself. If you are 25 minutes in and still on the data model, say 'let me move to the high-level design' and move.",
    "It is fine to say you do not know. Then say how you would find out or what you would try first. Bluffing is caught immediately and costs Earn Trust."
  ]
},

/* ============================================================ NUMBERS */
numbers: {
  intro: "You need enough arithmetic to size a system in your head. Round hard — nobody is checking your decimals, they are checking whether you know that 10 million users is not the same problem as 10 thousand.",
  latency: [
    { k: "L1 cache reference", v: "~1 ns" },
    { k: "Main memory reference", v: "~100 ns" },
    { k: "Read 1 MB sequentially from memory", v: "~50 µs" },
    { k: "SSD random read", v: "~100 µs" },
    { k: "Read 1 MB from SSD", v: "~500 µs" },
    { k: "Round trip within the same datacentre", v: "~0.5 ms" },
    { k: "Disk seek (spinning)", v: "~10 ms" },
    { k: "Read 1 MB from disk", v: "~20 ms" },
    { k: "Round trip India to US East", v: "~200 ms" },
    { k: "Typical DB query on an indexed table", v: "1-10 ms" },
    { k: "Typical cache (Redis) read", v: "< 1 ms" }
  ],
  sizes: [
    { k: "char / boolean", v: "1 byte" },
    { k: "int", v: "4 bytes" },
    { k: "long / double / timestamp", v: "8 bytes" },
    { k: "UUID", v: "16 bytes" },
    { k: "A typical row of metadata", v: "~100 bytes to 1 KB" },
    { k: "A tweet-sized text object", v: "~300 bytes" },
    { k: "A compressed photo", v: "~200 KB - 2 MB" },
    { k: "A minute of 1080p video", v: "~50 MB" },
    { k: "2^10 / 2^20 / 2^30 / 2^40", v: "thousand / million / billion / trillion (KB / MB / GB / TB)" }
  ],
  math: [
    { t: "Users to QPS", d: "Seconds in a day = 86,400, call it 100,000. So 1 million daily active users each doing 10 requests a day = 10 million requests / 100,000 seconds = 100 QPS average. PEAK is usually 2-3x average, so budget 200-300 QPS." },
    { t: "Read:write ratio", d: "Ask for it or assume it. Most consumer systems are 100:1 or 1000:1 read-heavy, which is the justification for caching and read replicas. A write-heavy system (logging, metrics, IoT) needs a completely different design — say which one you are in." },
    { t: "Storage", d: "Objects per day x size per object x retention. 1 million new records a day at 1 KB each = 1 GB/day = ~365 GB/year. That fits on one machine, which is worth saying out loud — it stops you over-designing." },
    { t: "Bandwidth", d: "QPS x average response size. 300 QPS x 200 KB = 60 MB/s = ~480 Mbps. This is what tells you whether you need a CDN." },
    { t: "The sanity check that scores", d: "After estimating, say what the numbers imply. 'This is 300 QPS and 400 GB — that is a single well-indexed Postgres instance with a read replica. I do not need to shard, and I would be over-engineering if I did.' Interviewers respond very well to a candidate who declines to over-build." }
  ],
  worked: {
    t: "Worked estimate — a URL shortener",
    lines: [
      "Assume 100 million new URLs created per month. That is 100M / 30 / 100,000 seconds = roughly 40 writes per second.",
      "Assume a 100:1 read:write ratio, so 4,000 reads per second. Peak maybe 3x, so budget 12,000 reads per second.",
      "Storage per record: short code 7 bytes, long URL up to 500 bytes, user id 8, timestamp 8 — round to 600 bytes, call it 1 KB with overhead and indexes.",
      "100M records/month x 1 KB = 100 GB/month = 1.2 TB/year. Over five years, 6 TB.",
      "Conclusion to state out loud: writes are trivial, reads are the problem, and the whole working set of hot URLs fits comfortably in memory. So this is a caching problem and a key-value lookup problem, not a sharding problem, and I would only shard for storage growth rather than for throughput."
    ]
  }
},

/* ============================================================ BUILDING BLOCKS */
blocks: {
  intro: "The vocabulary. For each one you need three things ready: what it does in one sentence, the specific problem you would add it to solve, and what it costs you. The cost is the part that gets scored.",
  items: [
    { n: "Load balancer", what: "Distributes incoming requests across many servers.",
      use: "The moment you have more than one application server. Also gives you health checks and rolling deploys.",
      cost: "Another hop of latency, and it becomes a single point of failure unless it is itself redundant.",
      depth: ["L4 routes on IP and port and is fast and protocol-blind. L7 reads the request so it can route on path, header or cookie, and can terminate TLS.", "Algorithms: round robin, weighted, least connections, IP hash, consistent hashing.", "Sticky sessions work but couple a user to a server — prefer a shared session store."] },

    { n: "Cache (Redis / Memcached)", what: "Keeps hot data in memory in front of a slower store.",
      use: "Read-heavy workloads where the same small set of data is requested repeatedly, or expensive computations you would otherwise repeat.",
      cost: "Staleness, a second system to operate, and the hardest problem in the list — invalidation.",
      depth: ["Cache-aside (app checks cache, on miss reads DB and populates) is the default. Read-through, write-through and write-behind are the alternatives.", "Eviction: LRU, LFU, TTL. Same LRU you implement on LeetCode.", "Thundering herd: when a hot key expires, every request hits the database at once. Fix with a lock on repopulation, staggered TTLs, or refresh-ahead.", "Be ready for 'how do you invalidate?' — it is the standard follow-up. Options: TTL, explicit delete on write, or versioned keys."] },

    { n: "CDN", what: "Caches static content at edge locations physically near users.",
      use: "Images, video, JS/CSS, anything large and not personalised. Also absorbs traffic spikes and DDoS.",
      cost: "Cost per GB, and invalidation lag when content changes.",
      depth: ["Pull (origin fetch on first miss) vs push (you upload ahead of time).", "The reason a video platform is feasible at all — you never serve video bytes from your own servers."] },

    { n: "Relational database", what: "Tables, joins, ACID transactions, a query planner.",
      use: "When relationships matter, when you need transactions across rows, when your access patterns will change. This is the correct default and you should not apologise for it.",
      cost: "Harder to scale writes horizontally; schema changes on huge tables are operationally painful.",
      depth: ["Scale reads with replicas, scale writes with sharding or by not needing to.", "Replication lag means a read replica can serve stale data — know the read-your-own-writes problem.", "Index on what you filter and sort by; know the left-prefix rule for composite indexes."] },

    { n: "Key-value store (DynamoDB, Redis)", what: "O(1) lookup by key, horizontally scalable, no joins.",
      use: "When you know the access pattern in advance and it is always by key. Massive scale, predictable latency.",
      cost: "No joins, no ad-hoc queries. Change the access pattern and you may have to remodel the data.",
      depth: ["DynamoDB: partition key determines physical placement, sort key gives you range queries within a partition.", "HOT PARTITION is the failure mode — a partition key with low cardinality or a celebrity user concentrates traffic on one node.", "GSI lets you query by a different key at the cost of eventual consistency and extra write capacity.", "Worth naming at Amazon specifically. Saying 'partition key' and 'hot partition' signals you have thought about their stack."] },

    { n: "Message queue (SQS, Kafka)", what: "Buffers work between a producer and a consumer.",
      use: "Decoupling, absorbing spikes, retrying failures, and moving slow work off the request path (sending email, encoding video, generating a report).",
      cost: "Eventual consistency — the user's action is accepted but not yet done. You must design the UX for that, and handle duplicates.",
      depth: ["At-least-once delivery is the practical default, which means your consumer MUST be idempotent. 'Exactly once' is at-least-once plus idempotency.", "Dead letter queue for messages that keep failing.", "SQS is a queue (one consumer per message). Kafka is a log (many consumers, replayable, ordered within a partition). Know which you mean.", "Ordering guarantees are per-partition, not global — say so if ordering matters."] },

    { n: "Object storage (S3)", what: "Cheap, durable storage for large blobs.",
      use: "Images, video, backups, logs. Anything big that you do not query by content.",
      cost: "Higher latency than a database; no querying; eventual consistency in some operations.",
      depth: ["THE BLOB/METADATA SPLIT: put the file in object storage, put the metadata and the URL in your database. This one pattern answers half of all media-related design questions.", "Pre-signed URLs let the client upload and download directly, so bytes never pass through your servers. Say this in any upload design."] },

    { n: "Search index (Elasticsearch)", what: "Inverted index for full-text and faceted search.",
      use: "When users type words and expect relevance ranking. A database LIKE query is not search.",
      cost: "A second copy of your data that must be kept in sync, and it is not your source of truth.",
      depth: ["Sync via change data capture or by publishing to a queue on write.", "Never make it authoritative — rebuild it from the database if it is lost."] },

    { n: "Sharding / partitioning", what: "Splitting data across machines so no one machine holds it all.",
      use: "When one database cannot hold the data or serve the writes. Not before.",
      cost: "Cross-shard queries and transactions become hard or impossible. Rebalancing is painful. This is a large complexity increase — justify it.",
      depth: ["Range partitioning gives you range scans but creates hot shards on skewed keys (everything from today lands on one shard).", "Hash partitioning distributes evenly but destroys range queries.", "CONSISTENT HASHING minimises how much data moves when you add or remove a node; virtual nodes smooth out the distribution. Know this properly, it is asked directly.", "Shard key rules: high cardinality, even distribution, and aligned with your most common query."] },

    { n: "Replication", what: "Keeping copies of data on multiple machines.",
      use: "Read scaling, availability, durability.",
      cost: "Replication lag and the consistency questions that follow from it.",
      depth: ["Leader-follower is the common case. Multi-leader and leaderless (quorum) exist for multi-region and high availability.", "Synchronous replication costs latency and buys durability; asynchronous is the reverse.", "Quorum: R + W > N gives strong consistency. Be able to work an example with N=3."] },

    { n: "Real-time transport", what: "Getting data to the client without them asking.",
      use: "Chat, live scores, notifications, collaborative editing.",
      cost: "Persistent connections consume server resources and complicate load balancing and deploys.",
      depth: ["Short polling is simple and wasteful. Long polling is a decent middle ground. SSE is one-way server-to-client over plain HTTP. WebSockets are full duplex.", "Pick by direction and frequency: notifications are fine on SSE, chat needs WebSockets."] },

    { n: "Rate limiter", what: "Caps how many requests a client can make in a window.",
      use: "Protecting a service from abuse, from a buggy client, and from one tenant starving the others.",
      cost: "State that must be shared across your servers, and the risk of rejecting legitimate traffic.",
      depth: ["Token bucket allows bursts; leaky bucket smooths output; sliding window counter is the usual practical compromise.", "Distributed enforcement usually means Redis with an atomic increment.", "Return 429 with a Retry-After header — mentioning this is a nice concrete detail."] },

    { n: "Reliability patterns", what: "How a system behaves when its dependencies misbehave.",
      use: "Every design, at the end, when you talk about failure.",
      cost: "Complexity, and the risk of masking real problems.",
      depth: ["Timeouts on every network call, set lower than your caller's timeout.", "RETRY WITH EXPONENTIAL BACKOFF AND JITTER. Jitter is the part candidates omit — without it, all clients retry in sync and take the service down again.", "Circuit breaker: closed, open, half-open. Stops you hammering a service that is already failing.", "IDEMPOTENCY KEY: the client sends a unique id with the request so a retry does not create a second order. This is the single most Amazon-relevant reliability concept — say it whenever retries come up.", "Graceful degradation and load shedding: serve something reduced rather than nothing."] },

    { n: "Bloom filter", what: "A probabilistic set — no false negatives, some false positives, tiny memory.",
      use: "Cheaply avoiding an expensive lookup. 'Has this URL been seen', 'might this key exist in this SSTable'.",
      cost: "False positives, and you cannot delete from a basic one.",
      depth: ["Useful in a URL shortener (has this short code been used), a web crawler (have I seen this page), and inside LSM-tree databases."] }
  ]
},

/* ============================================================ LLD */
lld: {
  intro: "Low-level design is the form the question actually takes at SDE-1, and it is a full round at SDE-2. The corpus contains 'design a scalable and concurrent parking garage system', 'design a BookMyShow-like service', and a 20-25 minute 'design a data structure for hierarchical post office lookup' inside an SDE-1 coding round. You are being asked to produce classes, relationships and method signatures — and increasingly, to make them thread-safe.",
  process: [
    { t: "1. Clarify scope and list the use cases", d: "Say what is in and what is out. For a parking lot: park a vehicle, unpark and pay, find a free spot, handle vehicle types. Out: reservations, memberships, valet. Getting agreement on scope in 90 seconds protects the rest of the round." },
    { t: "2. Identify the entities", d: "Nouns from the use cases. Parking lot, floor, spot, vehicle, ticket, payment, gate. Do not create a class for everything — an enum is often the right answer for vehicle type." },
    { t: "3. Define relationships and cardinality", d: "A lot has many floors, a floor has many spots, a spot holds zero or one vehicle, a ticket references one spot and one vehicle. Say composition vs aggregation where it matters." },
    { t: "4. Write the key method signatures", d: "Not full implementations — signatures and what they return, including failure. Vehicle parking: Ticket park(Vehicle v) throws NoSpotAvailable. This is where the design becomes checkable." },
    { t: "5. Apply the one or two patterns that actually fit", d: "Strategy for pricing, Factory for creating spot or vehicle types, Observer for notifying a display board, State for a ticket lifecycle. Name the pattern and say why. Do not force five patterns in." },
    { t: "6. Handle concurrency, unprompted", d: "This is the differentiator and it is explicitly in the corpus question. Which shared state can two threads touch at once, what is the smallest thing you can lock, and what happens on a race. If you volunteer this before being asked, you are ahead of most candidates." },
    { t: "7. Say how you would extend it", d: "The follow-up is always 'now add electric vehicle charging' or 'now add reservations'. A design where that is a new subclass or a new strategy scores; one where it means editing five classes does not." }
  ],
  solid: [
    { k: "S — Single Responsibility", d: "A class should have one reason to change. Smell: a class named Manager or Helper that does five unrelated things." },
    { k: "O — Open/Closed", d: "Open for extension, closed for modification. Smell: adding a feature means editing a switch statement in three files. Fix: polymorphism or strategy." },
    { k: "L — Liskov Substitution", d: "A subclass must be usable anywhere the parent is. Smell: a Square subclass of Rectangle that breaks setWidth. Or an override that throws UnsupportedOperation." },
    { k: "I — Interface Segregation", d: "Do not force a class to implement methods it does not need. Smell: a fat interface where half the implementations throw." },
    { k: "D — Dependency Inversion", d: "Depend on abstractions, not concretions. Smell: your service constructs its own MySQLRepository. Fix: inject the interface. This is also what makes the thing testable, which is worth saying." }
  ],
  patterns: [
    { p: "Strategy", u: "Interchangeable algorithms chosen at runtime.", ex: "Pricing rules in a parking lot (hourly, flat, weekend). Payment methods. Ranking algorithms." },
    { p: "Factory / Abstract Factory", u: "Centralising object creation when the concrete type varies.", ex: "Creating the right ParkingSpot or Vehicle subclass from an input type." },
    { p: "Singleton", u: "Exactly one instance.", ex: "A config or an in-memory registry. Say the caveats unprompted: it is global mutable state, it makes testing hard, and it must be thread-safe (double-checked locking with a volatile field, or an enum in Java). Interviewers like it when you volunteer the downsides." },
    { p: "Observer", u: "Many objects react to one object's state change.", ex: "A display board updating when a spot frees up. Notification fan-out." },
    { p: "State", u: "An object whose behaviour changes with its internal state.", ex: "A ticket or booking moving through created, held, confirmed, cancelled — with the legal transitions enforced by the design rather than by if-statements." },
    { p: "Builder", u: "Constructing an object with many optional fields.", ex: "Any request or config object with more than four parameters." },
    { p: "Decorator", u: "Adding behaviour without subclassing.", ex: "Wrapping a repository with caching or logging." },
    { p: "Command", u: "Encapsulating a request as an object.", ex: "Undo/redo, job queues, scheduling." },
    { p: "Adapter", u: "Making an incompatible interface usable.", ex: "Wrapping a third-party payment SDK behind your own interface so you can swap it." }
  ],
  concurrency: {
    intro: "Three of the design questions in the corpus mention concurrency explicitly. Have this ready.",
    points: [
      "Find the shared mutable state first. In a parking lot it is the set of free spots. In a booking system it is the seat. That is the only thing that needs protecting.",
      "Lock the smallest thing that works. Locking the whole ParkingLot serialises every car in the building. Locking per floor, or using an atomic operation on a per-spot flag, keeps concurrency.",
      "Prefer atomic operations and concurrent collections over your own locks: an AtomicInteger counter, a ConcurrentHashMap, a compare-and-set on a spot's status.",
      "Optimistic: read the row with a version number, then UPDATE ... WHERE version = old. If zero rows changed, someone beat you — retry. Good when conflicts are rare.",
      "Pessimistic: SELECT ... FOR UPDATE, hold the row lock for the transaction. Good when conflicts are common, at the cost of throughput and deadlock risk.",
      "Deadlock avoidance in LLD is the same rule as in the OS: always acquire multiple locks in a consistent global order, and keep critical sections short.",
      "For anything spanning a request boundary — a user holding a seat while they enter card details — a lock is the wrong tool. Use a TTL-based hold record in the database or in Redis, so an abandoned session releases itself."
    ]
  }
},

/* ============================================================ DESIGNS */
designs: [

/* -------------------------------------------------- 1 */
{
  id: "sd-hier", name: "Design a data structure: hierarchical lookup", kind: "LLD", level: "SDE-1",
  corpus: true,
  why: "Asked verbatim in an SDE-1 technical round in the corpus, for 20-25 minutes: insert post offices with a hierarchy of Country to State to City to Town to Post Office Name, and query all post offices by region. This is the exact shape of design question you are most likely to get.",
  req: {
    fn: ["insert(path, postOffice) where path is the chain of region names", "findAll(regionPath) returns every post office at or below that region", "exists(path)", "Optionally: delete, and count by region"],
    nfn: ["Insert and lookup proportional to depth, not to the number of records", "Depth is fixed and shallow (5 levels)", "In-memory; assume it fits"]
  },
  approach: [
    { t: "Clarify first", d: "Are region names unique globally or only within their parent? (Almost certainly only within their parent — there is a Springfield in many states.) Is the depth fixed at 5 or arbitrary? Can a post office exist at an intermediate level? Ask these before designing; the answers change the structure." },
    { t: "The naive answer, and why it fails", d: "A flat list of records with all five fields, scanned on query. O(n) per lookup and O(n) per region query. Say this out loud as the baseline, then say what is wrong with it — that framing scores." },
    { t: "The structure", d: "A tree where each node holds a name, a map from child name to child node, and a list of post offices at that node. This is a trie over region names rather than characters. Insert walks the path creating missing nodes; query walks to the node then collects the subtree." },
    { t: "Why a HashMap of children and not a list or a BST", d: "HashMap gives O(1) child lookup, so insert and point-lookup are O(depth), which is effectively O(1) for fixed depth. A TreeMap gives O(log k) but keeps children sorted, which you want if the query needs alphabetical listing or range queries on names. Say which you would pick and why — the corpus candidate proposed hash maps or BSTs per level and the trade-off is the answer."},
    { t: "Complexity", d: "Insert O(d). Point lookup O(d). Region query O(d + size of subtree), which is optimal because you must touch every result. Space O(total nodes), with no duplication of region names across records — a real saving over the flat table." }
  ],
  code: [
    "class RegionNode {",
    "    String name;",
    "    Map<String, RegionNode> children;   // child name -> node",
    "    List<PostOffice> offices;           // offices directly at this level",
    "    int subtreeCount;                   // maintained on insert, makes count() O(d)",
    "}",
    "",
    "class PostOfficeDirectory {",
    "    private final RegionNode root;",
    "    void insert(List<String> path, PostOffice po);      // O(depth)",
    "    List<PostOffice> findByRegion(List<String> path);   // O(depth + results)",
    "    int countByRegion(List<String> path);               // O(depth), via subtreeCount",
    "}"
  ],
  deep: [
    { q: "How would you make region queries fast when the subtree is huge?", a: "Maintain a denormalised count on each node (subtreeCount above) so counting is O(depth). For listing, you cannot beat O(results) — but you can paginate by doing an iterative DFS with a cursor rather than materialising the whole list." },
    { q: "What if you need to look up a post office by name globally, not by path?", a: "Add a side index: HashMap from post office name to node or to the record. Two structures serving two access patterns is the correct answer — say explicitly that you are trading memory and write complexity for read speed." },
    { q: "Make it thread-safe.", a: "Reads dominate. Use a ConcurrentHashMap for children so lookups need no lock, and synchronise only the insert path — or use computeIfAbsent, which is atomic per key and avoids two threads creating the same child node. Do not put one global lock around the tree." },
    { q: "What if it does not fit in memory?", a: "Now it is a database question. Two options: adjacency list (each row stores its parent id, queried with a recursive CTE) or materialised path (store the full path as a string like 'IN/KA/BLR/...' with a prefix index, so a region query is a LIKE 'IN/KA/%'). Materialised path makes subtree queries a single indexed range scan, which is why it is common." },
    { q: "Add support for arbitrary depth.", a: "The design already supports it — nothing in the node assumes five levels. Point this out; a structure that generalises for free is a good sign." }
  ],
  drills: [
    { opener: "Design a data structure to store post offices by Country / State / City / Town / Name and query by region.",
      chain: [
        { q: "Why a tree and not just a table with five columns and an index?", why: "They want you to compare, not just assert. The honest answer at small scale is that a composite index on (country, state, city, town) works fine and you should say so. The tree wins on shared prefixes, on counts, and when the hierarchy is deep or ragged." },
        { q: "What is the complexity of your region query?", why: "O(depth + results). If you say O(1) or O(log n) you have not thought about the fact that you must emit every result." },
        { q: "Two threads insert into the same new city at once. What happens?", why: "The concurrency probe. Naive get-then-put creates two nodes and one insert is lost. Answer: computeIfAbsent, or a lock on the parent node." },
        { q: "Now I want the 10 nearest post offices to a coordinate.", why: "A deliberate pivot to show whether you know that this structure cannot do it. The right answer is that hierarchy and geography are different access patterns and you would add a separate spatial index (geohash or quadtree). Trying to bend the tree to do it is the wrong answer." },
        { q: "How does this change if it has to survive a restart?", why: "Persistence. Serialise the tree, or move to the materialised-path table and rebuild in memory on boot." }
      ],
      crack: "Where candidates crack: the first question. They jump straight to a trie without ever acknowledging that a single indexed table is the simpler answer at realistic scale. Always name the simple option and say why you are moving past it." }
  ]
},

/* -------------------------------------------------- 2 */
{
  id: "sd-cache", name: "Design a cache with get and set (LRU)", kind: "LLD", level: "SDE-1",
  corpus: true,
  why: "Asked in a Bar Raiser round in the corpus as 'implement a cache with get() and set()'. The candidate's array-list plus hashmap answer was sub-optimal and they were still selected — but the O(1) answer is expected and easy to have ready.",
  req: {
    fn: ["get(key) returns the value or a miss", "put(key, value) inserts or updates", "Evict the least recently used entry when at capacity"],
    nfn: ["Both operations O(1)", "Fixed capacity", "Thread-safe on request"]
  },
  approach: [
    { t: "Why the obvious answers fail", d: "A HashMap alone gives O(1) access but no ordering, so eviction is O(n). An array or list ordered by recency gives O(1) eviction but O(n) lookup and O(n) reordering. You need both properties, so you need two structures." },
    { t: "The structure", d: "HashMap from key to node, plus a doubly linked list ordered from most to least recently used. The map gives O(1) find; the list gives O(1) move-to-front and O(1) removal from the tail — and removal is O(1) only because it is doubly linked and the map hands you the node directly." },
    { t: "Sentinel nodes", d: "Use dummy head and tail nodes. It removes every null check from the add and remove logic. Mention it — it is the difference between clean and buggy pointer code, and this is a pointer-heavy problem." },
    { t: "The operations", d: "get: look up in the map, if present move the node to the front and return. put: if present, update and move to front; if absent, create, add to front, insert into map, and if over capacity remove the tail node and delete its key from the map. Forgetting to delete from the map is the classic bug." }
  ],
  code: [
    "class Node { K key; V val; Node prev, next; }",
    "",
    "class LRUCache<K,V> {",
    "    private final int capacity;",
    "    private final Map<K, Node> map;",
    "    private final Node head, tail;      // sentinels: head.next = most recent",
    "",
    "    V get(K key)          // O(1): map lookup + moveToFront",
    "    void put(K key, V v)  // O(1): insert at front, evict tail.prev if over capacity",
    "    private void moveToFront(Node n)",
    "    private void remove(Node n)",
    "    private Node evictLRU()   // remove tail.prev AND map.remove(node.key)",
    "}"
  ],
  deep: [
    { q: "Make it thread-safe.", a: "Simplest correct answer: synchronise every public method, and say plainly that this serialises all access and is the bottleneck. Better: shard the cache into N segments by hash of the key, each with its own lock — which is what ConcurrentHashMap does. Note that even a get mutates the list, so a plain read-write lock does not help you here; that observation scores." },
    { q: "Now make it LFU instead.", a: "Frequency-based eviction. Keep a map from key to node, a map from frequency to a doubly linked list of nodes with that frequency, and a running minimum frequency. On access, move the node from its frequency list to the next one up. Still O(1)." },
    { q: "Add a TTL to each entry.", a: "Store an expiry timestamp on the node. Lazy expiry: check on read and treat expired as a miss. Active expiry: a background sweeper, or a min-heap ordered by expiry. Lazy is simpler and usually enough; say the trade-off — lazy leaks memory for keys nobody reads again." },
    { q: "This is now a distributed cache across 10 nodes. What changes?", a: "Consistent hashing to pick the node for a key, so adding an eleventh node moves roughly 1/11 of keys rather than everything. Eviction becomes per-node. You lose global LRU — say so rather than pretending otherwise." },
    { q: "What if a single key is enormously hot?", a: "Hot-key problem. Replicate that key across several nodes, or add a small local in-process cache in front of the distributed one." }
  ],
  drills: [
    { opener: "Design a cache with get and set in O(1).",
      chain: [
        { q: "Why doubly linked and not singly?", why: "Because to remove a node in O(1) you need its predecessor. With a singly linked list, removal is O(n). Simple question, and people who memorised the solution without understanding it stumble." },
        { q: "Walk me through what happens when you evict.", why: "The bug hunt. They want to hear that you remove the tail node AND delete the key from the map. Omitting the second is the single most common mistake in this problem." },
        { q: "What is your capacity policy — count or bytes?", why: "A real design question hiding in an algorithm problem. Counting entries is easy but a cache of images and a cache of ints behave completely differently. Say which and why." },
        { q: "Two threads call get on the same key simultaneously. Is that safe?", why: "No — get mutates the list. Candidates often assume reads are safe because get sounds like a read." }
      ],
      crack: "Where candidates crack: the fourth question. They classify get as a read operation and confidently say a read lock is enough, which is wrong in an LRU because every read reorders the list." }
  ]
},

/* -------------------------------------------------- 3 */
{
  id: "sd-parking", name: "Design a scalable and concurrent parking garage", kind: "LLD", level: "SDE-2",
  corpus: true,
  why: "Asked verbatim in the corpus at SDE-2 Bangalore and given roughly 40 minutes. The interviewer's emphasis was on concurrency, not on the class diagram — the words in the question are 'scalable and concurrent'.",
  req: {
    fn: ["Park a vehicle and issue a ticket", "Find an available spot for a given vehicle type", "Unpark: compute the fee and free the spot", "Multiple floors, multiple spot sizes, multiple entry and exit gates"],
    nfn: ["Many gates operate concurrently — no double-allocation of a spot", "Finding a spot should not be a linear scan of the whole garage", "Pricing must be changeable without rewriting the core"]
  },
  approach: [
    { t: "Entities", d: "ParkingLot, Floor, ParkingSpot, Vehicle (with a type enum rather than a subclass per type unless behaviour differs), Ticket, Gate, PricingStrategy, DisplayBoard. Resist creating a class per noun — VehicleType as an enum is usually right and saying so shows judgement." },
    { t: "Spot allocation without scanning", d: "The naive design scans all spots for a free one, which is O(total spots) and is also the thing that will contend under concurrency. Instead keep, per floor and per spot size, a queue or set of free spots. Allocation is then a poll from the right collection — O(1) — and release is an add." },
    { t: "Concurrency, which is the actual question", d: "The shared mutable state is exactly the free-spot collections. Options, worst to best: one global lock on the whole lot (correct, but serialises every gate in the building); one lock per floor per spot-type collection (good — contention only between gates competing for the same category on the same floor); or a lock-free ConcurrentLinkedQueue per category where poll() is atomic, which removes the lock entirely for the common path. Present the progression rather than jumping to the answer — the progression is what is being scored." },
    { t: "The unpark race", d: "Two exit gates should not be able to process the same ticket twice. Make ticket state a compare-and-set from ACTIVE to PAID; the loser sees the state has already changed and reports an error rather than freeing the spot twice." },
    { t: "Patterns worth naming", d: "Strategy for pricing (hourly, flat, weekend, EV surcharge) so a new rule is a new class. Factory for creating spots and vehicles from types. Observer for the display boards, which then update without the allocation code knowing they exist. Singleton for the lot itself, with the caveats stated." },
    { t: "Extension, which is always the follow-up", d: "Adding electric-vehicle spots with charging: a new SpotType and a new pricing strategy, no change to allocation. Adding reservations: a hold with a TTL, which is the same mechanism as the seat hold in the booking design below." }
  ],
  code: [
    "enum SpotType { MOTORCYCLE, COMPACT, LARGE, EV }",
    "",
    "class Floor {",
    "    int number;",
    "    Map<SpotType, ConcurrentLinkedQueue<ParkingSpot>> free;  // O(1) allocate, lock-free",
    "    Map<String, ParkingSpot> occupied;                        // spotId -> spot",
    "",
    "    Optional<ParkingSpot> allocate(SpotType t) {              // poll() is atomic",
    "        return Optional.ofNullable(free.get(t).poll());",
    "    }",
    "}",
    "",
    "interface PricingStrategy { Money price(Ticket t, Instant exit); }",
    "",
    "class ParkingLot {",
    "    List<Floor> floors;",
    "    PricingStrategy pricing;",
    "    Ticket park(Vehicle v) throws NoSpotAvailable;   // try each floor, first fit",
    "    Money unpark(TicketId id);                       // CAS ticket ACTIVE -> PAID, then release",
    "}"
  ],
  deep: [
    { q: "Two cars arrive at two gates at the same instant and one spot is left. What happens?", a: "Both call poll() on the same ConcurrentLinkedQueue. It is atomic, so exactly one gets the spot and the other gets null and moves to the next floor or is told the lot is full. If you used a lock instead, one blocks briefly and then sees an empty collection. Either is correct — what is wrong is a check-then-act on a plain collection, which double-allocates." },
    { q: "Now make it work across multiple garages with a shared service.", a: "This is where it stops being LLD. The free-spot state moves out of process — Redis with an atomic pop from a list per category, or a database row per spot with a conditional UPDATE ... WHERE status = 'FREE'. In-process locks are meaningless across machines; say that explicitly." },
    { q: "A gate crashes after allocating a spot but before printing the ticket.", a: "You have leaked a spot. Fix with a reconciliation job, or make allocation and ticket creation a single transaction, or give the allocation a TTL so an unclaimed spot returns to the pool. Volunteering this failure mode is a strong signal." },
    { q: "How do you find the nearest free spot to the entrance rather than any free spot?", a: "Replace the queue with a priority queue ordered by distance from that gate, one per gate or per zone. Note the cost: poll becomes O(log n) and you now maintain more structures." },
    { q: "The display board must show live counts per floor.", a: "An AtomicInteger per floor per type, incremented and decremented on allocate and release — cheap and correct. Push updates via the Observer registered on the floor. Do not recount by scanning." }
  ],
  drills: [
    { opener: "Design a scalable and concurrent parking garage system.",
      chain: [
        { q: "Where exactly is your shared mutable state?", why: "The question that separates people who understand concurrency from people who add the word synchronized. There is one answer: the collection of free spots, plus ticket status." },
        { q: "You said you would synchronise. Synchronise on what, exactly?", why: "Probing granularity. 'The ParkingLot object' means every gate in the building queues behind one lock. They want per-floor-per-type, or an atomic collection." },
        { q: "What is the throughput cost of your choice?", why: "Quantify it. One global lock means one car per critical section, garage-wide. Per-category locks mean contention only between gates wanting the same size on the same floor." },
        { q: "Can two threads deadlock in your design?", why: "Only if you take more than one lock. If you do — say, a floor lock and a ticket lock — the answer is a consistent global acquisition order. If you take only one, say that, because it is the reason there is no deadlock." },
        { q: "Now add EV charging spots and a different rate for them.", why: "The extensibility probe, always asked. A good design absorbs this as a new enum value and a new PricingStrategy. If your answer requires editing the allocation logic, your design failed Open/Closed." },
        { q: "Scale it to 100 garages behind one API.", why: "Testing whether you know the boundary of your own design. In-process locks do not survive it. Move to Redis or a conditional database update." }
      ],
      crack: "Where candidates crack: question two. They say 'I would make it thread-safe' and then cannot name the specific object they would lock or the specific interleaving that goes wrong without it." }
  ]
},

/* -------------------------------------------------- 4 */
{
  id: "sd-booking", name: "Design a ticket booking system (BookMyShow / concert seats)", kind: "LLD + HLD", level: "SDE-2",
  corpus: true,
  why: "Appears twice in the corpus: a 'design a BookMyShow-like service' LLD round and a 'concert booking with concurrency' onsite round. The entire question is one problem — two people must never get the same seat — and every follow-up circles back to it.",
  req: {
    fn: ["Browse events and see seat availability", "Hold selected seats while the user pays", "Confirm booking on payment success, release on failure or timeout", "Cancel a booking"],
    nfn: ["No double-booking, ever — this is a correctness requirement, not a performance one", "Handle a spike when a popular event opens (this is the interesting case)", "Availability view can be slightly stale; the booking itself cannot"]
  },
  approach: [
    { t: "State the core tension immediately", d: "Reads are enormous and can be stale. The write is small and must be strictly correct. Saying this in the first two minutes frames the whole design and is the single best opening move on this question." },
    { t: "Seat lifecycle", d: "AVAILABLE to HELD (with an expiry) to BOOKED, plus a path back from HELD to AVAILABLE on timeout or failure. Model it as an explicit state machine — this is the State pattern and it stops illegal transitions being an if-statement problem." },
    { t: "The hold, and why a lock is wrong", d: "The user selects seats, then spends two minutes entering card details. You cannot hold a database lock across that — it would block, it would not survive a client disconnect, and it does not span servers. Instead write a HOLD RECORD with an expiry timestamp: a row with status HELD and held_until, or a Redis key with a TTL. An abandoned checkout expires itself." },
    { t: "The atomic acquire", d: "Taking the hold must be atomic. In SQL: UPDATE seats SET status='HELD', held_until=now()+2min, hold_id=? WHERE seat_id IN (...) AND (status='AVAILABLE' OR (status='HELD' AND held_until < now())). Then check the affected row count equals the number of seats requested; if not, roll back and tell the user. The condition on held_until is what reclaims expired holds without a sweeper. This one statement is the answer to the whole question — be able to write it." },
    { t: "Confirm and release", d: "On payment success, UPDATE ... SET status='BOOKED' WHERE hold_id = ? AND status='HELD'. On failure or timeout, set back to AVAILABLE. A background job also reclaims stale holds as a safety net, because you should not depend on the client coming back." },
    { t: "The read path", d: "Availability views are cached and may be a few seconds stale — that is acceptable and you should say so explicitly. The user finds out for certain only when the hold succeeds or fails. Trying to make the browse view perfectly accurate is the wrong instinct and costs you." },
    { t: "The spike", d: "When a popular concert opens, everyone hits one event's seats at the same instant. This is a hot partition. Mitigations: a virtual waiting room that admits users in batches, a queue in front of the booking service, per-user rate limiting, and pre-warmed caches for the seat map. Naming the hot-partition problem by name is a strong signal at Amazon." }
  ],
  code: [
    "-- the atomic hold: correctness lives in this one statement",
    "UPDATE seats",
    "   SET status = 'HELD', hold_id = :holdId, held_until = now() + interval '2 minutes'",
    " WHERE show_id = :showId",
    "   AND seat_id = ANY(:seatIds)",
    "   AND (status = 'AVAILABLE'",
    "        OR (status = 'HELD' AND held_until < now()));   -- reclaim expired holds",
    "",
    "-- then, in the same transaction:",
    "--   if rowsAffected != seatIds.length  ->  ROLLBACK, return SEATS_UNAVAILABLE",
    "--   else                               ->  COMMIT, start payment against holdId"
  ],
  deep: [
    { q: "Optimistic or pessimistic locking here?", a: "The conditional UPDATE above is optimistic — no lock is held while the user thinks, and the conflict is detected by the row count. Pessimistic (SELECT FOR UPDATE) would work for the instant of acquisition but must never span the payment step. Best answer: optimistic for the hold, and note that under extreme contention on one show you would add a queue rather than let thousands of transactions collide." },
    { q: "The payment provider times out and you never learn the outcome.", a: "The hold expires and the seat is released, but the charge may have gone through. You need an idempotency key on the payment request, a reconciliation job against the provider, and a compensating refund. This is the saga pattern — naming it is worth doing." },
    { q: "The user clicks Book twice.", a: "Idempotency key on the booking request. The second call with the same key returns the first result instead of creating a second booking. Say this unprompted whenever retries are mentioned; it is one of the concepts Amazon cares most about." },
    { q: "How do you show live seat availability to thousands of viewers?", a: "Do not query the database per viewer. Cache the seat map with a short TTL, and push deltas over WebSockets or SSE. Accept staleness on the display; correctness is enforced only at hold time." },
    { q: "Now it is 100 million users and you must shard.", a: "Shard by show_id. All the seats for one show live on one shard, so the atomic update stays a single-shard transaction — which is the whole reason for that shard key. The trade is that one hugely popular show is a hot shard; mitigate with a queue in front, not by splitting the show." },
    { q: "Someone books, then the service crashes before responding.", a: "The booking is committed; the client does not know. On retry with the same idempotency key they get the existing booking. Without the key, they book twice — which is why the key is not optional." }
  ],
  drills: [
    { opener: "Design a concert ticket booking system. Focus on concurrency.",
      chain: [
        { q: "Two users click the same seat at the same millisecond. Walk me through it line by line.", why: "The centre of the question. They want the actual mechanism: one conditional UPDATE, one wins on row count, the other gets zero rows and an error. Vague answers about 'using a transaction' do not survive here." },
        { q: "Why not just lock the row while the user pays?", why: "Because payment takes minutes, locks do not survive a disconnect, and you would block every other reader of that row. Expect this and answer it before it is asked." },
        { q: "What happens if the user closes the tab after holding?", why: "The TTL. If your answer relies on the client calling a release endpoint, it is wrong — clients disappear." },
        { q: "Your Redis holding the holds restarts and loses everything.", why: "Deliberately nasty. If holds live only in Redis, every held seat becomes available and you may double-book against an in-flight payment. Correct answer: the database is the source of truth for seat state; Redis is an accelerator. If you put holds only in Redis, you must accept and state that risk." },
        { q: "How stale can the availability page be?", why: "Testing whether you separate the read path from the write path. Seconds is fine, and saying so confidently is the right answer." },
        { q: "One show has 50,000 people trying to buy in the first second.", why: "Hot partition. Waiting room, queue, rate limit. Sharding harder does not help because the contention is on one show." }
      ],
      crack: "Where candidates crack: question one. They know 'use a transaction' but cannot state the actual SQL condition or how they detect that they lost the race. Memorise the conditional UPDATE and the row-count check." }
  ]
},

/* -------------------------------------------------- 5 */
{
  id: "sd-ratelimit", name: "Design a rate limiter", kind: "HLD", level: "SDE-2",
  corpus: false,
  why: "Not in the corpus, but it is one of the three or four questions most likely to come up as a warm-up, it is small enough to finish in 30 minutes, and it exercises algorithms, distributed state and failure modes in one problem.",
  req: {
    fn: ["Allow N requests per client per time window", "Reject over-limit requests with 429 and a Retry-After header", "Configurable limits per API and per client tier"],
    nfn: ["Low latency — it sits in front of every request, so it must add well under a millisecond", "Works across many application servers", "Fails open or closed, deliberately chosen"]
  },
  approach: [
    { t: "Where it lives", d: "At the API gateway or a middleware in each service. Gateway is the usual answer: one place, applies to everything, keeps the limiter out of your business logic. Per-service is right when limits are service-specific." },
    { t: "Fixed window counter", d: "A counter per client per window. Simple and cheap. The flaw is the boundary: with a limit of 100 per minute, a client can send 100 at 11:59:59 and 100 more at 12:00:01 — 200 in two seconds. Name this flaw; it is the reason the other algorithms exist." },
    { t: "Sliding window log", d: "Store a timestamp per request in a sorted set, drop entries older than the window, count what is left. Exactly correct, but memory is proportional to the number of requests, which is expensive at scale." },
    { t: "Sliding window counter", d: "Weighted combination of the current and previous fixed windows. Approximately correct, fixed small memory. This is the practical compromise and the one to recommend." },
    { t: "Token bucket", d: "Tokens refill at a fixed rate up to a capacity; each request takes one. Allows bursts up to the bucket size, which is usually what you actually want for real traffic. Two numbers per client (token count and last refill time), so it is cheap." },
    { t: "Leaky bucket", d: "Requests queue and drain at a constant rate. Smooths output rather than input. Use it when the thing downstream needs a steady rate." },
    { t: "Making it distributed", d: "Counters must be shared, so put them in Redis. The increment and the check must be atomic — INCR with EXPIRE, or a small Lua script so the read-modify-write cannot interleave. Doing it in application memory means N servers each allow the full limit." }
  ],
  code: [
    "-- token bucket in Redis, atomic via Lua (pseudocode)",
    "key   = 'rl:{clientId}:{route}'",
    "state = HGETALL key                    -- { tokens, lastRefillMs }",
    "now   = current time in ms",
    "",
    "refill = (now - state.lastRefillMs) * refillRatePerMs",
    "tokens = min(capacity, state.tokens + refill)",
    "",
    "if tokens >= 1 then",
    "    HSET key tokens (tokens - 1) lastRefillMs now",
    "    PEXPIRE key ttlMs",
    "    return ALLOW",
    "else",
    "    return DENY, retryAfter = (1 - tokens) / refillRatePerMs",
    "end"
  ],
  deep: [
    { q: "Redis goes down. What does your limiter do?", a: "A deliberate choice you must state. FAIL OPEN (allow everything) keeps the product working but removes your protection exactly when you may be under attack. FAIL CLOSED (reject everything) protects the backend but takes you down. Most systems fail open for rate limiting and closed for authorisation. Having an opinion and a reason is what is being scored." },
    { q: "The Redis round trip adds latency to every request.", a: "Two-tier: a small local in-process counter that allows an approximate share of the limit without a network call, synced to Redis periodically. You trade exactness for latency. Say the trade." },
    { q: "How do you rate limit by user when the request is unauthenticated?", a: "By IP, with the caveat that IPs are shared behind NAT and mobile carriers, so you will penalise innocent users. Layer it: strict per-IP for unauthenticated endpoints, per-user once authenticated." },
    { q: "A single client is sending 100x the limit. Is your limiter now the bottleneck?", a: "Possibly — you are still paying to reject. Push the rejection as far to the edge as possible (CDN or WAF), and consider temporarily blocklisting an abusive client rather than evaluating every request." },
    { q: "Different limits for free and paid tiers.", a: "Configuration keyed by client tier, loaded and cached at the gateway. The algorithm does not change, only the parameters — which is a sign of a good design." }
  ],
  drills: [
    { opener: "Design a rate limiter for an API.",
      chain: [
        { q: "Which algorithm, and why that one?", why: "They want a comparison, not a pick. Name fixed window's boundary flaw as the reason you moved past it." },
        { q: "Where does the counter live?", why: "If the answer is in-memory on the app server, follow with: you have ten servers, so a client gets ten times the limit. Distributed state is the point of the question." },
        { q: "Is your check-and-increment atomic?", why: "The race condition probe. Two requests read the same count and both allow. Answer: Redis INCR is atomic, or wrap the read-modify-write in a Lua script." },
        { q: "What do you return to the client?", why: "429 Too Many Requests with Retry-After, plus X-RateLimit-Remaining headers. Concrete detail that costs nothing and signals real experience." },
        { q: "Redis is down.", why: "Fail open or fail closed. There is no correct answer, only a stated one with a reason." }
      ],
      crack: "Where candidates crack: question two. They design a beautiful token bucket and keep it in a HashMap on one server." }
  ]
},

/* -------------------------------------------------- 6 */
{
  id: "sd-url", name: "Design a URL shortener", kind: "HLD", level: "SDE-2",
  corpus: false,
  why: "The canonical warm-up. Small enough to complete properly in 35 minutes, and it covers ID generation, key-value storage, caching and the read/write asymmetry. If you can only rehearse one HLD, rehearse this one.",
  req: {
    fn: ["Given a long URL, return a short one", "Given a short URL, redirect to the long one", "Optional: custom aliases, expiry, click analytics"],
    nfn: ["Redirects must be fast — this is the whole product", "Heavily read-skewed", "Short codes must not be guessable if privacy matters", "Highly available; a broken redirect breaks every link ever shared"]
  },
  approach: [
    { t: "Estimate first", d: "See the worked estimate in the Numbers section: about 40 writes/sec, 4,000 reads/sec, a few TB over five years. State the conclusion — this is a caching and key-value problem, not a sharding-for-throughput problem." },
    { t: "How long is the code", d: "Base62 (a-z, A-Z, 0-9). 62^7 is about 3.5 trillion, which is far more than you need. Seven characters is the standard answer; show the arithmetic rather than just asserting it." },
    { t: "Generating the code — three options", d: "(1) Hash the URL (MD5 or SHA) and take the first 7 characters of the base62 encoding. Simple, deduplicates identical URLs for free, but collisions must be detected and resolved. (2) An auto-incrementing counter encoded to base62. No collisions, but the codes are sequential and therefore enumerable — a privacy problem. (3) A pre-generated key table: a separate service produces random unused codes in advance and hands them out. No collisions, not guessable, at the cost of another component. Present all three and pick with a reason." },
    { t: "Distributed counter", d: "If you choose the counter, a single counter is a bottleneck and a single point of failure. Fix by giving each application server a RANGE of ids to hand out (a ticket server or Zookeeper allocating blocks of a million), so the coordination happens once per million rather than once per request." },
    { t: "Storage", d: "Key-value by short code — that is the only access pattern on the read path. DynamoDB with the short code as the partition key, or any KV store. A relational database is also completely fine at this scale; say that rather than reaching for NoSQL reflexively." },
    { t: "The read path", d: "Cache aggressively. Link popularity is extremely skewed, so a small cache serves most traffic. On a hit, redirect; on a miss, read the store, populate, redirect. Use 301 for permanent (browser caches it, so you never see the second click — and therefore lose analytics) or 302 for temporary (every click reaches you, which you want if you are counting clicks). This 301-vs-302 trade-off is asked almost every time." },
    { t: "Analytics", d: "Do not write a counter synchronously on the redirect path — it would double your latency and create write contention on hot links. Publish a click event to a queue and aggregate asynchronously." }
  ],
  code: [
    "POST /api/v1/urls        { longUrl, customAlias?, expiresAt? }  ->  { shortUrl }",
    "GET  /{shortCode}        ->  301 or 302 with Location: <longUrl>",
    "GET  /api/v1/urls/{code}/stats  ->  { clicks, createdAt, ... }",
    "",
    "urls table / item:",
    "    short_code   (partition key, 7 chars base62)",
    "    long_url     (text)",
    "    user_id      (nullable)",
    "    created_at   (timestamp)",
    "    expires_at   (nullable, TTL)"
  ],
  deep: [
    { q: "Two users shorten the same long URL. One code or two?", a: "A product decision, not a technical one — ask. One code deduplicates and saves storage but breaks per-user analytics and expiry. Two codes are simpler and usually correct. Recognising it as a requirements question rather than guessing is the right move." },
    { q: "How do you handle a hash collision?", a: "Check for existence before writing; on collision, append a salt and rehash, or take the next 7 characters. Do it inside a conditional write so two concurrent creators cannot both claim the code — a conditional put on 'attribute does not exist' in DynamoDB, or a unique constraint in SQL." },
    { q: "How do you expire links?", a: "A TTL attribute — DynamoDB deletes expired items for you, or a background sweeper in SQL. Check expiry on read as well, because deletion is not instant." },
    { q: "One link goes viral: 100,000 requests per second on one code.", a: "It is a single cache key, so it is served from memory and probably fine. If the cache node is hot, replicate the key across nodes or add a local in-process cache in front. The CDN can also cache the redirect itself." },
    { q: "Prevent people shortening malicious URLs.", a: "Check against a safe-browsing list at creation time and asynchronously re-check afterwards, since a URL can turn malicious later. Rate limit creation per user." }
  ],
  drills: [
    { opener: "Design a URL shortener.",
      chain: [
        { q: "How long is your short code and why?", why: "They want the base62 arithmetic, not a memorised '7'." },
        { q: "How do you generate it?", why: "Compare hash, counter and pre-generated key table. Picking one without naming the others reads as a memorised answer." },
        { q: "Your counter is a single row in one database. What is wrong with that?", why: "Bottleneck and single point of failure. Answer: hand out ranges so coordination is rare." },
        { q: "301 or 302?", why: "Asked nearly every time. 301 is cached by the browser so it is faster and cheaper but you lose click analytics. 302 gives you every click. Pick based on whether analytics is a requirement." },
        { q: "Where is your bottleneck at 10x?", why: "Reads, and they are cache-served. The honest answer is that this system scales very easily and the interesting limit is storage growth, not throughput." }
      ],
      crack: "Where candidates crack: question three. They design a clean base62 counter and never notice they have put a global serialisation point on the write path." }
  ]
},

/* -------------------------------------------------- 7 */
{
  id: "sd-youtube", name: "Design YouTube (upload, view, like, comment)", kind: "HLD", level: "SDE-2",
  corpus: true,
  why: "Asked in the corpus as an SDE-2 onsite question — 'design YouTube with video uploads, likes and comments'. Large surface area, so the skill being tested is scoping: pick two or three parts and go deep rather than sketching everything.",
  req: {
    fn: ["Upload a video", "Watch a video, streamed and seekable", "Like and comment", "A basic feed or search"],
    nfn: ["Extremely read-heavy", "Video is large — storage and bandwidth dominate the cost", "Upload can be slow and asynchronous; playback cannot", "Global audience"]
  },
  approach: [
    { t: "Scope it out loud in the first two minutes", d: "Say: I will focus on the upload and playback path, then likes and comments, and I will treat recommendations and search as out of scope unless you want them. An interviewer will almost always agree, and now you have a design you can finish." },
    { t: "The blob/metadata split", d: "Video files go to object storage. Metadata — title, uploader, duration, thumbnail URL, status — goes to a database. Never store video bytes in your database. State this early; it is the foundational decision." },
    { t: "Upload path", d: "Client requests a pre-signed upload URL and uploads directly to object storage, so the bytes never traverse your application servers. Use chunked or resumable upload for large files. On completion, a notification lands on a queue and the video is marked PROCESSING." },
    { t: "Transcoding", d: "A worker fleet consumes the queue and transcodes to multiple resolutions and bitrates, segmenting into small chunks for adaptive streaming (HLS or DASH). This is embarrassingly parallel — split the video and transcode segments concurrently. Only when it finishes does the video become PUBLISHED and visible. Saying 'the user's upload is accepted immediately and processed asynchronously' is the key insight." },
    { t: "Playback path", d: "The player fetches a manifest listing the available renditions and segment URLs, then pulls segments from the CDN, switching bitrate based on measured bandwidth. Essentially all playback bytes come from the CDN — your servers serve only the manifest and the metadata. This is the reason the system is affordable at all." },
    { t: "Likes and comments", d: "Comments are a straightforward write plus a paginated read keyed by video id, with cursor pagination rather than OFFSET. Likes are a counter, and counters on hot videos are a write-contention problem: do not do UPDATE videos SET likes = likes + 1. Instead write a like event, aggregate asynchronously, and serve an approximate count from cache. Say that an exact live count is not a requirement — nobody needs to know it is 1,000,001 rather than 1,000,000." },
    { t: "Views", d: "Same treatment as likes, plus deduplication so a refresh does not count twice. This is a streaming aggregation problem, not a database increment." }
  ],
  code: [
    "POST /api/v1/videos                  -> { videoId, uploadUrl }   (pre-signed)",
    "POST /api/v1/videos/{id}/complete    -> 202 Accepted, status=PROCESSING",
    "GET  /api/v1/videos/{id}             -> metadata + manifestUrl",
    "GET  /api/v1/videos/{id}/comments?cursor=  -> page of comments",
    "POST /api/v1/videos/{id}/likes       -> 202 Accepted (async aggregation)",
    "",
    "videos:   video_id(PK), user_id, title, status, duration, thumb_url, manifest_url, created_at",
    "comments: video_id(PK), created_at+comment_id(SK), user_id, text   -- SK gives ordered pagination",
    "likes:    video_id + user_id (PK)  -- membership, so a user cannot like twice",
    "counters: video_id(PK), like_count, view_count   -- updated by the aggregation job"
  ],
  deep: [
    { q: "Why not increment the like counter directly?", a: "A video with a million viewers produces enormous write contention on one row, and every writer serialises behind the same lock. Write an append-only like record instead, aggregate in batches, cache the result. Approximate and fast beats exact and slow for a display counter." },
    { q: "How does the video start playing in under a second?", a: "Adaptive bitrate — start with the lowest rendition, which downloads almost instantly, then step up as measured bandwidth allows. Segments are small (2-10 seconds) so switching is cheap. Serve the first segments from the CDN edge." },
    { q: "A creator uploads a 4-hour 4K video. What happens?", a: "Resumable chunked upload so a dropped connection does not restart it. Transcoding splits the video into segments processed in parallel across the worker fleet, so wall-clock time stays bounded. The video is unavailable until processing completes, and the user is shown that state." },
    { q: "How do you paginate comments on a video with a million of them?", a: "Cursor pagination on (created_at, comment_id), never OFFSET — OFFSET is O(offset) and gets slower the deeper you go. Cache the first page, which is what almost everyone reads." },
    { q: "A video goes viral in one region.", a: "The CDN handles it — that is what it is for. Your metadata service sees more traffic, which the cache absorbs. Say what you would actually monitor to find out." }
  ],
  drills: [
    { opener: "Design YouTube.",
      chain: [
        { q: "What are you going to focus on?", why: "The first thing they want to hear. A candidate who tries to design all of YouTube in 40 minutes produces nothing gradeable." },
        { q: "Where do the video bytes live and who serves them?", why: "Object storage and a CDN. If the answer involves your application servers streaming video, the design is not viable." },
        { q: "Walk me through the upload from the client's perspective.", why: "Pre-signed URL, direct upload, queue, transcode, publish. The insight they are checking is that upload is asynchronous." },
        { q: "The like button on a video with 10 million views. What is your write path?", why: "The contention probe. 'UPDATE ... SET likes = likes + 1' is the wrong answer and they are waiting for it." },
        { q: "How do you know it is working?", why: "Metrics. Playback start time, rebuffer ratio, transcode queue depth, p99 metadata latency. Naming what you would monitor is a strong finish." }
      ],
      crack: "Where candidates crack: question one. They start designing immediately and are still describing the database schema when the round ends." }
  ]
},

/* -------------------------------------------------- 8 */
{
  id: "sd-notify", name: "Design a notification system", kind: "HLD", level: "SDE-2",
  corpus: false,
  why: "On the standard SDE-2 India list alongside URL shortener and rate limiter. It is the cleanest question for demonstrating queues, fan-out, retries, idempotency and third-party failure — all things Amazon cares about.",
  req: {
    fn: ["Send a notification over push, SMS, email or in-app", "Support user preferences and opt-outs", "Templates with variable substitution", "Retry on transient failure"],
    nfn: ["Do not send duplicates", "Do not block the caller", "Absorb large fan-out bursts", "Survive a third-party provider being down"]
  },
  approach: [
    { t: "Shape", d: "A service accepts a request and returns 202 Accepted immediately, having done nothing but validate and enqueue. Everything real happens on the consumer side. Say this first — the entire design is 'get it off the request path'." },
    { t: "Pipeline", d: "API to a queue, then a worker that resolves the recipient, checks preferences and opt-outs, renders the template, and dispatches to the right channel adapter. One queue per channel so a slow SMS provider cannot starve push notifications." },
    { t: "Channel adapters", d: "One adapter per provider behind a common interface — this is the Adapter pattern and it lets you swap or add a provider without touching the pipeline. Each has its own rate limits and failure behaviour." },
    { t: "Deduplication", d: "The queue is at-least-once, so the same message will occasionally be delivered twice. Each notification carries an idempotency key; the worker checks a 'sent' store (Redis with a TTL) before dispatching, and records after. Without this, users get duplicate texts, which is the most visible failure this system can have." },
    { t: "Retries", d: "Exponential backoff with jitter, a bounded retry count, then a dead letter queue. Distinguish retryable failures (provider 5xx, timeout) from permanent ones (invalid number, unsubscribed) — retrying a permanent failure forever is a common design bug." },
    { t: "Fan-out", d: "A broadcast to 10 million users must not be one enormous message. Expand it into batches asynchronously and enqueue chunks, so the work is parallel and restartable. Rate limit the expansion so it does not swamp the queue and delay time-critical notifications." },
    { t: "Priority", d: "A one-time password cannot queue behind a marketing campaign. Separate queues by priority, with dedicated workers for the high-priority one." }
  ],
  code: [
    "POST /api/v1/notifications",
    "{ userId, channel: PUSH|SMS|EMAIL|IN_APP, templateId, params, priority, idempotencyKey }",
    "  -> 202 Accepted { notificationId }",
    "",
    "worker loop:",
    "  msg = queue.poll()",
    "  if seen(msg.idempotencyKey) -> ack and skip           # at-least-once protection",
    "  if !prefs.allows(userId, channel, templateId) -> ack and drop",
    "  body = template.render(msg.templateId, msg.params)",
    "  try     adapter(channel).send(body)  ; markSeen(key) ; ack",
    "  catch   retryable ? requeue with backoff+jitter : deadLetter"
  ],
  deep: [
    { q: "The SMS provider is down for an hour.", a: "The circuit breaker opens so you stop hammering it, messages accumulate in the queue (which is what a queue is for), and you either wait or fail over to a secondary provider. For time-sensitive messages, fall back to another channel. Volunteer that a queue backing up is the designed behaviour, not a failure." },
    { q: "How do you guarantee exactly-once delivery?", a: "You do not. The honest and correct answer is at-least-once delivery plus idempotent consumption, which is indistinguishable from exactly-once from the user's point of view. Claiming true exactly-once is a red flag." },
    { q: "How do you handle user preferences at scale?", a: "Cache them — they change rarely and are read on every notification. Invalidate on update. Check unsubscribe as late as possible, right before dispatch, so a user who opts out during a slow fan-out is still respected." },
    { q: "The same event triggers a notification from two services.", a: "Deduplicate on a business key (user + event type + entity id) within a time window, not just on the message id. This is a real production problem and knowing the distinction is a good signal." },
    { q: "How would you know deliveries are failing?", a: "Delivery rate per channel and per provider, queue depth and age of the oldest message, dead letter queue size, and provider error rates. Alert on queue age rather than depth, because depth is meaningless without throughput." }
  ],
  drills: [
    { opener: "Design a notification system.",
      chain: [
        { q: "What does the API return, and when?", why: "202 immediately. If your API waits for the provider, one slow SMS gateway takes down your whole service." },
        { q: "The queue delivers a message twice. What does the user see?", why: "Nothing, if you have idempotent consumption. This is the question the whole design hangs on." },
        { q: "One queue or many?", why: "Many — per channel and per priority. A single queue means a marketing blast delays an OTP." },
        { q: "You need to notify 10 million users about one event.", why: "Fan-out expansion in batches, asynchronously, rate limited. A single message with 10 million recipients is not restartable." },
        { q: "What is in your dead letter queue and who looks at it?", why: "An operations question. Having an answer signals you have run something in production, or at least thought about it." }
      ],
      crack: "Where candidates crack: question two. They design the pipeline well and never address duplicates, which is the most user-visible bug this system can have." }
  ]
},

/* -------------------------------------------------- 9 */
{
  id: "sd-autocomplete", name: "Design search autocomplete / typeahead", kind: "HLD", level: "SDE-2",
  corpus: false,
  why: "Very Amazon-flavoured — it is the product search box. It also connects directly to the Trie topic on the DSA sheet, so preparing one reinforces the other.",
  req: {
    fn: ["Return the top k suggestions for a prefix", "Ranked by popularity", "Suggestions update as the query log changes"],
    nfn: ["Under 100ms, ideally under 50ms — it fires on every keystroke", "Enormous read volume, small write volume", "Slightly stale suggestions are completely acceptable"]
  },
  approach: [
    { t: "The read/write asymmetry is everything", d: "Every keystroke from every user is a read. Suggestion data changes maybe hourly. So you should precompute aggressively and accept staleness — say this early and the rest of the design follows from it." },
    { t: "The structure", d: "A trie over query prefixes. The critical optimisation: store the top k completions AT EACH NODE, precomputed. Then a lookup is walk-to-node (O(prefix length)) and return the stored list — you never traverse the subtree at query time. Without this, a one-character prefix means walking millions of nodes." },
    { t: "Building it", d: "Offline, from query logs. Aggregate query frequencies over a rolling window, build the trie with top-k lists, serialise it, and ship it to the serving fleet. Rebuild hourly or daily. The serving path is then read-only, which makes it trivially scalable." },
    { t: "Serving", d: "Load the trie into memory on every serving node — it is small enough. Replicate rather than shard if it fits; shard by first one or two characters if it does not. Put a cache in front for the hottest prefixes, and let the CDN cache very short prefixes since they are identical for everyone." },
    { t: "Client side", d: "Debounce keystrokes (fire after ~50ms of no typing rather than on every character), cache results in the browser, and cancel in-flight requests when the query changes. A meaningful share of the load reduction happens on the client, and mentioning it shows product sense." }
  ],
  code: [
    "class TrieNode {",
    "    Map<Character, TrieNode> children;",
    "    List<Suggestion> topK;      // PRECOMPUTED at build time - this is the whole trick",
    "}",
    "",
    "GET /api/v1/suggest?q=lapt&limit=10",
    "  -> walk trie for 'lapt'  (O(4))",
    "  -> return node.topK      (O(1))",
    "",
    "offline pipeline:",
    "  query logs -> aggregate frequency over 7-day window",
    "             -> build trie, compute topK bottom-up",
    "             -> serialise, distribute to serving fleet"
  ],
  deep: [
    { q: "How do you compute topK at each node efficiently?", a: "Bottom-up during the build: a node's top k is a merge of its children's top k lists plus its own terminal entry. A k-way merge with a heap. Because it is offline you can afford it." },
    { q: "How fresh can suggestions be?", a: "Hourly is fine for most terms. For trending queries you want faster, so run a separate real-time layer over a short window (a streaming aggregation) and merge its results with the precomputed trie at query time. Say the two-layer design; it is the standard answer to 'batch is too slow'." },
    { q: "How do you handle typos?", a: "Edit distance is expensive at query time. Practical answers: index common misspellings from the query log (users correct themselves, and the log captures that), or use n-gram matching as a fallback layer. Do not propose running Levenshtein over the whole trie." },
    { q: "Personalised suggestions?", a: "Merge a small per-user recent-query list with the global suggestions at query time. Keep the global trie global — personalising the whole structure would destroy the precomputation that makes this fast." },
    { q: "How do you keep offensive or unsafe suggestions out?", a: "A blocklist applied at build time rather than query time, plus a minimum frequency threshold so rare junk never surfaces. Build time, because query time must stay O(prefix)." }
  ],
  drills: [
    { opener: "Design search autocomplete.",
      chain: [
        { q: "What happens when the user types a single character 'a'?", why: "The question that exposes whether you precomputed. If your answer traverses the subtree, you are walking millions of nodes on the most common query there is." },
        { q: "Where does the ranking data come from?", why: "Query logs, aggregated offline. If suggestions come from a product catalogue instead, that is a different and worse product — note the distinction." },
        { q: "How stale is your data and is that acceptable?", why: "Hourly, and yes. Confidently accepting staleness where it is harmless is a senior signal." },
        { q: "It does not fit in memory any more.", why: "Shard by prefix — first character or first two. Note that this keeps every query on exactly one shard, which is why it is the right shard key." },
        { q: "Your build pipeline fails and produces a corrupt trie.", why: "Versioned artefacts and the ability to roll back to the previous one, plus a validation step before distribution. Serving stale-but-correct beats serving broken." }
      ],
      crack: "Where candidates crack: question one. They describe a textbook trie and only realise mid-answer that a one-letter prefix means traversing essentially the entire structure." }
  ]
}
],

/* ============================================================ RED FLAGS */
redFlags: [
  { f: "Designing before clarifying", d: "Drawing boxes in minute one, without asking who uses this, what the scale is, or what is out of scope. It is the most common failure in the round and the easiest to avoid." },
  { f: "Not driving", d: "Waiting to be asked 'what next?'. You are expected to run the session. Announce each phase and move yourself along." },
  { f: "Components with no justification", d: "Adding Kafka, Redis and Elasticsearch to a diagram without naming the problem each one solves. Every box needs a sentence." },
  { f: "No trade-offs stated", d: "Every choice has a cost. A design presented as strictly good in all dimensions reads as one you have memorised rather than reasoned about." },
  { f: "Over-engineering", d: "Sharding a 400 GB dataset. Microservices for a system with 300 QPS. Declining to over-build, out loud and with the arithmetic to back it, scores higher than adding complexity." },
  { f: "Numbers with no basis", d: "'It will be about a million requests per second' with no derivation. State the assumption, then the arithmetic." },
  { f: "No data model", d: "Skipping straight from boxes to deep dives. The schema and the primary key are where design questions become concrete and checkable." },
  { f: "Ignoring failure", d: "Never saying what happens when a dependency is down, a node dies, or a message is delivered twice. Volunteer this in the last five minutes." },
  { f: "Claiming exactly-once delivery", d: "It does not exist in the way people mean. The correct answer is at-least-once plus idempotency." },
  { f: "Going silent", d: "Thinking quietly for thirty seconds reads as being stuck. Narrate the weighing, not just the conclusion." },
  { f: "Bluffing", d: "Design rounds probe until they find the edge of what you know — that is the point, and reaching it is normal. Saying 'I do not know, here is how I would find out' costs you nothing. Inventing an answer costs you Earn Trust." },
  { f: "Running out of time in the setup", d: "Spending 25 minutes on requirements and estimation leaves nothing for the deep dive, which is the part that is actually scored. Watch your own clock." }
],

/* ============================================================ RESOURCES */
resources: [
  { name: "System Design Interview, Volume 1 (Alex Xu)", url: "https://www.amazon.in/System-Design-Interview-insiders-Second/dp/B08CMF2CQF", note: "The standard starting point. The chapter structure maps almost exactly onto the designs on this page." },
  { name: "Designing Data-Intensive Applications (Kleppmann)", url: "https://dataintensive.net/", note: "The book that turns memorised answers into understanding. Chapters 3, 5, 6, 7 and 9 are the relevant ones." },
  { name: "Hello Interview — system design", url: "https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction", note: "Recommended by name in one of the SDE-2 experiences in the corpus. Strong on the framework and on how to run the 45 minutes." },
  { name: "Grokking the System Design Interview", url: "https://www.designgurus.io/course/grokking-the-system-design-interview", note: "Paid. Good breadth of worked designs if you want more than the nine here." },
  { name: "Low Level Design primer (GitHub)", url: "https://github.com/prasadgujar/low-level-design-primer", note: "Free. Class-diagram-level solutions to parking lot, BookMyShow, elevator and the rest of the standard LLD set." },
  { name: "Refactoring Guru — design patterns", url: "https://refactoring.guru/design-patterns", note: "The clearest explanation of the patterns, with the problem each one solves stated first." },
  { name: "AWS Architecture Center", url: "https://aws.amazon.com/architecture/", note: "Worth an hour before an Amazon interview — reference architectures in their own vocabulary." },
  { name: "System Design Primer (GitHub)", url: "https://github.com/donnemartin/system-design-primer", note: "Free and comprehensive. Use it as a reference to look things up, not as something to read end to end." }
]

};
