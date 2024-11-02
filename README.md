# MediMate: AI-powered Medical Chatbot for Prescribing Medications and Treatment Plans

MediMate is a cutting-edge AI-powered medical chatbot designed to offer personalized medical diagnoses and treatment plans. Built on Node.js, it leverages advanced machine learning models, including Large Language Models (LLMs) and vector embeddings, to provide accurate and tailored healthcare advice based on individual medical history. The system ensures that users have timely access to relevant medical guidance and can reference past conversations for continuity of care.

## Our Aim

MediMate is designed to:
- Deliver personalized diagnoses based on the user's medical history.
- Generate tailored treatment plans using Explainable AI, ensuring transparency and trust.
- Store and reference previous conversations for follow-up and ongoing healthcare management.

By leveraging the power of AI, MediMate offers precise healthcare guidance that evolves with each user interaction, promoting better health outcomes through personalization and accessibility.

## System Architecture

MediMate’s architecture, based on RAG (Retrieval-Augmented Generation), consists of the following key components:

1. **Frontend**: Developed using Next.js, the user interface allows patients to interact with the chatbot and view previous conversations. The frontend is integrated with ClerkAPI for user authentication.
2. **Backend**: The Node.js backend handles requests from the frontend and interacts with the AI models to generate responses. It also routes API requests via an API Gateway and ensures the persistence of chat history.
3. **AI Models**:
   - **LLM (Large Language Model)**: A Llama-2-70B-Chat-GGML model is used for conversation generation. This model is optimized for CPU-based execution and handles context-aware responses, taking into account past interactions.
   - **Vector Embeddings**: Medical knowledge from "Harrison’s Principles of Internal Medicine" is stored as vector embeddings, which are used to search for relevant information using a vector database (FAISS).
4. **Database**: The FAISS vector database is used to store and retrieve vector embeddings, which are critical for matching user prompts with relevant medical knowledge. This ensures fast and accurate responses based on the user's query.

#### Architecture of LLM - <br>
![image](https://github.com/user-attachments/assets/98e569c8-419b-48e6-ae83-7a08259798fa) <br> <br>
#### Architecture of the application - <br>
![image](https://github.com/user-attachments/assets/31231f9a-ec7a-4c2a-abc2-db5952a3ec1e)

## Features

- **Personalized Diagnoses**: Uses vector embeddings to match symptoms with relevant medical data and provides a diagnosis.
- **Treatment Plans**: Offers tailored treatment recommendations based on diagnosis and user medical history.
- **Explainable AI**: Utilizes explainability in its AI models to ensure users understand the reasoning behind the diagnosis and treatment plans.
- **Conversation History**: All chats are saved, allowing users to refer back to previous interactions for consistent and evolving healthcare advice.
- **User Authentication**: Secure login and user management with ClerkAPI.

## Setup Guide

Follow these steps to set up MediMate on your local machine:

### Prerequisites

- **Node.js**: Ensure Node.js is installed (v14.x or higher).
- **AWS Account**: For deploying the LLM model on AWS.
- **ClerkAPI Account**: For user authentication setup.
- **Docker**: (Optional) For containerized deployment.

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Gupta-Aryaman/MediMate.git
   cd MediMate
   ```
#### Running node frontend - 
2. **Install Dependencies**
   ```bash
   cd app
   npm install
   ```

3. **Set up Environment Variables**
   - Create a `.env` file in the root directory and configure the following variables:
     ```
     CLERK_API_KEY=<Your Clerk API Key>
     AWS_ACCESS_KEY=<Your AWS Access Key>
     AWS_SECRET_KEY=<Your AWS Secret Key>
     ```

4. **Run the Application**
   ```bash
   npm run dev
   ```

5. **Deploying the LLM Model**
   - The LLM model is deployed on AWS using an API Gateway. Follow AWS deployment instructions for model deployment.

6. **Accessing the App**
   - Open your browser and navigate to `http://localhost:3000` to access the MediMate app.
  
#### Running python backend -
2. **Create a virtual environment**
  ```bash
  cd model
  python3 -m venv venv
  source venv/bin/activate   # On Windows use `venv\Scripts\activate`
  ```

3. **Install the required dependencies**
  ```bash
  pip install -r requirements.txt
  ```

4. **Run the project**
  ```bash
  python main.py
  ```
> ### We ran the Llama-2 LLM on AWS sagemaker. To access the model on local machine we used a Bastion server. You can find more details on how to implement this approach [here](https://ruslanmv.com/blog/How-to-connect-to-Sagemaker-Notebook-via-SSH)

## Testing
At the end, 2 machines were created and the results were compared for a set of questions (19) (read about it in more detail [here](https://github.com/Gupta-Aryaman/MediMate/tree/main/reports)) -  
- BLUE - (Ref- https://huggingface.co/hkunlp/instructor-large )
```
GPU Memory - 16gb
GPU 0- Tesla T4
23 Prompts
Embeddings used - hkunlp/instructor-large (variating here)
Model used - Llama 2 13B, 128 group size model - GPTQ
Database used - Faiss (constant)
```
- ORANGE-  (Ref- https://huggingface.co/hkunlp/instructor-xl )
```
CPU Memory - 192gb
CPU- Intel Xeon Platinum 8275CL (Cascade Lake)
23 Prompts
Embeddings used - hkunlp/instructor-xl (variating here)
Model used - Llama 2 13B, 128 group size model-GGUF
Database used - Faiss (constant)
```
![image](https://github.com/user-attachments/assets/e826e5bf-0ba3-462c-a2de-0f2659ec582c)

## License

This project is licensed under the [MIT License](https://github.com/Gupta-Aryaman/MediMate/blob/main/LICENSE).
