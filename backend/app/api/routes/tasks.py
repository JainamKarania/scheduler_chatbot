from fastapi import APIRouter,Depends,HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.task_schema import (
    TaskCreate,
    TaskUpdate
)

from app.services import task_service


router=APIRouter()



@router.post("/tasks")

def create_task(

    data:TaskCreate,

    db:Session=Depends(get_db)

):

    return task_service.create_task(

        db,

        data

    )



@router.get("/tasks")

def get_tasks(

    db:Session=Depends(get_db)

):

    return task_service.get_tasks(db)



@router.get("/tasks/user/{user_id}")

def user_tasks(

    user_id:int,

    db:Session=Depends(get_db)

):

    return task_service.get_user_tasks(

        db,

        user_id

    )



@router.put("/tasks/{id}")

def update_task(

    id:int,

    data:TaskUpdate,

    db:Session=Depends(get_db)

):

    result=task_service.update_task(

        db,

        id,

        data

    )

    if not result:

        raise HTTPException(

            status_code=404,

            detail="Task not found"

        )

    return result



@router.patch("/tasks/{id}/status")

def update_status(

    id:int,

    status:str,

    db:Session=Depends(get_db)

):

    result=task_service.update_status(

        db,

        id,

        status

    )

    if not result:

        raise HTTPException(

            status_code=404,

            detail="Task not found"

        )

    return result



@router.delete("/tasks/{id}")

def delete(

    id:int,

    db:Session=Depends(get_db)

):

    result=task_service.delete_task(

        db,

        id

    )

    if not result:

        raise HTTPException(

            status_code=404,

            detail="Task not found"

        )

    return result