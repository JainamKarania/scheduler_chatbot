from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    priority: str = "medium"
    deadline: Optional[datetime] = None
    user_id: int
    type: Optional[str] = "task"


class TaskUpdate(BaseModel):
    task_id: int  # REQUIRED for update

    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None
    deadline: Optional[datetime] = None


class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    priority: str
    status: str
    deadline: Optional[datetime]
    user_id: int
    type: Optional[str] = "task"

    class Config:
        from_attributes = True