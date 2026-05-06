from langchain_core.tools import tool
from datetime import datetime
from typing import Optional

from app.services.task_service import create_task, get_user_tasks
from app.core.database import SessionLocal
from app.schemas.task_schema import TaskCreate


@tool
def create_task_tool(
    title: str,
    user_id: int,
    description: Optional[str] = None,
    priority: str = "medium",
    deadline: Optional[str] = None,
    type: Optional[str] = "task"
) -> str:
    """Create a new task."""

    db = SessionLocal()

    try:
        # Normalize priority
        priority = priority.lower()
        if "high" in priority:
            priority = "high"
        elif "medium" in priority:
            priority = "medium"
        else:
            priority = "low"

        # Convert deadline safely
        parsed_deadline = None
        if deadline:
            try:
                # Fix for ISO "Z"
                if deadline.endswith("Z"):
                    deadline = deadline.replace("Z", "+00:00")

                parsed_deadline = datetime.fromisoformat(deadline)

            except Exception:
                return "Invalid deadline format. Use ISO datetime."

        # Use Pydantic schema (clean approach)
        task_data = TaskCreate(
            title=title,
            description=description,
            priority=priority,
            deadline=parsed_deadline,
            user_id=user_id,
            type=type
        )

        task = create_task(db, task_data)

        return f"Task created successfully with id {task.id}"

    except Exception as e:
        return f"Task creation failed: {str(e)}"

    finally:
        db.close()


@tool
def get_tasks_tool(user_id: int) -> str:
    """Fetch all tasks for a user."""

    db = SessionLocal()

    try:
        tasks = get_user_tasks(db, user_id)

        if not tasks:
            return "No tasks found"

        return "\n".join([
            f"{t.id}. {t.title} | {t.status} | {t.priority}"
            for t in tasks
        ])

    finally:
        db.close()