from abc import ABC, abstractmethod

class ImageConverter(ABC):
    @abstractmethod
    def convert(self, input_bytes: bytes, target_format: str) -> bytes:
        pass
