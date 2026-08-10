/* ------------------------------------------------------------------
   Amazon Prep — Operating Systems syllabus, scratch → Amazon level
------------------------------------------------------------------- */

const SYLLABUS = {
  key: "os",
  subject: "Operating Systems",
  tagline: "From what a kernel is, to arguing about lock granularity in your own service.",
  intro: "Learn it in the module order below. Foundation modules exist so the core ones make sense — do not skip them, but do not linger either. The core modules (2, 3, 4, 5) are where Amazon actually spends interview time; concurrency and memory are the two that come up in system design and in code review, not just in a fundamentals quiz.",
  evidence: "In the collected experiences, one Bar Raiser round covered CPU scheduling algorithms, race conditions and mutex vs semaphore implementation. Another technical round covered transactions, deadlocks, critical sections and semaphores for multi-process scenarios. A 90-minute written screen included MCQs on data structures and operating systems.",

  modules: [
  {
    id: "os-1", num: 1, title: "Foundations — what an OS actually is", level: "foundation",
    why: "One session. You need this vocabulary so that 'system call', 'kernel space' and 'context switch' mean something concrete later.",
    topics: [
      { t: "What an OS does", sub: [
        "Resource manager: CPU, memory, storage, I/O devices",
        "Abstraction layer: processes instead of CPUs, files instead of disk blocks, virtual memory instead of RAM addresses",
        "Protection and isolation between programs"
      ]},
      { t: "Kernel space vs user space", sub: [
        "Privilege rings; why user code cannot touch hardware directly",
        "System calls — the controlled doorway into the kernel",
        "Mode switch (user → kernel) vs context switch (process → process). These are different things and the difference gets asked.",
        "Trap vs interrupt vs exception vs signal"
      ]},
      { t: "Kernel architectures", sub: [
        "Monolithic (Linux) vs microkernel (Minix, QNX) vs hybrid",
        "Trade-off: performance vs fault isolation",
        "Kernel modules / drivers"
      ]},
      { t: "Types of OS", sub: [
        "Batch, multiprogramming, multitasking / time-sharing, multiprocessing",
        "Real-time (hard vs soft), distributed, embedded"
      ]},
      { t: "Boot sequence", sub: ["BIOS/UEFI → bootloader (GRUB) → kernel → init/systemd → user space", "Why you would ever be asked this: it tests whether you know the layering"] }
    ],
    asked: [
      "What is an operating system and why do we need one?",
      "What is the difference between a system call and a normal function call?",
      "What is the difference between kernel mode and user mode?",
      "Monolithic vs microkernel — trade-offs?"
    ]
  },

  {
    id: "os-2", num: 2, title: "Processes & Threads", level: "core",
    why: "The most reliably asked OS module in a software interview. 'Process vs thread' is close to guaranteed if OS comes up at all.",
    topics: [
      { t: "Process fundamentals", sub: [
        "Program vs process vs thread — a program is a file, a process is a running instance",
        "Process Control Block (PCB): PID, state, program counter, registers, memory pointers, open file table, accounting",
        "Memory layout of a process: text (code) / data (globals) / heap (grows up) / stack (grows down). Know which segment holds what — this is asked as 'where does a local variable live?'"
      ]},
      { t: "Process states", sub: [
        "New, Ready, Running, Waiting/Blocked, Terminated",
        "Draw the state diagram and know every transition and what causes it",
        "Suspended states (swapped out) in the 7-state model"
      ]},
      { t: "Context switching", sub: [
        "What is saved and restored: registers, PC, stack pointer, memory maps",
        "Why it is expensive: not just the save/restore, but the TLB and cache going cold",
        "Thread context switch is cheaper than process context switch — because the address space is shared. Know why."
      ]},
      { t: "Process creation and lifecycle (UNIX)", sub: [
        "fork() — returns twice, 0 in the child and the child PID in the parent",
        "exec() family — replaces the process image; fork+exec is how a shell launches a program",
        "wait() / waitpid() — the parent reaping the child's exit status",
        "ZOMBIE process — child has exited but the parent has not reaped it. The PCB entry lingers.",
        "ORPHAN process — parent died first; the child is re-parented to init/systemd",
        "Daemon processes"
      ]},
      { t: "Threads", sub: [
        "Why threads: concurrency within one address space, cheaper creation and switching",
        "What is shared (code, data, heap, open files) vs what is per-thread (stack, registers, program counter). This exact split is the answer to 'process vs thread'.",
        "User-level vs kernel-level threads; the many-to-one, one-to-one, many-to-many models",
        "Thread pools — why you do not spawn a thread per request",
        "Multithreading vs multiprocessing: when you would pick each (shared state and speed vs isolation and fault tolerance)"
      ]},
      { t: "Inter-Process Communication (IPC)", sub: [
        "Shared memory — fastest, but you must synchronise it yourself",
        "Message passing — slower, but safer",
        "Pipes (anonymous) and named pipes (FIFOs)",
        "Message queues",
        "Sockets — including UNIX domain sockets vs network sockets",
        "Signals — asynchronous notification; SIGKILL vs SIGTERM (one is catchable, one is not)"
      ]},
      { t: "Concurrency vs parallelism", sub: [
        "Concurrency = dealing with many things at once (structure). Parallelism = doing many things at once (execution).",
        "You can have concurrency on one core. You cannot have parallelism.",
        "Amdahl's law — the ceiling on speedup from parallelising"
      ]}
    ],
    asked: [
      "Process vs thread. What is shared, what is not?",
      "What happens when you call fork()? What does it return?",
      "What is a zombie process? An orphan? How do you prevent zombies?",
      "Why is a context switch expensive?",
      "Concurrency vs parallelism — with an example.",
      "How many processes are created by fork() called n times in a loop? (Answer: 2^n - 1 children.)",
      "Multithreading vs multiprocessing — which would you use for a CPU-bound task, and for an I/O-bound one?"
    ]
  },

  {
    id: "os-3", num: 3, title: "CPU Scheduling", level: "core",
    why: "Directly asked in a Bar Raiser round in the collected corpus. Also the easiest module to be asked a numerical on — expect to compute average waiting time by hand.",
    topics: [
      { t: "Scheduling basics", sub: [
        "Long-term, medium-term, short-term schedulers",
        "Dispatcher and dispatch latency",
        "Preemptive vs non-preemptive — and why preemption needs careful synchronisation",
        "CPU-bound vs I/O-bound processes; why a good scheduler mixes them"
      ]},
      { t: "Scheduling criteria", sub: [
        "CPU utilisation, throughput",
        "Turnaround time = completion − arrival",
        "Waiting time = turnaround − burst",
        "Response time = first-run − arrival (the one that matters for interactive systems)",
        "Know which algorithm optimises which metric"
      ]},
      { t: "The algorithms", sub: [
        "FCFS — simple, non-preemptive, suffers the CONVOY EFFECT (one long job blocks everyone)",
        "SJF (Shortest Job First) — provably optimal average waiting time, but requires knowing burst times and can starve long jobs",
        "SRTF — preemptive SJF",
        "Priority scheduling — starvation, fixed by AGING",
        "Round Robin — the interactive default. Quantum choice: too large degenerates to FCFS, too small wastes time on context switches.",
        "Multilevel Queue — separate queues per process class",
        "Multilevel Feedback Queue — processes move between queues based on behaviour. This is what real systems approximate.",
        "Bonus: Linux CFS (Completely Fair Scheduler) and virtual runtime"
      ]},
      { t: "Numericals — practise these", sub: [
        "Given arrival and burst times, produce the Gantt chart and compute average waiting and turnaround time",
        "Do it for FCFS, SJF, SRTF, RR (with a stated quantum) and Priority",
        "This is the single most likely OS numerical you will be asked to do on a whiteboard"
      ]},
      { t: "Multiprocessor scheduling", sub: ["Load balancing, processor affinity, push vs pull migration", "Why cache affinity makes naive load balancing counterproductive"] }
    ],
    asked: [
      "Explain the scheduling algorithms you know and when each is appropriate.",
      "What is the convoy effect?",
      "How do you pick a time quantum for Round Robin?",
      "What is starvation and how does aging fix it?",
      "Compute average waiting time for these processes under SJF and under RR with quantum 2.",
      "Which algorithm gives the minimum average waiting time, and why can we not always use it?"
    ]
  },

  {
    id: "os-4", num: 4, title: "Concurrency, Synchronisation & Deadlock", level: "core",
    why: "The highest-value OS module for Amazon. Mutex vs semaphore was asked outright in the corpus. Concurrency also shows up in LLD rounds — 'design a scalable and CONCURRENT parking garage' and 'concert booking with concurrency' both appear.",
    topics: [
      { t: "The problem", sub: [
        "Race condition — define it and give a concrete example (two threads doing count++ on a shared counter)",
        "Why count++ is not atomic: load, increment, store",
        "Critical section",
        "The three requirements a correct solution must satisfy: mutual exclusion, progress, bounded waiting"
      ]},
      { t: "Hardware and low-level primitives", sub: [
        "Atomic instructions: test-and-set, compare-and-swap (CAS)",
        "Disabling interrupts — why it does not work on multiprocessors",
        "Memory barriers and instruction reordering (why 'volatile' exists)",
        "Peterson's algorithm — classic software solution for two processes; know that it exists and its assumptions"
      ]},
      { t: "Locks — the one that gets asked", sub: [
        "MUTEX: a locking mechanism with OWNERSHIP. Only the thread that locked it can unlock it. Value is 0 or 1.",
        "BINARY SEMAPHORE: a signalling mechanism with NO ownership. Any thread can signal it. Also 0 or 1.",
        "COUNTING SEMAPHORE: allows up to N concurrent holders — use it for a resource pool of size N.",
        "The distinction to state out loud: a mutex is for mutual exclusion, a semaphore is for signalling/counting. Ownership is the crisp differentiator.",
        "wait()/P()/down() and signal()/V()/up() — and why they must be atomic",
        "Spinlock vs blocking lock: spin when the wait is shorter than a context switch, block otherwise",
        "Reader-writer locks; why they can starve writers",
        "Monitors and condition variables — the higher-level abstraction (this is Java's synchronized + wait/notify)",
        "Lock granularity: coarse (simple, low concurrency) vs fine (complex, deadlock-prone, high concurrency). Say this trade-off in LLD rounds."
      ]},
      { t: "Classic synchronisation problems", sub: [
        "Producer-Consumer / bounded buffer — solve it with two counting semaphores plus a mutex, and know why the order of acquisition matters",
        "Readers-Writers — the three variants (readers priority, writers priority, fair)",
        "Dining Philosophers — and the standard fixes: resource ordering, an arbitrator, or allowing only n-1 to sit",
        "Sleeping Barber",
        "Be able to write producer-consumer pseudocode on a whiteboard. It is the most likely one to be asked."
      ]},
      { t: "Deadlock", sub: [
        "The four Coffman conditions, ALL of which must hold: mutual exclusion, hold and wait, no preemption, circular wait",
        "PREVENTION — break one of the four. Resource ordering breaks circular wait and is the practical answer.",
        "AVOIDANCE — Banker's algorithm; safe vs unsafe state. Be able to run it on a small matrix.",
        "DETECTION — wait-for graph; cycle detection",
        "RECOVERY — kill a process, roll back, preempt a resource",
        "Ostrich algorithm — ignore it, which is what most real systems do",
        "Livelock vs deadlock vs starvation — three different things",
        "Priority inversion and priority inheritance (the Mars Pathfinder story is a good 30-second answer)"
      ]},
      { t: "Applied concurrency (Amazon level)", sub: [
        "Thread-safe design in your own code: what to lock, how long to hold it",
        "Immutability as a concurrency strategy — no shared mutable state, no lock",
        "Optimistic concurrency (CAS retry loops) vs pessimistic (lock first)",
        "Lock-free and wait-free structures — know the terms and the trade-off",
        "False sharing — two threads on different variables in the same cache line, killing performance",
        "Java specifics if you code in Java: synchronized, volatile (visibility, not atomicity), ReentrantLock, AtomicInteger, ConcurrentHashMap, ExecutorService",
        "Python specifics: the GIL and what it means for CPU-bound vs I/O-bound threading"
      ]}
    ],
    asked: [
      "Mutex vs semaphore. (Asked verbatim in a Bar Raiser in the corpus.)",
      "What is a race condition? Show me one in code.",
      "What are the four conditions for deadlock? How would you prevent one?",
      "Solve producer-consumer with semaphores.",
      "What is the difference between deadlock, livelock and starvation?",
      "You have a shared counter incremented by 100 threads. What goes wrong and how do you fix it?",
      "What does volatile do, and why is it not enough for a counter?",
      "How would you make your parking-lot / booking design thread-safe?"
    ]
  },

  {
    id: "os-5", num: 5, title: "Memory Management & Virtual Memory", level: "core",
    why: "The second-highest-value module. Paging and page replacement are standard questions, and LRU page replacement is the same idea as the LRU Cache you will code.",
    topics: [
      { t: "Basics", sub: [
        "Logical (virtual) vs physical address; the MMU and address translation",
        "Address binding: compile time, load time, execution time",
        "Base and limit registers; memory protection",
        "Swapping"
      ]},
      { t: "Contiguous allocation and fragmentation", sub: [
        "Fixed vs variable partitioning",
        "First fit, best fit, worst fit",
        "INTERNAL fragmentation (wasted space inside an allocated block) vs EXTERNAL (wasted space between blocks). Know which allocation scheme causes which.",
        "Compaction"
      ]},
      { t: "Paging", sub: [
        "Frames (physical) and pages (logical); the page table",
        "Address split: page number + offset; how translation works step by step",
        "Page size trade-off: large pages waste space to internal fragmentation, small pages make the page table huge",
        "TLB — a cache for the page table. TLB hit vs miss; effective access time calculation (a classic numerical).",
        "Multilevel page tables and why a single flat table is impractical on 64-bit",
        "Inverted page table",
        "Paging is transparent to the process and eliminates external fragmentation — say both."
      ]},
      { t: "Segmentation", sub: [
        "Segments as logical units (code, data, stack) with a segment table",
        "Segmentation vs paging — logical view vs fixed blocks; external vs internal fragmentation",
        "Segmented paging"
      ]},
      { t: "Virtual memory", sub: [
        "Demand paging — load pages only when touched",
        "PAGE FAULT: the exact sequence — trap to OS, check validity, find a free frame, evict if needed (write back if dirty), read the page in, update the page table, restart the instruction. Be able to narrate this.",
        "Valid/invalid bit; dirty bit; reference bit",
        "Copy-on-write — how fork() is cheap",
        "Memory-mapped files"
      ]},
      { t: "Page replacement algorithms", sub: [
        "FIFO — and BELADY'S ANOMALY (more frames can mean more faults). Know an example.",
        "Optimal (OPT/MIN) — unimplementable, used as a benchmark",
        "LRU — and the three ways to implement it: counters, stack, or hashmap + doubly linked list (the LeetCode LRU Cache)",
        "LRU approximations: second chance / clock algorithm",
        "LFU",
        "Practise: given a reference string and a frame count, count page faults under FIFO, LRU and OPT"
      ]},
      { t: "Thrashing and allocation", sub: [
        "Thrashing — the system spends more time paging than executing. Cause: too little memory per process.",
        "Working set model",
        "Page fault frequency control",
        "Local vs global allocation; equal vs proportional allocation"
      ]},
      { t: "Applied (Amazon level)", sub: [
        "Stack vs heap in your own program: lifetime, speed, size limits, who cleans up",
        "Memory leaks, dangling pointers, use-after-free",
        "Garbage collection basics if you use Java/Go: generational GC, stop-the-world pauses, why GC pressure matters in a latency-sensitive service",
        "Cache hierarchy and locality — why an array beats a linked list in practice even at the same big-O",
        "Cache line, spatial vs temporal locality, false sharing"
      ]}
    ],
    asked: [
      "What is virtual memory and why do we need it?",
      "Walk me through what happens on a page fault.",
      "Paging vs segmentation.",
      "Internal vs external fragmentation — which does paging cause?",
      "What is thrashing and how would you detect and fix it?",
      "Explain LRU and implement it in O(1).",
      "What is Belady's anomaly? Which algorithms suffer from it?",
      "What is a TLB and why does it matter?",
      "Where do local variables live? Where do objects created with new live?"
    ]
  },

  {
    id: "os-6", num: 6, title: "File Systems & Storage", level: "supporting",
    why: "Lower frequency than the core modules, but disk scheduling and inode structure are standard fundamentals questions, and file-system concepts feed straight into database storage questions.",
    topics: [
      { t: "Files and directories", sub: [
        "File attributes, operations, open-file table, file descriptors",
        "Directory structures: single-level, two-level, tree, acyclic graph",
        "Absolute vs relative paths",
        "HARD LINK vs SOFT/SYMBOLIC LINK — a hard link is another name for the same inode; a symlink is a file containing a path. Deleting the original breaks a symlink but not a hard link."
      ]},
      { t: "File allocation methods", sub: [
        "Contiguous — fast sequential access, external fragmentation, hard to grow",
        "Linked — no fragmentation, terrible random access",
        "Indexed (inode) — index block per file; multilevel indexing for large files. This is how UNIX works.",
        "Know the trade-off table by heart"
      ]},
      { t: "Free space management", sub: ["Bit vector / bitmap", "Linked list, grouping, counting"] },
      { t: "Disk scheduling", sub: [
        "Disk geometry: platter, track, sector, cylinder; seek time + rotational latency + transfer time",
        "FCFS, SSTF (can starve), SCAN (elevator), C-SCAN, LOOK, C-LOOK",
        "Practise computing total head movement for a given request queue — a standard numerical",
        "Why none of this matters the same way on SSDs, and what does (write amplification, wear levelling, TRIM)"
      ]},
      { t: "Reliability and performance", sub: [
        "RAID 0 (striping, no redundancy), 1 (mirroring), 5 (distributed parity), 6 (double parity), 10 (mirror + stripe). Know capacity and fault tolerance for each.",
        "Journaling file systems and crash consistency",
        "Page cache / buffer cache; write-back vs write-through; fsync and durability",
        "Why 'the write returned successfully' does not mean 'the data is on disk'"
      ]}
    ],
    asked: [
      "Hard link vs soft link.",
      "What is an inode?",
      "Explain disk scheduling algorithms; compute the head movement for this request queue.",
      "RAID 5 vs RAID 10 — which would you choose and why?",
      "What does fsync do and why would you call it?"
    ]
  },

  {
    id: "os-7", num: 7, title: "I/O and the systems view", level: "supporting",
    why: "Short module, but blocking vs non-blocking I/O and epoll are directly relevant to backend work and come up when you discuss a service's throughput.",
    topics: [
      { t: "I/O mechanics", sub: [
        "Polling vs interrupt-driven I/O",
        "DMA — why the CPU should not copy bytes itself",
        "Device drivers; block vs character devices",
        "Spooling and buffering"
      ]},
      { t: "I/O models — the one that matters for servers", sub: [
        "Blocking vs non-blocking",
        "Synchronous vs asynchronous (these are two axes, not one — be precise)",
        "I/O multiplexing: select, poll, epoll/kqueue. Why epoll scales and select does not (O(1) vs O(n) per call, and the fd limit).",
        "The thread-per-connection model vs the event-loop model. This is the C10K problem.",
        "Zero-copy (sendfile) — bonus, but a strong thing to know"
      ]},
      { t: "Performance intuition", sub: [
        "Latency numbers every engineer should know: L1 cache ~1ns, main memory ~100ns, SSD read ~100µs, disk seek ~10ms, network round trip within a datacentre ~0.5ms, cross-continent ~150ms",
        "Being able to quote these turns a vague design answer into a concrete one"
      ]}
    ],
    asked: [
      "Blocking vs non-blocking I/O; synchronous vs asynchronous.",
      "Why is epoll better than select?",
      "Your service handles 10,000 concurrent connections. Thread per connection, or an event loop? Why?",
      "What is DMA?"
    ]
  },

  {
    id: "os-8", num: 8, title: "Amazon-level — connecting OS to your code", level: "advanced",
    why: "This is what turns a textbook answer into a hire signal. You are not being tested on definitions; you are being tested on whether OS knowledge changes decisions you make.",
    topics: [
      { t: "Reason about your own service", sub: [
        "Why a thread pool sized to core count is right for CPU-bound work and wrong for I/O-bound work",
        "Why adding threads past a point reduces throughput (context switch overhead, lock contention)",
        "Where your latency goes: is it CPU, is it a lock, is it disk, is it network?",
        "Why GC pauses or page faults show up as p99 latency spikes and not in the average"
      ]},
      { t: "Concurrency decisions you can defend", sub: [
        "Choosing lock granularity, and what you would measure to know you chose wrong",
        "When to use a concurrent collection vs a lock around a plain one",
        "Idempotency and retries — an OS/distributed-systems boundary that Amazon cares about a lot",
        "Backpressure: bounded queues, and what to do when the queue is full"
      ]},
      { t: "Debugging vocabulary", sub: [
        "top / htop, vmstat, iostat, free — reading load average, %wa (I/O wait), swap usage",
        "strace to see system calls; lsof for open files",
        "Reading a thread dump / stack trace and spotting a deadlock in it",
        "OOM killer — why your process died with no exception"
      ]}
    ],
    asked: [
      "Your service's p99 latency spiked but the average is fine. How do you investigate?",
      "How would you make this data structure thread-safe, and what does that cost you?",
      "How many threads would you put in the pool, and how would you decide?",
      "A request is timing out. Walk me through how you would find out where the time goes."
    ]
  }
  ],

  resources: [
    { name: "Operating System Concepts (Silberschatz, 'the dinosaur book')", url: "https://www.os-book.com/", note: "The standard reference. Read chapters, do not read cover to cover." },
    { name: "Operating Systems: Three Easy Pieces (free, online)", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/", note: "Free and genuinely better written than most textbooks. Virtualisation → Concurrency → Persistence maps onto modules 2-5, 4, 6." },
    { name: "GeeksforGeeks — Operating Systems", url: "https://www.geeksforgeeks.org/operating-systems/", note: "Fastest path to interview-shaped answers and numericals." },
    { name: "Neso Academy — Operating System playlist", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRiVhbXDGLXDk_OQAeuVcp2O", note: "If you prefer video for scheduling and synchronisation." },
    { name: "Gate Smashers — Operating System", url: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p", note: "Best for the numericals — scheduling, page replacement, disk scheduling." }
  ]
};
