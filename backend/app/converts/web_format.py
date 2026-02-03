from pathlib import Path
from PIL import Image
import io
import numpy as np
from .base import ImageConverter

class WebFormatConverter(ImageConverter):
    def convert(self, input_bytes: bytes, target_format: str) -> bytes:
        fmt = target_format.upper()
        if fmt == "JPG":
            fmt = "JPEG"
        
        output_io = io.BytesIO()
        
        with Image.open(io.BytesIO(input_bytes)) as img:
            if fmt == "JPEG":
                if img.mode in ("RGBA", "LA"):
                    background = Image.new("RGB", img.size, (255, 255, 255))
                    background.paste(img, mask=img.split()[-1])
                    img = background
                elif img.mode != "RGB":
                    img = img.convert("RGB")
            
            arr = np.array(img)
            
            print(f"--- Web Format Convert: Byte Stream to {fmt} ---")
            print(f"Shape: {arr.shape}")
            print(f"Dtype: {arr.dtype}")
            mid_h, mid_w = arr.shape[0] // 2, arr.shape[1] // 2
            if mid_h < arr.shape[0] and mid_w < arr.shape[1]: 
                 print(f"Pixel [{mid_h}, {mid_w}]: {arr[mid_h, mid_w]}")
            
            reconstructed_img = Image.fromarray(arr)
            
            reconstructed_img.save(output_io, format=fmt)
            
        return output_io.getvalue()
