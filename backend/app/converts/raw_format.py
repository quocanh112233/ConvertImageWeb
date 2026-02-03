from pathlib import Path
from PIL import Image
import numpy as np
import io
from .base import ImageConverter

class RawFormatConverter(ImageConverter):
    def convert(self, input_bytes: bytes, target_format: str) -> bytes:
        fmt = target_format.upper()
        output_io = io.BytesIO()
        
        with Image.open(io.BytesIO(input_bytes)) as img:
            if img.mode != "RGB":
                img_rgb = img.convert("RGB")
            else:
                img_rgb = img
            
            arr = np.array(img_rgb)
            
            print(f"--- Processing Image Bytes to {fmt} ---")
            print(f"Shape: {arr.shape}")
            print(f"Dtype: {arr.dtype}")
            
            mid_h, mid_w = arr.shape[0] // 2, arr.shape[1] // 2
            pixel_val = arr[mid_h, mid_w]
            print(f"Pixel tại [{mid_h}, {mid_w}]: {pixel_val}")
            
            pixel_00_before = arr[0, 0]
            
            reconstructed_img = Image.fromarray(arr)
            
            pixel_00_after = np.array(reconstructed_img)[0, 0]
            
            if not np.array_equal(pixel_00_before, pixel_00_after):
                print(f"WARNING: Pixel [0,0] mismatch! Before: {pixel_00_before}, After: {pixel_00_after}")
            else:
                print("Pixel [0,0] check: MATCH")

            if fmt == "BMP":
                reconstructed_img.save(output_io, format="BMP")
                    
            elif fmt == "GIF":
                final_img = reconstructed_img.convert("P", palette=Image.ADAPTIVE, colors=256)
                final_img.save(output_io, format="GIF")
        
        return output_io.getvalue()
