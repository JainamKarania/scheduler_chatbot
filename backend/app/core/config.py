from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

SECRET_KEY = os.getenv("SECRET_KEY")

# LLM Provider (important for migration)
LLM_PROVIDER = os.getenv("LLM_PROVIDER","ollama")

# Ollama settings
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL","mistral")

OLLAMA_BASE_URL = os.getenv(
    "OLLAMA_BASE_URL",
    "http://localhost:11434"
)

API_BASE_URL=os.getenv(
    "API_BASE_URL",
    "http://127.0.0.1:8000"
)