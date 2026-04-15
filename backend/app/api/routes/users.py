from fastapi import APIRouter,Depends,HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.user_schema import UserCreate

from app.services import user_service


router=APIRouter()



@router.post("/users")

def create_user(

    data:UserCreate,

    db:Session=Depends(get_db)

):

    return user_service.create_user(db,data)



@router.get("/users")

def get_users(

    db:Session=Depends(get_db)

):

    return user_service.get_users(db)



@router.get("/users/{id}")

def get_user(

    id:int,

    db:Session=Depends(get_db)

):

    user=user_service.get_user(db,id)

    if not user:

        raise HTTPException(

            status_code=404,

            detail="User not found"

        )

    return user