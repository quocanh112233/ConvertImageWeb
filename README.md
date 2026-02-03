# Py-Converter - Web Image Tool

Website chuyển đổi định dạng ảnh mạnh mẽ, hỗ trợ các định dạng phổ biến cho Web và định dạng Khoa học/Đồ họa.

## Tính năng nổi bật

*   **Chuyển đổi đa định dạng**:
    *   **Web Formats**: PNG, JPG, WEBP.
    *   **Raw Formats**: BMP, GIF.
    *   **Scientific Formats**: PPM, PGM, TIFF.
*   **Xử lý chuyên sâu**:
    *   Sử dụng **Numpy Pipeline** để xử lý pixel (File → Pillow → Numpy → Pillow → File).
    *   Tự động xử lý Transparency (Alpha channel) khi chuyển sang JPG (nền trắng).
    *   Hỗ trợ Grayscale chuẩn cho PGM.
*   **Giao diện hiện đại**: React + Vite + TailwindCSS, trải nghiệm Drag & Drop mượt mà.
*   **Auto Download**: Tự động tải file sau khi convert xong.

## Công nghệ sử dụng

### Backend
*   **FastAPI**: High performance API Framework.
*   **Pillow (PIL)**: Xử lý hình ảnh core.
*   **Numpy**: Xử lý mảng dữ liệu ảnh trung gian.
*   **Uvicorn**: ASGI Server.

### Frontend
*   **React 19**: UI Library.
*   **Vite**: Build tool siêu tốc.
*   **TailwindCSS v3**: Utility-first CSS framework.
*   **Zustand**: Quản lý State.
*   **Lucide React**: Icon set.

## Cài đặt và Chạy Local

### Yêu cầu
*   Python 3.9+
*   Node.js 18+

### 1. Khởi chạy Backend

```bash
cd backend
python -m venv venv
# Windows
.\venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload
```
Backend sẽ chạy tại: `http://localhost:8000`

### 2. Khởi chạy Frontend

```bash
cd frontend
npm install
npm run dev
```
Frontend sẽ chạy tại: `http://localhost:5173`

## Chạy bằng Docker Compose

1. Đảm bảo đã cài Docker Desktop.
2. Tại thư mục gốc dự án:
```bash
docker-compose up --build
```
3. Truy cập website tại: `http://localhost:3000` (hoặc cổng cấu hình trong docker-compose).

## Cấu trúc dự án

```
ConvertImageWeb/
├── backend/            # FastAPI App
│   ├── app/
│   │   ├── converts/   # Logic convert (Factory Pattern)
│   │   ├── routes/     # API Endpoints
│   │   ├── utils/      # File helpers
│   │   └── main.py     # Entry point
│   ├── tmp/            # Temp storage (auto cleaned)
│   └── requirements.txt
├── frontend/           # React App
│   ├── src/
│   │   ├── components/ # UI Components
│   │   ├── store/      # Zustand store
│   │   └── App.tsx
│   └── tailwind.config.js
└── docker-compose.yml
```