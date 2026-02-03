from .web_format import WebFormatConverter
from .raw_format import RawFormatConverter
from .scientific import ScientificFormatConverter
from .base import ImageConverter

_converters = {
    "png": WebFormatConverter(),
    "jpg": WebFormatConverter(),
    "jpeg": WebFormatConverter(),
    "webp": WebFormatConverter(),
    "bmp": RawFormatConverter(),
    "gif": RawFormatConverter(),
    "ppm": ScientificFormatConverter(),
    "tiff": ScientificFormatConverter(),
    "tif": ScientificFormatConverter(),
    "pgm": ScientificFormatConverter(),
}

def get_converter(target_format: str) -> ImageConverter:
    converter = _converters.get(target_format.lower())
    if not converter:
        raise ValueError(f"Unsupported format: {target_format}")
    return converter
