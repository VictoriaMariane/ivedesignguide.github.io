import {
  ListChecks, Armchair, Layers, Footprints, Brain, Eye, Hand, Accessibility, Gamepad2, ArrowRight,
} from "lucide-react";
import { guidelines, priorityBadgeClass } from "../data/guidelines";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  ListChecks, Armchair, Layers, Footprints, Brain, Eye, Hand, Accessibility, Gamepad2,
};

interface GuidelinesPageProps {
  onNavigate: (page: "home" | "guidelines" | "guideline-detail" | "your-project", guidelineId?: number) => void;
}

export default function GuidelinesPage({ onNavigate }: GuidelinesPageProps) {
  return (
    <div className="pt-16 min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F766E]/10 text-[#0F766E] text-xs font-semibold mb-4">
              9 Evidence-based Guidelines
            </div>
            <h1 className="text-4xl font-bold text-[#1E293B] mb-4">Design Guidelines</h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Each guideline is ranked by expert-assigned priority, derived from an Delphi validation process, and illustrated with the lathe training simulator as a running example.
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guidelines.map((g, i) => {
            const Icon = iconMap[g.iconName];
            return (
              <button
                key={g.id}
                onClick={() => onNavigate("guideline-detail", g.id)}
                className={`card-lift bg-white rounded-2xl p-7 text-left border border-slate-100 hover:border-[#0F766E]/30 group fade-in shadow-sm`}
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#0F766E]/10 flex items-center justify-center group-hover:bg-[#0F766E]/18 transition-colors">
                    <Icon size={22} className="text-[#0F766E]" />
                  </div>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${priorityBadgeClass(g.priority)}`}>
                    Priority {g.priority}
                  </span>
                </div>
                <h3 className="font-bold text-[#1E293B] mb-2 text-base">{g.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{g.shortDesc}</p>
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center text-sm font-semibold text-[#0F766E] gap-1.5">
                  View details <ArrowRight size={14} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-white rounded-2xl p-10 border border-slate-100 shadow-sm text-center">
          <h3 className="text-2xl font-bold text-[#1E293B] mb-3">Ready to apply these guidelines?</h3>
          <p className="text-slate-500 mb-6">
            Use the interactive checklist to evaluate your own VR training project against each of the 9 guidelines.
          </p>
          <button
            onClick={() => onNavigate("your-project")}
            className="px-7 py-3.5 rounded-xl bg-[#0F766E] text-white font-semibold text-sm hover:bg-[#0A5E57] transition-all hover:shadow-lg hover:shadow-[#0F766E]/25 flex items-center gap-2 mx-auto"
          >
            Start Your Project Checklist
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 bg-[#1E293B] text-center">
        <p className="text-slate-400 text-sm">
          Developed as part of a Master's research on immersive training interfaces · Federal University of Paraná (UFPR)
        </p>
      </footer>
    </div>
  );
}
