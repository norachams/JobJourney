import json
import os
import cohere
from cohere import ClassifyExample
from dotenv import load_dotenv

load_dotenv()


# Load examples from JSON file
with open('examples.json', 'r') as f:
    examples_data = json.load(f)
examples = [ClassifyExample(text=example['text'], label=example['label']) for example in examples_data]

# Load inputs from JSON file
with open('inputs.json', 'r') as f:
    inputs = json.load(f)

# Initialize Cohere client
COHERE_API_KEY = os.getenv('COHERE_API_KEY')
co = cohere.Client(COHERE_API_KEY)


# Classify the inputs
response = co.classify(
    model='embed-english-v2.0',
    inputs=inputs,
    examples=examples
)

# Extract and print email ID and classification
cleaned_output = []
for classification in response.classifications:
    input_text = classification.input
    email_id = input_text.split(' ')[2]  # Extract the email ID
    subject = input_text.split('Subject: ')[1].split(' Sender: ')[0]  # Extract the subject
    prediction = classification.prediction
    cleaned_output.append({'email_id': email_id, 'subject': subject, 'classification': prediction})

# Print the cleaned output
print('Cleaned classifications:')
for item in cleaned_output:
    print(f"Email ID: {item['email_id']}, Subject: {item['subject']}, Classification: {item['classification']}")

# Optionally, save the cleaned output to a JSON file
with open('cleaned_classifications.json', 'w') as f:
    json.dump(cleaned_output, f, indent=4)
# Print the classifications
#print('The confidence levels of the labels are:{}'.format(response.classifications))
