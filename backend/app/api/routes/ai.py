from fastapi import APIRouter

from pydantic import BaseModel

from app.ai.agent import ask_agent


router=APIRouter()


class AIRequest(BaseModel):

    query:str

    user_id:int   # ← ADD THIS


@router.post("/ai")

def ai_chat(request:AIRequest):

    result=ask_agent(

        request.query,

        request.user_id   # ← THIS was failing

    )

    return {

        "response":result

    }