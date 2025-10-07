from flask import Flask, render_template, request, jsonify
from google import genai

app = Flask(__name__)

# Google GenAI client
client = genai.Client(api_key='AIzaSyDtYLQcJaHmZNJZlEQdXK5NCUeG_BVSiRQ')  # <-- your key
model_name = 'models/gemini-2.0-flash'

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    if not user_message:
        return jsonify({'response': "Please type something."})

    try:
        prompt = f"You are a friendly AI tutor (like a bro) who explains things simply and clearly. " \
         f"Whenever a student asks a question, explain it in simple, short sentences, as if you’re talking to your friend. " \
         f"Be casual and friendly (like saying 'bro', 'mava', etc.), but still correct and clear.\n\n" \
         f"Student: {user_message}\n" \
         f"Your friendly explanation:"

        response = client.models.generate_content(
        model=model_name,
        contents=prompt
        )

        answer = response.text
    except Exception as e:
        answer = "Error: " + str(e)

    return jsonify({'response': answer})

if __name__ == '__main__':
    app.run(debug=True)
