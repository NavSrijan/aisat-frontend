// Reference Assessment Data Structure matching AISAT Mock format
export interface MockSectionItem {
  comp: string;
  tier: string;
  prompt: string;
  options?: string[];
  context?: string;
}

export interface MockSection {
  id: string;
  label: string;
  title: string;
  intro: string;
  rules: string[];
  type: 'mcq' | 'short' | 'critique';
  transcript?: string;
  items: MockSectionItem[];
}

export const AISAT_BENCHMARK_SECTIONS: MockSection[] = [
  {
    id:'A', label:'Section A · Knowledge Check', title:'Knowledge Check',
    intro:"These questions test whether the concepts from the workshop actually hold up, not whether you remember a definition. Some options will look close together on purpose.",
    rules:[
      'Pick the single best answer for each question.',
      'A few questions test what happens when a setting or approach changes, not just what a term means.',
      "If you're unsure, go with your first read rather than overthinking the wording."
    ],
    type:'mcq',
    items:[
      {comp:'Agentic AI', tier:'Developing', prompt:"An agent is given a goal and a set of tools, but no explicit step-by-step instructions. What primarily determines the sequence of actions it takes?", options:["The order the tools are listed in its configuration","The agent's own reasoning loop, deciding each next action based on the goal and prior results","A fixed script the developer writes for every possible goal","The order in which the tools were most recently used"]},
      {comp:'Agentic AI', tier:'Developing', prompt:"Which of these best distinguishes an \"agent\" from a simple LLM pipeline?", options:["An agent uses a larger underlying model than a pipeline does","An agent can decide which tool to call next based on intermediate results, a pipeline follows a fixed sequence","An agent never requires any human oversight once launched","An agent only works with structured data, a pipeline works with any input"]},
      {comp:'Agentic AI', tier:'Proficient', prompt:"An agent is looping repeatedly on the same failed tool call without making progress. What is the most likely underlying cause?", options:["The model's context window is too large for the task","The agent has no termination or retry-limit condition, so it keeps retrying on failure","The tool being called is written in the wrong programming language","The agent's temperature setting is set too low"]},
      {comp:'Agentic AI', tier:'Proficient', prompt:"When designing an agent that can take real-world actions (sending emails, modifying files), which safeguard matters most before deployment?", options:["Making sure the agent's prompts are as short as possible","Requiring human confirmation or a permission boundary before irreversible actions","Increasing the model's temperature so it explores more options","Removing all tool-use logging to reduce latency"]},
      {comp:'AI Workflow Automation', tier:'Developing', prompt:"In a multi-step automated workflow, what is the main advantage of breaking a task into discrete steps rather than one large prompt?", options:["It always makes the workflow run faster","Each step can be checked, retried, or corrected independently if something goes wrong","It reduces the total number of tokens used to zero","It removes the need for any error handling"]},
      {comp:'AI Workflow Automation', tier:'Developing', prompt:"A workflow automation tool triggers an action whenever a new row is added to a spreadsheet. What is this trigger-action pattern generally called?", options:["A batch process","An event-driven automation","A static pipeline","A manual override"]},
      {comp:'AI Workflow Automation', tier:'Proficient', prompt:"A workflow has five sequential steps. Step 3 fails intermittently. What is the most robust design choice?", options:["Remove step 3 entirely since it's unreliable","Add retry logic and a fallback path specifically around step 3, not the whole workflow","Restart the entire five-step workflow from step 1 every time step 3 fails","Run step 3 last instead of third"]},
      {comp:'AI Workflow Automation', tier:'Proficient', prompt:"Why might a workflow that worked correctly in testing fail once deployed with real data?", options:["Real data often contains edge cases and formatting the test data didn't cover","Deployed workflows always run slower than test workflows","Production environments cannot run automated workflows","The workflow logic changes automatically after deployment"]},
      {comp:'AI APIs & Integrations', tier:'Developing', prompt:"When an API call fails with a rate-limit error, what does that typically mean?", options:["The API key is invalid","Too many requests were sent in a given time window","The request body was formatted incorrectly","The server hosting the API is permanently down"]},
      {comp:'AI APIs & Integrations', tier:'Developing', prompt:"What is the primary purpose of an API key or token in most integrations?", options:["To compress the data being sent","To authenticate the request and identify who is making it","To translate the request into a different programming language","To determine which server region handles the request"]},
      {comp:'AI APIs & Integrations', tier:'Proficient', prompt:"An integration receives a malformed or unexpected response from an external API. What is the best practice?", options:["Assume the response is correct and proceed","Validate and handle the response explicitly, with a defined fallback if it's malformed","Restart the entire application","Ignore the response and retry the exact same request indefinitely"]},
      {comp:'AI APIs & Integrations', tier:'Proficient', prompt:"What does MCP (Model Context Protocol) primarily standardize?", options:["The pricing structure across different AI model providers","How an AI model connects to and uses external tools and data sources","The programming language used to train large language models","The visual interface for chat-based AI applications"]},
      {comp:'AI Literacy', tier:'Developing', prompt:"Why can a large language model state an incorrect fact with the same confident tone as a correct one?", options:["It intentionally hides uncertainty from users","It generates the most statistically likely next words, which doesn't guarantee factual accuracy","It only makes mistakes on topics after its training cutoff","Confidence in tone is a setting the user must manually enable"]},
      {comp:'AI Literacy', tier:'Proficient', prompt:"What does a model's \"context window\" refer to?", options:["The visual size of the chat interface","The amount of text the model can consider at once when generating a response","The time period the model was trained on","The number of tools the model can call in one turn"]},
      {comp:'Prompt Engineering', tier:'Developing', prompt:"Which prompt is most likely to produce a consistent, usable output on the first try?", options:["\"Write something about our project\"","\"Summarize this report in 3 bullet points, under 20 words each, for a non-technical manager\"","\"Can you help with this document please\"","\"Make this better\""]},
      {comp:'Prompt Engineering', tier:'Proficient', prompt:"A prompt keeps producing outputs that are technically correct but in the wrong format for downstream use. What's the most effective fix?", options:["Increase the model's temperature setting","Explicitly specify the required output format and structure in the prompt itself","Repeat the same prompt multiple times until it works","Switch to a different, unrelated task"]},
      {comp:'AI Research & Info Retrieval', tier:'Developing', prompt:"An AI assistant cites a statistic without a source. What is the appropriate next step?", options:["Use it as given, since the AI generated it","Trace it back to a verifiable original source before relying on it","Assume it's correct if it sounds plausible","Rephrase it in your own words to avoid needing a source"]},
      {comp:'AI Research & Info Retrieval', tier:'Proficient', prompt:"When would a deep-research or multi-source tool mode be necessary instead of a single prompt?", options:["When the answer requires synthesizing and cross-checking many current sources, not just one","When the task is purely creative writing with no factual claims","Never, a single well-written prompt is always sufficient","Only when the user has no internet access"]},
      {comp:'Responsible AI', tier:'Developing', prompt:"An AI coding assistant is given access to a production database to \"help debug faster.\" What is the main risk?", options:["The assistant will run slower with more access","It may take unintended or destructive actions beyond what's actually needed for debugging","Production databases cannot be accessed by AI tools at all","The assistant will refuse the task automatically"]},
      {comp:'Responsible AI', tier:'Proficient', prompt:"Why is granting an AI agent the minimum necessary permissions (rather than broad access) considered good practice?", options:["It makes the agent respond faster","It limits the damage if the agent makes an error or is misused","It is required by every AI provider's terms of service","It has no real effect on safety, only on cost"]},
      {comp:'AI Evaluation & Critical Judgement', tier:'Developing', prompt:"An AI agent reports that a multi-step task \"completed successfully.\" Should this be trusted without verification?", options:["Yes, agents only report success when every step genuinely succeeded","Not necessarily, intermediate steps can fail silently even when the final report says success","Yes, but only for tasks involving text generation","No AI agent can ever report success accurately"]},
      {comp:'AI Evaluation & Critical Judgement', tier:'Proficient', prompt:"Which is the strongest signal that AI-generated output needs closer scrutiny before use?", options:["The output is longer than expected","The output makes a specific, checkable factual or numerical claim","The output took longer than usual to generate","The output uses formal language"]},
      {comp:'AI Communication', tier:'Developing', prompt:"When using AI to draft a professional email, what should the user still do before sending it?", options:["Nothing, well-formatted AI output is ready to send as-is","Review it for tone, accuracy, and appropriateness to the actual recipient","Only check the spelling","Make it longer to sound more thorough"]},
      {comp:'AI Content Creation', tier:'Developing', prompt:"An AI tool generates a graphic for a presentation. What is the most important thing to check before using it?", options:["That it matches the intended message and brand context, not just that it looks polished","That it was generated in under 10 seconds","That it uses as many colors as possible","That the AI tool used is the newest version available"]},
      {comp:'AI Productivity & Knowledge Mgmt', tier:'Developing', prompt:"What is the main benefit of using AI to organize and summarize notes across multiple documents?", options:["It permanently deletes the original documents","It can surface patterns and connections faster than manual review, though it should still be checked","It guarantees zero factual errors","It replaces the need to read source documents ever again"]},
      {comp:'Data Analysis & Decision Support', tier:'Developing', prompt:"An AI tool analyzes a dataset and recommends a decision. What should happen before acting on that recommendation?", options:["Act on it immediately since AI analysis is objective","Sanity-check the underlying data and reasoning, since AI can misread patterns or outliers","Ignore it entirely, AI should never be used for data analysis","Only check the recommendation if the dataset is very large"]}
    ]
  },
  {
    id:'B', label:'Section B · Scenario Judgment', title:'Scenario Judgment',
    intro:"Each scenario is a realistic situation, not a trivia question. There's rarely a purely 'correct' answer here — pick the response that reflects the soundest judgment call.",
    rules:[
      "Read the situation fully before picking an option.",
      "Think about what a careful practitioner would actually do, not what sounds most cautious on paper.",
      "These carry real weight toward your Evaluation and Responsible-Use scores."
    ],
    type:'mcq',
    items:[
      {comp:'AI Evaluation & Critical Judgement', tier:'Trust-calibration', prompt:"You built an agent to process 50 customer records and update a CRM. It reports \"all 50 records updated successfully.\" What is the most appropriate next step?", options:["Move on, the agent's report is sufficient confirmation","Spot-check a sample of the records directly in the CRM to confirm the updates are correct","Re-run the entire agent from scratch just to be safe","Ask the agent to repeat its report in different words"]},
      {comp:'AI Workflow Automation', tier:'Trade-off', prompt:"You're automating a workflow that must run reliably every day versus one that can tolerate occasional manual review. Which approach fits a task where a wrong output could cause real financial harm (e.g., auto-approving refunds)?", options:["Fully automate with no human checkpoint, to maximize speed","Automate the analysis but require human sign-off before the irreversible action executes","Avoid automation entirely and do the task manually forever","Automate it and check results once a month"]},
      {comp:'Agentic AI', tier:'Debugging', prompt:"An agent meant to research and summarize competitor pricing keeps returning outdated information. Tool access looks correctly configured. What's the most likely root cause to investigate first?", options:["The agent's summarization style is too concise","The agent may be relying on the model's training data instead of actually calling its search/retrieval tool","The competitor's pricing page uses too many images","The agent needs a longer system prompt"]},
      {comp:'Responsible AI', tier:'Permission scope', prompt:"A team wants to give their support agent access to a tool that can issue account refunds automatically, to \"save time.\" What's the most responsible design?", options:["Grant full refund authority immediately, since it saves the most time","Have the agent draft the refund for human approval below a set threshold, and require approval above it","Never allow the agent to touch refunds under any circumstance","Grant access but disable all logging so it runs faster"]},
      {comp:'AI APIs & Integrations', tier:'Design-judgment', prompt:"A team wants to connect an internal tool to an AI assistant so it can pull live inventory data. Before building a custom integration, what should they check first?", options:["Whether an existing, well-supported connector or MCP server already covers this need","Whether the AI model itself has memorized their inventory numbers","Whether the task can be done without any data at all","Whether the integration will look impressive in a demo"]}
    ]
  },
  {
    id:'C', label:'Section C · Code Review', title:'Code Review',
    intro:"These are short written answers, not multiple choice. We're checking whether you can spot what's wrong in a real RAG setup and explain the fix in your own words.",
    rules:[
      "A blank or 'N/A' answer carries no penalty if you genuinely don't know — guessing incorrectly is treated the same as leaving it blank.",
      "Two to three sentences is enough. We're looking for the right diagnosis, not a long answer.",
      "These stay at the RAG/LLM concept level — no agent-wiring code involved."
    ],
    type:'short',
    items:[
      {comp:'AI Evaluation & Critical Judgement', tier:'RAG chunking', context:"A RAG pipeline splits documents into 2,000-token chunks with no overlap before embedding them. A user asks a question whose answer spans the boundary between two chunks, and the system fails to retrieve it correctly.", prompt:"What's likely wrong with this chunking setup, and what would you change?"},
      {comp:'AI Research & Info Retrieval', tier:'Embedding mismatch', context:"A team builds a RAG system where documents are embedded using one embedding model, but user queries at inference time are embedded using a different, unrelated embedding model.", prompt:"Why would this cause poor retrieval results, and what's the fix?"}
    ]
  },
  {
    id:'D', label:'Section D · Workflow Critique', title:'Workflow Critique',
    intro:"Below is a real execution log from an agent handling a supplier update task. Something in it went wrong. The same transcript stays visible for all four questions in this section.",
    rules:[
      "Read the transcript carefully — the flaw isn't in what the agent says, it's in what it didn't check.",
      "Take your time on the first question; the next three build directly on your diagnosis.",
      "Short written answers, same no-penalty rule as the code review section."
    ],
    type:'critique',
    transcript:`[Agent] Goal: Read latest supplier email, extract new pricing, update spreadsheet.
[Tool Call 1] read_email(folder="Suppliers", limit=1) → returned email from "supplier-updates@vendor-mail.co"
[Agent] Extracted: Item A: ₹450, Item B: ₹1,200, Item C: ₹80
[Tool Call 2] update_spreadsheet(sheet="Pricing", rows=[A,B,C]) → success
[Agent] Task completed successfully. Spreadsheet updated with 3 new prices.

Note: the known supplier domain is "vendor-mail.com" — the email above came from a lookalike
domain, and the agent had permission to write directly to the live pricing sheet with no review step.`,
    items:[
      {comp:'Workflow Readiness', tier:'Diagnosis', prompt:"What went wrong in this execution? Identify the flaw."},
      {comp:'Workflow Readiness', tier:'Location', prompt:"At which specific step did the flaw occur, and why would it be easy to miss just by reading the agent's final report?"},
      {comp:'Workflow Readiness', tier:'Correction', prompt:"What should the agent have done differently at that step?"},
      {comp:'Workflow Readiness', tier:'Systemic fix', prompt:"What systemic safeguard, not a one-off fix, would prevent this type of failure from recurring across future runs?"}
    ]
  },
  {
    id:'E', label:'Section E · Tool Depth', title:'Tool Depth',
    intro:"These are tailored to the tool categories you rated yourself highest on earlier. They test the difference between having used a tool and actually knowing where it breaks.",
    rules:[
      "These aren't about which tool is 'better' — they test whether you know a feature or limitation exists.",
      "If a question is about a tool you haven't used much, answer based on what you'd expect a careful user to do.",
      "This is the last section."
    ],
    type:'mcq',
    items:[
      {comp:'General AI Assistants', tier:'Feature-awareness', prompt:"You need to analyze 40 pages across 6 documents and produce a synthesized comparison. Which approach is most appropriate?", options:["Paste all 6 documents into a single prompt and ask for a summary","Use the assistant's dedicated multi-document or deep-research mode designed for cross-source synthesis","Summarize each document in a separate, unrelated conversation","Ask the assistant to guess the content without uploading anything"]},
      {comp:'Coding & Technical Development', tier:'Known-limitation', prompt:"An AI coding assistant confidently suggests a library function that doesn't actually exist in the library's current version. What is this failure mode generally called, and what should a developer do before using suggested code?", options:["This is called \"rate limiting\" — restart the tool and try again","This is a hallucination — verify the function exists in the actual library documentation before using it","This means the library is broken — switch to a different library entirely","This only happens with very old libraries, so no verification is needed for current ones"]},
      {comp:'AI Agents & Digital Workers', tier:'Best-practice usage', prompt:"You're setting up an agent to handle a recurring task with real consequences (e.g., customer communication). What's the best-practice way to use the platform's advanced features here, beyond just giving it a goal and letting it run?", options:["Give it the broadest possible tool access so it never gets stuck","Configure explicit guardrails, permission scopes, and logging/review checkpoints appropriate to the task's risk","Disable all logging to keep the agent running faster","Avoid using any advanced configuration, since defaults are always safest"]}
    ]
  }
];
