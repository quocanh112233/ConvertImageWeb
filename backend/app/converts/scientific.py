from pathlib import Path
import io
import numpy as np
from PIL import Image
from .base import ImageConverter

class ScientificFormatConverter(ImageConverter):
    def convert(self, input_bytes: bytes, target_format: str) -> bytes:
        fmt = target_format.upper()
        output_io = io.BytesIO()
        
        with Image.open(io.BytesIO(input_bytes)) as img:
            if fmt == "PGM":
                if img.mode != "L":
                    img = img.convert("L")
            elif fmt == "PPM" and img.mode in ("RGBA", "LA"):
                img = img.convert("RGB")
            
            arr = np.array(img)
            
            print(f"--- Scientific Convert: Byte Stream to {fmt} ---")
            print(f"Shape: {arr.shape}")
            print(f"Dtype: {arr.dtype}")
            mid_h, mid_w = arr.shape[0] // 2, arr.shape[1] // 2
            print(f"Pixel [{mid_h}, {mid_w}]: {arr[mid_h, mid_w]}")
            
            reconstructed_img = Image.fromarray(arr)
            
            save_fmt = fmt
            if fmt == "PGM":
                save_fmt = "PPM"
                
            reconstructed_img.save(output_io, format=save_fmt)
            
        return output_io.getvalue()
