import { useState, useEffect } from "react";
import gutasksImg from "@/imports/Captura_de_tela_2026-09-12_qqq.png";
import ergonomicImg from "@/imports/11.png";
import multimodalImg from "@/imports/111-1.png";
import guidedTaskImg from "@/imports/1111.png";
import cognitiveImg from "@/imports/1111-1.png";
import realismImg from "@/imports/1real1.png";
import embodiedImg from "@/imports/11111.jpg";
import accessibilityImg from "@/imports/8ac32c95-4aeb-4797-b75c-3aa27ffb43d7.jpg";
import gamificationImg from "@/imports/111111.png";
import {
  ListChecks, Armchair, Layers, Footprints, Brain, Eye, Hand, Accessibility, Gamepad2,
  ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, ChevronUp
} from "lucide-react";
import { guidelines, priorityBadgeClass } from "../data/guidelines";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  ListChecks, Armchair, Layers, Footprints, Brain, Eye, Hand, Accessibility, Gamepad2,
};

interface GuidelineDetailPageProps {
  guidelineId: number;
  onNavigate: (page: "home" | "guidelines" | "guideline-detail" | "your-project", guidelineId?: number) => void;
}

export default function GuidelineDetailPage({ guidelineId, onNavigate }: GuidelineDetailPageProps) {
  const guideline = guidelines.find((g) => g.id === guidelineId) ?? guidelines[0];
  const Icon = iconMap[guideline.iconName];
  const currentIndex = guidelines.findIndex((g) => g.id === guidelineId);
  const prevGuideline = currentIndex > 0 ? guidelines[currentIndex - 1] : null;
  const nextGuideline = currentIndex < guidelines.length - 1 ? guidelines[currentIndex + 1] : null;

  const [exampleOpen, setExampleOpen] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [guidelineId]);

  return (
    <div className="pt-16 min-h-screen bg-[#F8FAFC]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-2 text-sm text-slate-500">
          <button onClick={() => onNavigate("guidelines")} className="hover:text-[#0F766E] flex items-center gap-1 transition-colors">
            <ArrowLeft size={14} />
            Guidelines
          </button>
          <span>/</span>
          <span className="text-[#1E293B] font-medium">{guideline.title}</span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-[#0F766E]/10 flex items-center justify-center flex-shrink-0">
              <Icon size={32} className="text-[#0F766E]" />
            </div>
            <div>
              <span className={`inline-flex text-xs font-bold px-3 py-1.5 rounded-full mb-3 ${priorityBadgeClass(guideline.priority)}`}>
                Priority {guideline.priority} of 9
              </span>
              <h1 className="text-3xl font-bold text-[#1E293B] mb-2">{guideline.title}</h1>
              <p className="text-lg text-slate-600 leading-relaxed"></p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* Full Description */}
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold text-[#1E293B] mb-5">Description</h2>
          <div className="space-y-4">
            {guideline.fullDescription.map((para, i) => (
              <p key={i} className="text-slate-600 leading-relaxed">{para}</p>
            ))}
          </div>
        </div>

        {/* Running Example Accordion */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-8 text-left"
            onClick={() => setExampleOpen(!exampleOpen)}
          >
            <div>
              <div className="text-xs font-semibold text-[#0F766E] mb-1 uppercase tracking-wide">Running Example</div>
              <h2 className="text-lg font-bold text-[#1E293B]">Applied to the Lathe Training Simulator</h2>
            </div>
            <span className="text-slate-400 flex-shrink-0 ml-4">
              {exampleOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </span>
          </button>

          {exampleOpen && (
            <div className="px-8 pb-8 border-t border-slate-100 pt-6">
              <div className="mb-6">
                {/* Figure A */}
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].includes(guideline.id) ? (
                  <div className="rounded-xl overflow-hidden border border-slate-200">
                    <img
                      src={guideline.id === 1 ? gutasksImg : guideline.id === 2 ? ergonomicImg : guideline.id === 3 ? multimodalImg : guideline.id === 4 ? guidedTaskImg : guideline.id === 5 ? cognitiveImg : guideline.id === 6 ? realismImg : guideline.id === 7 ? embodiedImg : guideline.id === 8 ? accessibilityImg : gamificationImg}
                      alt={guideline.figureLabel}
                      className="w-full object-contain"
                    />
                    <div className="px-4 py-2 bg-slate-50 border-t border-slate-200">
                      <span className="text-xs text-slate-500 font-medium">{guideline.figureLabel}</span>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center border border-slate-200">
                    <div className="text-center p-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-300 flex items-center justify-center mx-auto mb-3">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <rect x="2" y="2" width="16" height="16" rx="2" stroke="#94A3B8" strokeWidth="1.5" />
                          <circle cx="7" cy="7" r="2" fill="#94A3B8" />
                          <path d="M2 14l4-4 3 3 3-4 6 5" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div className="text-xs text-slate-500 font-medium">{guideline.figureLabel}</div>
                    </div>
                  </div>
                )}
              </div>

              <p className="text-slate-600 leading-relaxed mb-5">{guideline.latheExample}</p>

              <div>
                <h4 className="font-semibold text-[#1E293B] text-sm mb-3">Implementation Highlights</h4>
                <ul className="space-y-2">
                  {guideline.latheHighlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                      <CheckCircle2 size={16} className="text-[#0F766E] flex-shrink-0 mt-0.5" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2">
          {prevGuideline ? (
            <button
              onClick={() => onNavigate("guideline-detail", prevGuideline.id)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-600 hover:border-[#0F766E]/30 hover:text-[#0F766E] transition-colors shadow-sm"
            >
              <ArrowLeft size={15} />
              <span>
                <div className="text-xs text-slate-400 font-normal text-left">Previous</div>
                {prevGuideline.title}
              </span>
            </button>
          ) : <div />}

          {nextGuideline ? (
            <button
              onClick={() => onNavigate("guideline-detail", nextGuideline.id)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-600 hover:border-[#0F766E]/30 hover:text-[#0F766E] transition-colors shadow-sm ml-auto"
            >
              <span className="text-right">
                <div className="text-xs text-slate-400 font-normal">Next</div>
                {nextGuideline.title}
              </span>
              <ArrowRight size={15} />
            </button>
          ) : (
            <button
              onClick={() => onNavigate("your-project")}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0F766E] text-white text-sm font-semibold hover:bg-[#0A5E57] transition-colors ml-auto"
            >
              Go to Your Project
              <ArrowRight size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 py-8 bg-[#1E293B] text-center">
        <p className="text-slate-400 text-sm">
          Developed as part of a Master's research on immersive training interfaces · PPGDesign UFPR
        </p>
      </footer>
    </div>
  );
}
