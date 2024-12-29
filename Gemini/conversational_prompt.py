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

def get_conversational_chain():
    prompt_template = """
    Please extract and summarize the relevant information from the provided PDF. 
    Additionally, give further explanation , provide supplementary information from general knowledge.
    Make sure to indicate which parts are from the PDF and which are based on external sources
    If the answer is not in the provided context, say, "Answer is not available in the context."
    Do not provide a wrong answer.
    Context: 
    {context}
    Question: 
    {question}
    Answer:
    """
    
    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)
    prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    return chain


def user_input(user_question):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    new_db = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
    docs = new_db.similarity_search(user_question)
    chain = get_conversational_chain()
    
    response = chain(
        {"input_documents":docs,
         "question": user_question},
         return_only_outputs=True
    )
    st.write("Reply:", response["output_text"])