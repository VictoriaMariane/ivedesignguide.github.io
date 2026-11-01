import { useState } from "react";
import victoriaPhoto from "@/imports/1783614786540.jpg";
import marcioPhoto from "@/imports/1706197966644.jpg";
import vrTrainingImg from "@/imports/111.png";
import latheVideo from "@/imports/WhatsApp_Video_2026-09-12_at_19.16.46.mp4";
import {
  ListChecks, Armchair, Layers, Footprints, Brain, Eye, Hand, Accessibility, Gamepad2,
  ArrowRight, ChevronDown, ChevronUp, ExternalLink, Users, BookOpen, Award
} from "lucide-react";
import { guidelines, priorityBadgeClass } from "../data/guidelines";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  ListChecks, Armchair, Layers, Footprints, Brain, Eye, Hand, Accessibility, Gamepad2,
};

const faqs = [
  {
    q: "What is the IVE Design Guide?",
    a: "The Immersive Virtual Environment Design Guide, developed by Victoria Silva, consists of a set of 9 validated design guidelines for immersive training interfaces. The guide is straightforward, has been validated through extensive applications, is easy for developers to understand, and can be applied to any immersive virtual environment, especially for industrial applications.",
  },
  {
    q: "What will you find in the IVE Design Guide?",
    a: "The IVE Design Guide is a checklist checklist for developing user interfaces in VR. With IVE, your development team can track the project's progress while applying evidence-based design guidelines. It also generates publication-ready scientific figures for your papers and presentations.",
  },
  {
    q: "How is the IVE Design Guide licensed? How should it be acknowledged?",
    a: "The IVE Design Guide is a software registered in Brazil. The ownership of generated figures fully remains with the user of the tool. If you use this guide in the scientific context, we would appreciate an acknowledgement in the form of a citation.",
  },
];

const team = [
  {
    name: "Victoria Silva",
    role: "UX/UI Designer and Lead Developer",
    initials: "VS",
    photo: victoriaPhoto as string,
    linkedin: "https://www.linkedin.com/in/victoriamariane/",
    lattes: "http://lattes.cnpq.br/5227951650435301",
    color: "#0F766E",
  },
  {
    name: "Prof. PhD. Marcio Catapan",
    role: "Research Supervisor",
    initials: "MC",
    photo: marcioPhoto as string,
    linkedin: "https://www.linkedin.com/in/marciocatapan/",
    lattes: "http://lattes.cnpq.br/9702014055794665",
    color: "#0EA5E9",
  },
];

const publications = [
  {
    title: "Virtual reality for engineering education: the design and evaluation of a lathe training ",
    authors: "Silva, V.; Catapan, M.",
    venue: "Master's Thesis, Federal University of Paraná (UFPR), 2024.",
  },
  {
    title: "Best practices for designing immersive industrial training interfaces",
    authors: "Silva, V.; Catapan, M.",
    venue: "Proceedings of the International Conference on Human-Computer Interaction, 2024.",
  },
];

interface HomePageProps {
  onNavigate: (page: "home" | "guidelines" | "guideline-detail" | "your-project", guidelineId?: number) => void;
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function LattesIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <rect x="2" y="2" width="20" height="20" rx="3" opacity="0.15" />
      <rect x="5" y="7" width="2" height="10" rx="1" />
      <rect x="9" y="7" width="2" height="10" rx="1" />
      <rect x="13" y="7" width="5" height="2" rx="1" />
      <rect x="13" y="11" width="4" height="2" rx="1" />
      <rect x="13" y="15" width="5" height="2" rx="1" />
    </svg>
  );
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-16">
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center">
        {/* Background gradient + pattern */}
        <div className="absolute inset-0 hero-gradient-subtle" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #0F766E 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Decorative blobs */}
        <div className="absolute top-[-80px] right-[-80px] w-[480px] h-[480px] rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle, #0F766E 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-60px] left-[-60px] w-[320px] h-[320px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #0EA5E9 0%, transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
          <div className="fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F766E]/10 text-[#0F766E] text-xs font-semibold mb-6 border border-[#0F766E]/20">
              &nbsp;&nbsp;
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-[#1E293B] leading-tight tracking-tight mb-6">
              IVE Design
              <span className="block text-[#0F766E]">Guide</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-lg">
              9 validated guidelines for designing the user interface for virtual environments, especially immersive training.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate("guidelines")}
                className="px-7 py-3.5 rounded-xl bg-[#0F766E] text-white font-semibold text-sm hover:bg-[#0A5E57] transition-all hover:shadow-lg hover:shadow-[#0F766E]/25 flex items-center gap-2"
              >
                Explore Guidelines
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => onNavigate("your-project")}
                className="px-7 py-3.5 rounded-xl bg-white text-[#0F766E] font-semibold text-sm border-2 border-[#0F766E] hover:bg-[#F0FDF9] transition-all flex items-center gap-2"
              >
                Your Project
              </button>
            </div>

            <div className="mt-12 flex items-center gap-8">
            </div>
          </div>

          {/* Hero illustration / VR card */}
          <div className="fade-in fade-in-delay-2 hidden md:flex flex-col gap-4">
            {/* VR training screenshot */}
            <div className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/60 border border-slate-100 relative">
              <img
                src={vrTrainingImg}
                alt="VR Training Interface — Lathe Simulator"
                className="w-full rounded-xl object-cover"
              />
              <div className="absolute top-9 right-9">
                <div className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                  Validated
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: BookOpen, label: "Open Source", color: "#0F766E" },
                { icon: Users, label: "Expert Validated", color: "#0EA5E9" },
                { icon: Award, label: "SUS Tested", color: "#7C3AED" },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 flex flex-col items-center gap-2 text-center">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: item.color + "18" }}>
                    <item.icon size={16} style={{ color: item.color }} />
                  </div>
                  <span className="text-xs font-medium text-slate-600">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTEXT ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold mb-6">
              About the guide
            </div>
            <h2 className="text-3xl font-bold text-[#1E293B] mb-6">Design better immersive environments</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              This guide, with a set of 9 validated design guidelines, is the most comprehensive solution for developing your VR. Developed through a rigorous Delphi process with domain experts, each guideline is grounded in scientific literature and validated through real-world application.
            </p>
          </div>
        </div>
      </section>

      {/* ─── USE CASE EXAMPLE ─── */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F766E]/10 text-[#0F766E] text-xs font-semibold mb-4">
              Case Study
            </div>
            <h2 className="text-3xl font-bold text-[#1E293B]">Applied throughout the guide</h2>
            <p className="text-slate-500 mt-3">A real-world case study used to illustrate every guideline</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-200/60 border border-slate-100">
              <div className="aspect-video bg-black relative overflow-hidden">
                <video
                  src={latheVideo}
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                />
              </div>
              <div className="p-8 grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-bold text-[#1E293B] mb-3">Lathe Training Simulator</h3>
                  <p className="text-slate-600 leading-relaxed mb-5">
                    Developed by LabMeta UFPR, with all 9 guidelines applied, this industrial training simulator was evaluated with an SUS score of 88.33, placing it in the "Best Imaginable" usability range.
                  </p>
                  <a
                    href="https://www.youtube.com/watch?v=ouaZRY0n-J8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F766E] text-white text-sm font-semibold hover:bg-[#0A5E57] transition-colors"
                  >
                    See full experience
                    <ExternalLink size={14} />
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "88.33", label: "SUS Score" },
                    { value: "10", label: "GUTasks" },
                    { value: "9", label: "Guidelines" },
                    { value: "<5 min", label: "Duration" },
                  ].map((s) => (
                    <div key={s.label} className="bg-[#F8FAFC] rounded-xl p-4 text-center border border-slate-100">
                      <div className="text-xl font-bold text-[#0F766E]">{s.value}</div>
                      <div className="text-xs font-semibold text-slate-700 mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── GUIDELINES PREVIEW ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F766E]/10 text-[#0F766E] text-xs font-semibold mb-4">
              9 Guidelines
            </div>
            <h2 className="text-3xl font-bold text-[#1E293B]">The guidelines for your user interface</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              Each guideline is ranked by priority, derived from expert consensus, and illustrated with the lathe training case.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {guidelines.map((g, i) => {
              const Icon = iconMap[g.iconName];
              return (
                <button
                  key={g.id}
                  onClick={() => onNavigate("guideline-detail", g.id)}
                  className={`card-lift bg-[#F8FAFC] rounded-2xl p-6 text-left border border-slate-100 hover:border-[#0F766E]/30 group fade-in`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0F766E]/10 flex items-center justify-center group-hover:bg-[#0F766E]/15 transition-colors">
                      <Icon size={20} className="text-[#0F766E]" />
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${priorityBadgeClass(g.priority)}`}>
                      P{g.priority}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#1E293B] mb-2 text-sm leading-snug">{g.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{g.shortDesc}</p>
                  <div className="mt-4 flex items-center text-xs font-semibold text-[#0F766E] gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    View details <ArrowRight size={12} />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate("guidelines")}
              className="px-7 py-3.5 rounded-xl bg-[#0F766E] text-white font-semibold text-sm hover:bg-[#0A5E57] transition-all hover:shadow-lg hover:shadow-[#0F766E]/25 flex items-center gap-2 mx-auto"
            >
              See all guidelines
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#1E293B]">Meet the team behind the IVE Design Guide</h2>
            <p className="text-slate-500 mt-3">Researchers from the Federal University of Paraná</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="card-lift bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex flex-col items-center text-center max-w-xs"
              >
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-20 h-20 rounded-2xl object-cover mb-5 shadow-lg"
                  />
                ) : (
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-5 shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${member.color}, ${member.color}99)` }}
                  >
                    {member.initials}
                  </div>
                )}
                <h3 className="font-bold text-[#1E293B] text-base">{member.name}</h3>
                <p className="text-sm text-slate-500 mt-1 mb-5">{member.role}</p>
                <div className="flex gap-3">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] text-xs font-semibold hover:bg-[#0A66C2]/20 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <LinkedInIcon size={13} />
                    LinkedIn
                  </a>
                  <a
                    href={member.lattes}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0F766E]/10 text-[#0F766E] text-xs font-semibold hover:bg-[#0F766E]/20 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <LattesIcon size={13} />
                    Lattes
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1E293B]">Frequently asked questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-[#1E293B] text-sm leading-snug pr-4">{faq.q}</span>
                  <span className="text-slate-400 flex-shrink-0">
                    {openFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MORE INFORMATION ─── */}
      <section className="py-20 bg-gradient-to-br from-[#0F766E] to-[#0EA5E9]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">More information needed?</h2>
          <p className="text-white/80 text-lg mb-12">Read our publication!</p>

          <div className="space-y-4 text-left">
            {publications.map((pub, i) => (
              <a
                key={i}
                href="https://www.researchgate.net/profile/Victoria-Silva-31?ev=hdr_xprf"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BookOpen size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm leading-snug mb-1">{pub.title}</p>
                    <p className="text-white/70 text-xs"></p>
                    <p className="text-white/60 text-xs mt-0.5 italic"></p>
                  </div>
                  <ExternalLink size={16} className="text-white/50 flex-shrink-0 mt-0.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-8 bg-[#1E293B] text-center">
        <p className="text-slate-400 text-sm">
          Developed as part of a Master's research on immersive training interfaces · PPGDesign UFPR
        </p>
        <p className="text-slate-600 text-xs mt-2">
          All rights reserved under UFPR · Msc Victoria Mariane Cardoso Silva · IVE Design Guide © 2026
        </p>
      </footer>
    </div>
  );
}
