import { useState, useEffect } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Workflow from "./components/Workflow";
import Demo from "./components/Demo";
import CTA from "./components/Cta";
import FileUpload from "./components/FileUpload";
import AIAssistant from "./components/AIAssistant";
import DocumentPreview from "./components/DocumentPreview";
import { formatDocument, downloadDocument, triggerDownload, checkHealth, fetchPreview} from "./services/api";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formatResult, setFormatResult] = useState(null);
  const [error, setError] = useState(null);
  const [backendHealth, setBackendHealth] = useState(null);

  const [originalHtml, setOriginalHtml] = useState("");
  const [formattedHtml, setFormattedHtml] = useState("");


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
        if (result.original_html) {
          setOriginalHtml(result.original_html);
        }
        const formatted = await fetchPreview(result.output_doc);
        setFormattedHtml(formatted.html);
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
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar />

     {/* Landing Page      */}
      <Hero/>
      <Features/>
      <Workflow/>




      {/* Main Workspace */}
      <main className="mx-auto px-4 py-6 space-y-6 bg-linear-to-br from-purple-200 via-indigo-200 to-pink-200">
        {/* Backend Status */}
        {backendHealth && (
          <div className={`rounded-lg border p-3 text-sm ${
            backendHealth.status === "healthy" 
              ? "bg-green-50/70 border-green-200 text-green-700" 
              : "bg-red-50/70 border-red-200 text-red-700"
          }`}>
            Backend: {backendHealth.status === "healthy" ? "✓ Connected" : "✗ Disconnected"}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50/70 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Upload Section */}
        <div className="rounded-lg border border-purple-600 bg-white/50 p-6 shadow-sm flex-col items-center justify-center">
          <h2 className="mb-4 text-sm font-semibold text-gray-700">
            Upload your document
          </h2>
          <div className="w-full flex-col items-center justify-center">
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
          <div className="rounded-lg border border-indigo-200 bg-indigo-50/70 p-4 text-sm text-blue-700">
            Processing document... This may take a moment.
          </div>
        )}

        {/* Format Result */}
        {formatResult && formatResult.success && (
          <div className="rounded-lg border border-indigo-500 bg-indigo-50/70 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-700">
                Formatting Complete
              </h2>
              <button
                onClick={handleDownload}
                className="rounded-lg bg-linear-to-br from-purple-500 via-indigo-500 to-pink-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
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
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Chat */}
          <div className="flex flex-col">
            <AIAssistant 
              onSend={handleSend} 
              disabled={!selectedFile || isProcessing}
            />
          </div>

          {/* Preview */}
          <div className="">
            <DocumentPreview

              originalHtml={originalHtml || "<p>No original preview</p>"}
              formattedHtml={formattedHtml || "<p>No formatted preview</p>"}
            />
          </div>
          
        </div>
        
      </main>
      <CTA/>
    </div>
  );
}

export default App;
