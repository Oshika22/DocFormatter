import { useState, useEffect } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import FileUpload from "./components/FileUpload";
import AIAssistant from "./components/AIAssistant";
import DocumentPreview from "./components/DocumentPreview";
import { formatDocument, downloadDocument, triggerDownload, checkHealth } from "./services/api";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formatResult, setFormatResult] = useState(null);
  const [error, setError] = useState(null);
  const [backendHealth, setBackendHealth] = useState(null);

  // Check backend health on mount
  useEffect(() => {
    checkHealth()
      .then((data) => setBackendHealth(data))
      .catch((err) => {
        console.error("Backend health check failed:", err);
        setBackendHealth({ status: "unhealthy", error: err.message });
      });
  }, []);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setFormatResult(null);
    setError(null);
  };

  const handleSend = async (message) => {
    if (!selectedFile) {
      return "Please upload a document first.";
    }

    setIsProcessing(true);
    setError(null);

    try {
      const result = await formatDocument(selectedFile, message);
      setFormatResult(result);
      
      if (result.success) {
        return `Formatting complete! Applied ${result.applied_actions?.length || 0} formatting actions.`;
      } else {
        throw new Error(result.error || "Formatting failed");
      }
    } catch (err) {
      const errorMsg = err.message || "Something went wrong. Please try again.";
      setError(errorMsg);
      return `Error: ${errorMsg}`;
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = async () => {
    if (!formatResult?.output_doc) {
      setError("No formatted document available to download.");
      return;
    }

    try {
      const blob = await downloadDocument(formatResult.output_doc);
      triggerDownload(blob, formatResult.output_doc);
    } catch (err) {
      setError(`Failed to download: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Workspace */}
      <main className="mx-auto max-w-7xl px-4 py-6 space-y-6">
        {/* Backend Status */}
        {backendHealth && (
          <div className={`rounded-lg border p-3 text-sm ${
            backendHealth.status === "healthy" 
              ? "bg-green-50 border-green-200 text-green-700" 
              : "bg-red-50 border-red-200 text-red-700"
          }`}>
            Backend: {backendHealth.status === "healthy" ? "✓ Connected" : "✗ Disconnected"}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Upload Section */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-700">
            Upload your document
          </h2>
          <div className="max-w-md">
            <FileUpload onFileSelect={handleFileSelect} />
          </div>
          {selectedFile && (
            <div className="mt-4 text-sm text-gray-600">
              Selected: <span className="font-medium">{selectedFile.name}</span>
            </div>
          )}
        </div>

        {/* Processing Status */}
        {isProcessing && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700">
            Processing document... This may take a moment.
          </div>
        )}

        {/* Format Result */}
        {formatResult && formatResult.success && (
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-700">
                Formatting Complete
              </h2>
              <button
                onClick={handleDownload}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Download Formatted Document
              </button>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Applied {formatResult.applied_actions?.length || 0} formatting actions</p>
              {formatResult.skipped_actions?.length > 0 && (
                <p className="text-yellow-600">
                  Skipped {formatResult.skipped_actions.length} actions (not implemented)
                </p>
              )}
            </div>
          </div>
        )}

        {/* Chat + Preview */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Chat */}
          <div className="flex flex-col rounded-2xl border bg-white shadow-sm">
            <AIAssistant 
              onSend={handleSend} 
              disabled={!selectedFile || isProcessing}
            />
          </div>

          {/* Preview */}
          <div className="rounded-2xl border bg-white shadow-sm">
            <DocumentPreview
              originalHtml={selectedFile ? `<p>Document: ${selectedFile.name}</p>` : "<p>No document uploaded</p>"}
              formattedHtml={formatResult?.success ? "<p>Document formatted successfully!</p>" : "<p>Waiting for formatting...</p>"}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
