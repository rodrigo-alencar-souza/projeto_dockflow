from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from app.db.session import init_db
from app.routers import users, process
from fastapi.exceptions import RequestValidationError
from fastapi.responses import PlainTextResponse


app = FastAPI(title="Users and Process CRUD API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()
app.include_router(users.router)
app.include_router(process.router)
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    # isso vai imprimir no console e retornar texto puro para facilitar leitura
    print(exc.errors())
    return PlainTextResponse(str(exc), status_code=422)


