import { useState } from "react";

export default function DocumentPreview({
  originalHtml,
  formattedHtml,
}) {
  const [view, setView] = useState("formatted");

  return (
    <div className="flex h-full flex-col rounded-xl border bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-700">
          Document Preview
        </h2>

        {/* Toggle */}
        <div className="flex rounded-lg border bg-gray-100 p-1 text-xs">
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
        <div>download</div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
        <div className="mx-auto max-w-[800px] rounded-md bg-white px-10 py-12 shadow-sm">
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
