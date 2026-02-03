from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import convert

app = FastAPI(title="Image Converter API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(convert.router, prefix="/api", tags=["Conversion"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Image Converter API"}
