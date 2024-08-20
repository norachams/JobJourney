import os
from flask import Flask, jsonify
from flask_cors import CORS
import get_messages
import Classify_cohere

# Initialize Flask app
app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "JobJourney Backend API"

@app.route('/tracker', methods=['GET'])
def get_classifications():
    # Fetch emails and classify them
    try:
        # Fetch and classify emails
        service = get_messages.get_service()
        user_id = 'me'
        search_string = 'subject:Thank you'  # Adjust the search string as needed
        email_ids = get_messages.search_message(service, user_id, search_string)
        emails = []
        for email_id in email_ids:
            email_data = get_messages.get_messages(service, user_id, email_id)
            if email_data:
                emails.append(email_data)
        
        classifications = Classify_cohere.classify_emails(emails)
        return jsonify(classifications)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))

