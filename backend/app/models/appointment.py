from sqlalchemy import Column,Integer,String,DateTime,ForeignKey
from datetime import datetime

from app.core.database import Base





class Appointment(Base):

    __tablename__ = "appointments"

    id = Column(Integer,primary_key=True,index=True)

    title = Column(String)

    description = Column(String)

    start_time = Column(DateTime)

    end_time = Column(DateTime)

    status = Column(String,default="scheduled")

    user_id = Column(Integer,ForeignKey("users.id"))

    created_at = Column(DateTime,default=datetime.utcnow)
    
    