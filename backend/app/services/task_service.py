from sqlalchemy.orm import Session

from app.models.task import Task



def create_task(db,data):

    task=Task(

        title=data.title,

        description=data.description,

        priority=data.priority,

        deadline=data.deadline,

        user_id=data.user_id,
        
        type=data.type
        

    )

    db.add(task)

    db.commit()

    db.refresh(task)

    return task



def get_tasks(db):

    return db.query(Task).all()



def get_user_tasks(db,user_id):

    return db.query(Task).filter(

        Task.user_id==user_id

    ).all()



def update_task(db,id,data):

    task=db.query(Task).filter(

        Task.id==id

    ).first()

    if not task:

        return None

    task.title=data.title

    task.description=data.description

    task.priority=data.priority

    task.status=data.status

    task.deadline=data.deadline
    
    task.type=data.type

    db.commit()

    db.refresh(task)

    return task



def update_status(db,id,status):

    task=db.query(Task).filter(

        Task.id==id

    ).first()

    if not task:

        return None

    task.status=status

    db.commit()

    return task



def delete_task(db,id):

    task=db.query(Task).filter(

        Task.id==id

    ).first()

    if not task:

        return None

    db.delete(task)

    db.commit()

    return {"message":"Task deleted"}