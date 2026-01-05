import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200/60 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-sm font-semibold tracking-tight text-gray-900">
            DocFormat AI
          </span>
        </div>

        {/* Account */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen(!open)}
            className="group relative flex h-9 w-9 items-center justify-center rounded-full
              bg-gradient-to-br from-indigo-500 to-blue-600
              text-sm font-semibold text-white
              shadow-sm transition
              hover:scale-105 hover:shadow-md
              focus:outline-none"
          >
            A
            <span className="absolute inset-0 rounded-full ring-2 ring-white/40 group-hover:ring-white/60" />
          </button>

          {open && (
            <div
              className="absolute right-0 mt-3 w-48 overflow-hidden rounded-xl
                border border-gray-200/60
                bg-white shadow-xl animate-dropdown"
            >
              <DropdownItem label="Account Settings" />
              <DropdownItem label="History" />
              <DropdownItem label="Preferences" />
              <div className="my-1 border-t border-gray-200/60" />
              <DropdownItem label="Logout" danger />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function Logo() {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-lg
      bg-gradient-to-br from-indigo-500 to-blue-600
      text-sm font-bold text-white shadow-sm">
      D
    </div>
  );
}

function DropdownItem({ label, danger }) {
  return (
    <button
      className={`w-full px-4 py-2.5 text-left text-sm transition
        ${
          danger
            ? "text-red-600 hover:bg-red-50"
            : "text-gray-700 hover:bg-gray-100"
        }
      `}
    >
      {label}
    </button>
  );
}
