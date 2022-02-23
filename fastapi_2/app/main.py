from fastapi import FastAPI
from .database import database
from .routers import posts, users


app = FastAPI()


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


@app.get("/film")
async def read_films():
    return await database.fetch_all("SELECT * FROM film LIMIT 50")


app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(posts.router, prefix="/api/posts", tags=["posts"])
