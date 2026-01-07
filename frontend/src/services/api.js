/**
 * API service for communicating with the Flask backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Format a document by uploading it with optional user instructions
 * @param {File} file - The .docx file to format
 * @param {string} userInstruction - Optional formatting instruction
 * @returns {Promise<Object>} The formatting result
 */
export async function formatDocument(file, userInstruction = '') {
  const formData = new FormData();
  formData.append('file', file);
  if (userInstruction) {
    formData.append('user_instruction', userInstruction);
  }

  const response = await fetch(`${API_BASE_URL}/format-document`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

/**
 * Download a formatted document
 * @param {string} filename - The filename to download
 * @returns {Promise<Blob>} The file blob
 */
export async function downloadDocument(filename) {
  const response = await fetch(`${API_BASE_URL}/download/${filename}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`Failed to download file: ${response.status}`);
  }

  return await response.blob();
}

/**
 * Check if the backend is healthy
 * @returns {Promise<Object>} Health status
 */
export async function checkHealth() {
  const response = await fetch(`${API_BASE_URL}/health`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`Health check failed: ${response.status}`);
  }

  return await response.json();
}

/**
 * Helper to trigger file download from blob
 * @param {Blob} blob - The file blob
 * @param {string} filename - The filename for download
 */
export function triggerDownload(blob, filename) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

export async function fetchPreview(filename) {
  const res = await fetch(`http://localhost:5000/preview/${filename}`);
  if (!res.ok) throw new Error("Preview fetch failed");
  return res.json();
}

