export const CATEGORIES = [
  "IT va Dasturlash", "Dizayn va Grafika", "SMM va Marketing", "Tarjima va Matn",
  "Ustachilik va Ta’mirlash", "Yetkazib berish", "Repetitorlik", "Boshqa",
];
export const REGIONS = [
  "Toshkent", "Samarqand", "Buxoro", "Farg’ona", "Andijon", "Namangan", "Xorazm", "Masofaviy (Online)",
];
// Admin Telegram username (@ belgisisiz). O‘zingiznikiga almashtiring.
export const ADMIN_TELEGRAM = "vazifabor_admin";

export function timeAgo(iso) {
  const m = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (m < 5) return "Hozirgina";
  if (m < 60) return `${m} daqiqa oldin`;
  const h = Math.floor(m / 60);
  if (h < 24) return h < 12 ? `${h} soat oldin` : "Bugun";
  const d = Math.floor(h / 24);
  return d === 1 ? "Kecha" : `${d} kun oldin`;
}

export function formatPrice(l) {
  if (l.negotiable || !l.price) return "Kelishiladi";
  const n = Number(l.price).toLocaleString("ru-RU");
  return l.currency === "USD" ? `$${n}` : `${n} so’m`;
}

export function formatPhone(p) {
  const d = String(p || "").replace(/\D/g, "").replace(/^998/, "").slice(0, 9);
  const parts = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean);
  return "+998" + (parts.length ? " " + parts.join(" ") : "");
}
