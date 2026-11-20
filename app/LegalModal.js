"use client";
import { X } from "lucide-react";
import { ADMIN_TELEGRAM } from "./utils";

const TERMS = [
  ["1. VazifaBor nima?", "VazifaBor — ish beruvchilar va mutaxassislar o‘z e’lonlarini joylashtirib, bir-biri bilan bog‘lanadigan axborot maydoni. Biz ish beruvchi, ish bajaruvchi, agent yoki to‘lov vositachisi emasmiz. Kelishuv faqat e’lon beruvchi va unga murojaat qilgan shaxs o‘rtasida tuziladi."],
  ["2. E’lonlar uchun javobgarlik", "E’lon mazmuni, narxi, aloqa ma’lumotlari va uning to‘g‘riligi uchun faqat e’lonni joylagan shaxs javob beradi. E’lonlar joylanishdan oldin tekshirilmaydi. “Tasdiqlangan” belgisi administrator tomonidan ko‘rib chiqilganini bildiradi, ish sifati yoki natijasiga kafolat emas."],
  ["3. Sizning javobgarligingiz", "Siz saytdan o‘z xohishingiz va o‘z xavfingiz bilan foydalanasiz. Kelishuvlar, to‘lovlar, bajarilgan yoki bajarilmagan ishlar hamda yetkazilgan zararlar uchun VazifaBor qonun ruxsat bergan darajada javobgar bo‘lmaydi. Hamkorni o‘zingiz tekshiring, notanish odamga 100% oldindan to‘lov qilmang."],
  ["4. To‘lovlar", "Saytda to‘lovlar amalga oshirilmaydi va komissiya olinmaydi. Barcha hisob-kitob tomonlar o‘rtasida, platformadan tashqarida amalga oshiriladi."],
  ["5. Taqiqlanadi", "Noqonuniy xizmatlar, aldov va firibgarlik, boshqa shaxsning ma’lumotlarini ruxsatsiz joylash, haqoratli yoki spam e’lonlar. Administrator bunday e’lonlarni ogohlantirmasdan o‘chirishi mumkin."],
  ["6. O‘zgartirishlar", "Shartlar yangilanishi mumkin. Saytdan foydalanishni davom ettirsangiz, yangi shartlarga rozilik bergan bo‘lasiz."],
];

const PRIVACY = [
  ["1. Qanday ma’lumot yig‘iladi?", "E’lon joylaganingizda: ism va familiya, telefon raqam, Telegram username (ixtiyoriy) hamda e’lon matni. Boshqa shaxsiy ma’lumot so‘ralmaydi."],
  ["2. Nima uchun?", "Ma’lumotlar e’loningizni saytda ko‘rsatish va boshqalar siz bilan bog‘lanishi uchun ishlatiladi. E’lon bilan birga kiritilgan ism va telefon raqam hamma uchun ochiq ko‘rinadi."],
  ["3. Rozilik", "E’lon joylash oynasidagi belgini qo‘yish orqali ma’lumotlaringiz yuqoridagi maqsadda ochiq ko‘rsatilishiga rozilik berasiz."],
  ["4. Saqlash va uzatish", "Ma’lumotlar bulutli ma’lumotlar bazasida saqlanadi. Ular sotilmaydi va reklama maqsadida uchinchi shaxslarga berilmaydi."],
  ["5. O‘chirish", `E’loningizni va ma’lumotlaringizni o‘chirish uchun Telegramda @${ADMIN_TELEGRAM} ga yozing.`],
  ["6. Yosh cheklovi", "18 yoshga to‘lmaganlar e’lon joylamasligi kerak."],
];

export default function LegalModal({ kind, onClose }) {
  const rows = kind === "terms" ? TERMS : PRIVACY;
  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-slate-900/50 sm:items-center sm:p-4" onClick={onClose}>
      <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-2xl bg-white p-5 sm:rounded-2xl" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-brand-dark">{kind === "terms" ? "Foydalanish shartlari" : "Maxfiylik siyosati"}</h2>
          <button onClick={onClose} aria-label="Yopish" className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"><X size={20} /></button>
        </div>
        <div className="mt-3 space-y-3">
          {rows.map(([h, t]) => (
            <div key={h}><h3 className="text-sm font-semibold text-slate-900">{h}</h3><p className="mt-0.5 text-sm leading-relaxed text-slate-600">{t}</p></div>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-400">Aloqa: Telegram @{ADMIN_TELEGRAM}</p>
      </div>
    </div>
  );
}
