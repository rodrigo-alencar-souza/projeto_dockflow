import os

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:123599@localhost:5432/Projeto_Angular"
)

# DATABASE_URL = "sqlite:///./meubanco.db"
