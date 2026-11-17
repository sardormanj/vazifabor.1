"use client";
import { useEffect, useMemo, useState } from "react";
import { Search, MapPin, Plus, ShieldCheck } from "lucide-react";
import { supabase } from "./supabase";
import { SAMPLE_LISTINGS } from "./sampleData";
import { CATEGORIES, REGIONS, ADMIN_TELEGRAM, ADMIN_PHONE, formatPhone } from "./utils";
import ListingCard from "./ListingCard";
import ListingDetailModal from "./ListingDetailModal";
import PostModal from "./PostModal";

const SAFETY = [
  "Notanish odamga 100% oldindan to‘lov qilmang: avval kichik qismini, qolganini ish tugagach to‘lang.",
  "SMS kodlarni, karta CVV raqami va parollarni hech kimga aytmang.",
  "Kelishuvni Telegramda yozma ko‘rinishda olib boring: bu sizni himoya qiladi.",
  "Shaxsan uchrashsangiz, gavjum joyni tanlang va yaqinlaringizga xabar bering.",
  "Shubhali e’londan adminga Telegram orqali xabar bering.",
];

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="38" height="38" viewBox="0 0 40 40" aria-hidden="true">
        <path d="M20 3 6 8.5v10.2c0 9 6 15.6 14 18.3 8-2.7 14-9.3 14-18.3V8.5L20 3Z" fill="#4F46E5" />
        <path d="m13 20.5 5 5 9-10.5" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="31" cy="9" r="4.2" fill="#059669" />
      </svg>
      <div className="leading-tight">
        <div className="text-lg font-extrabold text-brand-dark">VazifaBor</div>
        <div className="hidden text-[11px] text-slate-500 sm:block">Ishonchli xizmatlar birjasi</div>
      </div>
    </div>
  );
}

function AdSlot({ className = "", tall = false }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white p-3 text-center ${tall ? "min-h-[250px]" : "min-h-[90px]"} ${className}`}>
      <span className="text-xs text-slate-500">Reklama joyi (Google AdSense / Hamkorlar uchun)</span>
      <a href={`https://t.me/${ADMIN_TELEGRAM}`} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-brand px-3 py-1.5 text-sm font-semibold text-brand hover:bg-indigo-50">Reklama berish</a>
    </div>
  );
}

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("job");
  const [category, setCategory] = useState("Barchasi");
  const [region, setRegion] = useState("Barcha hududlar");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("new");
  const [post, setPost] = useState(null);
  const [detail, setDetail] = useState(null);
  const [toastMsg, setToastMsg] = useState("");

  const toast = (m) => { setToastMsg(m); setTimeout(() => setToastMsg(""), 2200); };

  useEffect(() => {
    let alive = true;
    (async () => {
      let rows = SAMPLE_LISTINGS;
      try {
        const { data, error } = await supabase.from("listings").select("*").order("created_at", { ascending: false }).limit(100);
        if (!error && data && data.length) rows = data;
      } catch (e) {}
      if (!alive) return;
      setItems(rows);
      setLoading(false);
      const f = rows.find((x) => x.id === window.location.hash.slice(1));
      if (f) { setTab(f.type); setDetail(f); }
    })();

    const ch = supabase.channel("listings-live")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "listings" }, (p) => {
        setItems((prev) => (prev.some((x) => x.id === p.new.id) ? prev : [p.new, ...prev]));
      })
      .subscribe();
    return () => { alive = false; supabase.removeChannel(ch); };
  }, []);

  const handlePost = async (payload) => {
    const tempId = "tmp-" + Date.now();
    const optimistic = { ...payload, id: tempId, verified: false, rating: 0, completed_jobs: 0, created_at: new Date().toISOString() };
    setItems((prev) => [optimistic, ...prev]);
    setTab(payload.type);
    setPost(null);
    try {
      const { data, error } = await supabase.from("listings").insert(payload).select().single();
      if (error) throw error;
      setItems((prev) => [data, ...prev.filter((x) => x.id !== tempId && x.id !== data.id)]);
      toast("E’lon muvaffaqiyatli joylandi!");
    } catch (e) {
      toast("E’lon saqlanmadi. Internetni tekshirib, qayta urinib ko‘ring.");
      setItems((prev) => prev.filter((x) => x.id !== tempId));
    }
  };

  const counts = useMemo(() => ({
    job: items.filter((x) => x.type === "job").length,
    specialist: items.filter((x) => x.type === "specialist").length,
    done: items.reduce((s, x) => s + (x.completed_jobs || 0), 0),
  }), [items]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    let r = items.filter((x) =>
      x.type === tab &&
      (category === "Barchasi" || x.category === category) &&
      (region === "Barcha hududlar" || x.region === region) &&
      (!q || `${x.title} ${x.description} ${x.category} ${x.region}`.toLowerCase().includes(q))
    );
    const t = (x) => new Date(x.created_at).getTime();
    if (sort === "verified") r = [...r].sort((a, b) => Number(b.verified) - Number(a.verified) || t(b) - t(a));
    else if (sort === "rating") r = [...r].sort((a, b) => b.rating - a.rating || t(b) - t(a));
    else r = [...r].sort((a, b) => t(b) - t(a));
    return r;
  }, [items, tab, category, region, query, sort]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5">
          <Logo />
          <div className="order-3 flex w-full gap-2 lg:order-none lg:w-auto lg:flex-1">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className="inp pl-9" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Xizmat, mutaxassis yoki ish qidirish..." />
            </div>
            <div className="relative">
              <MapPin size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <select className="inp w-36 pl-9 sm:w-48" value={region} onChange={(e) => setRegion(e.target.value)}>
                <option>Barcha hududlar</option>
                {REGIONS.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <div className="ml-auto flex gap-2">
            <button onClick={() => setPost("job")} className="inline-flex items-center gap-1 rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-dark"><Plus size={15} /> Ish berish</button>
            <button onClick={() => setPost("specialist")} className="inline-flex items-center gap-1 rounded-lg bg-ok px-3 py-2 text-sm font-semibold text-white hover:opacity-90"><Plus size={15} /> Ish izlash</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4">
        <section className="py-8 text-center sm:py-12">
          <h1 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight text-brand-dark sm:text-4xl">
            Ish beruvchilar va mutaxassislar uchrashadigan eng ishonchli maydon
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            IT va dizayndan tortib uy ta’mirlashgacha — tasdiqlangan mutaxassislarni bir necha daqiqada toping yoki o‘z xizmatlaringizni taklif qiling.
          </p>
          <div className="mx-auto mt-5 flex max-w-xl flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-slate-600">
            <span><b className="text-brand-dark">{counts.specialist}</b> faol mutaxassis</span>
            <span><b className="text-brand-dark">{counts.done}</b> bajarilgan ish</span>
            <span className="inline-flex items-center gap-1"><ShieldCheck size={15} className="text-ok" /> <b className="text-ok">0%</b> komissiya, to‘g‘ridan-to‘g‘ri aloqa</span>
          </div>
        </section>

        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
          {["Barchasi", ...CATEGORIES].map((c) => (
            <button key={c} onClick={() => setCategory(c)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${category === c ? "border-brand bg-brand text-white" : "border-slate-200 bg-white text-slate-700 hover:border-brand"}`}>
              {c}
            </button>
          ))}
        </div>

        <AdSlot className="mx-auto mt-5 max-w-[728px]" />

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {[["job", "Ish e’lonlari (Mijozlar)", counts.job], ["specialist", "Mutaxassislar (Xizmatlar)", counts.specialist]].map(([v, t, n]) => (
            <button key={v} onClick={() => setTab(v)}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${tab === v ? "bg-brand-dark text-white" : "bg-white text-slate-700 border border-slate-200"}`}>
              {t} <span className={`ml-1 rounded-full px-2 py-0.5 text-xs ${tab === v ? "bg-white/20" : "bg-slate-100"}`}>{n}</span>
            </button>
          ))}
          <select className="inp ml-auto w-auto" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Saralash">
            <option value="new">Eng yangilari</option>
            <option value="verified">Tasdiqlanganlar</option>
            <option value="rating">Yuqori reyting</option>
          </select>
        </div>

        <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_300px]">
          <div className="space-y-4">
            {loading && [1, 2, 3].map((i) => <div key={i} className="h-48 animate-pulse rounded-xl bg-slate-200" />)}
            {!loading && list.length === 0 && (
              <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600">
                Hech narsa topilmadi. Filtrlarni o‘zgartiring yoki birinchi bo‘lib e’lon joylang.
              </div>
            )}
            {list.map((l) => <ListingCard key={l.id} l={l} onOpen={setDetail} toast={toast} />)}
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4"><AdSlot tall /></div>
          </aside>
        </div>
      </main>

      <footer className="mt-12 border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 md:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-3 text-sm text-slate-600">O‘zbekistondagi ish beruvchilar va mutaxassislar uchun ishonchli, komissiyasiz maydon.</p>
            <a href={`https://t.me/${ADMIN_TELEGRAM}`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">Admin bilan Telegramda bog‘lanish</a>
            <a href={`tel:${ADMIN_PHONE}`} className="mt-1 block text-sm font-semibold text-ok hover:underline">Admin: {formatPhone(ADMIN_PHONE)}</a>
          </div>
          <div>
            <h3 className="font-semibold text-brand-dark">Kategoriyalar</h3>
            <ul className="mt-2 space-y-1 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c}><button onClick={() => { setCategory(c); window.scrollTo({ top: 0 }); }} className="text-slate-600 hover:text-brand">{c}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-brand-dark">Xavfsizlik qoidalari</h3>
            <details open className="mt-2">
              <summary className="cursor-pointer text-sm text-slate-500">Firibgarlardan saqlaning</summary>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-slate-600">{SAFETY.map((s) => <li key={s}>{s}</li>)}</ul>
            </details>
          </div>
        </div>
        <div className="border-t border-slate-100 py-4 text-center text-xs text-slate-500">© 2026 VazifaBor. Barcha huquqlar himoyalangan.</div>
      </footer>

      {detail && <ListingDetailModal l={detail} onClose={() => setDetail(null)} toast={toast} />}
      {post && <PostModal initialType={post} onClose={() => setPost(null)} onSubmit={handlePost} />}

      {toastMsg && (
        <div className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-lg bg-brand-dark px-4 py-2.5 text-sm font-medium text-white shadow-lg">{toastMsg}</div>
      )}
    </div>
  );
}
