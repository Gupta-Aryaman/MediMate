import torch
from langchain import PromptTemplate
from langchain.chains import RetrievalQA
from langchain.document_loaders import PyPDFDirectoryLoader
from langchain.embeddings import HuggingFaceInstructEmbeddings, HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from transformers import AutoTokenizer, TextStreamer, pipeline
from langchain import FAISS
from huggingface_hub import hf_hub_download
from langchain.llms import LlamaCpp
from langchain.memory import ConversationBufferMemory
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler

DEVICE = "cuda:0" if torch.cuda.is_available() else "cpu"

embeddings = HuggingFaceInstructEmbeddings(
    model_name = "hkunlp/instructor-xl", model_kwargs = {"device": DEVICE}
)

model_path = hf_hub_download(
  repo_id="TheBloke/Llama-2-70B-chat-GGUF",
  filename="llama-2-70b-chat.Q4_K_M.gguf",
  resume_download=True,
  cache_dir="./models/",  #custom path for save the model
)

model = LlamaCpp(
        model_path = model_path,
        n_gpu_layers=100, #According to your GPU if you have
        n_batch=2048,
        verbose=True,
        f16_kv=True,
        n_ctx=4096,
        max_tokens=1024,
        callbacks=[StreamingStdOutCallbackHandler()]
    )

DEFAULT_SYSTEM_PROMPT = """
You are a helpful, respectful, honest and knowledgable health assistant. Always answer as highly as possible, trying to give medical diagnosis based on the symptoms provided by the patients. Your answers
should not include racist, sexist, harmful or unethical answers.
If a question does not make sense, or it is factually coherent, explain why instead of answering something incorrect. If you don't know answer to some question, please don't try to make up an answer, instead just say that
I don't know.
""".strip()

def generate_prompt(prompt: str, system_prompt: str = DEFAULT_SYSTEM_PROMPT) -> str:
  return f"""
  [INST] <<SYS>>
  {system_prompt}
  <</SYS>>

  {prompt} [/INST]
  """.strip()


SYSTEM_PROMPT = """
You are a helpful, respectful, honest and knowledgeable health assistant. Use the following pieces of information, the context (delimited by <ctx></ctx>) and the chat history (delimited by <hs></hs>) to answer the questions. 
Always answer as highly as possible, trying to give medical diagnosis based on the symptoms provided by the patients. 
Your answers should not include racist, sexist, harmful or unethical answers.
If a question does not make sense, or it is factually coherent, explain why instead of answering something incorrect. 
If you don't know answer to some question, please don't try to make up an answer, instead just say that I don't know. Don't tell about yourself again and again.
Don't give the context (delimited by <ctx></ctx>) in the answer.
"""

template = generate_prompt(
    """
    ------
    <ctx>
    {context}
    </ctx>
    ------
    <hs>
    {history}
    </hs>
    ------

    Question: {question}
    """,
    system_prompt = SYSTEM_PROMPT
)

prompt = PromptTemplate(template = template, input_variables = ["history", "context", "question"])

db = FAISS.load_local('./vectorstores/db_faiss/', embeddings)

qa_chain = RetrievalQA.from_chain_type(
        llm = model,
        chain_type = "stuff",
        retriever = db.as_retriever(search_kwargs = {'k': 2}),
        return_source_documents = True, #explaining the answer
        chain_type_kwargs= {
            "verbose": True,
            "prompt": prompt,
            "memory": ConversationBufferMemory(
                memory_key="history",
                input_key="question"),
            
        },
    )


from flask import Flask, request, json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/chat')
def chat_func():
    query = request.args.get('query')
    res = qa_chain(query)
    print(res["source_documents"])
    answer = {}
    answer["response"] = res["result"]
    return json.dumps(answer)

@app.route('/awake')
def awake():
    return "hello"


@app.route('/clear_memory')
def clear_mem():
    global qa_chain
    # qa_chain.memory = ConversationBufferMemory(memory_key="history", input_key="question")
    qa_chain.combine_documents_chain.memory = ConversationBufferMemory(
                memory_key="history",
                input_key="question")
    return "Done"

app.run(host='0.0.0.0', port=5000)