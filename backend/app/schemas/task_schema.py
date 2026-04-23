from pydantic import BaseModel

from datetime import datetime

from typing import Optional



class TaskCreate(BaseModel):

    title:str

    description:Optional[str]=None

    priority:str="medium"

    deadline:Optional[datetime]=None

    user_id:int
    
    type: Optional[str] = "task"  # ← NEW FIELD



class TaskUpdate(BaseModel):

    title:str

    description:Optional[str]

    priority:str

    status:str

    deadline:datetime



class TaskResponse(BaseModel):

    id:int

    title:str

    description:Optional[str]

    priority:str

    status:str

    deadline:datetime

    user_id:int

    type: Optional[str] = "task"  # ← NEW FIELD

    class Config:

        from_attributes=True