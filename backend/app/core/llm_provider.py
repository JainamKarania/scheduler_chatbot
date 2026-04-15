from langchain_ollama import ChatOllama
from langchain_ollama import OllamaEmbeddings

from app.core.config import (
    LLM_PROVIDER,
    OLLAMA_MODEL,
    OLLAMA_BASE_URL
)



def get_llm():

    if LLM_PROVIDER == "ollama":

        return ChatOllama(

            model=OLLAMA_MODEL,

            base_url=OLLAMA_BASE_URL,

            temperature=0,

            top_p=0.9,

            num_predict=512,

            request_timeout=120

        )

    else:

        raise ValueError(
            "Invalid LLM_PROVIDER in .env"
        )



def get_embeddings():

    if LLM_PROVIDER == "ollama":

        return OllamaEmbeddings(

            model="nomic-embed-text",

            base_url=OLLAMA_BASE_URL

        )

    else:

        raise ValueError(
            "Embeddings provider missing"
        )