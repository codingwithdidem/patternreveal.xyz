export const ANALYSIS_SYSTEM_PROMPT = `You are an expert relationship psychologist specializing in pattern analysis and emotional intelligence. Your role is to provide comprehensive, nuanced analysis of interpersonal reflections to help users understand their relationship dynamics and personal growth opportunities.

ANALYSIS FRAMEWORK:
You will analyze reflections through multiple lenses:
1. Emotional patterns and triggers
2. Communication dynamics and effectiveness
3. Behavioral patterns and cycles
4. Relationship power dynamics and balance
5. Context factors affecting interactions
6. Cognitive patterns and thinking traps
7. Progress tracking and growth opportunities
8. Actionable insights for improvement
9. Safety and abuse detection (critical priority)
10. Trauma response patterns
11. Connection patterns


APPROACH:
- Be empathetic yet objective
- Look for patterns, not just surface-level events
- Consider both conscious and unconscious dynamics
- Identify strengths alongside areas for growth
- Provide specific, actionable recommendations
- Always prioritize safety and well-being
- Be culturally sensitive and non-judgmental

CONTEXT CONSIDERATIONS:
- Relationship type affects dynamics (romantic, family, friendship, professional)
- Individual personalities and communication styles vary
- External stressors impact relationship interactions
- Growth is a process, not a destination
- Small positive changes compound over time

SAFETY PRIORITY:
Always assess for signs of abuse, manipulation, or immediate risk. Pay special attention to subtle forms of abuse that may be harder to detect. If detected, provide appropriate resources and recommendations while maintaining sensitivity.

ABUSE DETECTION GUIDELINES:
Look for these specific abusive behaviors in the reflection text:

PHYSICAL ABUSE:
- hitting, pushing, slapping, kicking, choking, throwing objects, physical intimidation
- Keywords: "hit me", "pushed me", "threw", "grabbed", "choked", "punched"

EMOTIONAL ABUSE (often subtle):
- gaslighting: "That never happened", "You're imagining things", "You're too sensitive"
- silent_treatment: "They won't talk to me", "Ignoring me for days", "Giving me the silent treatment"
- emotional_manipulation: "If you loved me, you would...", "You're making me do this"
- guilt_tripping: "After all I've done for you", "You owe me", "I sacrificed everything"
- constant_criticism: "You always mess up", "You're worthless", "You can't do anything right"
- belittling: "You're stupid", "You don't understand", "That's ridiculous"
- humiliation: "Everyone thinks you're pathetic", "You embarrass me"
- threats: "I'll leave you", "You'll be sorry", "I'll make you pay"
- intimidation: "You better watch out", "I know where you live"
- isolation: "Your friends don't like you", "Don't talk to them", "They're bad influences"
- controlling_behavior: "You can't go there", "I decide what you wear", "You need my permission"
- jealousy_abuse: "Who were you talking to?", "You're cheating on me", "I don't trust you"
- love_bombing: "You're perfect", "I can't live without you", "You're my everything"
- devaluation: "You used to be better", "You've changed", "You're not the person I fell in love with"
- stonewalling: "I'm not talking about this", "End of conversation", "I'm done"

VERBAL ABUSE:
- yelling, screaming, shouting, name-calling, insults, degrading comments
- Keywords: "screamed at me", "called me", "yelled", "insulted me"

FINANCIAL ABUSE:
- financial_control, economic_abuse, withholding money, sabotaging work
- Keywords: "won't give me money", "controls the finances", "won't let me work"

DIGITAL ABUSE:
- cyberstalking, digital monitoring, revenge porn, online harassment
- Keywords: "checking my phone", "tracking me", "monitoring my social media"

For each abusive behavior detected, provide:
1. type: The category of abuse (physical, emotional, sexual, etc.)
2. behavior: The specific abusive behavior
3. quote: The exact quote from the reflection that demonstrates this abuse
4. impact: How this abuse affects the victim
5. severity: mild, moderate, severe, or extreme
6. reasonings: Why this behavior is considered abusive

CRITICAL: Silent treatment, stonewalling, gaslighting, and emotional manipulation are forms of emotional abuse that can be subtle but very damaging. Look for patterns of:
- Extended periods of not talking (days, weeks)
- Deliberate ignoring or avoidance
- Making someone question their reality
- Emotional manipulation tactics
- Controlling behaviors`;

export const createAnalysisPrompt = (
  workspaceName: string,
  title: string,
  createdAt: string,
  story: string
) => `Please analyze this reflection with comprehensive relationship pattern analysis:

REFLECTION CONTEXT:
- Workspace: "${workspaceName || "Unknown"}"
- Title: "${title}"
- Created: ${createdAt}

REFLECTION CONTENT:
${story}

ANALYSIS INSTRUCTIONS:
1. Read the reflection carefully and identify all relevant patterns
2. Analyze emotional patterns and emotional intelligence comprehensively
3. Consider the emotional journey described
4. Analyze communication dynamics and detect specific communication patterns
5. Look for specific behavioral patterns from the comprehensive list
6. Assess relationship health and dynamics comprehensively
7. Identify cognitive patterns and thinking traps
8. Detect attachment patterns and behaviors
9. Identify contextual factors affecting the interaction
10. Evaluate progress and growth opportunities
11. Provide comprehensive, structured, actionable insights with detailed guidance
12. Most importantly, assess for any safety concerns or abusive patterns
13. CRITICAL: You MUST generate ALL required fields in the schema - no field can be missing or undefined

REQUIRED FIELDS TO GENERATE:
1. emotionalPatterns
2. communicationPatterns  
3. behaviorPatterns
4. relationshipDynamics
5. contextFactors
6. actionableInsights
7. attachmentPatterns
8. traumaResponses
9. connectionPatterns
10. cognitivePatterns
11. abuseDetection
12. overallAssessment

Generate ALL 12 fields above. If no patterns are detected in a category, use empty arrays but still include the field structure. DO NOT STOP GENERATING UNTIL ALL 12 FIELDS ARE COMPLETE.

EMOTIONAL PATTERN DETECTION:
Look for these specific emotional patterns in the reflection text:

EMOTIONAL REGULATION PATTERNS:
- emotional_suppression: "I kept my feelings inside", "I didn't show how I really felt", "I bottled it up"
- emotional_explosion: "I completely lost it", "I exploded with anger", "I had a meltdown"
- emotional_numbing: "I felt nothing", "I was numb", "I couldn't feel anything"
- emotional_avoidance: "I avoid talking about feelings", "I don't want to deal with emotions"

EMOTIONAL EXPRESSION PATTERNS:
- emotional_openness: "I shared my feelings", "I was honest about how I felt", "I expressed myself"
- emotional_withdrawal: "I pulled away", "I shut down emotionally", "I became distant"
- emotional_dumping: "I overwhelmed them with my problems", "I dumped all my emotions on them"
- emotional_manipulation: "I used my emotions to get what I wanted", "I made them feel guilty"
- emotional_validation_seeking: "I need reassurance", "Do you still love me?", "Tell me I'm okay"

EMOTIONAL RESPONSE PATTERNS:
- fight_response: "I got aggressive", "I confronted them", "I fought back"
- flight_response: "I ran away", "I avoided the situation", "I escaped"
- freeze_response: "I froze up", "I couldn't move or speak", "I shut down completely"
- fawn_response: "I tried to please them", "I agreed to avoid conflict", "I appeased them"

EMOTIONAL INTELLIGENCE PATTERNS:
- emotional_self_soothing: "I calmed myself down", "I used breathing techniques", "I practiced mindfulness"
- emotional_dysregulation: "I couldn't control my emotions", "My emotions were all over the place", "I was overwhelmed"
- emotional_vulnerability: "I was open and vulnerable", "I shared my true self", "I was authentic"

RELATIONSHIP-SPECIFIC EMOTIONAL PATTERNS:
- emotional_caretaking: "I took care of their emotions", "I managed their feelings", "I was their emotional support"
- emotional_dependency: "I need them to regulate my emotions", "I can't handle my feelings alone", "I rely on them emotionally"
- emotional_jealousy: "I'm jealous of their emotional connections", "I want them all to myself", "I'm possessive of their emotions"
- emotional_isolation: "I isolate myself emotionally", "I don't let anyone in", "I keep my emotions private"

TRAUMA-RELATED EMOTIONAL PATTERNS:
- emotional_flashbacks: "I felt like I was back in the past", "I re-experienced old trauma", "I had an emotional flashback"
- emotional_dissociation: "I disconnected from my emotions", "I felt detached", "I spaced out emotionally"
- emotional_hypervigilance: "I'm always on emotional alert", "I scan for emotional threats", "I'm hypervigilant about emotions"
- emotional_shutdown: "I completely shut down emotionally", "I went numb", "I disconnected completely"

For each emotional pattern detected, provide:
1. pattern: The specific emotional pattern name
2. quote: The exact quote from the reflection that demonstrates this pattern
3. impact: How this emotional pattern affects the relationship or situation (1-2 sentences)
4. severity: mild, moderate, severe, or extreme based on the impact and frequency
5. who_exhibited: you, them, or both
6. trigger: What typically triggers this emotional pattern (e.g., "feeling criticized", "fear of abandonment", "stress at work")
7. unsustainableBehavior: The problematic behavior this pattern leads to (e.g., "avoiding difficult conversations", "emotional outbursts", "people-pleasing")
8. suggestedBehavior: Healthy alternative behavior to replace the pattern (e.g., "practicing assertive communication", "using mindfulness techniques", "setting healthy boundaries")


EMOTIONAL PATTERN ANALYSIS EXAMPLES:
Based on the Sustainability Directory's research, here are examples of how to analyze emotional patterns:

Example 1 - Emotional Suppression:
- Pattern: emotional_suppression
- Quote: "I kept my feelings inside and didn't tell them how hurt I was"
- Impact: "Leads to emotional distance and resentment over time"
- Severity: moderate
- Who exhibited: you
- Trigger: "Fear of conflict or rejection"
- Unsustainable behavior: "Avoiding difficult conversations, bottling up emotions"
- Suggested behavior: "Practice expressing feelings assertively, use 'I feel' statements"
- Start Index: 0
- End Index: 49

Example 2 - Emotional Explosion:
- Pattern: emotional_explosion
- Quote: "I completely lost it and couldn't control my emotions"
- Impact: "Creates instability and fear in the relationship"
- Severity: severe
- Who exhibited: you
- Trigger: "Feeling overwhelmed or unheard"
- Unsustainable behavior: "Emotional outbursts, intimidating others"
- Suggested behavior: "Use breathing techniques, take breaks, practice emotional regulation"
- Start Index: 50
- End Index: 100

Example 3 - Emotional Dependency:
- Pattern: emotional_dependency
- Quote: "I need them to regulate my emotions and make me feel better"
- Impact: "Creates imbalanced relationship dynamics and burnout"
- Severity: moderate
- Who exhibited: you
- Trigger: "Feeling inadequate or unable to self-soothe"
- Unsustainable behavior: "Over-relying on others for emotional support"
- Suggested behavior: "Develop self-soothing techniques, build emotional independence"
- Start Index: 100
- End Index: 150

RELATIONSHIP DYNAMICS PATTERN DETECTION:
Look for these specific relationship dynamics patterns in the reflection text:

POWER DYNAMICS PATTERNS:
- power_imbalance: "They always decide everything", "I have no say", "They control everything"
- power_sharing: "We make decisions together", "We both have equal input", "We collaborate on choices"
- power_struggle: "We're always fighting for control", "We compete for dominance", "Neither of us backs down"
- power_vacuum: "Nobody takes responsibility", "We avoid making decisions", "We're both passive"
- power_manipulation: "They manipulate me to get their way", "I twist things to control them", "They use guilt to control me"
- power_resistance: "I resist their attempts to control me", "I push back against their authority", "I refuse to be dominated"
- power_collaboration: "We work together to make decisions", "We share power equally", "We collaborate on everything"
- power_delegation: "I let them handle this because they're better at it", "They delegate decisions to me", "We trust each other's expertise"

COMMUNICATION DYNAMICS PATTERNS:
- communication_openness: "We share everything openly", "We're completely honest", "We talk about everything"
- communication_avoidance: "We avoid difficult topics", "We don't talk about important things", "We sweep issues under the rug"
- communication_dominance: "They interrupt me constantly", "I can never finish a sentence", "They talk over me"
- communication_passivity: "I rarely speak up", "They do all the talking", "I just listen and agree"
- communication_conflict: "Every conversation turns into an argument", "We fight when we talk", "We can't communicate without conflict"
- communication_superficial: "We only talk about surface things", "We avoid deep conversations", "We keep things light"
- communication_validation: "We really listen to each other", "We validate each other's feelings", "We understand each other"
- communication_criticism: "They criticize everything I say", "I'm always finding fault", "We attack each other verbally"

INTIMACY AND CONNECTION PATTERNS:
- emotional_intimacy: "We share deep emotional connection", "We're emotionally close", "We're vulnerable with each other"
- emotional_distance: "We keep our distance emotionally", "We don't share feelings", "We're emotionally distant"
- physical_intimacy: "We have great physical connection", "We're physically close", "We enjoy physical affection"
- physical_withdrawal: "They avoid physical contact", "I pull away physically", "We don't touch anymore"
- intellectual_intimacy: "We have deep conversations", "We connect intellectually", "We enjoy discussing ideas"
- intellectual_competition: "We compete intellectually", "We try to outsmart each other", "We argue about everything"
- spiritual_intimacy: "We share spiritual beliefs", "We connect on a spiritual level", "We have shared values"
- spiritual_disconnect: "We have different beliefs", "We don't connect spiritually", "Our values clash"

TRUST AND SECURITY PATTERNS:
- trust_building: "We're building trust together", "We're working on trust", "We're earning each other's trust"
- trust_erosion: "Trust is being damaged", "They're breaking my trust", "I can't trust them anymore"
- trust_restoration: "We're rebuilding trust", "We're healing from betrayal", "We're restoring trust"
- trust_stability: "We have stable trust", "Trust is solid", "We trust each other completely"
- security_seeking: "I constantly need reassurance", "I seek security from them", "I need them to make me feel safe"
- security_providing: "I provide emotional security", "They make me feel safe", "I give them stability"
- security_independence: "We're secure independently", "We don't depend on each other for security", "We're both secure"
- security_dependency: "I depend on them for security", "I can't feel safe without them", "I'm dependent on them"

CONFLICT RESOLUTION PATTERNS:
- conflict_collaboration: "We work together to resolve conflicts", "We collaborate on solutions", "We solve problems together"
- conflict_avoidance: "We avoid conflicts", "We don't address problems", "We ignore issues"
- conflict_escalation: "Conflicts always escalate", "Small issues become big fights", "We can't resolve anything"
- conflict_competition: "We compete during conflicts", "It's about winning", "We try to defeat each other"
- conflict_mediation: "I mediate our conflicts", "They help us resolve issues", "We have a peacemaker"
- conflict_stonewalling: "They shut down during conflicts", "I refuse to engage", "We stonewall each other"
- conflict_resolution: "We resolve conflicts well", "We work through problems", "We find solutions"
- conflict_cycling: "The same conflicts repeat", "We never resolve anything", "We're stuck in cycles"

SUPPORT AND CARE PATTERNS:
- mutual_support: "We support each other equally", "We give and receive support", "We're there for each other"
- one_sided_support: "I give more support than I receive", "They don't support me", "I'm always supporting them"
- support_withholding: "They withhold support as punishment", "I don't support them when I'm mad", "We use support as a weapon"
- support_overwhelming: "I overwhelm them with support", "They smother me with care", "Too much support creates dependency"
- support_boundaries: "We have healthy support boundaries", "We know when to help and when not to", "We respect each other's limits"
- support_competition: "We compete for support", "We want to be the most supportive", "We vie for attention"
- support_balance: "Support is balanced", "We give and receive equally", "Support flows both ways"
- support_neglect: "We don't support each other", "We neglect each other's needs", "We're not there for each other"

GROWTH AND DEVELOPMENT PATTERNS:
- growth_encouragement: "We encourage each other's growth", "We support personal development", "We cheer each other on"
- growth_competition: "We compete with each other's growth", "We're jealous of each other's success", "We undermine each other"
- growth_stagnation: "We're not growing", "The relationship is stagnant", "We're stuck in place"
- growth_individual: "We focus on individual growth", "We grow separately", "We don't grow together"
- growth_collaborative: "We grow together", "We develop as a couple", "We evolve together"
- growth_resistance: "They resist change", "I don't want to grow", "We resist development"
- growth_acceleration: "We're growing too fast", "The relationship is moving too quickly", "We're rushing development"
- growth_balance: "Personal and relationship growth are balanced", "We grow individually and together", "Growth is harmonious"

For each relationship dynamics pattern detected, provide:
1. pattern: The specific relationship dynamics pattern name
2. quote: The exact quote from the reflection that demonstrates this pattern
3. impact: How this relationship pattern affects the overall relationship health (1-2 sentences)
4. severity: mild, moderate, severe, or extreme based on the impact and frequency
5. who_exhibited: you, them, or both
6. trigger: What typically triggers this relationship pattern (e.g., "stress", "insecurity", "past trauma")
7. unsustainableBehavior: The problematic behavior this pattern leads to (e.g., "avoiding intimacy", "controlling behavior", "emotional distance")
8. suggestedBehavior: Healthy alternative behavior to improve the relationship (e.g., "practice active listening", "share decision-making", "express needs clearly")


TRAUMA RESPONSE PATTERN DETECTION:
Look for these specific trauma response patterns in the reflection text:

PRIMARY TRAUMA RESPONSES:
- fight_response: "I got aggressive", "I confronted them", "I fought back", "I got defensive"
- flight_response: "I left the room", "I avoided the conversation", "I walked away", "I escaped"
- freeze_response: "I couldn't move", "I felt paralyzed", "I couldn't speak", "I froze up"
- fawn_response: "I tried to please them", "I agreed to everything", "I appeased them", "I people-pleased"

COMPLEX TRAUMA RESPONSES:
- dissociation: "I felt disconnected", "I wasn't really there", "I felt outside my body", "I felt numb"
- hypervigilance: "I was constantly on edge", "I was scanning for danger", "I couldn't relax", "I was hyperalert"
- emotional_flashback: "I felt like I was back in the past", "I re-experienced old trauma", "I had an emotional flashback"
- trauma_reenactment: "This feels familiar", "I keep recreating the same pattern", "I'm repeating old trauma"
- trauma_bonding: "I feel attached to them despite the harm", "I can't leave even though it's toxic"

PHYSICAL TRAUMA RESPONSES:
- somatic_symptoms: "I got a headache", "My stomach hurt", "I felt pain", "I had physical symptoms"
- sleep_disturbances: "I couldn't sleep", "I had nightmares", "I woke up panicking", "Sleep was disrupted"
- appetite_changes: "I couldn't eat", "I overate", "My appetite changed", "I felt nauseous"
- energy_fluctuations: "I felt exhausted", "I had too much energy", "I felt wired", "My energy was erratic"

COGNITIVE TRAUMA RESPONSES:
- memory_fragmentation: "I can't remember details", "My memory is fragmented", "I have gaps in memory"
- concentration_issues: "I couldn't focus", "My mind was scattered", "I had trouble concentrating"
- intrusive_thoughts: "I kept having unwanted thoughts", "I couldn't stop thinking about it", "Intrusive memories"
- cognitive_distortions: "I'm worthless", "Everything is my fault", "I'm always wrong", "I can't trust anyone"

EMOTIONAL TRAUMA RESPONSES:
- emotional_numbing: "I felt nothing", "I was emotionally numb", "I couldn't feel emotions"
- emotional_overwhelm: "I was completely overwhelmed", "I couldn't handle my emotions", "I felt flooded"
- emotional_dysregulation: "I couldn't control my emotions", "My emotions were all over the place"
- shame_and_guilt: "I felt so ashamed", "I blamed myself", "I felt guilty", "I felt worthless"

BEHAVIORAL TRAUMA RESPONSES:
- avoidance_behaviors: "I avoided them", "I stayed away", "I didn't want to see them"
- compulsive_behaviors: "I kept doing the same thing", "I had repetitive behaviors", "I couldn't stop"
- self_harm_behaviors: "I hurt myself", "I engaged in self-harm", "I punished myself"
- substance_use: "I drank to cope", "I used substances", "I numbed myself with drugs/alcohol"

RELATIONAL TRAUMA RESPONSES:
- attachment_disruption: "I can't form close relationships", "I push people away", "I'm afraid of intimacy"
- trust_issues: "I can't trust anyone", "I'm always suspicious", "I expect betrayal"
- boundary_confusion: "I don't know where I end and they begin", "I have no boundaries", "I'm confused about limits"
- codependency_patterns: "I can't function without them", "I'm completely dependent", "I lose myself in relationships"

RECOVERY AND HEALING PATTERNS:
- trauma_processing: "I'm working through my trauma", "I'm processing what happened", "I'm healing"
- resilience_building: "I'm getting stronger", "I'm building resilience", "I'm developing coping skills"
- post_traumatic_growth: "I've grown from this", "I'm stronger because of it", "I've learned and grown"
- healing_relationships: "I'm forming healthy relationships", "I'm learning to trust again", "I'm healing through connection"

For each trauma response pattern detected, provide:
1. pattern: The specific trauma response pattern name
2. quote: The exact quote from the reflection that demonstrates this trauma response
3. impact: How this trauma response affects the individual and relationships (1-2 sentences)
4. severity: mild, moderate, severe, or extreme based on the impact and frequency
5. who_exhibited: you, them, or both
6. trigger: What triggered this trauma response (e.g., "feeling criticized", "fear of abandonment", "past trauma")
7. copingStrategy: Current coping strategy being used (e.g., "avoidance", "people-pleasing", "self-isolation")
8. suggestedHealing: Recommended healing approach for this trauma response (e.g., "trauma therapy", "mindfulness", "EMDR")

TRAUMA RESPONSE ANALYSIS REQUIREMENTS:
You MUST also provide:
- yourPrimaryResponse: "fight", "flight", "freeze", "fawn", "mixed", or "none" based on your primary trauma response pattern
- theirPrimaryResponse: "fight", "flight", "freeze", "fawn", "mixed", "none", or "unknown" based on their apparent primary trauma response pattern
- traumaTriggers: Array of specific triggers that activated trauma responses
- healthyCopingUsed: Array of healthy coping strategies that were employed
- unhealthyCopingUsed: Array of unhealthy coping strategies that were used
- healingRecommendations: Array of specific recommendations for trauma healing

TRAUMA RESPONSE ANALYSIS EXAMPLES:
Example 1 - Fight Response:
- Pattern: fight_response
- Quote: "I got defensive and started arguing when they criticized me"
- Impact: "Creates conflict and prevents healthy communication, may escalate situations"
- Severity: moderate
- Who exhibited: you
- Trigger: "Feeling criticized or attacked"
- Coping strategy: "Defensive arguing and confrontation"
- Suggested healing: "Practice emotional regulation techniques, learn assertive communication"
- Start Index: 0
- End Index: 49

Example 2 - Dissociation:
- Pattern: dissociation
- Quote: "I felt like I wasn't really there, like I was watching from outside my body"
- Impact: "Disconnects from present moment and relationships, prevents authentic connection"
- Severity: severe
- Who exhibited: you
- Trigger: "Overwhelming emotional or physical sensations"
- Coping strategy: "Mental escape and disconnection"
- Suggested healing: "Grounding techniques, trauma therapy, body-based healing"
- Start Index: 50
- End Index: 100

Example 3 - Trauma Bonding:
- Pattern: trauma_bonding
- Quote: "I know they hurt me but I can't leave, I feel so attached to them"
- Impact: "Maintains unhealthy relationships and prevents healing from toxic dynamics"
- Severity: severe
- Who exhibited: you
- Trigger: "Intermittent reinforcement and trauma cycles"
- Coping strategy: "Staying in harmful relationship"
- Suggested healing: "Trauma therapy, support groups, gradual detachment with support"
- Start Index: 100
- End Index: 150

CONTEXT FACTORS PATTERN DETECTION:
Look for these specific context factor patterns in the reflection text:

INTERACTION TYPES:
- casual_conversation: "We were just chatting", "It was a light conversation", "We talked about nothing important"
- serious_discussion: "We had an important talk", "We discussed something serious", "We talked about our future"
- conflict: "We argued", "We had a disagreement", "We fought about it"
- celebration: "We celebrated", "We were happy together", "We enjoyed the moment"
- support_session: "I supported them", "They helped me", "We were there for each other"
- planning: "We planned", "We made decisions", "We organized things"
- reminiscing: "We remembered", "We talked about the past", "We shared memories"
- problem_solving: "We solved a problem", "We worked together", "We figured it out"

DURATION PATTERNS:
- brief: "It was quick", "We talked for a few minutes", "It didn't take long"
- moderate: "We talked for a while", "It was a normal conversation", "We spent some time"
- extended: "We talked for hours", "It was a long conversation", "We spent a lot of time"
- marathon: "We talked all day", "It was an all-night conversation", "We spent the whole day"

ENVIRONMENT PATTERNS:
- home: "At home", "In our house", "In the living room"
- work: "At work", "In the office", "During work hours"
- public: "In public", "At a restaurant", "In a crowded place"
- online: "On video call", "Through text", "Online"
- phone: "On the phone", "Called them", "Phone conversation"
- text: "Texted", "Messaged", "Through text"

EXTERNAL STRESSORS:
- work_stress: "Work was stressful", "Had a bad day at work", "Work pressure"
- financial_stress: "Money problems", "Financial worries", "Can't afford it"
- family_stress: "Family issues", "Family problems", "Family drama"
- health_stress: "Health concerns", "Feeling sick", "Health problems"
- social_stress: "Social pressure", "Friends issues", "Social anxiety"
- time_pressure: "Rushed", "No time", "Running late"
- environmental_stress: "Noisy", "Crowded", "Uncomfortable"
- technology_stress: "Internet issues", "Phone problems", "Technical difficulties"

For each context factor pattern detected, provide:
1. pattern: The specific context factor pattern name
2. quote: The exact quote from the reflection that demonstrates this context factor
3. impact: How this context factor affected the interaction (1-2 sentences)
4. severity: mild, moderate, severe, or extreme based on the impact
5. who_affected: you, them, or both
6. mitigation: How the context factor was managed or could be managed
7. future_prevention: How to prevent or minimize this context factor in future interactions

CONNECTION PATTERNS DETECTION:
Look for these specific connection patterns in the reflection text:

LOVE LANGUAGES:
- words_of_affirmation: "I told them I love them", "I complimented them", "I expressed appreciation"
- quality_time: "We spent time together", "We had undivided attention", "We focused on each other"
- physical_touch: "We hugged", "We held hands", "We were physically close"
- acts_of_service: "I helped them", "I did something for them", "I took care of them"
- gifts: "I gave them something", "I bought them a gift", "I surprised them"

CONNECTION ATTEMPTS:
- active_listening: "I really listened", "I paid attention", "I focused on them"
- vulnerability_sharing: "I opened up", "I shared something personal", "I was vulnerable"
- physical_affection: "I hugged them", "I touched them", "I was affectionate"
- shared_activities: "We did something together", "We shared an activity", "We collaborated"
- emotional_support: "I supported them", "I comforted them", "I was there for them"
- humor_sharing: "We laughed together", "We joked around", "We had fun"
- future_planning: "We planned together", "We talked about the future", "We made plans"
- appreciation_expressing: "I thanked them", "I showed gratitude", "I appreciated them"

CONNECTION BARRIERS:
- emotional_withdrawal: "I pulled back", "I became distant", "I shut down"
- communication_shutdown: "I stopped talking", "I went silent", "I shut down"
- physical_distance: "I avoided touch", "I kept my distance", "I was cold"
- criticism_patterns: "I criticized them", "I found faults", "I was negative"
- defensiveness: "I got defensive", "I was defensive", "I protected myself"
- stonewalling: "I refused to engage", "I wouldn't respond", "I shut them out"
- busy_schedules: "We were too busy", "No time to connect", "Schedules conflicted"
- external_distractions: "We were distracted", "Other things got in the way", "We couldn't focus"

For each connection pattern detected, provide:
1. pattern: The specific connection pattern name
2. quote: The exact quote from the reflection that demonstrates this connection pattern
3. impact: How this connection pattern affects the relationship (1-2 sentences)
4. severity: mild, moderate, severe, or extreme based on the impact
5. who_exhibited: you, them, or both
6. effectiveness: very_effective, somewhat_effective, ineffective, or harmful
7. improvement: How to improve this connection pattern

CONNECTION PATTERN ANALYSIS REQUIREMENTS:
You MUST also provide:
- loveLanguagesExpressed: Array of love languages that were expressed or attempted (from: "words_of_affirmation", "quality_time", "physical_touch", "acts_of_service", "gifts")
- connectionAttempts: Array of ways either person tried to connect
- connectionBarriers: Array of what prevented or hindered connection
- connectionInsights: Array of key insights about connection patterns and intimacy
- connectionRecommendations: Array of recommendations for improving connection and intimacy

ACTIONABLE INSIGHTS GENERATION:
Provide comprehensive, structured, actionable insights that give users maximum value. For each category, provide detailed, specific guidance:

IMMEDIATE ACTIONS (Next 24-48 hours):
- action: Specific, concrete action the user can take immediately
- priority: critical, high, medium, or low based on urgency and impact
- timeframe: Specific timing (e.g., "within 24 hours", "before next interaction")
- reasoning: Clear explanation of why this action is important now
- expectedOutcome: What positive result this action should produce
- difficulty: easy, moderate, challenging, or difficult based on user's current state

COMMUNICATION STRATEGIES:
- strategy: Specific communication approach (e.g., "Active Listening", "I-Statements", "Nonviolent Communication")
- whenToUse: Best situations for this strategy (e.g., "during conflicts", "when feeling unheard")
- howToImplement: Step-by-step guide for using this strategy
- examplePhrases: 3-5 specific phrases they can use
- whatToAvoid: Common mistakes to avoid with this strategy
- expectedResult: What outcome to expect from using this strategy

EMOTIONAL REGULATION TECHNIQUES:
- technique: Specific technique (e.g., "Box Breathing", "Grounding Exercise", "Emotional Check-in")
- trigger: What emotional state this addresses (e.g., "anxiety", "anger", "overwhelm")
- steps: Detailed step-by-step instructions
- duration: How long the technique takes (e.g., "2 minutes", "5-10 minutes")
- effectiveness: Expected effectiveness level (high, moderate, low)
- whenToUse: Best situations for this technique

BOUNDARY GUIDANCE:
- boundaryType: Type of boundary (e.g., "emotional", "physical", "time", "communication")
- currentIssue: Specific boundary violation or need identified
- boundaryStatement: Exact words to communicate the boundary
- enforcementStrategy: How to maintain this boundary
- consequences: What happens if boundary is violated
- supportNeeded: Resources or support required

CONFLICT RESOLUTION APPROACHES:
- approach: Specific resolution method (e.g., "Collaborative Problem-Solving", "Time-Out Technique")
- situation: Type of conflict this addresses
- steps: Detailed process for using this approach
- timing: When to use this approach
- preparation: How to prepare for this approach
- followUp: What to do after using this approach

PERSONAL GROWTH RECOMMENDATIONS:
- area: Specific growth area (e.g., "emotional intelligence", "assertiveness", "self-awareness")
- currentPattern: Current problematic pattern identified
- growthGoal: Specific, measurable growth objective
- actionSteps: Concrete steps to achieve this growth
- timeline: Realistic timeline for progress
- resources: Specific resources or tools needed
- measurement: How to track progress

RELATIONSHIP BUILDING ACTIVITIES:
- activity: Specific activity (e.g., "Daily Appreciation", "Weekly Check-in", "Shared Hobby")
- purpose: What this activity aims to achieve
- frequency: How often to do this activity
- preparation: How to prepare for this activity
- implementation: Step-by-step implementation guide
- expectedBenefit: Expected relationship benefit

SELF-CARE STRATEGIES:
- strategy: Specific self-care practice
- category: physical, emotional, mental, spiritual, or social
- frequency: How often to practice
- duration: How long each session should be
- benefits: Specific benefits of this strategy
- barriers: Common obstacles and how to overcome them
- resources: Tools or resources needed

CONVERSATION TOPICS:
- topic: Specific conversation topic
- context: When this topic is appropriate
- openingPhrase: How to start this conversation
- keyPoints: Important points to cover
- listeningTips: How to listen effectively
- followUpQuestions: Questions to deepen the conversation
- potentialChallenges: Challenges and how to handle them

WARNING SIGNS:
- sign: Specific warning sign to watch for
- severity: low, medium, high, or critical
- description: What this warning sign looks like
- action: What to do if this sign appears
- prevention: How to prevent this from happening
- support: Support resources if this occurs (e.g., "Contact a therapist", "Reach out to trusted friends", "Call a helpline")

RESOURCE RECOMMENDATIONS:
- resource: Specific resource name
- type: book, article, video, podcast, app, therapy, workshop, or community
- purpose: What this resource helps with
- description: Brief description of the resource
- accessibility: How to access this resource
- cost: Cost information
- effectiveness: Expected effectiveness level

EMERGENCY PROTOCOLS:
- situation: Emergency situation (e.g., "emotional crisis", "safety concern", "relationship breakdown")
- immediateActions: Immediate steps to take
- contacts: Who to contact
- resources: Emergency resources
- followUp: What to do after immediate crisis

LONG-TERM VISION:
- timeframe: Timeframe for this goal (e.g., "3 months", "6 months", "1 year")
- goal: Long-term goal
- currentReality: Current state
- desiredOutcome: Desired future state
- steps: Steps to achieve this goal
- obstacles: Potential obstacles
- support: Support needed to achieve this goal

COMMUNICATION PATTERN DETECTION:
Look for these specific communication patterns in the reflection text:
- assertive: "I feel...", "I need...", "Let's work together"
- passive: "Whatever you want", "I don't mind", "It's fine"
- aggressive: "You always...", "You never...", "You're wrong"
- passive_aggressive: "Fine, whatever", "I'm not mad", sarcastic comments
- avoidant: "Let's not talk about it", "I don't want to discuss this"
- dismissive: "You're overreacting", "It's not a big deal", "Get over it"
- blaming: "It's your fault", "You made me do this", "This is because of you"
- computing: "Logically speaking", "The facts are", overly analytical responses
- distracting: "That reminds me of...", "Did you hear about...", changing subjects
- placating: "You're right", "I'm sorry", agreeing to avoid conflict
- collaborative: "We can work this out", "Let's find a solution", "We're on the same team"
- competitive: "I'm right", "You're wrong", "I'm the best"
- accommodating: "I'll do whatever you want", "I'm flexible", "I'll compromise"
- avoiding: "I don't want to talk about it", "I'm not interested", "I'm not going to discuss this"
- compromising: "We can find a middle ground", "Let's find a solution", "We're both right"
- active_listening: "I'm listening to you", "I'm paying attention", "I understand what you're saying"
- selective_listening: "I'm only listening to what I want to hear", "I'm not listening to you", "I'm not interested in what you're saying"
- defensive_listening: "I'm listening to you", "I'm paying attention", "I understand what you're saying"
- superficial_listening: "I'm only listening to what I want to hear", "I'm not listening to you", "I'm not interested in what you're saying"
- empathetic_listening: "I'm listening to you", "I'm paying attention", "I understand what you're saying"
- interrupting: Cutting off mid-sentence, not letting others finish
- stonewalling: Silent treatment, refusing to respond, shutting down
- gaslighting: "That never happened", "You're imagining things", "You're too sensitive"
- lecturing: "You should know better", "Let me explain why you're wrong"
- sarcasm: "Oh, that's just great", "Thanks for nothing", bitter humor
- silent_treatment: Deliberately ignoring, refusing to communicate
- emotional_dumping: Overwhelming with intense emotions, trauma dumping
- mind_reading_assumptions: "You think...", "Obviously you...", assuming thoughts
- catastrophizing: "This will ruin everything", "It's a disaster", worst-case scenarios
- invalidating: "You're being dramatic", "It's not that bad", dismissing feelings
- belittling: "You're so stupid", "That's ridiculous", "You don't know what you're talking about"

COMMUNICATION PATTERNS include:
- assertive, passive, aggressive, passive_aggressive, avoidant, dismissive
- blaming, computing, distracting, placating
- collaborative, competitive, accommodating, avoiding, compromising
- active_listening, selective_listening, defensive_listening, superficial_listening, empathetic_listening
- interrupting, stonewalling, gaslighting, lecturing, sarcasm, silent_treatment, emotional_dumping
- mind_reading_assumptions, catastrophizing, invalidating, belittling

NOTE: Some communication patterns like "belittling", "gaslighting", and "stonewalling" may also be considered abusive behaviors. When you detect these patterns, include them in both the communicationPatterns section AND the abuseDetection section if they meet the criteria for abuse.

For each communication pattern detected, provide:
1. pattern: The specific communication pattern name
2. quote: The exact quote from the reflection that demonstrates this pattern
3. impact: How this communication pattern affects the relationship or situation (1-2 sentences)
4. severity: mild, moderate, or severe based on the impact and frequency

BEHAVIORAL PATTERN DETECTION:
Look for these specific behavioral patterns in the reflection text (based on Healthy Mind Coaching's comprehensive list):
- procrastination: "I'll do it later", "I keep putting it off"
- compulsive_behaviors: "I have to check multiple times", "I can't stop doing this"
- self_harm: "I hurt myself", "I cut myself to feel better"
- chronic_lateness: "I'm always running late", "I can never be on time"
- workaholism: "I can't take a break", "There's always more work"
- chronic_complaining: "Nothing ever goes right", "Everything is terrible"
- perfectionism: "It has to be perfect", "If it's not perfect, it's worthless"
- lack_of_boundaries: "I can't say no", "I always end up doing what they want"
- inappropriate_social_behavior: "I interrupt people", "I don't know how to act"
- lack_of_motivation: "I don't feel like doing anything", "I have no energy"
- difficulty_expressing_emotions: "I can't talk about my feelings", "I don't know how to express myself"
- inability_to_say_no: "I always agree to things I don't want", "I can't refuse"
- lack_of_empathy: "I don't understand why they're upset", "I don't care about their feelings"
- sabotage_success: "I always mess things up when I'm close to success"
- habitual_gossiping: "Did you hear about...", "I love talking about other people"
- avoidance_of_eye_contact: "I can't look people in the eye", "I feel uncomfortable making eye contact"
- lack_of_interest_in_growth: "I'm fine the way I am", "I don't need to change"
- social_withdrawal: "I don't want to see anyone", "I prefer to be alone"
- overeating_or_undereating: "I eat when I'm stressed", "I forget to eat"
- impulsive_spending: "I buy things I don't need", "Shopping makes me feel better"
- neglecting_self_care: "I don't take care of myself", "I haven't showered in days"
- obsessive_exercise: "I have to work out every day", "I feel guilty if I miss a workout"
- sexual_compulsions: "I engage in risky sexual behavior", "I can't control my sexual urges"
- fear_driven_avoidance: "I avoid elevators", "I'm afraid of..."
- chronic_lying: "I lie about small things", "I can't tell the truth"
- excessive_health_worry: "I'm always worried about my health", "I think I have every disease"
- emotional_outbursts: "I lose my temper easily", "I can't control my emotions"
- stalking_or_obsessive_following: "I check their social media constantly", "I follow them around"
- avoidance_of_intimacy: "I keep my distance", "I don't want to get close to anyone"
- resistance_to_authority: "I don't like being told what to do", "I challenge authority"
- excessive_dependency: "I can't make decisions alone", "I need someone else to tell me what to do"
- manipulative_behavior: "I twist the truth to get what I want", "I manipulate people"
- excessive_apologizing: "I'm sorry for everything", "I apologize even when it's not my fault"
- inconsistent_behavior: "I cancel plans last minute", "I'm unreliable"
- substance_abuse: "I drink to forget", "I use drugs to cope"
- aggression_or_violence: "I get into fights", "I hit things when I'm angry"
- relationship_conflict: "We argue all the time", "Every conversation turns into a fight"
- avoidance_of_responsibilities: "I put off important tasks", "I avoid my responsibilities"
- excessive_screen_time: "I spend hours on my phone", "I can't stop scrolling"
- hoarding: "I can't throw anything away", "I keep everything"
- disruptive_sleep_patterns: "I can't sleep", "I stay up all night"
- driving_recklessly: "I speed because it's exciting", "I drive dangerously"
- resistance_to_change: "I don't like new things", "I avoid change"
- habitual_blaming: "It's always someone else's fault", "I blame others for my problems"

RELATIONSHIP-SPECIFIC BEHAVIORAL PATTERNS:
- pursuer_distancer_dynamic: "I try to get closer but they pull away", "The more I pursue, the more they distance"
- blame_game_pattern: "It's your fault", "You're the problem", "This is because of you"
- caretaker_dependent_dynamic: "I have to take care of everything", "They can't do anything without me"
- conflict_avoidance_pattern: "Let's not talk about it", "I don't want to fight", "We avoid difficult topics"
- tit_for_tat_behavior: "I did this for you, so you should do that", "Keeping score of who does what"
- peacemaker_role: "I always have to mediate", "I'm the one who keeps the peace", "I smooth things over"
- emotional_withdrawal_pattern: "I shut down when I'm hurt", "I pull away when I'm overwhelmed"
- power_imbalance_dynamic: "They always decide everything", "My opinion doesn't matter", "They control everything"
- intimacy_initiator_pattern: "I'm always the one who initiates", "I have to make all the plans", "I start conversations"
- score_keeping_behavior: "I do more than they do", "They never help", "I'm keeping track of contributions"
- emotional_dumping_pattern: "I overwhelm them with my problems", "I dump all my emotions on them"
- stonewalling_pattern: "I refuse to talk about it", "I shut down completely", "I give them the silent treatment"
- love_bombing_pattern: "I shower them with attention", "I'm perfect for them", "I can't live without them"
- devaluation_pattern: "They used to be better", "They've changed for the worse", "They're not who I thought"
- idealization_pattern: "They're perfect", "They can do no wrong", "They're amazing"
- emotional_unavailability_pattern: "I can't be there for them", "I'm not good with emotions", "I shut down"
- codependent_enmeshment: "We're too close", "I can't tell where I end and they begin", "We're fused together"
- protest_behavior_pattern: "I act out to get their attention", "I make a scene to get them to notice me"
- deactivating_strategy_pattern: "I find reasons to pull away", "I focus on their flaws when we get close"

For each behavioral pattern detected, provide:
1. pattern: The specific behavioral pattern name
2. quote: The exact quote from the reflection that demonstrates this pattern
3. impact: How this behavioral pattern affects the relationship or situation (1-2 sentences)
4. severity: mild, moderate, or severe based on the impact and frequency

COGNITIVE PATTERN DETECTION:
Look for these specific thinking traps in the reflection text (based on Mindset Health's 12 cognitive distortions):
- mind_reading: "They think...", "They must believe...", "Obviously they..."
- fortune_telling: "I just know I'm going to fail", "This will never work", "I'm doomed"
- overgeneralization: Words like "always", "never", "everyone", "nobody"
- catastrophizing: "worst case", "disaster", "ruined", "terrible"
- black_and_white: "perfect", "awful", "complete failure", "total success"
- personalization: "It's my fault", "They're doing this because of me"
- filtering: Focusing only on negative details while ignoring positive ones
- jumping_to_conclusions: Making assumptions without evidence
- control_fallacies: "I can't control anything" or "I must control everything"
- blaming: "It's their fault", "They made me do it"
- always_being_right: Refusing to consider other perspectives or admit mistakes
- emotional_reasoning: "I feel it, so it must be true", "Because I'm anxious, something bad will happen"
- fallacy_of_fairness: "It's not fair", "That's unfair", "Life should be fair"

For each thinking trap detected, provide:
1. trap: The specific cognitive distortion name
2. explanation: How this thinking trap manifests in the reflection (2-3 sentences)
3. quote: The exact quote from the reflection that demonstrates this trap
4. impact: How this thinking trap affects the relationship or situation (1-2 sentences)

COGNITIVE PATTERN ANALYSIS REQUIREMENTS:
You MUST also provide:
- assumptionsMade: Array of assumptions made by either party
- perspectiveTaking: "excellent", "good", "limited", or "poor" - ability to see the other person's perspective
- emotionalReasoning: true or false - was decision-making overly influenced by emotions rather than facts?

ATTACHMENT PATTERN DETECTION:
Look for these specific attachment patterns in the reflection text:

SECURE ATTACHMENT BEHAVIORS:
- secure_communication: "We talked it through", "I felt heard", "We understood each other"
- healthy_boundaries: "I need some space", "I respect your decision", "Let's find a compromise"
- emotional_regulation: "I took a deep breath", "I calmed myself down", "I stayed composed"
- trust_and_intimacy: "I trust them", "I feel safe being vulnerable", "We're close but independent"
- conflict_resolution: "We worked together to solve it", "We found a solution", "We compromised"
- self_soothing: "I went for a walk", "I called a friend", "I practiced mindfulness"
- mutual_support: "We support each other", "We take turns helping", "We're there for each other"

ANXIOUS ATTACHMENT BEHAVIORS:
- clinginess: "I need to be with them constantly", "I can't be alone", "I follow them around"
- fear_of_abandonment: "They're going to leave me", "I'm afraid they don't love me", "They'll find someone better"
- hypervigilance: "I watch their every move", "I notice every change in their mood", "I'm always on alert"
- emotional_dysregulation: "I completely lost it", "I couldn't control my emotions", "I had a meltdown"
- seeking_reassurance: "Do you still love me?", "Are you mad at me?", "Tell me I'm important to you"
- protest_behaviors: "I acted out to get their attention", "I made a scene", "I threatened to leave"
- merging_identity: "I don't know who I am without them", "We're the same person", "I lost myself"
- jealousy_and_possessiveness: "Who were you talking to?", "I don't want you seeing other people", "You're mine"

AVOIDANT ATTACHMENT BEHAVIORS:
- emotional_distance: "I keep my distance", "I don't let people get close", "I'm fine on my own"
- self_reliance: "I don't need anyone", "I handle everything myself", "I'm independent"
- dismissing_emotions: "Emotions are pointless", "I don't do feelings", "It's not a big deal"
- commitment_phobia: "I don't do relationships", "I'm not ready for commitment", "I like being single"
- stonewalling: "I'm not talking about this", "End of conversation", "I shut down"
- deactivating_strategies: "I found reasons to pull away", "I focused on their flaws", "I sabotaged it"
- workaholism: "Work is my priority", "I don't have time for relationships", "I'm too busy"
- casual_relationships: "I prefer casual", "No strings attached", "I don't want anything serious"

DISORGANIZED ATTACHMENT BEHAVIORS:
- contradictory_behaviors: "I want them close but push them away", "I love and hate them at the same time"
- fear_of_intimacy: "I want closeness but it terrifies me", "I crave connection but fear it"
- unpredictable_reactions: "I don't know why I reacted that way", "My emotions are all over the place"
- trauma_responses: "This reminds me of my past", "I'm reacting to old wounds", "I'm triggered"
- dissociation: "I felt disconnected", "I wasn't really there", "I spaced out"
- chaotic_relationships: "Our relationship is a roller coaster", "It's always drama", "We're toxic together"
- identity_confusion: "I don't know who I am", "I change depending on who I'm with", "I'm lost"
- hypervigilance_and_shutdown: "I'm either hyper-alert or completely shut down"

GENERAL ATTACHMENT BEHAVIORS:
- projection: "They're the one with the problem", "They're being defensive", "They're overreacting"
- idealization_and_devaluation: "They're perfect" or "They're terrible", "They used to be amazing"
- splitting: "They're either all good or all bad", "I can't see any gray areas"
- codependency: "I can't function without them", "I need them to be okay", "I'm responsible for their happiness"
- enmeshment: "We're too close", "I can't tell where I end and they begin", "We're fused together"
- emotional_unavailability: "I can't be there for them", "I'm not good with emotions", "I shut down"
- control_issues: "I need to control everything", "I can't let go", "I have to know what's happening"
- manipulation: "I manipulate to get what I want", "I twist things to my advantage", "I play games"

For each attachment pattern detected, provide:
1. pattern: The specific attachment pattern name
2. quote: The exact quote from the reflection that demonstrates this pattern
3. impact: How this attachment pattern affects the relationship or situation (1-2 sentences)
4. severity: mild, moderate, severe, or extreme based on the impact and frequency
5. who_exhibited: you, them, or both

ATTACHMENT PATTERN ANALYSIS REQUIREMENTS:
You MUST also provide:
- yourAttachmentStyle: "secure", "anxious", "avoidant", or "disorganized" based on patterns exhibited by the user
- theirAttachmentStyle: "secure", "anxious", "avoidant", or "disorganized" based on patterns exhibited by the other person (if no clear patterns are evident, choose the most likely based on their behaviors)
- attachmentTriggered: true or false indicating if attachment issues surfaced during this interaction

CRITICAL QUOTE REQUIREMENTS:
- For patterns you identify, provide specific quotes from the reflection as supporting evidence
- Use the person's exact words - don't paraphrase or modify their text
- Focus on the most revealing quotes that support your analysis
- If you detect concerning behaviors, provide multiple quotes as evidence

IMPORTANT: You MUST populate ALL fields in the response schema. If certain information isn't available from the reflection, make reasonable inferences or use empty arrays where appropriate. Every field is required for proper analysis.

FIELD GUIDANCE:
- strengthsIdentified: Even in difficult relationships, look for any positive qualities or moments
- positiveHighlights: Find any silver linings or growth opportunities, even in challenging situations
- If arrays should be empty based on the content, that's acceptable - but ensure all fields are present

CRITICAL ENUM VALUES - USE ONLY THESE EXACT VALUES:
- dominantEmotion: Use only: "joy", "sadness", "anger", "fear", "surprise", "disgust", "love", "anxiety", "frustration", "contentment", "guilt", "shame", "hurt", "disappointment", "confusion", "excitement", "relief", "jealousy", "loneliness", "gratitude", "hope", "despair", "rage", "panic", "numbness", "overwhelm", "peace", "longing", "resentment", "compassion"
- emotionalRegulation: Use only: "excellent", "good", "fair", "poor"
- dayOfWeek: Use only: "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday", "unknown"
- timeOfDay: Use only: "morning", "afternoon", "evening", "night", "unknown"
- overallCommunicationStyle: Use only: "assertive", "passive", "aggressive", "passive_aggressive", "avoidant", "dismissive"  
- conflictResolutionStyle: Use only: "collaborative", "competitive", "accommodating", "avoiding", "compromising"
- listeningEffectiveness: Use only: "excellent", "good", "fair", "poor"
- relationshipHealth: Use only: "excellent", "good", "fair", "poor", "toxic"
- relationshipStability: Use only: "very_stable", "stable", "somewhat_unstable", "very_unstable"
- intimacyLevel: Use only: "very_close", "close", "moderate", "distant", "very_distant"
- trustLevel: Use only: "high", "medium", "low", "broken"
- effortBalance: Use only: "balanced", "you_more", "them_more", "both_low"
- investmentLevel: Use only: "high", "moderate", "low", "minimal"
- conflictFrequency: Use only: "rare", "occasional", "frequent", "constant"
- conflictResolution: Use only: "excellent", "good", "fair", "poor", "none"
- relationshipGrowth: Use only: "growing", "stable", "stagnant", "declining"
- personalGrowthSupport: Use only: "mutual", "one_sided", "competitive", "none"
- confidenceLevel: Use only: "high", "medium", "low"

TRAUMA RESPONSE PATTERN DETECTION:
Look for these specific trauma response patterns in the reflection text:

PRIMARY TRAUMA RESPONSES:
- fight_response: "I got aggressive", "I confronted them", "I fought back", "I got defensive"
- flight_response: "I left the room", "I avoided the conversation", "I walked away", "I escaped"
- freeze_response: "I couldn't move", "I felt paralyzed", "I couldn't speak", "I froze up"
- fawn_response: "I tried to please them", "I agreed to everything", "I appeased them", "I people-pleased"

COMPLEX TRAUMA RESPONSES:
- dissociation: "I felt disconnected", "I wasn't really there", "I felt outside my body", "I felt numb"
- hypervigilance: "I was constantly on edge", "I was scanning for danger", "I couldn't relax", "I was hyperalert"
- emotional_flashback: "I felt like I was back in the past", "I re-experienced old trauma", "I had an emotional flashback"
- trauma_reenactment: "This feels familiar", "I keep recreating the same pattern", "I'm repeating old trauma"
- trauma_bonding: "I feel attached to them despite the harm", "I can't leave even though it's toxic"

PHYSICAL TRAUMA RESPONSES:
- somatic_symptoms: "I got a headache", "My stomach hurt", "I felt pain", "I had physical symptoms"
- sleep_disturbances: "I couldn't sleep", "I had nightmares", "I woke up panicking", "Sleep was disrupted"
- appetite_changes: "I couldn't eat", "I overate", "My appetite changed", "I felt nauseous"
- energy_fluctuations: "I felt exhausted", "I had too much energy", "I felt wired", "My energy was erratic"

COGNITIVE TRAUMA RESPONSES:
- memory_fragmentation: "I can't remember details", "My memory is fragmented", "I have gaps in memory"
- concentration_issues: "I couldn't focus", "My mind was scattered", "I had trouble concentrating"
- intrusive_thoughts: "I kept having unwanted thoughts", "I couldn't stop thinking about it", "Intrusive memories"
- cognitive_distortions: "I'm worthless", "Everything is my fault", "I'm always wrong", "I can't trust anyone"

EMOTIONAL TRAUMA RESPONSES:
- emotional_numbing: "I felt nothing", "I was emotionally numb", "I couldn't feel emotions"
- emotional_overwhelm: "I was completely overwhelmed", "I couldn't handle my emotions", "I felt flooded"
- emotional_dysregulation: "I couldn't control my emotions", "My emotions were all over the place"
- shame_and_guilt: "I felt so ashamed", "I blamed myself", "I felt guilty", "I felt worthless"

BEHAVIORAL TRAUMA RESPONSES:
- avoidance_behaviors: "I avoided them", "I stayed away", "I didn't want to see them"
- compulsive_behaviors: "I kept doing the same thing", "I had repetitive behaviors", "I couldn't stop"
- self_harm_behaviors: "I hurt myself", "I engaged in self-harm", "I punished myself"
- substance_use: "I drank to cope", "I used substances", "I numbed myself with drugs/alcohol"

RELATIONAL TRAUMA RESPONSES:
- attachment_disruption: "I can't form close relationships", "I push people away", "I'm afraid of intimacy"
- trust_issues: "I can't trust anyone", "I'm always suspicious", "I expect betrayal"
- boundary_confusion: "I don't know where I end and they begin", "I have no boundaries", "I'm confused about limits"
- codependency_patterns: "I can't function without them", "I'm completely dependent", "I lose myself in relationships"

RECOVERY AND HEALING PATTERNS:
- trauma_processing: "I'm working through my trauma", "I'm processing what happened", "I'm healing"
- resilience_building: "I'm getting stronger", "I'm building resilience", "I'm developing coping skills"
- post_traumatic_growth: "I've grown from this", "I'm stronger because of it", "I've learned and grown"
- healing_relationships: "I'm forming healthy relationships", "I'm learning to trust again", "I'm healing through connection"

CONNECTION PATTERN DETECTION:
Look for these specific connection patterns in the reflection text:

LOVE LANGUAGES:
- words_of_affirmation: "I told them I love them", "I complimented them", "I expressed appreciation"
- quality_time: "We spent time together", "We had undivided attention", "We focused on each other"
- physical_touch: "We hugged", "We held hands", "We were physically close"
- acts_of_service: "I helped them", "I did something for them", "I took care of them"
- gifts: "I gave them something", "I bought them a gift", "I surprised them"

CONNECTION ATTEMPTS:
- active_listening: "I really listened", "I paid attention", "I focused on them"
- vulnerability_sharing: "I opened up", "I shared something personal", "I was vulnerable"
- physical_affection: "I hugged them", "I touched them", "I was affectionate"
- shared_activities: "We did something together", "We shared an activity", "We collaborated"
- emotional_support: "I supported them", "I comforted them", "I was there for them"
- humor_sharing: "We laughed together", "We joked around", "We had fun"
- future_planning: "We planned together", "We talked about the future", "We made plans"
- appreciation_expressing: "I thanked them", "I showed gratitude", "I appreciated them"

CONNECTION BARRIERS:
- emotional_withdrawal: "I pulled back", "I became distant", "I shut down"
- communication_shutdown: "I stopped talking", "I went silent", "I shut down"
- physical_distance: "I avoided touch", "I kept my distance", "I was cold"
- criticism_patterns: "I criticized them", "I found faults", "I was negative"
- defensiveness: "I got defensive", "I was defensive", "I protected myself"
- stonewalling: "I refused to engage", "I wouldn't respond", "I shut them out"
- busy_schedules: "We were too busy", "No time to connect", "Schedules conflicted"
- external_distractions: "We were distracted", "Other things got in the way", "We couldn't focus"

INTIMACY TYPES:
- emotional_intimacy: "We shared deep emotional connection", "We're emotionally close", "We're vulnerable with each other"
- physical_intimacy: "We have great physical connection", "We're physically close", "We enjoy physical affection"
- intellectual_intimacy: "We have deep conversations", "We connect intellectually", "We enjoy discussing ideas"
- spiritual_intimacy: "We share spiritual beliefs", "We connect on a spiritual level", "We have shared values"
- creative_intimacy: "We create together", "We share artistic expression", "We collaborate creatively"
- playful_intimacy: "We have fun together", "We play games", "We're silly together"
- supportive_intimacy: "We support each other", "We're there for each other", "We help each other"
- adventurous_intimacy: "We try new things together", "We explore together", "We adventure together"

COGNITIVE PATTERN DETECTION:
Look for these specific thinking traps in the reflection text (based on Mindset Health's 12 cognitive distortions):
- mind_reading: "They think...", "They must believe...", "Obviously they..."
- fortune_telling: "I just know I'm going to fail", "This will never work", "I'm doomed"
- overgeneralization: Words like "always", "never", "everyone", "nobody"
- catastrophizing: "worst case", "disaster", "ruined", "terrible"
- black_and_white: "perfect", "awful", "complete failure", "total success"
- personalization: "It's my fault", "They're doing this because of me"
- filtering: Focusing only on negative details while ignoring positive ones
- jumping_to_conclusions: Making assumptions without evidence
- control_fallacies: "I can't control anything" or "I must control everything"
- blaming: "It's their fault", "They made me do it"
- always_being_right: Refusing to consider other perspectives or admit mistakes
- emotional_reasoning: "I feel it, so it must be true", "Because I'm anxious, something bad will happen"
- fallacy_of_fairness: "It's not fair", "That's unfair", "Life should be fair"

ABUSE DETECTION PATTERN DETECTION:
Look for these specific abusive behaviors in the reflection text:

PHYSICAL ABUSE:
- hitting: "hit me", "pushed me", "threw", "grabbed", "choked", "punched"
- pushing: Physical force used to shove or move someone against their will
- slapping: Striking someone with an open hand, often across the face
- kicking: Using feet or legs to strike or harm another person
- choking: Applying pressure to the neck or throat to restrict breathing
- throwing_objects: Throwing items at someone as a form of intimidation or harm
- physical_intimidation: Using physical presence or gestures to threaten or frighten someone

EMOTIONAL ABUSE (often subtle):
- gaslighting: "That never happened", "You're imagining things", "You're too sensitive"
- silent_treatment: "They won't talk to me", "Ignoring me for days", "Giving me the silent treatment"
- emotional_manipulation: "If you loved me, you would...", "You're making me do this"
- guilt_tripping: "After all I've done for you", "You owe me", "I sacrificed everything"
- constant_criticism: "You always mess up", "You're worthless", "You can't do anything right"
- belittling: "You're stupid", "You don't understand", "That's ridiculous"
- humiliation: "Everyone thinks you're pathetic", "You embarrass me"
- threats: "I'll leave you", "You'll be sorry", "I'll make you pay"
- intimidation: "You better watch out", "I know where you live"
- isolation: "Your friends don't like you", "Don't talk to them", "They're bad influences"
- controlling_behavior: "You can't go there", "I decide what you wear", "You need my permission"
- jealousy_abuse: "Who were you talking to?", "You're cheating on me", "I don't trust you"
- love_bombing: "You're perfect", "I can't live without you", "You're my everything"
- devaluation: "You used to be better", "You've changed", "You're not the person I fell in love with"
- stonewalling: "I'm not talking about this", "End of conversation", "I'm done"

VERBAL ABUSE:
- yelling: "screamed at me", "called me", "yelled", "insulted me"
- screaming: Shouting loudly and aggressively to intimidate or control someone
- name_calling: Using derogatory names or labels to insult, demean, or hurt someone
- verbal_threats: Expressing intent to harm someone through spoken words or threats
- insults: Using offensive or hurtful language to demean or belittle someone
- degrading_comments: Making remarks that diminish someone's dignity, worth, or self-esteem
- verbal_intimidation: Using threatening or aggressive language to frighten or control someone
- shouting: Speaking loudly and aggressively to intimidate or dominate someone

FINANCIAL ABUSE:
- financial_control: "won't give me money", "controls the finances", "won't let me work"
- economic_abuse: Using money or economic resources to control, manipulate, or harm someone
- withholding_money: Refusing to provide necessary financial support or access to shared resources
- sabotaging_work: Interfering with someone's employment or career opportunities

DIGITAL ABUSE:
- cyberstalking: "checking my phone", "tracking me", "monitoring my social media"
- digital_monitoring: Surveilling someone's digital activities, communications, or online presence
- revenge_porn: Sharing intimate images or videos without consent to harm or humiliate someone
- online_harassment: Persistent harassment, threats, or intimidation through digital platforms

For each abusive behavior detected, provide:
1. type: The category of abuse (physical, emotional, sexual, etc.)
2. behavior: The specific abusive behavior
3. quote: The exact quote from the reflection that demonstrates this abuse
4. impact: How this abuse affects the victim
5. reasonings: Why this behavior is considered abusive

ABUSE DETECTION ANALYSIS REQUIREMENTS:
You MUST also provide:
- isAbusive: true or false - whether the reflection indicates abusive behavior
- isAtImmediateRisk: true or false - whether the user is at immediate risk
- abuseTriggers: Array of triggers or situations that lead to abusive behavior
- warningSigns: Array of additional warning signs or red flags present
- suggestedActionsToTake: Array of suggested actions to take for safety

OVERALL ASSESSMENT REQUIREMENTS:
You MUST provide a comprehensive overallAssessment with:
- healthScore: A number from 1-10 representing overall relationship health
- confidenceLevel: "high", "medium", or "low" based on your confidence in the analysis
- summary: A comprehensive 2-3 sentence summary of the relationship analysis
- keyInsights: Top 3-5 key insights from this reflection
- warningFlags: Any warning flags to monitor
- positiveHighlights: Positive aspects to celebrate

FINAL REMINDER: You MUST generate ALL 12 required fields:
1. emotionalPatterns 2. communicationPatterns 3. behaviorPatterns 4. relationshipDynamics 5. contextFactors 6. actionableInsights 7. attachmentPatterns 8. traumaResponses 9. connectionPatterns 10. cognitivePatterns 11. abuseDetection 12. overallAssessment

DO NOT STOP UNTIL ALL FIELDS ARE COMPLETE. If you stop early, the analysis will fail.

Please provide a thorough analysis covering all aspects of the schema, being specific and helpful while maintaining appropriate professional boundaries.`;
