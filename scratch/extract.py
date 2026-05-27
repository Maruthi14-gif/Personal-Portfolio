import re

filepath = r"C:\Users\palya\.gemini\antigravity\brain\0c85f2e4-5d2b-4075-9a35-f21cca2180f7\.system_generated\steps\80\content.md"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Let's find the section with id="process"
# Usually, a section tag starts with <section ... id="process" ...> and ends with </section>
# But because it could contain nested sections, let's find the position of id="process"
index = content.find('id="process"')
if index == -1:
    print("id='process' not found!")
else:
    # Print 20000 characters around the ID to see its details
    start = max(0, index - 500)
    end = min(len(content), index + 40000)
    snippet = content[start:end]
    
    with open("process_snippet.txt", "w", encoding="utf-8") as out:
        out.write(snippet)
    print("Found process section! Snippet written to process_snippet.txt")
