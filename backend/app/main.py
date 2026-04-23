from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base,engine


from app.api.routes import users,tasks,ai


app=FastAPI()


Base.metadata.create_all(bind=engine)


app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)


app.include_router(users.router,prefix="/api",tags=["Users"])

app.include_router(ai.router,prefix="/api",tags=["AI"])

# app.include_router(appointments.router,prefix="/api",tags=["Appointments"])

app.include_router(tasks.router,prefix="/api",tags=["Tasks"])



@app.get("/health")

def health():

    return {"status":"ok"}



@app.on_event("startup")

def startup():

    print("AI Scheduler started")

    print("Ollama must be running")