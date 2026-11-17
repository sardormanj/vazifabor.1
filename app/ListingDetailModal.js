"use client";
import { X, MapPin, ShieldCheck } from "lucide-react";
import { ContactActions } from "./ListingCard";
import { formatPrice, timeAgo } from "./utils";

export default function ListingDetailModal({ l, onClose, toast }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 sm:items-center sm:p-4" onClick={onClose}>
      <div
        className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-2xl bg-white p-5 sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-indigo-50 px-2.5 py-1 font-medium text-brand">{l.category}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">
              <MapPin size={12} /> {l.region}
            </span>
          </div>
          <button onClick={onClose} aria-label="Yopish" className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"><X size={20} /></button>
        </div>

        <h2 className="mt-3 text-xl font-bold text-slate-900">{l.title}</h2>
        <p className="mt-1 text-2xl font-extrabold text-brand-dark">{formatPrice(l)}</p>

        <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <div><dt className="text-slate-500">{l.type === "job" ? "Muddat" : "Tajriba"}</dt><dd className="font-medium">{l.duration_or_experience || "Ko‘rsatilmagan"}</dd></div>
          <div><dt className="text-slate-500">E’lon vaqti</dt><dd className="font-medium">{timeAgo(l.created_at)}</dd></div>
        </dl>

        <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-700">{l.description}</p>

        <div className="mt-4 flex items-center gap-2 text-sm">
          <span className="font-semibold">{l.author_name}</span>
          {l.verified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-ok">
              <ShieldCheck size={13} /> Tasdiqlangan
            </span>
          )}
        </div>

        <div className="mt-4"><ContactActions l={l} toast={toast} /></div>
        <p className="mt-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
          Ehtiyot bo‘ling: notanish odamga 100% oldindan to‘lov qilmang va SMS kodlarni hech kimga aytmang.
        </p>
      </div>
    </div>
  );
}
