from typing import List, Optional
from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    login: Optional[str] = None


class User(BaseModel):
    login: str
    password: str


class UserInDB(User):
    hashed_password: str
