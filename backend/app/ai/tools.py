from langchain_core.tools import tool

from datetime import datetime

from app.services.task_service import create_task,get_user_tasks

# from app.services.appointment_service import create_appointment

from app.services.scheduler_service import (
    check_conflict,
    get_user_appointments
)

from app.core.database import SessionLocal



@tool
def create_task_tool(
    title:str,
    description:str,
    priority:str,
    deadline:str,
    user_id:int
)->str:

    """Create a new task."""

    db=SessionLocal()

    try:

        # Normalize priority
        priority=priority.lower()

        if "high" in priority:
            priority="high"
        elif "medium" in priority:
            priority="medium"
        else:
            priority="low"


        # Convert deadline
        try:

            deadline=datetime.fromisoformat(deadline)

        except:

            return "Invalid deadline format. Use ISO datetime."


        data=type("obj",(object,),{

            "title":title,
            "description":description,
            "priority":priority,
            "deadline":deadline,
            "user_id":user_id

        })


        task=create_task(db,data)

        return f"Task created successfully with id {task.id}"


    except Exception as e:

        return f"Task creation failed: {str(e)}"


    finally:

        db.close()



# @tool
# def create_appointment_tool(
#     title:str,
#     description:str,
#     start_time:str,
#     end_time:str,
#     user_id:int
# )->str:

#     """Create appointment for a user."""

#     db=SessionLocal()

#     try:

#         data=type("obj",(object,),{

#             "title":title,
#             "description":description,
#             "start_time":start_time,
#             "end_time":end_time,
#             "user_id":user_id

#         })

#         appointment=create_appointment(db,data)

#         return f"Appointment created with id {appointment.id}"

#     except Exception:

#         return "Failed to create appointment"

#     finally:

#         db.close()



@tool
def get_tasks_tool(user_id:int)->str:

    """Fetch all tasks for a user."""

    db=SessionLocal()

    try:

        tasks=get_user_tasks(db,user_id)

        if not tasks:

            return "No tasks found"

        return "\n".join(

            [

                f"{t.title} - {t.status}"

                for t in tasks

            ]

        )

    finally:

        db.close()