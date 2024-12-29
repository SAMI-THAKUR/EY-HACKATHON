import streamlit as st
import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import google.generativeai as genai
from langchain.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
import json
from youtubesearchpython import VideosSearch



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


def get_academic_roadmap_chain():
    prompt_template = """
You are an expert academic advisor. Based on the provided context, generate a detailed academic roadmap for the specified time span. The roadmap should include topics to be covered in a single lecture consider a single lecture to be of a single hour.

### Important Instructions:
- Ensure that all topics are academic in nature. Do **not** include review or practice sessions.
- Respond **only** with a valid JSON string.
- Do not add any formating other than JSON
- The JSON should be structured strictly as shown below:
    "Prerequisite": 
        "Topics": ["Prerequisite Topic 1", "Prerequisite Topic 2"]
    "Roadmap": 
        "Lecture 1": ["Topic 1", "Topic 2"],
        "Lecture 2": ["Topic 3", "Topic 4"]

### Context:
{context}

### Time Span:
{time_span}

### Response
"""
    
    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "time_span"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    return chain



def generate_roadmap(time_span):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    
    # Load the vector store and perform a similarity search
    new_db = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
    docs = new_db.similarity_search("")
    
    # Convert docs to the format expected by the chain (usually a list of documents)
    if not docs:
        st.error("No documents found in the vector store.")
        return
    
    # Get the academic roadmap chain
    chain = get_academic_roadmap_chain()
    
    # Pass the input_documents and time_span to the chain
    response = chain(
        {"input_documents": docs, 
         "time_span": time_span},
         return_only_outputs=True
    )
    print(response["output_text"])
    roadmap = json.loads(response["output_text"])
    return roadmap