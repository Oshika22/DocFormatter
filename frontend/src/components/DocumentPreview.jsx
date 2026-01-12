import { useState } from "react";

export default function DocumentPreview({
  originalHtml,
  formattedHtml,
}) {
  const [view, setView] = useState("formatted");

  return (
    <div className="flex flex-col w-full border border-pink-500 bg-white/40 h-175 mt-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-pink-500 px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-700">
          Document Preview
        </h2>

        {/* Toggle */}
        <div className="flex rounded-3xl border border-indigo-500 bg-indigo-100/50 p-1 text-xs">
          <ToggleButton
            active={view === "original"}
            onClick={() => setView("original")}
          
          >
            Original
          </ToggleButton>
          <ToggleButton
            active={view === "formatted"}
            onClick={() => setView("formatted")}
          >
            Formatted
          </ToggleButton>
          
        </div>
        
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-200 rounded-md bg-white px-10 py-12 shadow-sm min-h-150">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html:
                view === "original"
                  ? originalHtml
                  : formattedHtml,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function ToggleButton({ active, children, ...props }) {
  return (
    <button
      {...props}
      className={`px-3 py-1.5 font-medium transition
        ${
          active
            ? "rounded-md bg-white text-gray-900 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        }
      `}
    >
      {children}
    </button>
  );
}
