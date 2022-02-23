from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
import time
from ..database import database
from .users import User, get_current_user


class Post(BaseModel):
    title: str = Field(..., max_anystr_length=255, description="title must be less than 255")
    content: str = Field(..., max_anystr_length=255, description="content must be less than 255")
    creationDate: int = Field(default_factory=time.time_ns)


router = APIRouter()


@router.post("/")
async def post_create(post: Post, current_user: User = Depends(get_current_user)):
    return await database.execute(
        'INSERT INTO "Posts"(title, content, author, "creationDate")'
        'VALUES(:title, :content, :author, :creationDate)'
        'RETURNING *',
        {"title":  post.title, "content": post.content, "author": current_user.login, "creationDate": post.creationDate}
    )


@router.get("/{post_id}")
async def post_read():
    return await database.execute()


@router.put("/{post_id}")
async def post_update(post_id: int):
    return post_id


@router.delete("/{post_id}")
async def post_delete(post_id: int):
    return post_id


@router.get("/")
async def post_get_ordered():
    return
