import { useState } from "react";

export default function FileUpload({ onFileSelect }) {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    onFileSelect?.(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;

    setFile(droppedFile);
    onFileSelect?.(droppedFile);
  };

  return (
    <div
      className={`w-full rounded-xl border-2 border-dashed p-6 text-center transition
        ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
      `}
      onDragEnter={() => setDragActive(true)}
      onDragLeave={() => setDragActive(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".docx"
        className="hidden"
        id="file-upload"
        onChange={handleFileChange}
      />

      <label htmlFor="file-upload" className="cursor-pointer">
        <div className="flex flex-col items-center gap-2">
          <UploadIcon />

          <p className="text-sm font-medium text-gray-700">
            {file ? file.name : "Upload your Word document"}
          </p>

          <p className="text-xs text-gray-500">
            Drag & drop or click to browse (.docx)
          </p>
        </div>
      </label>
    </div>
  );
}

function UploadIcon() {
  return (
    <svg
      className="h-8 w-8 text-gray-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 16V4m0 0l-4 4m4-4l4 4M20 16.5a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 014 16.5"
      />
    </svg>
  );
}
