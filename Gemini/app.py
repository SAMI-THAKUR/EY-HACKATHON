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
import requests
import json
# import tweepy
# import linkedin_api
from datetime import datetime

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Initialize API keys (you'll need to add these to your .env file)
UDEMY_CLIENT_ID = os.getenv("UDEMY_CLIENT_ID")
UDEMY_CLIENT_SECRET = os.getenv("UDEMY_CLIENT_SECRET")
EVENTBRITE_TOKEN = os.getenv("EVENTBRITE_TOKEN")
PROSPEO_API_KEY = os.getenv("PROSPEO_API_KEY")
LINKEDIN_ACCESS_TOKEN = os.getenv("LINKEDIN_ACCESS_TOKEN")
TWITTER_API_KEY = os.getenv("TWITTER_API_KEY")

def extract_resume_text(uploaded_file):
    text = ''
    try:
        pdf_reader = PyPDF2.PdfReader(uploaded_file)
        text = ''.join(page.extract_text() for page in pdf_reader.pages)
        return text.lower()
    except Exception as e:
        st.error(f"Error processing resume: {e}")
        return ""

def analyze_skill_gap(resume_text, desired_role):
    prompt_template = """
    Analyze the resume and the desired role to:
    1. List current skills from the resume
    2. List required skills for the desired role
    3. Identify skill gaps
    4. Create a detailed learning roadmap to acquire missing skills
    
    Resume: {resume}
    Desired Role: {role}
    
    Provide a structured response with clear sections.
    """
    
    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)
    prompt = PromptTemplate(template=prompt_template, input_variables=["resume", "role"])
    response = model.predict(prompt.format(resume=resume_text, role=desired_role))
    return response

def get_udemy_courses(skill):
    headers = {
        "Authorization": f"Basic {UDEMY_CLIENT_ID}:{UDEMY_CLIENT_SECRET}"
    }
    response = requests.get(
        f"https://www.udemy.com/api-2.0/courses/?search={skill}&ordering=highest-rated",
        headers=headers
    )
    return response.json()

def get_upcoming_events(location):
    # Eventbrite API call
    headers = {
        "Authorization": f"Bearer {EVENTBRITE_TOKEN}"
    }
    response = requests.get(
        f"https://www.eventbrite.com/api/v3/events/search?location.address={location}&categories=102",
        headers=headers
    )
    return response.json()

def generate_cold_email_template(role, company):
    prompt_template = """
    Generate a personalized cold email template for:
    Role: {role}
    Company: {company}
    
    The email should be:
    1. Professional and concise
    2. Show genuine interest in the company
    3. Highlight value proposition
    4. Include a clear call to action
    """
    
    model = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.3)
    prompt = PromptTemplate(template=prompt_template, input_variables=["role", "company"])
    response = model.predict(prompt.format(role=role, company=company))
    return response

def find_company_emails(company_name):
    headers = {
        "Authorization": f"Bearer {PROSPEO_API_KEY}"
    }
    response = requests.get(
        f"https://api.prospeo.io/email-finder?company={company_name}",
        headers=headers
    )
    return response.json()

def main():
    st.set_page_config(page_title="Career Assistant", layout="wide")
    st.title("LAKSHYA - Your Career Assistant")
    
    # Sidebar for basic info
    with st.sidebar:
        st.title("Your Profile")
        uploaded_file = st.file_uploader("Upload your Resume (PDF)", type="pdf")
        desired_role = st.text_input("What's your desired role?")
        location = st.text_input("Your Location")

    # Main content with tabs
    tab1, tab2, tab3 = st.tabs(["Reduce Skill Gap", "Learn in Public", "Employment"])
    
    if uploaded_file and desired_role:
        resume_text = extract_resume_text(uploaded_file)
        
        with tab1:
            st.header("Skill Gap Analysis")
            if st.button("Analyze Skills"):
                with st.spinner("Analyzing your profile..."):
                    analysis = analyze_skill_gap(resume_text, desired_role)
                    st.write(analysis)
                    
                st.subheader("Recommended Courses")
                if "skill gaps" in analysis.lower():
                    courses = get_udemy_courses(desired_role)
                    for course in courses['results'][:5]:
                        st.write(f"- {course['title']}")
                        st.write(f"  Rating: {course['rating']}")
                        st.write(f"  Link: {course['url']}")
        
        with tab2:
            st.header("Learn in Public")
            
            # Social Media Integration
            st.subheader("Share Your Learning Journey")
            learning_update = st.text_area("What did you learn today?")
            if st.button("Share on LinkedIn/Twitter"):
                # Add social media posting logic here
                st.success("Posted successfully!")
            
            # Community Events
            st.subheader("Upcoming Tech Events")
            if location:
                events = get_upcoming_events(location)
                for event in events['events'][:5]:
                    st.write(f"- {event['name']['text']}")
                    st.write(f"  Date: {event['start']['local']}")
                    st.write(f"  Link: {event['url']}")
        
        with tab3:
            st.header("Employment Strategies")
            
            # Cold Email Generator
            st.subheader("Cold Email Generator")
            target_company = st.text_input("Target Company")
            if target_company and st.button("Generate Cold Email"):
                email_template = generate_cold_email_template(desired_role, target_company)
                st.text_area("Email Template", email_template, height=200)
                
                # Find company emails
                emails = find_company_emails(target_company)
                st.write("Potential Contact Emails:")
                for email in emails['results']:
                    st.write(f"- {email['email']}")
            
            # Job Listings
            st.subheader("Relevant Job Openings")
            # Add job API integration here

if __name__ == "__main__":
    main()