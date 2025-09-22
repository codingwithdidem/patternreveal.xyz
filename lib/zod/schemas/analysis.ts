import { z } from "zod";

// Behavioral pattern descriptions - constants for consistency
export const BEHAVIORAL_PATTERN_DESCRIPTIONS = {
  procrastination:
    "Habitually delaying tasks or responsibilities, often linked to fear of failure or perfectionism.",
  compulsive_behaviors:
    "Engaging in repetitive actions like checking or hand-washing, typically rooted in anxiety.",
  self_harm:
    "Deliberate actions like cutting or burning as a coping mechanism for emotional distress.",
  chronic_lateness:
    "Regular tardiness that may signify avoidance or underlying anxiety.",
  workaholism:
    "An unhealthy obsession with work, often masking issues like fear of inadequacy.",
  chronic_complaining:
    "Focusing on the negative aspects of life, which can strain relationships and mental health.",
  perfectionism:
    "An obsession with flawlessness leading to procrastination or dissatisfaction.",
  lack_of_boundaries:
    "Inability to set or uphold healthy boundaries, leading to burnout or resentment.",
  inappropriate_social_behavior:
    "Displaying disruptive behavior in social settings, possibly indicating social disorders.",
  lack_of_motivation:
    "Pervasive disinterest in various life facets, hinting at burnout or depression.",
  difficulty_expressing_emotions:
    "Inability to articulate feelings appropriately, often due to past traumas.",
  inability_to_say_no:
    "Struggling to decline requests, leading to burnout and resentment.",
  lack_of_empathy:
    "Inability to resonate with others' feelings, possibly due to emotional detachment.",
  sabotage_success:
    "Undermining personal achievements due to fear of success or impostor syndrome.",
  habitual_gossiping:
    "Engaging in regular negative talk about others, possibly for social bonding or validation.",
  avoidance_of_eye_contact:
    "Consistently avoiding eye contact, signaling insecurity or past experiences.",
  lack_of_interest_in_growth:
    "Disinterest in self-betterment, indicating feelings of hopelessness or a fixed mindset.",
  social_withdrawal:
    "Persistent feelings of despair and lack of enthusiasm in everyday activities.",
  overeating_or_undereating:
    "Engaging in unhealthy eating habits as a coping mechanism for emotional stress.",
  impulsive_spending:
    "Making unplanned purchases to seek temporary emotional relief.",
  neglecting_self_care:
    "Consistently sidelining personal care or health, pointing to deeper emotional neglect.",
  obsessive_exercise:
    "Excessive focus on physical health, driven by body dysmorphia or societal pressures.",
  sexual_compulsions:
    "Challenges in sexual behaviors or relationships, reflecting deeper emotional issues.",
  fear_driven_avoidance:
    "Evading specific scenarios due to irrational fears or phobias.",
  chronic_lying:
    "Frequent deception as a defense mechanism, stemming from fear of judgment.",
  excessive_health_worry:
    "Obsessively checking or fretting about personal health, hindering daily functioning.",
  emotional_outbursts:
    "Uncontrollable emotional reactions disrupting personal and professional relationships.",
  stalking_or_obsessive_following:
    "Engaging in behaviors that signal profound emotional and psychological challenges.",
  avoidance_of_intimacy:
    "Fear of vulnerability leading to avoidance of close emotional bonds.",
  resistance_to_authority:
    "Habitually challenging authority, stemming from past negative experiences.",
  excessive_dependency:
    "Over-reliance on others, indicating insecurity or fear of independence.",
  manipulative_behavior:
    "Using deceitful tactics as a means of control or self-protection.",
  excessive_apologizing:
    "Over-apologizing due to past criticisms or low self-worth.",
  inconsistent_behavior:
    "Being unreliable due to poor time management or fear of commitment.",
  substance_abuse:
    "Misusing substances like alcohol or drugs as a coping mechanism.",
  aggression_or_violence:
    "Exhibiting harmful behaviors towards oneself or others.",
  relationship_conflict:
    "Engaging in constant disagreements or dysfunctional patterns in relationships.",
  avoidance_of_responsibilities:
    "Habitual evasion of personal, professional, or familial duties.",
  excessive_screen_time:
    "Over-reliance on electronic devices as an escape from reality.",
  hoarding:
    "Inability to let go of items, even trivial ones, indicating deep-seated fears.",
  disruptive_sleep_patterns:
    "Disturbances in sleep affecting daily life and health.",
  driving_recklessly:
    "Impulsive or hazardous driving indicating underlying aggression or thrill-seeking.",
  resistance_to_change:
    "Difficulty adapting due to insecurities or fear of the unknown.",
  habitual_blaming:
    "Attributing personal setbacks to others, avoiding personal responsibility.",

  // Relationship-specific behavioral patterns (from SWEET Institute research)
  pursuer_distancer_dynamic:
    "One partner pursues closeness while the other withdraws, creating a cycle of disconnection.",
  blame_game_pattern:
    "Consistently blaming each other for problems instead of working together to find solutions.",
  caretaker_dependent_dynamic:
    "One partner takes on excessive caregiving while the other becomes increasingly dependent.",
  conflict_avoidance_pattern:
    "Avoiding difficult conversations at all costs, leading to unresolved issues that fester.",
  tit_for_tat_behavior:
    "Keeping score of each other's actions and responding transactionally rather than with genuine connection.",
  peacemaker_role:
    "Consistently taking on the role of mediator or peacemaker during conflicts.",
  emotional_withdrawal_pattern:
    "Regularly pulling away emotionally or physically when feeling overwhelmed or hurt.",
  power_imbalance_dynamic:
    "One partner consistently dominates decision-making while the other feels undervalued or unheard.",
  intimacy_initiator_pattern:
    "One person always being the initiator of plans, intimacy, or emotional connection.",
  score_keeping_behavior:
    "Tracking and comparing contributions, efforts, or sacrifices in the relationship.",
  emotional_dumping_pattern:
    "Overwhelming partner with intense emotions without considering their capacity to handle it.",
  stonewalling_pattern:
    "Refusing to communicate or respond as a form of emotional manipulation or control.",
  love_bombing_pattern:
    "Overwhelming partner with excessive affection and attention to manipulate or control them.",
  devaluation_pattern:
    "Systematically reducing partner's worth or value in the relationship over time.",
  idealization_pattern:
    "Seeing partner as perfect initially, then becoming disappointed when they show flaws.",
  emotional_unavailability_pattern:
    "Difficulty being present and responsive to partner's emotional needs consistently.",
  codependent_enmeshment:
    "Unhealthy emotional fusion where boundaries are unclear and identities become merged.",
  protest_behavior_pattern:
    "Acting out or becoming upset when feeling disconnected from partner to get their attention.",
  deactivating_strategy_pattern:
    "Finding faults or reasons to pull away when getting close to avoid vulnerability.",
} as const;

// Communication pattern descriptions - constants for consistency
export const COMMUNICATION_PATTERN_DESCRIPTIONS = {
  // Basic communication styles
  assertive:
    "Expressing thoughts and feelings openly and honestly while respecting others' rights and needs.",
  passive:
    "Avoiding expressing thoughts or feelings, often yielding to others to avoid conflict.",
  aggressive:
    "Expressing thoughts and feelings in a way that violates others' rights, often through dominance or intimidation.",
  passive_aggressive:
    "Appearing passive on the surface but acting out resentment in subtle, indirect ways like sarcasm or backhanded compliments.",
  avoidant:
    "Actively avoiding difficult conversations or topics to prevent conflict or discomfort.",
  dismissive:
    "Minimizing or disregarding others' feelings, concerns, or opinions.",

  // Virginia Satir's communication patterns
  blaming:
    "Assigning responsibility to others without acknowledging one's own role in a situation.",
  computing:
    "Communicating in a detached, overly logical manner while ignoring emotions and personal aspects.",
  distracting:
    "Avoiding the issue at hand by changing the subject or making irrelevant comments.",
  placating:
    "Agreeing with others to avoid conflict, often at the expense of one's own needs and feelings.",

  // Conflict resolution styles
  collaborative:
    "Working together to find solutions that satisfy both parties' needs and concerns.",
  competitive:
    "Approaching conflict as a win-lose situation, focusing on winning at the other's expense.",
  accommodating:
    "Giving in to the other person's wishes, often sacrificing one's own needs.",
  avoiding:
    "Steering clear of conflict situations or withdrawing from discussions.",
  compromising:
    "Finding middle-ground solutions where both parties give up something to reach agreement.",

  // Listening patterns
  active_listening:
    "Fully concentrating on the speaker, understanding their message, and responding thoughtfully.",
  selective_listening:
    "Hearing only parts of what's being said, often filtering out uncomfortable information.",
  defensive_listening:
    "Interpreting messages as personal attacks and responding defensively.",
  superficial_listening:
    "Hearing words but not understanding deeper meanings or emotions.",
  empathetic_listening:
    "Listening with the intent to understand the speaker's feelings and perspective.",

  // Additional communication patterns
  interrupting:
    "Cutting off others mid-sentence without waiting for them to finish their thoughts.",
  stonewalling:
    "Refusing to communicate or respond, often as a form of emotional manipulation.",
  gaslighting:
    "Manipulating someone into questioning their own memory, perception, or judgment.",
  lecturing:
    "Speaking in a condescending or preachy manner, often talking down to others.",
  sarcasm:
    "Using sharp, bitter remarks that are often disguised as humor to express contempt.",
  silent_treatment:
    "Deliberately ignoring someone or refusing to communicate as a form of punishment.",
  emotional_dumping:
    "Overwhelming others with intense emotions without considering their capacity to handle it.",
  mind_reading_assumptions:
    "Assuming you know what others are thinking without asking or confirming.",
  catastrophizing:
    "Exaggerating problems or predicting worst-case scenarios during communication.",
  invalidating:
    "Dismissing or minimizing others' feelings, experiences, or perspectives.",
} as const;

// Abusive behavior descriptions - constants for consistency
export const ABUSIVE_BEHAVIOR_DESCRIPTIONS = {
  // Physical abuse
  hitting: "Physical violence involving striking or hitting another person.",
  pushing: "Physical force used to shove or move someone against their will.",
  slapping: "Striking someone with an open hand, often across the face.",
  kicking: "Using feet or legs to strike or harm another person.",
  choking: "Applying pressure to the neck or throat to restrict breathing.",
  throwing_objects:
    "Throwing items at someone as a form of intimidation or harm.",
  physical_intimidation:
    "Using physical presence or gestures to threaten or frighten someone.",

  // Emotional abuse
  gaslighting:
    "Manipulating someone into questioning their own memory, perception, or judgment.",
  silent_treatment:
    "Deliberately ignoring or refusing to communicate with someone as punishment.",
  emotional_manipulation:
    "Using emotions to control, influence, or exploit another person.",
  guilt_tripping:
    "Making someone feel guilty to manipulate their behavior or decisions.",
  emotional_blackmail:
    "Using threats or emotional pressure to control someone's actions.",
  constant_criticism:
    "Persistently finding fault and criticizing someone's actions or character.",
  belittling:
    "Making someone feel small, unimportant, or inferior through words or actions.",
  humiliation:
    "Causing someone to feel ashamed, embarrassed, or degraded publicly or privately.",
  threats: "Expressing intent to harm, punish, or cause damage to someone.",
  intimidation:
    "Using fear or threats to control or influence someone's behavior.",
  isolation:
    "Preventing someone from maintaining relationships with family, friends, or support systems.",
  controlling_behavior:
    "Exerting excessive control over someone's actions, decisions, or freedom.",
  jealousy_abuse:
    "Using jealousy as a tool to control, manipulate, or restrict someone's behavior.",
  love_bombing:
    "Overwhelming someone with excessive affection and attention to manipulate them.",
  devaluation:
    "Systematically reducing someone's worth or value in the relationship.",
  stonewalling:
    "Refusing to communicate or respond as a form of emotional manipulation.",

  // Sexual abuse
  sexual_coercion:
    "Using pressure, threats, or manipulation to force sexual activity.",
  sexual_manipulation:
    "Using sex as a tool to control, punish, or manipulate someone.",
  unwanted_sexual_contact:
    "Any sexual contact that occurs without clear, enthusiastic consent.",
  sexual_threats:
    "Threatening sexual violence or using sexual intimidation to control someone.",

  // Financial abuse
  financial_control:
    "Controlling someone's access to money, resources, or financial independence.",
  economic_abuse:
    "Using money or economic resources to control, manipulate, or harm someone.",
  withholding_money:
    "Refusing to provide necessary financial support or access to shared resources.",
  sabotaging_work:
    "Interfering with someone's employment or career opportunities.",

  // Mental/Psychological abuse
  mind_games:
    "Manipulating someone's thoughts, perceptions, or reality through psychological tactics.",
  psychological_manipulation:
    "Using psychological techniques to control, influence, or exploit someone.",
  brainwashing:
    "Systematic manipulation designed to change someone's beliefs or behaviors.",
  psychological_torture:
    "Inflicting severe psychological distress through systematic abuse.",

  // Digital abuse
  cyberstalking:
    "Using digital technology to stalk, harass, or monitor someone without consent.",
  digital_monitoring:
    "Surveilling someone's digital activities, communications, or online presence.",
  revenge_porn:
    "Sharing intimate images or videos without consent to harm or humiliate someone.",
  online_harassment:
    "Persistent harassment, threats, or intimidation through digital platforms.",

  // Social abuse
  social_isolation:
    "Systematically cutting someone off from their social support network.",
  reputation_damage:
    "Spreading false information or rumors to harm someone's reputation.",
  social_manipulation:
    "Using social relationships or networks to control or harm someone.",
  alienation:
    "Turning others against someone or creating social distance between them and their support system.",

  // Verbal abuse
  yelling:
    "Raising voice aggressively to intimidate, control, or harm someone emotionally.",
  name_calling:
    "Using derogatory names or labels to insult, demean, or hurt someone.",
  verbal_threats:
    "Expressing intent to harm someone through spoken words or threats.",
  screaming:
    "Shouting loudly and aggressively to intimidate or control someone.",
  insults: "Using offensive or hurtful language to demean or belittle someone.",
  degrading_comments:
    "Making remarks that diminish someone's dignity, worth, or self-esteem.",
  verbal_intimidation:
    "Using threatening or aggressive language to frighten or control someone.",
  shouting:
    "Speaking loudly and aggressively to intimidate or dominate someone.",
} as const;

// Attachment pattern descriptions - constants for consistency
export const ATTACHMENT_PATTERN_DESCRIPTIONS = {
  // Secure attachment behaviors
  secure_communication:
    "Open, honest communication with emotional regulation and mutual respect.",
  healthy_boundaries:
    "Clear, flexible boundaries that respect both self and others.",
  emotional_regulation:
    "Ability to manage emotions effectively without becoming overwhelmed or shutting down.",
  trust_and_intimacy:
    "Comfortable with both closeness and independence in relationships.",
  conflict_resolution:
    "Approaching conflicts constructively with empathy and problem-solving.",
  self_soothing:
    "Ability to calm oneself during stress without relying solely on others.",
  mutual_support: "Giving and receiving support in balanced, healthy ways.",

  // Anxious attachment behaviors
  clinginess: "Excessive need for closeness and reassurance from others.",
  fear_of_abandonment:
    "Intense fear of being left or rejected by important people.",
  hypervigilance:
    "Constantly monitoring others' moods and behaviors for signs of rejection.",
  emotional_dysregulation:
    "Intense emotional reactions that are difficult to manage.",
  seeking_reassurance:
    "Frequently asking for validation and confirmation of love/care.",
  protest_behaviors:
    "Acting out or becoming upset when feeling disconnected from others.",
  merging_identity:
    "Losing sense of self in relationships, becoming overly focused on partner.",
  jealousy_and_possessiveness:
    "Fearful reactions to partner's independence or other relationships.",

  // Avoidant attachment behaviors
  emotional_distance: "Keeping others at arm's length to avoid vulnerability.",
  self_reliance: "Excessive independence, avoiding asking for help or support.",
  dismissing_emotions:
    "Minimizing or ignoring emotional needs in self and others.",
  commitment_phobia:
    "Fear of long-term commitment or deep emotional connection.",
  stonewalling: "Shutting down or withdrawing during emotional conversations.",
  deactivating_strategies:
    "Finding faults or reasons to pull away when getting close.",
  workaholism: "Using work or other activities to avoid emotional intimacy.",
  casual_relationships:
    "Preferring surface-level connections over deep emotional bonds.",

  // Disorganized attachment behaviors
  contradictory_behaviors:
    "Acting in ways that seem to contradict each other (push-pull dynamics).",
  fear_of_intimacy:
    "Both craving and fearing close relationships simultaneously.",
  unpredictable_reactions:
    "Inconsistent emotional responses that confuse others.",
  trauma_responses:
    "Reacting to current situations based on past traumatic experiences.",
  dissociation: "Disconnecting from reality or emotions during stress.",
  chaotic_relationships:
    "Patterns of unstable, dramatic relationship dynamics.",
  identity_confusion:
    "Unclear sense of self, especially in relation to others.",
  hypervigilance_and_shutdown:
    "Alternating between extreme alertness and emotional shutdown.",

  // General attachment behaviors
  projection: "Attributing one's own feelings or behaviors to others.",
  idealization_and_devaluation:
    "Seeing others as either perfect or completely flawed.",
  splitting: "Viewing people or situations in black-and-white terms.",
  codependency:
    "Excessive emotional or psychological reliance on another person.",
  enmeshment: "Unhealthy emotional fusion where boundaries are unclear.",
  emotional_unavailability:
    "Difficulty being present and responsive to others' emotional needs.",
  control_issues:
    "Attempting to control others' behaviors, feelings, or decisions.",
  manipulation: "Using indirect or deceptive methods to influence others.",
} as const;

// Emotional pattern descriptions - constants for consistency
export const EMOTIONAL_PATTERN_DESCRIPTIONS = {
  // Emotional regulation patterns
  emotional_suppression:
    "Consistently hiding or suppressing emotions to avoid conflict or vulnerability.",
  emotional_explosion:
    "Emotions build up and then explode in intense outbursts.",
  emotional_numbing:
    "Feeling disconnected from emotions or unable to feel them.",
  emotional_avoidance:
    "Actively avoiding situations that might trigger difficult emotions.",
  emotional_minimization:
    "Downplaying or minimizing the importance of emotions.",
  emotional_amplification:
    "Exaggerating or intensifying emotional responses beyond what's appropriate.",
  emotional_switching: "Rapidly switching between different emotional states.",
  emotional_stability:
    "Maintaining consistent emotional regulation across different situations.",

  // Emotional expression patterns
  emotional_openness:
    "Freely expressing emotions in healthy, appropriate ways.",
  emotional_withdrawal:
    "Pulling away emotionally when feeling hurt or overwhelmed.",
  emotional_dumping:
    "Overwhelming others with intense emotions without considering their capacity.",
  emotional_manipulation:
    "Using emotions to control or influence others' behavior.",
  emotional_validation_seeking:
    "Constantly seeking reassurance and validation for emotions.",
  emotional_independence:
    "Managing emotions independently without excessive reliance on others.",
  emotional_contagion: "Absorbing and mirroring others' emotional states.",
  emotional_boundaries:
    "Maintaining healthy boundaries around emotional expression and reception.",

  // Emotional response patterns
  fight_response:
    "Responding to emotional triggers with aggression or confrontation.",
  flight_response:
    "Responding to emotional triggers by avoiding or escaping the situation.",
  freeze_response:
    "Responding to emotional triggers by shutting down or becoming paralyzed.",
  fawn_response:
    "Responding to emotional triggers by people-pleasing or appeasing others.",
  adaptive_response:
    "Responding to emotional triggers with healthy coping strategies.",
  defensive_response:
    "Responding to emotional triggers with defensiveness or blame.",
  passive_response:
    "Responding to emotional triggers by withdrawing or becoming passive.",
  assertive_response:
    "Responding to emotional triggers with clear, respectful communication.",

  // Emotional intelligence patterns
  emotional_awareness: "High awareness of one's own emotions and their impact.",
  emotional_illiteracy:
    "Difficulty identifying, naming, or understanding emotions.",
  emotional_empathy:
    "Ability to understand and resonate with others' emotions.",
  emotional_blindness:
    "Difficulty recognizing or understanding others' emotional states.",
  emotional_self_soothing: "Ability to calm oneself during emotional distress.",
  emotional_dysregulation:
    "Difficulty managing emotional intensity and duration.",
  emotional_resilience: "Ability to bounce back from emotional setbacks.",
  emotional_vulnerability:
    "Comfortable with emotional openness and authenticity.",

  // Relationship-specific emotional patterns
  emotional_caretaking:
    "Taking responsibility for others' emotional well-being.",
  emotional_dependency:
    "Relying excessively on others for emotional regulation.",
  emotional_intimacy_avoidance:
    "Avoiding deep emotional connection due to fear.",
  emotional_intimacy_seeking: "Actively pursuing deep emotional connection.",
  emotional_competition:
    "Competing with others for emotional attention or validation.",
  emotional_jealousy:
    "Experiencing intense jealousy over others' emotional connections.",
  emotional_isolation: "Isolating oneself emotionally from others.",
  emotional_fusion:
    "Becoming emotionally enmeshed with others, losing individual identity.",

  // Trauma-related emotional patterns
  emotional_flashbacks:
    "Re-experiencing past emotional trauma in present situations.",
  emotional_dissociation:
    "Disconnecting from emotions as a protective mechanism.",
  emotional_hypervigilance:
    "Constantly scanning for emotional threats or dangers.",
  emotional_shutdown: "Completely shutting down emotionally when overwhelmed.",
  emotional_reexperiencing:
    "Repeatedly experiencing the same emotional patterns from trauma.",
  emotional_avoidance_trauma:
    "Avoiding emotions that remind one of past trauma.",
  emotional_safety_seeking: "Constantly seeking emotional safety and security.",
  emotional_trust_issues:
    "Difficulty trusting others with emotional vulnerability.",

  // Cultural and societal emotional patterns
  emotional_conformity:
    "Suppressing authentic emotions to fit cultural or social expectations.",
  emotional_performance:
    "Performing emotions for social approval rather than expressing genuine feelings.",
  emotional_scarcity:
    "Feeling emotionally deprived or lacking due to past experiences of scarcity.",
  emotional_abundance:
    "Feeling emotionally fulfilled and capable of giving emotional support to others.",
  emotional_collectivism:
    "Prioritizing group emotional harmony over individual emotional needs.",
  emotional_individualism:
    "Prioritizing individual emotional expression over group harmony.",
  emotional_cooperation:
    "Collaborating emotionally with others for mutual benefit.",
} as const;

// Relationship dynamics pattern descriptions - constants for consistency
export const RELATIONSHIP_DYNAMICS_DESCRIPTIONS = {
  // Power dynamics patterns
  power_imbalance:
    "One partner consistently has more control, influence, or decision-making power in the relationship.",
  power_sharing:
    "Both partners share power and influence equally in decision-making and relationship dynamics.",
  power_struggle:
    "Both partners compete for control, leading to conflicts and tension.",
  power_vacuum:
    "Neither partner takes leadership or responsibility, leading to indecision and stagnation.",
  power_manipulation:
    "One partner uses subtle or overt manipulation to maintain control over the other.",
  power_resistance:
    "One partner actively resists the other's attempts to control or influence them.",
  power_collaboration:
    "Both partners work together to make decisions and share influence constructively.",
  power_delegation:
    "One partner willingly delegates power to the other based on expertise or preference.",

  // Communication dynamics patterns
  communication_openness:
    "Both partners freely share thoughts, feelings, and concerns without fear of judgment.",
  communication_avoidance:
    "One or both partners avoid difficult conversations or important topics.",
  communication_dominance:
    "One partner dominates conversations, interrupting or talking over the other.",
  communication_passivity:
    "One partner remains passive in conversations, rarely contributing or expressing opinions.",
  communication_conflict:
    "Conversations frequently escalate into arguments or conflicts.",
  communication_superficial:
    "Conversations remain surface-level, avoiding deeper emotional or personal topics.",
  communication_validation:
    "Both partners actively listen and validate each other's perspectives.",
  communication_criticism:
    "One or both partners frequently criticize, blame, or attack each other verbally.",

  // Intimacy and connection patterns
  emotional_intimacy:
    "Both partners share deep emotional connection and vulnerability with each other.",
  emotional_distance:
    "Partners maintain emotional distance and avoid deep emotional sharing.",
  physical_intimacy: "Partners have healthy physical connection and affection.",
  physical_withdrawal:
    "One or both partners withdraw from physical contact or intimacy.",
  intellectual_intimacy:
    "Partners enjoy deep conversations and intellectual connection.",
  intellectual_competition:
    "Partners compete intellectually rather than collaborating.",
  spiritual_intimacy:
    "Partners share spiritual or philosophical beliefs and practices.",
  spiritual_disconnect:
    "Partners have different spiritual or philosophical beliefs that create distance.",

  // Trust and security patterns
  trust_building:
    "Both partners actively work to build and maintain trust in the relationship.",
  trust_erosion:
    "Trust is being damaged through broken promises, lies, or betrayals.",
  trust_restoration:
    "Partners are working to rebuild trust after a breach or betrayal.",
  trust_stability: "Trust remains stable and consistent in the relationship.",
  security_seeking:
    "One or both partners constantly seek reassurance and security.",
  security_providing:
    "One partner consistently provides emotional security and stability.",
  security_independence:
    "Both partners feel secure independently while maintaining connection.",
  security_dependency:
    "One partner is overly dependent on the other for emotional security.",

  // Conflict resolution patterns
  conflict_collaboration:
    "Partners work together to resolve conflicts through compromise and understanding.",
  conflict_avoidance:
    "Partners avoid addressing conflicts, leading to unresolved issues.",
  conflict_escalation:
    "Conflicts frequently escalate into larger arguments or fights.",
  conflict_competition:
    "Partners approach conflicts as win-lose situations rather than collaborative problem-solving.",
  conflict_mediation:
    "One partner acts as a mediator or peacemaker in conflicts.",
  conflict_stonewalling:
    "One partner shuts down or refuses to engage during conflicts.",
  conflict_resolution:
    "Partners effectively resolve conflicts and move forward together.",
  conflict_cycling:
    "The same conflicts repeat without resolution, creating ongoing tension.",

  // Support and care patterns
  mutual_support:
    "Both partners provide emotional and practical support to each other.",
  one_sided_support:
    "One partner provides most of the support while receiving little in return.",
  support_withholding:
    "One partner withholds support as a form of punishment or control.",
  support_overwhelming:
    "One partner provides excessive support, creating dependency.",
  support_boundaries:
    "Partners maintain healthy boundaries around support and care.",
  support_competition:
    "Partners compete for support or attention rather than providing it.",
  support_balance: "Support is balanced and reciprocal between partners.",
  support_neglect: "Both partners neglect providing support to each other.",

  // Growth and development patterns
  growth_encouragement:
    "Both partners encourage each other's personal growth and development.",
  growth_competition:
    "Partners compete with each other's growth rather than supporting it.",
  growth_stagnation:
    "The relationship lacks growth or development, remaining stagnant.",
  growth_individual:
    "Partners focus on individual growth without considering relationship growth.",
  growth_collaborative:
    "Partners grow together, supporting each other's development.",
  growth_resistance:
    "One partner resists change or growth in the relationship.",
  growth_acceleration:
    "The relationship is growing rapidly, sometimes too fast for comfort.",
  growth_balance:
    "Personal and relationship growth are balanced and mutually supportive.",
} as const;

// Trauma response pattern descriptions - constants for consistency
export const TRAUMA_RESPONSE_DESCRIPTIONS = {
  // Primary trauma responses
  fight_response:
    "Aggressive, confrontational, or defensive response to perceived threat or danger.",
  flight_response:
    "Avoiding, escaping, or withdrawing from threatening situations or people.",
  freeze_response:
    "Becoming immobilized, numb, or unable to respond to threatening situations.",
  fawn_response:
    "People-pleasing, appeasing, or trying to please others to avoid conflict or harm.",

  // Complex trauma responses
  dissociation:
    "Feeling disconnected from reality, body, or emotions during or after trauma.",
  hypervigilance:
    "Being constantly alert, scanning for danger, or feeling on edge.",
  emotional_flashback:
    "Sudden, intense emotional reactions that feel like past trauma is happening again.",
  trauma_reenactment:
    "Unconsciously recreating patterns from past trauma in current relationships.",
  trauma_bonding:
    "Forming strong emotional attachments to people who cause harm or trauma.",

  // Physical trauma responses
  somatic_symptoms:
    "Physical symptoms like headaches, stomach issues, or pain without medical cause.",
  sleep_disturbances:
    "Difficulty sleeping, nightmares, or sleep-related trauma responses.",
  appetite_changes:
    "Significant changes in eating patterns due to trauma activation.",
  energy_fluctuations:
    "Extreme fatigue or hyperarousal alternating with periods of normal energy.",

  // Cognitive trauma responses
  memory_fragmentation:
    "Difficulty remembering details or having fragmented memories of events.",
  concentration_issues:
    "Difficulty focusing or maintaining attention due to trauma activation.",
  intrusive_thoughts:
    "Unwanted, distressing thoughts or memories related to trauma.",
  cognitive_distortions:
    "Negative thought patterns that develop as a result of trauma.",

  // Emotional trauma responses
  emotional_numbing:
    "Feeling emotionally disconnected or unable to feel emotions.",
  emotional_overwhelm:
    "Feeling completely overwhelmed by emotions related to trauma.",
  emotional_dysregulation:
    "Difficulty managing or controlling emotional responses.",
  shame_and_guilt:
    "Intense feelings of shame, guilt, or self-blame related to trauma.",

  // Behavioral trauma responses
  avoidance_behaviors:
    "Avoiding people, places, or situations that remind of trauma.",
  compulsive_behaviors:
    "Repetitive behaviors used to cope with trauma-related distress.",
  self_harm_behaviors:
    "Hurting oneself as a way to cope with trauma-related pain.",
  substance_use: "Using substances to numb or escape trauma-related feelings.",

  // Relational trauma responses
  attachment_disruption:
    "Difficulty forming or maintaining healthy relationships due to trauma.",
  trust_issues: "Difficulty trusting others due to past betrayal or harm.",
  boundary_confusion:
    "Unclear or inconsistent personal boundaries due to trauma.",
  codependency_patterns:
    "Unhealthy dependency on others as a result of trauma.",

  // Recovery and healing patterns
  trauma_processing:
    "Actively working through and processing trauma experiences.",
  resilience_building:
    "Developing strength and coping skills to overcome trauma.",
  post_traumatic_growth:
    "Positive psychological changes that occur after trauma.",
  healing_relationships:
    "Forming healthy, supportive relationships that aid in healing.",
} as const;

// Context factors pattern descriptions - constants for consistency
export const CONTEXT_FACTORS_DESCRIPTIONS = {
  // Interaction types
  casual_conversation:
    "Light, informal conversation without serious topics or emotional weight.",
  serious_discussion:
    "Important conversation about significant topics requiring attention and focus.",
  conflict: "Disagreement, argument, or confrontation between parties.",
  celebration:
    "Positive interaction celebrating achievements, milestones, or happy events.",
  support_session:
    "One person providing emotional or practical support to the other.",
  planning: "Collaborative discussion about future plans, goals, or decisions.",
  reminiscing: "Sharing memories and reflecting on past experiences together.",
  problem_solving: "Working together to address challenges or find solutions.",

  // Duration patterns
  brief: "Short interaction lasting only a few minutes.",
  moderate: "Standard-length interaction lasting 15-30 minutes.",
  extended: "Long interaction lasting 30 minutes to several hours.",
  marathon: "Very long interaction lasting several hours or all day.",

  // Environment patterns
  home: "Interaction taking place in a private home setting.",
  work: "Interaction occurring in a professional or workplace environment.",
  public: "Interaction happening in a public space with others present.",
  online:
    "Digital interaction through video calls, messaging, or social media.",
  phone: "Voice-only interaction over telephone.",
  text: "Text-based communication through messaging apps or SMS.",

  // External stressors
  work_stress: "Pressure or stress from professional responsibilities.",
  financial_stress: "Money-related worries or financial difficulties.",
  family_stress: "Tension or issues with family members.",
  health_stress: "Concerns about physical or mental health.",
  social_stress: "Pressure from social situations or relationships.",
  time_pressure: "Feeling rushed or having limited time available.",
  environmental_stress:
    "External factors like noise, weather, or surroundings.",
  technology_stress: "Issues with devices, internet, or digital communication.",
} as const;

// Connection patterns descriptions - constants for consistency
export const CONNECTION_PATTERNS_DESCRIPTIONS = {
  // Love languages
  words_of_affirmation:
    "Expressing love through verbal compliments, encouragement, and appreciation.",
  quality_time:
    "Showing love by giving undivided attention and focused time together.",
  physical_touch:
    "Expressing affection through hugs, kisses, holding hands, and physical closeness.",
  acts_of_service:
    "Demonstrating love through helpful actions and doing things for the other person.",
  gifts:
    "Showing love through thoughtful presents and symbolic tokens of affection.",

  // Connection attempts
  active_listening:
    "Giving full attention and showing understanding during conversations.",
  vulnerability_sharing:
    "Opening up about personal thoughts, feelings, or experiences.",
  physical_affection: "Using touch to express care and connection.",
  shared_activities: "Engaging in activities together to build connection.",
  emotional_support:
    "Providing comfort and encouragement during difficult times.",
  humor_sharing:
    "Using laughter and playfulness to create positive connection.",
  future_planning: "Discussing shared goals and dreams together.",
  appreciation_expressing:
    "Showing gratitude and recognition for the other person.",

  // Connection barriers
  emotional_withdrawal: "Pulling back emotionally or becoming distant.",
  communication_shutdown: "Stopping or avoiding meaningful communication.",
  physical_distance: "Avoiding physical contact or closeness.",
  criticism_patterns: "Focusing on faults rather than positive aspects.",
  defensiveness: "Reacting defensively instead of listening openly.",
  stonewalling: "Refusing to engage or respond during conflicts.",
  busy_schedules: "Lack of time preventing meaningful connection.",
  external_distractions:
    "Technology, work, or other factors interfering with connection.",

  // Intimacy types
  emotional_intimacy: "Deep emotional connection and vulnerability sharing.",
  physical_intimacy: "Physical closeness, affection, and sexual connection.",
  intellectual_intimacy:
    "Mental stimulation and shared intellectual interests.",
  spiritual_intimacy: "Shared values, beliefs, and spiritual connection.",
  creative_intimacy:
    "Collaborative creative expression and artistic connection.",
  playful_intimacy: "Light-hearted fun, humor, and playful interaction.",
  supportive_intimacy: "Mutual care, encouragement, and practical support.",
  adventurous_intimacy:
    "Shared experiences, new activities, and exploration together.",
} as const;

// Text evidence schema for referencing specific statements

// Core emotional analysis
// Emotional patterns analysis - comprehensive emotional intelligence assessment
export const emotionalPatternSchema = z.object({
  // Basic emotional state
  dominantEmotion: z
    .enum([
      "joy",
      "sadness",
      "anger",
      "fear",
      "surprise",
      "disgust",
      "love",
      "anxiety",
      "frustration",
      "contentment",
      "guilt",
      "shame",
      "hurt",
      "disappointment",
      "confusion",
      "excitement",
      "relief",
      "jealousy",
      "loneliness",
      "gratitude",
      "hope",
      "despair",
      "rage",
      "panic",
      "numbness",
      "overwhelm",
      "peace",
      "longing",
      "resentment",
      "compassion",
    ])
    .describe("The primary emotion experienced during this interaction")
    .optional(),

  // Emotional regulation
  emotionalRegulation: z
    .enum(["excellent", "good", "fair", "poor"])
    .describe("How well emotions were managed and regulated")
    .optional(),

  // Detected emotional patterns
  detectedPatterns: z
    .array(
      z.object({
        pattern: z
          .enum([
            // Core emotional regulation patterns
            "emotional_suppression",
            "emotional_explosion",
            "emotional_numbing",
            "emotional_avoidance",

            // Core emotional expression patterns
            "emotional_openness",
            "emotional_withdrawal",
            "emotional_dumping",
            "emotional_manipulation",
            "emotional_validation_seeking",

            // Core emotional response patterns
            "fight_response",
            "flight_response",
            "freeze_response",
            "fawn_response",

            // Core emotional intelligence patterns
            "emotional_dysregulation",
            "emotional_vulnerability",
            "emotional_self_soothing",

            // Core relationship emotional patterns
            "emotional_dependency",
            "emotional_caretaking",
            "emotional_jealousy",
            "emotional_isolation",

            // Core trauma-related patterns
            "emotional_dissociation",
            "emotional_hypervigilance",
            "emotional_shutdown",
            "emotional_flashbacks",
          ])
          .describe("Specific emotional pattern detected")
          .optional(),
        quote: z
          .string()
          .describe(
            "Specific quote from the reflection that demonstrates this emotional pattern"
          )
          .optional(),
        impact: z
          .string()
          .describe(
            "How this emotional pattern affects the relationship or situation"
          )
          .optional(),
        severity: z
          .enum(["mild", "moderate", "severe", "extreme"])
          .describe("Severity level of the emotional pattern")
          .optional(),
        who_exhibited: z
          .enum(["you", "them", "both"])
          .describe("Who exhibited this emotional pattern")
          .optional(),
        trigger: z
          .string()
          .describe("What typically triggers this emotional pattern")
          .optional(),
        unsustainableBehavior: z
          .string()
          .describe("The problematic behavior this pattern leads to")
          .optional(),
        suggestedBehavior: z
          .string()
          .describe("Healthy alternative behavior to replace the pattern")
          .optional(),
        startIndex: z
          .number()
          .describe("Character index where quote starts")
          .optional(),
        endIndex: z
          .number()
          .describe("Character index where quote ends")
          .optional(),
      })
    )
    .describe("Specific emotional patterns detected with evidence")
    .optional(),

  // Emotional triggers
  emotionalTriggers: z
    .array(z.string())
    .describe("What triggered these emotions")
    .optional(),
});

// Communication analysis
export const communicationPatternSchema = z.object({
  detectedPatterns: z
    .array(
      z.object({
        pattern: z
          .enum([
            // Basic communication styles
            "assertive",
            "passive",
            "aggressive",
            "passive_aggressive",
            "avoidant",
            "dismissive",
            // Virginia Satir's patterns
            "blaming",
            "computing",
            "distracting",
            "placating",
            // Conflict resolution styles
            "collaborative",
            "competitive",
            "accommodating",
            "avoiding",
            "compromising",
            // Listening patterns
            "active_listening",
            "selective_listening",
            "defensive_listening",
            "superficial_listening",
            "empathetic_listening",
            // Additional patterns
            "interrupting",
            "stonewalling",
            "gaslighting",
            "lecturing",
            "sarcasm",
            "silent_treatment",
            "emotional_dumping",
            "mind_reading_assumptions",
            "catastrophizing",
            "invalidating",
            "belittling",
          ])
          .optional(),
        quote: z
          .string()
          .describe(
            "Specific quote from the reflection that demonstrates this communication pattern"
          )
          .optional(),
        impact: z
          .string()
          .describe(
            "How this communication pattern affects the relationship or situation"
          )
          .optional(),
        severity: z
          .enum(["mild", "moderate", "severe"])
          .describe("Severity level of this communication pattern")
          .optional(),
        startIndex: z
          .number()
          .describe("Character index where quote starts")
          .optional(),
        endIndex: z
          .number()
          .describe("Character index where quote ends")
          .optional(),
      })
    )
    .describe("Specific communication patterns detected with explanations")
    .optional(),
  overallCommunicationStyle: z
    .enum([
      "assertive",
      "passive",
      "aggressive",
      "passive_aggressive",
      "avoidant",
      "dismissive",
    ])
    .describe("Overall communication approach used during this interaction")
    .optional(),
  conflictResolutionStyle: z
    .enum([
      "collaborative",
      "competitive",
      "accommodating",
      "avoiding",
      "compromising",
    ])
    .describe("How conflicts and disagreements were handled")
    .optional(),
  listeningEffectiveness: z
    .enum(["excellent", "good", "fair", "poor"])
    .describe("How well both parties listened and understood each other")
    .optional(),
  expressedNeeds: z
    .array(z.string())
    .describe("What needs were expressed")
    .optional(),
  unmetNeeds: z.array(z.string()).describe("What needs went unmet").optional(),
  boundariesMaintained: z
    .boolean()
    .describe("Were healthy boundaries maintained?")
    .optional(),
  escalationTriggers: z
    .array(z.string())
    .describe("What escalated the situation")
    .optional(),
  resolutionAchieved: z
    .boolean()
    .describe("Was the issue resolved?")
    .optional(),
});

// Behavioral patterns
export const behaviorPatternSchema = z.object({
  detectedPatterns: z
    .array(
      z.object({
        pattern: z
          .enum([
            "procrastination",
            "compulsive_behaviors",
            "self_harm",
            "chronic_lateness",
            "workaholism",
            "chronic_complaining",
            "perfectionism",
            "lack_of_boundaries",
            "inappropriate_social_behavior",
            "lack_of_motivation",
            "difficulty_expressing_emotions",
            "inability_to_say_no",
            "lack_of_empathy",
            "sabotage_success",
            "habitual_gossiping",
            "avoidance_of_eye_contact",
            "lack_of_interest_in_growth",
            "social_withdrawal",
            "overeating_or_undereating",
            "impulsive_spending",
            "neglecting_self_care",
            "obsessive_exercise",
            "sexual_compulsions",
            "fear_driven_avoidance",
            "chronic_lying",
            "excessive_health_worry",
            "emotional_outbursts",
            "stalking_or_obsessive_following",
            "avoidance_of_intimacy",
            "resistance_to_authority",
            "excessive_dependency",
            "manipulative_behavior",
            "excessive_apologizing",
            "inconsistent_behavior",
            "substance_abuse",
            "aggression_or_violence",
            "relationship_conflict",
            "avoidance_of_responsibilities",
            "excessive_screen_time",
            "hoarding",
            "disruptive_sleep_patterns",
            "driving_recklessly",
            "resistance_to_change",
            "habitual_blaming",

            // Relationship-specific behavioral patterns
            "pursuer_distancer_dynamic",
            "blame_game_pattern",
            "caretaker_dependent_dynamic",
            "conflict_avoidance_pattern",
            "tit_for_tat_behavior",
            "peacemaker_role",
            "emotional_withdrawal_pattern",
            "power_imbalance_dynamic",
            "intimacy_initiator_pattern",
            "score_keeping_behavior",
            "emotional_dumping_pattern",
            "stonewalling_pattern",
            "love_bombing_pattern",
            "devaluation_pattern",
            "idealization_pattern",
            "emotional_unavailability_pattern",
            "codependent_enmeshment",
            "protest_behavior_pattern",
            "deactivating_strategy_pattern",
          ])
          .optional(),
        quote: z
          .string()
          .describe(
            "Specific quote from the reflection that demonstrates this pattern"
          )
          .optional(),
        impact: z
          .string()
          .describe(
            "How this behavioral pattern affects the relationship or situation"
          )
          .optional(),
        severity: z
          .enum(["mild", "moderate", "severe"])
          .describe("Severity level of this pattern")
          .optional(),
        startIndex: z
          .number()
          .describe("Character index where quote starts")
          .optional(),
        endIndex: z
          .number()
          .describe("Character index where quote ends")
          .optional(),
      })
    )
    .describe("Specific behavioral patterns detected with explanations")
    .optional(),
  behaviorCycles: z
    .array(
      z.object({
        trigger: z.string().optional(),
        response: z.string().optional(),
        outcome: z.string().optional(),
      })
    )
    .describe("Identified behavioral cycles")
    .optional(),
  growthOpportunities: z
    .array(z.string())
    .describe("Areas for personal growth")
    .optional(),
});

// Relationship dynamics
// Relationship dynamics analysis - comprehensive relationship health assessment
export const relationshipDynamicsSchema = z.object({
  // Detected relationship dynamics patterns
  detectedPatterns: z
    .array(
      z.object({
        pattern: z
          .enum([
            // Power dynamics patterns
            "power_imbalance",
            "power_sharing",
            "power_struggle",
            "power_vacuum",
            "power_manipulation",
            "power_resistance",
            "power_collaboration",
            "power_delegation",

            // Communication dynamics patterns
            "communication_openness",
            "communication_avoidance",
            "communication_dominance",
            "communication_passivity",
            "communication_conflict",
            "communication_superficial",
            "communication_validation",
            "communication_criticism",

            // Intimacy and connection patterns
            "emotional_intimacy",
            "emotional_distance",
            "physical_intimacy",
            "physical_withdrawal",
            "intellectual_intimacy",
            "intellectual_competition",
            "spiritual_intimacy",
            "spiritual_disconnect",

            // Trust and security patterns
            "trust_building",
            "trust_erosion",
            "trust_restoration",
            "trust_stability",
            "security_seeking",
            "security_providing",
            "security_independence",
            "security_dependency",

            // Conflict resolution patterns
            "conflict_collaboration",
            "conflict_avoidance",
            "conflict_escalation",
            "conflict_competition",
            "conflict_mediation",
            "conflict_stonewalling",
            "conflict_resolution",
            "conflict_cycling",

            // Support and care patterns
            "mutual_support",
            "one_sided_support",
            "support_withholding",
            "support_overwhelming",
            "support_boundaries",
            "support_competition",
            "support_balance",
            "support_neglect",

            // Growth and development patterns
            "growth_encouragement",
            "growth_competition",
            "growth_stagnation",
            "growth_individual",
            "growth_collaborative",
            "growth_resistance",
            "growth_acceleration",
            "growth_balance",
          ])
          .describe("Specific relationship dynamics pattern detected")
          .optional(),
        quote: z
          .string()
          .describe(
            "Specific quote from the reflection that demonstrates this relationship pattern"
          )
          .optional(),
        impact: z
          .string()
          .describe(
            "How this relationship pattern affects the overall relationship health"
          )
          .optional(),
        severity: z
          .enum(["mild", "moderate", "severe", "extreme"])
          .describe("Severity level of the relationship pattern")
          .optional(),
        who_exhibited: z
          .enum(["you", "them", "both"])
          .describe("Who exhibited this relationship pattern")
          .optional(),
        trigger: z
          .string()
          .describe("What typically triggers this relationship pattern")
          .optional(),
        unsustainableBehavior: z
          .string()
          .describe("The problematic behavior this pattern leads to")
          .optional(),
        suggestedBehavior: z
          .string()
          .describe("Healthy alternative behavior to improve the relationship")
          .optional(),
        startIndex: z
          .number()
          .describe("Character index where quote starts")
          .optional(),
        endIndex: z
          .number()
          .describe("Character index where quote ends")
          .optional(),
      })
    )
    .describe("Specific relationship dynamics patterns detected with evidence")
    .optional(),

  // Overall relationship health metrics
  relationshipHealth: z
    .enum(["excellent", "good", "fair", "poor", "toxic"])
    .describe("Overall health of the relationship")
    .optional(),
  relationshipSatisfaction: z
    .number()
    .min(1)
    .max(10)
    .describe("Overall satisfaction with the relationship (1-10)")
    .optional(),
  relationshipStability: z
    .enum(["very_stable", "stable", "somewhat_unstable", "very_unstable"])
    .describe("Stability of the relationship")
    .optional(),

  // Intimacy and connection assessment
  intimacyLevel: z
    .enum(["very_close", "close", "moderate", "distant", "very_distant"])
    .describe("Level of emotional closeness and vulnerability shared")
    .optional(),
  trustLevel: z
    .enum(["high", "medium", "low", "broken"])
    .describe("Current level of trust between both parties")
    .optional(),

  // Effort and investment assessment
  effortBalance: z
    .enum(["balanced", "you_more", "them_more", "both_low"])
    .describe("Who is putting in more effort to maintain the relationship")
    .optional(),
  investmentLevel: z
    .enum(["high", "moderate", "low", "minimal"])
    .describe("Overall level of investment in the relationship")
    .optional(),

  // Conflict and resolution assessment
  conflictFrequency: z
    .enum(["rare", "occasional", "frequent", "constant"])
    .describe("How often conflicts occur in the relationship")
    .optional(),
  conflictResolution: z
    .enum(["excellent", "good", "fair", "poor", "none"])
    .describe("How well conflicts are resolved")
    .optional(),

  // Growth and development assessment
  relationshipGrowth: z
    .enum(["growing", "stable", "stagnant", "declining"])
    .describe("Direction of relationship growth")
    .optional(),
  personalGrowthSupport: z
    .enum(["mutual", "one_sided", "competitive", "none"])
    .describe("How partners support each other's personal growth")
    .optional(),

  // Evidence and insights
  relationshipInsights: z
    .array(z.string())
    .describe("Key insights about relationship dynamics and health")
    .optional(),
  improvementAreas: z
    .array(z.string())
    .describe("Areas where the relationship could improve")
    .optional(),
  strengthsIdentified: z
    .array(z.string())
    .describe("Strengths and positive aspects of the relationship")
    .optional(),
});

// Context factors
// Comprehensive context factors analysis - detailed situational assessment
export const contextFactorsSchema = z.object({
  // Detected context patterns
  detectedPatterns: z
    .array(
      z.object({
        pattern: z
          .enum([
            // Interaction types
            "casual_conversation",
            "serious_discussion",
            "conflict",
            "celebration",
            "support_session",
            "planning",
            "reminiscing",
            "problem_solving",

            // Duration patterns
            "brief",
            "moderate",
            "extended",
            "marathon",

            // Environment patterns
            "home",
            "work",
            "public",
            "online",
            "phone",
            "text",

            // External stressors
            "work_stress",
            "financial_stress",
            "family_stress",
            "health_stress",
            "social_stress",
            "time_pressure",
            "environmental_stress",
            "technology_stress",
          ])
          .describe("Specific context factor pattern detected")
          .optional(),
        quote: z
          .string()
          .describe(
            "Specific quote from the reflection that demonstrates this context factor"
          )
          .optional(),
        impact: z
          .string()
          .describe("How this context factor affected the interaction")
          .optional(),
        severity: z
          .enum(["mild", "moderate", "severe", "extreme"])
          .describe("Severity level of the context factor's impact")
          .optional(),
        who_affected: z
          .enum(["you", "them", "both"])
          .describe("Who was most affected by this context factor")
          .optional(),
        mitigation: z
          .string()
          .describe("How the context factor was managed or could be managed")
          .optional(),
        future_prevention: z
          .string()
          .describe(
            "How to prevent or minimize this context factor in future interactions"
          )
          .optional(),
        startIndex: z
          .number()
          .describe("Character index where quote starts")
          .optional(),
        endIndex: z
          .number()
          .describe("Character index where quote ends")
          .optional(),
      })
    )
    .describe("Specific context factor patterns detected with evidence")
    .optional(),

  // Basic interaction context
  environment: z
    .enum(["home", "work", "public", "online", "phone", "text"])
    .describe("Where or how this interaction took place")
    .optional(),

  // External factors analysis
  externalStressors: z
    .array(z.string())
    .describe("External factors affecting the interaction")
    .optional(),
  stressorAnalysis: z
    .array(
      z.object({
        stressor: z.string().describe("Specific external stressor").optional(),
        impact: z
          .enum(["low", "moderate", "high", "severe"])
          .describe("Impact on interaction")
          .optional(),
        source: z
          .string()
          .describe("Where this stressor originated")
          .optional(),
        duration: z
          .string()
          .describe("How long this stressor was present")
          .optional(),
        coping: z.string().describe("How this stressor was handled").optional(),
      })
    )
    .describe("Detailed analysis of external stressors")
    .optional(),

  // Time context analysis
  timeContext: z
    .object({
      timeOfDay: z
        .enum(["morning", "afternoon", "evening", "night", "unknown"])
        .describe("What time of day this interaction occurred")
        .optional(),
      dayOfWeek: z
        .enum([
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
          "unknown",
        ])
        .describe("What day of the week this interaction occurred")
        .optional(),
      timingQuality: z
        .enum(["optimal", "good", "poor", "terrible"])
        .describe("How well-timed this interaction was")
        .optional(),
      timePressure: z
        .enum(["none", "mild", "moderate", "severe"])
        .describe("Level of time pressure during interaction")
        .optional(),
      timeImpact: z
        .string()
        .describe("How timing affected the interaction")
        .optional(),
      specialCircumstances: z.array(z.string()).default([]).optional(),
    })
    .optional(),

  // Emotional context
  emotionalContext: z
    .object({
      recentEvents: z
        .array(z.string())
        .describe("Recent events affecting emotional state")
        .optional(),
      emotionalBaggage: z
        .array(z.string())
        .describe("Previous emotional experiences affecting this interaction")
        .optional(),
    })
    .optional(),

  // Context optimization recommendations
  contextOptimization: z
    .object({
      idealTiming: z
        .string()
        .describe("When this type of interaction would work best")
        .optional(),
      idealEnvironment: z
        .string()
        .describe("Best environment for this type of interaction")
        .optional(),
      preparationNeeded: z
        .array(z.string())
        .describe("How to prepare for similar future interactions")
        .optional(),
      barriersToRemove: z
        .array(z.string())
        .describe("Context barriers to avoid in future")
        .optional(),
    })
    .optional(),

  // Evidence and insights
  contextInsights: z
    .array(z.string())
    .describe("Key insights about how context affected the interaction")
    .optional(),
  contextRecommendations: z
    .array(z.string())
    .describe("Recommendations for optimizing future interactions")
    .optional(),
});

// Actionable insights
// Comprehensive actionable insights schema - structured guidance for users
export const actionableInsightsSchema = z.object({
  // Immediate actions (next 24-48 hours)
  immediateActions: z
    .array(
      z.object({
        action: z.string().describe("Specific action to take"),
        priority: z
          .enum(["critical", "high", "medium", "low"])
          .describe("Priority level"),
        timeframe: z.string().describe("When to take this action"),
        reasoning: z.string().describe("Why this action is important"),
        expectedOutcome: z.string().describe("What this action should achieve"),
        difficulty: z
          .enum(["easy", "moderate", "challenging", "difficult"])
          .describe("How difficult this action is"),
      })
    )
    .describe("Actions to take immediately (next 24-48 hours)")
    .optional(),

  // Communication strategies
  communicationStrategies: z
    .array(
      z.object({
        strategy: z.string().describe("Communication strategy to use"),
        whenToUse: z.string().describe("When this strategy is most effective"),
        howToImplement: z
          .string()
          .describe("Step-by-step implementation guide"),
        examplePhrases: z.array(z.string()).describe("Example phrases to use"),
        whatToAvoid: z
          .array(z.string())
          .describe("What to avoid when using this strategy"),
        expectedResult: z
          .string()
          .describe("Expected outcome from this strategy"),
      })
    )
    .describe("Communication strategies for better interactions")
    .optional(),

  // Emotional regulation techniques
  emotionalRegulationTechniques: z
    .array(
      z.object({
        technique: z.string().describe("Emotional regulation technique"),
        trigger: z
          .string()
          .describe("What emotional state this technique addresses"),
        steps: z.array(z.string()).describe("Step-by-step instructions"),
        duration: z.string().describe("How long this technique takes"),
        effectiveness: z
          .enum(["high", "moderate", "low"])
          .describe("Expected effectiveness"),
        whenToUse: z.string().describe("Best situations to use this technique"),
      })
    )
    .describe("Techniques for managing emotions effectively")
    .optional(),

  // Boundary setting guidance
  boundaryGuidance: z
    .array(
      z.object({
        boundaryType: z.string().describe("Type of boundary to set"),
        currentIssue: z.string().describe("Current boundary violation or need"),
        boundaryStatement: z
          .string()
          .describe("How to communicate this boundary"),
        enforcementStrategy: z
          .string()
          .describe("How to maintain this boundary"),
        consequences: z
          .string()
          .describe("What happens if boundary is violated"),
        supportNeeded: z.string().describe("Support or resources needed"),
      })
    )
    .describe("Guidance for setting and maintaining healthy boundaries")
    .optional(),

  // Conflict resolution approaches
  conflictResolutionApproaches: z
    .array(
      z.object({
        approach: z.string().describe("Conflict resolution approach"),
        situation: z.string().describe("Type of conflict this addresses"),
        steps: z.array(z.string()).describe("Step-by-step process"),
        timing: z.string().describe("When to use this approach"),
        preparation: z.string().describe("How to prepare for this approach"),
        followUp: z.string().describe("What to do after using this approach"),
      })
    )
    .describe("Approaches for resolving conflicts constructively")
    .optional(),

  // Personal growth recommendations
  personalGrowthRecommendations: z
    .array(
      z.object({
        area: z.string().describe("Area of personal growth"),
        currentPattern: z.string().describe("Current problematic pattern"),
        growthGoal: z.string().describe("Specific growth objective"),
        actionSteps: z
          .array(z.string())
          .describe("Steps to achieve this growth"),
        timeline: z.string().describe("Expected timeline for progress"),
        resources: z.array(z.string()).describe("Resources or tools needed"),
        measurement: z.string().describe("How to measure progress"),
      })
    )
    .describe("Personal growth recommendations based on patterns")
    .optional(),

  // Relationship building activities
  relationshipBuildingActivities: z
    .array(
      z.object({
        activity: z.string().describe("Relationship building activity"),
        purpose: z.string().describe("What this activity aims to achieve"),
        frequency: z.string().describe("How often to do this activity"),
        preparation: z.string().describe("How to prepare for this activity"),
        implementation: z.string().describe("How to implement this activity"),
        expectedBenefit: z.string().describe("Expected relationship benefit"),
      })
    )
    .describe("Activities to strengthen the relationship")
    .optional(),

  // Self-care and wellness strategies
  selfCareStrategies: z
    .array(
      z.object({
        strategy: z.string().describe("Self-care strategy"),
        category: z
          .enum(["physical", "emotional", "mental", "spiritual", "social"])
          .describe("Type of self-care"),
        frequency: z.string().describe("How often to practice this"),
        duration: z.string().describe("How long each session should be"),
        benefits: z
          .array(z.string())
          .describe("Specific benefits of this strategy"),
        barriers: z
          .array(z.string())
          .describe("Common barriers and how to overcome them"),
        resources: z.array(z.string()).describe("Resources or tools needed"),
      })
    )
    .describe("Self-care strategies for personal wellbeing")
    .optional(),

  // Conversation starters and topics
  conversationTopics: z
    .array(
      z.object({
        topic: z.string().describe("Conversation topic"),
        context: z.string().describe("When this topic is appropriate"),
        openingPhrase: z.string().describe("How to start this conversation"),
        keyPoints: z.array(z.string()).describe("Important points to cover"),
        listeningTips: z
          .array(z.string())
          .describe("How to listen effectively"),
        followUpQuestions: z
          .array(z.string())
          .describe("Questions to deepen the conversation"),
        potentialChallenges: z
          .array(z.string())
          .describe("Potential challenges and how to handle them"),
      })
    )
    .describe("Conversation topics and how to approach them")
    .optional(),

  // Warning signs and red flags
  warningSigns: z
    .array(
      z.object({
        sign: z.string().describe("Warning sign to watch for").optional(),
        severity: z
          .enum(["low", "medium", "high", "critical"])
          .describe("Severity level")
          .optional(),
        description: z
          .string()
          .describe("What this warning sign looks like")
          .optional(),
        action: z
          .string()
          .describe("What to do if this sign appears")
          .optional(),
        prevention: z
          .string()
          .describe("How to prevent this from happening")
          .optional(),
        support: z
          .string()
          .describe("Support resources if this occurs")
          .optional(),
      })
    )
    .describe("Warning signs to monitor and how to respond")
    .optional(),

  // Resource recommendations
  resourceRecommendations: z
    .array(
      z.object({
        resource: z.string().describe("Resource name").optional(),
        type: z
          .enum([
            "book",
            "article",
            "video",
            "podcast",
            "app",
            "therapy",
            "workshop",
            "community",
          ])
          .describe("Type of resource")
          .optional(),
        purpose: z.string().describe("What this resource helps with"),
        description: z
          .string()
          .describe("Brief description of the resource")
          .optional(),
        accessibility: z
          .string()
          .describe("How to access this resource")
          .optional(),
        cost: z.string().describe("Cost information").optional(),
        effectiveness: z
          .enum(["high", "moderate", "low"])
          .describe("Expected effectiveness")
          .optional(),
      })
    )
    .describe("Recommended resources for further learning and support")
    .optional(),

  // Long-term vision and goals
  longTermVision: z
    .array(
      z
        .object({
          timeframe: z.string().describe("Timeframe for this goal").optional(),
          goal: z.string().describe("Long-term goal").optional(),
          currentReality: z.string().describe("Current state").optional(),
          desiredOutcome: z
            .string()
            .describe("Desired future state")
            .optional(),
          steps: z
            .array(z.string())
            .describe("Steps to achieve this goal")
            .optional(),
          obstacles: z
            .array(z.string())
            .describe("Potential obstacles")
            .optional(),
          support: z
            .string()
            .describe("Support needed to achieve this goal")
            .optional(),
        })
        .optional()
    )
    .describe("Long-term vision and goals for the relationship")
    .optional(),
});

// Enhanced abuse detection with comprehensive patterns and quotes
export const abuseDetectionSchema = z.object({
  isAbusive: z
    .boolean()
    .describe("Whether the reflection indicates abusive behavior")
    .optional(),
  isAtImmediateRisk: z
    .boolean()
    .describe("Whether the user is at immediate risk")
    .optional(),
  detectedAbusiveBehaviors: z
    .array(
      z.object({
        type: z
          .enum([
            "physical",
            "emotional",
            "sexual",
            "financial",
            "mental",
            "digital",
            "social",
            "psychological",
            "verbal",
          ])
          .describe("Category of abusive behavior detected")
          .optional(),
        behavior: z
          .enum([
            // Physical abuse
            "hitting",
            "pushing",
            "slapping",
            "kicking",
            "choking",
            "throwing_objects",
            "physical_intimidation",
            // Emotional abuse
            "gaslighting",
            "silent_treatment",
            "emotional_manipulation",
            "guilt_tripping",
            "emotional_blackmail",
            "constant_criticism",
            "belittling",
            "humiliation",
            "threats",
            "intimidation",
            "isolation",
            "controlling_behavior",
            "jealousy_abuse",
            "love_bombing",
            "devaluation",
            "stonewalling",
            // Sexual abuse
            "sexual_coercion",
            "sexual_manipulation",
            "unwanted_sexual_contact",
            "sexual_threats",
            // Financial abuse
            "financial_control",
            "economic_abuse",
            "withholding_money",
            "sabotaging_work",
            // Mental/Psychological abuse
            "mind_games",
            "psychological_manipulation",
            "brainwashing",
            "psychological_torture",
            // Digital abuse
            "cyberstalking",
            "digital_monitoring",
            "revenge_porn",
            "online_harassment",
            // Social abuse
            "social_isolation",
            "reputation_damage",
            "social_manipulation",
            "alienation",
            // Verbal abuse
            "yelling",
            "name_calling",
            "verbal_threats",
            "constant_criticism",
            "screaming",
            "insults",
            "degrading_comments",
            "verbal_intimidation",
            "shouting",
          ])
          .describe("Specific abusive behavior detected")
          .optional(),
        quote: z
          .string()
          .describe(
            "Specific quote from the reflection that demonstrates this abusive behavior"
          )
          .optional(),
        impact: z
          .string()
          .describe("How this abusive behavior affects the victim")
          .optional(),
        reasonings: z
          .array(z.string())
          .describe("Why this behavior is considered abusive")
          .optional(),
        startIndex: z
          .number()
          .describe("Character index where quote starts")
          .optional(),
        endIndex: z
          .number()
          .describe("Character index where quote ends")
          .optional(),
      })
    )
    .describe("The detected abusive behaviors with specific evidence")
    .optional(),
  abuseTriggers: z
    .array(z.string())
    .describe("The triggers or situations that lead to abusive behavior")
    .optional(),
  warningSigns: z
    .array(z.string())
    .describe("Additional warning signs or red flags present")
    .optional(),
  suggestedActionsToTake: z
    .array(z.string())
    .describe("The suggested actions to take for safety")
    .optional(),
});

// Attachment patterns analysis
export const attachmentPatternsSchema = z.object({
  yourAttachmentStyle: z
    .enum(["secure", "anxious", "avoidant", "disorganized"])
    .describe("Your attachment style evident in this interaction")
    .optional(),
  theirAttachmentStyle: z
    .enum(["secure", "anxious", "avoidant", "disorganized"])
    .describe("Their apparent attachment style")
    .optional(),
  attachmentTriggered: z
    .boolean()
    .describe("Did attachment issues surface during this interaction?")
    .optional(),
  detectedPatterns: z
    .array(
      z.object({
        pattern: z
          .enum([
            // Secure attachment behaviors
            "secure_communication",
            "healthy_boundaries",
            "emotional_regulation",
            "trust_and_intimacy",
            "conflict_resolution",
            "self_soothing",
            "mutual_support",

            // Anxious attachment behaviors
            "clinginess",
            "fear_of_abandonment",
            "hypervigilance",
            "emotional_dysregulation",
            "seeking_reassurance",
            "protest_behaviors",
            "merging_identity",
            "jealousy_and_possessiveness",

            // Avoidant attachment behaviors
            "emotional_distance",
            "self_reliance",
            "dismissing_emotions",
            "commitment_phobia",
            "stonewalling",
            "deactivating_strategies",
            "workaholism",
            "casual_relationships",

            // Disorganized attachment behaviors
            "contradictory_behaviors",
            "fear_of_intimacy",
            "unpredictable_reactions",
            "trauma_responses",
            "dissociation",
            "chaotic_relationships",
            "identity_confusion",
            "hypervigilance_and_shutdown",

            // General attachment behaviors
            "projection",
            "idealization_and_devaluation",
            "splitting",
            "codependency",
            "enmeshment",
            "emotional_unavailability",
            "control_issues",
            "manipulation",
          ])
          .describe("Specific attachment pattern detected")
          .optional(),
        quote: z
          .string()
          .describe(
            "Specific quote from the reflection that demonstrates this attachment pattern"
          )
          .optional(),
        impact: z
          .string()
          .describe(
            "How this attachment pattern affects the relationship or situation"
          )
          .optional(),
        severity: z
          .enum(["mild", "moderate", "severe", "extreme"])
          .describe("Severity level of the attachment pattern")
          .optional(),
        who_exhibited: z
          .enum(["you", "them", "both"])
          .describe("Who exhibited this attachment pattern")
          .optional(),
        startIndex: z
          .number()
          .describe("Character index where quote starts")
          .optional(),
        endIndex: z
          .number()
          .describe("Character index where quote ends")
          .optional(),
      })
    )
    .describe("Specific attachment patterns detected with evidence")
    .optional(),
});

// Trauma responses analysis
// Comprehensive trauma response analysis - detailed trauma assessment and healing guidance
export const traumaResponsesSchema = z.object({
  // Detected trauma response patterns
  detectedPatterns: z
    .array(
      z.object({
        pattern: z
          .enum([
            // Primary trauma responses
            "fight_response",
            "flight_response",
            "freeze_response",
            "fawn_response",

            // Complex trauma responses
            "dissociation",
            "hypervigilance",
            "emotional_flashback",
            "trauma_reenactment",
            "trauma_bonding",

            // Physical trauma responses
            "somatic_symptoms",
            "sleep_disturbances",
            "appetite_changes",
            "energy_fluctuations",

            // Cognitive trauma responses
            "memory_fragmentation",
            "concentration_issues",
            "intrusive_thoughts",
            "cognitive_distortions",

            // Emotional trauma responses
            "emotional_numbing",
            "emotional_overwhelm",
            "emotional_dysregulation",
            "shame_and_guilt",

            // Behavioral trauma responses
            "avoidance_behaviors",
            "compulsive_behaviors",
            "self_harm_behaviors",
            "substance_use",

            // Relational trauma responses
            "attachment_disruption",
            "trust_issues",
            "boundary_confusion",
            "codependency_patterns",

            // Recovery and healing patterns
            "trauma_processing",
            "resilience_building",
            "post_traumatic_growth",
            "healing_relationships",
          ])
          .describe("Specific trauma response pattern detected")
          .optional(),
        quote: z
          .string()
          .describe(
            "Specific quote from the reflection that demonstrates this trauma response"
          )
          .optional(),
        impact: z
          .string()
          .describe(
            "How this trauma response affects the individual and relationships"
          )
          .optional(),
        severity: z
          .enum(["mild", "moderate", "severe", "extreme"])
          .describe("Severity level of the trauma response")
          .optional(),
        who_exhibited: z
          .enum(["you", "them", "both"])
          .describe("Who exhibited this trauma response")
          .optional(),
        trigger: z
          .string()
          .describe("What triggered this trauma response")
          .optional(),
        copingStrategy: z
          .string()
          .describe("Current coping strategy being used")
          .optional(),
        suggestedHealing: z
          .string()
          .describe("Recommended healing approach for this trauma response")
          .optional(),
        startIndex: z
          .number()
          .describe("Character index where quote starts")
          .optional(),
        endIndex: z
          .number()
          .describe("Character index where quote ends")
          .optional(),
      })
    )
    .describe("Specific trauma response patterns detected with evidence")
    .optional(),

  // Primary trauma responses
  yourPrimaryResponse: z
    .enum(["fight", "flight", "freeze", "fawn", "mixed", "none"])
    .describe("Your primary trauma response pattern")
    .optional(),
  theirPrimaryResponse: z
    .enum(["fight", "flight", "freeze", "fawn", "mixed", "none", "unknown"])
    .describe("Their apparent primary trauma response pattern")
    .optional(),

  // Trauma triggers identified
  traumaTriggers: z
    .array(z.string())
    .describe("Specific triggers that activated trauma responses")
    .optional(),

  // Coping strategies assessment
  healthyCopingUsed: z
    .array(z.string())
    .describe("Healthy coping strategies that were employed")
    .optional(),
  unhealthyCopingUsed: z
    .array(z.string())
    .describe("Unhealthy coping strategies that were used")
    .optional(),

  // Evidence and insights
  healingRecommendations: z
    .array(z.string())
    .describe("Specific recommendations for trauma healing")
    .optional(),
});

// Comprehensive connection patterns analysis - detailed intimacy and bonding assessment
export const connectionPatternsSchema = z.object({
  // Detected connection patterns
  detectedPatterns: z
    .array(
      z.object({
        pattern: z
          .enum([
            // Love languages
            "words_of_affirmation",
            "quality_time",
            "physical_touch",
            "acts_of_service",
            "gifts",

            // Connection attempts
            "active_listening",
            "vulnerability_sharing",
            "physical_affection",
            "shared_activities",
            "emotional_support",
            "humor_sharing",
            "future_planning",
            "appreciation_expressing",

            // Connection barriers
            "emotional_withdrawal",
            "communication_shutdown",
            "physical_distance",
            "criticism_patterns",
            "defensiveness",
            "stonewalling",
            "busy_schedules",
            "external_distractions",

            // Intimacy types
            "emotional_intimacy",
            "physical_intimacy",
            "intellectual_intimacy",
            "spiritual_intimacy",
            "creative_intimacy",
            "playful_intimacy",
            "supportive_intimacy",
            "adventurous_intimacy",
          ])
          .describe("Specific connection pattern detected")
          .optional(),
        quote: z
          .string()
          .describe(
            "Specific quote from the reflection that demonstrates this connection pattern"
          )
          .optional(),
        impact: z
          .string()
          .describe("How this connection pattern affects the relationship")
          .optional(),
        severity: z
          .enum(["mild", "moderate", "severe", "extreme"])
          .describe("Severity level of the connection pattern")
          .optional(),
        who_exhibited: z
          .enum(["you", "them", "both"])
          .describe("Who exhibited this connection pattern")
          .optional(),
        effectiveness: z
          .enum([
            "very_effective",
            "somewhat_effective",
            "ineffective",
            "harmful",
          ])
          .describe("Effectiveness of this connection pattern")
          .optional(),
        improvement: z
          .string()
          .describe("How to improve this connection pattern")
          .optional(),
        startIndex: z
          .number()
          .describe("Character index where quote starts")
          .optional(),
        endIndex: z
          .number()
          .describe("Character index where quote ends")
          .optional(),
      })
    )
    .describe("Specific connection patterns detected with evidence")
    .optional(),

  // Love languages assessment
  loveLanguagesExpressed: z
    .array(
      z.enum([
        "words_of_affirmation",
        "quality_time",
        "physical_touch",
        "acts_of_service",
        "gifts",
      ])
    )
    .describe("Love languages that were expressed or attempted")
    .optional(),

  // Connection attempts analysis
  connectionAttempts: z
    .array(z.string())
    .describe("Ways either person tried to connect")
    .optional(),

  // Connection barriers analysis
  connectionBarriers: z
    .array(z.string())
    .describe("What prevented or hindered connection")
    .optional(),

  // Evidence and insights
  connectionInsights: z
    .array(z.string())
    .describe("Key insights about connection patterns and intimacy")
    .optional(),
  connectionRecommendations: z
    .array(z.string())
    .describe("Recommendations for improving connection and intimacy")
    .optional(),
});

// Cognitive patterns analysis
export const cognitivePatternsSchema = z.object({
  thinkingTraps: z
    .array(
      z.object({
        trap: z
          .enum([
            "mind_reading",
            "fortune_telling",
            "overgeneralization",
            "catastrophizing",
            "black_and_white",
            "personalization",
            "filtering",
            "jumping_to_conclusions",
            "control_fallacies",
            "blaming",
            "always_being_right",
            "emotional_reasoning",
            "fallacy_of_fairness",
          ])
          .optional(),
        explanation: z
          .string()
          .describe("How this thinking trap manifests in the reflection")
          .optional(),
        quote: z
          .string()
          .describe(
            "Specific quote from the reflection that demonstrates this trap"
          )
          .optional(),
        impact: z
          .string()
          .describe(
            "How this thinking trap affects the relationship or situation"
          )
          .optional(),
        startIndex: z
          .number()
          .describe("Character index where quote starts")
          .optional(),
        endIndex: z
          .number()
          .describe("Character index where quote ends")
          .optional(),
      })
    )
    .describe(
      "Cognitive distortions or thinking traps identified with explanations"
    )
    .optional(),
  assumptionsMade: z
    .array(z.string())
    .describe("Assumptions made by either party")
    .optional(),
  perspectiveTaking: z
    .enum(["excellent", "good", "limited", "poor"])
    .describe("Ability to see the other person's perspective")
    .optional(),
  emotionalReasoning: z
    .boolean()
    .describe(
      "Was decision-making overly influenced by emotions rather than facts?"
    )
    .optional(),
});

// Enhanced comprehensive analysis schema
export const analysisSchema = z.object({
  // Core analysis components
  emotionalPatterns: emotionalPatternSchema.optional(),
  communicationPatterns: communicationPatternSchema.optional(),
  behaviorPatterns: behaviorPatternSchema.optional(),
  relationshipDynamics: relationshipDynamicsSchema.optional(),
  contextFactors: contextFactorsSchema.optional(),
  actionableInsights: actionableInsightsSchema.optional(),

  // Advanced psychological patterns
  attachmentPatterns: attachmentPatternsSchema.optional(),
  traumaResponses: traumaResponsesSchema.optional(),
  connectionPatterns: connectionPatternsSchema.optional(),
  cognitivePatterns: cognitivePatternsSchema.optional(),

  // Safety first - keep abuse detection
  abuseDetection: abuseDetectionSchema.optional(),

  // Meta analysis
  overallAssessment: z
    .object({
      healthScore: z
        .number()
        .min(1)
        .max(10)
        .describe("Overall relationship health score")
        .optional(),
      confidenceLevel: z
        .enum(["high", "medium", "low"])
        .describe("AI confidence in this analysis")
        .optional(),
      summary: z
        .string()
        .describe(
          "A comprehensive 2-3 sentence summary of the relationship analysis"
        )
        .optional(),
      keyInsights: z
        .array(z.string())
        .describe("Top 3-5 key insights from this reflection")
        .optional(),
      warningFlags: z
        .array(z.string())
        .describe("Any warning flags to monitor")
        .optional(),
      positiveHighlights: z
        .array(z.string())
        .describe("Positive aspects to celebrate")
        .optional(),
    })
    .optional(),
});

export type Analysis = z.infer<typeof analysisSchema>;
export type EmotionalPattern = z.infer<typeof emotionalPatternSchema>;
export type CommunicationPattern = z.infer<typeof communicationPatternSchema>;
export type BehaviorPattern = z.infer<typeof behaviorPatternSchema>;
export type RelationshipDynamics = z.infer<typeof relationshipDynamicsSchema>;
export type ContextFactors = z.infer<typeof contextFactorsSchema>;
export type ActionableInsights = z.infer<typeof actionableInsightsSchema>;
export type AttachmentPatterns = z.infer<typeof attachmentPatternsSchema>;
export type TraumaResponses = z.infer<typeof traumaResponsesSchema>;
export type ConnectionPatterns = z.infer<typeof connectionPatternsSchema>;
export type CognitivePatterns = z.infer<typeof cognitivePatternsSchema>;
export type AbuseDetection = z.infer<typeof abuseDetectionSchema>;
