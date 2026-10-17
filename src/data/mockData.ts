import { TrackProgress, Scenario, KnowledgeDocument, DataSource, TeamMember, NotificationItem } from '../types';

export const INITIAL_SALES_MODULES = [
  {
    id: 's-1',
    title: 'AI prospecting fundamentals',
    duration: '22 min',
    type: 'Video' as const,
    status: 'done' as const,
    content: {
      overview: 'Learn how modern high-velocity sales teams leverage LLMs to identify buying intent signals, extract key company triggers, and build high-converting prospect lists.',
      keyPoints: [
        'Shift from mass email cadences to intent-driven micro-cohorts',
        'Identify triggering events (funding, leadership hires, tech stack shifts)',
        'Prompt structure: Context + Prospect persona + Value hook + Clear CTA'
      ],
      practicalExercise: {
        question: 'Which AI prospecting strategy yields the highest reply rate according to top benchmark data?',
        options: [
          'Sending 100 generic template emails per hour with AI automated sending',
          'Contextual 3-line personalized emails referencing recent quarterly company challenges',
          'Writing 500-word product brochures generated automatically by ChatGPT',
          'Using AI voice clones to auto-dial phone numbers randomly'
        ],
        correctIndex: 1,
        explanation: 'Hyper-focused emails citing genuine public triggers or pain points generate 3x higher positive reply rates than blast templates.'
      },
      promptTemplate: 'Analyze this company earnings transcript: {transcript}. Extract the top 3 tactical priorities and connect them to our SaaS platform solution.',
      xpReward: 100
    }
  },
  {
    id: 's-2',
    title: 'Lead scoring with predictive models',
    duration: '18 min',
    type: 'Interactive' as const,
    status: 'done' as const,
    content: {
      overview: 'Configure predictive scoring thresholds to prioritize the leads most likely to close within the current quarter.',
      keyPoints: [
        'Combine firmographic, technographic, and behavioral engagement telemetry',
        'Weight pricing page visits and documentation checks 2.5x higher than blog reads',
        'Auto-route hot accounts directly to senior account executives'
      ],
      practicalExercise: {
        question: 'What behavioral signal indicates the highest purchase intent when evaluated by AI models?',
        options: [
          'Liking a post on company social media',
          'Visiting the Security & Compliance whitepaper after seeing pricing',
          'Subscribing to the monthly general newsletter',
          'Opening an introductory marketing email once'
        ],
        correctIndex: 1,
        explanation: 'Reviewing security and pricing pages signals an active buying committee evaluating vendor risk and budget readiness.'
      },
      xpReward: 120
    }
  },
  {
    id: 's-3',
    title: 'Personalized outreach drafting',
    duration: '25 min',
    type: 'Lab' as const,
    status: 'done' as const,
    content: {
      overview: 'Master the "Pain-Hypothesis-Proof" drafting framework with generative models without sounding like generic automated slop.',
      keyPoints: [
        'Hook within the first 14 words on mobile screens',
        'Use specific metric-based customer stories from the same industry',
        'Avoid buzzwords like "delve", "revolutionize", and "hope this finds you well"'
      ],
      practicalExercise: {
        question: 'When crafting an AI-assisted cold email opening, which approach is most effective?',
        options: [
          '"I hope you are having an amazing Tuesday morning!"',
          '"Saw your LinkedIn post on reducing cloud egress costs by 30% — we helped Acme Corp do exactly that in 45 days."',
          '"Allow me to introduce our world-leading, revolutionary AI solution."',
          '"Are you the right person to speak to about your company technology budget?"'
        ],
        correctIndex: 1,
        explanation: 'Immediate relevance and concrete proof points capture executive attention in under 5 seconds.'
      },
      xpReward: 150
    }
  },
  {
    id: 's-4',
    title: 'Objection handling simulator',
    duration: '30 min',
    type: 'AI Roleplay' as const,
    status: 'current' as const,
    content: {
      overview: 'Practice neutralizing the toughest buyer objections in real-time against our skeptical AI enterprise buyer personas.',
      keyPoints: [
        'Acknowledge and validate before pivoting: Never get defensive',
        'Isolate whether the objection is timing, budget, authority, or priority',
        'Use diagnostic probing questions to uncover the hidden blockers'
      ],
      practicalExercise: {
        question: 'When a CFO objects: "We have frozen all discretionary software spending this fiscal year", your best response is:',
        options: [
          '"Can you ask your CEO to make an exception for us?"',
          '"Understood. Is that freeze due to cash conservation, or would you still evaluate tools that have a verified 60-day payback period?"',
          '"Our software is really cheap though, only $500 a month!"',
          '"Okay, I will email you again next year."'
        ],
        correctIndex: 1,
        explanation: 'Reframing costs as immediate cash-saving investments helps bypass blanket discretionary freezes.'
      },
      xpReward: 200
    }
  },
  {
    id: 's-5',
    title: 'Call transcription & real-time coaching',
    duration: '20 min',
    type: 'Video' as const,
    status: 'locked' as const,
    content: {
      overview: 'Deploy AI listening assistants to track talk-to-listen ratios, competitor mentions, and action item extraction.',
      keyPoints: [
        'Aim for a 45% talk / 55% listen ratio in discovery calls',
        'Automatic battlecard popups upon competitor detection',
        'Instant CRM recap summary generation in under 60 seconds'
      ],
      practicalExercise: {
        question: 'What is the ideal talk-to-listen ratio for an initial enterprise discovery call?',
        options: [
          '80% rep talking, 20% buyer listening',
          '40-45% rep talking, 55-60% buyer speaking',
          '10% rep talking, 90% silence',
          'Equal 50/50 uninterrupted split'
        ],
        correctIndex: 1,
        explanation: 'Top enterprise performers let prospects share 55-60% of the conversation to surface true pain points.'
      },
      xpReward: 140
    }
  },
  {
    id: 's-6',
    title: 'CRM enrichment workflows',
    duration: '15 min',
    type: 'Lab' as const,
    status: 'locked' as const,
    content: {
      overview: 'Automate data hygiene and pipeline updates directly from email threads and calendar events using webhook triggers.',
      keyPoints: [
        'Zero manual data entry for contact title updates',
        'Auto-updating close dates and stage probabilities based on email sentiment',
        'Multi-threading detection: alerting when only 1 champion is engaged'
      ],
      practicalExercise: {
        question: 'Why is single-threading considered the primary killer of enterprise B2B deals?',
        options: [
          'Because software licenses only work for one user',
          'If the single champion leaves or gets overruled, the deal stalls completely',
          'Because procurement requires at least 10 signatures on every single order',
          'It takes too much time to write emails to multiple people'
        ],
        correctIndex: 1,
        explanation: 'Deals with 3+ engaged stakeholders close at twice the rate of single-threaded opportunities.'
      },
      xpReward: 130
    }
  },
  {
    id: 's-7',
    title: 'Forecasting with AI regression',
    duration: '28 min',
    type: 'Case study' as const,
    status: 'locked' as const,
    content: {
      overview: 'Replace gut-feeling sales forecasts with probabilistic AI risk models trained on historical deal velocities.',
      keyPoints: [
        'Inspect stage stagnation times and decay curves',
        'Flag deals where pricing was sent without procurement alignment',
        'Build weighted scenario ranges (Conservative, Base, Stretch)'
      ],
      practicalExercise: {
        question: 'What is a deal hygiene red flag that AI forecasting tools catch immediately?',
        options: [
          'Close date pushed out 3 consecutive times with no inbound buyer email in 14 days',
          'The customer requested a call on a Friday afternoon',
          'The buyer shared their NDA promptly',
          'The proposal was viewed by 4 executive team members'
        ],
        correctIndex: 0,
        explanation: 'Repeated slip dates without recent buyer contact is the strongest indicator of a zombie deal.'
      },
      xpReward: 160
    }
  },
  {
    id: 's-8',
    title: 'Certification: Sales AI Pro',
    duration: '45 min',
    type: 'Exam' as const,
    status: 'locked' as const,
    content: {
      overview: 'Comprehensive capstone exam covering the full modern AI sales stack, pipeline acceleration, and automated workflows.',
      keyPoints: [
        'Passing score: 80% or higher',
        'Industry accredited digital credential & LinkedIn badge',
        'Includes live sandbox roleplay assessment'
      ],
      practicalExercise: {
        question: 'What is the highest ROI use case for sales AI according to Gartner research?',
        options: [
          'Writing poetry for prospects',
          'Meeting prep & automated post-call CRM action follow-ups',
          'Posting quotes on LinkedIn daily',
          'Replacing account executives with AI avatars completely'
        ],
        correctIndex: 1,
        explanation: 'Automating prep and post-call execution saves reps 6+ hours per week, reinvested directly into customer-facing selling time.'
      },
      xpReward: 300
    }
  }
];

export const INITIAL_HR_MODULES = [
  {
    id: 'h-1',
    title: 'AI in modern HR & People Operations',
    duration: '15 min',
    type: 'Video' as const,
    status: 'done' as const,
    content: {
      overview: 'Understand the strategic landscape of AI in human resources: automating routine queries while elevating human empathy.',
      keyPoints: [
        'Distinguish between administrative automation and high-stakes people decisions',
        'Preserving employee trust through transparency and strict confidentiality',
        'Establishing company-wide AI usage guidelines for talent teams'
      ],
      practicalExercise: {
        question: 'What is the most ethical foundation for implementing AI in people operations?',
        options: [
          'Using AI secretly to track employee keystrokes',
          'Augmenting HR professionals with transparent tools while keeping humans in the loop for all final decisions',
          'Letting AI auto-terminate low performers without human review',
          'Disallowing all employees from touching any AI tools'
        ],
        correctIndex: 1,
        explanation: 'Human-in-the-loop ensures legal compliance, empathetic communication, and employee trust.'
      },
      xpReward: 90
    }
  },
  {
    id: 'h-2',
    title: 'Bias-aware resume screening',
    duration: '25 min',
    type: 'Interactive' as const,
    status: 'done' as const,
    content: {
      overview: 'Configure algorithmic fairness checks, anonymization pipelines, and competency-based candidate scoring.',
      keyPoints: [
        'Redact identifying demographic indicators (names, graduation years, postal codes)',
        'Score against verified job competencies rather than institutional pedigree',
        'Continuous audit of candidate pipeline diversity ratios'
      ],
      practicalExercise: {
        question: 'Which method best prevents algorithmic bias during resume screening?',
        options: [
          'Training models only on historical hires from the last 10 years without auditing',
          'Anonymizing demographic indicators and evaluating solely on structured competency rubrics',
          'Filtering candidates based on elite university attendance',
          'Screening candidates using photo facial analysis'
        ],
        correctIndex: 1,
        explanation: 'Structured competency rubrics paired with anonymized profiles mitigate historic demographic skews.'
      },
      xpReward: 130
    }
  },
  {
    id: 'h-3',
    title: 'Building a policy RAG chatbot',
    duration: '35 min',
    type: 'Lab' as const,
    status: 'current' as const,
    content: {
      overview: 'Learn how to ground internal HR chatbots on company handbooks, parental leave policies, and travel guidelines using Retrieval-Augmented Generation.',
      keyPoints: [
        'Document chunking strategies for HR compliance handbooks',
        'Setting prompt boundaries: answering only from verified internal documents',
        'Routing sensitive queries (e.g. medical, grievances) immediately to human HRBPs'
      ],
      practicalExercise: {
        question: 'When an employee asks an HR bot: "I am being harassed by my manager, what do I do?", how must the bot respond?',
        options: [
          'Give advice on how to ignore the manager',
          'Provide a compassionate, immediate escalation to the confidential People Partner and whistleblower hotline without storing conversational transcripts in public logs',
          'Generate a debate about who is right and wrong',
          'Refuse to answer and close the chat window'
        ],
        correctIndex: 1,
        explanation: 'Critical and sensitive grievances must immediately escalate to trained human professionals with total privacy.'
      },
      xpReward: 180
    }
  },
  {
    id: 'h-4',
    title: 'Sentiment analysis on engagement surveys',
    duration: '20 min',
    type: 'Lab' as const,
    status: 'locked' as const,
    content: {
      overview: 'Extract actionable thematic insights from thousands of open-ended employee comments without compromising anonymity.',
      keyPoints: [
        'K-means clustering and theme identification across department cohorts',
        'Distinguish temporary project stress from systemic burnout patterns',
        'Generate executive action plan summaries in minutes'
      ],
      practicalExercise: {
        question: 'How do you safeguard individual privacy when analyzing free-text pulse surveys with AI?',
        options: [
          'Reading every raw comment aloud in the all-hands meeting',
          'Aggregating sentiment by cohorts of 5+ individuals and scrubbing all personal names or identifiers',
          'Publishing author names next to their sentiment scores',
          'Ignoring written feedback altogether'
        ],
        correctIndex: 1,
        explanation: 'Differential privacy and minimum group cohort thresholds protect respondent psychological safety.'
      },
      xpReward: 140
    }
  },
  {
    id: 'h-5',
    title: 'Difficult-conversation practice sandbox',
    duration: '30 min',
    type: 'AI Roleplay' as const,
    status: 'locked' as const,
    content: {
      overview: 'Simulate high-stakes scenarios: delivering critical performance reviews, mediating peer conflicts, and discussing compensation.',
      keyPoints: [
        'The SBI Framework: Situation, Behavior, Impact',
        'Active listening and defusing emotional escalations',
        'Documenting agreed-upon action steps clearly'
      ],
      practicalExercise: {
        question: 'In the SBI feedback model, what is the best way to frame critical feedback?',
        options: [
          '"You always do sloppy work and you have a bad attitude."',
          '"In yesterday\'s sprint review (Situation), when the client deck wasn\'t finalized (Behavior), the team had to stall for 15 minutes (Impact)."',
          '"Someone told me that you are not doing your job."',
          '"Don\'t worry about anything, you are doing fine!"'
        ],
        correctIndex: 1,
        explanation: 'Objective, observable situations and specific impacts eliminate defensiveness and foster constructive growth.'
      },
      xpReward: 200
    }
  },
  {
    id: 'h-6',
    title: 'Compliance, GDPR & privacy guardrails',
    duration: '18 min',
    type: 'Video' as const,
    status: 'locked' as const,
    content: {
      overview: 'Navigate international labor laws, EEOC compliance, GDPR worker rights, and AI governance frameworks.',
      keyPoints: [
        'Right to human intervention in automated employment decisions',
        'Data retention limits on candidate and employee data',
        'EU AI Act high-risk classification for employment systems'
      ],
      practicalExercise: {
        question: 'Under the EU AI Act, how are AI systems used in recruitment and worker management classified?',
        options: [
          'Minimal Risk / Exempt',
          'High Risk (requiring rigorous conformity assessments, logging, and human oversight)',
          'Prohibited entirely',
          'Classified as entertainment tools'
        ],
        correctIndex: 1,
        explanation: 'Recruitment and employment AI systems are explicitly designated High Risk under EU AI regulations.'
      },
      xpReward: 150
    }
  },
  {
    id: 'h-7',
    title: 'Certification: HR AI Pro',
    duration: '40 min',
    type: 'Exam' as const,
    status: 'locked' as const,
    content: {
      overview: 'Formal certification evaluating your capability to design, deploy, and govern ethical AI workflows across the employee lifecycle.',
      keyPoints: [
        'Comprehensive 30-question mastery test',
        'Verifiable certificate with unique verification hash',
        'SHRM / HRCI professional development credit eligibility'
      ],
      practicalExercise: {
        question: 'What is the primary indicator of a successful AI implementation in people operations?',
        options: [
          '100% reduction in all human HR team headcount',
          'Higher employee satisfaction, reduced time-to-hire, and zero compliance breaches',
          'Using the highest number of AI acronyms in meetings',
          'Stopping all 1-on-1 human conversations'
        ],
        correctIndex: 1,
        explanation: 'True success blends efficiency gains with enhanced human satisfaction and spotless compliance.'
      },
      xpReward: 300
    }
  }
];

export const INITIAL_FINANCE_MODULES = [
  {
    id: 'f-1',
    title: 'Invoice OCR & auto-coding',
    duration: '20 min',
    type: 'Lab' as const,
    status: 'done' as const,
    content: {
      overview: 'Automate Accounts Payable ingestion: extracting multi-line items, tax IDs, and 3-way matching against purchase orders.',
      keyPoints: [
        'Multi-modal LLMs for complex, skewed, and multilingual invoices',
        'Automated GL code mapping based on vendor history and item descriptions',
        'Tolerance thresholds: auto-approval below $2,500 with matching PO'
      ],
      practicalExercise: {
        question: 'What is the core advantage of vision-language models over legacy template OCR?',
        options: [
          'They only work with English language PDFs',
          'They generalize across novel invoice layouts without requiring custom coordinate templates',
          'They require manual typing for every line item',
          'They cannot extract dates or dollar figures'
        ],
        correctIndex: 1,
        explanation: 'Modern multi-modal AI extracts semantic meaning regardless of invoice font, structure, or layout variations.'
      },
      xpReward: 110
    }
  },
  {
    id: 'f-2',
    title: 'Anomaly & fraud detection algorithms',
    duration: '25 min',
    type: 'Interactive' as const,
    status: 'current' as const,
    content: {
      overview: 'Detect duplicate payments, split invoices avoiding threshold approvals, and rogue vendor bank detail alterations.',
      keyPoints: [
        'Benford\'s Law and unsupervised anomaly clustering on ledger transactions',
        'Detecting invoice splitting (e.g. $4,990 to bypass a $5,000 approval rule)',
        'Immediate verification workflows for modified remittance account numbers'
      ],
      practicalExercise: {
        question: 'Which transaction pattern strongly suggests intentional invoice splitting to bypass approval thresholds?',
        options: [
          'A single invoice for $20,000 sent with VP approval',
          'Three separate invoices for $9,950 from the same vendor within 48 hours when the manager limit is $10,000',
          'An annual software subscription paid via automated wire',
          'An office supplies purchase of $45'
        ],
        correctIndex: 1,
        explanation: 'Multiple invoices clustered just below a mandatory authorization cutoff is a classic indicator of policy evasion.'
      },
      xpReward: 140
    }
  },
  {
    id: 'f-3',
    title: 'Variance narrative generator',
    duration: '18 min',
    type: 'Lab' as const,
    status: 'locked' as const,
    content: {
      overview: 'Turn raw month-end variance tables into executive-ready commentary explaining drivers, risks, and forecasts.',
      keyPoints: [
        'Bridge analysis: separating price variance from volume/mix effects',
        'Drafting crisp commentary for board-level management presentations',
        'Contextualizing seasonal fluctuations vs permanent run-rate changes'
      ],
      practicalExercise: {
        question: 'What transforms a basic variance report into executive-grade financial analysis?',
        options: [
          'Just stating that costs went up by 12%',
          'Explaining the root cause drivers (price vs volume) and concrete mitigation actions taken',
          'Printing the spreadsheet in 50 pages of raw numbers',
          'Rounding all numbers to zero'
        ],
        correctIndex: 1,
        explanation: 'Executives need the causal drivers and corrective management steps, not merely a repetition of the numbers.'
      },
      xpReward: 130
    }
  },
  {
    id: 'f-4',
    title: 'Forecasting scenario sandbox',
    duration: '30 min',
    type: 'AI Roleplay' as const,
    status: 'locked' as const,
    content: {
      overview: 'Build dynamic Monte Carlo sensitivity models testing foreign exchange fluctuations, inflation spikes, and churn volatility.',
      keyPoints: [
        'Multi-scenario stress testing: Base, Bull, and Bear cases',
        'Automated cash runway burn alerts under delayed receivables',
        'Real-time Q&A defense against inquisitive board members'
      ],
      practicalExercise: {
        question: 'When modeling financial sensitivity, what is a primary purpose of a Monte Carlo simulation?',
        options: [
          'To predict one exact guaranteed number for next year',
          'To compute probability distributions across thousands of variable combinations',
          'To calculate basic arithmetic',
          'To eliminate financial risk entirely'
        ],
        correctIndex: 1,
        explanation: 'Monte Carlo models provide probability intervals and risk percentiles across volatile inputs.'
      },
      xpReward: 190
    }
  },
  {
    id: 'f-5',
    title: 'Audit-ready documentation & controls',
    duration: '22 min',
    type: 'Video' as const,
    status: 'locked' as const,
    content: {
      overview: 'Maintain bulletproof SOX compliance and audit trails while accelerating month-end book closure.',
      keyPoints: [
        'Automated reconciliation logging with cryptographic timestamping',
        'Segregation of duties validation across ERP user roles',
        'Sample pack compilation for external audit review'
      ],
      practicalExercise: {
        question: 'What is essential for maintaining SOX compliance when deploying AI financial automations?',
        options: [
          'Allowing AI models to modify bank accounts without human approvals',
          'Complete audit logs detailing every data input, logic step, model version, and human reviewer sign-off',
          'Deleting logs every 24 hours to save server space',
          'Never letting auditors see the software'
        ],
        correctIndex: 1,
        explanation: 'Auditors require reproducible decision logs with dual-authorization signatures and version control.'
      },
      xpReward: 150
    }
  },
  {
    id: 'f-6',
    title: 'Certification: Finance AI Pro',
    duration: '45 min',
    type: 'Exam' as const,
    status: 'locked' as const,
    content: {
      overview: 'Capstone accreditation demonstrating mastery in automated AP/AR, FP&A scenario planning, and financial risk governance.',
      keyPoints: [
        '25 scenario-based practical questions',
        'Recognized credential across global corporate finance leaders',
        'CPE (Continuing Professional Education) credit eligible'
      ],
      practicalExercise: {
        question: 'By what percentage did top-quartile enterprises reduce their month-end close cycle using intelligent automation?',
        options: [
          '0% — close times remained unchanged',
          '40% to 55%, reducing close windows from 12 days to under 5 days',
          '100% — finance teams were eliminated completely',
          '5% only'
        ],
        correctIndex: 1,
        explanation: 'Automating reconciliations and variance drafts slashes close cycles by half, giving teams more strategic analysis time.'
      },
      xpReward: 300
    }
  }
];

export const INITIAL_PROGRESS: Record<'sales' | 'hr' | 'finance', TrackProgress> = {
  sales: {
    completed: 3,
    total: 8,
    xp: 420,
    streak: 5,
    lastLesson: 'Personalized outreach drafting',
    modules: INITIAL_SALES_MODULES
  },
  hr: {
    completed: 2,
    total: 7,
    xp: 280,
    streak: 3,
    lastLesson: 'Bias-aware resume screening',
    modules: INITIAL_HR_MODULES
  },
  finance: {
    completed: 1,
    total: 6,
    xp: 150,
    streak: 2,
    lastLesson: 'Invoice OCR & auto-coding',
    modules: INITIAL_FINANCE_MODULES
  }
};

export const SCENARIOS: Record<'sales' | 'hr' | 'finance', Scenario[]> = {
  sales: [
    {
      id: 'sc-s1',
      title: 'Cold Call — Skeptical CFO',
      role: 'David Miller, CFO at Northwind Manufacturing ($120M Rev)',
      difficulty: 'Advanced',
      initialPrompt: 'You are David Miller, CFO at Northwind Manufacturing. You are budget-conscious, analytical, and tired of hearing hype about AI software. You agreed to a 3-minute intro call. Challenge the rep on ROI, integration cost, and payback period.',
      firstMessage: "I have back-to-back meetings today and exactly three minutes. Every vendor this month has promised to 'revolutionize' my pipeline with AI. Cut the buzzwords: what tangible bottom-line return are your clients actually seeing?",
      context: 'The buyer cares about cash flow, time to payback, and minimal disruption to their 45-person sales force.',
      learningGoal: 'Pivot from feature lists to hard financial metrics and ask diagnostic questions about current revenue leakage.',
      suggestedResponses: [
        "David, fair point. Our average client with a 40-50 person sales team recovers 6 hours per rep weekly, translating to $420k annual revenue lift in under 90 days. Can I ask how much time your team currently spends on manual CRM hygiene?",
        "I appreciate the directness. Rather than promises, here is our audited case study with Acme Corp who reduced rep ramp time by 42% in Q1. Would you be open to seeing their 60-day payback model?",
        "If we can't prove at least a 3x cash ROI within 6 months, we don't expect your business. Where is your biggest pipeline bottleneck right now?"
      ]
    },
    {
      id: 'sc-s2',
      title: 'Objection: "Too Expensive vs Competitor"',
      role: 'Sarah Jenkins, Head of Procurement at OmniCorp',
      difficulty: 'Intermediate',
      initialPrompt: 'You are Sarah Jenkins, Head of Procurement. You just received a $65,000 annual proposal. A legacy point solution quoted $28,000. Push back firmly on price, demand a 40% discount, and challenge the salesperson to justify the price disparity.',
      firstMessage: "We reviewed your proposal for $65k. Quite frankly, we already have a quote from a competitor on my desk for $28,000. Unless you can match their number or give us at least a 35% discount, we won't be able to move forward.",
      context: 'Procurement is using price anchoring to test your conviction and discover what value drivers distinguish your platform.',
      learningGoal: 'Defend margin without discounting by quantifying the total cost of ownership (TCO) and risk differences.',
      suggestedResponses: [
        "I understand Sarah. At first glance $28k looks attractive. However, that competitor requires 3 months of professional services and doesn't connect natively with your custom CRM, which typically costs an additional $40k in engineering hours. Have they guaranteed deployment timeline in writing?",
        "Cost is critical. If we look at the $37k difference, our platform includes dedicated SOC2 Type II single-tenant isolation and 3 role tracks. Which specific capabilities are you willing to forfeit from the scope to adjust the price?",
        "Thank you for being upfront. Before discussing price adjustments, let's verify if the competitor's quote includes unlimited roleplay simulations and custom RAG indexing, or if those are billed as extra API tokens."
      ]
    },
    {
      id: 'sc-s3',
      title: 'Board Demo Follow-up & Security Vetting',
      role: 'Elena Vance, VP of Revenue Operations',
      difficulty: 'Intermediate',
      initialPrompt: 'You are Elena Vance, VP of RevOps. You liked the initial demo, but your board and Chief Information Security Officer (CISO) have strict data privacy questions before approving the contract.',
      firstMessage: "The demo was impressive, but my CISO just flagged your architecture. She wants to know: does your platform use our proprietary CRM opportunities to train your public foundation models, and what certifications do you carry?",
      context: 'Enterprise security is a deal blocker if not answered with precision and regulatory confidence.',
      learningGoal: 'Provide crystal-clear compliance assurances (SOC 2, zero data retention for training, tenant encryption).',
      suggestedResponses: [
        "Elena, absolutely zero customer data is ever used to train foundation models. We operate strictly in isolated tenant containers with AES-256 encryption at rest and TLS 1.3 in transit, backed by our SOC 2 Type II report.",
        "Your CISO is asking the right questions. We can provide our complete SOC 2 Type II report, ISO 27001 certificate, and standard DPA (Data Processing Agreement) within the hour. Can I join a 15-minute sync with her team to clear this?",
        "Security is our foundational architecture. All embeddings and CRM syncs are encrypted with customer-managed keys (BYOK) if requested. Let's send our CISO security packet directly to your compliance review team."
      ]
    }
  ],
  hr: [
    {
      id: 'sc-h1',
      title: 'Difficult Termination / PIP Conversation',
      role: 'Alex Rivera, Senior Designer (Emotional, defensive)',
      difficulty: 'Advanced',
      initialPrompt: 'You are Alex Rivera, an employee who has been on a 60-day Performance Improvement Plan (PIP) that was not met. You are being informed that today is your last day. You feel blindsided and blame team leadership.',
      firstMessage: "Wait, you're letting me go? After 3 years of late nights for this company?! My manager never gave me clear feedback until last month. This is completely unfair and I feel targeted!",
      context: 'High-emotion scenario requiring compassionate firmness, clarity, and adherence to legal protocol.',
      learningGoal: 'De-escalate emotional reactivity, maintain dignity, and walk through transition package without arguing.',
      suggestedResponses: [
        "Alex, I hear how painful and upsetting this is, and I want to acknowledge your contributions over the last three years. Today's decision is final, but my focus right now is ensuring you have our full support, severance, and healthcare extension during this transition.",
        "I understand this feels sudden and frustrating. While I know you disagree with the assessment, the decision was reviewed carefully across leadership. Let's take a 5-minute breather, and then walk through your severance package and reference support together.",
        "Alex, it's completely natural to feel hurt right now. I am here to answer any questions about your benefits, COBRA coverage, and payout so you have complete clarity on what happens next."
      ]
    },
    {
      id: 'sc-h2',
      title: 'Candidate Salary & Equity Negotiation',
      role: 'Priya Kapoor, Staff Infrastructure Engineer Candidate',
      difficulty: 'Intermediate',
      initialPrompt: 'You are Priya Kapoor, an exceptional engineering candidate with competing offers from Stripe and Datadog. The offer is $170k base + $50k equity. You want $195k base + $75k equity.',
      firstMessage: "Thank you for the offer. I'm really excited about the engineering culture, but the compensation is approximately 15% below the competing offer I have on the table from another tier-1 firm. I'd need $195,000 base and adjusted equity to sign today.",
      context: 'Candidate has leverage, but company has band limits and internal equity considerations.',
      learningGoal: 'Explore total compensation levers (signing bonus, equity vesting, accelerated review) while protecting internal band parity.',
      suggestedResponses: [
        "Priya, we're thrilled about the prospect of you joining. Our engineering salary bands are anchored strictly to internal equity so peers at your level are compensated fairly. While $195k is outside our band max, I could explore a $25,000 sign-on bonus and a 6-month performance review. How would that bridge the gap?",
        "We want you on the team, Priya. Let's look at the full package: our remote flexibility, 401(k) matching, and annual learning stipends. If we can increase the equity grant to meet your total target, would you be ready to accept?",
        "Thank you for being transparent about your competing offer. Let me sync with the VP of Engineering this afternoon to see what flexibility we have on sign-on incentives to get you onboard."
      ]
    },
    {
      id: 'sc-h3',
      title: 'Sensitive Workplace Harassment Report Intake',
      role: 'Jordan Lee, Marketing Specialist (Hesitant, anxious)',
      difficulty: 'Advanced',
      initialPrompt: 'You are Jordan Lee. You are meeting with HR to report that your direct manager makes uncomfortable personal comments about your appearance during 1-on-1 calls. You are terrified of retaliation.',
      firstMessage: "Thanks for meeting me in private. Before I say anything... can you promise me my manager won't find out I came to you? I can't afford to get fired or have my projects taken away.",
      context: 'Intake interview requiring utmost empathy, legal clarity on confidentiality, and reassurance of anti-retaliation protections.',
      learningGoal: 'Explain confidentiality boundaries transparently, validate courage, and assure robust anti-retaliation policies.',
      suggestedResponses: [
        "Jordan, thank you so much for having the courage to come talk to me. I want to be 100% honest: while I cannot promise absolute secrecy because we have a legal obligation to protect you and investigate, your report is handled with strict discretion on a need-to-know basis. Most importantly, our company has a zero-tolerance policy against retaliation.",
        "I hear how anxious you are Jordan, and your safety and career are our top priority. Any form of retaliation is strictly illegal and grounds for immediate termination. Take all the time you need, and share whatever you feel comfortable with.",
        "You did the right thing by reaching out Jordan. You are in a safe space. Let's take this step-by-step at your own pace."
      ]
    }
  ],
  finance: [
    {
      id: 'sc-f1',
      title: 'External Auditor Inquiry on Q4 Expense Surge',
      role: 'Robert Sterling, Senior Audit Manager at Deloitte',
      difficulty: 'Advanced',
      initialPrompt: 'You are Robert Sterling, Senior Audit Manager. You are conducting the annual audit and discovered an unbudgeted $1.8M cloud infrastructure expense booked in late December. Challenge the finance manager on capitalization vs expense treatment.',
      firstMessage: "During our substantive testing of your Q4 operating expenses, we identified a $1.8M invoice from AWS dated December 22nd. It was booked directly as an OPEX R&D expense rather than capitalized software development under ASC 350-40. What is your accounting justification?",
      context: 'External audit requires precise GAAP/IFRS terminology, documentation trails, and rationale.',
      learningGoal: 'Provide standard accounting defense citing technological feasibility phases and vendor contracts.',
      suggestedResponses: [
        "Robert, that $1.8M expense relates to preliminary stage research and AI model training compute for our exploratory prototyping. Under ASC 350-40, costs incurred during the preliminary project stage prior to technological feasibility must be expensed as incurred. We have the project stage gate memos ready for your review.",
        "Good afternoon Robert. We documented this specifically with our internal technical accounting team: the compute was utilized for data cleaning and model experimentation, which does not meet capitalization criteria under US GAAP. I can upload the engineer time logs and PO approvals into the audit data room.",
        "We reviewed this under ASC 350-40 guidelines. The application development stage did not commence until February 1st after board approval. Would you like to review our stage-gate sign-off documentation?"
      ]
    },
    {
      id: 'sc-f2',
      title: 'CEO Budget Variance Defense (40% Marketing Overage)',
      role: 'Victoria Sterling, Chief Executive Officer',
      difficulty: 'Intermediate',
      initialPrompt: 'You are Victoria Sterling, CEO. You noticed the Marketing department spent $650k against a $450k quarterly budget. You want clear accountability and explanations for why finance did not flag this earlier.',
      firstMessage: "I just reviewed the preliminary monthly numbers and Marketing is 44% over budget. That wipes out our entire Q3 EBITDA buffer. Why wasn't this caught three weeks ago, and what is the plan to recover this margin in Q4?",
      context: 'CEO demands root cause analysis, operational accountability, and dynamic corrective levers.',
      learningGoal: 'Explain the variance breakdown, customer acquisition efficiency trade-off, and present concrete offset savings.',
      suggestedResponses: [
        "Victoria, you're right to call this out. The $200k variance was driven by accelerated enterprise ad spend in August when CAC dropped 35%. While it created an OPEX variance, it pulled forward $850k in qualified pipeline closing this quarter. To safeguard our EBITDA margin, we have already frozen contractor spend across Q4 to offset $140k.",
        "Understood Victoria. We analyzed the overage: $120k was a timing mismatch from an annual conference billed upfront rather than amortized, and $80k was discretionary campaign spend. We have implemented a hard PO ceiling for Q4 and will maintain our net EBITDA target.",
        "I share your concern on the margin impact. We conducted a bridge analysis this morning: marketing achieved 140% of their MQL target. Here is our 3-point corrective plan to throttle discretionary contractor hours and realign our full-year forecast."
      ]
    },
    {
      id: 'sc-f3',
      title: 'Enterprise Vendor Contract Renegotiation',
      role: 'Marcus Vance, Enterprise Account Director at CloudCorp',
      difficulty: 'Intermediate',
      initialPrompt: 'You are Marcus Vance, vendor account director. The customer wants to renegotiate a 3-year contract down by 25% due to reduced user headcount.',
      firstMessage: "We value our partnership with your firm, but our standard Master Services Agreement has 18 months remaining with minimum tier commitments. A 25% price reduction isn't feasible under our commercial guidelines. What prompted this request?",
      context: 'Balancing relationship preservation with aggressive cost containment.',
      learningGoal: 'Trade contract duration or multi-product expansion for immediate unit rate concessions.',
      suggestedResponses: [
        "Marcus, we value CloudCorp as our primary provider. Following our organizational restructuring, our active seat count dropped from 500 to 380. If we extend our contract commitment by an additional 24 months, can we restructure our unit pricing to reflect our active tier?",
        "We understand contract obligations. However, keeping 120 unused shelfware licenses is financially untenable for our budget committee. If we cannot find flexibility on seat tiering, we will be forced to RFP the entire stack at expiration next year. Let's find a middle ground that keeps our partnership intact.",
        "Rather than a blanket discount, what if we consolidate our separate analytics add-on with your suite and sign a 3-year renewal now in exchange for resetting our baseline seat cost?"
      ]
    }
  ]
};

export const INITIAL_KNOWLEDGE_DOCS: KnowledgeDocument[] = [
  {
    id: 'doc-1',
    name: 'Sales_Playbook_Enterprise_2026.pdf',
    source: 'Google Drive',
    size: '4.2 MB',
    track: 'Sales',
    indexedAt: '2 hours ago',
    status: 'Ready',
    summary: 'Comprehensive B2B enterprise sales methodology, MEDDPICC qualification frameworks, buyer persona battlecards, and objection scripts.',
    chunksCount: 84
  },
  {
    id: 'doc-2',
    name: 'HR_Employee_Handbook_v5.docx',
    source: 'Microsoft 365',
    size: '1.8 MB',
    track: 'HR',
    indexedAt: '4 hours ago',
    status: 'Ready',
    summary: 'Updated company policies, global benefits, parental leave, remote work guidelines, and performance improvement procedures.',
    chunksCount: 62
  },
  {
    id: 'doc-3',
    name: 'Q3_Financial_Review_&_Ledger_SOP.xlsx',
    source: 'Salesforce',
    size: '2.5 MB',
    track: 'Finance',
    indexedAt: '1 day ago',
    status: 'Ready',
    summary: 'Chart of accounts mapping, month-end close checklist, approval hierarchies, and variance threshold rules.',
    chunksCount: 45
  },
  {
    id: 'doc-4',
    name: 'Objection_Handling_Quick_Reference.pdf',
    source: 'Google Drive',
    size: '890 KB',
    track: 'Sales',
    indexedAt: '1 day ago',
    status: 'Ready',
    summary: 'Tactical guide for handling competitor pricing, security compliance questions, and procurement negotiations.',
    chunksCount: 28
  },
  {
    id: 'doc-5',
    name: 'Equal_Opportunity_&_Fair_Hiring_Standard.pdf',
    source: 'Manual Upload',
    size: '1.1 MB',
    track: 'HR',
    indexedAt: '2 days ago',
    status: 'Ready',
    summary: 'Standard operating procedure for structured interviews, scoring rubrics, and demographic redaction safeguards.',
    chunksCount: 36
  }
];

export const INITIAL_DATA_SOURCES: DataSource[] = [
  {
    id: 'ds-1',
    name: 'Google Drive',
    status: 'Connected',
    docsCount: 147,
    lastUpdated: '2 hours ago',
    iconType: 'drive'
  },
  {
    id: 'ds-2',
    name: 'Microsoft 365',
    status: 'Connected',
    docsCount: 89,
    lastUpdated: '5 hours ago',
    iconType: 'm365'
  },
  {
    id: 'ds-3',
    name: 'Salesforce CRM',
    status: 'Connected',
    docsCount: 234,
    lastUpdated: '1 hour ago',
    iconType: 'salesforce'
  },
  {
    id: 'ds-4',
    name: 'Notion Workspace',
    status: 'Available',
    docsCount: 0,
    lastUpdated: 'Not connected',
    iconType: 'notion'
  },
  {
    id: 'ds-5',
    name: 'Slack Knowledge',
    status: 'Available',
    docsCount: 0,
    lastUpdated: 'Not connected',
    iconType: 'slack'
  }
];

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Priya Sharma',
    email: 'priya@acme.com',
    role: 'Enterprise Sales Lead',
    track: 'Sales',
    progress: 88,
    xp: 540,
    status: 'active',
    joinedDate: 'Jan 12, 2026'
  },
  {
    id: 'tm-2',
    name: 'Marcus Chen',
    email: 'marcus@acme.com',
    role: 'Head of Talent & Culture',
    track: 'HR',
    progress: 74,
    xp: 410,
    status: 'active',
    joinedDate: 'Feb 3, 2026'
  },
  {
    id: 'tm-3',
    name: 'Sofia Rodriguez',
    email: 'sofia@acme.com',
    role: 'Senior Financial Analyst',
    track: 'Finance',
    progress: 67,
    xp: 320,
    status: 'active',
    joinedDate: 'Feb 18, 2026'
  },
  {
    id: 'tm-4',
    name: 'James O\'Brien',
    email: 'james@acme.com',
    role: 'Account Executive',
    track: 'Sales',
    progress: 92,
    xp: 620,
    status: 'active',
    joinedDate: 'Jan 8, 2026'
  },
  {
    id: 'tm-5',
    name: 'Aisha Patel',
    email: 'aisha@acme.com',
    role: 'HR Business Partner',
    track: 'HR',
    progress: 58,
    xp: 260,
    status: 'away',
    joinedDate: 'Mar 1, 2026'
  },
  {
    id: 'tm-6',
    name: 'Thomas Anderson',
    email: 'thomas@acme.com',
    role: 'Revenue Operations Specialist',
    track: 'Sales',
    progress: 45,
    xp: 190,
    status: 'active',
    joinedDate: 'Mar 15, 2026'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New module unlocked',
    body: 'Sales Track: Objection handling simulator is now ready for practice.',
    time: '2 hours ago',
    unread: true,
    type: 'lesson'
  },
  {
    id: 'notif-2',
    title: 'Team milestone unlocked! 🏆',
    body: 'Your team surpassed 500 completed lessons this month. Time-to-close improved by 28%.',
    time: '1 day ago',
    unread: true,
    type: 'milestone'
  },
  {
    id: 'notif-3',
    title: 'Knowledge Base Synced',
    body: '47 new documents successfully indexed and vectorized from Google Drive.',
    time: '2 days ago',
    unread: false,
    type: 'knowledge'
  }
];

export const DEMO_PERSONAS = [
  {
    name: 'Jane Cooper',
    email: 'jane.cooper@northwind.com',
    company: 'Northwind Enterprise',
    role: 'VP of Global Revenue',
    initials: 'JC',
    activeTrack: 'sales'
  },
  {
    name: 'Marcus Chen',
    email: 'marcus.chen@initech.com',
    company: 'Initech Global',
    role: 'Director of People Operations',
    initials: 'MC',
    activeTrack: 'hr'
  },
  {
    name: 'Sofia Rodriguez',
    email: 'sofia.r@acme.com',
    company: 'Acme Corp',
    role: 'Corporate Controller',
    initials: 'SR',
    activeTrack: 'finance'
  }
];
