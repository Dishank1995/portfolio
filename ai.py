from openai import OpenAI
import os

client = OpenAI(api_key="your-api-key")

def create_file(filename, content):
    with open(filename, "w") as f:
        f.write(content)

def ai_generate(prompt):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role":"user","content":prompt}]
    )
    return response.choices[0].message.content

# Example usage
code = ai_generate("Create a simple React app homepage")

create_file("app.js", code)
