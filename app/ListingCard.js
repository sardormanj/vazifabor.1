"use client";
import { useState } from "react";
import { Star, Phone, Send, Share2, MapPin, ShieldCheck } from "lucide-react";
import { formatPrice, formatPhone, timeAgo } from "./utils";

export function ContactActions({ l, toast }) {
  const [shown, setShown] = useState(false);
  const tg = (l.telegram || "").replace("@", "");
  if (l.sample) return <p className="rounded-lg bg-amber-50 p-3 text-xs text-amber-800">Bu namuna e’lon: sayt qanday ko‘rinishini ko‘rsatish uchun qo‘yilgan. Aloqa ma’lumoti yo‘q.</p>;

  const call = async () => {
    setShown(true);
    try { await navigator.clipboard.writeText(l.phone); toast("Raqam nusxalandi!"); } catch (e) {}
    if (window.matchMedia("(pointer: coarse)").matches) window.location.href = `tel:${l.phone}`;
  };
  const share = async () => {
    try { await navigator.clipboard.writeText(`${window.location.origin}/#${l.id}`); toast("Havola nusxalandi!"); }
    catch (e) { toast("Havolani nusxalab bo‘lmadi"); }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tg && (
        <a
          href={`https://t.me/${tg}?text=Assalomu%20alaykum!%20VazifaBor%20platformasidagi%20e'loningiz%20bo'yicha%20yozmoqdaman.`}
          target="_blank" rel="noopener noreferrer"
          className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          <Send size={16} /> Telegramdan yozish
        </a>
      )}
      <button
        onClick={call}
        className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 rounded-lg bg-ok px-3 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        <Phone size={16} /> {shown ? formatPhone(l.phone) : "Qo‘ng‘iroq qilish"}
      </button>
      <button
        onClick={share} aria-label="Ulashish" title="Ulashish"
        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
      >
        <Share2 size={16} /> Ulashish
      </button>
    </div>
  );
}

export default function ListingCard({ l, onOpen, toast }) {
  return (
    <article id={l.id} className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-indigo-50 px-2.5 py-1 font-medium text-brand">{l.category}</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">
          <MapPin size={12} /> {l.region}
        </span>
        <span className="ml-auto text-base font-bold text-brand-dark">{formatPrice(l)}</span>
      </div>

      <h3 className="mt-3 text-lg font-semibold leading-snug text-slate-900">{l.title}</h3>
      <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-slate-600">{l.description}</p>
      <button onClick={() => onOpen(l)} className="mt-2 text-sm font-medium text-brand hover:underline">
        Batafsil ko‘rish
      </button>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600">
        {l.sample ? <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-800">Namuna e’lon</span> : <span className="font-medium text-slate-800">{l.author_name}</span>}
        {l.verified && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-ok">
            <ShieldCheck size={13} /> Tasdiqlangan
          </span>
        )}
        {l.rating > 0 && (
          <span className="inline-flex items-center gap-1">
            <Star size={14} className="fill-amber-400 text-amber-400" /> {Number(l.rating).toFixed(1)} ★
          </span>
        )}
        {l.completed_jobs > 0 && <span>{l.completed_jobs} ta bajarilgan ish</span>}
        <span className="ml-auto text-xs text-slate-400">{timeAgo(l.created_at)}</span>
      </div>

      <div className="mt-4"><ContactActions l={l} toast={toast} /></div>
    </article>
  );
}
