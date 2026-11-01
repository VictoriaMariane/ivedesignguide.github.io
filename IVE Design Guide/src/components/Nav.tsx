import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

type Page = "home" | "guidelines" | "guideline-detail" | "your-project";

interface NavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Nav({ currentPage, onNavigate }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links: { label: string; page: Page }[] = [
    { label: "Home", page: "home" },
    { label: "Guidelines", page: "guidelines" },
  ];

  const isActive = (page: Page) =>
    currentPage === page || (page === "guidelines" && currentPage === "guideline-detail");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80" : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2.5 group"
        >
          <span className="font-bold text-[#1E293B] text-sm tracking-tight">
            IVE Design Guide
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.page}
              onClick={() => onNavigate(l.page)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(l.page)
                  ? "bg-[#F0FDF9] text-[#0F766E]"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => onNavigate("your-project")}
            className="ml-3 px-4 py-2 rounded-lg text-sm font-semibold bg-[#0F766E] text-white hover:bg-[#0A5E57] transition-colors"
          >
            Your Project
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-600"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-2">
          {links.map((l) => (
            <button
              key={l.page}
              onClick={() => { onNavigate(l.page); setMobileOpen(false); }}
              className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(l.page)
                  ? "bg-[#F0FDF9] text-[#0F766E]"
                  : "text-slate-600"
              }`}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => { onNavigate("your-project"); setMobileOpen(false); }}
            className="mt-1 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#0F766E] text-white text-left"
          >
            Your Project
          </button>
        </div>
      )}
    </header>
  );
}
