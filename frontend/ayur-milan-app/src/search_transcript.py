import json

with open('C:/Users/Aksha/.gemini/antigravity/brain/9c6aed25-1192-4b85-a617-0534b99add2c/.system_generated/logs/transcript.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        try:
            step = json.loads(line)
            content = step.get('content', '')
            # If the step has tool calls, print them
            tcalls = step.get('tool_calls', [])
            
            # Look for user inputs or mentions of hero/home
            if step.get('source') == 'USER_EXPLICIT':
                print(f"USER: {content}")
            elif 'hero_bg' in content or 'abstract_edu_bg' in content or 'Home.jsx' in str(tcalls):
                print(f"STEP {step.get('step_index')} ({step.get('type')}): {content[:200]}")
        except Exception as e:
            pass
