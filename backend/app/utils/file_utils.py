import os
import uuid
import shutil
from pathlib import Path

UPLOAD_DIR = Path("tmp/uploads")
OUTPUT_DIR = Path("tmp/outputs")

UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

async def save_upload_file(upload_file) -> Path:
    file_ext = os.path.splitext(upload_file.filename)[1]
    file_name = f"{uuid.uuid4()}{file_ext}"
    file_path = UPLOAD_DIR / file_name
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
        
    return file_path

def get_output_path(original_filename: str, target_format: str) -> Path:
    stem = Path(original_filename).stem
    new_filename = f"{stem}_{uuid.uuid4().hex[:8]}.{target_format.lower()}"
    return OUTPUT_DIR / new_filename

def delete_file(path: Path):
    try:
        if path.exists():
            os.remove(path)
    except Exception as e:
        print(f"Error deleting file {path}: {e}")
