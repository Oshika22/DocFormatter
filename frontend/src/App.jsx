import { useState } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import FileUpload from "./components/FileUpload";
import AIAssistant from "./components/AIAssistant";
import DocumentPreview from "./components/DocumentPreview";

const originalHtml = `
<h1>Sample Document</h1>
<p>This is an unformatted paragraph.</p>
`;

const formattedHtml = `
<h1 style="text-align:center;">Sample Document</h1>
<p style="text-align:justify; line-height:1.6;">
  This is a formatted paragraph with better spacing.
</p>
`;

function App() {
  const handleFileSelect = (file) => {
    console.log("Selected file:", file);
  };

  const handleSend = async (message) => {
    console.log("User says:", message);
    await new Promise((r) => setTimeout(r, 800));
    return "I’ve applied the requested formatting.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Workspace */}
      <main className="mx-auto max-w-7xl px-4 py-6 space-y-6">
        {/* Upload Section */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-700">
            Upload your document
          </h2>
          <div className="max-w-md">
            <FileUpload onFileSelect={handleFileSelect} />
          </div>
        </div>

        {/* Chat + Preview */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Chat */}
          <div className="flex flex-col rounded-2xl border bg-white shadow-sm">
            <AIAssistant onSend={handleSend} />
          </div>

          {/* Preview */}
          <div className="rounded-2xl border bg-white shadow-sm">
            <DocumentPreview
              originalHtml={originalHtml}
              formattedHtml={formattedHtml}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
