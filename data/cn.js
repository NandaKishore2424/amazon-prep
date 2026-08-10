/* ------------------------------------------------------------------
   Amazon Prep — Computer Networks syllabus, scratch → Amazon level
------------------------------------------------------------------- */

const SYLLABUS = {
  key: "cn",
  subject: "Computer Networks",
  tagline: "From what a layer is, to explaining why your API's p99 is 300ms.",
  intro: "Learn the layers top-down, not bottom-up. As a backend engineer you will be asked about HTTP, TCP and DNS constantly and about CSMA/CD approximately never — so modules 2, 3 and 4 carry most of the weight. Module 7 is where networking meets system design, which is where Amazon actually spends its time.",
  evidence: "Networking rarely gets a dedicated round at SDE-1, but it surfaces inside system design and project deep-dives. In the collected corpus, scenario-based rounds covered queue systems and service architecture; SDE-2 loops included designing YouTube and a concert-booking system with concurrency — both of which turn into questions about protocols, caching and load balancing if you go one level deeper.",

  modules: [
  {
    id: "cn-1", num: 1, title: "Foundations — layering and the vocabulary", level: "foundation",
    why: "One session. You need the layer names so that 'this is an L7 load balancer' or 'that's a transport-layer problem' means something.",
    topics: [
      { t: "Why layering exists", sub: [
        "Separation of concerns; each layer only talks to the one above and below",
        "You can swap Wi-Fi for Ethernet without changing HTTP — that is the whole point"
      ]},
      { t: "OSI model — 7 layers", sub: [
        "Physical, Data Link, Network, Transport, Session, Presentation, Application",
        "One sentence on what each does, and one protocol example each",
        "Mnemonic aside, what matters is knowing which layer a given problem lives at"
      ]},
      { t: "TCP/IP model — the one that is real", sub: [
        "Link, Internet, Transport, Application (4 layers) — how it maps onto OSI",
        "Why OSI is taught but TCP/IP is deployed"
      ]},
      { t: "Encapsulation", sub: [
        "Each layer wraps the payload above it with its own header",
        "PDU names: data → segment (TCP) / datagram (UDP) → packet (IP) → frame (link) → bits",
        "Being able to say 'a TCP segment inside an IP packet inside an Ethernet frame' is the fluency test"
      ]},
      { t: "Performance vocabulary", sub: [
        "Bandwidth (capacity) vs throughput (achieved) vs latency (delay) vs jitter (variance in delay)",
        "RTT — round trip time",
        "The four delays: transmission, propagation, queuing, processing",
        "Bandwidth-delay product — how much data can be 'in flight'"
      ]},
      { t: "Network types and topologies", sub: ["LAN, MAN, WAN, PAN; intranet vs internet", "Bus, star, ring, mesh — one line each, this is low value"] }
    ],
    asked: [
      "Explain the OSI model layer by layer.",
      "Difference between the OSI and TCP/IP models.",
      "Bandwidth vs throughput vs latency.",
      "What is encapsulation in networking?"
    ]
  },

  {
    id: "cn-2", num: 2, title: "Application Layer — HTTP, HTTPS, DNS", level: "core",
    why: "The highest-value networking module for a backend interview by a wide margin. If networking comes up at all, it starts here.",
    topics: [
      { t: "HTTP fundamentals", sub: [
        "Request/response model; the anatomy of a request (method, path, version, headers, body)",
        "Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS",
        "SAFE vs IDEMPOTENT — GET/HEAD are safe; GET/PUT/DELETE are idempotent; POST is neither. This distinction drives retry logic and gets asked.",
        "Statelessness — and how cookies/sessions/tokens work around it"
      ]},
      { t: "Status codes worth knowing cold", sub: [
        "2xx: 200 OK, 201 Created, 202 Accepted, 204 No Content",
        "3xx: 301 permanent vs 302 temporary redirect, 304 Not Modified (caching)",
        "4xx: 400 Bad Request, 401 Unauthorised (not authenticated), 403 Forbidden (authenticated, not allowed), 404, 409 Conflict, 429 Too Many Requests",
        "5xx: 500, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout",
        "401 vs 403 and 502 vs 503 vs 504 are the pairs people get wrong"
      ]},
      { t: "Headers that matter", sub: [
        "Content-Type, Content-Length, Accept",
        "Cache-Control (max-age, no-cache, no-store, private/public), ETag + If-None-Match, Last-Modified + If-Modified-Since",
        "Authorization, Cookie / Set-Cookie",
        "X-Forwarded-For, Host — and why a load balancer needs them"
      ]},
      { t: "HTTP versions", sub: [
        "HTTP/1.0 — one connection per request",
        "HTTP/1.1 — persistent connections (keep-alive), pipelining (rarely used), chunked transfer. Suffers HEAD-OF-LINE BLOCKING.",
        "HTTP/2 — binary framing, multiplexed streams over one TCP connection, HPACK header compression, server push. Fixes application-level HOL blocking but not TCP-level.",
        "HTTP/3 — runs over QUIC, which runs over UDP. Eliminates TCP head-of-line blocking, 0-RTT reconnection, connection migration across networks.",
        "Being able to explain WHY HTTP/3 abandoned TCP is a strong signal"
      ]},
      { t: "HTTPS and TLS", sub: [
        "Symmetric vs asymmetric encryption, and why TLS uses both (asymmetric to exchange a key, symmetric for the bulk data — because asymmetric is slow)",
        "The TLS handshake at a high level: hello, certificate, key exchange, finished",
        "Certificates, Certificate Authorities, the chain of trust, self-signed certs",
        "What an eavesdropper CAN still see over HTTPS: the destination IP, and the domain via SNI. What they cannot: path, headers, body.",
        "Man-in-the-middle attacks and how certificate validation prevents them",
        "TLS 1.2 vs 1.3 (fewer round trips)"
      ]},
      { t: "DNS", sub: [
        "The hierarchy: root → TLD → authoritative nameserver",
        "Recursive resolver vs iterative query — know which does which",
        "Record types: A, AAAA, CNAME, MX, TXT, NS, SOA, PTR",
        "TTL and caching at every level (browser, OS, resolver). Why a DNS change takes time to propagate.",
        "DNS uses UDP port 53 (falls back to TCP for large responses / zone transfers)",
        "DNS-based load balancing and GeoDNS",
        "This is half the answer to 'what happens when you type a URL'"
      ]},
      { t: "API styles", sub: [
        "REST — resources, verbs, statelessness, HATEOAS (in theory)",
        "RPC and gRPC — protobuf, HTTP/2, streaming; when gRPC beats REST (internal service-to-service, low latency, strong typing)",
        "GraphQL — one endpoint, client-specified queries; the N+1 problem it introduces",
        "Webhooks — server-to-server callbacks"
      ]},
      { t: "Real-time communication", sub: [
        "Short polling vs long polling",
        "Server-Sent Events (SSE) — one-way, server to client, over plain HTTP",
        "WebSockets — full duplex, starts as an HTTP upgrade handshake",
        "When to pick each. 'Design a chat / live updates' questions hinge on this."
      ]},
      { t: "Browser and web security basics", sub: [
        "Same-origin policy; what counts as an origin",
        "CORS — preflight requests, Access-Control-Allow-* headers. Why your frontend gets a CORS error and your backend logs nothing.",
        "Cookies vs sessions vs JWT — where state lives, and the revocation problem with JWT",
        "HttpOnly, Secure, SameSite cookie flags",
        "CSRF and XSS — one sentence each on what they are and the standard mitigation"
      ]},
      { t: "Other application protocols", sub: ["SMTP / IMAP / POP3 — one line each", "FTP vs SFTP vs SCP", "SSH", "DHCP — how a device gets an IP (DORA: Discover, Offer, Request, Ack)"] }
    ],
    asked: [
      "What happens when you type a URL into a browser and press Enter? (Answer this end to end — DNS, TCP handshake, TLS, HTTP request, server, response, render. It is the single most asked networking question.)",
      "HTTP vs HTTPS. How does TLS actually protect the data?",
      "What is the difference between 401 and 403? 502 vs 503 vs 504?",
      "Which HTTP methods are idempotent, and why does it matter for retries?",
      "How does DNS resolution work?",
      "HTTP/1.1 vs HTTP/2 vs HTTP/3 — what problem does each solve?",
      "WebSockets vs long polling vs SSE — which for a live notification feed?",
      "What is CORS and why does it exist?",
      "REST vs gRPC — when would you use each?"
    ]
  },

  {
    id: "cn-3", num: 3, title: "Transport Layer — TCP & UDP", level: "core",
    why: "'TCP vs UDP' is the most asked networking question after 'what happens when you type a URL'. Everything about reliability, ordering and connection state lives here.",
    topics: [
      { t: "TCP vs UDP — the core comparison", sub: [
        "TCP: connection-oriented, reliable, ordered, flow-controlled, congestion-controlled, heavier header (20 bytes), slower to start",
        "UDP: connectionless, unreliable, unordered, no congestion control, 8-byte header, fast",
        "When UDP wins: video/voice streaming, gaming, DNS, DHCP — anywhere a late packet is worse than a lost one",
        "Do not just recite the table. Give a use case for each and say why."
      ]},
      { t: "TCP connection lifecycle", sub: [
        "THREE-WAY HANDSHAKE: SYN → SYN-ACK → ACK. Know what each side learns (initial sequence numbers).",
        "Why three and not two (both sides must confirm their sequence numbers)",
        "FOUR-WAY TERMINATION: FIN → ACK → FIN → ACK, because each direction closes independently",
        "TIME_WAIT — why the closer waits 2×MSL, and why a server with many TIME_WAIT sockets runs out of ports",
        "TCP states: LISTEN, SYN_SENT, ESTABLISHED, FIN_WAIT, CLOSE_WAIT, TIME_WAIT",
        "SYN flood attack and SYN cookies"
      ]},
      { t: "Reliability mechanisms", sub: [
        "Sequence numbers and acknowledgements; cumulative ACKs; selective ACK (SACK)",
        "Retransmission timeout (RTO) and how RTT is estimated",
        "Fast retransmit on three duplicate ACKs",
        "Checksums for error detection"
      ]},
      { t: "Flow control", sub: [
        "Sliding window; the receiver-advertised window",
        "Zero-window and window probing",
        "Flow control protects the RECEIVER. Congestion control protects the NETWORK. Do not conflate them — this is a common follow-up."
      ]},
      { t: "Congestion control", sub: [
        "Slow start (exponential growth), congestion avoidance (linear), congestion window (cwnd), ssthresh",
        "AIMD — additive increase, multiplicative decrease",
        "Fast retransmit and fast recovery",
        "TCP Reno, Cubic (Linux default), BBR (Google) — know the names and that BBR models bandwidth rather than reacting to loss",
        "Why a lossy wireless link makes TCP slow even when there is no congestion"
      ]},
      { t: "Performance details worth knowing", sub: [
        "Nagle's algorithm — batches small writes; TCP_NODELAY disables it. Interacts badly with delayed ACK.",
        "Head-of-line blocking at the TCP level — the reason HTTP/3 moved to UDP",
        "Slow start cost on new connections — why connection pooling and keep-alive matter",
        "MSS and MTU"
      ]},
      { t: "Sockets and ports", sub: [
        "A connection is identified by the 5-tuple: protocol, source IP, source port, destination IP, destination port",
        "Well-known ports: 20/21 FTP, 22 SSH, 25 SMTP, 53 DNS, 80 HTTP, 443 HTTPS, 3306 MySQL, 5432 Postgres, 6379 Redis",
        "Ephemeral ports and port exhaustion",
        "Socket API flow: socket, bind, listen, accept, connect, send, recv, close"
      ]}
    ],
    asked: [
      "TCP vs UDP, with a use case for each.",
      "Explain the three-way handshake. Why three steps?",
      "Why is connection termination four steps and not three?",
      "What is TIME_WAIT and why does it exist?",
      "Flow control vs congestion control.",
      "Explain slow start and congestion avoidance.",
      "How does TCP guarantee ordering and reliability?",
      "Your service opens a new connection per request and is slow. What is happening?"
    ]
  },

  {
    id: "cn-4", num: 4, title: "Network Layer — IP and routing", level: "core",
    why: "Subnetting is the one CN topic you may be asked to compute by hand. Routing concepts matter less for SDE roles but IP addressing and NAT come up constantly in infrastructure discussions.",
    topics: [
      { t: "IPv4 addressing", sub: [
        "32-bit addresses, dotted decimal notation",
        "Classes A/B/C/D/E (historical, but still asked)",
        "CIDR notation: /24, /16 — what the prefix length means",
        "SUBNETTING: given 192.168.1.0/26, give the network address, broadcast address, usable host range and host count. Practise several by hand — this is the standard numerical.",
        "Subnet mask, network vs host portion",
        "Private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. Loopback 127.0.0.1.",
        "Public vs private IP; why your laptop has a 192.168.x.x address"
      ]},
      { t: "NAT", sub: [
        "Network Address Translation, and PAT (port-based, what your home router actually does)",
        "Why NAT exists — IPv4 exhaustion",
        "What NAT breaks — inbound connections, peer-to-peer; hence STUN/TURN"
      ]},
      { t: "IPv6", sub: ["128-bit addresses, hex notation, :: compression", "Why: address exhaustion; also no NAT needed, simpler header, built-in autoconfiguration", "Dual stack and transition mechanisms"] },
      { t: "IP packet and fragmentation", sub: [
        "IP header fields worth knowing: TTL, protocol, source/dest, fragmentation fields",
        "TTL — decremented per hop; hitting zero triggers ICMP Time Exceeded. This is how traceroute works.",
        "MTU, fragmentation and reassembly, Path MTU Discovery",
        "IP is best-effort and connectionless — reliability is the transport layer's job"
      ]},
      { t: "Routing", sub: [
        "Routing table, default gateway, longest prefix match",
        "Static vs dynamic routing",
        "DISTANCE VECTOR (RIP) — Bellman-Ford, count-to-infinity, split horizon",
        "LINK STATE (OSPF) — Dijkstra, full topology map",
        "BGP — path vector, the protocol that routes between autonomous systems and holds the internet together",
        "Interior (IGP) vs exterior (EGP) gateway protocols"
      ]},
      { t: "ICMP and diagnostics", sub: [
        "ICMP — echo request/reply, destination unreachable, time exceeded",
        "PING — how it works and what it proves",
        "TRACEROUTE — incrementing TTL to reveal each hop. Be able to explain the mechanism, not just the command."
      ]}
    ],
    asked: [
      "Given 192.168.10.0/26, what is the broadcast address and how many usable hosts?",
      "What is NAT and why do we need it?",
      "How does traceroute work?",
      "What is TTL in an IP packet?",
      "Distance vector vs link state routing.",
      "Why does IPv6 exist?"
    ]
  },

  {
    id: "cn-5", num: 5, title: "Data Link & Physical Layer", level: "supporting",
    why: "Lowest value for a software role. Learn ARP and the switch-vs-router distinction properly; skim the rest unless you have time.",
    topics: [
      { t: "MAC addressing and ARP", sub: [
        "MAC address — 48-bit, burned into the NIC, local to the link",
        "ARP — resolving an IP to a MAC on the local network; the ARP cache",
        "ARP spoofing as an attack",
        "MAC vs IP: MAC is where you are on this link, IP is where you are on the internet. Both are needed."
      ]},
      { t: "Devices", sub: [
        "Hub (L1, one collision domain, dumb) vs Switch (L2, MAC table, one collision domain per port) vs Router (L3, routes between networks)",
        "Bridge, gateway, repeater",
        "Collision domain vs broadcast domain — a switch splits collision domains, a router splits broadcast domains",
        "VLANs"
      ]},
      { t: "Framing and error control", sub: [
        "Ethernet frame structure",
        "Error DETECTION: parity, checksum, CRC",
        "Error CORRECTION: Hamming code",
        "Flow control protocols: Stop-and-Wait, Go-Back-N, Selective Repeat — and their window sizes and efficiency"
      ]},
      { t: "Media access control", sub: ["CSMA/CD (Ethernet, wired) vs CSMA/CA (Wi-Fi, wireless)", "Why wireless cannot detect collisions and must avoid them instead", "ALOHA, slotted ALOHA (historical)"] },
      { t: "Physical layer", sub: ["Twisted pair, coax, fibre; wireless", "Multiplexing: TDM, FDM, WDM", "Bit rate vs baud rate"] }
    ],
    asked: [
      "What is ARP and when is it used?",
      "Switch vs router vs hub.",
      "Collision domain vs broadcast domain.",
      "CSMA/CD vs CSMA/CA.",
      "Go-Back-N vs Selective Repeat."
    ]
  },

  {
    id: "cn-6", num: 6, title: "Network security essentials", level: "supporting",
    why: "Not a security interview, but you should not be blank on these. One or two sentences each is enough.",
    topics: [
      { t: "Cryptography basics", sub: [
        "Symmetric (AES) vs asymmetric (RSA, ECC) — speed vs key distribution",
        "Hashing (SHA-256) vs encryption — hashing is one-way",
        "Digital signatures and how they prove authenticity",
        "Password storage: salting, bcrypt/argon2, why you never store or hash-with-SHA256 alone"
      ]},
      { t: "Authentication and authorisation", sub: [
        "AuthN (who are you) vs AuthZ (what may you do)",
        "Session cookies vs JWT vs OAuth 2.0 vs API keys",
        "Multi-factor authentication"
      ]},
      { t: "Common attacks", sub: [
        "Man-in-the-middle, replay attack",
        "DDoS and mitigation (rate limiting, CDN absorption)",
        "SQL injection, XSS, CSRF — with the standard mitigation for each",
        "DNS spoofing / cache poisoning"
      ]},
      { t: "Perimeter", sub: ["Firewalls: packet filtering vs stateful vs application layer", "VPN and tunnelling", "Proxy vs reverse proxy", "IDS/IPS"] }
    ],
    asked: [
      "How would you store passwords?",
      "Symmetric vs asymmetric encryption — why does TLS use both?",
      "What is a man-in-the-middle attack and how does HTTPS prevent it?",
      "How would you protect an API from abuse?"
    ]
  },

  {
    id: "cn-7", num: 7, title: "Amazon-level — networking inside system design", level: "advanced",
    why: "This is where networking actually earns marks in an Amazon loop. Everything here appears inside design rounds rather than as a standalone question.",
    topics: [
      { t: "Load balancing", sub: [
        "L4 (transport, routes on IP/port, fast, opaque) vs L7 (application, can route on path/header/cookie, can terminate TLS)",
        "Algorithms: round robin, weighted round robin, least connections, IP hash, CONSISTENT HASHING",
        "Consistent hashing — why it matters when nodes are added or removed, and the virtual-node refinement. Learn this properly; it is a repeated design-round topic.",
        "Health checks, connection draining",
        "Sticky sessions and why they are a liability"
      ]},
      { t: "Proxies, gateways, CDNs", sub: [
        "Forward proxy (client side) vs reverse proxy (server side)",
        "API gateway: routing, auth, rate limiting, request aggregation",
        "CDN — edge caching, origin pull vs push, cache invalidation, why static assets go on a CDN",
        "Anycast"
      ]},
      { t: "Caching", sub: [
        "Where caches live: browser, CDN, reverse proxy, application, database",
        "Patterns: cache-aside (lazy loading), read-through, write-through, write-behind",
        "Eviction: LRU, LFU, TTL",
        "Cache invalidation — the hard part. Stale reads, and the thundering herd / cache stampede problem plus mitigations (locking, staggered TTL, refresh-ahead)",
        "HTTP caching with Cache-Control and ETag"
      ]},
      { t: "Reliability patterns", sub: [
        "Timeouts — always set them, and set them lower than the caller's",
        "Retries with EXPONENTIAL BACKOFF AND JITTER. Jitter is the part people forget; without it, retries synchronise and hammer the service.",
        "Idempotency keys — how a retry does not double-charge a customer",
        "Circuit breaker: closed → open → half-open",
        "Bulkheads, graceful degradation, load shedding"
      ]},
      { t: "Rate limiting", sub: [
        "Token bucket (allows bursts), leaky bucket (smooths output)",
        "Fixed window counter and its boundary problem; sliding window log; sliding window counter",
        "Where to enforce it: gateway vs service; distributed rate limiting with Redis"
      ]},
      { t: "Message queues and async", sub: [
        "Why a queue: decoupling, buffering, smoothing spikes, retries",
        "At-most-once vs at-least-once vs exactly-once delivery (and why exactly-once is really at-least-once plus idempotency)",
        "Pub/sub vs point-to-point; dead letter queues; ordering guarantees",
        "SQS, SNS, Kafka — know them by name and by shape, since this is Amazon"
      ]},
      { t: "Debugging toolkit", sub: [
        "ping, traceroute / mtr, dig / nslookup, ss / netstat, curl -v, telnet to a port, tcpdump / Wireshark",
        "Being able to say 'I would curl -v it and check whether it is DNS, TCP or TLS failing' is a real answer"
      ]}
    ],
    asked: [
      "How would you design a rate limiter?",
      "L4 vs L7 load balancer — which for your service?",
      "Explain consistent hashing and what problem it solves.",
      "How would you cache this, and how would you invalidate it?",
      "A downstream service is timing out. What do you do — retry, fail fast, or degrade?",
      "How do you make a retryable API safe against duplicate side effects?",
      "Design the request path for a service that must serve users on three continents."
    ]
  }
  ],

  resources: [
    { name: "Computer Networking: A Top-Down Approach (Kurose & Ross)", url: "https://gaia.cs.umass.edu/kurose_ross/index.html", note: "Top-down means it starts at HTTP, which is exactly the order you want." },
    { name: "GeeksforGeeks — Computer Networks", url: "https://www.geeksforgeeks.org/computer-network-tutorials/", note: "Fastest path to interview answers and subnetting practice." },
    { name: "High Performance Browser Networking (free, online)", url: "https://hpbn.co/", note: "Excellent on TCP, TLS, HTTP/2 and why latency behaves the way it does." },
    { name: "MDN — HTTP reference", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP", note: "The authority on methods, status codes, headers and CORS." },
    { name: "Cloudflare Learning Center", url: "https://www.cloudflare.com/learning/", note: "Short, accurate explainers on DNS, TLS, CDN, DDoS — good for a night-before refresh." },
    { name: "Gate Smashers — Computer Networks", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_", note: "For subnetting numericals and the lower layers." }
  ]
};
