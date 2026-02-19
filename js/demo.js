    (function() {
        'use strict';

        // ============================================================
        // DATA MODEL
        // ============================================================

        const CONSTRUCTS = {
            cognitive: [
                {
                    id: 'FI',
                    name: 'Fluid Intelligence',
                    measures: 'Abstract reasoning and novel problem solving without known templates.',
                    predicts: 'Novel problem-solving and rapid adaptation.',
                    matters: 'Enables rapid root-cause isolation when a process drifts or a new fixture is introduced.',
                    operationalValue: 'Reduces time to stabilize new setups and prevents scrap during first-article runs.',
                    development: [
                        'Improves with structured post-mortem reviews on unfamiliar failures.',
                        'Improves through cross-training on new cell layouts and tooling.'
                    ]
                },
                {
                    id: 'ER',
                    name: 'Extrapolational Reasoning',
                    measures: 'Projecting trends and downstream effects from partial signals.',
                    predicts: 'Anticipating outcomes and second-order effects.',
                    matters: 'Helps foresee tolerance stack issues before they hit inspection.',
                    operationalValue: 'Prevents late-stage scrap by predicting drift and compensating early.',
                    development: [
                        'Improves with exposure to SPC trend analysis and yield data.',
                        'Improves by practicing pre-mortem planning for process changes.'
                    ]
                },
                {
                    id: 'ICI',
                    name: 'Cognitive Interference Control',
                    measures: 'Maintaining attention and task priority amid distraction.',
                    predicts: 'Focus stability under interruption.',
                    matters: 'Protects critical steps during multi-alarm or high-traffic shifts.',
                    operationalValue: 'Reduces rework by preventing skipped or out-of-sequence steps.',
                    development: [
                        'Improves with standardized checklists and interruption protocols.',
                        'Improves with supervised operation under simulated alarm load.'
                    ]
                },
                {
                    id: 'MAC',
                    name: 'Metacognitive Accuracy',
                    measures: 'Accuracy of self-assessment and error awareness.',
                    predicts: 'Realistic confidence and calibration.',
                    matters: 'Prevents overconfident adjustments that drive out-of-spec parts.',
                    operationalValue: 'Increases first-pass yield by catching uncertainty early.',
                    development: [
                        'Improves with coached decision logs and after-action reviews.',
                        'Improves with peer calibration sessions on measurement calls.'
                    ]
                },
                {
                    id: 'TCDQ',
                    name: 'Time-Compressed Decision Quality',
                    measures: 'Decision quality under time pressure and ambiguity.',
                    predicts: 'Sound judgment when time is limited.',
                    matters: 'Determines safe responses during line stoppages or tool alarms.',
                    operationalValue: 'Shortens downtime without sacrificing safety or quality.',
                    development: [
                        'Improves with timed troubleshooting drills.',
                        'Improves with supervised escalation practice.'
                    ]
                },
                {
                    id: 'CMR',
                    name: 'Causal Misattribution Resistance',
                    measures: 'Resistance to false causal links and confirmation bias.',
                    predicts: 'Hypothesis discipline in diagnostics.',
                    matters: 'Prevents chasing the wrong root cause during failures.',
                    operationalValue: 'Cuts mean time to repair by avoiding false fixes.',
                    development: [
                        'Improves with structured fault-tree analysis.',
                        'Improves through exposure to counterfactual testing.'
                    ]
                },
                {
                    id: 'ERCS',
                    name: 'Error Recovery & Correction Speed',
                    measures: 'Speed of detecting and correcting errors.',
                    predicts: 'Recovery velocity after mistakes.',
                    matters: 'Limits propagation of errors across a production batch.',
                    operationalValue: 'Reduces scrap and rework during tight-tolerance runs.',
                    development: [
                        'Improves with closed-loop feedback and rapid correction cycles.',
                        'Improves through supervised decision authority on minor deviations.'
                    ]
                }
            ],
            technical: [
                {
                    id: 'SRD',
                    name: 'Systems Reasoning & Diagnostics',
                    measures: 'Systems reasoning across mechanical, electrical, and process interactions.',
                    predicts: 'Diagnostic accuracy in complex systems.',
                    matters: 'Core for isolating faults in integrated machining and inspection cells.',
                    operationalValue: 'Enables faster stabilization of multi-step manufacturing flows.',
                    development: [
                        'Improves with cross-functional training on machine subsystems.',
                        'Improves through guided fault-tree walkthroughs.'
                    ]
                },
                {
                    id: 'PRAD',
                    name: 'Pattern Recognition & Anomaly Detection',
                    measures: 'Detection of subtle deviations, drift, and anomalies.',
                    predicts: 'Early warning of quality or process instability.',
                    matters: 'Protects against out-of-tolerance drift before it hits final inspection.',
                    operationalValue: 'Improves yield by catching deviation in-process.',
                    development: [
                        'Improves with SPC trend review practice.',
                        'Improves with exposure to historical drift patterns.'
                    ]
                },
                {
                    id: 'TMAQ',
                    name: 'Technical Math & Quant Reasoning',
                    measures: 'Applied math for tolerances, rates, and measurement systems.',
                    predicts: 'Accuracy in calculating offsets, feeds, and inspection criteria.',
                    matters: 'Required for CMM programming, tolerance stackups, and SPC.',
                    operationalValue: 'Prevents measurement and setup errors that drive scrap.',
                    development: [
                        'Improves with fixture math and tolerance exercises.',
                        'Improves through supervised CMM program validation.'
                    ]
                },
                {
                    id: 'DLCT',
                    name: 'Digital Logic & Computational Thinking',
                    measures: 'Logic sequencing, conditional reasoning, and algorithmic thinking.',
                    predicts: 'PLC, robot, and CNC program reasoning.',
                    matters: 'Foundational for CAM post-processing and automation logic.',
                    operationalValue: 'Reduces downtime from program errors or mis-sequencing.',
                    development: [
                        'Improves with ladder logic walkthroughs and dry runs.',
                        'Improves by reviewing post-processor output with supervision.'
                    ]
                },
                {
                    id: 'SPV',
                    name: 'Spatial & Process Visualization',
                    measures: 'Spatial reasoning and process flow visualization.',
                    predicts: 'Ability to plan toolpaths and fixture orientations.',
                    matters: 'Enables effective 5-axis setup planning and inspection coverage.',
                    operationalValue: 'Reduces collisions and improves surface finish consistency.',
                    development: [
                        'Improves with 3D simulation review and setup shadowing.',
                        'Improves through fixture planning exercises.'
                    ]
                },
                {
                    id: 'ASWL',
                    name: 'Attention Stability Under Load',
                    measures: 'Sustained vigilance under load and repetition.',
                    predicts: 'Stability across long shifts and batch runs.',
                    matters: 'Critical for monitoring multi-hour machining cycles.',
                    operationalValue: 'Prevents missed alarms and unnoticed drift.',
                    development: [
                        'Improves with structured rotation and check cadence.',
                        'Improves through supervised long-cycle monitoring.'
                    ]
                },
                {
                    id: 'FIDS',
                    name: 'Fault Isolation & Debug Speed',
                    measures: 'Speed and accuracy of isolating fault sources.',
                    predicts: 'Time to repair and restart.',
                    matters: 'Reduces line downtime during unexpected stops.',
                    operationalValue: 'Improves OEE by shortening diagnosis cycles.',
                    development: [
                        'Improves with standardized troubleshooting trees.',
                        'Improves by practicing root-cause isolation drills.'
                    ]
                },
                {
                    id: 'ISI',
                    name: 'Information Security Instinct',
                    measures: 'Security instinct and access discipline.',
                    predicts: 'Resistance to social engineering and policy violations.',
                    matters: 'Protects IP and prevents unauthorized program changes.',
                    operationalValue: 'Reduces risk of compromised toolpaths or data loss.',
                    development: [
                        'Improves with incident debriefs and access-control drills.',
                        'Improves through supervised credential hygiene checks.'
                    ]
                },
                {
                    id: 'RRCP',
                    name: 'Reliability & Rules Compliance',
                    measures: 'Consistency and adherence to procedures.',
                    predicts: 'Reliability under SOPs and audits.',
                    matters: 'Maintains safety margins and quality compliance.',
                    operationalValue: 'Protects audit readiness and reduces variance.',
                    development: [
                        'Improves with checklist discipline and peer verification.',
                        'Improves through exposure to audit walk-throughs.'
                    ]
                }
            ],
            integrity: [
                {
                    id: 'VCS',
                    name: 'Values Conflict Scenarios',
                    measures: 'Ethical decision making under pressure.',
                    predicts: 'Willingness to uphold quality when rushed.',
                    matters: 'Prevents shortcuts during high-pressure production pushes.',
                    operationalValue: 'Protects brand and safety by keeping quality gates intact.',
                    development: [
                        'Improves with scenario-based ethics training.',
                        'Improves through reinforcement of stop-work authority.'
                    ]
                },
                {
                    id: 'BCC',
                    name: 'Behavioral Consistency Cross-Check',
                    measures: 'Consistency of responses across scenarios.',
                    predicts: 'Behavioral reliability and honesty.',
                    matters: 'Flags instability or impression management in critical roles.',
                    operationalValue: 'Improves trust in operator reporting and escalation.',
                    development: [
                        'Improves with coaching on transparent incident reporting.',
                        'Improves through consistent feedback loops.'
                    ]
                },
                {
                    id: 'MAI',
                    name: 'Mission Alignment Indicator',
                    measures: 'Alignment with mission and values.',
                    predicts: 'Long-term engagement and discretionary effort.',
                    matters: 'Predicts sustained commitment to quality and safety standards.',
                    operationalValue: 'Improves retention and adherence to mission-critical standards.',
                    development: [
                        'Improves with clear mission ownership and mentorship.',
                        'Improves by connecting work to mission outcomes.'
                    ]
                }
            ]
        };

        const ROLES = [
            { id: 'cnc-setup-operator', name: 'CNC Setup & Operator', abbr: 'CNC Setup' },
            { id: 'tooling-engineer', name: 'Tooling Engineer', abbr: 'Tooling Eng' },
            { id: 'cam-programmer', name: 'CAM Programmer', abbr: 'CAM Prog' },
            { id: 'quality-metrology', name: 'CMM Programmer', abbr: 'CMM Prog' },
            { id: 'strategic-sourcing', name: 'Strategic Sourcing Manager', abbr: 'Sourcing' },
            { id: 'mfg-engineer', name: 'Manufacturing Engineer (Production)', abbr: 'Mfg Eng' }
        ];

        const DETAIL_ROLE_OPTIONS = [
            { id: 'cnc-setup-operator', name: 'CNC Setup & Operator' },
            { id: 'tooling-engineer', name: 'Tooling Engineer' },
            { id: 'cam-programmer', name: 'CAM Programmer' },
            { id: 'quality-metrology', name: 'CMM Programmer' },
            { id: 'strategic-sourcing', name: 'Strategic Sourcing Manager' },
            { id: 'mfg-engineer', name: 'Manufacturing Engineer (Production)' }
        ];

        const ROLE_CUTLINES = {
            'cnc-setup-operator': {
                requirements: [
                    { construct: 'ICI', threshold: 65 },
                    { construct: 'RRCP', threshold: 65 },
                    { construct: 'ASWL', threshold: 60 },
                    { construct: 'PRAD', threshold: 60 },
                    { composite: 'manufacturingTechnical', threshold: 60 }
                ]
            },
            'tooling-engineer': {
                requirements: [
                    { construct: 'SPV', threshold: 65 },
                    { construct: 'TMAQ', threshold: 65 },
                    { construct: 'SRD', threshold: 60 },
                    { construct: 'FIDS', threshold: 60 },
                    { composite: 'technicalAptitude', threshold: 65 }
                ]
            },
            'cam-programmer': {
                requirements: [
                    { construct: 'SPV', threshold: 70 },
                    { construct: 'RRCP', threshold: 65 },
                    { construct: 'MAC', threshold: 60 },
                    { construct: 'SRD', threshold: 65 },
                    { composite: 'technicalAptitude', threshold: 65 }
                ]
            },
            'strategic-sourcing': {
                requirements: [
                    { construct: 'ER', threshold: 70 },
                    { construct: 'CMR', threshold: 65 },
                    { construct: 'MAC', threshold: 65 },
                    { construct: 'VCS', threshold: 65 },
                    { composite: 'behavioralIntegrity', threshold: 70 }
                ]
            },
            'quality-metrology': {
                requirements: [
                    { construct: 'PRAD', threshold: 70 },
                    { construct: 'TMAQ', threshold: 65 },
                    { construct: 'MAC', threshold: 60 },
                    { construct: 'RRCP', threshold: 65 },
                    { composite: 'behavioralIntegrity', threshold: 70 }
                ]
            },
            'mfg-engineer': {
                requirements: [
                    { construct: 'FI', threshold: 70 },
                    { construct: 'ER', threshold: 65 },
                    { construct: 'SRD', threshold: 65 },
                    { construct: 'CMR', threshold: 60 },
                    { composite: 'cognitiveCore', threshold: 70 }
                ]
            }
        };

        const ROLE_BENCHMARKS = {
            'cnc-setup-operator': {
                weights: { cognitive: 0.40, technical: 0.45, behavioral: 0.15 },
                cutlines: { high: 80, medium: 65 },
                topPerformerBenchmark: 85,
                priorityConstructs: ['ICI', 'RRCP', 'ASWL', 'PRAD', 'SPV', 'MAC', 'ER']
            },
            'tooling-engineer': {
                weights: { cognitive: 0.40, technical: 0.45, behavioral: 0.15 },
                cutlines: { high: 82, medium: 68 },
                topPerformerBenchmark: 88,
                priorityConstructs: ['SPV', 'TMAQ', 'SRD', 'FIDS', 'RRCP', 'MAC', 'ER', 'CMR']
            },
            'cam-programmer': {
                weights: { cognitive: 0.35, technical: 0.50, behavioral: 0.15 },
                cutlines: { high: 84, medium: 70 },
                topPerformerBenchmark: 90,
                priorityConstructs: ['SPV', 'RRCP', 'MAC', 'ICI', 'SRD', 'ERCS', 'TMAQ', 'ASWL']
            },
            'strategic-sourcing': {
                weights: { cognitive: 0.35, technical: 0.25, behavioral: 0.40 },
                cutlines: { high: 82, medium: 68 },
                topPerformerBenchmark: 88,
                priorityConstructs: ['ER', 'CMR', 'MAC', 'TCDQ', 'ERCS', 'VCS', 'MAI', 'BCC', 'SRD', 'PRAD', 'TMAQ', 'RRCP', 'ASWL']
            },
            'quality-metrology': {
                weights: { cognitive: 0.40, technical: 0.45, behavioral: 0.15 },
                cutlines: { high: 84, medium: 70 },
                topPerformerBenchmark: 90,
                priorityConstructs: ['SPV', 'MAC', 'RRCP', 'TMAQ', 'ICI', 'SRD', 'ASWL', 'CMR']
            },
            'mfg-engineer': {
                weights: { cognitive: 0.45, technical: 0.40, behavioral: 0.15 },
                cutlines: { high: 84, medium: 70 },
                topPerformerBenchmark: 90,
                priorityConstructs: ['FI', 'ER', 'CMR', 'TCDQ', 'SRD']
            }
        };

        const COMPOSITE_LABELS = {
            aci: 'ACI Overall',
            cognitiveCore: 'Cognitive Core',
            technicalAptitude: 'Technical Aptitude',
            behavioralIntegrity: 'Behavioral Integrity',
            manufacturingTechnical: 'Manufacturing Technical',
            generalTechnical: 'General Technical',
            learningVelocity: 'Learning Velocity',
            reliability: 'Reliability Index'
        };

        function generateCandidateData() {
            const candidates = [
                {
                    id: 'ACI-2024-0847',
                    name: 'Marcus Chen',
                    status: 'complete',
                    background: 'Former line cook, self-taught electronics hobbyist, community college coursework',
                    onboarding: 'Accelerated',
                    archetype: 'diamond',
                    baseScores: { cognitive: 82, technical: 78, integrity: 85 }
                },
                {
                    id: 'ACI-2024-0851',
                    name: 'Sarah Okonkwo',
                    status: 'complete',
                    background: 'Military avionics technician, 6 years active duty',
                    onboarding: 'Standard',
                    archetype: 'steady',
                    baseScores: { cognitive: 68, technical: 75, integrity: 92 }
                },
                {
                    id: 'ACI-2024-0856',
                    name: 'James Reilly',
                    status: 'complete',
                    background: 'BS Mechanical Engineering, 2 years automotive QC',
                    onboarding: 'Standard',
                    archetype: 'balanced',
                    baseScores: { cognitive: 71, technical: 73, integrity: 76 }
                },
                {
                    id: 'ACI-2024-0862',
                    name: 'Priya Sharma',
                    status: 'complete',
                    background: 'Community college mechatronics, internship at Tesla',
                    onboarding: 'Accelerated',
                    archetype: 'technical',
                    baseScores: { cognitive: 74, technical: 81, integrity: 79 }
                },
                {
                    id: 'ACI-2024-0869',
                    name: 'David Kim',
                    status: 'complete',
                    background: 'IT support background, cybersecurity bootcamp graduate',
                    onboarding: 'Standard',
                    archetype: 'cyber',
                    baseScores: { cognitive: 77, technical: 69, integrity: 82 }
                },
                {
                    id: 'ACI-2024-0873',
                    name: 'Tyler Morrison',
                    status: 'complete',
                    background: 'High school diploma, 3 years warehouse automation operator',
                    onboarding: 'Structured Support',
                    archetype: 'risky',
                    baseScores: { cognitive: 79, technical: 76, integrity: 52 }
                },
                {
                    id: 'ACI-2024-0881',
                    name: 'Elena Rodriguez',
                    status: 'complete',
                    background: 'AS Electronics Technology, semiconductor cleanroom experience',
                    onboarding: 'Standard',
                    archetype: 'fab-specialist',
                    baseScores: { cognitive: 65, technical: 79, integrity: 88 }
                },
                {
                    id: 'ACI-2024-0889',
                    name: 'Michael Oduya',
                    status: 'in-progress',
                    background: 'Physics undergraduate, research lab assistant',
                    onboarding: 'Accelerated',
                    archetype: 'analytical',
                    baseScores: { cognitive: 86, technical: 72, integrity: 80 }
                },
                {
                    id: 'ACI-2024-0894',
                    name: 'Jennifer Walsh',
                    status: 'complete',
                    background: 'Navy nuclear technician, honorable discharge',
                    onboarding: 'Accelerated',
                    archetype: 'elite',
                    baseScores: { cognitive: 88, technical: 85, integrity: 91 }
                },
                {
                    id: 'ACI-2024-0901',
                    name: 'Robert Tanaka',
                    status: 'complete',
                    background: 'Trade school HVAC, facility maintenance supervisor',
                    onboarding: 'Standard',
                    archetype: 'steady',
                    baseScores: { cognitive: 62, technical: 70, integrity: 86 }
                }
            ];

            return candidates.map(c => generateFullScores(c));
        }

        function generateFullScores(candidate) {
            const { baseScores, archetype } = candidate;
            const scores = {};
            const noise = () => Math.floor(Math.random() * 16) - 8;

            CONSTRUCTS.cognitive.forEach(construct => {
                let base = baseScores.cognitive + noise();
                if (archetype === 'diamond' && ['FI', 'ER', 'TCDQ'].includes(construct.id)) base += 8;
                if (archetype === 'steady' && ['ICI', 'MAC'].includes(construct.id)) base += 5;
                if (archetype === 'risky' && construct.id === 'ICI') base -= 15;
                if (archetype === 'analytical' && ['FI', 'ER', 'CMR'].includes(construct.id)) base += 10;
                if (archetype === 'elite') base += 5;
                scores[construct.id] = clampScore(base);
            });

            CONSTRUCTS.technical.forEach(construct => {
                let base = baseScores.technical + noise();
                if (archetype === 'diamond' && ['SRD', 'DLCT', 'FIDS'].includes(construct.id)) base += 6;
                if (archetype === 'steady' && ['RRCP', 'ASWL'].includes(construct.id)) base += 10;
                if (archetype === 'technical' && ['SRD', 'PRAD', 'FIDS'].includes(construct.id)) base += 8;
                if (archetype === 'cyber' && ['ISI', 'DLCT'].includes(construct.id)) base += 12;
                if (archetype === 'fab-specialist' && ['PRAD', 'ASWL', 'SPV'].includes(construct.id)) base += 10;
                if (archetype === 'elite') base += 5;
                scores[construct.id] = clampScore(base);
            });

            CONSTRUCTS.integrity.forEach(construct => {
                let base = baseScores.integrity + noise();
                if (archetype === 'risky') base -= 20;
                if (archetype === 'steady') base += 5;
                if (archetype === 'elite') base += 3;
                scores[construct.id] = clampScore(base);
            });

            const cognitiveAvg = average(CONSTRUCTS.cognitive.map(c => scores[c.id]));
            const technicalAvg = average(CONSTRUCTS.technical.map(c => scores[c.id]));
            const integrityAvg = average(CONSTRUCTS.integrity.map(c => scores[c.id]));

            const composites = {
                aci: Math.round(cognitiveAvg * 0.35 + technicalAvg * 0.45 + integrityAvg * 0.20),
                cognitiveCore: Math.round(cognitiveAvg),
                technicalAptitude: Math.round(technicalAvg),
                behavioralIntegrity: Math.round(integrityAvg),
                generalTechnical: Math.round(average([scores.FI, scores.SRD, scores.PRAD, scores.TMAQ, scores.DLCT])),
                manufacturingTechnical: Math.round(average([scores.SRD, scores.SPV, scores.ASWL, scores.FIDS, scores.RRCP])),
                semiconductor: Math.round(average([scores.PRAD, scores.ASWL, scores.SPV, scores.RRCP, scores.MAC])),
                cyber: Math.round(average([scores.ISI, scores.DLCT, scores.ICI, scores.PRAD, scores.SRD])),
                integrity: Math.round(integrityAvg),
                learningVelocity: Math.round(average([scores.FI, scores.ER, scores.MAC, scores.ERCS])),
                reliability: Math.round(average([scores.RRCP, scores.ASWL, scores.MAC, scores.VCS, scores.BCC]))
            };

            const roleScores = ROLES.map(role => {
                const cutline = ROLE_CUTLINES[role.id];
                let fitScore = 0;
                let passes = 0;
                cutline.requirements.forEach(req => {
                    const score = req.construct ? scores[req.construct] : composites[req.composite];
                    const percentile = scoreToPercentile(score);
                    if (percentile >= req.threshold) passes++;
                    fitScore += percentile - req.threshold;
                });
                return { role, fitScore, passes, total: cutline.requirements.length };
            });

            roleScores.sort((a, b) => b.fitScore - a.fitScore);
            const recommendedRoles = roleScores.slice(0, 2).filter(r => r.passes >= r.total - 1).map(r => r.role.id);
            const resolvedRoles = recommendedRoles.length > 0 ? recommendedRoles : [roleScores[0].role.id];
            const primaryRole = resolvedRoles[0];

            return {
                ...candidate,
                scores,
                composites,
                recommendedRoles: resolvedRoles,
                primaryRole,
                roleScores
            };
        }

        function clampScore(score) {
            return Math.max(20, Math.min(99, Math.round(score)));
        }

        function clamp01(value) {
            return Math.max(0, Math.min(1, value));
        }

        function average(arr) {
            return arr.reduce((a, b) => a + b, 0) / arr.length;
        }

        const DOMAIN_CONSTRUCTS = {
            cognitiveCore: ['FI', 'ER', 'ICI', 'MAC', 'TCDQ', 'CMR', 'ERCS'],
            technicalAptitude: ['SRD', 'PRAD', 'TMAQ', 'DLCT', 'SPV', 'ASWL', 'FIDS', 'ISI', 'RRCP'],
            behavioralAlignment: ['VCS', 'BCC', 'MAI']
        };

        const COMPOSITE_CONSTRUCT_MAP = {
            cognitiveCore: DOMAIN_CONSTRUCTS.cognitiveCore,
            technicalAptitude: DOMAIN_CONSTRUCTS.technicalAptitude,
            behavioralIntegrity: CONSTRUCTS.integrity.map(c => c.id),
            manufacturingTechnical: ['SRD', 'SPV', 'ASWL', 'FIDS', 'RRCP']
        };

        function computeDomainAverages(candidate) {
            const scores = candidate?.scores || {};
            const averageFor = (ids) => {
                const values = ids.map(id => scores[id]).filter(v => typeof v === 'number');
                if (!values.length) return null;
                return Math.round(values.reduce((sum, val) => sum + val, 0) / values.length);
            };

            return {
                cognitiveCore: averageFor(DOMAIN_CONSTRUCTS.cognitiveCore),
                technicalAptitude: averageFor(DOMAIN_CONSTRUCTS.technicalAptitude),
                behavioralAlignment: averageFor(DOMAIN_CONSTRUCTS.behavioralAlignment)
            };
        }

        function getPrimaryRole(candidate) {
            const roleId = candidate?.primaryRole || candidate?.recommendedRoles?.[0];
            return ROLES.find(role => role.id === roleId);
        }

        function scoreToPercentile(score) {
            return Math.max(1, Math.min(99, score));
        }

        function getBand(percentile) {
            if (percentile >= 85) return { label: 'Elite Readiness', class: 'elite' };
            if (percentile >= 60) return { label: 'Strong', class: 'strong' };
            if (percentile >= 40) return { label: 'Developing', class: 'developing' };
            return { label: 'Concern', class: 'concern' };
        }

        function getConfidenceInterval(score) {
            const margin = Math.floor(Math.random() * 4) + 3;
            return `±${margin}`;
        }

        function ordinal(n) {
            const s = ['th', 'st', 'nd', 'rd'];
            const v = n % 100;
            return n + (s[(v - 20) % 10] || s[v] || s[0]);
        }

        const EVIDENCE_DATA = {
            'FI': {
                scenario: 'Candidate was presented with an unfamiliar robotic arm exhibiting erratic movement patterns. No manual was provided. Task: diagnose and propose a solution within 8 minutes.',
                transcript: [
                    { speaker: 'system', content: 'The robotic arm is moving erratically during pick-and-place operations. You have no documentation. What do you do first?', time: '00:00' },
                    { speaker: 'candidate', content: 'I\'d start by observing the pattern—is it random or does it repeat? I want to see if it correlates with specific positions or load conditions.', time: '00:42' },
                    { speaker: 'system', content: 'It seems to happen more frequently when reaching the far corner of the workspace. What\'s your hypothesis?', time: '01:15' },
                    { speaker: 'candidate', content: 'Could be a calibration drift at extension limits, or a worn joint. I\'d check if reducing the reach envelope stabilizes it before opening up the arm.', time: '02:03' }
                ],
                rationale: 'Candidate demonstrated structured hypothesis generation without relying on documentation. Showed ability to isolate variables systematically and proposed non-destructive diagnostic steps.',
                indicators: { timePressure: 'high', interruptions: 'medium', ambiguity: 'high' }
            },
            'PRAD': {
                scenario: 'Live process monitoring dashboard showing 12 parameters over 4 hours. One subtle deviation introduced at t+2.5h. Candidate must identify the anomaly.',
                transcript: [
                    { speaker: 'system', content: 'You\'re monitoring a wafer processing tool. Review the trends and report any concerns.', time: '00:00' },
                    { speaker: 'candidate', content: 'Chamber pressure looks stable, temperature within spec... wait, the RF power variance increased slightly around 2:30. It\'s within limits but the pattern changed.', time: '03:24' },
                    { speaker: 'system', content: 'Is that significant enough to act on?', time: '03:45' },
                    { speaker: 'candidate', content: 'The magnitude is small but the character changed—used to be random noise, now it\'s periodic. I\'d flag it for the next PM window even if we don\'t stop now.', time: '04:12' }
                ],
                rationale: 'Candidate detected subtle pattern shift despite nominal values. Distinguished between random variation and systematic change. Calibrated response appropriately.',
                indicators: { timePressure: 'low', interruptions: 'low', ambiguity: 'medium' }
            },
            'ICI': {
                scenario: 'Multi-tasking scenario with primary calibration task and frequent interruptions (simulated radio calls, alarms, colleague questions).',
                transcript: [
                    { speaker: 'system', content: 'Continue calibrating the measurement probe. [INTERRUPT: Alarm sounds] There\'s a low-priority alert on Line 3.', time: '00:00' },
                    { speaker: 'candidate', content: 'Acknowledged. I\'ll note it but I\'m mid-calibration. If it escalates, pull me out, but let me finish this step or we\'ll have to restart.', time: '00:18' },
                    { speaker: 'system', content: '[INTERRUPT: Colleague asks about break schedule] Also, when are we taking lunch?', time: '01:45' },
                    { speaker: 'candidate', content: 'After I finish this. Please hold non-urgent questions.', time: '01:52' }
                ],
                rationale: 'Maintained task focus despite multiple interruption types. Appropriately triaged interruptions by urgency. Did not sacrifice primary task quality for social responsiveness.',
                indicators: { timePressure: 'medium', interruptions: 'high', ambiguity: 'low' }
            },
            'ISI': {
                scenario: 'Social engineering attempt via simulated phone call requesting system access credentials for "urgent maintenance."',
                transcript: [
                    { speaker: 'system', content: '[Phone rings] Hi, this is Mike from IT. We need your login to push an urgent security patch to your workstation. Can you give me your password?', time: '00:00' },
                    { speaker: 'candidate', content: 'I can\'t give out my password over the phone. Is there a ticket number for this? I can verify with our IT lead.', time: '00:22' },
                    { speaker: 'system', content: 'There\'s no time for that. The patch has to go in now or we\'ll have to take the whole network down.', time: '00:35' },
                    { speaker: 'candidate', content: 'Then you\'ll need to take it down. I\'m not authorized to share credentials regardless of urgency. I can call the IT desk to verify you.', time: '00:48' }
                ],
                rationale: 'Candidate resisted social pressure and urgency framing. Offered verification path rather than outright refusal, showing security awareness without being obstructive.',
                indicators: { timePressure: 'high', interruptions: 'low', ambiguity: 'medium' }
            },
            'VCS': {
                scenario: 'Ethical dilemma: supervisor suggests skipping a time-consuming QC step to meet shift quota. No immediate safety risk but procedure violation.',
                transcript: [
                    { speaker: 'system', content: 'Your supervisor says: "We\'re behind quota. Skip the secondary inspection on these units—they look fine. I\'ll sign off."', time: '00:00' },
                    { speaker: 'candidate', content: 'I understand the pressure, but if we skip inspection and something slips through, it\'s worse for everyone. Can we flag these for next shift to catch up properly?', time: '00:34' },
                    { speaker: 'system', content: 'That makes me look bad to my boss. Just this once—nobody will know.', time: '00:52' },
                    { speaker: 'candidate', content: 'I\'m not comfortable with that. If the process is too slow we should raise it as a capacity issue, not work around it.', time: '01:15' }
                ],
                rationale: 'Candidate maintained procedural integrity under social pressure from authority figure. Offered constructive alternatives rather than simple refusal.',
                indicators: { timePressure: 'medium', interruptions: 'low', ambiguity: 'medium' }
            }
        };

        function getDefaultEvidence(construct) {
            return {
                scenario: `Adaptive scenario testing for ${construct.name}. Candidate was presented with domain-specific challenges calibrated to their demonstrated ability level.`,
                transcript: [
                    { speaker: 'system', content: 'Initial prompt presented based on role-relevant context.', time: '00:00' },
                    { speaker: 'candidate', content: 'Response captured and analyzed for construct-relevant indicators.', time: '00:30' },
                    { speaker: 'system', content: 'Follow-up probe adjusted based on initial response quality.', time: '01:00' }
                ],
                rationale: `Scoring based on standardized rubric for ${construct.id}. AI adapted difficulty and pacing while maintaining fixed scoring constructs.`,
                indicators: { timePressure: 'medium', interruptions: 'low', ambiguity: 'medium' }
            };
        }

        // ============================================================
        // STATE MANAGEMENT
        // ============================================================

        const state = {
            currentView: 'overview',
            selectedCandidate: null,
            selectedRole: 'cnc-setup-operator',
            lastRoleSeedCandidate: null,
            roleHintDismissed: false,
            sortBy: 'aci',
            sortDirection: 'desc',
            roleFilter: 'all',
            cutlineFilter: false,
            filterText: '',
            candidates: generateCandidateData(),
            expandedSections: { cognitive: false, technical: false, integrity: false },
            expandedConstructs: {}
        };

        function setState(updates) {
            Object.assign(state, updates);
            render();
        }

        // ============================================================
        // RENDERING
        // ============================================================

        function render() {
            renderNavigation();
            renderCurrentView();
        }

        function renderNavigation() {
            document.querySelectorAll('.nav-tab').forEach(tab => {
                const view = tab.dataset.view;
                const isActive = view === state.currentView ||
                    (state.currentView === 'candidate-detail' && view === 'candidates');
                tab.classList.toggle('active', isActive);
                tab.setAttribute('aria-selected', isActive);
                tab.setAttribute('tabindex', isActive ? '0' : '-1');
            });
        }

        function renderCurrentView() {
            document.querySelectorAll('.view').forEach(view => {
                view.classList.remove('active');
            });

            const viewId = state.currentView === 'candidate-detail' ? 'candidate-detail' : state.currentView;
            const viewEl = document.getElementById(`view-${viewId}`);
            if (viewEl) {
                viewEl.classList.add('active');
            }

            switch (state.currentView) {
                case 'overview':
                    renderOverview();
                    break;
                case 'candidates':
                    renderCandidates();
                    break;
                case 'candidate-detail':
                    renderCandidateDetail();
                    break;
                case 'cutlines':
                    renderCutlines();
                    break;
                case 'heatmap':
                    renderHeatmap();
                    break;
            }
        }

        // ============================================================
        // OVERVIEW VIEW
        // ============================================================

        function renderOverview() {
            const container = document.getElementById('overview-dashboard');
            const candidates = getFilteredCandidates().slice(0, 6);

            let html = `<div class="overview-grid">`;

            candidates.forEach(c => {
                const band = getBand(c.composites.aci);
                const roles = c.recommendedRoles.map(rid => ROLES.find(r => r.id === rid)?.abbr || rid);
                html += `
                    <div class="overview-card" data-candidate="${c.id}">
                        <div class="overview-card-header">
                            <div class="overview-card-info">
                                <div class="overview-card-name">${c.name}</div>
                                <div class="overview-card-id">${c.id}</div>
                            </div>
                            <div class="overview-card-score">
                                <div class="overview-card-value">${c.composites.aci}</div>
                                <div class="overview-card-band">${band.label}</div>
                            </div>
                        </div>
                        <div class="overview-card-roles">
                            ${roles.map(r => `<span class="role-chip primary">${r}</span>`).join('')}
                        </div>
                    </div>
                `;
            });

            html += '</div>';
            container.innerHTML = html;

            container.querySelectorAll('[data-candidate]').forEach(el => {
                el.addEventListener('click', () => {
                    const candidateId = el.dataset.candidate;
                    setState({ currentView: 'candidate-detail', selectedCandidate: candidateId });
                });
            });
        }

        // ============================================================
        // CANDIDATES VIEW
        // ============================================================

        function getFilteredCandidates() {
            let candidates = [...state.candidates];

            if (state.roleFilter !== 'all') {
                candidates = candidates.filter(c => c.recommendedRoles.includes(state.roleFilter));
            }

            if (state.cutlineFilter && state.roleFilter !== 'all') {
                candidates = candidates.filter(c => meetsCutline(c, state.roleFilter));
            }

            const sortKey = {
                'aci': 'aci',
                'cognitive': 'cognitiveCore',
                'technical': 'technicalAptitude',
                'behavioral': 'behavioralAlignment'
            }[state.sortBy] || 'aci';

            const filterValue = state.filterText.trim().toLowerCase();
            if (filterValue && state.currentView === 'candidates') {
                candidates = candidates.filter(candidate => {
                    const primaryRole = getPrimaryRole(candidate);
                    const roleText = primaryRole ? `${primaryRole.name} ${primaryRole.abbr}` : '';
                    const bandLabel = getBand(candidate.composites.aci).label;
                    const haystack = `${candidate.name} ${roleText} ${bandLabel}`.toLowerCase();
                    return haystack.includes(filterValue);
                });
            }

            candidates.sort((a, b) => {
                const aDomains = computeDomainAverages(a);
                const bDomains = computeDomainAverages(b);
                const aVal = sortKey in aDomains ? (aDomains[sortKey] ?? 0) : a.composites[sortKey];
                const bVal = sortKey in bDomains ? (bDomains[sortKey] ?? 0) : b.composites[sortKey];
                return state.sortDirection === 'desc' ? bVal - aVal : aVal - bVal;
            });

            return candidates;
        }

        function meetsCutline(candidate, roleId) {
            const cutline = ROLE_CUTLINES[roleId];
            if (!cutline) return true;

            return cutline.requirements.every(req => {
                const score = req.construct ? candidate.scores[req.construct] : candidate.composites[req.composite];
                const percentile = scoreToPercentile(score);
                return percentile >= req.threshold;
            });
        }

        function renderCandidates() {
            const container = document.getElementById('candidates-table-container');
            const candidates = getFilteredCandidates();

            let html = `
                <table class="candidate-table" role="grid">
                    <thead>
                        <tr>
                            <th>Candidate</th>
                            <th>Target Role</th>
                            <th data-sort="aci" class="${state.sortBy === 'aci' ? 'sorted' : ''}">
                                ACI <span class="sort-indicator">${state.sortBy === 'aci' ? (state.sortDirection === 'desc' ? '↓' : '↑') : '↓'}</span>
                            </th>
                            <th data-sort="cognitive" class="${state.sortBy === 'cognitive' ? 'sorted' : ''}">
                                Cognitive Core <span class="sort-indicator">${state.sortBy === 'cognitive' ? (state.sortDirection === 'desc' ? '↓' : '↑') : '↓'}</span>
                            </th>
                            <th data-sort="technical" class="${state.sortBy === 'technical' ? 'sorted' : ''}">
                                Technical Aptitude <span class="sort-indicator">${state.sortBy === 'technical' ? (state.sortDirection === 'desc' ? '↓' : '↑') : '↓'}</span>
                            </th>
                            <th data-sort="behavioral" class="${state.sortBy === 'behavioral' ? 'sorted' : ''}">
                                Behavioral Integrity &amp; Mission Alignment <span class="sort-indicator">${state.sortBy === 'behavioral' ? (state.sortDirection === 'desc' ? '↓' : '↑') : '↓'}</span>
                            </th>
                            <th>Band</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            candidates.forEach(c => {
                const aciBand = getBand(c.composites.aci);
                const domains = computeDomainAverages(c);
                const cognitiveBand = domains.cognitiveCore ? getBand(domains.cognitiveCore) : null;
                const technicalBand = domains.technicalAptitude ? getBand(domains.technicalAptitude) : null;
                const behavioralBand = domains.behavioralAlignment ? getBand(domains.behavioralAlignment) : null;
                const primaryRole = getPrimaryRole(c);
                const primaryRoleLabel = primaryRole?.name || '—';

                html += `
                    <tr data-candidate="${c.id}" data-aci="${c.composites.aci}" tabindex="0" role="row">
                        <td>
                            <div class="candidate-name">${c.name}</div>
                            <div class="candidate-id">${c.id}</div>
                        </td>
                        <td>
                            <span class="role-chip primary">${primaryRoleLabel}</span>
                        </td>
                        <td><span class="score-cell ${aciBand.class}">${c.composites.aci}</span></td>
                        <td><span class="score-cell ${cognitiveBand ? cognitiveBand.class : ''}">${domains.cognitiveCore ?? '—'}</span></td>
                        <td><span class="score-cell ${technicalBand ? technicalBand.class : ''}">${domains.technicalAptitude ?? '—'}</span></td>
                        <td><span class="score-cell ${behavioralBand ? behavioralBand.class : ''}">${domains.behavioralAlignment ?? '—'}</span></td>
                        <td><span class="score-cell ${aciBand.class}">${aciBand.label}</span></td>
                    </tr>
                `;
            });

            html += '</tbody></table>';
            container.innerHTML = html;

            container.querySelectorAll('th[data-sort]').forEach(th => {
                th.addEventListener('click', () => {
                    const sortKey = th.dataset.sort;
                    if (state.sortBy === sortKey) {
                        setState({ sortDirection: state.sortDirection === 'desc' ? 'asc' : 'desc' });
                    } else {
                        setState({ sortBy: sortKey, sortDirection: 'desc' });
                    }
                });
            });

            container.querySelectorAll('tr[data-candidate]').forEach(tr => {
                tr.addEventListener('click', () => {
                    setState({ currentView: 'candidate-detail', selectedCandidate: tr.dataset.candidate });
                });
                tr.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setState({ currentView: 'candidate-detail', selectedCandidate: tr.dataset.candidate });
                    }
                });
            });
        }

        // ============================================================
        // CANDIDATE DETAIL VIEW
        // ============================================================

        function renderCandidateDetail() {
            const container = document.getElementById('candidate-detail-content');
            const candidate = state.candidates.find(c => c.id === state.selectedCandidate);

            if (!candidate) {
                container.innerHTML = '<p>Candidate not found.</p>';
                return;
            }

            const aciBand = getBand(candidate.composites.aci);
            const roleRankings = getRoleRankings(candidate);
            const primaryRoleId = candidate.primaryRole || roleRankings[0]?.role?.id || 'cnc-setup-operator';
            if (state.lastRoleSeedCandidate !== candidate.id) {
                state.selectedRole = primaryRoleId;
                state.lastRoleSeedCandidate = candidate.id;
            }
            const detailRoleId = getDetailRoleId(primaryRoleId);
            const summary = buildExecutiveSummary(candidate, primaryRoleId, detailRoleId);
            const roleInsights = getRoleInsights(candidate, detailRoleId);
            const professionalContext = expandBackgroundToTwoSentences(candidate.background);
            const displayAciLabel = (aciBand.label === 'Elite Readiness') ? 'Elite' : aciBand.label;
            const validationItems = getValidationItems(candidate, detailRoleId, roleInsights);
            const onboardingPlan = getOnboardingPlan(candidate, detailRoleId, roleInsights);
            const benchmark = getBenchmarkComparison(candidate, detailRoleId);

            let html = `
                <div class="detail-header">
                    <div class="detail-candidate-info">
                        <h2 class="detail-candidate-name">${candidate.name}</h2>
                        <div class="detail-candidate-meta">
                            <span style="font-family: var(--font-mono);">${candidate.id}</span>
                            <span class="divider"></span>
                            <span class="candidate-status ${candidate.status === 'complete' ? 'complete' : 'in-progress'}">
                                <span class="status-dot"></span>
                                ${candidate.status === 'complete' ? 'Complete' : 'In Progress'}
                            </span>
                            <span class="divider"></span>
                            <span class="onboarding-indicator">
                                <span class="onboarding-dot ${candidate.onboarding.toLowerCase().replace(' ', '-')}"></span>
                                ${candidate.onboarding}
                            </span>
                        </div>
                        <div class="detail-candidate-background">${candidate.background}</div>
                        <div class="detail-professional-context">
                            <div class="detail-context-label">Professional Context</div>
                            <div class="detail-context-text">${professionalContext}</div>
                        </div>
                    </div>
                    <div class="detail-aci-score">
                        <div class="detail-aci-label">Arklight Cognitive Index</div>
                        <div class="detail-aci-value">${candidate.composites.aci}</div>
                        <div class="detail-aci-percentile">${ordinal(candidate.composites.aci)} Percentile</div>
                        <div class="detail-aci-band">${displayAciLabel}</div>
                        <div class="detail-aci-microcopy">ACI estimates the average weighted score relevant to the roles assigned to the candidate. Does not replace interviews, hands-on trials, or manager judgment.</div>
                    </div>
                </div>

                <div class="detail-summary-grid">
                    ${renderExecutiveSummary(summary)}
                    ${renderRoleFitMapping(candidate, roleRankings, detailRoleId, roleInsights)}
                </div>

                <div class="charts-grid">
                    <div class="chart-container full-width">
                        <h3 class="chart-title">Cognitive Profile</h3>
                        <div class="radar-chart" id="radar-chart"></div>
                        ${renderRadarCallouts(roleInsights)}
                        ${renderRadarLegend()}
                        <p class="chart-note">Benchmarks are derived from extensive behavioral and aptitude testing of top performers who support the American industrial base across the public and private sector.</p>
                    </div>
                </div>

                ${renderValidationProtocol(validationItems, detailRoleId)}
                ${renderOnboardingPlan(onboardingPlan, detailRoleId)}
                ${renderBenchmarkComparison(benchmark, detailRoleId)}

                <section class="section-header">
                    <h2 class="section-title">Construct-Level Detail</h2>
                </section>

                ${renderConstructSection('cognitive', 'Cognitive Core', CONSTRUCTS.cognitive, candidate)}
                ${renderConstructSection('technical', 'Technical Aptitude', CONSTRUCTS.technical, candidate)}
                ${renderConstructSection('integrity', 'Behavioral Integrity', CONSTRUCTS.integrity, candidate)}
            `;

            container.innerHTML = html;
            renderRadarChart(candidate);
            setupConstructListeners();

            const roleSelect = container.querySelector('#intended-role-select');
            const validationRoleSelect = container.querySelector('#validation-role-select');
            const handleRoleChange = (e) => {
                setState({ selectedRole: e.target.value, roleHintDismissed: true });
            };
            if (roleSelect) {
                roleSelect.addEventListener('change', handleRoleChange);
            }
            if (validationRoleSelect) {
                validationRoleSelect.addEventListener('change', handleRoleChange);
            }
        }

        function getRoleRankings(candidate) {
            if (candidate.roleScores && candidate.roleScores.length) {
                return candidate.roleScores;
            }
            return ROLES.map(role => {
                const cutline = ROLE_CUTLINES[role.id];
                let fitScore = 0;
                let passes = 0;
                const total = cutline?.requirements?.length || 0;
                cutline?.requirements?.forEach(req => {
                    const score = req.construct ? candidate.scores[req.construct] : candidate.composites[req.composite];
                    const percentile = scoreToPercentile(score);
                    if (percentile >= req.threshold) passes++;
                    fitScore += percentile - req.threshold;
                });
                return { role, fitScore, passes, total };
            }).sort((a, b) => b.fitScore - a.fitScore);
        }

        function getDetailRoleId(primaryRoleId) {
            const optionIds = DETAIL_ROLE_OPTIONS.map(option => option.id);
            if (optionIds.includes(state.selectedRole)) return state.selectedRole;
            if (optionIds.includes(primaryRoleId)) return primaryRoleId;
            return DETAIL_ROLE_OPTIONS[0].id;
        }

        function getConstructById(constructId) {
            return [...CONSTRUCTS.cognitive, ...CONSTRUCTS.technical, ...CONSTRUCTS.integrity].find(c => c.id === constructId);
        }

        function getRoleDisplayName(roleId) {
            return DETAIL_ROLE_OPTIONS.find(option => option.id === roleId)?.name ||
                ROLES.find(role => role.id === roleId)?.name ||
                'Selected role';
        }

        function expandBackgroundToTwoSentences(backgroundString) {
            const raw = (backgroundString || '').trim();
            if (!raw) {
                return 'Background information not provided. Review resume and references for operational history.';
            }

            const lower = raw.toLowerCase();
            const branchMap = {
                'air force': 'Air Force',
                'army': 'Army',
                'navy': 'Navy',
                'marine corps': 'Marine Corps',
                'marines': 'Marine Corps',
                'coast guard': 'Coast Guard',
                'space force': 'Space Force',
                'national guard': 'National Guard'
            };

            let branch = '';
            Object.keys(branchMap).forEach(key => {
                if (!branch && lower.includes(key)) {
                    branch = branchMap[key];
                }
            });

            const statusKeywords = [
                'honorable discharge',
                'active duty',
                'veteran',
                'reserve',
                'retired'
            ];
            const hasStatus = statusKeywords.some(keyword => lower.includes(keyword));

            const segments = raw.split(',').map(item => item.trim()).filter(Boolean);
            const primary = segments[0] || raw;
            const additional = segments.slice(1).join(', ');
            const rolePhrase = additional ? `${primary}, ${additional}` : primary;

            const jobSignals = {
                technical: /(technician|engineer|engineering|programmer|mechatronics|electronics|avionics|nuclear|cybersecurity|it support|qc|quality|metrology|automation|robotics|hvac)/i,
                operations: /(operator|assembly|manufacturing|production|machinist|maintenance|warehouse|line cook|cook|facility)/i,
                leadership: /(supervisor|lead|manager)/i,
                research: /(research|lab|assistant|physics)/i,
                training: /(community college|coursework|bootcamp|internship|degree|bachelor|bs|ba|as)/i
            };

            let roleType = 'hands-on professional';
            if (jobSignals.leadership.test(raw)) {
                roleType = 'operational leadership';
            } else if (jobSignals.technical.test(raw) && jobSignals.operations.test(raw)) {
                roleType = 'technical and operational';
            } else if (jobSignals.technical.test(raw)) {
                roleType = 'technical';
            } else if (jobSignals.operations.test(raw)) {
                roleType = 'operational';
            } else if (jobSignals.research.test(raw)) {
                roleType = 'technical and analytical';
            } else if (jobSignals.training.test(raw)) {
                roleType = 'training-focused';
            }

            let environment = 'structured professional settings';
            if (branch) {
                environment = `${branch} service settings`;
            } else if (hasStatus) {
                environment = 'service settings';
            } else if (/(military|avionics|nuclear|defense|aerospace|security)/i.test(raw)) {
                environment = 'regulated, safety-critical settings';
            } else if (/(manufacturing|production|operator|machinist|assembly|quality|qc|metrology|automation|robotics|maintenance|warehouse)/i.test(raw)) {
                environment = 'procedure-driven operational settings';
            } else if (jobSignals.training.test(raw) || jobSignals.research.test(raw)) {
                environment = 'training and applied learning settings';
            } else if (/(it support|cybersecurity)/i.test(raw)) {
                environment = 'controlled technical settings';
            }

            let accountability = 'high-accountability expectations';
            if (/(nuclear|avionics|defense|aerospace|quality|qc|inspection)/i.test(raw)) {
                accountability = 'safety and quality-critical accountability';
            } else if (jobSignals.leadership.test(raw)) {
                accountability = 'leadership accountability';
            } else if (jobSignals.technical.test(raw)) {
                accountability = 'technical accountability';
            } else if (jobSignals.operations.test(raw)) {
                accountability = 'procedure-driven accountability';
            } else if (hasStatus) {
                accountability = 'standards-driven accountability';
            }

            const sentenceOne = `Background includes ${rolePhrase}, reflecting ${roleType} work in ${environment} with ${accountability}.`;
            const sentenceTwo = 'This background suggests disciplined execution, careful documentation, and reliable follow-through in routine work.';

            return `${sentenceOne} ${sentenceTwo}`;
        }

        function getFitLevelClass(level) {
            if (level === 'High') return 'high';
            if (level === 'Low') return 'low';
            return 'medium';
        }

        function getRoleMinimums(roleId) {
            const minimums = { constructs: {}, composites: {} };
            const cutline = ROLE_CUTLINES[roleId];
            if (cutline?.requirements?.length) {
                cutline.requirements.forEach(req => {
                    if (req.construct) {
                        minimums.constructs[req.construct] = req.threshold;
                    }
                    if (req.composite) {
                        minimums.composites[req.composite] = req.threshold;
                    }
                });
            }
            return minimums;
        }

        function computeRoleFitFromBenchmarks(candidate, roleId) {
            const benchmark = ROLE_BENCHMARKS[roleId];
            const domains = computeDomainAverages(candidate);
            if (!benchmark || !domains) {
                return {
                    roleScore: 0,
                    fitLevel: 'Medium',
                    roleFitScore: 0,
                    domainAverages: domains,
                    benchmark: null
                };
            }

            // Fit is computed by matching candidate domain averages to the selected role's benchmark weights and cutlines.
            const cognitive = domains.cognitiveCore ?? 0;
            const technical = domains.technicalAptitude ?? 0;
            const behavioral = domains.behavioralAlignment ?? 0;
            const roleScore = Math.round(
                (cognitive * benchmark.weights.cognitive) +
                (technical * benchmark.weights.technical) +
                (behavioral * benchmark.weights.behavioral)
            );

            let fitLevel = 'Low';
            if (roleScore >= benchmark.cutlines.high) fitLevel = 'High';
            if (roleScore >= benchmark.cutlines.medium && roleScore < benchmark.cutlines.high) fitLevel = 'Medium';

            const roleFitScore = roleScore >= benchmark.cutlines.medium ?
                clamp01((roleScore - benchmark.cutlines.medium) / (benchmark.cutlines.high - benchmark.cutlines.medium)) :
                0;

            return { roleScore, fitLevel, roleFitScore, domainAverages: domains, benchmark };
        }

        function getRoleFitSummary(candidate, roleId) {
            const fit = computeRoleFitFromBenchmarks(candidate, roleId);
            const benchmark = fit.benchmark;
            if (!benchmark) {
                return { rating: 'Medium', roleFitScore: 0, strengths: [], risks: [], benchmark: null };
            }

            const prioritized = (benchmark.priorityConstructs || []).map(id => {
                const construct = getConstructById(id);
                const score = candidate.scores[id];
                if (!construct || typeof score !== 'number') return null;
                return {
                    construct,
                    score,
                    percentile: scoreToPercentile(score)
                };
            }).filter(Boolean);

            const strengths = [...prioritized].sort((a, b) => b.score - a.score);
            const risks = [...prioritized].sort((a, b) => a.score - b.score);

            return {
                rating: fit.fitLevel,
                roleScore: fit.roleScore,
                roleFitScore: fit.roleFitScore,
                strengths,
                risks,
                benchmark
            };
        }

        function getRoleInsights(candidate, roleId) {
            const summary = getRoleFitSummary(candidate, roleId);
            const benchmark = summary.benchmark || ROLE_BENCHMARKS[roleId];
            const priorityIds = benchmark?.priorityConstructs || [];
            const strongThreshold = benchmark?.cutlines?.medium ?? 65;
            const minimums = getRoleMinimums(roleId);

            const prioritized = priorityIds.map(id => {
                const construct = getConstructById(id);
                const score = candidate.scores[id];
                if (!construct || typeof score !== 'number') return null;
                return {
                    construct,
                    score,
                    minThreshold: minimums.constructs[id] ?? strongThreshold
                };
            }).filter(Boolean);

            const strengths = prioritized
                .filter(item => item.score >= item.minThreshold)
                .sort((a, b) => b.score - a.score)
                .slice(0, 3);

            const compositeShortfalls = Object.keys(minimums.composites)
                .filter(comp => typeof candidate.composites[comp] === 'number' && candidate.composites[comp] < minimums.composites[comp]);

            const getCompositeGapForConstruct = (constructId) => {
                let maxGap = 0;
                compositeShortfalls.forEach(comp => {
                    const group = COMPOSITE_CONSTRUCT_MAP[comp] || [];
                    if (!group.includes(constructId)) return;
                    const gap = minimums.composites[comp] - candidate.composites[comp];
                    if (gap > maxGap) maxGap = gap;
                });
                return maxGap;
            };

            const riskZones = prioritized
                .map(item => {
                    const constructGap = item.score < item.minThreshold ? item.minThreshold - item.score : 0;
                    const compositeGap = getCompositeGapForConstruct(item.construct.id);
                    const gap = Math.max(constructGap, compositeGap);
                    if (gap <= 0) return null;
                    return { ...item, gap };
                })
                .filter(Boolean)
                .sort((a, b) => b.gap - a.gap)
                .slice(0, 3);

            const why = strengths.slice(0, 2).map(s => `${s.construct.name} (${s.score}) supports ${s.construct.predicts.toLowerCase()}.`);
            while (why.length < 2 && prioritized[why.length]) {
                const item = prioritized[why.length];
                if (item?.construct) {
                    why.push(`${item.construct.name} (${item.score}) strengthens ${item.construct.predicts.toLowerCase()}.`);
                } else {
                    break;
                }
            }

            const conditions = [];
            if (candidate.composites.reliability < 70) {
                conditions.push('Use checklists and explicit stop rules on high-risk work.');
            }
            if (candidate.composites.learningVelocity < 70) {
                conditions.push('Confirm understanding before first-run execution and document SOP checkpoints.');
            }
            if (conditions.length < 2 && strengths[0]) {
                conditions.push(`Anchor ${strengths[0].construct.name.toLowerCase()} strengths with short feedback loops and first-article sign-off.`);
            }
            if (conditions.length < 2) {
                conditions.push('Pair with a senior operator for first-run validation and early QA sign-off.');
            }

            const watchouts = riskZones.length ?
                riskZones.map(r => `Monitor ${r.construct.predicts.toLowerCase()} on early runs given lower ${r.construct.name.toLowerCase()}.`) :
                ['No critical watch-outs flagged; monitor early shift reliability.'];

            return {
                rating: summary.rating,
                strengths,
                riskZones,
                why,
                conditions: conditions.slice(0, 2),
                watchouts: watchouts.slice(0, 2),
                summary
            };
        }

        function buildExecutiveSummary(candidate, primaryRoleId, selectedRoleId) {
            const primaryFit = getRoleFitSummary(candidate, primaryRoleId);
            const selectedFit = getRoleFitSummary(candidate, selectedRoleId);
            const recommendation = getRecommendation(candidate, primaryFit);
            const primaryRoleName = getRoleDisplayName(primaryRoleId);
            const fitClass = getFitLevelClass(primaryFit.rating);
            return {
                recommendation,
                primaryRoleFit: `${primaryRoleName} · <span class="fit-level ${fitClass}">${primaryFit.rating}</span>`,
                rampProjection: getRampProjection(selectedFit.roleFitScore),
                primaryRisks: getRiskFlags(candidate),
                hiringManager: getHiringManagerGuidance(candidate, selectedRoleId)
            };
        }

        function getRecommendation(candidate, roleFit) {
            const strongIntegrity = candidate.composites.behavioralIntegrity >= 65;
            const strongReliability = candidate.composites.reliability >= 65;
            if (roleFit.rating === 'High' && strongIntegrity && strongReliability) return 'Proceed';
            if (roleFit.rating === 'Low' || candidate.composites.behavioralIntegrity < 55) return 'Hold';
            return 'Conditional';
        }

        function getRampProjection(roleFitScore) {
            const rampMinWeeks = 2;
            const rampMaxWeeks = 14;
            const rawWeeks = Math.round(rampMaxWeeks - (roleFitScore * (rampMaxWeeks - rampMinWeeks)));
            const clampedWeeks = Math.max(rampMinWeeks, Math.min(rampMaxWeeks, rawWeeks));
            return `Based on assessment scores, Arklight projects a full capacity ramp relative to top industry performers by ${clampedWeeks} weeks.`;
        }

        function getHiringManagerGuidance(candidate, roleId) {
            const insights = getRoleInsights(candidate, roleId);
            const guidance = [];
            guidance.push(candidate.composites.learningVelocity >= 70 ?
                'Give direct feedback in short cycles and raise task complexity after clean early wins.' :
                'Use short cycles with explicit SOP checkpoints before increasing complexity.');
            guidance.push(candidate.composites.reliability >= 70 ?
                'Confirm understanding before first-run execution and grant autonomy once QA sign-offs are consistent.' :
                'Keep checklists visible and require first-run sign-offs until repeatability is stable.');
            if (insights.riskZones[0]?.construct) {
                guidance.push(`Double-check ${insights.riskZones[0].construct.name.toLowerCase()} on early runs and document corrections.`);
            }
            return guidance.slice(0, 3);
        }

        function getAssessmentInconsistency(candidate) {
            if (candidate.composites.learningVelocity >= 70 && candidate.composites.reliability < 60) {
                return 'high learning velocity paired with lower reliability';
            }
            if (candidate.composites.technicalAptitude >= 75 && candidate.composites.behavioralIntegrity < 60) {
                return 'strong technical aptitude paired with integrity risk';
            }
            if (candidate.composites.cognitiveCore >= 75 && candidate.composites.manufacturingTechnical < 60) {
                return 'cognitive strength paired with weaker manufacturing execution';
            }
            return '';
        }

        function getNextSteps(candidate, primaryRoleId, recommendation, primaryFit) {
            const steps = [];
            const roleName = ROLES.find(r => r.id === primaryRoleId)?.name || 'the role';
            const leadStrength = primaryFit.strengths?.[0]?.construct?.name;
            const action = recommendation === 'Proceed' ? 'Proceed with' :
                (recommendation === 'Hold' ? 'Hold until' : 'Proceed conditionally with');
            const focus = leadStrength ? ` focused on ${leadStrength.toLowerCase()}` : '';
            steps.push(`${action} a role-aligned work sample for ${roleName}${focus}.`);

            const inconsistency = getAssessmentInconsistency(candidate);
            if (inconsistency) {
                steps.push(`Probe ${inconsistency} against the job description and shift demands.`);
            } else {
                steps.push('Validate role-critical exposure and supervision expectations against the job description.');
            }
            return steps;
        }

        function getOverallPotential(candidate) {
            const band = getBand(candidate.composites.aci).label;
            if (band === 'Elite Readiness') return 'Top-tier operator with high upside for precision manufacturing and metrology roles.';
            if (band === 'Strong') return 'Strong operational performer with consistent learning velocity and low error risk.';
            if (band === 'Developing') return 'Developing talent with targeted coaching potential for production-facing roles.';
            return 'High-risk placement without close supervision and structured development.';
        }

        function getDeploymentConfidence(candidate) {
            const strongReliability = candidate.composites.reliability >= 70;
            const strongIntegrity = candidate.composites.behavioralIntegrity >= 70;
            const strongAci = candidate.composites.aci >= 70;
            return (strongReliability && strongIntegrity && strongAci) ?
                'High confidence for direct placement' :
                'High potential with mentorship';
        }

        function getRiskFlags(candidate) {
            const risks = [];
            if (candidate.composites.behavioralIntegrity < 60) {
                risks.push('Behavioral integrity below target for high-trust roles.');
            }
            if (candidate.composites.reliability < 60) {
                risks.push('Reliability index below target for sustained production loads.');
            }
            if (candidate.composites.learningVelocity < 55) {
                risks.push('Learning velocity below target for rapid ramp expectations.');
            }
            if (risks.length === 0) {
                return ['No primary risks flagged; validate role-specific exposure and safety compliance.'];
            }
            return risks.slice(0, 3);
        }

        function getBestUseOfCandidate(candidate) {
            const primaryRoleId = getRoleRankings(candidate)[0]?.role?.id;
            const bestUseByRole = {
                'quality-metrology': 'Lead CMM programming and first-article inspection; drive gage R&R, SPC calls, and containment when drift appears.',
                'mfg-engineer': 'Bridge process planning and production execution; optimize setups, tolerance stackups, and quality escape prevention.'
            };
            return bestUseByRole[primaryRoleId] ||
                'Deploy across CNC and metrology workflows where precision, repeatability, and disciplined inspection are required.';
        }

        function renderExecutiveSummary(summary) {
            return `
                <div class="chart-container executive-summary">
                    <h3 class="chart-title">Executive Summary</h3>
                    <div class="summary-grid">
                        ${renderSummaryRow('Recommendation', summary.recommendation)}
                        ${renderSummaryRow('Primary Role Fit', summary.primaryRoleFit)}
                        ${renderSummaryRow('Ramp Projection', summary.rampProjection)}
                        ${renderSummaryRow('Primary Risks', summary.primaryRisks)}
                        ${renderSummaryRow('For Hiring Manager', summary.hiringManager)}
                    </div>
                </div>
            `;
        }

        function renderSummaryRow(label, value) {
            const valueHtml = Array.isArray(value) ?
                `<div class="summary-value"><ul class="summary-list">${value.map(item => `<li>${item}</li>`).join('')}</ul></div>` :
                `<div class="summary-value">${value}</div>`;
            return `
                <div class="summary-row">
                    <div class="summary-label">${label}</div>
                    ${valueHtml}
                </div>
            `;
        }

        function renderRoleFitMapping(candidate, roleRankings, selectedRoleId, roleInsights) {
            const primaryId = roleRankings[0]?.role?.id;
            const secondaryId = roleRankings[1]?.role?.id;
            const fitClass = getFitLevelClass(roleInsights.rating);
            const fitLabel = `<span class="fit-level ${fitClass}">${roleInsights.rating}</span>`;
            return `
                <div class="chart-container role-fit-mapping">
                    <h3 class="chart-title">Intended Role</h3>
                    <div class="role-selector">
                        <label class="control-label" for="intended-role-select">Intended Role</label>
                        <select id="intended-role-select">
                            ${DETAIL_ROLE_OPTIONS.map(option => `
                                <option value="${option.id}" ${option.id === selectedRoleId ? 'selected' : ''}>${option.name}</option>
                            `).join('')}
                        </select>
                        <div class="role-hint ${state.roleHintDismissed ? '' : 'pulsing'}">See how this candidate performs in other roles you are hiring for.</div>
                    </div>
                    <div class="summary-grid role-fit-grid">
                        ${renderSummaryRow('Role Fit', fitLabel)}
                        ${renderSummaryRow('Why', roleInsights.why)}
                        ${renderSummaryRow('Conditions for Success', roleInsights.conditions)}
                        ${renderSummaryRow('Watch-outs', roleInsights.watchouts)}
                    </div>
                    <div class="role-fit-text">Adjacent roles with strong alignment:</div>
                    <div class="role-chips">
                        ${ROLES.map(role => `<span class="role-chip ${role.id === primaryId || role.id === secondaryId ? 'primary' : ''}">${role.name}</span>`).join('')}
                    </div>
                </div>
            `;
        }

        function renderRadarCallouts(roleInsights) {
            const strengths = roleInsights.strengths.map(s => `${s.construct.name} (${s.construct.id})`).join(', ') || 'No standout strengths identified';
            const risks = roleInsights.riskZones.length ?
                roleInsights.riskZones.map(r => `${r.construct.name} (${r.construct.id})`).join(', ') :
                'No material gaps against the primary role benchmark.';
            return `
                <div class="radar-callouts">
                    <div class="radar-callout">
                        <div class="callout-label">Top strengths</div>
                        <div class="callout-value">${strengths}</div>
                    </div>
                    <div class="radar-callout">
                        <div class="callout-label">Risk zones</div>
                        <div class="callout-value">${risks}</div>
                    </div>
                    <div class="radar-callout">
                        <div class="callout-label">Benchmark reference</div>
                        <div class="callout-value">Benchmarks are derived from extensive behavioral and aptitude testing of top performers who support the American industrial base across the public and private sector.</div>
                    </div>
                </div>
            `;
        }

        function renderRadarLegend() {
            const legendItems = [
                {
                    id: 'cognitive',
                    title: 'Cognitive Core',
                    measures: 'Core cognitive abilities that determine learning speed, decision quality, error avoidance, and long-term performance ceiling.',
                    predicts: 'Training speed, crisis judgment, analytic rigor, and recovery resilience.'
                },
                {
                    id: 'technical',
                    title: 'Technical Aptitude',
                    measures: 'How well a candidate thinks and operates inside real, constrained technical systems.',
                    predicts: 'Execution quality, troubleshooting speed, and operational reliability.'
                },
                {
                    id: 'integrity',
                    title: 'Behavioral Integrity & Mission Alignment',
                    measures: 'Behavior under constraint, not personality.',
                    predicts: 'Trustworthiness, retention, and alignment with high-stakes missions.'
                }
            ];

            return `
                <div class="radar-legend">
                    ${legendItems.map(item => `
                        <div class="radar-legend-item">
                            <div class="radar-legend-header">
                                <span class="radar-legend-swatch ${item.id}"></span>
                                <div class="radar-legend-title">${item.title}</div>
                            </div>
                            <div class="radar-legend-text"><strong>Measures</strong>: ${item.measures}</div>
                            <div class="radar-legend-text"><strong>Predicts</strong>: ${item.predicts}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        function getValidationItems(candidate, roleId, roleInsights) {
            const cutline = ROLE_CUTLINES[roleId];
            const constructs = (cutline?.requirements || [])
                .filter(req => req.construct)
                .map(req => getConstructById(req.construct))
                .filter(Boolean);
            const fallback = roleInsights?.strengths?.map(item => item.construct).filter(Boolean) || [];
            const unique = [...constructs, ...fallback].filter((construct, index, arr) => arr.findIndex(c => c.id === construct.id) === index);
            const selected = unique.slice(0, 3);

            return selected.map(construct => ({
                title: construct.name,
                validate: construct.measures.replace(/\.$/, ''),
                why: construct.matters,
                prompt: `Describe a recent time you had to ${construct.predicts.toLowerCase()}. What did you check first?`,
                positive: `Uses a clear method and verification steps tied to ${construct.predicts.toLowerCase()}.`,
                watch: `Skips verification or relies on assumptions despite ${construct.predicts.toLowerCase()}.`
            }));
        }

        function renderValidationRow(label, value) {
            return `
                <div class="validation-row">
                    <div class="validation-label">${label}</div>
                    <div class="validation-value">${value}</div>
                </div>
            `;
        }

        function renderValidationProtocol(items, roleId) {
            return `
                <div class="chart-container detail-section validation-protocol">
                    <h3 class="chart-title">Targeted Validation Protocol</h3>
                    <div class="validation-role">
                        <span>Aligned to</span>
                        <select id="validation-role-select">
                            ${DETAIL_ROLE_OPTIONS.map(option => `
                                <option value="${option.id}" ${option.id === roleId ? 'selected' : ''}>${option.name}</option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="validation-list">
                        ${items.map(item => `
                            <div class="validation-item">
                                <div class="validation-item-title">${item.title}</div>
                                ${renderValidationRow('What to Validate', item.validate)}
                                ${renderValidationRow('Why It Matters for the Selected Role', item.why)}
                                ${renderValidationRow('Validation Prompt', item.prompt)}
                                ${renderValidationRow('Positive Signal', item.positive)}
                                ${renderValidationRow('Watch Signal', item.watch)}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        function getOnboardingPlan(candidate, roleId, roleInsights) {
            const roleName = getRoleDisplayName(roleId);
            const strength = roleInsights.strengths[0]?.construct?.name || 'core technical reasoning';
            const risk = roleInsights.riskZones[0]?.construct?.name || 'reliability under load';

            const managerGuidance = [
                candidate.composites.learningVelocity >= 70 ?
                    'Fast feedback cadence with stretch tasks after early wins.' :
                    'Structured ramp with explicit sequencing and quality gates.',
                candidate.composites.reliability >= 70 ?
                    'Autonomy once SOP compliance is stable and repeatable.' :
                    'Frequent check-ins with escalation expectations and peer verification.'
            ];

            const onboardingWeeks = [
                { label: 'Week 1', text: `Shadow ${roleName} workflows and review safety, SOP, and ${strength.toLowerCase()} tasks.` },
                { label: 'Week 2', text: `Guided execution with supervisor sign-off; emphasize ${risk.toLowerCase()} checks.` },
                { label: 'Week 3', text: 'Independent runs with daily QA review and structured error-recovery drills.' },
                { label: 'Week 4', text: 'Own a full setup cycle and document corrective actions with minimal supervision.' }
            ];

            const successMetrics = [
                'First-pass yield holds at or above team baseline.',
                'SOP and quality gate adherence remains consistent across shifts.',
                'Ramp velocity meets role expectations with declining rework.'
            ];

            return { roleName, managerGuidance, onboardingWeeks, successMetrics };
        }

        function renderOnboardingPlan(plan, roleId) {
            return `
                <div class="chart-container detail-section onboarding-plan">
                    <h3 class="chart-title">Onboarding & Deployment Plan</h3>
                    <div class="onboarding-grid">
                        <div class="onboarding-block">
                            <div class="onboarding-title">Manager Guidance</div>
                            <ul class="summary-list">
                                ${plan.managerGuidance.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="onboarding-block">
                            <div class="onboarding-title">30-Day Onboarding Plan</div>
                            <div class="onboarding-weeks">
                                ${plan.onboardingWeeks.map(week => `
                                    <div class="onboarding-week">
                                        <div class="week-label">${week.label}</div>
                                        <div class="week-text">${week.text}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div class="onboarding-block">
                            <div class="onboarding-title">Early Success Metrics</div>
                            <ul class="summary-list">
                                ${plan.successMetrics.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        }

        function getQuartileThreshold(scores) {
            if (!scores.length) return 0;
            const sorted = [...scores].sort((a, b) => a - b);
            const index = Math.floor(0.75 * (sorted.length - 1));
            return sorted[index];
        }

        function getBenchmarkComparison(candidate, roleId) {
            const cohortScores = state.candidates.map(c => c.composites.aci);
            const higher = cohortScores.filter(score => score > candidate.composites.aci).length;
            const rank = higher + 1;
            const total = cohortScores.length;
            const topPercent = Math.max(1, Math.round((rank / total) * 100));

            const cutline = ROLE_CUTLINES[roleId];
            let passes = 0;
            let totalReq = 0;
            const gaps = [];
            if (cutline) {
                cutline.requirements.forEach(req => {
                    totalReq += 1;
                    const score = req.construct ? candidate.scores[req.construct] : candidate.composites[req.composite];
                    const percentile = scoreToPercentile(score);
                    if (percentile >= req.threshold) {
                        passes += 1;
                    } else {
                        const label = req.construct ?
                            (getConstructById(req.construct)?.name || req.construct) :
                            (COMPOSITE_LABELS[req.composite] || req.composite.replace(/([A-Z])/g, ' $1').trim());
                        gaps.push(label);
                    }
                });
            }

            const learningThreshold = getQuartileThreshold(state.candidates.map(c => c.composites.learningVelocity));
            const reliabilityThreshold = getQuartileThreshold(state.candidates.map(c => c.composites.reliability));

            return {
                rank,
                total,
                topPercent,
                passes,
                totalReq,
                gaps: gaps.slice(0, 2),
                learningVelocity: candidate.composites.learningVelocity,
                reliability: candidate.composites.reliability,
                learningThreshold,
                reliabilityThreshold
            };
        }

        function renderBenchmarkComparison(benchmark, roleId) {
            const alignment = benchmark.totalReq ?
                `Meets ${benchmark.passes} of ${benchmark.totalReq} thresholds${benchmark.gaps.length ? `; gaps: ${benchmark.gaps.join(', ')}` : ''}.` :
                'Role thresholds unavailable.';
            const rampRelative = benchmark.learningVelocity >= benchmark.learningThreshold ? 'above' : 'below';
            const reliabilityRelative = benchmark.reliability >= benchmark.reliabilityThreshold ? 'above' : 'below';
            return `
                <div class="chart-container detail-section benchmark-comparison">
                    <h3 class="chart-title">Benchmark / Cohort Comparison</h3>
                    <div class="benchmark-grid">
                        <div class="benchmark-item">
                            <div class="benchmark-label">Standing vs assessed cohort</div>
                            <div class="benchmark-value">Top ${benchmark.topPercent}% (rank ${benchmark.rank} of ${benchmark.total})</div>
                        </div>
                        <div class="benchmark-item">
                            <div class="benchmark-label">Alignment vs role benchmark thresholds</div>
                            <div class="benchmark-value">${alignment}</div>
                        </div>
                        <div class="benchmark-item">
                            <div class="benchmark-label">Relative ramp and reliability vs top performers</div>
                            <div class="benchmark-value">Learning velocity ${rampRelative} top-quartile; reliability ${reliabilityRelative} top-quartile performers.</div>
                        </div>
                    </div>
                </div>
            `;
        }

        function renderDomainSection(domain) {
            return `
                <div class="chart-container domain-card">
                    <div class="domain-header">
                        <div class="domain-title">${domain.title}</div>
                        <div class="domain-purpose">${domain.purpose}</div>
                    </div>
                    <div class="domain-table">
                        <div class="domain-row header">
                            <div class="domain-cell">Subtest</div>
                            <div class="domain-cell">What it measures</div>
                            <div class="domain-cell">Predicts</div>
                            <div class="domain-cell">${domain.valueLabel}</div>
                        </div>
                        ${domain.constructs.map(c => `
                            <div class="domain-row">
                                <div class="domain-cell domain-name">${c.name} (${c.id})</div>
                                <div class="domain-cell">${c.measures}</div>
                                <div class="domain-cell">${c.predicts}</div>
                                <div class="domain-cell">${c.operationalValue}</div>
                            </div>
                        `).join('')}
                    </div>
                    ${domain.summary ? `<div class="domain-summary">${domain.summary}</div>` : ''}
                </div>
            `;
        }

        function renderConstructSection(sectionId, title, constructs, candidate) {
            const isExpanded = state.expandedSections[sectionId];
            return `
                <div class="construct-section ${isExpanded ? 'expanded' : ''}" data-section="${sectionId}">
                    <div class="construct-section-header" tabindex="0" role="button" aria-expanded="${isExpanded}">
                        <div class="construct-section-title">
                            ${title}
                            <span class="construct-section-count">${constructs.length} constructs</span>
                        </div>
                        <span class="construct-section-toggle">▼</span>
                    </div>
                    <div class="construct-cards">
                        ${constructs.map(c => renderConstructCard(c, candidate)).join('')}
                    </div>
                </div>
            `;
        }

        function renderConstructCard(construct, candidate) {
            const score = candidate.scores[construct.id];
            const percentile = scoreToPercentile(score);
            const band = getBand(percentile);
            const ci = getConfidenceInterval(score);
            const isExpanded = state.expandedConstructs[construct.id];
            const evidence = EVIDENCE_DATA[construct.id] || getDefaultEvidence(construct);

            return `
                <div class="construct-card ${isExpanded ? 'evidence-open' : ''}" data-construct="${construct.id}">
                    <div class="construct-card-header">
                        <div class="construct-info">
                            <div class="construct-name">
                                ${construct.name}
                                <span class="construct-abbr">${construct.id}</span>
                            </div>
                            <div class="construct-measures"><strong>Measures</strong>: ${construct.measures}</div>
                            <div class="construct-predicts"><strong>Predicts</strong>: ${construct.predicts}</div>
                            <div class="construct-operational">Operational value: ${construct.operationalValue}</div>
                        </div>
                        <div class="construct-scores">
                            <div class="construct-score-secondary">
                                <div class="construct-percentile">${ordinal(percentile)} %ile</div>
                                <div class="construct-ci">${ci}</div>
                            </div>
                            <div class="construct-score-main">
                                <div class="construct-score-value text-${band.class}">${score}</div>
                                <div class="construct-score-label">${band.label}</div>
                            </div>
                            <button class="construct-expand-btn" aria-label="Show evidence">
                                ${isExpanded ? '−' : '+'}
                            </button>
                        </div>
                    </div>
                    <div class="construct-evidence">
                        <div class="evidence-section">
                            <div class="evidence-label">Scenario</div>
                            <div class="evidence-scenario">${evidence.scenario}</div>
                        </div>
                        <div class="evidence-section">
                            <div class="evidence-label">Transcript Excerpt</div>
                            <div class="evidence-transcript">
                                ${evidence.transcript.map(turn => `
                                    <div class="transcript-turn">
                                        <div class="transcript-speaker ${turn.speaker}">${turn.speaker === 'system' ? 'System' : 'Candidate'}</div>
                                        <div class="transcript-content">${turn.content}</div>
                                        <div class="transcript-timestamp">${turn.time}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div class="evidence-section">
                            <div class="evidence-label">Scoring Rationale</div>
                            <div class="evidence-rationale">${evidence.rationale}</div>
                        </div>
                        <div class="evidence-section">
                            <div class="evidence-label">Conditions</div>
                            <div class="evidence-indicators">
                                <div class="indicator-item">
                                    <span class="indicator-dot ${evidence.indicators.timePressure}"></span>
                                    Time Pressure: ${evidence.indicators.timePressure}
                                </div>
                                <div class="indicator-item">
                                    <span class="indicator-dot ${evidence.indicators.interruptions}"></span>
                                    Interruptions: ${evidence.indicators.interruptions}
                                </div>
                                <div class="indicator-item">
                                    <span class="indicator-dot ${evidence.indicators.ambiguity}"></span>
                                    Ambiguity: ${evidence.indicators.ambiguity}
                                </div>
                            </div>
                        </div>
                        <div class="evidence-section">
                            <div class="evidence-label">Development Guidance</div>
                            <ul class="evidence-list">
                                ${construct.development.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="evidence-section">
                            <div class="standardization-note">
                                AI adapts difficulty and pacing to candidate ability. Scoring constructs remain fixed across all candidates.
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        function setupConstructListeners() {
            document.querySelectorAll('.construct-section-header').forEach(header => {
                header.addEventListener('click', () => {
                    const section = header.parentElement;
                    const sectionId = section.dataset.section;
                    state.expandedSections[sectionId] = !state.expandedSections[sectionId];
                    section.classList.toggle('expanded');
                    header.setAttribute('aria-expanded', state.expandedSections[sectionId]);
                });
                header.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        header.click();
                    }
                });
            });

            document.querySelectorAll('.construct-card-header').forEach(header => {
                header.addEventListener('click', () => {
                    const card = header.parentElement;
                    const constructId = card.dataset.construct;
                    state.expandedConstructs[constructId] = !state.expandedConstructs[constructId];
                    card.classList.toggle('evidence-open');
                    const btn = header.querySelector('.construct-expand-btn');
                    if (btn) btn.textContent = state.expandedConstructs[constructId] ? '−' : '+';
                });
            });
        }

        // ============================================================
        // RADAR CHART
        // ============================================================

        function renderRadarChart(candidate) {
            const container = document.getElementById('radar-chart');
            if (!container) return;

            const CONSTRUCT_TOOLTIP_COPY = {
                FI: {
                    title: 'Fluid Intelligence (FI)',
                    body: 'How quickly someone can understand new problems and learn complex systems without needing repeated instruction.'
                },
                ER: {
                    title: 'Extrapolational Reasoning (ER)',
                    body: 'Ability to see what is likely to happen next and act before small issues become major failures.'
                },
                ICI: {
                    title: 'Cognitive Inhibition / Interference Control (ICI)',
                    body: 'Ability to pause, double check, and avoid wrong actions when under time pressure or stress.'
                },
                MAC: {
                    title: 'Metacognitive Accuracy (MAC)',
                    body: 'Ability to accurately judge what they know and when to ask for help, avoiding dangerous overconfidence.'
                },
                TCDQ: {
                    title: 'Time-Compressed Decision Quality (TCDQ)',
                    body: 'Ability to make correct decisions even when time is limited and stakes are high.'
                },
                CMR: {
                    title: 'Causal Misattribution Resistance (CMR)',
                    body: 'Ability to diagnose problems based on evidence rather than assumptions or false explanations.'
                },
                ERCS: {
                    title: 'Error Recovery & Correction Speed (ERCS)',
                    body: 'Ability to quickly recognize a mistake, change course, and restore operations.'
                },
                SRD: {
                    title: 'Systems Reasoning & Diagnostics (SRD)',
                    body: 'Ability to understand how complex systems work together and trace problems to their true root cause.'
                },
                PRAD: {
                    title: 'Pattern Recognition & Anomaly Detection (PRAD)',
                    body: 'Ability to notice subtle issues or irregularities that others miss in noisy or data-heavy environments.'
                },
                TMAQ: {
                    title: 'Technical Math & Quant Reasoning (TMAQ)',
                    body: 'Ability to understand tolerances, measurements, and how small errors can create large downstream problems.'
                },
                DLCT: {
                    title: 'Digital Logic & Computational Thinking (DLCT)',
                    body: 'Ability to understand and troubleshoot automated systems, logic flows, and machine behavior.'
                },
                SPV: {
                    title: 'Spatial & Process Visualization (SPV)',
                    body: 'Ability to mentally visualize physical systems, workflows, and 3D environments accurately.'
                },
                ASWL: {
                    title: 'Attention Stability Under Load (ASWL)',
                    body: 'Ability to maintain focus, accuracy, and consistency during long shifts or high intensity work.'
                },
                FIDS: {
                    title: 'Fault Isolation & Debug Speed (FIDS)',
                    body: 'Ability to quickly isolate the real source of a failure in complex or noisy conditions.'
                },
                ISI: {
                    title: 'Information Security Instinct (ISI)',
                    body: 'Natural awareness of digital risks and ability to avoid unsafe or careless security behavior.'
                },
                RRCP: {
                    title: 'Reliability & Rules Compliance (RRCP)',
                    body: 'Ability to consistently follow procedures and safety rules even under pressure or urgency.'
                },
                VCS: {
                    title: 'Values Conflict Scenarios (VCS)',
                    body: 'How someone makes decisions when safety, ethics, or rules are in conflict with speed or convenience.'
                },
                BCC: {
                    title: 'Behavioral Consistency Cross-Check (BCC)',
                    body: 'Whether someone remains honest and consistent over time rather than gaming the system.'
                },
                MAI: {
                    title: 'Mission Alignment Indicator (MAI)',
                    body: 'Whether someone’s personal values align with high responsibility, long term mission driven work.'
                }
            };

            const constructs = [...CONSTRUCTS.cognitive, ...CONSTRUCTS.technical, ...CONSTRUCTS.integrity];
            const scores = constructs.map(c => candidate.scores[c.id]);
            const labels = constructs.map(c => c.id);
            const cognitiveCount = CONSTRUCTS.cognitive.length;
            const technicalCount = CONSTRUCTS.technical.length;

            const width = 320;
            const height = 320;
            const centerX = width / 2;
            const centerY = height / 2;
            const radius = 120;
            const levels = 4;

            let svg = `<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="Radar chart">`;

            for (let level = 1; level <= levels; level++) {
                const levelRadius = (radius / levels) * level;
                const points = [];
                for (let i = 0; i < constructs.length; i++) {
                    const angle = (Math.PI * 2 * i) / constructs.length - Math.PI / 2;
                    const x = centerX + Math.cos(angle) * levelRadius;
                    const y = centerY + Math.sin(angle) * levelRadius;
                    points.push(`${x},${y}`);
                }
                svg += `<polygon points="${points.join(' ')}" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>`;
            }

            for (let i = 0; i < constructs.length; i++) {
                const angle = (Math.PI * 2 * i) / constructs.length - Math.PI / 2;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                const construct = constructs[i];
                const category = i < cognitiveCount ? 'cognitive' : i < cognitiveCount + technicalCount ? 'technical' : 'integrity';
                svg += `<line x1="${centerX}" y1="${centerY}" x2="${x}" y2="${y}" class="radar-axis category-${category}"/>`;

                const labelRadius = radius + 16;
                const labelX = centerX + Math.cos(angle) * labelRadius;
                const labelY = centerY + Math.sin(angle) * labelRadius;
                const textAnchor = Math.abs(Math.cos(angle)) < 0.1 ? 'middle' :
                                   Math.cos(angle) > 0 ? 'start' : 'end';
                svg += `<text x="${labelX}" y="${labelY}" text-anchor="${textAnchor}" font-size="9" font-family="var(--font-mono)" dominant-baseline="middle" class="radar-label category-${category}" data-construct-index="${i}">${labels[i]}</text>`;
            }

            const dataPoints = [];
            for (let i = 0; i < constructs.length; i++) {
                const angle = (Math.PI * 2 * i) / constructs.length - Math.PI / 2;
                const value = scores[i] / 100;
                const x = centerX + Math.cos(angle) * radius * value;
                const y = centerY + Math.sin(angle) * radius * value;
                dataPoints.push(`${x},${y}`);
            }

            svg += `<polygon points="${dataPoints.join(' ')}" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.6)" stroke-width="1"/>`;

            for (let i = 0; i < constructs.length; i++) {
                const angle = (Math.PI * 2 * i) / constructs.length - Math.PI / 2;
                const value = scores[i] / 100;
                const x = centerX + Math.cos(angle) * radius * value;
                const y = centerY + Math.sin(angle) * radius * value;
                const category = i < cognitiveCount ? 'cognitive' : i < cognitiveCount + technicalCount ? 'technical' : 'integrity';
                svg += `<circle cx="${x}" cy="${y}" r="3" class="radar-point category-${category}"/>`;
            }

            svg += '</svg>';
            container.innerHTML = svg;

            let tooltip = container.querySelector('.radar-tooltip');
            if (!tooltip) {
                tooltip = document.createElement('div');
                tooltip.className = 'radar-tooltip';
                tooltip.setAttribute('aria-hidden', 'true');
                container.appendChild(tooltip);
            }

            const positionTooltip = (event) => {
                const containerRect = container.getBoundingClientRect();
                const tooltipRect = tooltip.getBoundingClientRect();
                let left = event.clientX - containerRect.left + 12;
                let top = event.clientY - containerRect.top + 12;

                if (left + tooltipRect.width > containerRect.width) {
                    left = event.clientX - containerRect.left - tooltipRect.width - 12;
                }

                if (top + tooltipRect.height > containerRect.height) {
                    top = event.clientY - containerRect.top - tooltipRect.height - 12;
                }

                tooltip.style.left = `${Math.max(8, left)}px`;
                tooltip.style.top = `${Math.max(8, top)}px`;
            };

            container.querySelectorAll('.radar-label').forEach(label => {
                label.addEventListener('mouseenter', (event) => {
                    const index = Number(event.currentTarget.dataset.constructIndex);
                    const construct = constructs[index];
                    if (!construct) return;
                    const copy = CONSTRUCT_TOOLTIP_COPY[construct.id];
                    if (!copy) return;
                    tooltip.innerHTML = `
                        <div class="radar-tooltip-title">${copy.title}</div>
                        <div class="radar-tooltip-body">${copy.body}</div>
                    `;
                    tooltip.style.opacity = '1';
                    positionTooltip(event);
                });

                label.addEventListener('mousemove', positionTooltip);

                label.addEventListener('mouseleave', () => {
                    tooltip.style.opacity = '0';
                });
            });
        }

        // ============================================================
        // CUTLINES VIEW
        // ============================================================

        function renderCutlines() {
            const container = document.getElementById('cutlines-content');

            let html = `
                <div class="cutlines-container">
                    <div class="cutlines-roles">
                        ${ROLES.map(role => {
                            const meetCount = state.candidates.filter(c => meetsCutline(c, role.id)).length;
                            return `
                                <div class="cutlines-role-item ${state.selectedRole === role.id ? 'selected' : ''}" data-role="${role.id}" tabindex="0">
                                    <div class="cutlines-role-name">${role.name}</div>
                                    <div class="cutlines-role-count">${meetCount} of ${state.candidates.length} qualify</div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                    <div class="cutlines-detail">
                        ${renderCutlineDetail()}
                    </div>
                </div>
            `;

            container.innerHTML = html;

            container.querySelectorAll('.cutlines-role-item').forEach(item => {
                item.addEventListener('click', () => {
                    state.selectedRole = item.dataset.role;
                    renderCutlines();
                });
                item.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        state.selectedRole = item.dataset.role;
                        renderCutlines();
                    }
                });
            });

            container.querySelectorAll('.cutline-candidate-row').forEach(row => {
                row.addEventListener('click', () => {
                    setState({ currentView: 'candidate-detail', selectedCandidate: row.dataset.candidate });
                });
            });
        }

        function renderCutlineDetail() {
            const cutline = ROLE_CUTLINES[state.selectedRole];
            const role = ROLES.find(r => r.id === state.selectedRole);

            if (!cutline || !role) return '<p>Select a role to view cutlines.</p>';

            let html = `
                <h3>${role.name}</h3>
                <div class="cutlines-requirements">
                    <div class="evidence-label" style="margin-top: 24px;">Requirements</div>
                    ${cutline.requirements.map(req => {
                        const label = req.construct ?
                            (CONSTRUCTS.cognitive.find(c => c.id === req.construct) ||
                             CONSTRUCTS.technical.find(c => c.id === req.construct) ||
                             CONSTRUCTS.integrity.find(c => c.id === req.construct))?.name || req.construct :
                            (COMPOSITE_LABELS[req.composite] || req.composite.replace(/([A-Z])/g, ' $1').trim());
                        return `
                            <div class="requirement-item">
                                <span class="requirement-construct">${label}</span>
                                <span class="requirement-threshold">≥ ${ordinal(req.threshold)}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div class="cutlines-candidates">
                    <div class="evidence-label">Candidates</div>
                    ${state.candidates.map(c => {
                        const passes = meetsCutline(c, state.selectedRole);
                        return `
                            <div class="cutline-candidate-row" data-candidate="${c.id}">
                                <div class="cutline-candidate-info">
                                    <div class="cutline-status-icon ${passes ? 'pass' : 'fail'}">
                                        ${passes ? '✓' : '—'}
                                    </div>
                                    <div class="cutline-candidate-name">${c.name}</div>
                                </div>
                                <div class="cutline-score">${c.composites.aci}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;

            const firstMatch = state.candidates.find(c => meetsCutline(c, state.selectedRole));
            if (firstMatch) {
                html += renderFitExplanation(firstMatch, state.selectedRole);
            }

            return html;
        }

        function renderFitExplanation(candidate, roleId) {
            const drivers = [];
            const risks = [];
            const allConstructs = [...CONSTRUCTS.cognitive, ...CONSTRUCTS.technical, ...CONSTRUCTS.integrity];

            const constructScores = allConstructs.map(c => ({
                construct: c,
                score: candidate.scores[c.id],
                percentile: scoreToPercentile(candidate.scores[c.id])
            }));

            constructScores.sort((a, b) => b.percentile - a.percentile);

            constructScores.slice(0, 3).forEach(cs => {
                drivers.push(`${cs.construct.name} (${ordinal(cs.percentile)}) — ${cs.construct.predicts.toLowerCase()}`);
            });

            constructScores.slice(-3).forEach(cs => {
                if (cs.percentile < 60) {
                    risks.push(`${cs.construct.name} (${ordinal(cs.percentile)}) may require support`);
                }
            });

            if (risks.length === 0) {
                risks.push('No significant risks identified');
            }

            return `
                <div class="fit-explanation">
                    <div class="fit-title">Fit Analysis: ${candidate.name}</div>
                    <div class="fit-section">
                        <div class="fit-section-label">Strengths</div>
                        ${drivers.map(d => `
                            <div class="fit-item driver">
                                <span class="icon">↑</span>
                                <span>${d}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="fit-section">
                        <div class="fit-section-label">Considerations</div>
                        ${risks.map(r => `
                            <div class="fit-item risk">
                                <span class="icon">→</span>
                                <span>${r}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // ============================================================
        // HEATMAP VIEW
        // ============================================================

        function renderHeatmap() {
            const container = document.getElementById('heatmap-content');
            const candidates = getFilteredCandidates();
            const allConstructs = [...CONSTRUCTS.cognitive, ...CONSTRUCTS.technical, ...CONSTRUCTS.integrity];

            function getHeatColor(percentile) {
                if (percentile >= 85) return 'background: rgba(255,255,255,0.2); color: #fff;';
                if (percentile >= 70) return 'background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.9);';
                if (percentile >= 55) return 'background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.7);';
                if (percentile >= 40) return 'background: rgba(255,255,255,0.02); color: rgba(255,255,255,0.5);';
                return 'background: transparent; color: rgba(255,255,255,0.3);';
            }

            let html = `
                <div class="chart-container" style="margin-bottom: 40px;">
                    <h3 class="chart-title">Construct Scores</h3>
                    <div class="heatmap-container">
                        <table class="heatmap-table">
                            <thead>
                                <tr>
                                    <th style="text-align: left; padding-left: 16px;">Candidate</th>
                                    ${allConstructs.map(c => `<th class="rotate">${c.id}</th>`).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                ${candidates.map(cand => `
                                    <tr>
                                        <td class="candidate-col">${cand.name}</td>
                                        ${allConstructs.map(c => {
                                            const score = cand.scores[c.id];
                                            const percentile = scoreToPercentile(score);
                                            return `<td class="heatmap-cell" style="${getHeatColor(percentile)}">${score}</td>`;
                                        }).join('')}
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="chart-container">
                    <h3 class="chart-title">Role Qualification</h3>
                    <div class="heatmap-container">
                        <table class="heatmap-table">
                            <thead>
                                <tr>
                                    <th style="text-align: left; padding-left: 16px;">Candidate</th>
                                    ${ROLES.map(r => `<th class="rotate">${r.abbr}</th>`).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                ${candidates.map(cand => `
                                    <tr>
                                        <td class="candidate-col">${cand.name}</td>
                                        ${ROLES.map(role => {
                                            const passes = meetsCutline(cand, role.id);
                                            const style = passes ?
                                                'background: rgba(255,255,255,0.1); color: var(--text-primary);' :
                                                'color: rgba(255,255,255,0.2);';
                                            return `<td class="heatmap-cell" style="${style}">${passes ? '✓' : '—'}</td>`;
                                        }).join('')}
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;

            container.innerHTML = html;
        }

        // ============================================================
        // EVENT HANDLERS
        // ============================================================

        function initEventListeners() {
            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    const view = tab.dataset.view;
                    setState({ currentView: view, selectedCandidate: null });
                });
                tab.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        tab.click();
                    }
                });
            });

            document.getElementById('back-to-candidates').addEventListener('click', () => {
                setState({ currentView: 'candidates', selectedCandidate: null });
            });

            document.getElementById('sort-select').addEventListener('change', (e) => {
                setState({ sortBy: e.target.value });
            });

            document.getElementById('role-filter').addEventListener('change', (e) => {
                setState({ roleFilter: e.target.value });
            });

            document.getElementById('cutline-filter').addEventListener('change', (e) => {
                setState({ cutlineFilter: e.target.checked });
            });

            const filterInput = document.getElementById('candidate-filter');
            if (filterInput) {
                let filterTimer = null;
                filterInput.addEventListener('input', () => {
                    const value = filterInput.value;
                    window.clearTimeout(filterTimer);
                    filterTimer = window.setTimeout(() => {
                        setState({ filterText: value });
                    }, 100);
                });
            }

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && state.currentView === 'candidate-detail') {
                    setState({ currentView: 'candidates', selectedCandidate: null });
                }
            });
        }

        // ============================================================
        // INITIALIZATION
        // ============================================================

        function init() {
            initEventListeners();
            render();
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }

    })();
