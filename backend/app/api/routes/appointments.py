from fastapi import APIRouter,Depends,HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.appointment_schema import (
    AppointmentCreate,
    AppointmentUpdate
)

from app.services import appointment_service


router=APIRouter()



@router.post("/appointments")

def create_appointment(

    data:AppointmentCreate,

    db:Session=Depends(get_db)

):

    if data.end_time <= data.start_time:

        raise HTTPException(

            status_code=400,

            detail="Invalid time range"

        )

    conflict=appointment_service.check_conflict(

        db,

        data.start_time,

        data.end_time,

        data.user_id

    )

    if conflict:

        raise HTTPException(

            status_code=400,

            detail="Time slot already booked"

        )

    return appointment_service.create_appointment(

        db,

        data

    )



@router.get("/appointments")

def get_all(db:Session=Depends(get_db)):

    return appointment_service.get_appointments(db)



@router.get("/appointments/user/{user_id}")

def get_user_appointments(

    user_id:int,

    db:Session=Depends(get_db)

):

    return appointment_service.get_user_appointments(

        db,

        user_id

    )



@router.put("/appointments/{id}")

def update(

    id:int,

    data:AppointmentUpdate,

    db:Session=Depends(get_db)

):

    result=appointment_service.update_appointment(

        db,

        id,

        data

    )

    if not result:

        raise HTTPException(

            status_code=404,

            detail="Appointment not found"

        )

    return result



@router.patch("/appointments/{id}/status")

def update_status(

    id:int,

    status:str,

    db:Session=Depends(get_db)

):

    result=appointment_service.update_status(

        db,

        id,

        status

    )

    if not result:

        raise HTTPException(

            status_code=404,

            detail="Appointment not found"

        )

    return result



@router.delete("/appointments/{id}")

def delete(

    id:int,

    db:Session=Depends(get_db)

):

    result=appointment_service.delete_appointment(

        db,

        id

    )

    if not result:

        raise HTTPException(

            status_code=404,

            detail="Appointment not found"

        )

    return result