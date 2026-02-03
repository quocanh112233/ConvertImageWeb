# Build Stage
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies if required for Pillow (e.g. TIFF/WEBP support)
# python-slim usually has basics, but for robust image support:
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Create tmp directories for app usage
RUN mkdir -p tmp/uploads tmp/outputs

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
