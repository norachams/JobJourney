import json
import cohere
from cohere import ClassifyExample

# Load examples from JSON file
with open('examples.json', 'r') as f:
    examples_data = json.load(f)
examples = [ClassifyExample(text=example['text'], label=example['label']) for example in examples_data]

# Load inputs from JSON file
with open('inputs.json', 'r') as f:
    inputs = json.load(f)

# Initialize Cohere client
co = cohere.Client('h9Yx8Ps7atmmWiGydAZ9TNNMgnWyVzo45vddaF2x')

# Classify the inputs
response = co.classify(
    model='embed-english-v2.0',
    inputs=inputs,
    examples=examples
)

# Print the classifications
print('The confidence levels of the labels are:{}'.format(response.classifications))
