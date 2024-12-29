import streamlit as st
import PyPDF2
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import google.generativeai as genai
from langchain.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
import json
from youtubesearchpython import VideosSearch
import requests
import base64
from conversational_prompt import user_input
from roadmap_prompt import generate_roadmap
from heading_prompt import generate_heading, get_courses
from academic_resources import generate_resources


# Load environment variables and configure API key
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
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
# Functions for PDF processing
def get_pdf_text(uploaded_file):
    text = ''
    try:
        pdf_reader = PyPDF2.PdfReader(uploaded_file)
        text = ''.join(page.extract_text() for page in pdf_reader.pages)
        text = text.lower()
        return text
    except Exception as e:
        st.error(f"Error processing PDF: {e}")
        return ""

def get_text_chunks(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    chunks = text_splitter.split_text(text)
    if not chunks:
        raise ValueError("No text chunks were created. Please check the input text.")
    return chunks

def get_vector_store(text_chunks):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    if not text_chunks:
        raise ValueError("No text chunks provided for vector store creation.")
    try:
        vector_store = FAISS.from_texts(text_chunks, embedding=embeddings)
        vector_store.save_local("faiss_index")
    except IndexError as e:
        raise IndexError(f"An error occurred during vector store creation: {e}")


def main():
    st.title("DRONA")
    
    # Initialize session state
    if 'heading' not in st.session_state:
        st.session_state.heading = None

    # Create tabs for different functionalities
    tab1, tab2, tab3, tab4 = st.tabs(["Chat with PDF", "Generate Roadmap", 'Courses', "Academic Resources"])
    
    with tab1:
        st.header("Chat with PDF")
        user_question = st.text_input("Ask a question from the PDF Files")
        if user_question: 
            user_input(user_question)
        
    with st.sidebar:
        st.title("Menu:")
        pdf_docs = st.file_uploader("Upload your PDF Files and click on the Submit button", type="pdf")
        if st.button("Submit & Process"):
            with st.spinner("Processing..."):
                if pdf_docs:
                    raw_text = get_pdf_text(pdf_docs)
                    if raw_text:
                        text_chunks = get_text_chunks(raw_text)
                        get_vector_store(text_chunks)
                        st.session_state.heading = generate_heading()
                        st.success("Processing complete!")
                    else:
                        st.error("Failed to extract text from the PDF.")

    with tab2:
        st.header("Generate Academic Roadmap")
        time_span = st.text_input("Specify the time span for the roadmap (e.g., 'number of hours')")
        if time_span: 
            roadmap = generate_roadmap(time_span)
            st.write('Prerequisite')
            for i in roadmap['Prerequisite']['Topics']:
                st.write(i)
            st.write('Roadmap')
            for key, value in roadmap['Roadmap'].items():
                st.write(f"<span style='font-size:30px;font-weight:bold;color:red'>{key}", unsafe_allow_html=True)
                for v in value:
                    st.write(f"<span style='font-size:18px;font-weight:bold;'>{v}", unsafe_allow_html=True)
                    videosSearch = VideosSearch(v + "education", limit = 2)
                    video_results = videosSearch.result()

                    if video_results and 'result' in video_results:
                        for video in video_results['result']:
                            try:
                                thumbnail_url = video['thumbnails'][0]['url'] if video['thumbnails'] else 'default_thumbnail_url'
                                title = video['title'] if 'title' in video else 'No Title'
                                link = video['link'] if 'link' in video else '#'
                                description = video.get("descriptionSnippet", [{}])[0].get('text', 'No description available.')
                                
                                card(thumbnail_url, title, link, description)
                            except Exception as e:
                                st.error(f"Error processing video: {str(e)}")


    with tab3:
        st.header('Courses')
        if st.session_state.heading:
            res = get_courses(heading=st.session_state.heading)
            st.write(res)  # Adjust this based on the structure of 'res'

    with tab4:
        st.header('Academic Resources')
        if st.session_state.heading:
            res = generate_resources()
            for key, value in res['AcademicResources']["Books"].items():
                st.write(key)
                st.write(value['Author'])
                st.divider()

if __name__ == "__main__":
    main()
