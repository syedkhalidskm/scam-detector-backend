import google.generativeai as genai
from fastapi import FastAPI

app = FastAPI()

genai.configure(api_key="YOUR_GOOGLE_GEMINI_API_KEY")

@app.get("/analyze")
def analyze_image():
    return {"probability": "90%", "reason": "Suspicious payment request"}
