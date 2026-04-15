from sqlalchemy.orm import Session

from app.models.user import User



def create_user(db,data):

    user=User(

        name=data.name,

        email=data.email,

        password=data.password

    )

    db.add(user)

    db.commit()

    db.refresh(user)

    return user



def get_users(db):

    return db.query(User).all()



def get_user(db,id):

    return db.query(User).filter(

        User.id==id

    ).first()