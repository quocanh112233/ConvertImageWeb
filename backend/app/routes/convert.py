from fastapi import APIRouter, UploadFile, File, Form, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse
from ..converts import get_converter
from ..utils.file_utils import save_upload_file, get_output_path, delete_file
import os

router = APIRouter()

@router.post("/convert")
async def convert_image(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    format: str = Form(...)
):
    input_path = None
    output_path = None
    
    try:
        input_path = await save_upload_file(file)
        
        output_path = get_output_path(file.filename, format)
        
        with open(input_path, "rb") as f:
            input_bytes = f.read()

        converter = get_converter(format)
        output_bytes = converter.convert(input_bytes, format)
        
        with open(output_path, "wb") as f_out:
            f_out.write(output_bytes)
        
        delete_file(input_path)
        
        background_tasks.add_task(delete_file, output_path)
        
        return FileResponse(
            output_path, 
            filename=os.path.basename(output_path),
            media_type=f"image/{format.lower() if format.lower() != 'jpg' else 'jpeg'}",
            headers={"Content-Disposition": f"attachment; filename={os.path.basename(output_path)}"}
        )
        
    except ValueError as e:
        print(f"ERROR 400: {e}")
        if input_path: delete_file(input_path)
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print(f"ERROR 500: {e}")
        if input_path: delete_file(input_path)
        if output_path and output_path.exists(): delete_file(output_path)
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")
