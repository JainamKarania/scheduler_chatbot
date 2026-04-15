from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class AppointmentCreate(BaseModel):

    title:str

    description:Optional[str]=None

    start_time:datetime

    end_time:datetime

    user_id:int


class AppointmentUpdate(BaseModel):

    title:str

    description:Optional[str]=None

    start_time:datetime

    end_time:datetime


class AppointmentResponse(BaseModel):

    id:int

    title:str

    description:Optional[str]

    start_time:datetime

    end_time:datetime

    status:str

    user_id:int

    class Config:

        from_attributes=True