from pydantic import BaseModel
from datetime import datetime

class TaskBase(BaseModel):

    title: str
    description: str | None = None
    completed: bool = False

class TaskCreate(TaskBase):
    pass

class TaskResponse(TaskBase):
    id: int
    timestamp: datetime

    class Config: 
        from_attributes = True