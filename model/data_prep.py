import pandas as pd
import json
import ast

# Load data from CSV
data = pd.read_csv('./dataset/training.csv')

# Load keywords and questions from JSON files
with open('./dataset/diagnosis_keywords.json', 'r') as keywords_file:
    keywords_data = json.load(keywords_file)

with open('./dataset/question_keywords.json', 'r') as questions_file:
    questions_data = json.load(questions_file)

print("DATASETS LOADED SUCCESSFULLY")

# Create a mapping of keywords to questions
keyword_to_question = {item: questions_data[item]['question_en'] for item in questions_data}

print("KEYWORDS MAPPED TO QUESTIONS SUCCESSFULLY")

# Create a mapping of keywords to diagnoses
keyword_to_diagnosis = {item: keywords_data[item]['cond-name-eng'] for item in keywords_data}

print("KEYWORDS MAPPED TO DIAGNOSES SUCCESSFULLY")
# print("KEYWORD TO DIAGNOSIS MAPPING: ", keyword_to_diagnosis)

# Initialize lists to store feature vectors and labels
feature_vectors = []
labels = []

# Process each row in the CSV file
for index, row in data.iterrows():
    # Extract values from the row
    age = row['AGE']
    sex = 1 if row['SEX'] == 'F' else 0
    initial_evidence = row['INITIAL_EVIDENCE']
    differential_diagnosis = ast.literal_eval(row['DIFFERENTIAL_DIAGNOSIS'])
 
    # Create a binary vector for evidence questions
    evidence_vector = [1 if keyword in initial_evidence else 0 for keyword in keyword_to_question.keys()]

    # Create a list of likelihood percentages
    percentages = [0.0] * len(keyword_to_diagnosis)

    for element in differential_diagnosis:
        diagnosis = element[0]
        likelihood = element[1]
        if diagnosis in keyword_to_diagnosis:
            percentages[list(keyword_to_diagnosis.keys()).index(diagnosis)] = likelihood

    # Create the feature vector
    feature_vector = [age, sex]
    feature_vector.append(evidence_vector)
    feature_vector.append(percentages)

    # Append the feature vector and label (e.g., pathology) to the lists
    feature_vectors.append(feature_vector)
    labels.append(row['PATHOLOGY'])

    

# Convert lists to a DataFrame for further processing or modeling
feature_df = pd.DataFrame(feature_vectors, columns=['AGE', 'SEX'] + list(keyword_to_question.keys()) + list(keyword_to_question.keys()))
label_df = pd.DataFrame(labels, columns=['PATHOLOGY'])

# Print or save the feature DataFrame for modeling
print(feature_df)