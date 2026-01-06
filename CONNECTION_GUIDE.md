# Frontend-Backend Connection Guide

This guide explains how to connect the React frontend with the Flask backend.

## Prerequisites

### Backend Dependencies
```bash
cd formatword/backend
pip install -r requirements.txt
```

### Frontend Dependencies
```bash
cd formatword/frontend
npm install
```

## Step-by-Step Setup

### 1. Backend Setup

1. **Install Python dependencies:**
   ```bash
   cd formatword/backend
   pip install -r requirements.txt
   ```

2. **Create `.env` file** (if not exists):
   ```bash
   # In formatword/backend/.env
   OPENAI_API_KEY=your_api_key_here
   ```

3. **Start the Flask server:**
   ```bash
   cd formatword/backend
   python app.py
   ```
   
   The backend will run on `http://localhost:5000`

### 2. Frontend Setup

1. **Install Node dependencies:**
   ```bash
   cd formatword/frontend
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   The frontend will run on `http://localhost:5173` (default Vite port)

### 3. Configuration

The frontend is configured to connect to the backend in two ways:

**Option A: Direct connection (default)**
- Frontend API service uses `http://localhost:5000` directly
- Set `VITE_API_URL` environment variable to override

**Option B: Via Vite proxy (development)**
- Vite proxy configured in `vite.config.js`
- Use `/api/*` endpoints in frontend (automatically proxies to backend)

## API Endpoints

### Backend Endpoints

1. **Health Check**
   - `GET http://localhost:5000/health`
   - Returns: `{"status": "healthy", "service": "word-formatter"}`

2. **Format Document**
   - `POST http://localhost:5000/format-document`
   - Accepts: Multipart form data with `file` and optional `user_instruction`
   - Returns: JSON with formatting results

3. **Download Document**
   - `GET http://localhost:5000/download/<filename>`
   - Returns: File download

### Frontend API Service

Located in `formatword/frontend/src/services/api.js`:

- `formatDocument(file, userInstruction)` - Upload and format document
- `downloadDocument(filename)` - Download formatted document
- `checkHealth()` - Check backend health
- `triggerDownload(blob, filename)` - Helper to trigger browser download

## How It Works

1. **User uploads a file** → `FileUpload` component captures the file
2. **User sends instruction** → `AIAssistant` component sends message
3. **App.jsx calls API** → `formatDocument()` sends file + instruction to backend
4. **Backend processes** → LangGraph workflow analyzes and formats document
5. **Response returned** → Frontend displays results and download button
6. **User downloads** → `downloadDocument()` fetches and triggers download

## Troubleshooting

### CORS Errors
- Ensure `flask-cors` is installed
- Check that `CORS(app)` is in `app.py`

### Connection Refused
- Verify backend is running on port 5000
- Check firewall settings
- Ensure no other service is using port 5000

### File Upload Issues
- Verify file is `.docx` format
- Check file size limits
- Ensure backend has write permissions

### Environment Variables
- Backend: Create `.env` file with `OPENAI_API_KEY`
- Frontend: Set `VITE_API_URL` if backend is on different host/port

## Testing the Connection

1. Start both servers (backend and frontend)
2. Open browser to frontend URL (usually `http://localhost:5173`)
3. Check backend status indicator (should show "✓ Connected")
4. Upload a `.docx` file
5. Send a formatting instruction (e.g., "Justify the document")
6. Wait for processing
7. Download the formatted document

## Production Deployment

For production:

1. **Backend:**
   - Use a production WSGI server (e.g., Gunicorn)
   - Set proper CORS origins
   - Use environment variables for configuration

2. **Frontend:**
   - Build: `npm run build`
   - Set `VITE_API_URL` to production backend URL
   - Serve static files with a web server (Nginx, etc.)

