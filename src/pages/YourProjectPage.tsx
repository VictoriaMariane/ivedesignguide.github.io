import { useState, useEffect } from "react";
import {
  ListChecks, Armchair, Layers, Footprints, Brain, Eye, Hand, Accessibility, Gamepad2,
  CheckCircle2, Clock, Circle, ArrowRight, FileText, X, Download, ChevronDown,
} from "lucide-react";
import { guidelines, priorityBadgeClass } from "../data/guidelines";
import jsPDF from "jspdf";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  ListChecks, Armchair, Layers, Footprints, Brain, Eye, Hand, Accessibility, Gamepad2,
};

type Status = "not-started" | "in-progress" | "done";

const STATUS_LABELS: Record<Status, string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  done: "Done",
};

const STATUS_COLORS: Record<Status, string> = {
  "not-started": "text-slate-500 bg-slate-100",
  "in-progress": "text-amber-700 bg-amber-100",
  done: "text-emerald-700 bg-emerald-100",
};

const STATUS_ICONS: Record<Status, React.ComponentType<{ size?: number; className?: string }>> = {
  "not-started": Circle,
  "in-progress": Clock,
  done: CheckCircle2,
};

const STORAGE_KEY_NAME = "ive-project-name";
const STORAGE_KEY_TYPE = "ive-project-type";
const STORAGE_KEY_CHECKS = "ive-guideline-checks";

function loadChecks(): Record<number, boolean[]> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_CHECKS) ?? "{}");
  } catch {
    return {};
  }
}

interface YourProjectPageProps {
  onNavigate: (page: "home" | "guidelines" | "guideline-detail" | "your-project", guidelineId?: number) => void;
}

export default function YourProjectPage({ onNavigate }: YourProjectPageProps) {
  const [projectName, setProjectName] = useState(
    () => localStorage.getItem(STORAGE_KEY_NAME) ?? ""
  );
  const [projectType, setProjectType] = useState(
    () => localStorage.getItem(STORAGE_KEY_TYPE) ?? ""
  );
  const [showReport, setShowReport] = useState(false);
  const [expandedGuideline, setExpandedGuideline] = useState<number | null>(null);
  const [hoveredGuideline, setHoveredGuideline] = useState<number | null>(null);
  const [checks, setChecks] = useState<Record<number, boolean[]>>(loadChecks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_NAME, projectName);
  }, [projectName]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TYPE, projectType);
  }, [projectType]);

  const getGuidelineStatus = (id: number, total: number): Status => {
    const selected = (checks[id] ?? []).filter(Boolean).length;
    if (selected === 0) return "not-started";
    if (selected === total) return "done";
    return "in-progress";
  };

  const statuses = Object.fromEntries(
    guidelines.map((guideline) => [
      guideline.id,
      getGuidelineStatus(guideline.id, guideline.checklist.length),
    ]),
  ) as Record<number, Status>;

  const doneCount = guidelines.filter((g) => statuses[g.id] === "done").length;
  const inProgressCount = guidelines.filter((g) => statuses[g.id] === "in-progress").length;
  const pct = Math.round((doneCount / guidelines.length) * 100);

  const getGuidelineCheckPct = (id: number) => {
    const arr = checks[id];
    if (!arr || arr.length === 0) return 0;
    return Math.round((arr.filter(Boolean).length / arr.length) * 100);
  };

  const toggleCheck = (guidelineId: number, checkIndex: number) => {
    setChecks((current) => {
      const guideline = guidelines.find((item) => item.id === guidelineId);
      if (!guideline) return current;

      const guidelineChecks =
        current[guidelineId] ?? guideline.checklist.map(() => false);
      const nextGuidelineChecks = guidelineChecks.map((value, index) =>
        index === checkIndex ? !value : value,
      );
      const next = { ...current, [guidelineId]: nextGuidelineChecks };
      localStorage.setItem(STORAGE_KEY_CHECKS, JSON.stringify(next));
      return next;
    });
  };

  const downloadReport = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    const statusTheme: Record<
      Status,
      { background: [number, number, number]; foreground: [number, number, number] }
    > = {
      "not-started": {
        background: [241, 245, 249],
        foreground: [100, 116, 139],
      },
      "in-progress": {
        background: [254, 243, 199],
        foreground: [180, 83, 9],
      },
      done: {
        background: [209, 250, 229],
        foreground: [4, 120, 87],
      },
    };

    const drawStatusBadge = (status: Status, x: number, y: number) => {
      const theme = statusTheme[status];
      doc.setFillColor(...theme.background);
      doc.roundedRect(x, y, 32, 6.5, 3.25, 3.25, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(...theme.foreground);
      doc.text(STATUS_LABELS[status], x + 16, y + 4.3, {
        align: "center",
      });
    };

    const drawProgressBar = (
      x: number,
      y: number,
      width: number,
      percentage: number,
    ) => {
      doc.setFillColor(226, 232, 240);
      doc.roundedRect(x, y, width, 2.6, 1.3, 1.3, "F");
      if (percentage > 0) {
        doc.setFillColor(15, 118, 110);
        doc.roundedRect(
          x,
          y,
          Math.max(2.6, width * (percentage / 100)),
          2.6,
          1.3,
          1.3,
          "F",
        );
      }
    };

    const drawRadialProgress = (
      centerX: number,
      centerY: number,
      percentage: number,
    ) => {
      const segments = 36;
      const completedSegments = Math.round((percentage / 100) * segments);

      for (let index = 0; index < segments; index += 1) {
        const angle = (index / segments) * Math.PI * 2 - Math.PI / 2;
        const x = centerX + Math.cos(angle) * 17;
        const y = centerY + Math.sin(angle) * 17;
        if (index < completedSegments) {
          doc.setFillColor(15, 118, 110);
        } else {
          doc.setFillColor(226, 232, 240);
        }
        doc.circle(x, y, 1.25, "F");
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(30, 41, 59);
      doc.text(`${percentage}%`, centerX, centerY + 1.5, { align: "center" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.text("complete", centerX, centerY + 6, { align: "center" });
    };

    doc.setFillColor(15, 118, 110);
    doc.rect(0, 0, pageWidth, 5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(19);
    doc.setTextColor(30, 41, 59);
    doc.text("IVE Design Guide", 14, 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text("Project implementation dashboard", 14, 26);
    doc.text(
      `Generated ${new Date().toLocaleDateString()}`,
      pageWidth - 14,
      20,
      { align: "right" },
    );

    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, 34, pageWidth - 28, 64, 4, 4, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(15, 118, 110);
    doc.text("PROJECT", 22, 45);
    doc.setFontSize(15);
    doc.setTextColor(30, 41, 59);
    doc.text(projectName || "Untitled Project", 22, 54, { maxWidth: 112 });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(projectType || "Project type not specified", 22, 61);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(30, 41, 59);
    doc.text(
      `${pct}% completed — ${doneCount} of 9 guidelines done`,
      22,
      76,
    );
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(
      inProgressCount > 0
        ? `${inProgressCount} guideline${inProgressCount === 1 ? "" : "s"} currently in progress`
        : "No guidelines currently in progress",
      22,
      83,
    );

    drawRadialProgress(pageWidth - 39, 66, pct);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(30, 41, 59);
    doc.text("Guideline progress", 14, 110);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text("Checklist completion and automatic status", 14, 115);

    guidelines.forEach((g, index) => {
      const status = statuses[g.id] ?? "not-started";
      const checkPct = getGuidelineCheckPct(g.id);
      const completedChecks = (checks[g.id] ?? []).filter(Boolean).length;
      const y = 120 + index * 18;

      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(14, y, pageWidth - 28, 15, 3, 3, "FD");

      doc.setFillColor(240, 253, 249);
      doc.circle(22, y + 7.5, 4, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(15, 118, 110);
      doc.text(String(g.priority), 22, y + 8.5, { align: "center" });

      doc.setFontSize(9);
      doc.setTextColor(30, 41, 59);
      doc.text(g.title, 29, y + 5.8);
      drawStatusBadge(status, pageWidth - 50, y + 2.2);

      drawProgressBar(29, y + 9.3, 102, checkPct);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text(
        `${completedChecks} of ${g.checklist.length} — ${checkPct}%`,
        135,
        y + 11.7,
      );
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(
      "IVE Design Guide · Evidence-based design for immersive training interfaces",
      pageWidth / 2,
      291,
      { align: "center" },
    );

    doc.save(`ive-project-report-${Date.now()}.pdf`);
  };

  return (
    <div className="pt-16 min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F766E]/10 text-[#0F766E] text-xs font-semibold mb-4">
            Project Checklist
          </div>
          <h1 className="text-4xl font-bold text-[#1E293B] mb-3">Your Project</h1>
          <p className="text-lg text-slate-500">Apply the 9 guidelines to your VR project.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        {/* Project Setup */}
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold text-[#1E293B] mb-6">Project Setup</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Project Name</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., Lathe Training Simulator"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Project Type</label>
              <div className="relative">
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0F766E]/30 focus:border-[#0F766E] transition-colors appearance-none bg-white"
                >
                  <option value="">Select a type…</option>
                  <option value="Industrial Training">Industrial Training</option>
                  <option value="Educational">Educational</option>
                  <option value="Safety Training">Safety Training</option>
                  <option value="Other">Other</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#1E293B]">Overall Progress</h2>
            <span className="text-2xl font-bold text-[#0F766E]">{pct}%</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-3">
            <div className="progress-bar h-full" style={{ width: `${pct}%` }} />
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-emerald-600">
              <CheckCircle2 size={14} />
              <span>{doneCount} of 9 completed</span>
            </div>
            {inProgressCount > 0 && (
              <div className="flex items-center gap-2 text-amber-600">
                <Clock size={14} />
                <span>{inProgressCount} in progress</span>
              </div>
            )}
          </div>
        </div>

        {/* Interactive guideline cards */}
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-bold text-[#1E293B]">Implementation Checklists</h2>
            <p className="mt-1 text-sm text-slate-500">
              Hover over or select a guideline to review its three implementation criteria.
            </p>
          </div>
          <div className="space-y-4">
            {guidelines.map((g) => {
              const Icon = iconMap[g.iconName];
              const status: Status = statuses[g.id] ?? "not-started";
              const StatusIcon = STATUS_ICONS[status];
              const checkPct = getGuidelineCheckPct(g.id);
              const guidelineChecks =
                checks[g.id] ?? g.checklist.map(() => false);
              const isExpanded =
                (hoveredGuideline ?? expandedGuideline) === g.id;

              return (
                <div
                  key={g.id}
                  onMouseEnter={() => setHoveredGuideline(g.id)}
                  onMouseLeave={() => setHoveredGuideline(null)}
                  className={`bg-white rounded-2xl border shadow-sm overflow-visible transition-all duration-300 ${
                    isExpanded
                      ? "border-[#0F766E]/30 shadow-md shadow-[#0F766E]/5"
                      : "border-slate-100 hover:border-[#0F766E]/20"
                  }`}
                >
                  <div className="relative flex items-center gap-4 p-5">
                    <button
                      onClick={() =>
                        setExpandedGuideline(
                          expandedGuideline === g.id ? null : g.id,
                        )
                      }
                      aria-expanded={isExpanded}
                      aria-controls={`guideline-checklist-${g.id}`}
                      className="absolute inset-0 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]/40"
                    >
                      <span className="sr-only">
                        {isExpanded ? "Collapse" : "Expand"} checklist for {g.title}
                      </span>
                    </button>

                    <div className="relative w-11 h-11 rounded-xl bg-[#0F766E]/10 flex items-center justify-center flex-shrink-0 pointer-events-none">
                      <Icon size={19} className="text-[#0F766E]" />
                    </div>
                    <div className="relative flex-1 min-w-0 pointer-events-none">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${priorityBadgeClass(g.priority)}`}>P{g.priority}</span>
                        <span className="font-semibold text-sm text-[#1E293B]">{g.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="progress-bar h-full" style={{ width: `${checkPct}%` }} />
                        </div>
                        <span className="text-xs text-slate-400">
                          {guidelineChecks.filter(Boolean).length}/3 criteria
                        </span>
                      </div>
                    </div>

                    <div
                      className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold flex-shrink-0 pointer-events-none transition-colors ${STATUS_COLORS[status]}`}
                      aria-live="polite"
                    >
                      <StatusIcon size={12} />
                      <span className="hidden sm:inline">{STATUS_LABELS[status]}</span>
                    </div>

                    <ChevronDown
                      size={18}
                      className={`relative text-slate-400 flex-shrink-0 pointer-events-none transition-transform duration-300 ${
                        isExpanded ? "rotate-180 text-[#0F766E]" : ""
                      }`}
                    />
                  </div>

                  <div
                    id={`guideline-checklist-${g.id}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isExpanded
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="mx-5 border-t border-slate-100 pt-4 pb-5">
                        <div className="flex items-center justify-between gap-4 mb-3">
                          <h3 className="text-sm font-bold text-[#1E293B]">
                            Implementation Checklist
                          </h3>
                          <button
                            onClick={() => onNavigate("guideline-detail", g.id)}
                            className="text-xs text-[#0F766E] font-semibold hover:underline flex items-center gap-1"
                          >
                            View guideline <ArrowRight size={11} />
                          </button>
                        </div>
                        <div className="space-y-2">
                          {g.checklist.map((item, index) => (
                            <label
                              key={item}
                              className="flex items-start gap-3 cursor-pointer p-3 rounded-xl hover:bg-[#F0FDF9] transition-colors"
                            >
                              <input
                                type="checkbox"
                                checked={guidelineChecks[index] ?? false}
                                onChange={() => toggleCheck(g.id, index)}
                                className="flex-shrink-0 mt-0.5"
                              />
                              <span
                                className={`text-sm leading-relaxed transition-colors ${
                                  guidelineChecks[index]
                                    ? "text-[#0F766E] line-through"
                                    : "text-slate-700"
                                }`}
                              >
                                {item}
                              </span>
                              {guidelineChecks[index] && (
                                <CheckCircle2
                                  size={16}
                                  className="text-[#0F766E] ml-auto mt-0.5 flex-shrink-0"
                                />
                              )}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Report Generation */}
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[#1E293B] mb-1">Generate Report</h2>
              <p className="text-sm text-slate-500">Review completion and download a PDF summary.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowReport(!showReport)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#0F766E] text-white hover:bg-[#0A5E57] transition-colors flex items-center gap-2"
              >
                <FileText size={15} />
                Generate Report
              </button>
              <button
                onClick={downloadReport}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-2"
              >
                <Download size={15} />
                Download PDF
              </button>
            </div>
          </div>

          {showReport && (
            <div className="mt-8 border-t border-slate-100 pt-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-bold text-[#1E293B] text-base">{projectName || "Untitled Project"}</h3>
                  {projectType && <p className="text-sm text-slate-500">{projectType}</p>}
                </div>
                <button onClick={() => setShowReport(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={18} />
                </button>
              </div>

              {/* Summary metrics */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: `${pct}%`, label: "Overall Completion", color: "#0F766E" },
                  { value: `${doneCount}/9`, label: "Guidelines Done", color: "#0EA5E9" },
                  { value: `${inProgressCount}`, label: "In Progress", color: "#F59E0B" },
                ].map((m) => (
                  <div key={m.label} className="rounded-xl p-4 text-center border border-slate-100 bg-slate-50">
                    <div className="text-2xl font-bold" style={{ color: m.color }}>{m.value}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Completed guidelines */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-500" />
                  Completed Guidelines
                </h4>
                <div className="space-y-2">
                  {guidelines.filter((g) => statuses[g.id] === "done").length === 0 ? (
                    <p className="text-sm text-slate-400 italic">None completed yet.</p>
                  ) : (
                    guidelines.filter((g) => statuses[g.id] === "done").map((g) => (
                      <div key={g.id} className="flex items-center gap-2.5 p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                        <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0" />
                        <span className="text-sm text-emerald-800 font-medium">Priority {g.priority}: {g.title}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Pending guidelines */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <Clock size={15} className="text-amber-500" />
                  Pending Guidelines
                </h4>
                <div className="space-y-2">
                  {guidelines.filter((g) => statuses[g.id] !== "done").length === 0 ? (
                    <p className="text-sm text-emerald-600 font-medium">All guidelines completed!</p>
                  ) : (
                    guidelines.filter((g) => statuses[g.id] !== "done").map((g) => (
                      <div key={g.id} className="flex items-center gap-2.5 p-3 rounded-lg bg-amber-50 border border-amber-100">
                        <Circle size={14} className="text-amber-500 flex-shrink-0" />
                        <span className="text-sm text-amber-800 font-medium">Priority {g.priority}: {g.title}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Priority recommendations */}
              <div className="p-4 rounded-xl bg-[#F0FDF9] border border-[#0F766E]/20">
                <h4 className="text-sm font-bold text-[#0F766E] mb-2">Priority Recommendations</h4>
                <p className="text-sm text-[#1E293B]">
                  Focus on Priority 1–3 guidelines first:{" "}
                  {guidelines
                    .filter((g) => g.priority <= 3 && statuses[g.id] !== "done")
                    .map((g) => g.title)
                    .join(", ") || "All high-priority guidelines are complete!"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 py-8 bg-[#1E293B] text-center">
        <p className="text-slate-400 text-sm">
          Developed as part of a Master's research on immersive training interfaces · Federal University of Paraná (UFPR)
        </p>
      </footer>
    </div>
  );
}
