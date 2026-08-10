/* ------------------------------------------------------------------
   Amazon Prep — Leadership Principles, full preparation guide
   Official principle wording: amazon.jobs/content/en/our-workplace/leadership-principles
------------------------------------------------------------------- */

const LP_GUIDE = {

/* ============================================================ MECHANICS */
mechanics: {
  intro: "Before any of the principles, understand how the round is actually run. Most people prepare answers and lose on mechanics.",
  points: [
    { t: "It is not one round. It is every round.",
      d: "The standard split is 25-30 minutes of technical and 25-30 minutes of Leadership Principles in EVERY interview of the loop. A 3-round hiring event means you will answer roughly 6-12 behavioural questions across the day, not two. One SDE-2/L5 experience in the corpus logs 45 straight minutes of LP with the hiring manager and 50 more with the Bar Raiser." },
    { t: "Interviewers are assigned specific principles in advance.",
      d: "The loop is divided so that the panel collectively covers most of the 16. Your interviewer is not improvising — they have two or three principles to probe and a rubric to fill. This is why the same question can be asked twice in a day by different people: they are each scoring a different principle." },
    { t: "The Bar Raiser is a different animal.",
      d: "A senior Amazonian from an unrelated team, trained for this, with veto power over the hire. They have no stake in filling your team's headcount, so they are the least forgiving interviewer in the loop. In the corpus, the Bar Raiser rounds are consistently rated the hardest and run 30-50 minutes of pure LP." },
    { t: "They write down what you say, verbatim, while you talk.",
      d: "The typing is not rudeness or disinterest. They are capturing quotes for the debrief. This is also why the poker face exists — the Feb 2026 SDE-1 candidate describes an interviewer who gave zero indication of whether answers were landing for 40 straight minutes. Do not read the silence as failure and start rambling to fill it." },
    { t: "The panel compares notes afterwards, and inconsistency is fatal.",
      d: "After the loop, everyone meets and reads out their notes. If you told Round 1 that a project took three months and told Round 3 it took three weeks, or if the same story appears with a different outcome, that gets caught. Keep your facts fixed. Write them down beforehand so you do not improvise numbers." },
    { t: "They will drill one story four to six questions deep.",
      d: "This is the part people are unprepared for and it is the core of this page. They pick one story and keep going: why, why then, why not the other option, what did you measure, what did you get wrong, what did the other person say. The corpus describes it as going very deep into each situation, asking multiple follow-ups and challenging decisions from different angles. A story that is one layer thick collapses on the third question." },
    { t: "The written scoring is on a scale, and 'meets' is not a pass.",
      d: "Feedback is roughly: strong hire / hire / not inclined / strong no. An average rating on a single principle can sink you. In the corpus, an SDE-II in Bangalore was rejected after technically clean rounds because HR cited an average rating on Customer Obsession specifically. Nothing else went wrong." },
    { t: "Depth of ownership, not seniority, is what is scored.",
      d: "You are not being penalised for being a fresher. You are being scored on whether the thing you describe was genuinely yours, whether you understood the trade-offs, and whether you can be honest about what went wrong. A well-owned college project beats a vaguely described industry project every time." }
  ]
},

/* ============================================================ STAR */
star: {
  intro: "STAR is not optional formatting. It is the structure the interviewer's note template is built around, so an unstructured answer is literally harder for them to score.",
  breakdown: [
    { k: "S — Situation", pct: "~15%", d: "Where, when, what was the context. Two or three sentences maximum. Enough that a stranger understands the stakes, no more. Most people spend two minutes here and run out of time for the part that scores." },
    { k: "T — Task", pct: "~10%", d: "What specifically was YOUR responsibility and what was the goal. Name the constraint: the deadline, the budget, the missing information. The constraint is what makes the story interesting." },
    { k: "A — Action", pct: "~60%", d: "What YOU did, step by step, with your reasoning at each step. This is the whole answer. Say 'I' — every time you say 'we', the interviewer cannot score you and has to interrupt to ask what you personally did. Include the alternatives you rejected and why." },
    { k: "R — Result", pct: "~15%", d: "What happened, with a NUMBER. Latency dropped from 400ms to 90ms. Crash rate went from 12% to under 1%. 3,000 users in two months. Saved the team two days a sprint. Then the tail: what you learned and what you would do differently. Volunteering the second half is a strong signal on its own." }
  ],
  worked: {
    prompt: "Tell me about a time you had to solve a difficult technical problem.",
    weak: {
      label: "Weak answer",
      text: "So in my final year project we built a chat application and we were facing a lot of performance issues. The app was getting slow when many users joined. We researched a lot and we tried different things and finally we optimised the database and it worked much better. The professor was very happy with it and we got a good grade.",
      problems: [
        "'We' throughout — the interviewer cannot tell what you personally did, and will now spend three minutes extracting it instead of scoring you",
        "'A lot of performance issues' — no number, no symptom, no measurement",
        "'We researched a lot and tried different things' — this is the Action section, the 60%, and it is one sentence with no content",
        "'Optimised the database' — which part? Why that and not caching, or a different data model? No decision is visible, so no judgement can be scored",
        "The result is a grade, which is not an outcome — it says nothing about whether the fix worked",
        "No trade-off, no failure, nothing learned"
      ]
    },
    strong: {
      label: "Strong answer",
      text: [
        "S — In my final year I built a chat app that we opened up to my hostel, around 400 users. About three weeks in, people started reporting that messages took several seconds to appear in busy group chats.",
        "T — I owned the backend, so this was mine. I gave myself a week to fix it before a demo day, and the goal I set was under 200ms end to end at 50 concurrent users.",
        "A — First I stopped guessing and measured. I added timing logs at four points in the request path and found the send path was fine — the slowness was on read. Every client was polling the message endpoint every two seconds, and each poll ran a query that scanned the whole messages table for that room. At 400 users that was a few thousand full scans a minute.",
        "I considered three options. Adding a cache in front would have been fastest to write, but it would go stale and chat cannot show stale messages. Moving to WebSockets was the correct long-term fix but I estimated four or five days and I had a week with exams in it. The third option was an index on (room_id, created_at) plus switching the poll to send the timestamp of the last message it had, so the query returned only new rows.",
        "I did the third one because it was about two hours of work and it attacked the actual cause, which was scanning rows nobody needed. I measured again before and after on the same load.",
        "R — Median read latency went from about 1.9 seconds to 40 milliseconds, and the database CPU dropped from around 80% to under 15%. The demo ran fine. What I would do differently: I should have added the timing instrumentation on day one instead of after users complained — I spent my first two days guessing at the wrong layer. I did eventually move it to WebSockets over the following month, because polling was always going to be the real limit."
      ],
      why: [
        "'I' throughout, with the one place ownership was shared made explicit",
        "The Action section is most of the answer, and every step has a reason attached",
        "Three options considered and rejected on stated grounds — this is what 'judgement' looks like when written down",
        "Real numbers, measured before and after, not estimated afterwards",
        "Volunteers a genuine mistake without being asked, which scores on Earn Trust and Learn and Be Curious at the same time",
        "Every one of the follow-ups in the drill chains below has an answer already sitting in this story"
      ]
    }
  },
  rules: [
    "Say 'I', not 'we'. If the work was genuinely shared, say so explicitly once and then describe your part. Never let it stay ambiguous.",
    "Have your numbers written down and memorised. 'Significantly faster' scores nothing. If you genuinely do not have a metric, say what you would have measured — that is a better answer than a vague adjective.",
    "Two minutes for the answer, then stop and let them drill. Do not narrate for six minutes. They have four more questions to get through and a rambling answer reads as a thin one being padded.",
    "Name the alternatives you rejected. A decision with no alternatives is not a decision, and judgement cannot be scored on it.",
    "Volunteer what went wrong before they ask. Vocal self-criticism is written into Earn Trust as an explicit expectation.",
    "Never blame a teammate, a manager, a professor or a client. You can describe a disagreement factually; the moment it becomes a complaint, you have failed Earn Trust regardless of the principle being scored.",
    "Do not use the same story twice in the same interview. Across different interviewers is acceptable and sometimes unavoidable, but within one round it reads as having only one experience.",
    "Answer the question that was asked. If they ask about a failure, do not pivot into a success story with a happy ending. That evasion is itself the signal."
  ]
},

/* ============================================================ STORY BANK STRATEGY */
strategy: {
  intro: "You do not need 16 stories. You need 8 to 10 rich ones, each deep enough to survive five follow-ups, mapped so that every principle has at least one and the heavy principles have two.",
  steps: [
    { t: "Step 1 — List every candidate experience you have.",
      d: "Internships, side projects with real users, college capstone, hackathons, open source contributions, freelance work, teaching or TA work, club or fest organising, competitive programming, a bug you found in someone else's system. Anything where you made a decision and something happened as a result." },
    { t: "Step 2 — Keep the ones with conflict, constraint or failure.",
      d: "A project that went smoothly is unusable — there is nothing to drill. The stories that score are the ones where something was scarce (time, data, people, hardware), someone disagreed with you, or something broke. Deliberately keep at least two stories where you were wrong." },
    { t: "Step 3 — Write each one out in full STAR, on paper, with numbers.",
      d: "Not bullet points. Full prose, once, so the phrasing is settled and you never improvise a fact under pressure. Then reduce each to a five-line cue card you can actually memorise." },
    { t: "Step 4 — Map each story to every principle it can serve.",
      d: "A single good story usually covers three or four. The chat-app story above covers Dive Deep (instrumented instead of guessing), Bias for Action (shipped the two-hour fix under a deadline), Customer Obsession (found out because users complained and set a user-facing target), Deliver Results, and Learn and Be Curious (volunteered the mistake and the eventual rewrite). Use the tool below to build this matrix." },
    { t: "Step 5 — Find the gaps and fix them honestly.",
      d: "Any principle with zero stories is a hole the Bar Raiser will find. Read that principle's fresher angle below and go back through your experience for something you did not think counted. Do not invent one." },
    { t: "Step 6 — Have someone drill you.",
      d: "Give a friend the drill chains from this page and have them go five questions deep on one story without letting you change the subject. You will discover which stories are one layer thick. That discovery is the entire point of preparing." }
  ],
  fresherNote: "If you are a fresher or have under two years of experience: nobody expects you to have led a team or shipped to millions. What they expect is that whatever you did do, you owned it, understood why you made each choice, measured something, and can be honest about what went wrong. Depth beats scale. An interviewer will take a 400-user hostel chat app you can defend for ten minutes over a vague description of a large internship project you barely touched."
},

/* ============================================================ THE 16 */
principles: [
{
  n: 1, id: "lp-1", name: "Customer Obsession",
  official: "Leaders start with the customer and work backwards. They work vigorously to earn and keep customer trust. Although leaders pay attention to competitors, they obsess over customers.",
  weight: "critical",
  testing: "Whether you actually think about the person using the thing, or only about the code. They want evidence that you sought out what users needed rather than assuming it, and that you made a decision that was worse for you and better for the user.",
  strong: [
    "You talked to, watched, or read feedback from actual users — not a proxy, not your manager's opinion of users",
    "You changed a technical decision because of what a user needed",
    "You did extra work, or took on inconvenience, so the user did not have to",
    "You measured something the user experiences: latency they feel, errors they hit, steps they have to take",
    "You pushed back on a request because it was not actually good for the user"
  ],
  weak: [
    "'The customer' means your manager, your professor, or your team lead and you never say so",
    "You describe building a feature well but never say who wanted it or why",
    "Your definition of quality is entirely internal — clean code, good architecture — with no user-visible consequence",
    "You mention users only in the result, as an afterthought"
  ],
  fresher: "Your users are real even if there are 40 of them. Anyone who used your app, your college portal, your library, your internal tool, your Discord bot. TAs and students you supported count. So do the people who filed issues on your open-source project. If you truly had no external users, use the next team downstream of you as the customer and say explicitly that you are treating them as the customer — that framing is itself a good answer.",
  example: {
    title: "The extra step nobody asked to remove",
    text: "During my internship I built an internal dashboard for the support team. I shipped it and it worked. Two weeks later I sat with one of the support agents for an hour while she used it, because I wanted to see it in real use. She was exporting to CSV and re-uploading to another tool every single time — a five-minute manual step, about fifteen times a day. Nobody had reported it because they assumed that was just how it worked. I checked and the other tool had an API. It took me a day and a half to wire it up directly. It removed roughly an hour of manual work per agent per day across four agents. Nobody had asked for it; I only found it because I watched instead of assuming the absence of complaints meant the absence of problems."
  },
  questions: [
    "Tell me about a time you went above and beyond for a customer.",
    "Give me an example of when you used customer feedback to drive a decision.",
    "Describe a time you had to balance what the customer wanted against what was technically feasible.",
    "Tell me about a time you said no to a customer or a stakeholder.",
    "How do you know your work actually helped someone?",
    "Tell me about a time you made a decision that was harder for you but better for the user.",
    "Describe a time you disagreed with a customer request. What did you do?",
    "Tell me about the most difficult customer or stakeholder interaction you have had."
  ],
  drills: [
    { opener: "Tell me about a time you went above and beyond for a customer.",
      chain: [
        { q: "Who exactly was the customer here?", why: "The single most common place this answer dies. If your answer is 'my manager' or 'the professor', you have not demonstrated Customer Obsession, you have demonstrated compliance. Name a real end user." },
        { q: "How did you find out that was what they needed?", why: "They are separating 'I asked / observed / read the tickets' from 'I assumed'. Assumption is the failure mode. Say the mechanism — a conversation, sitting with them, reading support logs, a survey." },
        { q: "What did going above and beyond cost you? What did you not do instead?", why: "If nothing was traded off, you did not go above and beyond — you did your job. Naming what you deprioritised proves the effort was real and shows you understand prioritisation." },
        { q: "Did anyone tell you not to do it, or was it not a priority for your team?", why: "Probing for whether this crosses into Ownership and Backbone territory. If someone pushed back and you proceeded, say how you got them comfortable." },
        { q: "How do you know it actually helped? What would you have seen if you were wrong?", why: "The metric question, asked in its hardest form. 'What would falsify this' is much harder than 'what was the result' and is where inflated stories fall apart." },
        { q: "Would you do it again the same way?", why: "Looking for judgement rather than reflex. A candidate who says 'yes, exactly the same' every time is not reflective. A good answer names one thing that would change." }
      ],
      crack: "Where candidates crack: question three. They describe extra effort but cannot name a single thing they gave up to make room for it, which reveals the effort was smaller than described. Prepare the trade-off before you prepare the story."
    },
    { opener: "Tell me about a time you disagreed with what a customer or stakeholder asked for.",
      chain: [
        { q: "What did they actually want underneath the request?", why: "Testing whether you distinguish the stated request from the underlying need. This distinction is the whole of working backwards." },
        { q: "How did you raise the disagreement?", why: "Now scoring Earn Trust and Backbone simultaneously. They want respectful and direct, with data." },
        { q: "What if they had insisted anyway?", why: "A hypothetical, deliberately. They want to hear 'disagree and commit' — that you would have built it well and set up a way to find out who was right." },
        { q: "Were you right?", why: "The trap. If you say yes without evidence, you fail Are Right A Lot. If you were actually wrong, saying so plainly is a very strong answer." }
      ],
      crack: "Where candidates crack: the fourth question. They want to end on being vindicated, so they overstate. An honest 'I was partly wrong — they had context about the customer that I did not' scores higher than a clean win you cannot evidence."
    }
  ],
  traps: [
    "Calling your manager or professor 'the customer' without flagging it. Say 'my direct customer was the support team, and their customer was the end user' if that is the truth.",
    "Confusing 'I worked very hard' with 'I obsessed over the customer'. Effort is not the principle. Direction of effort is.",
    "Having no mechanism by which you learned what users wanted. If the honest answer is that you guessed, say you guessed, then say what you would do now to find out."
  ]
},

{
  n: 2, id: "lp-2", name: "Ownership",
  official: "Leaders are owners. They think long term and don't sacrifice long-term value for short-term results. They act on behalf of the entire company, beyond just their own team. They never say 'that's not my job.'",
  weight: "critical",
  testing: "Whether you pick up problems that are technically nobody's, and whether you think past your own deadline. Directly named in the corpus as a topic the Feb 2026 SDE-1 interviewer went deep on.",
  strong: [
    "You saw a problem outside your assigned scope and fixed it, or made sure someone did",
    "You chose the slower, more durable solution and can explain why the trade was worth it",
    "You stayed responsible for something after the deadline, the launch, or the semester ended",
    "You handed something off properly — documentation, runbook, a person you trained — instead of letting it rot",
    "You took the blame for something your part of the system caused, without spreading it"
  ],
  weak: [
    "'That was handled by another team' as the end of the story rather than the start of one",
    "Ownership described as working late — that is effort, not ownership",
    "You fixed something outside your scope by going around people, breaking things, and calling it initiative",
    "The thing you owned died the moment you stopped touching it, and you have not noticed that this is the point"
  ],
  fresher: "The strongest fresher ownership stories are usually: you inherited something broken and made it not broken; you noticed a problem in a part of the project that was not yours and raised it with evidence; you kept maintaining a project after the grade was in; or you wrote the documentation nobody assigned because you could see the next person would need it. Maintaining a side project with real users past the point where it was fun is a genuinely strong ownership story and one Amazon interviewers respond well to.",
  example: {
    title: "The alert nobody owned",
    text: "On my team's project there was a nightly job that failed roughly twice a week. It was not mine — it predated me — and the informal process was that whoever noticed re-ran it manually. I asked around and nobody owned it, so I spent two evenings reading it. The failure was a race between the job and a data import that sometimes ran late. I could have added a retry, which would have taken twenty minutes and hidden the problem. Instead I made the job wait on an explicit completion marker from the import, which took most of a day because I had to change the import too, and I wrote a one-page runbook explaining the dependency. It has not needed a manual re-run since. I also raised it in standup rather than just doing it silently, because changing someone else's job without telling them is not ownership, it is a surprise."
  },
  questions: [
    "Tell me about a time you took on something significant outside your area of responsibility.",
    "Describe a time you saw a problem that was not yours and acted on it.",
    "Tell me about a time you had to make a decision without your manager's input.",
    "Give an example of sacrificing a short-term result for long-term value.",
    "Tell me about a time you took on a task nobody wanted.",
    "Describe a time something you built broke after you had moved on. What did you do?",
    "Tell me about a commitment you made that you had to work hard to keep.",
    "When have you gone beyond your role's boundaries, and how did you handle the people whose area you stepped into?"
  ],
  drills: [
    { opener: "Tell me about a time you took ownership of something outside your responsibilities.",
      chain: [
        { q: "Why was nobody else doing it?", why: "Separating a real gap from a thing you assumed was a gap. If someone else was in fact on it, this becomes a story about not communicating." },
        { q: "Did you tell anyone before you started, or after?", why: "The sharpest question in this chain. Ownership is not permissionless heroics. 'After' is survivable if you explain why waiting was worse; 'I never told anyone' is a real problem." },
        { q: "What did you stop doing to make room for this?", why: "Same trade-off probe as Customer Obsession. If the answer is 'nothing, I just worked more hours', they will follow with whether that was sustainable and whether your own work slipped." },
        { q: "You said you took the harder fix rather than the quick one. Convince me that was right.", why: "They want the reasoning, not the conclusion. Give the cost of both, the failure rate, and the number of people affected." },
        { q: "What happened to it after you left or after the project ended?", why: "The long-term-value clause of the principle, asked literally. If you handed it off with documentation, say so. If it broke again, say that — and say what that taught you about handoffs." },
        { q: "How would you know today if it had regressed?", why: "Probing whether ownership included making the thing observable. 'I would not know' is an honest answer that you should immediately follow with what you would add now." }
      ],
      crack: "Where candidates crack: question two and question five. They present unilateral action as ownership, and they have no idea what happened to the thing afterwards — which is exactly the short-term thinking the principle exists to catch."
    }
  ],
  traps: [
    "Ownership stories that are actually 'I worked a weekend'. Hours are not ownership.",
    "Stepping into someone else's area and not telling them. Always include the communication step; if you did not do it, say that was the mistake.",
    "Not knowing the fate of the thing you owned. Find out before the interview if you can."
  ]
},

{
  n: 3, id: "lp-3", name: "Invent and Simplify",
  official: "Leaders expect and require innovation and invention from their teams and always find ways to simplify. They are externally aware, look for new ideas from everywhere, and are not limited by 'not invented here.' As we do new things, we accept that we may be misunderstood for long periods of time.",
  weight: "medium",
  testing: "Two separate things sharing one name. Invent: did you produce a genuinely new approach. Simplify: did you make something smaller, and were you willing to delete work. For SDE-1, simplification stories usually land better than invention stories because they are more believable.",
  strong: [
    "You removed code, steps, dependencies or process and the thing still worked",
    "You found an existing solution instead of building your own, and can say why that was the right call",
    "You automated something repetitive and can state the time saved",
    "You reframed a problem so the hard part disappeared rather than solving the hard part",
    "You can articulate the complexity you deliberately did not add"
  ],
  weak: [
    "'Invention' that is just using a library or framework for the first time",
    "Building something from scratch that already existed, described as innovation — this fails simplification even if the code is impressive",
    "A clever solution with no explanation of why the simple one was insufficient",
    "Complexity presented as sophistication"
  ],
  fresher: "The most credible fresher story here is automation of something you were doing by hand, or replacing a complicated approach of your own with a simpler one after you understood the problem better. 'I initially built X with three services and realised it could be one function' is an excellent answer because it contains both invention and the humility to delete your own work.",
  example: {
    title: "Deleting my own abstraction",
    text: "I had built a plugin system for my project so that new data sources could be added without touching core code. It was about 400 lines with a registry, an interface and a loader. Six months in, we had added exactly two data sources and both of them needed core changes anyway because the abstraction did not fit what they actually required. I had built for a future that did not arrive. I deleted the whole thing and replaced it with a switch statement and two functions, about 40 lines. Onboarding a third source later took an afternoon rather than a day of fighting the framework. The uncomfortable part was that it was my own design and I had defended it in review, so deleting it meant saying out loud that I had been wrong about what we would need."
  },
  questions: [
    "Tell me about a time you invented something.",
    "Describe the most innovative thing you have built.",
    "Tell me about a time you simplified a complex process.",
    "Give an example of solving a problem in a way nobody had tried.",
    "Tell me about a time you eliminated work rather than doing it.",
    "Describe a time you used an existing solution instead of building your own.",
    "Tell me about a time your idea was misunderstood or rejected at first."
  ],
  drills: [
    { opener: "Tell me about a time you simplified something.",
      chain: [
        { q: "Why was it complicated in the first place?", why: "If you built the complexity yourself, saying so is a strong answer, not a weak one. If someone else did, be careful not to make it a criticism of them." },
        { q: "What did you have to give up to make it simpler?", why: "Simplification always costs something — flexibility, a feature, generality. A candidate who claims pure gain has not thought about it." },
        { q: "Did anyone object?", why: "Deleting code, especially someone else's, usually meets resistance. How you handled it is Earn Trust and Backbone." },
        { q: "How do you decide when something is too simple?", why: "A judgement question with no story attached. They want a principle from you: I add complexity when there is a second real case, not an imagined one." },
        { q: "Has anything gone wrong since because of the simplification?", why: "Testing intellectual honesty. If you do not know, say you do not know." }
      ],
      crack: "Where candidates crack: question two. 'It was better in every way' is not a credible engineering claim and the interviewer knows it."
    }
  ],
  traps: [
    "Presenting the use of a well-known tool as invention.",
    "Confusing 'complicated' with 'sophisticated' in the story you choose to tell.",
    "Having no answer for what the simplification cost."
  ]
},

{
  n: 4, id: "lp-4", name: "Are Right, A Lot",
  official: "Leaders are right a lot. They have strong judgment and good instincts. They seek diverse perspectives and work to disconfirm their beliefs.",
  weight: "high",
  testing: "Counter-intuitively, this is mostly probed through times you were WRONG. The second half of the principle is the part that scores: did you seek out views that disagreed with yours, and did you actively try to prove yourself wrong rather than gather support.",
  strong: [
    "You changed your mind when you got new information, and you say so plainly",
    "You went and asked someone likely to disagree with you, on purpose",
    "You ran a small test to check a belief instead of arguing about it",
    "You state your confidence honestly — 'I was about 70% sure, so I built the cheap version first'",
    "You describe how you found out you were wrong and how fast you turned"
  ],
  weak: [
    "Every story ends with you being right",
    "'I was wrong' followed immediately by a reason it was really someone else's fault",
    "Seeking perspectives means you told people your plan, not that you invited disagreement",
    "Confidence with no calibration — treating a guess and a measured result the same way"
  ],
  fresher: "Use a technical decision you got wrong: a data structure that did not scale, an architecture you had to redo, a library you picked badly, an estimate you missed by double. What scores is the mechanism by which you found out and how quickly you changed course. If you were wrong for three months because you never checked, that is the interesting part and you should say it.",
  example: {
    title: "The 70% decision",
    text: "I was convinced our slowness was in the database and I was about to spend a week denormalising the schema. Before doing that I spent an afternoon adding timing to each layer, mostly because a senior on the team asked me flatly how I knew. It turned out the database was 12% of the request time and the rest was a synchronous call to an external API that we did not need to make on that path. If I had gone with my instinct I would have spent a week making the 12% faster. What I took from it is that I now write down what I expect to see before I measure, so I find out when my model of the system is wrong rather than only when it is right."
  },
  questions: [
    "Tell me about a time you were wrong. How did you find out, and what did you do?",
    "Describe a decision you made with incomplete information.",
    "Tell me about a time you had to change your mind.",
    "Give an example of a decision you made that turned out badly.",
    "How do you make decisions when you and your team disagree?",
    "Tell me about a time you sought out an opinion that contradicted yours.",
    "Describe a judgement call you are proud of.",
    "What is a strongly held technical opinion you have changed?"
  ],
  drills: [
    { opener: "Tell me about a time you were wrong.",
      chain: [
        { q: "How long were you wrong before you found out?", why: "The real question. A day is a system working. Six months means you had no mechanism for being corrected, which is the actual finding." },
        { q: "What would have made you find out sooner?", why: "They want a process change, not an apology. 'I should have measured before deciding' is the shape of the right answer." },
        { q: "Did anyone tell you at the time that you were wrong?", why: "A trap with two exits. If yes, why did you not listen — and were you dismissive. If no, why did nobody feel able to tell you." },
        { q: "What did it cost?", why: "Quantify it. Two wasted weeks, a missed deadline, a rollback. Candidates who cannot name a cost are usually describing a hypothetical mistake, not a real one." },
        { q: "Give me another one.", why: "The genuinely nasty follow-up, and it is common. One prepared failure story is not evidence of self-awareness. Have three." }
      ],
      crack: "Where candidates crack: the last question. Almost everyone prepares exactly one failure story. Prepare three, from different contexts, with different kinds of mistake — a technical misjudgement, a communication failure, and an estimate you blew."
    },
    { opener: "How do you decide when you do not have enough data?",
      chain: [
        { q: "Give me a specific instance.", why: "Abstract questions are almost always followed by a demand for a concrete story. Never answer only in generalities." },
        { q: "What was the cheapest way you could have been wrong?", why: "Testing whether you think in terms of reversibility — which is the bridge into Bias for Action." },
        { q: "What would have changed your mind?", why: "If nothing would have, you were not making a judgement, you were asserting. Name the evidence you were watching for." }
      ],
      crack: "Where candidates crack: they answer the abstract question well and then have no story. Every principled answer needs a story attached and ready."
    }
  ],
  traps: [
    "Only having one failure story.",
    "A 'failure' that is secretly a success — 'I was wrong that it would take two weeks, it only took one'. Interviewers see this immediately and it damages Earn Trust.",
    "Being wrong for a long time and not treating that duration as the problem."
  ]
},

{
  n: 5, id: "lp-5", name: "Learn and Be Curious",
  official: "Leaders are never done learning and always seek to improve themselves. They are curious about new possibilities and act to explore them.",
  weight: "medium",
  testing: "The operative word in the principle is 'act'. Reading about something is not the principle; doing something because of what you read is. For freshers this is one of the easier principles to evidence well.",
  strong: [
    "You learned something specifically because a problem demanded it, and you shipped with it",
    "You went deeper than the task required because you wanted to understand why",
    "You taught it to someone else afterwards, or wrote it up",
    "You explored something with no immediate payoff and it later mattered",
    "You can explain what you learned at a level that shows you actually understand it"
  ],
  weak: [
    "A list of courses and certifications with no output",
    "'I am always learning new technologies' with no example",
    "Learning that stopped at the tutorial",
    "Curiosity with no action attached to it"
  ],
  fresher: "This is one of the two or three principles where a fresher can beat an experienced candidate outright. Use something you learned outside the syllabus and then actually used, or a rabbit hole you went down because a bug made no sense. Be ready to be tested on the technical content — if you claim you learned about database indexing, expect to be asked how a B+ tree works. Do not claim depth you do not have.",
  example: {
    title: "The bug that did not make sense",
    text: "A test in our project failed roughly one run in twenty and everyone's response was to re-run it. That bothered me more than it should have. I spent a weekend reading about how our test framework parallelised, and then about how the language's memory model handles visibility between threads, which I had never properly understood. The cause was two tests sharing a static counter with no synchronisation. The fix was four lines. But I then wrote a page explaining the failure and the underlying visibility issue and put it in the team wiki, because I was fairly sure I was not the only person who did not know it. Two people told me later that it explained a different bug for them."
  },
  questions: [
    "Tell me about something new you learned recently and what you did with it.",
    "Describe a time you had to learn something quickly to complete a task.",
    "Tell me about a time your curiosity led to something useful.",
    "How do you stay current with technology?",
    "Tell me about a time you sought out work outside your comfort zone.",
    "Describe something you taught yourself that was not required.",
    "What is the most interesting thing you have learned in the last six months?"
  ],
  drills: [
    { opener: "Tell me about something you taught yourself recently.",
      chain: [
        { q: "Explain it to me now.", why: "The obvious follow-up that people are still surprised by. Everything you claim to have learned is fair game for a technical question. Only claim what you can defend." },
        { q: "Why that, and why then?", why: "Looking for a trigger. Curiosity driven by a real problem is more credible than curiosity in the abstract." },
        { q: "What did you do with it?", why: "The 'act to explore' clause. Learning with no output does not score." },
        { q: "What did you find hard about it, and what do you still not understand?", why: "Excellent question and a gift if you are honest. Naming the edge of your own understanding is a strong Earn Trust signal. Claiming you found it all straightforward is not." }
      ],
      crack: "Where candidates crack: question one. They name an impressive-sounding topic and then cannot go two levels deep on it. Pick something you genuinely know."
    }
  ],
  traps: [
    "Claiming to have learned something you cannot be interviewed on.",
    "Listing certifications instead of describing an application.",
    "Saying 'I read a lot of blogs' — this is not action."
  ]
},

{
  n: 6, id: "lp-6", name: "Hire and Develop the Best",
  official: "Leaders raise the performance bar with every hire and promotion. They recognize exceptional talent, and willingly move them throughout the organization. Leaders develop leaders and take seriously their role in coaching others.",
  weight: "low-for-sde1",
  testing: "For an SDE-1 this is rarely a primary principle, but it does get asked and having nothing is worse than having something small. They are looking for whether you make the people around you better.",
  strong: [
    "You mentored someone specifically and can describe how they improved",
    "You gave feedback that was uncomfortable to give and it helped",
    "You wrote documentation or onboarding that made the next person faster",
    "You noticed someone was struggling and did something about it",
    "You asked for feedback on yourself and acted on it"
  ],
  weak: [
    "'I helped my teammates' with no specifics about what changed for them",
    "Coaching described entirely as doing the work for them",
    "No examples at all — this reads as never having looked outward"
  ],
  fresher: "You do not need reports. Use: a junior or first-year you mentored, someone you onboarded onto your project, a teammate you paired with who was stuck, a TA or teaching role, a workshop you ran, code review comments you gave that improved someone's work, or onboarding documentation you wrote. Interview prep help for a friend counts if you can describe what you actually taught them.",
  example: {
    title: "The teammate who kept getting stuck",
    text: "A second-year joined our project team and kept going quiet for days at a time and then producing something that had to be redone. My first instinct was to just take the tasks back. Instead I asked him what was happening and it turned out he was afraid that asking questions would look like he could not do it. We agreed on a rule: if he was stuck for more than 45 minutes, he would message me, no judgement either way. I also started explaining my reasoning in review comments instead of just saying what to change. Over about six weeks his rework rate dropped from most tasks to almost none, and he started answering other people's questions in the group. The thing I got wrong initially was assuming it was a skill problem when it was a safety problem."
  },
  questions: [
    "Tell me about a time you mentored someone.",
    "Describe a time you gave someone difficult feedback.",
    "Tell me about a time you helped a struggling teammate.",
    "How do you help people around you improve?",
    "Tell me about feedback you received that was hard to hear.",
    "Describe a time you recognised someone's potential."
  ],
  drills: [
    { opener: "Tell me about a time you helped someone improve.",
      chain: [
        { q: "How did you know they needed help?", why: "Did you notice, or did they ask, or did someone tell you. Noticing scores highest." },
        { q: "What exactly did you say?", why: "They want the actual words, especially for difficult feedback. Vagueness here suggests the conversation was softer than described." },
        { q: "How did they react?", why: "If it went perfectly, it probably was not difficult feedback. Real ones are awkward." },
        { q: "How do you know it worked?", why: "Metric again, in human form. Rework rate, review comments, speed, confidence." },
        { q: "Tell me about a time you gave feedback and it did not work.", why: "The reversal. Very commonly asked immediately after the success story." }
      ],
      crack: "Where candidates crack: question two. 'I told him to be more careful' is not feedback and the interviewer will note that."
    }
  ],
  traps: [
    "Helping by silently doing their work, which is the opposite of developing them.",
    "Having no story at all — prepare something small rather than nothing."
  ]
},

{
  n: 7, id: "lp-7", name: "Insist on the Highest Standards",
  official: "Leaders have relentlessly high standards — many people may think these standards are unreasonably high. Leaders are continually raising the bar and drive their teams to deliver high quality products, services, and processes. Leaders ensure that defects do not get sent down the line and that problems are fixed so they stay fixed.",
  weight: "high",
  testing: "Whether you refuse to ship something you know is not good enough, and crucially whether you fix root causes rather than symptoms. The phrase 'fixed so they stay fixed' is the part interviewers probe.",
  strong: [
    "You delayed or blocked something because the quality was not there, and you can justify the cost",
    "You fixed a root cause when a patch would have been faster and nobody would have known",
    "You added tests, monitoring, or a process so the same class of bug could not recur",
    "You raised a standard for others — a review checklist, a lint rule, a definition of done",
    "You caught your own defect before it went out and owned it"
  ],
  weak: [
    "Perfectionism with no delivery — this fails Deliver Results and Bias for Action simultaneously",
    "High standards you only applied to other people's work",
    "'I always write clean code' with no instance",
    "Fixing the symptom and describing it as fixing the problem"
  ],
  fresher: "A good fresher story: you found a bug in your own work after it was already accepted, and you raised it and fixed it rather than staying quiet. Or you noticed the same bug type recurring and added something that made it impossible. Or you refused to submit something you knew was fragile and said why.",
  example: {
    title: "Fixing it so it stays fixed",
    text: "We had a bug where a particular date format from one client broke parsing. The fix that was suggested in review was a special case for that format, about three lines. I pushed back because we had already added two special cases in the previous month, which told me the real problem was that we were parsing dates by pattern-matching strings at four different places in the codebase. I spent a day consolidating it into one function with explicit format handling and wrote tests covering all the formats we had ever seen, including the two earlier special cases which I then deleted. It took a day instead of ten minutes. We have not had a date parsing bug since, and I could point to two that would have happened."
  },
  questions: [
    "Tell me about a time your standards were higher than your team's.",
    "Describe a time you were not satisfied with the status quo.",
    "Tell me about a time you refused to ship something.",
    "Give an example of when you improved the quality of a product or process.",
    "Tell me about a time you found a defect that others had missed.",
    "Describe a time you had to choose between shipping on time and shipping well.",
    "Tell me about the highest quality work you have produced."
  ],
  drills: [
    { opener: "Tell me about a time your standards were higher than everyone else's.",
      chain: [
        { q: "What did that cost the team?", why: "Testing whether you understand that standards have a price. If it cost nothing, the standard was not high." },
        { q: "How did the others react?", why: "This is where it becomes an Earn Trust question. Insisting on standards while making people feel judged is a failure mode they watch for." },
        { q: "Was there a point where you should have let it go?", why: "The sharpest question here. They are checking whether you can distinguish a standard worth holding from perfectionism. A good answer names the line you use." },
        { q: "Tell me about a time you shipped something you knew was not perfect.", why: "The direct reversal, and it is testing whether you can also do Bias for Action and Deliver Results. Both answers must exist in you." },
        { q: "How did you make sure the problem stayed fixed?", why: "The literal wording of the principle. Test, alert, lint rule, checklist, deleted code path — name the mechanism." }
      ],
      crack: "Where candidates crack: question four. Someone who has only ever insisted on quality and never made a deliberate trade-off comes across as unable to ship."
    }
  ],
  traps: [
    "Standards applied outward only. Include one where you caught yourself.",
    "Being unable to name the cost of the standard you held.",
    "Patching without addressing recurrence, then calling it high standards."
  ]
},

{
  n: 8, id: "lp-8", name: "Think Big",
  official: "Thinking small is a self-fulfilling prophecy. Leaders create and communicate a bold direction that inspires results. They think differently and look around corners for ways to serve customers.",
  weight: "medium",
  testing: "Whether you can see past the task in front of you to what the thing could become, and whether you can bring people with you. For SDE-1 they are not expecting company strategy; they want evidence that you have proposed something more ambitious than what was asked.",
  strong: [
    "You proposed something larger than your assignment and can explain the reasoning",
    "You built for a scale or a use case that had not arrived yet, with justification for why",
    "You convinced others to take a bigger swing",
    "You can articulate a vision for something you worked on beyond its current state",
    "Your idea was initially dismissed and you can describe how you kept it alive"
  ],
  weak: [
    "'Thinking big' that never left your head — no proposal, no attempt to convince anyone",
    "Over-engineering presented as vision, with no evidence the scale was ever plausible",
    "A vision with no first step",
    "Big only in words: 'revolutionise', 'disrupt', no substance"
  ],
  fresher: "Take a project you built and describe how you saw it as more than the assignment: you built the college event app so it could serve every club rather than only yours, or you designed the schema anticipating a use case you knew was coming. The credibility hinge is that you must explain why the bigger version was justified — otherwise it reads as over-engineering, which fails Invent and Simplify.",
  example: {
    title: "The assignment was one department",
    text: "I was asked to build an attendance tracker for one department, about 200 students. While gathering requirements I asked around and found three other departments doing the same thing with three different spreadsheets, and that the college had no single record. Building for one department was maybe two weeks. Building it multi-tenant with a role model and per-department configuration was closer to five. I made the case to the faculty coordinator with the specific number of duplicated hours across departments, and proposed shipping the single-department version first in two weeks so it was in use, then generalising. That mattered because it meant the bigger idea did not delay anything. Two departments were on it by the end of the semester and it is now used by four."
  },
  questions: [
    "Tell me about the biggest impact you have had.",
    "Describe a time you proposed something ambitious.",
    "Tell me about a time you thought beyond the immediate task.",
    "Give an example of a bold idea you had. What happened?",
    "Tell me about a time you had to convince others of a long-term vision.",
    "If you had unlimited resources, what would you have built instead?"
  ],
  drills: [
    { opener: "Tell me about a time you thought bigger than the task required.",
      chain: [
        { q: "Who did you have to convince, and how?", why: "A vision nobody heard is not this principle. They want the persuasion attempt." },
        { q: "What was the smallest first step?", why: "The best answer to Think Big always contains a Bias for Action element. Big vision, small first move." },
        { q: "How is that not over-engineering?", why: "The confrontational one, and it is asked often. Have the specific evidence that the larger need was real — the three departments, the actual growth number." },
        { q: "What if you had been wrong about the demand?", why: "Testing whether you sized the downside. A good answer names what you would have wasted and why that was acceptable." },
        { q: "What happened in the end?", why: "Follow-through. A big idea that went nowhere is fine if you can say why and what you learned." }
      ],
      crack: "Where candidates crack: question three. Without concrete evidence that the bigger version was needed, Think Big and over-engineering are indistinguishable, and the interviewer will score the latter."
    }
  ],
  traps: [
    "Vision with no evidence of demand.",
    "Vision with no first step or no delivery.",
    "Confusing scale of technology with scale of impact."
  ]
},

{
  n: 9, id: "lp-9", name: "Bias for Action",
  official: "Speed matters in business. Many decisions and actions are reversible and do not need extensive study. We value calculated risk taking.",
  weight: "critical",
  testing: "Explicitly named in the corpus as a Bar Raiser topic. They want to see that you can move without full information AND that you distinguish reversible decisions from irreversible ones. The word 'calculated' is doing a lot of work.",
  strong: [
    "You acted with maybe 70% of the information because waiting was worse, and you say why",
    "You classified the decision as reversible and can explain how you would undo it",
    "You shipped something small to learn instead of debating",
    "You set a deadline on the decision itself — 'I gave myself a day to investigate, then I would pick'",
    "You limited the blast radius: a flag, a canary, one customer, a rollback plan"
  ],
  weak: [
    "Recklessness with no risk assessment, presented as decisiveness",
    "Acting fast on something genuinely irreversible without escalating",
    "'I always move fast' — the principle is about judgement, not speed as a personality",
    "No mention of what you would do if it went wrong"
  ],
  fresher: "A deadline story works well: you had limited time, chose the approach you could finish and verify over the one that was theoretically better, and can explain the trade. The chat-app example in the STAR section above is exactly this shape. Make sure you explicitly say what made it reversible.",
  example: {
    title: "The two-hour fix instead of the five-day one",
    text: "Two days before a demo, reads were taking nearly two seconds. The correct long-term fix was moving off polling to WebSockets, which I estimated at four or five days. I did not have four days. I picked the index-plus-incremental-fetch approach, which was about two hours, because it attacked the actual cause and — this is the part that made it an easy call — it was fully reversible. It was one migration and one query change; if it had made things worse I could have dropped the index and reverted in ten minutes. I measured before and after rather than assuming. Median read time went from 1.9 seconds to 40 milliseconds. I did the WebSockets migration the following month, when the cost of being wrong was lower."
  },
  questions: [
    "Tell me about a time you made a decision without all the data you wanted.",
    "Describe a time you had to act quickly.",
    "Tell me about a calculated risk you took.",
    "Give an example of when you moved fast and it went wrong.",
    "How do you decide when you have enough information?",
    "Tell me about a time you had to make a decision under a tight deadline.",
    "Describe a time you chose speed over perfection."
  ],
  drills: [
    { opener: "Tell me about a time you made a decision without all the information.",
      chain: [
        { q: "What information were you missing, specifically?", why: "Forces precision. 'I did not have enough data' is not an answer; 'I did not know the read:write ratio in production' is." },
        { q: "What was the cost of waiting?", why: "This is what makes speed justified rather than impatient. Name the cost." },
        { q: "Was the decision reversible?", why: "The central question of this principle. If yes, say how you would have undone it. If no, they will ask why you did not escalate." },
        { q: "How did you limit the damage if you were wrong?", why: "Feature flag, canary, small cohort, rollback plan, a checkpoint at which you would reassess. Any of these is a strong answer." },
        { q: "Tell me about a time moving fast was the wrong call.", why: "Almost always asked as the pair. Have it ready — a time you shipped too early and paid for it, and what rule you took away." }
      ],
      crack: "Where candidates crack: question three. They have never thought about reversibility as a category, so they cannot explain why speed was appropriate here specifically rather than as a general preference."
    }
  ],
  traps: [
    "Not having the counter-story where speed was wrong.",
    "Describing speed with no risk management, which reads as reckless.",
    "Treating an irreversible decision casually."
  ]
},

{
  n: 10, id: "lp-10", name: "Frugality",
  official: "Accomplish more with less. Constraints breed resourcefulness, self-sufficiency, and invention. There are no extra points for growing headcount, budget size, or fixed expense.",
  weight: "medium",
  testing: "Whether constraint makes you resourceful or stuck. Rarely about literal money for an SDE-1 — it is about time, people, compute, and being willing to use the cheap thing that works.",
  strong: [
    "You delivered under a real constraint and the constraint shaped the solution",
    "You used existing tooling, free tiers, or a simpler approach instead of asking for more",
    "You reduced a cost — compute, build time, engineering hours — with a number attached",
    "You solved it alone when asking for help would have been slower for everyone",
    "You chose the boring cheap solution over the exciting expensive one and can justify it"
  ],
  weak: [
    "Frugality as cutting corners on quality — that fails Highest Standards",
    "'We had no budget so we could not do it' — the principle is about what constraint enabled",
    "No constraint actually present in the story"
  ],
  fresher: "You almost certainly have strong material here and may not realise it. Student projects run on free tiers, borrowed hardware, no budget and no team. Training a model on Colab because you had no GPU, running your app on a free instance and optimising because you had 512MB of RAM, doing the work of three people because three people did not exist — these are genuine frugality stories. Say the constraint plainly and say what it forced you to invent.",
  example: {
    title: "512 megabytes",
    text: "My project ran on a free tier instance with 512MB of RAM and it kept getting killed by the OOM killer during data imports. The obvious answer was to pay for a bigger instance, which I could not do. So I had to actually understand the memory profile. I was loading the entire CSV into memory before processing. I rewrote it to stream row by row and batch the inserts in groups of 500. Peak memory went from about 400MB to under 40MB, and as a side effect the import got faster because we were no longer building an enormous list. The constraint is the only reason I learned how streaming and batching actually work — if I had been able to throw a bigger instance at it, I would have shipped something that would have broken again at ten times the data."
  },
  questions: [
    "Tell me about a time you accomplished something with limited resources.",
    "Describe a time a constraint led to a better solution.",
    "Tell me about a time you had to do more with less.",
    "Give an example of reducing cost or effort.",
    "Tell me about a time you did not have the tools or people you needed."
  ],
  drills: [
    { opener: "Tell me about a time you did more with less.",
      chain: [
        { q: "What would you have done with unlimited resources?", why: "Testing whether the constrained solution was actually worse or actually better. The strongest answers say the constrained one was better and explain why." },
        { q: "What did you give up?", why: "Frugality has a cost too. Name it honestly." },
        { q: "Did quality suffer?", why: "The trap where Frugality and Highest Standards collide. If it did, say where and say whether that was the right call." },
        { q: "Would that solution survive ten times the load?", why: "Extending it. Do not oversell; say where it would break and what you would change first." }
      ],
      crack: "Where candidates crack: question one. If unlimited resources would have produced something strictly better in every way, the story is about coping with a limitation, not about frugality breeding invention."
    }
  ],
  traps: [
    "Confusing 'we had no money' with resourcefulness.",
    "Frugality stories where the corner cut was correctness."
  ]
},

{
  n: 11, id: "lp-11", name: "Earn Trust",
  official: "Leaders listen attentively, speak candidly, and treat others respectfully. They are vocally self-critical, even when doing so is awkward or embarrassing. Leaders benchmark themselves and their teams against the best.",
  weight: "critical",
  testing: "This one is scored continuously through the whole interview, not only from its questions. How you speak about people who are not in the room is the strongest signal you give all day. 'Vocally self-critical' is not decoration — it is the explicit standard.",
  strong: [
    "You admitted a mistake before anyone found it, especially an embarrassing one",
    "You gave someone credit publicly",
    "You delivered bad news early rather than hoping it would resolve",
    "You rebuilt a relationship after damaging it",
    "You describe a disagreement without any trace of contempt for the other person",
    "You changed your position because someone else's argument was better, and you say so"
  ],
  weak: [
    "Any sentence that makes a former teammate, manager or professor the villain",
    "Mistakes that are always partly someone else's",
    "Trust described as being liked",
    "Hiding a problem until it was unavoidable",
    "Answers that are entirely self-promotional with no self-criticism anywhere in the loop"
  ],
  fresher: "Two reliable sources: a time you broke something and told people immediately, and a time you were behind on a commitment and said so early instead of at the deadline. Both are ordinary and both score well because most candidates avoid them. The bar is low and almost nobody clears it, because admitting fault feels risky in an interview — it is not.",
  example: {
    title: "Telling them before they found out",
    text: "I pushed a migration that dropped a column that was still being read by one endpoint we had all forgotten about. It broke for about twenty minutes in the evening. Nobody had noticed yet. I could have restored it quietly and said nothing. I reverted, then posted in the team channel exactly what I had done, what broke, who was affected and why it happened — I had checked which code referenced the column but only searched the main service and not the reporting one. Then I added that search to the migration checklist so the next person would not repeat it. My lead's reaction was mostly relief that I had said something. The awkward part was that it was a careless mistake and writing it down in public felt worse than the outage did."
  },
  questions: [
    "Tell me about a time you earned the trust of a group.",
    "Describe a time you made a mistake. How did you handle it?",
    "Tell me about a time you had to deliver bad news.",
    "Give an example of when you had to build a relationship with someone difficult.",
    "Tell me about a time you were vocally self-critical.",
    "Describe a time you lost someone's trust and had to rebuild it.",
    "Tell me about a time you took the blame for something."
  ],
  drills: [
    { opener: "Tell me about a mistake you made.",
      chain: [
        { q: "Who found out first?", why: "The decisive question. You telling them scores far above them finding out." },
        { q: "How long between you knowing and you telling?", why: "Minutes is good. A day needs a very good reason. A week is a finding." },
        { q: "What was the impact on other people?", why: "Testing whether you thought past your own embarrassment to the people affected." },
        { q: "Was anyone else responsible?", why: "A trap, and a good one. There usually was a contributing factor — a missing test, an unclear spec — but reaching for it now reads as deflection. Own your part fully first; mention the systemic factor only as something you fixed." },
        { q: "What did you change so it cannot happen again?", why: "The bridge to Highest Standards. Name the mechanism." }
      ],
      crack: "Where candidates crack: question four. The instinct to share the blame is very strong and it is the single most damaging thing you can do in an LP round."
    },
    { opener: "Tell me about a conflict you had with a teammate.",
      chain: [
        { q: "What was their argument?", why: "You must be able to state their position fairly and strongly. If you cannot, you were not listening and the interviewer will conclude that." },
        { q: "What was your part in the conflict?", why: "Any answer that is 'nothing, they were being unreasonable' fails. There is always a part." },
        { q: "How did it end?", why: "Resolution matters. An unresolved conflict you are still annoyed about is visible in your voice." },
        { q: "How is your relationship with them now?", why: "Checking whether trust was rebuilt or the person was simply written off." }
      ],
      crack: "Where candidates crack: question one. Being unable to articulate the other side's reasoning is the tell that you never engaged with it."
    }
  ],
  traps: [
    "Speaking badly about anyone, at all, at any point in the day. This is scored even when it is not the question.",
    "Having no self-critical moment anywhere across the whole loop.",
    "Sharing blame when asked to own a mistake."
  ]
},

{
  n: 12, id: "lp-12", name: "Dive Deep",
  official: "Leaders operate at all levels, stay connected to the details, audit frequently, and are skeptical when metrics and anecdote differ. No task is beneath them.",
  weight: "critical",
  testing: "The most technically probeable principle, and the one that overlaps most with your coding rounds. They want a story where you went past the obvious explanation to the actual cause, and they will test the depth of your understanding as you tell it. Directly relevant to the project deep-dive round, where the Feb 2026 candidate spent 40 minutes being drilled on architecture, storage, edge cases and failure modes.",
  strong: [
    "You found a root cause that was not the obvious one",
    "You went to the data instead of accepting a summary",
    "You noticed that a metric and what people were saying disagreed, and you dug into why",
    "You read the source, the logs, the query plan, the network trace — rather than guessing",
    "You can still explain the mechanism in detail months later",
    "You did tedious work yourself because it was the fastest way to know"
  ],
  weak: [
    "'I debugged it and fixed it' with no detail about how",
    "Accepting the first plausible explanation",
    "You cannot answer technical follow-ups on your own story",
    "You describe a system you worked on and cannot say how a core part of it works"
  ],
  fresher: "This is where your project deep-dive lives, and it is the single most valuable thing you can prepare after your STAR stories. Pick your best project and be able to go five layers down on any part of it: why that database, what happens on a concurrent write, what the slowest query is, what breaks first at ten times the load, what you would change. Interviewers in the corpus pivoted entire rounds into project discussion — treat it as a guaranteed 30-40 minutes.",
  example: {
    title: "The metric and the anecdote disagreed",
    text: "Our dashboard said average response time was 180ms, which was fine, but two users kept saying the app felt slow. The easy conclusion was that they were on bad connections. I did not want to accept that without checking, so I pulled the raw request logs for a day instead of the aggregate and plotted the distribution rather than the mean. The median was 90ms but the 99th percentile was over 4 seconds, and every one of those slow requests hit the same endpoint. That endpoint fetched a list and then made one database call per item — the N+1 problem — so it was fast for users with a few items and terrible for users with hundreds. The two people complaining were our heaviest users. I replaced it with a single join. p99 went from 4.1 seconds to 210ms. What stuck with me is that the average had been actively hiding the problem, and that the two anecdotes were better data than the metric was."
  },
  questions: [
    "Tell me about a time you had to dive deep to solve a problem.",
    "Describe the most complex problem you have debugged.",
    "Tell me about a time the data told a different story than people did.",
    "Give an example of finding a root cause others missed.",
    "Tell me about a time you had to learn a system you did not build.",
    "How do you make sure you understand a problem before solving it?",
    "Walk me through your project. (Then five layers of follow-up.)"
  ],
  drills: [
    { opener: "Tell me about a time you dove deep into a problem.",
      chain: [
        { q: "Walk me through exactly how you diagnosed it, step by step.", why: "They want the sequence — hypothesis, measurement, result, next hypothesis. Candidates who actually did it can narrate it; candidates who did not, summarise." },
        { q: "What was your first hypothesis and why was it wrong?", why: "Almost nobody gets it first try. Admitting the wrong turn makes the rest credible." },
        { q: "Why did it behave that way? Explain the underlying mechanism.", why: "The technical depth check. Why does N+1 hurt, why does an average hide a tail, why does that lock cause that stall. Know the layer beneath your fix." },
        { q: "How would you have caught it earlier?", why: "Moving from debugging to prevention. Instrumentation, alerting on p99 rather than mean, a test." },
        { q: "What else in that system has the same problem?", why: "Excellent and hard. Did you generalise the finding or fix only the instance in front of you?" },
        { q: "What is the slowest part of that system today?", why: "Asked about your own project constantly. If you do not know, you have not dived deep — say what you would measure to find out." }
      ],
      crack: "Where candidates crack: question three. They know what they changed but not why the original behaviour occurred, which reveals the fix was found by trial and error and described afterwards as investigation."
    }
  ],
  traps: [
    "Describing a project you cannot answer detailed questions about. Only put things on your résumé you can defend for ten minutes.",
    "Fixing the instance and never asking where else the same pattern exists.",
    "Accepting an aggregate number without ever looking at the distribution."
  ]
},

{
  n: 13, id: "lp-13", name: "Have Backbone; Disagree and Commit",
  official: "Leaders are obligated to respectfully challenge decisions when they disagree, even when doing so is uncomfortable or exhausting. Leaders have conviction and are tenacious. They do not compromise for the sake of social cohesion. Once a decision is determined, they commit wholly.",
  weight: "critical",
  testing: "Named in the corpus as an SDE-2 onsite question ('a disagreement you had'). This is two halves and most candidates only prepare the first. The backbone half: did you challenge, with data, uncomfortably. The commit half: when the decision went against you, did you execute it properly or did you sulk and hedge.",
  strong: [
    "You disagreed with someone more senior and did it directly and respectfully",
    "You brought data rather than opinion",
    "You lost the argument, then committed fully and helped make it succeed",
    "You escalated appropriately when it mattered enough",
    "You can say plainly which of you turned out to be right, including when it was not you"
  ],
  weak: [
    "You disagreed and then quietly did it your own way — this is the worst possible answer here",
    "You disagreed, lost, and then withheld effort or said 'I told you so' later",
    "You never disagreed with anyone, ever, which reads as no backbone at all",
    "The disagreement was with a peer over something trivial — pick one with stakes",
    "Disagreement described in a way that makes the other person look foolish"
  ],
  fresher: "You can absolutely disagree with a professor, a team lead, a senior in a hackathon team or a mentor. Choose one where you were the more junior person, because that is the version being tested. If the honest truth is you were overruled, that is the better story — the commit half is where most people lose marks and where you can win them.",
  example: {
    title: "I lost and then made it work",
    text: "My team lead wanted to store our event data as JSON blobs in a single column because it was faster to build and the schema was still changing. I disagreed — I thought we would need to query by individual fields within a month and that we would end up doing it in application code. I did not just assert it; I wrote out the five queries I expected product to ask for within the quarter and showed what each would cost against a blob. He still went with JSON, because his point was that we did not yet know which fields would matter and a wrong schema would be more expensive to change than a blob. So I committed to it. I did not hedge or build a shadow version. I did add one thing we agreed on: a small extraction layer so that when we did need columns, the change would be in one place. About two months later we needed to filter by two fields, and because of that layer the migration took a day. I still think an earlier schema would have been slightly better, but his read on the uncertainty was more right than mine was."
  },
  questions: [
    "Tell me about a time you disagreed with your manager.",
    "Describe a time you had to push back on a decision.",
    "Tell me about a time you disagreed, lost, and had to commit.",
    "Give an example of when you had conviction about something unpopular.",
    "Tell me about a time you challenged the status quo.",
    "Describe a time you had to say something uncomfortable.",
    "Tell me about a time you were overruled. What did you do next?"
  ],
  drills: [
    { opener: "Tell me about a time you disagreed with your manager or team lead.",
      chain: [
        { q: "What exactly did you say to them?", why: "They want the words. Tone is being scored — respectful and direct, not aggressive and not hedged into meaninglessness." },
        { q: "What data did you bring?", why: "Opinion versus evidence. 'I thought it was a bad idea' scores far below 'I wrote out the five queries and what each would cost'." },
        { q: "What was their reasoning?", why: "You must be able to state it fairly. If their position sounds stupid in your telling, the interviewer assumes you never understood it." },
        { q: "What happened after the decision was made?", why: "The commit half. This is the question people are least prepared for. Describe concretely how you supported a decision you disagreed with." },
        { q: "Did you ever bring it up again?", why: "A trap. Revisiting with new data is fine and good; revisiting to be proved right is not. Say which one you did." },
        { q: "Who turned out to be right?", why: "If you were, do not gloat — say what their concern was that you had underweighted. If they were, say so plainly, which is the strongest available answer." }
      ],
      crack: "Where candidates crack: question four. Most people have a disagreement story and no commit story, so they trail off after 'and then we went with their approach'. Prepare the second half in as much detail as the first."
    },
    { opener: "Have you ever disagreed and been proven right?",
      chain: [
        { q: "How did you handle being right?", why: "The actual test. Graciousness here is worth more than the correctness." },
        { q: "Did the relationship survive?", why: "Earn Trust, checked from a different angle." },
        { q: "Now tell me one where you were wrong.", why: "Almost always follows. Have it." }
      ],
      crack: "Where candidates crack: they enjoy this question too much and the satisfaction is audible."
    }
  ],
  traps: [
    "Having no disagreement story. 'I get along with everyone' reads as no backbone and is a rejection-level answer for this principle.",
    "Having no commit story.",
    "Disagreeing by going around the person rather than to them."
  ]
},

{
  n: 14, id: "lp-14", name: "Deliver Results",
  official: "Leaders focus on the key inputs for their business and deliver them with the right quality and in a timely fashion. Despite setbacks, they rise to the occasion and never settle.",
  weight: "critical",
  testing: "Did it actually ship, and did you push through something that went wrong on the way. This is the principle where numbers matter most. It is also where interviewers most often catch inflation, because results are checkable in a way that feelings are not.",
  strong: [
    "You shipped, and you can state what changed as a number",
    "Something went badly wrong mid-way and you delivered anyway",
    "You descoped deliberately to hit a date, and can defend what you cut",
    "You can name the one or two inputs that actually drove the outcome",
    "You know what happened to the thing after delivery"
  ],
  weak: [
    "Effort without an outcome — 'we worked really hard on it'",
    "No numbers anywhere",
    "The result is a grade, a compliment, or 'the client was happy'",
    "Everything went smoothly, which means there is no story",
    "You cannot say what you would have cut if you had had half the time"
  ],
  fresher: "Anything you finished and put in front of real users. State the number even when it is small: 400 users, 12 clubs, 3,000 records processed a day, 40% fewer support requests. Small and specific beats large and vague. If a project failed to ship, that can still be a strong answer if you own why and say what you would do differently — but have at least two that did ship.",
  example: {
    title: "The week the API changed under us",
    text: "We committed to shipping the results feature for the fest by a fixed date, because the fest does not move. Nine days out, the third-party API we were pulling scores from changed its response format without notice and our integration broke completely. I had two options: rewrite against the new format, which was uncertain because their docs were not updated, or build a manual entry path as a fallback. I did both, in that order of priority, and I set myself a checkpoint at day four: if the API integration was not working by then, I would stop and finish the manual path. It was not working by day four, so I stopped. We shipped on time with manual entry for 14 events, which was more work for two volunteers but the feature existed. I got the API version working eleven days after the fest and it has been automatic since. The thing I would change is that we had no contract test against that API, so we found out from a broken build rather than from a monitor."
  },
  questions: [
    "Tell me about your most significant achievement.",
    "Describe a time you had to deliver under a tight deadline.",
    "Tell me about a time you faced a major setback but still delivered.",
    "Give an example of a goal you did not meet.",
    "Tell me about a time you had to cut scope.",
    "Describe a project you are most proud of and what it achieved.",
    "Tell me about a time you had to push through when things were going badly."
  ],
  drills: [
    { opener: "Tell me about your most significant achievement.",
      chain: [
        { q: "What was the measurable outcome?", why: "First and always. If you have no number, the achievement is unverifiable and will be scored down." },
        { q: "What was your specific contribution versus the team's?", why: "The 'we' problem, asked directly. Have your part cleanly separated in advance." },
        { q: "What went wrong along the way?", why: "A story with no setback is a story with no content. If you say nothing went wrong, they will not believe you." },
        { q: "What did you cut, and what nearly did not make it?", why: "Testing prioritisation. Delivering everything on time usually means the scope was not ambitious." },
        { q: "If you had half the time, what would you have shipped?", why: "A hypothetical that reveals whether you know which parts actually mattered — the 'key inputs' clause of the principle." },
        { q: "What happened to it afterwards? Is it still running?", why: "Delivery is not the last commit. Knowing the fate of your work is Ownership showing up inside Deliver Results." }
      ],
      crack: "Where candidates crack: question one and question five. No number, and no ability to say which 20% of the work produced 80% of the value."
    }
  ],
  traps: [
    "Effort narrated as achievement.",
    "No metric. Decide your numbers before the interview and write them down.",
    "Choosing a story where nothing went wrong, which leaves the interviewer nothing to score."
  ]
},

{
  n: 15, id: "lp-15", name: "Strive to be Earth's Best Employer",
  official: "Leaders work every day to create a safer, more productive, higher performing, more diverse, and more just work environment. They lead with empathy, have fun at work, and make it easy for others to be fun. Leaders have a vision for and commitment to their employees' personal success.",
  weight: "low-for-sde1",
  testing: "Rarely a primary principle at SDE-1 and often not asked at all, but do not be blank. It overlaps heavily with Hire and Develop the Best and Earn Trust. What they want is evidence that you notice the people around you.",
  strong: [
    "You noticed someone was struggling or burning out and did something",
    "You made a team environment better in a concrete way",
    "You made it safe for someone to ask questions or admit not knowing",
    "You included someone who was being left out of decisions",
    "You pushed back on an unsustainable pace"
  ],
  weak: [
    "Generic statements about liking teamwork",
    "No example",
    "Empathy claimed but never acted on"
  ],
  fresher: "Use a team project where someone was overloaded, isolated, or quiet, and you did something specific about it. Redistributing work fairly, making sure the quietest person's idea got heard, or setting up a norm that made asking for help normal. Small and true is fine here.",
  example: {
    title: "The person doing all the work",
    text: "In a five-person project team, two people were doing roughly everything and one of them stopped sleeping properly about a week before the deadline. Rather than complaining about the other three in private, which is what the group chat had turned into, I broke the remaining work into pieces small enough that someone unfamiliar could pick one up in an evening, wrote a two-line description for each, and asked directly in the meeting for people to claim them. Three got claimed immediately. What I got wrong was waiting three weeks to do it — the imbalance was obvious much earlier and I let it build because raising it felt awkward."
  },
  questions: [
    "Tell me about a time you helped a colleague who was struggling.",
    "Describe how you have made a team better.",
    "Tell me about a time you noticed something wrong with team dynamics.",
    "How do you support the people you work with?",
    "Tell me about a time you had to be empathetic."
  ],
  drills: [
    { opener: "Tell me about a time you improved things for the people around you.",
      chain: [
        { q: "How did you notice?", why: "Noticing without being told is the signal." },
        { q: "What did you actually do?", why: "Empathy that produced no action does not score." },
        { q: "Did it work?", why: "Even soft outcomes can be evidenced — they spoke up more, the rework stopped, the work got shared." },
        { q: "What would you do differently?", why: "'I would have acted sooner' is honest and almost always true." }
      ],
      crack: "Where candidates crack: they describe feeling sympathy and taking no action."
    }
  ],
  traps: ["Having nothing at all. Prepare one small true story.", "Turning it into a complaint about lazy teammates."]
},

{
  n: 16, id: "lp-16", name: "Success and Scale Bring Broad Responsibility",
  official: "We started in a garage, but we're not there anymore. We are big, we impact the world, and we are far from perfect. We must be humble and thoughtful about even the secondary effects of our actions. Leaders create more than they consume and always leave things better than how they found them.",
  weight: "low-for-sde1",
  testing: "Whether you think about second-order effects — on other teams, on users you were not building for, on the people who maintain your code after you. For engineers the most natural framing is consequences beyond the immediate requirement: privacy, accessibility, security, the on-call burden you create, the technical debt you leave.",
  strong: [
    "You considered who else your change would affect and checked with them",
    "You thought about privacy, security or accessibility when nobody asked you to",
    "You left a system better documented or more maintainable than you found it",
    "You raised a concern about a downstream consequence of a decision",
    "You considered the person who would be on call for your code"
  ],
  weak: [
    "Purely technical answers with no awareness that anyone else exists",
    "Vague corporate-responsibility language with no engineering substance",
    "No example"
  ],
  fresher: "The most natural engineering version: a time you thought about the data you were collecting and whether you should be, or a time you considered how your change would affect another team or the next maintainer. 'I left the codebase better than I found it' with a concrete instance — documentation, a test suite, deleting dead code — is a completely legitimate answer at this level.",
  example: {
    title: "The data we did not need",
    text: "For the attendance system I had designed the schema to store the full roll number, name, phone and email for every student along with every scan event, because it was easier to have everything available. When I was writing the export feature it occurred to me that this meant anyone with export access could pull the phone number of every student in the college, and the actual feature only ever needed to know who was present. I changed it so the scan events referenced a student ID only, and the contact details lived in one table with access limited to the two coordinators who genuinely needed it. It took an extra day and nobody had asked for it. But the version I had originally built would have been one careless export away from leaking 800 people's phone numbers, and none of those people had chosen to trust me with them."
  },
  questions: [
    "Tell me about a time you considered the broader impact of a technical decision.",
    "Describe a time you thought about the consequences of your work beyond the immediate requirement.",
    "Tell me about a time you left something better than you found it.",
    "Give an example of when you raised a concern nobody else had raised.",
    "How do you think about the people who maintain your code after you?"
  ],
  drills: [
    { opener: "Tell me about a time you considered the second-order effects of a decision.",
      chain: [
        { q: "Who else was affected?", why: "Specific people or teams, not 'the users' in the abstract." },
        { q: "How did you find out?", why: "Did you ask, or did you assume. Going and asking is the strong answer." },
        { q: "What did it cost to do the responsible thing?", why: "If it was free, it was not a trade-off and there is no judgement to score." },
        { q: "Did anyone disagree that it was worth it?", why: "Bridges into Backbone. If someone said it was over-cautious, how did you make the case?" }
      ],
      crack: "Where candidates crack: they have a nice-sounding answer with no cost attached, which means no real decision was made."
    }
  ],
  traps: ["Corporate-sounding answers with no engineering content.", "No example prepared at all."]
}
],

/* ============================================================ UNIVERSAL FOLLOW-UPS */
universal: {
  intro: "These are asked regardless of which principle is being scored. They are the back-to-back drilling the corpus describes — the interviewer picks your story and keeps going. Prepare an answer to every one of these for every story in your bank, and the round stops being able to surprise you.",
  groups: [
    { g: "Digging into your role",
      qs: [
        "You keep saying 'we'. What did YOU do?",
        "What would have happened if you had not been there?",
        "Who else was involved and what did they contribute?",
        "Whose idea was it originally?",
        "Were you leading this or following someone?"
      ]},
    { g: "Digging into the decision",
      qs: [
        "What other options did you consider?",
        "Why did you rule those out?",
        "What was the trade-off?",
        "Who did you consult before deciding?",
        "What would you have needed to know to make the opposite choice?",
        "Was that decision reversible?"
      ]},
    { g: "Digging into the result",
      qs: [
        "How did you measure that?",
        "What was the number before and after?",
        "How do you know it was your change that caused it?",
        "What would you have seen if you had been wrong?",
        "Is it still working today?"
      ]},
    { g: "Digging into failure",
      qs: [
        "What went wrong?",
        "What would you do differently?",
        "What did that cost?",
        "Who found out first?",
        "How long did it take you to realise?",
        "Give me another example."
      ]},
    { g: "Digging into the people",
      qs: [
        "How did the others react?",
        "Did anyone disagree with you?",
        "What was their argument?",
        "How did you handle the pushback?",
        "How is your relationship with them now?"
      ]},
    { g: "Hypotheticals and reversals",
      qs: [
        "What if you had had half the time?",
        "What if your manager had told you not to?",
        "How would you do it at ten times the scale?",
        "Now tell me about a time the opposite happened.",
        "Tell me about a time this approach did NOT work."
      ]}
  ]
},

/* ============================================================ RED FLAGS */
redFlags: [
  { f: "Saying 'we' throughout", d: "The most common failure in the entire round. The interviewer cannot score a team. Every 'we' costs you a follow-up question and reads as either padding or unclear ownership." },
  { f: "Blaming anyone", d: "A manager, a teammate, a professor, a client, a previous developer. This is scored as an Earn Trust failure regardless of which principle prompted the story, and it is one of the few things that can sink an otherwise good loop on its own." },
  { f: "No numbers anywhere", d: "Across a whole loop, a candidate who never quantifies anything reads as someone who does not measure their work. Decide your numbers beforehand." },
  { f: "One-layer stories", d: "You have a good headline and nothing beneath it. Exposed on the third follow-up, which is exactly why the drilling exists." },
  { f: "Only one failure story", d: "Reveals that self-criticism was prepared rather than practised. They will ask for a second and sometimes a third." },
  { f: "Rambling past two minutes", d: "Length is read as thinness. Answer, stop, let them drill." },
  { f: "Inconsistent facts across rounds", d: "Caught in the debrief when notes are compared. Fix your timeline, team size and numbers in advance and never improvise them." },
  { f: "No disagreement story", d: "'I get along with everybody' scores as an absence of backbone, not as being easy to work with." },
  { f: "Answering a different question", d: "Especially pivoting from a failure question into a success story. The evasion is more visible than the failure would have been." },
  { f: "Reading the poker face as failure", d: "They are deliberately giving you nothing. The Feb 2026 candidate endured 40 minutes of it and was selected. Do not panic-talk to fill the silence." },
  { f: "A project on your résumé you cannot defend", d: "Deep-dive rounds go five layers into your own work. Anything you list is fair game." },
  { f: "Claiming knowledge you do not have", d: "If you say you learned about indexing, expect a B+ tree question. Claim only what you can be interviewed on." }
],

/* ============================================================ ASK THEM */
askThem: {
  intro: "You get five minutes at the end of each round. The L5 candidate in the corpus who received an offer used them in every single round, and specifically asked about on-call culture and patent policy. Good questions are a signal, not a formality — and they are one of the few parts of the day you fully control.",
  good: [
    "How does on-call work on your team? What does a typical week look like?",
    "What does the first six months look like for someone joining at this level?",
    "How are projects assigned — pulled or pushed?",
    "What is the code review culture like? How long does a change take to reach production?",
    "What is the biggest technical challenge the team is dealing with right now?",
    "How does the team handle disagreement about technical direction?",
    "What separates someone who does well here from someone who struggles?",
    "How much of the work is new development versus maintaining existing systems?",
    "What is the balance between team autonomy and org-level direction?",
    "How do you measure whether the team is doing well?"
  ],
  avoid: [
    "Anything answered on the careers page",
    "Compensation and levelling — that is the recruiter's conversation, not the interviewer's",
    "'What do you like about working here?' as your only question — it is filler and reads as such",
    "Nothing at all. Having no questions is a real negative signal."
  ]
},

/* ============================================================ DAY OF */
dayOf: [
  "Bring a printed one-page cue sheet of your stories with the key numbers on it. You will not be reading from it during rounds, but reviewing it in the fifteen minutes between rounds is worth more than any last-minute revision.",
  "Between rounds, note which stories you have already used and with whom. Repeating a story to the same interviewer is bad; repeating across interviewers is normal but you want it to be deliberate.",
  "Keep your facts fixed. Same timeline, same team size, same numbers, every time. The panel compares notes.",
  "When you get a question you have no story for, do not fabricate. Say 'I have not faced exactly that, but here is the closest thing' and then give a real story. Interviewers accept this; they do not accept invention.",
  "Take three seconds before answering. Choosing the right story matters more than starting quickly, and a short pause reads as thoughtfulness.",
  "If you realise mid-answer that you picked the wrong story, say so and switch. That costs you thirty seconds and is far better than finishing a story that does not answer the question.",
  "Ask them to repeat or clarify the question if you need to. This is normal and costs nothing.",
  "In an in-person event you will be tired by round three, and round three is often the LP-heaviest one. Eat something. Bring water.",
  "The last five minutes are yours. Have two questions ready for each interviewer."
]

};
