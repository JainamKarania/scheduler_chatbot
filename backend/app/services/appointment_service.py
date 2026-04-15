from sqlalchemy.orm import Session

from app.models.appointment import Appointment



def check_conflict(db,start,end,user_id):

    return db.query(Appointment).filter(

        Appointment.user_id==user_id,

        Appointment.start_time < end,

        Appointment.end_time > start

    ).first()



def create_appointment(db,data):

    conflict = check_conflict(
        db,
        data.start_time,
        data.end_time,
        data.user_id
    )

    if conflict:
        return None

    appointment=Appointment(
        title=data.title,
        description=data.description,
        start_time=data.start_time,
        end_time=data.end_time,
        user_id=data.user_id
    )

    db.add(appointment)
    db.commit()
    db.refresh(appointment)

    return appointment



def get_appointments(db):

    return db.query(Appointment).all()



def get_user_appointments(db,user_id):

    return db.query(Appointment).filter(

        Appointment.user_id==user_id

    ).all()



def update_appointment(db,id,data):

    appointment=db.query(Appointment).filter(

        Appointment.id==id

    ).first()

    if not appointment:

        return None

    appointment.title=data.title

    appointment.description=data.description

    appointment.start_time=data.start_time

    appointment.end_time=data.end_time

    db.commit()

    db.refresh(appointment)

    return appointment



def update_status(db,id,status):

    appointment=db.query(Appointment).filter(

        Appointment.id==id

    ).first()

    if not appointment:

        return None

    appointment.status=status

    db.commit()

    return appointment



def delete_appointment(db,id):

    appointment=db.query(Appointment).filter(

        Appointment.id==id

    ).first()

    if not appointment:

        return None

    db.delete(appointment)

    db.commit()

    return {"message":"Appointment deleted"}