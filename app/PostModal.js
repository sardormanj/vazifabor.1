"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { CATEGORIES, REGIONS, formatPhone } from "./utils";

function Field({ label, error, children }) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}{children}{error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}

export default function PostModal({ initialType, onClose, onSubmit }) {
  const [f, setF] = useState({
    type: initialType, title: "", category: CATEGORIES[0], region: REGIONS[0], price: "",
    currency: "UZS", extra: "", description: "", name: "", phone: "+998", telegram: "",
  });
  const [err, setErr] = useState({});
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    const digits = f.phone.replace(/\D/g, "").replace(/^998/, "");
    const er = {};
    if (f.title.trim().length < 5) er.title = "Sarlavha kamida 5 ta belgidan iborat bo‘lishi kerak";
    if (f.description.trim().length < 20) er.description = "Tavsif kamida 20 ta belgidan iborat bo‘lsin";
    if (f.name.trim().length < 2) er.name = "Ism va familiyangizni kiriting";
    if (digits.length !== 9) er.phone = "Telefon raqamni to‘liq kiriting";
    if (f.telegram && !/^@?[A-Za-z0-9_]{4,32}$/.test(f.telegram.trim())) er.telegram = "Telegram username noto‘g‘ri (masalan, @username)";
    setErr(er);
    if (Object.keys(er).length) return;

    const price = f.price ? Number(f.price) : null;
    onSubmit({
      type: f.type, title: f.title.trim(), category: f.category, region: f.region,
      price: price || null, currency: f.currency, negotiable: !price,
      duration_or_experience: f.extra.trim() || null, description: f.description.trim(),
      author_name: f.name.trim(), phone: "+998" + digits,
      telegram: f.telegram ? "@" + f.telegram.trim().replace("@", "") : null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 sm:items-center sm:p-4" onClick={onClose}>
      <form
        onSubmit={submit} noValidate onClick={(e) => e.stopPropagation()}
        className="max-h-[94vh] w-full max-w-lg space-y-3 overflow-y-auto rounded-t-2xl bg-white p-5 sm:rounded-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-brand-dark">{f.type === "job" ? "Yangi ish e’lonini joylash" : "O‘z xizmatingizni taklif qiling"}</h2>
          <button type="button" onClick={onClose} aria-label="Yopish" className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"><X size={20} /></button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[["job", "Ish berish"], ["specialist", "Ish izlash"]].map(([v, t]) => (
            <button type="button" key={v} onClick={() => set("type", v)}
              className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${f.type === v ? (v === "job" ? "bg-brand text-white" : "bg-ok text-white") : "bg-slate-100 text-slate-600"}`}>
              {t}
            </button>
          ))}
        </div>

        <Field label="Sarlavha" error={err.title}><input className="inp mt-1" value={f.title} onChange={(e) => set("title", e.target.value)} placeholder="Masalan: Logotip dizayneri kerak" /></Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Kategoriya"><select className="inp mt-1" value={f.category} onChange={(e) => set("category", e.target.value)}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></Field>
          <Field label="Hudud / Shahar"><select className="inp mt-1" value={f.region} onChange={(e) => set("region", e.target.value)}>{REGIONS.map((c) => <option key={c}>{c}</option>)}</select></Field>
        </div>

        <div>
          <span className="block text-sm font-medium text-slate-700">Narx / Byudjet</span>
          <div className="mt-1 flex gap-2">
            <input className="inp" inputMode="numeric" value={f.price} onChange={(e) => set("price", e.target.value.replace(/\D/g, ""))} placeholder="Bo‘sh qolsa: Kelishiladi" />
            <div className="flex shrink-0 overflow-hidden rounded-lg border border-slate-300">
              {[["UZS", "so’m"], ["USD", "USD"]].map(([v, t]) => (
                <button type="button" key={v} onClick={() => set("currency", v)} className={`px-3 text-sm font-medium ${f.currency === v ? "bg-brand text-white" : "bg-white text-slate-600"}`}>{t}</button>
              ))}
            </div>
          </div>
        </div>

        <Field label={f.type === "job" ? "Muddat" : "Tajriba"}><input className="inp mt-1" value={f.extra} onChange={(e) => set("extra", e.target.value)} placeholder={f.type === "job" ? "Masalan: 5 kun" : "Masalan: 3 yil tajriba"} /></Field>
        <Field label="Batafsil tavsif" error={err.description}><textarea className="inp mt-1" rows={4} value={f.description} onChange={(e) => set("description", e.target.value)} placeholder="Ish talablari yoki xizmatingiz haqida yozing" /></Field>
        <Field label="Ism va familiya" error={err.name}><input className="inp mt-1" value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="Ism Familiya" /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Telefon raqam" error={err.phone}><input className="inp mt-1" inputMode="tel" value={f.phone} onChange={(e) => set("phone", formatPhone(e.target.value))} /></Field>
          <Field label="Telegram username" error={err.telegram}><input className="inp mt-1" value={f.telegram} onChange={(e) => set("telegram", e.target.value)} placeholder="@username" /></Field>
        </div>

        <button type="submit" className="w-full rounded-lg bg-ok py-3 font-semibold text-white transition-opacity hover:opacity-90">E’lonni joylash</button>
      </form>
    </div>
  );
}
