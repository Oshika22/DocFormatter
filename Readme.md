# DocFormat AI — Word Document Formatter

Lightweight AI-powered Word (.docx) formatter with a React + Vite frontend and a Flask backend that uses LangGraph / LangChain LLM agents to analyze and apply formatting plans.
Live UI Link: https://doc-formatter-six.vercel.app/
## What this project does (simple)
- Lets a person upload a Word document and ask for formatting changes in normal language.
- Uses AI to detect what looks wrong or inconsistent in the document.
- Creates a list of specific formatting steps (e.g., "make these lines headings", "apply consistent spacing", "fix numbering") and applies them.
- Shows a quick HTML preview so you can check the result before downloading.
- Produces a corrected Word file you can download and use.

## Features
- Upload a .docx and get it automatically cleaned up.
- Tell the app what you want (e.g., "make section titles bold and numbered") and it will follow your instruction plus its own fixes.
- See a browser preview of the formatted document before download.
- Download the fixed Word file when you're happy with it.
- Run everything locally: frontend (web UI) + backend (processor).
- Easy to extend if you want to add more specific formatting rules or tools.

## Quick links
- Backend entry: [backend/app.py](backend/app.py) — see functions [`format_document`](backend/app.py), [`preview_doc`](backend/app.py), [`download_file`](backend/app.py), [`tool_cmd_node`](backend/app.py), [`load_docx`](backend/app.py).
- Frontend app: [frontend/src/App.jsx](frontend/src/App.jsx) — integrates chat UI and preview.
- Frontend API helpers: [frontend/src/services/api.js](frontend/src/services/api.js) — functions [`formatDocument`](frontend/src/services/api.js), [`downloadDocument`](frontend/src/services/api.js), [`fetchPreview`](frontend/src/services/api.js), [`triggerDownload`](frontend/src/services/api.js).
- HTML preview helper: [backend/utils/docx_utils.py](backend/utils/docx_utils.py) — function [`docx_to_html`](backend/utils/docx_utils.py).
- Example graph / experiments: [backend/flow.ipynb](backend/flow.ipynb) and [backend/flow copy.py](backend/flow copy.py).
- Sample outputs: [backend/outputs/Final_Formatted_c44263cc.docx](backend/outputs/Final_Formatted_c44263cc.docx)

## Repository layout
- backend/ — Flask backend, LangGraph workflow, document tools
  - [app.py](backend/app.py)
  - [utils/docx_utils.py](backend/utils/docx_utils.py)
  - [requirements.txt](backend/requirements.txt) / [requirements_old.txt](backend/requirements_old.txt)
  - example documents: Draft.docx, Final_Formatted.docx
  - outputs/ — generated formatted files
  - flow.ipynb / flow copy.py — notebooks / scripts used during development
- frontend/ — React + Vite UI
  - [src/App.jsx](frontend/src/App.jsx)
  - [src/components/AIAssistant.jsx](frontend/src/components/AIAssistant.jsx)
  - [src/components/DocumentPreview.jsx](frontend/src/components/DocumentPreview.jsx)
  - [src/services/api.js](frontend/src/services/api.js)
  - public/ — static assets

## Getting started

Prerequisites:
- Python 3.12+ and pip
- Node 18+ and npm

1. Backend
```sh
cd backend
pip install -r requirements.txt
# create .env with OPENAI_API_KEY if using LLMs
# start server
python app.py
```
- Server runs by default on http://localhost:5000 (see [CONNECTION_GUIDE.md](CONNECTION_GUIDE.md) for details).
- Main formatting endpoint implemented in [`format_document`](backend/app.py).

2. Frontend
```sh
cd frontend
npm install
npm run dev
```
- Frontend runs on Vite dev server (default: http://localhost:5173). The frontend uses [frontend/src/services/api.js](frontend/src/services/api.js) to call the backend.

## Usage (basic)
- Open the frontend UI.
- Upload a .docx file and optionally provide a chat instruction (the chat is handled in [frontend/src/components/AIAssistant.jsx](frontend/src/components/AIAssistant.jsx)).
- The frontend sends a multipart POST to [`/format-document`](backend/app.py) implemented by [`format_document`](backend/app.py), which:
  - runs the LangGraph workflow to analyze structure (`doc_structure_node` / [`doc_structure_node`](backend/app.py)),
  - converts detected issues to commands (`auto_detect_command_node` / [`auto_detect_command_node`](backend/app.py)),
  - merges user and auto commands and applies tools (`tool_cmd_node` / [`tool_cmd_node`](backend/app.py)),
  - returns `output_doc` filename and lists of `applied_actions` / `skipped_actions`.
- Fetch HTML preview via [`/preview/<filename>`](backend/app.py) which uses [`docx_to_html`](backend/utils/docx_utils.py) to render paragraphs.

## API endpoints
- GET /health — simple health check (used in [frontend/src/App.jsx](frontend/src/App.jsx) on mount).
- POST /format-document — upload file or JSON with `doc_path` and optional `user_instruction` (see [`format_document`](backend/app.py)).
- GET /preview/<filename> — returns HTML preview (uses [`docx_to_html`](backend/utils/docx_utils.py)).
- GET /download/<filename> — downloads formatted .docx (see [`download_file`](backend/app.py)).

## Environment & configuration
- LLM configuration and API key: set `OPENAI_API_KEY` in [backend/.env](backend/.env).
- Output directory: created at runtime in backend via `OUTPUT_DIR` (declared in [backend/app.py](backend/app.py)).

## Development notes & troubleshooting
- If the LangGraph graph visualization errors, install `grandalf` (not required for core flow); development notebooks show that error in [backend/flow.ipynb](backend/flow.ipynb).
- If previewing fails, ensure output file exists under [backend/outputs/](backend/outputs/) and that the Flask server has read access.
- Check server logs (Flask stdout) for applied/skipped actions — the backend prints debug info when applying tools in [`tool_cmd_node`](backend/app.py).

## Contributions & experiments
- The LangGraph workflow and Pydantic output parsing live in [backend/flow.ipynb](backend/flow.ipynb) and [backend/flow copy.py](backend/flow copy.py). Use these notebooks to iterate on prompts and structured outputs.
- Tools that actually mutate documents are registered in the backend tool registry and invoked from [`tool_cmd_node`](backend/app.py). Add implementations there to support additional actions.
