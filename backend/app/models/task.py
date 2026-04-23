from sqlalchemy import Column,Integer,String,DateTime,ForeignKey

from sqlalchemy.sql import func

from app.core.database import Base



class Task(Base):

    __tablename__="tasks"


    id=Column(Integer,primary_key=True,index=True)

    title=Column(String,nullable=False)

    description=Column(String)

    priority=Column(String,default="medium")

    status=Column(String,default="pending")

    deadline=Column(DateTime)

    created_at=Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    user_id=Column(
        Integer,
        ForeignKey("users.id")
    )
    
    type=Column(String,default="task")  