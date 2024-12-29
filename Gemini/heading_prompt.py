import streamlit as st
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate

import requests
import base64



def get_major_topic():
    prompt_template = """
    From the provided context, identify and extract the main topic. 
    Ensure the topic is concise and not more than 5 words.

    If the main topic cannot be determined from the context, respond with, "Main topic is not available in the context."
    Provide accurate information only.

    Context:
    {context}

    Heading:
    """    
    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)
    prompt = PromptTemplate(template=prompt_template, input_variables=["context"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    return chain


def generate_heading():
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    new_db = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
    docs = new_db.similarity_search("")
    if not docs:
        st.error("No documents found in the vector store.")
        return
    
    chain = get_major_topic()
    
    response = chain(
        {"input_documents": docs},
        return_only_outputs=True
    )
    return response["output_text"]


def get_courses(heading):
    client_id = 'QOalRSkYNyCdaSRPaZMGeasx4b50YOAxRz5JckSf'
    client_secret = 'EOegTYIwonkk98UASBXXt7mp7iicgnXeU8uOUkLswJcvNyT7jqVChQZIY5n7enrtcNrVe9v0ZkZ8hdYDqxl8cAZaTo2SV7LpF3hiHVDf12nnjaDVfxtl2w3SgbQnEuem'
    # Create a base64 encoded string for authentication
    credentials = f"{client_id}:{client_secret}"
    encoded_credentials = base64.b64encode(credentials.encode()).decode()
    url = "https://www.udemy.com/api-2.0/courses/?page_size=2&search=" + heading
    # Set the headers for the request
    headers = {
        "Authorization": f"Basic {encoded_credentials}",
        "Content-Type": "application/json"
    }
    res = requests.get(url, headers=headers)
    if res.status_code == 200:
        courses = res.json()
        for course in courses['results']:
            card(course['image_125_H'],course['title'],"https://www.udemy.com"+course['url'],course["headline"])

def card(thubmnail, title, url, context):
    return st.markdown(f"""
    <div class="container-fluid" style="padding:10px">
        <div class="row align-items-start">
            <div class="col-md-4 col-sm-4">
                 <div class="position-relative">
                     <a href={url}><img src={thubmnail} class="img-fluid" style="width: 152px; height: 96px"></a>
                 </div>
             </div>
             <div  class="col-md-8 col-sm-8">
                 <a href={url}>{title}</a>
                 <br>
                 <span style="color: #808080;">
                     <small>{context[:200].capitalize()+"...."}</small>
                 </span>
             </div>
        </div>
     </div>
        """, unsafe_allow_html=True)