import streamlit as st
import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings

from langchain.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
import json
import requests


url_cover = 'https://covers.openlibrary.org/b/id/'
url_data = 'https://openlibrary.org/search.json?q='

def card(thubmnail, title, url):
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
                 </span>
             </div>
        </div>
     </div>
        """, unsafe_allow_html=True)


def get_academic_resources_chain():
    prompt_template = """
You are an expert academic advisor. Based on the provided context, give academic resources for the provided topic.
Ensure that your response is accurate, relevant to the academic setting, and formatted in JSON. If the necessary information is not available in the context, respond with: "The answer is not available in the context."
### Important Instructions:
- Respond **only** with a valid JSON string.
- Do not add any formating other than JSON not even escape sequence.
- The JSON should be structured strictly as shown below.
    "AcademicResources":
        "Books": 
            "Book Name" : 
                "Author"
            ...

### Context:
{context}

### Output:
"""
    
    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)
    prompt = PromptTemplate(template=prompt_template, input_variables=["context"])
    chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)
    return chain


def generate_resources():
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    new_db = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
    docs = new_db.similarity_search("")
    if not docs:
        st.error("No documents found in the vector store.")
        return
    
    chain = get_academic_resources_chain()
    # print(docs)
    # Pass the context to the chain
    response = chain(
        {"input_documents": docs},
         return_only_outputs=True
    )
    print(response)
    res = json.loads(response["output_text"])
    print(res)
    return res


# def search_book(book_name, author_name):
#     # Combine book name and author name with '+' between words
#     search_query = f"{book_name} {author_name}".replace(" ", "+")
    
#     # Example search URL (you can replace this with the actual search URL)
#     url_data = f"https://openlibrary.org/search.json?q={search_query}"
    
#     # Make the GET request
#     response = requests.get(url_data)
    
#     # Process the response (this will depend on the API you're using)
#     if response.status_code == 200:
#         print(response.json())
#         return response.json()  # Assuming the API returns JSON data
#     else:
#         return None