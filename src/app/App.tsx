import { useState } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, SlidersHorizontal } from "lucide-react";

// ─── Multi-select hook ────────────────────────────────────
const EXCLUSIVE_OPTS = ["Don't mind", "Don't know"];

function useMultiSelect() {
  const [sel, setSel] = useState<Set<string>>(new Set());
  const toggle = (value: string) => {
    setSel((prev) => {
      const next = new Set(prev);
      if (EXCLUSIVE_OPTS.includes(value)) {
        if (next.has(value)) { next.delete(value); }
        else { next.clear(); next.add(value); }
      } else {
        EXCLUSIVE_OPTS.forEach((e) => next.delete(e));
        if (next.has(value)) next.delete(value);
        else next.add(value);
      }
      return next;
    });
  };
  return [sel, toggle] as const;
}

// ─── Wireframe primitives ─────────────────────────────────

function WireImg({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`bg-stone-100 border-2 border-dashed border-stone-300 flex items-center justify-center rounded-xl text-stone-400 text-sm text-center px-3 py-2 ${className}`}>
      {label}
    </div>
  );
}

function FormatBadge({ type }: { type: "video" | "audio" | "text" | "image" }) {
  const map = {
    video: { label: "Video", cls: "bg-violet-50 text-violet-800 border-violet-200" },
    audio: { label: "Audio", cls: "bg-sky-50 text-sky-800 border-sky-200" },
    text: { label: "Text", cls: "bg-amber-50 text-amber-800 border-amber-200" },
    image: { label: "Image", cls: "bg-rose-50 text-rose-800 border-rose-200" },
  };
  const { label, cls } = map[type];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-semibold tracking-wide ${cls}`}>
      {label}
    </span>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-block bg-stone-100 border border-stone-200 text-stone-600 text-xs font-medium px-2.5 py-1 rounded-full">
      {label}
    </span>
  );
}

// ─── Shared UI ────────────────────────────────────────────

const P = "#1B5E47";
const FOCUS = "focus:outline-none focus:ring-4 focus:ring-emerald-200";

function NavBar({ title, onBack, step, hideBack }: { title: string; onBack?: () => void; step?: string; hideBack?: boolean }) {
  return (
    <div className="bg-white border-b border-stone-200 px-4 py-3 flex items-center gap-3 flex-shrink-0 min-h-[60px]">
      {!hideBack && onBack ? (
        <button onClick={onBack} style={{ color: P }} className={`font-semibold text-sm flex-shrink-0 rounded px-1 py-1 ${FOCUS}`} aria-label="Go back">
          Back
        </button>
      ) : (!hideBack && <div className="w-8 flex-shrink-0" />)}
      <div className="flex-1 min-w-0">
        <h1 className="text-[17px] font-semibold text-stone-900 leading-snug tracking-tight">{title}</h1>
        {step && <p className="text-sm text-stone-500 mt-0.5">{step}</p>}
      </div>
      {!hideBack && <div className="w-8 flex-shrink-0" />}
    </div>
  );
}

function ProgressBar({ n, total, label }: { n: number; total: number; label?: string }) {
  return (
    <div className="bg-white px-4 py-2.5 border-b border-stone-100 flex items-center gap-3 flex-shrink-0">
      <div className="flex-1 h-1.5 bg-stone-200 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-300" style={{ width: `${(n / total) * 100}%`, background: P }} />
      </div>
      <span className="text-xs font-medium text-stone-500 flex-shrink-0 tabular-nums">{label || `${n} of ${total}`}</span>
    </div>
  );
}

function BottomNav({ onBack, onHome, onNext, nextLabel = "Next" }: { onBack?: () => void; onHome?: () => void; onNext?: () => void; nextLabel?: string }) {
  return (
    <div className="p-4 pb-8 bg-white border-t border-stone-200 flex gap-3 flex-shrink-0">
      {onBack && (
        <button onClick={onBack} className={`flex-none min-h-[56px] px-6 border-2 border-stone-300 text-stone-700 text-[17px] font-semibold rounded-2xl hover:bg-stone-50 ${FOCUS} transition-colors`}>
          Back
        </button>
      )}
      {onHome && (
        <button onClick={onHome} className={`flex-none min-h-[56px] px-6 border-2 border-stone-300 text-stone-700 text-[17px] font-semibold rounded-2xl hover:bg-stone-50 ${FOCUS} transition-colors`}>
          Home
        </button>
      )}
      <button onClick={onNext} style={{ background: P }} className={`flex-1 min-h-[56px] text-white text-[17px] font-semibold rounded-2xl transition-colors ${FOCUS} hover:opacity-90`}>
        {nextLabel}
      </button>
    </div>
  );
}

function PrimaryBtn({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{ background: P }} className={`w-full min-h-[56px] text-white text-[17px] font-semibold rounded-2xl px-4 py-3 hover:opacity-90 ${FOCUS} transition-opacity`}>
      {label}
    </button>
  );
}

function OutlineBtn({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`w-full min-h-[56px] border-2 border-stone-300 text-stone-700 text-[17px] font-semibold rounded-2xl px-4 py-3 hover:bg-stone-50 ${FOCUS} transition-colors`}>
      {label}
    </button>
  );
}

function Opt({ label, note, selected, isExclusive, onClick, multi = false }: {
  label: string; note?: string; selected?: boolean; isExclusive?: boolean; onClick?: () => void; multi?: boolean;
}) {
  const sel = selected ?? false;
  return (
    <button onClick={onClick} className={`w-full text-left px-4 py-4 rounded-2xl border-2 flex items-center gap-4 min-h-[64px] transition-all ${FOCUS} ${isExclusive ? (sel ? "border-stone-500 bg-stone-50" : "border-stone-200 bg-white hover:border-stone-300") : (sel ? "border-[#1B5E47] bg-emerald-50" : "border-stone-200 bg-white hover:border-stone-300")}`}>
      <div className={`w-7 h-7 flex-shrink-0 flex items-center justify-center transition-colors border-2 ${multi ? "rounded-lg" : "rounded-full"} ${isExclusive ? (sel ? "border-stone-600 bg-stone-600" : "border-stone-300 bg-white") : (sel ? "border-[#1B5E47] bg-[#1B5E47]" : "border-stone-300 bg-white")}`}>
        {sel && <div className={`bg-white ${multi ? "w-2.5 h-2.5 rounded-sm" : "w-2.5 h-2.5 rounded-full"}`} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className={`text-[17px] font-semibold leading-snug ${isExclusive ? (sel ? "text-stone-800" : "text-stone-500") : (sel ? "text-emerald-900" : "text-stone-900")}`}>{label}</div>
        {note && <p className="text-sm text-stone-500 mt-0.5">{note}</p>}
      </div>
    </button>
  );
}

function ExclusiveOpts({ sel, toggle }: { sel: Set<string>; toggle: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-2 pb-2 border-b border-stone-100 mb-1">
      {EXCLUSIVE_OPTS.map((opt) => (
        <Opt key={opt} label={opt} selected={sel.has(opt)} isExclusive multi onClick={() => toggle(opt)} />
      ))}
    </div>
  );
}

function QuestionLayout({ title, hint, children, onBack, onHome, onNext, nextLabel, n, total }: {
  title: string; hint?: string; children: React.ReactNode; onBack?: () => void; onHome?: () => void; onNext?: () => void; nextLabel?: string; n: number; total: number;
}) {
  return (
    <div className="flex flex-col h-full bg-[#F6F3EE]">
      <NavBar title="Your story choices" onBack={onBack} />
      <ProgressBar n={n} total={total} />
      <div className="px-4 pt-5 pb-3 border-b border-stone-100 bg-[#F6F3EE] flex-shrink-0">
        <p className="text-[20px] font-semibold text-stone-900 leading-snug tracking-tight">{title}</p>
        {hint && <p className="text-sm text-black mt-1.5">{hint}</p>}
      </div>
      <div className="flex-1 overflow-auto px-4 pt-4 pb-2">
        <div className="space-y-2">{children}</div>
      </div>
      <BottomNav onBack={onBack} onHome={onHome} onNext={onNext} nextLabel={nextLabel} />
    </div>
  );
}

function SummaryRow({ label, value, onEdit }: { label: string; value: string; onEdit?: () => void }) {
  return (
    <div className="flex items-start gap-3 py-3.5 border-b border-stone-100 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest">{label}</p>
        <p className="text-[16px] font-medium text-stone-900 mt-1 leading-snug">{value}</p>
      </div>
      {onEdit && (
        <button onClick={onEdit} style={{ color: P }} className={`text-sm font-semibold flex-shrink-0 rounded px-2 py-1 hover:bg-emerald-50 ${FOCUS}`}>
          Change
        </button>
      )}
    </div>
  );
}

function TriggerWarning({ text }: { text: string }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
      <p className="text-sm font-semibold text-amber-800">Content note</p>
      <p className="text-sm text-amber-700 mt-0.5">{text}</p>
    </div>
  );
}

function InfoNote({ text }: { text: string }) {
  return (
    <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 text-sm text-sky-800">
      {text}
    </div>
  );
}

function FeedbackConfirm({ type }: { type: "more" | "avoid" }) {
  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-emerald-800 text-sm font-semibold">
      {type === "more" ? "Noted — we will show you more stories like this." : "Noted — we will avoid stories like this in future."}
    </div>
  );
}

// ─── PART 1: STORY SELECTION ──────────────────────────────

function SetupOverview({ nav }: { nav: (id: string) => void }) {
  const sections = [
    { id: "like-q1", title: "Choose the stories you would like.", subtitle: "Takes around 5 to 10 minutes", value: "Any stories" },
    { id: "avoid-q1", title: "Choose the stories you don't want.", subtitle: "Takes around 3 minutes", value: "None selected" },
    { id: "delivery-method", title: "Choose how you get your stories.", subtitle: "Takes about a minute", value: "Mid-morning on Mondays, by text" },
  ];
  return (
    <div className="flex flex-col h-full bg-[#F6F3EE]">
      <div className="bg-white border-b border-stone-200 px-4 pt-5 pb-4 flex-shrink-0">
        <div className="flex items-start justify-between gap-2">
          <h1 className="text-[22px] font-semibold text-stone-900 tracking-tight">Story choices</h1>
          <button
            className={`text-sm font-semibold py-2 px-2 -mr-1 -mt-1 rounded ${FOCUS} flex-shrink-0 transition-colors`}
            style={{ color: P }}
            aria-label="Log out"
          >
            Log out
          </button>
        </div>
        <p className="text-sm text-stone-500 mt-1">Tap a section to make your choices. You can change these at any time.</p>
      </div>
      <div className="flex-1 overflow-auto p-4 space-y-2.5">
        {sections.map((s) => (
          <button key={s.id} onClick={() => nav(s.id)} className={`w-full bg-white rounded-2xl border border-stone-200 p-4 text-left hover:border-[#1B5E47] ${FOCUS} transition-all`}>
            <h2 className="text-[16px] font-semibold text-black leading-snug">{s.title}</h2>
            <p className="text-sm font-light text-black mt-1">{s.subtitle}</p>
            <p className="text-sm mt-1 font-medium" style={{ color: P }}>{s.value}</p>
          </button>
        ))}
      </div>
      <div className="p-4 pb-8 bg-white border-t border-stone-200 flex-shrink-0">
        <PrimaryBtn label="Use these choices" onClick={() => nav("setup-done")} />
      </div>
    </div>
  );
}

// Q1 — How to receive (multi)
function LikeQ1({ nav }: { nav: (id: string) => void }) {
  const [sel, toggle] = useMultiSelect();
  return (
    <QuestionLayout title="How would you like to receive your stories?" hint="Choose as many as you like" n={1} total={9} onBack={() => nav("setup-overview")} onHome={() => nav("setup-overview")} onNext={() => nav("like-q2")}>
      <ExclusiveOpts sel={sel} toggle={toggle} />
      {["Video", "Sound", "Text"].map((o) => <Opt key={o} label={o} selected={sel.has(o)} onClick={() => toggle(o)} multi />)}
    </QuestionLayout>
  );
}

// Q2 — Length (single)
function LikeQ2({ nav }: { nav: (id: string) => void }) {
  const [sel, setSel] = useState<string | null>(null);
  return (
    <QuestionLayout title="How long would you like your stories to be?" hint="Choose one" n={2} total={9} onBack={() => nav("like-q1")} onHome={() => nav("setup-overview")} onNext={() => nav("like-q3")}>
      <div className="pb-2 border-b border-stone-100 mb-1 flex flex-col gap-2">
        {["Don't mind", "Don't know"].map((o) => <Opt key={o} label={o} selected={sel === o} onClick={() => setSel(o)} isExclusive />)}
      </div>
      {["Shorter", "Longer"].map((o) => <Opt key={o} label={o} selected={sel === o} onClick={() => setSel(o)} />)}
    </QuestionLayout>
  );
}

// Q3 — Who tells (multi)
function LikeQ3({ nav }: { nav: (id: string) => void }) {
  const [sel, toggle] = useMultiSelect();
  return (
    <QuestionLayout title="Who would you prefer to tell the story?" hint="Choose as many as you like" n={3} total={9} onBack={() => nav("like-q2")} onHome={() => nav("setup-overview")} onNext={() => nav("like-q4")}>
      <ExclusiveOpts sel={sel} toggle={toggle} />
      {["Carer", "Person with dementia", "Partners", "Parent and sibling", "Friends"].map((o) => <Opt key={o} label={o} selected={sel.has(o)} onClick={() => toggle(o)} multi />)}
    </QuestionLayout>
  );
}

// Q4 — Topics (multi)
function LikeQ4({ nav }: { nav: (id: string) => void }) {
  const [sel, toggle] = useMultiSelect();
  return (
    <QuestionLayout title="What would you like your stories to be about?" hint="Choose as many as you like" n={4} total={9} onBack={() => nav("like-q3")} onHome={() => nav("setup-overview")} onNext={() => nav("like-q5")}>
      <ExclusiveOpts sel={sel} toggle={toggle} />
      {["Relationships", "Friendships", "Work", "Similar experiences", "Being understood", "Technology", "Hobbies", "Planning for the future"].map((o) => <Opt key={o} label={o} selected={sel.has(o)} onClick={() => toggle(o)} multi />)}
    </QuestionLayout>
  );
}

// Q5 — Useful? (single) → sample stories
function LikeQ5({ nav }: { nav: (id: string) => void }) {
  const [sel, setSel] = useState<string | null>(null);
  return (
    <QuestionLayout title="Would you like your stories to be useful, for example coping strategies or clinical information?" hint="Choose one" n={5} total={9} onBack={() => nav("like-q4")} onHome={() => nav("setup-overview")} onNext={() => nav("like-sample1")} nextLabel="Next — see sample stories">
      <div className="pb-2 border-b border-stone-100 mb-1 flex flex-col gap-2">
        {["Don't mind", "Don't know"].map((o) => <Opt key={o} label={o} selected={sel === o} onClick={() => setSel(o)} isExclusive />)}
      </div>
      {["Yes", "No"].map((o) => <Opt key={o} label={o} selected={sel === o} onClick={() => setSel(o)} />)}
    </QuestionLayout>
  );
}

// ─── One-at-a-time sample story viewer ───────────────────

interface StoryData {
  title: string;
  summary: string;
  format: "video" | "audio" | "text" | "image";
  length: string;
  watched?: string;
}

const STORY_SETS: Record<"set1" | "set2", StoryData[]> = {
  set1: [
    {
      title: "Managing the mornings — practical tips from a carer",
      summary: "Joan shares the small changes that helped her husband through difficult mornings — routines, lighting, and preparing things the night before.",
      format: "video",
      length: "About 5 minutes",
    },
    {
      title: "\"I still know who I am\" — Margaret",
      summary: "Margaret reflects on how life has changed since her diagnosis, what she holds on to, and where she finds joy each day.",
      format: "audio",
      length: "About 7 minutes",
      watched: "24 June 2015 at 13:43",
    },
  ],
  set2: [
    {
      title: "Two of us — Ali and Priya's story",
      summary: "Ali was diagnosed with young-onset dementia at 54. He and his wife Priya talk about what changed and what stayed the same.",
      format: "video",
      length: "About 6 minutes",
    },
    {
      title: "A different kind of family — Graham's story",
      summary: "Graham and his partner Dave talk about navigating caring and closeness, and finding community support that understood them.",
      format: "text",
      length: "About 600 words",
    },
  ],
};

function SingleSampleViewer({
  storySet, nav, prevScreen, nextScreen,
}: {
  storySet: "set1" | "set2"; nav: (id: string) => void; prevScreen: string; nextScreen: string;
}) {
  const stories = STORY_SETS[storySet];
  const [idx, setIdx] = useState(0);

  const respond = () => {
    if (idx < stories.length - 1) setIdx(idx + 1);
    else nav(nextScreen);
  };

  const story = stories[idx];

  return (
    <div className="flex flex-col h-full bg-[#F6F3EE]">
      <NavBar title="Sample stories" onBack={() => (idx > 0 ? setIdx(idx - 1) : nav(prevScreen))} />
      <div className="bg-white border-b border-stone-100 px-4 py-2.5 flex-shrink-0">
        <p className="text-xs font-medium text-stone-500 mb-1.5">Story {idx + 1} of {stories.length}</p>
        <div className="flex gap-1.5">
          {stories.map((_, i) => (
            <div key={i} className="flex-1 h-1 rounded-full transition-all" style={{ background: i <= idx ? P : "#e7e5e4" }} />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto px-4 pt-4 pb-2">
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          <WireImg label="Story thumbnail" className="w-full h-36 rounded-none border-0 rounded-t-2xl" />
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <FormatBadge type={story.format} />
              <span className="text-sm text-stone-400">{story.length}</span>
            </div>
            <p className="text-[17px] font-semibold text-stone-900 leading-snug">{story.title}</p>
            <p className="text-[14px] text-stone-600 leading-relaxed">{story.summary}</p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-3 pb-8 bg-white border-t border-stone-200 flex-shrink-0 space-y-3">
        <p className="text-[17px] font-semibold text-stone-900">Does this story interest you?</p>
        <div className="flex gap-2">
          {["Yes", "No", "Don't know"].map((opt) => (
            <button key={opt} onClick={respond} className={`flex-1 px-2 py-3.5 rounded-2xl border-2 text-[15px] font-semibold transition-all ${FOCUS} border-stone-200 bg-white text-stone-900 hover:border-[#1B5E47] hover:bg-emerald-50`}>
              {opt}
            </button>
          ))}
        </div>
        <OutlineBtn label="Skip sample stories" onClick={() => nav(nextScreen)} />
      </div>
    </div>
  );
}

function LikeSample1({ nav }: { nav: (id: string) => void }) {
  return <SingleSampleViewer storySet="set1" nav={nav} prevScreen="like-q5" nextScreen="like-q6" />;
}

// Q6 — Stage (multi)
function LikeQ6({ nav }: { nav: (id: string) => void }) {
  const [sel, toggle] = useMultiSelect();
  return (
    <QuestionLayout title="What stage of dementia would you like stories to be about?" hint="Choose as many as you like" n={6} total={9} onBack={() => nav("like-sample1")} onHome={() => nav("setup-overview")} onNext={() => nav("like-q7")}>
      <ExclusiveOpts sel={sel} toggle={toggle} />
      {["Pre-diagnosis", "Recent diagnosis", "Early", "Moderate", "Advanced", "Post-bereavement"].map((o) => <Opt key={o} label={o} selected={sel.has(o)} onClick={() => toggle(o)} multi />)}
    </QuestionLayout>
  );
}

// Q7 — Type of dementia (multi)
function LikeQ7({ nav }: { nav: (id: string) => void }) {
  const [sel, toggle] = useMultiSelect();
  return (
    <QuestionLayout title="What type of dementia would you like the stories to be about?" hint="Choose as many as you like" n={7} total={9} onBack={() => nav("like-q6")} onHome={() => nav("setup-overview")} onNext={() => nav("like-q8")}>
      <ExclusiveOpts sel={sel} toggle={toggle} />
      {["Alzheimer's disease", "Vascular dementia", "Lewy body dementia", "Frontotemporal dementia", "Mixed dementia", "Young-onset dementia"].map((o) => <Opt key={o} label={o} selected={sel.has(o)} onClick={() => toggle(o)} multi />)}
    </QuestionLayout>
  );
}

// Q8 — Tone (multi)
function LikeQ8({ nav }: { nav: (id: string) => void }) {
  const [sel, toggle] = useMultiSelect();
  return (
    <QuestionLayout title="What tone would you prefer?" hint="Choose as many as you like" n={8} total={9} onBack={() => nav("like-q7")} onHome={() => nav("setup-overview")} onNext={() => nav("like-q9")}>
      <ExclusiveOpts sel={sel} toggle={toggle} />
      {["Upbeat", "Downbeat", "Critical", "Neutral", "Reflective", "Anxious", "Grieving"].map((o) => <Opt key={o} label={o} selected={sel.has(o)} onClick={() => toggle(o)} multi />)}
    </QuestionLayout>
  );
}

// Q9 — Identity aspects (pure multi, no exclusives)
function LikeQ9({ nav }: { nav: (id: string) => void }) {
  const [sel, toggle] = useMultiSelect();
  return (
    <div className="flex flex-col h-full bg-[#F6F3EE]">
      <NavBar title="Your story choices" onBack={() => nav("like-q8")} />
      <ProgressBar n={9} total={9} />
      <div className="px-4 pt-5 pb-3 border-b border-stone-100 bg-[#F6F3EE] flex-shrink-0">
        <p className="text-[20px] font-semibold text-stone-900 leading-snug">Which of these, if any, are important to you?</p>
        <p className="text-sm text-stone-500 mt-1.5">Choose as many as you like, or continue without selecting any.</p>
      </div>
      <div className="flex-1 overflow-auto px-4 pt-4 pb-2 space-y-4">
        <div className="space-y-2">
          {["Ethnicity", "Sexuality", "Gender identity", "Relationships", "Living situation", "Geography (country/region)"].map((o) => (
            <Opt key={o} label={o} selected={sel.has(o)} onClick={() => toggle(o)} multi />
          ))}
        </div>
     
      </div>
      <BottomNav onBack={() => nav("like-q8")} onHome={() => nav("setup-overview")} onNext={() => nav("like-sample2")} nextLabel="Next" />
    </div>
  );
}

function LikeSample2({ nav }: { nav: (id: string) => void }) {
  return <SingleSampleViewer storySet="set2" nav={nav} prevScreen="like-q9" nextScreen="like-summary" />;
}

function LikeSummary({ nav }: { nav: (id: string) => void }) {
  return (
    <div className="flex flex-col h-full bg-[#F6F3EE]">
      <NavBar title="Your story choices" onBack={() => nav("like-sample2")} step="Review your choices" />
      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white rounded-2xl border border-stone-200 px-4 divide-y divide-stone-100">
          <SummaryRow label="How to receive" value="Video, Sound" onEdit={() => nav("like-q1")} />
          <SummaryRow label="Length" value="Shorter" onEdit={() => nav("like-q2")} />
          <SummaryRow label="Who tells the story" value="Person with dementia, A couple (partners)" onEdit={() => nav("like-q3")} />
          <SummaryRow label="What about" value="Family relationships, Hobbies, Being understood" onEdit={() => nav("like-q4")} />
          <SummaryRow label="Useful information?" value="Yes" onEdit={() => nav("like-q5")} />
          <SummaryRow label="Stage" value="Early, Moderate" onEdit={() => nav("like-q6")} />
          <SummaryRow label="Type of dementia" value="Alzheimer's disease" onEdit={() => nav("like-q7")} />
          <SummaryRow label="Tone" value="Reflective, Upbeat" onEdit={() => nav("like-q8")} />
          <SummaryRow label="Aspects to reflect" value="Ethnicity, Geography" onEdit={() => nav("like-q9")} />
        </div>
      </div>
      <div className="p-4 pb-8 bg-white border-t border-stone-200 flex-shrink-0">
        <PrimaryBtn label="Next" onClick={() => nav("setup-overview")} />
      </div>
    </div>
  );
}

function AvoidQ1({ nav }: { nav: (id: string) => void }) {
  const [sel, toggle] = useMultiSelect();
  const [otherText, setOtherText] = useState("");
  const avoidOpts = ["Nothing. I am happy to see any kind of story","Stories involving hospitals or medical settings", "Stories involving death or bereavement", "Stories involving conflict or difficult relationships", "Stories about moving to a care home", "Something else"];
  const hasOther = sel.has("Something else");
  return (
    <div className="flex flex-col h-full bg-[#F6F3EE]">
      <NavBar title="Stories you don't want" onBack={() => nav("setup-overview")} />
      <div className="px-4 pt-5 pb-3 border-b border-stone-100 bg-[#F6F3EE] flex-shrink-0">
        <p className="text-[20px] font-semibold text-stone-900 leading-snug">Are there any kinds of stories you would like us to avoid?</p>
        <p className="text-sm text-stone-500 mt-1.5">Choose as many as you like</p>
      </div>
      <div className="flex-1 overflow-auto px-4 pt-4 pb-2 space-y-4">
        <div className="space-y-2">
          {avoidOpts.map((o) => <Opt key={o} label={o} selected={sel.has(o)} onClick={() => toggle(o)} multi isExclusive={o === "Nothing — I am happy to see any kind of story"} />)}
        </div>
        {hasOther && (
          <div className="space-y-2">
            <label htmlFor="avoid-other" className="text-[16px] font-semibold text-stone-900 block">Please describe what you would like us to avoid</label>
            <textarea id="avoid-other" value={otherText} onChange={(e) => setOtherText(e.target.value)} rows={3} placeholder="For example: stories about loneliness" className={`w-full border-2 border-stone-300 rounded-xl p-3 text-[16px] text-stone-900 ${FOCUS} focus:border-[#1B5E47] resize-none bg-white`} />
          </div>
        )}
      </div>
      <BottomNav onBack={() => nav("setup-overview")} onHome={() => nav("setup-overview")} onNext={() => nav("avoid-summary")} />
    </div>
  );
}

function AvoidSummary({ nav }: { nav: (id: string) => void }) {
  return (
    <div className="flex flex-col h-full bg-[#F6F3EE]">
      <NavBar title="Stories you don't want" onBack={() => nav("avoid-q1")} step="Review your choices" />
      <div className="flex-1 overflow-auto p-4 space-y-4">
        <div className="bg-white rounded-2xl border border-stone-200 px-4 divide-y divide-stone-100">
          <SummaryRow label="Topics to avoid" value="Stories involving death or bereavement; Stories about loneliness" onEdit={() => nav("avoid-q1")} />
        </div>
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 space-y-2">
          <p className="text-[15px] font-semibold text-amber-800">About your "Something else" preference</p>
          <p className="text-[15px] text-amber-900 leading-relaxed">You have said you do not like stories about <strong>loneliness</strong>. We will use this information in the follow-on study.</p>
          <p className="text-[15px] text-amber-900 leading-relaxed">However, the current study cannot filter for this specific topic, so there is still a chance you may receive stories that mention it.</p>
        </div>
      </div>
      <div className="p-4 pb-8 bg-white border-t border-stone-200 flex-shrink-0">
        <PrimaryBtn label="Next" onClick={() => nav("setup-overview")} />
      </div>
    </div>
  );
}

function DeliveryMethod({ nav }: { nav: (id: string) => void }) {
  const [sel, setSel] = useState<string | null>(null);
  return (
    <div className="flex flex-col h-full bg-[#F6F3EE]">
      <NavBar title="Story delivery" onBack={() => nav("setup-overview")} step="Step 1 of 3" />
      <ProgressBar n={1} total={3} label="Delivery method" />
      <div className="px-4 pt-5 pb-3 border-b border-stone-100 bg-[#F6F3EE] flex-shrink-0">
        <p className="text-[20px] font-semibold text-stone-900 leading-snug">How would you like stories to be sent to you?</p>
      </div>
      <div className="flex-1 overflow-auto px-4 pt-4 pb-2 space-y-4">
        <div className="space-y-2">
          <Opt label="Text message" note="Sent to your mobile phone" selected={sel === "sms"} onClick={() => setSel("sms")} />
          <Opt label="WhatsApp" note="Sent via the WhatsApp app" selected={sel === "whatsapp"} onClick={() => setSel("whatsapp")} />
          <Opt label="Email" note="Sent to your email address" selected={sel === "email"} onClick={() => setSel("email")} />
        </div>
      </div>
      <BottomNav onBack={() => nav("setup-overview")} onHome={() => nav("setup-overview")} onNext={() => nav(sel === "whatsapp" ? "delivery-whatsapp" : "delivery-time")} />
    </div>
  );
}

function DeliveryWhatsApp({ nav }: { nav: (id: string) => void }) {
  const [num, setNum] = useState("");
  return (
    <div className="flex flex-col h-full bg-[#F6F3EE]">
      <NavBar title="Story delivery" onBack={() => nav("delivery-method")} step="WhatsApp setup" />
      <ProgressBar n={1} total={3} label="WhatsApp setup" />
      <div className="px-4 pt-5 pb-3 border-b border-stone-100 bg-[#F6F3EE] flex-shrink-0">
        <p className="text-[20px] font-semibold text-stone-900 leading-snug">Set up WhatsApp delivery</p>
      </div>
      <div className="flex-1 overflow-auto px-4 pt-4 pb-2 space-y-5">
        <InfoNote text="We will send you a test message to make sure WhatsApp is working correctly before your first story is sent." />
        <div className="space-y-2.5">
          <label htmlFor="wa-num" className="text-[16px] font-semibold text-stone-900 block">Your WhatsApp phone number</label>
          <input id="wa-num" type="tel" value={num} onChange={(e) => setNum(e.target.value)} placeholder="e.g. 07700 900 000" className={`w-full border-2 border-stone-300 rounded-2xl p-4 text-xl font-semibold ${FOCUS} focus:border-[#1B5E47] bg-white text-stone-900 placeholder:text-stone-400`} />
          <p className="text-sm text-stone-500">Enter the number linked to your WhatsApp account.</p>
        </div>
        
      </div>
      <BottomNav onBack={() => nav("delivery-method")} onHome={() => nav("setup-overview")} onNext={() => nav("delivery-time")} nextLabel="Send test and continue" />
    </div>
  );
}

function DeliveryTime({ nav }: { nav: (id: string) => void }) {
  const [sel, setSel] = useState<string | null>(null);
  return (
    <div className="flex flex-col h-full bg-[#F6F3EE]">
      <NavBar title="Story delivery" onBack={() => nav("delivery-method")} step="Step 2 of 3" />
      <ProgressBar n={2} total={3} label="Time of day" />
      <div className="px-4 pt-5 pb-3 border-b border-stone-100 bg-[#F6F3EE] flex-shrink-0">
        <p className="text-[20px] font-semibold text-stone-900 leading-snug">What time of day would you like to receive stories?</p>
      </div>
      <div className="flex-1 overflow-auto px-4 pt-4 pb-2 space-y-4">
        <div className="space-y-2">
          {[{ id: "early", label: "Early morning", note: "Around 7–9am" }, { id: "mid", label: "Mid-morning", note: "Around 9–11am" }, { id: "lunch", label: "Lunchtime", note: "Around 12–2pm" }, { id: "afternoon", label: "Afternoon", note: "Around 2–5pm" }, { id: "evening", label: "Evening", note: "Around 5–8pm" }].map((t) => <Opt key={t.id} label={t.label} note={t.note} selected={sel === t.id} onClick={() => setSel(t.id)} />)}
        </div>
      </div>
      <BottomNav onBack={() => nav("delivery-method")} onHome={() => nav("setup-overview")} onNext={() => nav("delivery-days")} />
    </div>
  );
}

function DeliveryDays({ nav }: { nav: (id: string) => void }) {
  const days = [
    { full: "Monday", short: "Mon" },
    { full: "Tuesday", short: "Tue" },
    { full: "Wednesday", short: "Wed" },
    { full: "Thursday", short: "Thu" },
    { full: "Friday", short: "Fri" },
    { full: "Saturday", short: "Sat" },
    { full: "Sunday", short: "Sun" },
  ];
  const [sel, setSel] = useState<Set<string>>(new Set());
  const toggle = (d: string) => {
    const next = new Set(sel);
    if (next.has(d)) { next.delete(d); setSel(next); return; }
    if (next.size >= 3) return;
    next.add(d);
    setSel(next);
  };
  return (
    <div className="flex flex-col h-full bg-[#F6F3EE]">
      <NavBar title="Story delivery" onBack={() => nav("delivery-time")} step="Step 3 of 3" />
      <ProgressBar n={3} total={3} label="Days of the week" />
      <div className="px-4 pt-5 pb-3 border-b border-stone-100 bg-[#F6F3EE] flex-shrink-0">
        <p className="text-[20px] font-semibold text-stone-900 leading-snug">Which days would you like to receive stories?</p>
        <p className="text-sm text-stone-500 mt-1.5">Choose up to three days</p>
      </div>
      <div className="flex-1 overflow-auto px-4 pt-4 pb-2 space-y-4">
        {sel.size >= 3 && <InfoNote text="You have chosen 3 days. To add a different day, tap one of your chosen days to remove it first." />}
        <div className="grid grid-cols-2 gap-2">
          {days.map((d) => (
            <Opt key={d.full} label={d.short} selected={sel.has(d.full)} onClick={() => toggle(d.full)} multi />
          ))}
        </div>
      </div>
      <BottomNav onBack={() => nav("delivery-time")} onHome={() => nav("setup-overview")} onNext={() => nav("delivery-summary")} />
    </div>
  );
}

function DeliverySummary({ nav }: { nav: (id: string) => void }) {
  return (
    <div className="flex flex-col h-full bg-[#F6F3EE]">
      <NavBar title="Review your choices" onBack={() => nav("delivery-days")} step="Check all is correct" />
      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white rounded-2xl border border-stone-200 px-4 divide-y divide-stone-100">
          <SummaryRow label="Delivery method" value="Text message" onEdit={() => nav("delivery-method")} />
          <SummaryRow label="Time of day" value="Mid-morning (9–11am)" onEdit={() => nav("delivery-time")} />
          <SummaryRow label="Days" value="Monday, Wednesday, Friday" onEdit={() => nav("delivery-days")} />
        </div>
      </div>
      <div className="p-4 pb-8 bg-white border-t border-stone-200 flex-shrink-0">
        <PrimaryBtn label="Next" onClick={() => nav("setup-overview")} />
      </div>
    </div>
  );
}

function SetupDone({ nav }: { nav: (id: string) => void }) {
  return (
    <div className="flex flex-col h-full bg-[#F6F3EE]">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-[26px] font-semibold text-stone-900 tracking-tight">All set</h1>
        <p className="text-[18px] text-stone-600 mt-4 leading-relaxed">Your next story will be sent to your phone on Monday morning.</p>
        <p className="text-[15px] text-stone-500 mt-3">You have chosen shorter length video and audio stories that are told by carers or people with dementia. You would kike stories about friendships and work, at a pre-diagnosis and recent diagnosis stage of dementia..</p>
      </div>
      <div className="p-4 pb-8 bg-[#F6F3EE] flex-shrink-0">
        <PrimaryBtn label="Go back to choices" onClick={() => nav("setup-overview")} />
      </div>
    </div>
  );
}

// ─── PART 2: STORY BROWSING ──────────────────────────────

interface BrowseStory {
  title: string;
  summary: string;
  format: "video" | "audio" | "text";
  tags: string[];
  watched?: string;
  length?: string;
  warning?: string;
}

const BROWSE_STORIES: BrowseStory[] = [
  {
    title: '"I still know who I am"',
    summary: "Margaret, 74, on staying connected to the things she loves.",
    format: "video",
    tags: ["person with dementia", "being understood"],
    watched: "24 June 2015 at 13:43",
    length: "About 4 minutes",
    warning: "This story describes conflict or a difficult relationship.",
  },
  {
    title: "A carer's perspective",
    summary: "David on learning to ask for help.",
    format: "audio",
    tags: ["carer", "relationships"],
    length: "About 3 minutes"
  },
  {
    title: "Finding the words",
    summary: "A first-hand account of life after diagnosis.",
    format: "text",
    tags: ["shorter", "similar experiences"],
    watched: "24 June 2015 at 15:03",
    length: "About 1 minute"
  },
  {
    title: "Our Welsh village",
    summary: "How a community came together after Mair's husband was diagnosed.",
    format: "video",
    tags: ["a couple", "friendships"],
    length: "About 5 minutes"
  },
];

function BrowseMain({ nav, onOpenStory }: { nav: (id: string) => void; onOpenStory: (story: BrowseStory) => void }) {
  const [query, setQuery] = useState("");
  const stories = BROWSE_STORIES;
  return (
    <div className="flex flex-col h-full bg-[#F6F3EE]">
      <div className="bg-white border-b border-stone-200 px-4 py-4 flex-shrink-0">
        <h1 className="text-[20px] font-semibold text-stone-900 tracking-tight">Browse stories</h1>
      </div>
      <div className="bg-white px-4 py-3 border-b border-stone-200 flex gap-2.5 flex-shrink-0">
        <div className="flex-1 flex items-center gap-2 bg-stone-100 border border-stone-200 rounded-xl px-3 py-2.5 focus-within:border-[#1B5E47] focus-within:ring-2 focus-within:ring-emerald-200">
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search stories…" className="flex-1 bg-transparent text-[16px] text-stone-900 placeholder-stone-400 focus:outline-none" />
        </div>
        <button onClick={() => nav("browse-filters")} className={`flex items-center px-4 py-2.5 border border-stone-200 rounded-xl font-semibold text-stone-700 hover:border-stone-300 ${FOCUS} bg-white text-[15px]`}>
          Filter
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {stories.map((s) => (
          <button key={s.title} onClick={() => onOpenStory(s)} className={`w-full bg-white rounded-2xl border border-stone-200 p-3.5 text-left hover:border-[#1B5E47] ${FOCUS} transition-all`}>
            <div className="flex gap-3.5">
              <div className="w-24 flex-shrink-0">
                <WireImg label="Thumb" className="w-24 h-20 text-xs" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[16px] font-semibold text-stone-900 leading-snug line-clamp-2">{s.title}</p>
                <p className="text-sm text-stone-500 mt-1 line-clamp-2">{s.summary}</p>
                {s.watched && <p className="text-[11px] text-stone-500 mt-1">Watched: {s.watched}</p>}
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2.5"><FormatBadge type={s.format} />{s.tags.map((t) => <Tag key={t} label={t} />)}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function BrowseFilters({ nav }: { nav: (id: string) => void }) {
  const [active, setActive] = useState<Set<string>>(new Set());
  const toggle = (v: string) => {
    const n = new Set(active);

    if (v === "yes") {
      n.delete("no");
      n.add("informational");
      setActive(n);
      return;
    }

    if (v === "no") {
      n.delete("informational");
      setActive(n);
      return;
    }

    if (n.has(v)) n.delete(v);
    else n.add(v);
    setActive(n);
  };
  const groups = [
    { label: "Length", opts: ["shorter", "longer"] },
    { label: "Who tells the story", opts: ["carer", "person with dementia", "a couple"] },
    { label: "What about", opts: ["relationships", "friendships", "work", "similar experiences", "being understood", "technology", "hobbies", "planning for the future"] },
    { label: "Tone", opts: ["upbeat", "downbeat", "critical", "neutral", "reflective", "anxious", "grieving"] },
    { label: "Provides information", opts: ["yes", "no"] },
  ];
  return (
    <div className="flex flex-col h-full bg-[#F6F3EE]">
      <NavBar title="Filter stories" onBack={() => nav("browse-main")} />
      {active.size > 0 && (
        <div className="bg-white px-4 py-2.5 border-b border-stone-200 flex items-center gap-2 flex-wrap flex-shrink-0">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Active filters:</span>
          {[...active].map((f) => (
            <button key={f} onClick={() => toggle(f)} style={{ background: P }} className={`text-white text-xs font-semibold px-2.5 py-1 rounded-full ${FOCUS}`}>
              {f}
            </button>
          ))}
        </div>
      )}
      <div className="flex-1 overflow-auto p-4 space-y-6">
        {groups.map((g) => (
          <div key={g.label}>
            <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-2.5">{g.label}</h2>
            <div className="flex flex-wrap gap-2">
              {g.opts.map((opt) => (
                <button
                  key={opt}
                  onClick={() => toggle(opt)}
                  style={(opt === "yes" ? active.has("informational") : active.has(opt)) ? { background: P, borderColor: P } : {}}
                  className={`px-3 py-1.5 rounded-lg border text-[13px] font-semibold transition-all ${FOCUS} ${(opt === "yes" ? active.has("informational") : active.has(opt)) ? "text-white" : "border-stone-200 bg-white text-stone-700 hover:border-stone-300"}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 pb-8 bg-white border-t border-stone-200 space-y-2.5 flex-shrink-0">
        <PrimaryBtn label={`Show stories${active.size > 0 ? ` — ${active.size} filter${active.size > 1 ? "s" : ""} active` : ""}`} onClick={() => nav("browse-main")} />
        <OutlineBtn label="Clear all filters" onClick={() => setActive(new Set())} />
      </div>
    </div>
  );
}

function BrowseStoryDetail({ nav, story }: { nav: (id: string) => void; story: BrowseStory }) {
  const [feedback, setFeedback] = useState<"more" | "avoid" | null>(null);
  return (
    <div className="flex flex-col h-full bg-[#F6F3EE]">
      <NavBar title="Story details" onBack={() => nav("browse-main")} />
      <div className="flex-1 overflow-auto p-4 space-y-4">
        <WireImg label="Story thumbnail" className="w-full h-44" />
        <div>
          <h2 className="text-[20px] font-semibold text-stone-900 leading-snug">{story.title}</h2>
          <p className="text-[16px] text-stone-600 mt-2 leading-relaxed">{story.summary}</p>
        </div>
        {story.warning && <TriggerWarning text={story.warning} />}
        <div className="flex flex-wrap gap-2 items-center">
          <FormatBadge type={story.format} />
          <span className="text-sm text-stone-500">{story.length || "About 4 minutes"}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">{story.tags.map((t) => <Tag key={t} label={t} />)}</div>
        {feedback && <FeedbackConfirm type={feedback} />}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest">Your feedback</p>
          <div className="flex gap-3">
            <button onClick={() => setFeedback("more")} className={`flex-1 py-3.5 rounded-xl border-2 font-semibold text-[15px] transition-all ${FOCUS} ${feedback === "more" ? "border-emerald-500 bg-emerald-50 text-emerald-800" : "border-stone-200 bg-white text-stone-700 hover:border-stone-300"}`}>More like this</button>
            <button onClick={() => { setFeedback("avoid"); nav("browse-feedback"); }} className={`flex-1 py-3.5 rounded-xl border-2 font-semibold text-[15px] transition-all ${FOCUS} ${feedback === "avoid" ? "border-red-400 bg-red-50 text-red-800" : "border-stone-200 bg-white text-stone-700 hover:border-stone-300"}`}>Avoid in future</button>
             <button onClick={() => { setFeedback(null); nav("browse-feedback"); }} className={`flex-1 py-3.5 rounded-xl border-2 font-semibold text-[15px] transition-all ${FOCUS} ${feedback === "avoid" ? "border-red-400 bg-red-50 text-red-800" : "border-stone-200 bg-white text-stone-700 hover:border-stone-300"}`}>Done</button>
          </div>
        </div>
      </div>
      <div className="p-4 pb-8 bg-white border-t border-stone-200 flex-shrink-0">
        <PrimaryBtn label="Watch this story" onClick={() => nav("consume-c2-video")} />
      </div>
    </div>
  );
}

function BrowseFeedback({ nav }: { nav: (id: string) => void }) {
  const [sel, toggle] = useMultiSelect();
  const [other, setOther] = useState("");
  const [done, setDone] = useState(false);
  if (done) {
    return (
      <div className="flex flex-col h-full bg-[#F6F3EE]">
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-[24px] font-semibold text-stone-900">Thank you</h1>
          <p className="text-[17px] text-stone-600 mt-3 leading-relaxed">We will use your feedback to improve your stories.</p>
        </div>
        <div className="p-4 pb-8 bg-[#F6F3EE] flex-shrink-0">
          <OutlineBtn label="Go back to stories" onClick={() => nav("browse-main")} />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full bg-[#F6F3EE]">
      <NavBar title="What would you like to avoid?" onBack={() => nav("browse-story-detail")} />
      <div className="flex-1 overflow-auto px-4 pt-5 pb-2 space-y-4">
        <p className="text-[16px] text-stone-600 leading-relaxed">This helps us improve the stories we send you. You do not have to tell us.</p>
        <div className="space-y-2">
          {["The topic or subject matter", "The tone or style", "The format (e.g. video)", "The length", "A content note was missing"].map((o) => <Opt key={o} label={o} selected={sel.has(o)} onClick={() => toggle(o)} multi />)}
        </div>
        <div className="space-y-2">
          <label className="text-[16px] font-semibold text-stone-900 block">Anything else? (optional)</label>
          <textarea value={other} onChange={(e) => setOther(e.target.value)} rows={2} placeholder="Tell us anything else you would like us to know" className={`w-full border-2 border-stone-300 rounded-xl p-3 text-[16px] ${FOCUS} focus:border-[#1B5E47] resize-none bg-white text-stone-900 placeholder:text-stone-400`} />
        </div>
      </div>
      <div className="p-4 pb-8 bg-white border-t border-stone-200 space-y-2.5 flex-shrink-0">
        <PrimaryBtn label="Send feedback" onClick={() => setDone(true)} />
        <OutlineBtn label="Skip" onClick={() => nav("browse-main")} />
      </div>
    </div>
  );
}

// ─── PART 3: STORY CONSUMPTION ───────────────────────────

function ConsumeC1({ nav }: { nav: (id: string) => void }) {
  return (
    <div className="flex flex-col h-full bg-[#F6F3EE]">
      <div className="bg-white border-b border-stone-200 px-4 py-4 flex-shrink-0">
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1">Story for you</p>
        <h1 className="text-[20px] font-semibold text-stone-900 leading-snug">{"\"I still know who I am\""}</h1>
      </div>
      <div className="flex-1 overflow-auto p-4 space-y-4">
        <WireImg label="Story thumbnail" className="w-full h-44" />
        <p className="text-[17px] text-stone-700 leading-relaxed">Margaret, 74, talks about living well with a dementia diagnosis and what still brings her joy each day. Filmed at her home in Cardiff.</p>
        <div className="flex flex-wrap gap-2 items-center">
          <FormatBadge type="video" />
          <span className="text-[15px] text-stone-500">About 4 minutes</span>
        </div>
        <TriggerWarning text="This story describes conflict or a difficult relationship." />
      </div>
      <div className="p-4 pb-8 bg-white border-t border-stone-200 space-y-2.5 flex-shrink-0">
        <PrimaryBtn label="Watch this story" onClick={() => nav("consume-c2-video")} />
        <OutlineBtn label="Not now — go back" onClick={() => nav("consume-c4")} />
      </div>
    </div>
  );
}

function ConsumeC2Video({ nav }: { nav: (id: string) => void }) {
  const [playing, setPlaying] = useState(false);
  const [feedback, setFeedback] = useState<"more" | "avoid" | null>(null);
  return (
    <div className="flex flex-col h-full bg-stone-950">
      <div className="bg-stone-900 px-4 py-3 flex items-center gap-3 border-b border-stone-800 flex-shrink-0">
        <button onClick={() => nav("consume-c1")} className={`text-stone-300 font-semibold text-sm rounded px-1 py-1 ${FOCUS}`}>Back</button>
        <h1 className="text-[16px] font-semibold text-white flex-1 truncate">{"\"I still know who I am\""}</h1>
      </div>
      <div className="bg-black flex items-center justify-center flex-shrink-0" style={{ height: 224 }}>
        {!playing ? (
          <button onClick={() => setPlaying(true)} className={`w-20 h-20 rounded-full bg-white/90 flex items-center justify-center ${FOCUS} hover:bg-white transition-colors`} aria-label="Play video">
            <Play size={34} className="text-stone-900 ml-2" />
          </button>
        ) : (
          <div className="w-full px-6 flex flex-col items-center gap-4">
            <button onClick={() => setPlaying(false)} className={`w-16 h-16 rounded-full bg-white/90 flex items-center justify-center ${FOCUS}`} aria-label="Pause">
              <Pause size={28} className="text-stone-900" />
            </button>
            <div className="w-full">
              <div className="w-full h-1.5 bg-stone-700 rounded-full"><div className="w-1/3 h-full bg-white rounded-full" /></div>
              <div className="flex justify-between mt-1"><span className="text-stone-400 text-xs">1:22</span><span className="text-stone-400 text-xs">4:05</span></div>
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 bg-[#F6F3EE] overflow-auto p-4 space-y-4">
        <h2 className="text-[18px] font-semibold text-stone-900">{"\"I still know who I am\" — Margaret"}</h2>
        <p className="text-[15px] text-stone-600 leading-relaxed">Margaret talks about what brings her joy and how she stays connected to the people she loves.</p>
        {feedback && <FeedbackConfirm type={feedback} />}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest">Your feedback</p>
          <div className="flex gap-3">
            <button onClick={() => setFeedback("more")} className={`flex-1 py-3.5 rounded-xl border-2 font-semibold text-[15px] transition-all ${FOCUS} ${feedback === "more" ? "border-emerald-500 bg-emerald-50 text-emerald-800" : "border-stone-200 bg-white text-stone-700 hover:border-stone-300"}`}>More like this</button>
            <button onClick={() => { setFeedback("avoid"); nav("consume-c3"); }} className={`flex-1 py-3.5 rounded-xl border-2 font-semibold text-[15px] transition-all ${FOCUS} ${feedback === "avoid" ? "border-red-400 bg-red-50 text-red-800" : "border-stone-200 bg-white text-stone-700 hover:border-stone-300"}`}>Avoid in future</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConsumeC2Text({ nav }: { nav: (id: string) => void }) {
  return (
    <div className="flex flex-col h-full bg-white">
      <NavBar title={"\"Finding the words\""} onBack={() => nav("consume-c1")} step="Page 1 of 3" />
      <div className="flex-1 overflow-auto px-5 py-5 space-y-5">
        <p className="text-xs font-medium text-stone-400 tracking-wider">Page 1 of 3 · About 800 words</p>
        <div className="space-y-5 text-[18px] text-stone-800 leading-relaxed">
          <p>When they first told me, I sat in the car for a long time. My wife was there. She held my hand. Neither of us said anything.</p>
          <p>I do not feel like I have lost myself. Not yet. I still know what I like. I still know who I love. I still know the words to every song I grew up with.</p>
          <p>The hardest part is not what people think it is. It is not the forgetting. It is watching others worry about you.</p>
        </div>
      </div>
      <div className="bg-white border-t border-stone-200 px-4 py-3 space-y-2.5 flex-shrink-0">
        <div className="flex gap-3 mb-1">
          <button className={`flex-1 py-3 rounded-xl border border-stone-200 font-semibold text-[15px] text-stone-700 hover:border-stone-300 ${FOCUS}`}>More like this</button>
          <button onClick={() => nav("consume-c3")} className={`flex-1 py-3 rounded-xl border border-stone-200 font-semibold text-[15px] text-stone-700 hover:border-stone-300 ${FOCUS}`}>Avoid in future</button>
        </div>
        <PrimaryBtn label="Next page" onClick={() => { }} />
      </div>
    </div>
  );
}

function ConsumeC3({ nav }: { nav: (id: string) => void }) {
  const [sel, toggle] = useMultiSelect();
  const [other, setOther] = useState("");
  return (
    <div className="flex flex-col h-full bg-[#F6F3EE]">
      <NavBar title="What would you like to avoid?" onBack={() => nav("consume-c2-video")} />
      <div className="flex-1 overflow-auto px-4 pt-5 pb-2 space-y-4">
        <div>
          <p className="text-[20px] font-semibold text-stone-900 leading-snug">What would you like us to avoid in future stories?</p>
          <p className="text-[15px] text-stone-500 mt-2 leading-relaxed">You do not have to answer. Tap Skip if you prefer not to.</p>
        </div>
        <div className="space-y-2">
          {["The topic or subject matter", "The tone or style", "The format (e.g. video)", "The length", "A content note was missing"].map((o) => <Opt key={o} label={o} selected={sel.has(o)} onClick={() => toggle(o)} multi />)}
        </div>
        <div className="space-y-2">
          <label className="text-[16px] font-semibold text-stone-900 block">Anything else? (optional)</label>
          <textarea value={other} onChange={(e) => setOther(e.target.value)} rows={2} placeholder="Tell us more if you would like to" className={`w-full border-2 border-stone-300 rounded-xl p-3 text-[16px] ${FOCUS} focus:border-[#1B5E47] resize-none bg-white text-stone-900 placeholder:text-stone-400`} />
        </div>
      </div>
      <div className="p-4 pb-8 bg-white border-t border-stone-200 space-y-2.5 flex-shrink-0">
        <PrimaryBtn label="Send feedback" onClick={() => nav("consume-c4")} />
        <OutlineBtn label="Skip" onClick={() => nav("consume-c4")} />
      </div>
    </div>
  );
}

function ConsumeC4({ nav }: { nav: (id: string) => void }) {
  return (
    <div className="flex flex-col h-full bg-[#F6F3EE]">
      <div className="flex-1 overflow-auto flex flex-col items-center justify-center p-6 text-center gap-0">
        <h1 className="text-[26px] font-semibold text-stone-900 tracking-tight">All done</h1>
        <p className="text-[18px] text-stone-600 mt-4 leading-relaxed">Thank you for watching. Your next story will arrive on Wednesday.</p>
        <p className="text-[15px] text-stone-500 mt-3">You can close this page and return to your messages.</p>
        
      </div>
      <div className="p-4 pb-8 bg-[#F6F3EE] flex-shrink-0">
        <OutlineBtn label="Browse more stories" onClick={() => nav("browse-main")} />
      </div>
    </div>
  );
}

// ─── Screen registry ─────────────────────────────────────

type AnnotationType = "note" | "question" | "access";

interface ScreenDef {
  label: string;
  part: string;
  render: (nav: (id: string) => void, context?: { selectedBrowseStory: BrowseStory | null; setSelectedBrowseStory: (story: BrowseStory | null) => void }) => React.ReactNode;
  annotations: { type: AnnotationType; text: string }[];
}

const SCREENS: Record<string, ScreenDef> = {
  "setup-overview": {
    label: "Setup overview", part: "Part 1 — Story Selection", render: (nav) => <SetupOverview nav={nav} />,
    annotations: [
      { type: "note", text: "This screen shows the current or default value for each section. All three sections are tappable. Participants can just select 'Use these choices' immediately." },
      { type: "note", text: "Defaults are chosen before any user input: 'Any stories', 'None selected', and a delivery schedule set during onboarding." },
      { type: "access", text: "Primary action button is always visible without scrolling. All tap targets minimum 64px height." },
    ],
  },
  "like-q1": {
    label: "Like — Q1: How to receive", part: "Part 1 — Story Selection", render: (nav) => <LikeQ1 nav={nav} />,
    annotations: [
      { type: "note", text: "Multi-select. 'Don't mind' and 'Don't know' are exclusive — selecting either clears all other choices. Selecting a specific option clears the exclusive ones." },
      { type: "note", text: "Bottom nav has both Back and Next. Next is always enabled — users can continue without selecting anything." },
    ],
  },
  "like-q2": {
    label: "Like — Q2: Length", part: "Part 1 — Story Selection", render: (nav) => <LikeQ2 nav={nav} />,
    annotations: []
  },
  "like-q3": { label: "Like — Q3: Who tells the story", part: "Part 1 — Story Selection", render: (nav) => <LikeQ3 nav={nav} />, annotations: [{ type: "note", text: "Multi-select. 'Don't mind' and 'Don't know' are exclusive." }] },
  "like-q4": { label: "Like — Q4: What about", part: "Part 1 — Story Selection", render: (nav) => <LikeQ4 nav={nav} />, annotations: 
  [{ type: "note", text: "Multi-select with 8 topics. 'Don't mind' and 'Don't know' are exclusive." },
    { type: "question", text: "Is 8 topics too many, can we reduce them?" },
  ] },
  "like-q5": {
    label: "Like — Q5: Useful?", part: "Part 1 — Story Selection", render: (nav) => <LikeQ5 nav={nav} />,
    annotations: [
      { type: "question", text: "Are there clearer examples of what we mean by 'useful?'" },
    ],
  },
  "like-sample1": {
    label: "Sample stories (after Q5)", part: "Part 1 — Story Selection", render: (nav) => <LikeSample1 nav={nav} />,
    annotations: [
      { type: "note", text: "We found in the usability study that showing examples of stories that reflect choices so far is is useful context." },
       { type: "note", text: "Participantcs can press the thumbnail to view/listen to/read the story." },
      { type: "note", text: "Shows one story at a time. User answers 'Does this story interest you?' with Yes / No / Don't know. Tapping any answer advances automatically to the next story." },
      { type: "note", text: "'Skip sample stories' is always available as a secondary action." },
    ],
  },
  "like-q6": { label: "Like — Q6: Stage", part: "Part 1 — Story Selection", render: (nav) => <LikeQ6 nav={nav} />, annotations: [{ type: "question", text: "Could we condense the choices here?" }] },
  "like-q7": {
    label: "Like — Q7: Type of dementia", part: "Part 1 — Story Selection", render: (nav) => <LikeQ7 nav={nav} />,
    annotations: [
      { type: "note", text: "Multi-select. 'Don't mind' and 'Don't know' are exclusive." },
      { type: "question", text: "Early usability testing suggested that choices around dementia type may be too complex? Also wondering if it will be rare that coders will be able tospecify this?" },
    ],
  },
  "like-q8": { label: "Like — Q8: Tone", part: "Part 1 — Story Selection", render: (nav) => <LikeQ8 nav={nav} />, annotations: [{ type: "question", text: "Can we reduce the number of options?" }] },
  "like-q9": {
    label: "Like — Q9: Identity aspects", part: "Part 1 — Story Selection", render: (nav) => <LikeQ9 nav={nav} />,
    annotations: [
      { type: "note", text: "Multi-select, no exclusive options. User can continue without selecting any (implying none of these are important to them)." },
      { type: "question", text: "Presumably when answering these they're wanting a match to their own identity. For example, a person with Afro-Caribbean heritage who selects 'Ethnicity' is indicating that they are interested in stories that reflect this heritage? If so, we will need to capture this information for the system to respond to these choices." },
    ],
  },
  "like-sample2": { label: "Sample stories (after Q9)", part: "Part 1 — Story Selection", render: (nav) => <LikeSample2 nav={nav} />, annotations: [] },
  "like-summary": {
    label: "Like — Summary", part: "Part 1 — Story Selection", render: (nav) => <LikeSummary nav={nav} />,
    annotations: [
      { type: "note", text: "Each row shows label and current value. 'Change' links directly to the relevant question. User returns to this summary after editing, not to the full flow." },
      
    ],
  },
  "avoid-q1": {
    label: "Avoidance — Q1", part: "Part 1 — Story Selection", render: (nav) => <AvoidQ1 nav={nav} />,
    annotations: [
      { type: "note", text: "'Nothing. I am happy to see any kind of story' is exclusive and clears all others. 'Something else' reveals a free-text field." },
      { type: "question", text: "How should 'Something else' free-text be stored and used? Is there a character limit or content moderation?" },
    ],
  },
  "avoid-summary": {
    label: "Avoidance — Summary", part: "Part 1 — Story Selection", render: (nav) => <AvoidSummary nav={nav} />,
    annotations: [
      { type: "note", text: "Study limitation warning shown when 'Something else' free text was entered. This is because the system will not know how to avoid whatever is written.  We give the option as it's useful data for the project." },
    ],
  },
  "delivery-method": {
    label: "Delivery — Method", part: "Part 1 — Story Selection", render: (nav) => <DeliveryMethod nav={nav} />,
    annotations: [
      { type: "note", text: "Single-select. Selecting WhatsApp adds an extra screen. Other methods skip straight to time selection." },
      { type: "question", text: "If the user selects WhatsApp but does not have it installed, then it will not be set up and other default options (SMS) will be used." },
    ],
  },
  "delivery-whatsapp": {
    label: "Delivery — WhatsApp setup", part: "Part 1 — Story Selection", render: (nav) => <DeliveryWhatsApp nav={nav} />,
    annotations: [
      { type: "note", text: "Only shown when WhatsApp is selected." },
      { type: "question", text: "Does the user need to opt in via WhatsApp before this step? How is the number verified? Can the user return to the app from WhatsApp after setup?" },
    ],
  },
  "delivery-time": { label: "Delivery — Time of day", part: "Part 1 — Story Selection", render: (nav) => <DeliveryTime nav={nav} />, annotations: [{ type: "note", text: "Single-select. Descriptive time ranges, not specific times." }] },
  "delivery-days": {
    label: "Delivery — Days", part: "Part 1 — Story Selection", render: (nav) => <DeliveryDays nav={nav} />,
    annotations: [
      { type: "question", text: "Max 3 days. Is this reasonable? Presumably daily is too much? When the limit is reached, an informational note explains how to change a choice." }
    ],
  },
  "delivery-summary": { label: "Delivery — Summary", part: "Part 1 — Story Selection", render: (nav) => <DeliverySummary nav={nav} />, annotations: [{ type: "note", text: "Editable summary. Each row links directly to the relevant step." }] },
  "setup-done": {
    label: "Setup confirmation", part: "Part 1 — Story Selection", render: (nav) => <SetupDone nav={nav} />,
    annotations: [
      { type: "note", text: "Shown after 'I'm happy with these choices'. Message is personalised to the delivery schedule." },
      { type: "note", text: "User can return to choices — this is not a dead end." },
    ],
  },
  "browse-main": { label: "Browse — Main", part: "Part 2 — Story Browsing", render: (nav, context) => <BrowseMain nav={nav} onOpenStory={(story) => { context?.setSelectedBrowseStory(story); nav("browse-story-detail"); }} />, annotations: [{ type: "note", text: "Search bar and Filter button always visible. Story cards scroll below." },{ type: "note", text: "This is an interface a participant can come to at any time to browse the full collection of stories. The only stories missing are those that match to stories a participant has indicated they do not want to see (in the setup flow)" },] },
  "browse-filters": {
    label: "Browse — Filters", part: "Part 2 — Story Browsing", render: (nav) => <BrowseFilters nav={nav} />,
    annotations: [
        
      { type: "note", text: "Full-screen filter view on mobile. Active filters shown as tappable pills — tapping removes the filter." },
      { type: "note", text: "'Clear all filters' is a secondary button — harder to tap accidentally." },
    ],
  },
  "browse-story-detail": {
    label: "Browse — Story detail", part: "Part 2 — Story Browsing", render: (nav, context) => <BrowseStoryDetail nav={nav} story={context?.selectedBrowseStory || BROWSE_STORIES[0]} />,
    annotations: [
      { type: "note", text: "Full metadata visible before user commits. Content note shown before the CTA." },
      { type: "note", text: "Feedback buttons visible on this screen — not hidden after consumption." },
    ],
  },
  "browse-feedback": { label: "Browse — Avoid feedback", part: "Part 2 — Story Browsing", render: (nav) => <BrowseFeedback nav={nav} />, annotations: [{ type: "note", text: "Multi-select, all optional. Skip always available." }] },
  "consume-c1": {
    label: "C1 — Story summary", part: "Part 3 — Story Consumption", render: (nav) => <ConsumeC1 nav={nav} />,
    annotations: [
      { type: "note", text: "First screen shown when the user opens a story link. Gives enough information to decide whether to continue." },
      { type: "note", text: "Content note shown before the primary action. 'Not now' is always visible." },
    ],
  },
  "consume-c2-video": {
    label: "C2 — Video story", part: "Part 3 — Story Consumption", render: (nav) => <ConsumeC2Video nav={nav} />,
    annotations: [
      { type: "note", text: "Large play/pause button. If autoplay is blocked by the browser, the play button is shown immediately." },
      { type: "note", text: "Feedback buttons visible below the video — not hidden." },
    ],
  },
  "consume-c2-text": {
    label: "C2 — Text story", part: "Part 3 — Story Consumption", render: (nav) => <ConsumeC2Text nav={nav} />,
    annotations: [
      { type: "note", text: "Large readable text (18px). Long stories paginated. Feedback and Next page both visible without scrolling." },
      { type: "question", text: "Are text story pages pre-split server-side or split in the browser?" },
    ],
  },
  "consume-c3": { label: "C3 — Avoid feedback", part: "Part 3 — Story Consumption", render: (nav) => <ConsumeC3 nav={nav} />, annotations: [{ type: "note", text: "Shown after 'Avoid in future'. Skip always available." }] },
  "consume-c4": {
    label: "C4 — Completion", part: "Part 3 — Story Consumption", render: (nav) => <ConsumeC4 nav={nav} />,
    annotations: [
      { type: "note", text: "Final screen. Shows next delivery date. Offers path to browse more stories." },
      { type: "question", text: "Is it possible to return the user to the app that triggered the link? If yes, add a 'Return to messages' button here." },
    ],
  },
};

const SCREEN_ORDER = [
  "setup-overview",
  "like-q1", "like-q2", "like-q3", "like-q4", "like-q5",
  "like-sample1",
  "like-q6", "like-q7", "like-q8", "like-q9",
  "like-sample2", "like-summary",
  "avoid-q1", "avoid-summary",
  "delivery-method", "delivery-whatsapp", "delivery-time", "delivery-days", "delivery-summary",
  "setup-done",
  "browse-main", "browse-filters", "browse-story-detail", "browse-feedback",
  "consume-c1", "consume-c2-video", "consume-c2-text", "consume-c3", "consume-c4",
];

const PARTS = ["Part 1 — Story Selection", "Part 2 — Story Browsing", "Part 3 — Story Consumption"];

const ANNOTATION_STYLES: Record<AnnotationType, string> = {
  note: "bg-sky-50/80 border-sky-200 text-sky-900",
  question: "bg-amber-50/80 border-amber-200 text-amber-900",
  access: "bg-violet-50/80 border-violet-200 text-violet-900",
};

const ANNOTATION_LABELS: Record<AnnotationType, string> = {
  note: "Interaction note",
  question: "Design question",
  access: "Accessibility",
};

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-shrink-0" style={{ width: 390, filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.5))" }}>
      <div className="rounded-[44px] border-[5px] border-stone-700 overflow-hidden bg-white flex flex-col" style={{ height: 780 }}>
        <div className="bg-stone-900 flex items-center justify-between px-6 py-2.5 flex-shrink-0">
          <span className="text-white text-[12px] font-semibold tracking-wide">9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="flex items-end gap-px">{[2, 3, 4, 5].map((h) => <div key={h} className="w-1 rounded-sm bg-white/80" style={{ height: h * 3 }} />)}</div>
            <Volume2 size={11} className="text-white/70 ml-1" />
            <div className="w-6 h-3 border border-white/60 rounded-sm relative ml-1">
              <div className="absolute inset-0.5 right-1 bg-white/80 rounded-sm" />
              <div className="absolute right-[-3px] top-1/2 -translate-y-1/2 w-1 h-1.5 bg-white/40 rounded-r-sm" />
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">{children}</div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentId, setCurrentId] = useState("setup-overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedBrowseStory, setSelectedBrowseStory] = useState<BrowseStory | null>(BROWSE_STORIES[0]);

  const screen = SCREENS[currentId];
  const currentIdx = SCREEN_ORDER.indexOf(currentId);
  const goTo = (id: string) => { if (SCREENS[id]) setCurrentId(id); };

  return (
    <div className="flex h-screen overflow-hidden" style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: "#f4f1eb" }}>
      <aside className="flex-shrink-0 bg-[#f7f4ee] border-r border-stone-200 overflow-y-auto transition-all duration-200" style={{ width: sidebarOpen ? 210 : 0, overflow: sidebarOpen ? undefined : "hidden" }}>
        <div className="px-4 py-4 border-b border-stone-200">
          <p className="text-[13px] font-semibold text-stone-700">Wireframe viewer</p>
          <p className="text-[11px] text-stone-500 mt-0.5">{SCREEN_ORDER.length} screens</p>
        </div>
        <nav className="py-2">
          {PARTS.map((part) => {
            const ids = SCREEN_ORDER.filter((id) => SCREENS[id]?.part === part);
            const short = part.replace(/Part \d — /, "");
            return (
              <div key={part}>
                <div className="px-4 pt-4 pb-1.5"><p className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest">{short}</p></div>
                {ids.map((id) => (
                  <button key={id} onClick={() => goTo(id)} className="w-full text-left px-4 py-2 text-[13px] transition-colors focus:outline-none" style={id === currentId ? { color: "#1f2937", fontWeight: 600, borderLeft: `3px solid ${P}`, paddingLeft: "13px", background: "#ece8df" } : { color: "#6b7280" }}>
                    {SCREENS[id]?.label}
                  </button>
                ))}
              </div>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-[#f7f4ee] border-b border-stone-200 px-4 py-3 flex items-center gap-4 flex-shrink-0">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded text-stone-500 hover:text-stone-700 focus:outline-none transition-colors">
            <SlidersHorizontal size={16} />
          </button>
          <div className="flex-1 min-w-0">
            <span className="text-[11px] text-stone-500 font-medium block">{screen?.part}</span>
            <span className="text-[14px] text-stone-800 font-semibold">{screen?.label}</span>
          </div>
          <div className="flex gap-1.5">
            <button onClick={() => currentIdx > 0 && goTo(SCREEN_ORDER[currentIdx - 1])} disabled={currentIdx === 0} className="px-3 py-1.5 rounded-lg text-[13px] font-semibold text-stone-600 hover:text-stone-800 focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 border border-stone-300 hover:border-stone-400 transition-all bg-white">
              <ChevronLeft size={14} /> Prev
            </button>
            <button onClick={() => currentIdx < SCREEN_ORDER.length - 1 && goTo(SCREEN_ORDER[currentIdx + 1])} disabled={currentIdx === SCREEN_ORDER.length - 1} className="px-3 py-1.5 rounded-lg text-[13px] font-semibold text-stone-600 hover:text-stone-800 focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 border border-stone-300 hover:border-stone-400 transition-all bg-white">
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-8 bg-[#efeae0]">
          <div className="flex gap-8 items-start">
            <PhoneFrame>{screen?.render(goTo, { selectedBrowseStory, setSelectedBrowseStory })}</PhoneFrame>

            <div className="flex-1 max-w-[280px] space-y-4 min-w-0">
              <div>
                <h2 className="text-[15px] font-semibold text-stone-800">{screen?.label}</h2>
                <p className="text-[12px] text-stone-500 mt-0.5">{screen?.part}</p>
              </div>

              {screen?.annotations.map((a, i) => (
                <div key={i} className={`rounded-xl border p-3.5 text-[13px] leading-relaxed ${ANNOTATION_STYLES[a.type]}`}>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1.5">{ANNOTATION_LABELS[a.type]}</p>
                  {a.text}
                </div>
              ))}

              {currentId === "setup-overview" && (
                <div className="rounded-xl border border-stone-300 bg-white p-4 space-y-3">
                  <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">User flow</p>
                  {[
                    ["Setup hub", "Like Q1–Q5 → Sample → Q6–Q9 → Sample → Summary"],
                    ["Setup hub", "Avoid Q1 → Summary"],
                    ["Setup hub", "Delivery method → [WhatsApp?] → Time → Days → Summary"],
                    ["Setup hub", "Confirm → Done"],
                    ["Browse", "Filters → Story detail → [Feedback]"],
                    ["Link opens", "C1 → C2 Story → [C3 Feedback] → C4"],
                  ].map(([from, to]) => (
                    <div key={from + to} className="text-[12px] leading-relaxed">
                      <span className="text-stone-700 font-semibold">{from} </span>
                      <span className="text-stone-400">→ </span>
                      <span className="text-stone-500">{to}</span>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-[11px] text-stone-500 text-center">{currentIdx + 1} / {SCREEN_ORDER.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
