const ago = (m) => new Date(Date.now() - m * 60000).toISOString();

// Namuna e’lonlar: aloqa ma’lumoti, reyting va “Tasdiqlangan” belgisi yo‘q.
const S = (n, type, title, category, region, price, currency, extra, description) => ({
  id: "s" + n, sample: true, type, title, category, region, price, currency, negotiable: !price,
  duration_or_experience: extra, description, author_name: "Namuna", phone: "", telegram: null,
  verified: false, rating: 0, completed_jobs: 0, created_at: ago(n * 170),
});

export const SAMPLE_LISTINGS = [
  S(1, "job", "Telegram-bot ishlab chiquvchi kerak", "IT va Dasturlash", "Masofaviy (Online)", 3000000, "UZS", "2 hafta", "Onlayn do‘kon uchun buyurtma qabul qiladigan Telegram-bot kerak. To‘lov tizimi bilan ulanish va admin panel bo‘lishi shart."),
  S(2, "job", "Do‘kon uchun logotip va brend uslubi", "Dizayn va Grafika", "Toshkent shahri", 1200000, "UZS", "5 kun", "Yangi ochilayotgan kiyim do‘koni uchun logotip, vizitka va ijtimoiy tarmoq uchun rang uslubi kerak."),
  S(3, "job", "Instagram va Telegram uchun SMM mutaxassis", "SMM va Marketing", "Samarqand", 250, "USD", "Oylik", "Haftasiga 5 ta post, stories va reklama sozlash kerak. Maqsad: obunachilar va buyurtmalarni oshirish."),
  S(4, "job", "Inglizcha hujjatlarni o‘zbekchaga tarjima qilish", "Tarjima va Matn", "Buxoro", 350000, "UZS", "3 kun", "Taxminan 25 sahifalik texnik hujjatni ingliz tilidan o‘zbek tiliga aniq tarjima qilish kerak."),
  S(5, "job", "Kvartirada elektr simlarini almashtirish", "Ustachilik va Ta’mirlash", "Andijon", null, "UZS", "1 hafta", "Uch xonali kvartirada eski elektr simlarini yangilash va rozetkalarni almashtirish kerak. Narxni ko‘rib kelishamiz."),
  S(6, "job", "Shahar bo‘ylab yetkazib berish uchun kuryer", "Yetkazib berish", "Namangan", 4000000, "UZS", "Oylik", "Onlayn do‘kon buyurtmalarini shahar bo‘ylab yetkazadigan mas’uliyatli kuryer kerak. O‘z transporti bo‘lsa yaxshi."),
  S(7, "job", "Maktab o‘quvchisiga matematika repetitori", "Repetitorlik", "Toshkent viloyati", 100000, "UZS", "Haftada 3 dars", "9-sinf o‘quvchisi uchun matematikadan individual dars kerak. Narx 1 dars uchun, darslar uyda yoki onlayn."),
  S(8, "job", "Kompaniya uchun landing sahifa", "IT va Dasturlash", "Farg’ona", 800, "USD", "3 hafta", "Qurilish kompaniyasi uchun telefonga moslashgan, tez yuklanadigan bir sahifali sayt kerak. Matnlar tayyor."),
  S(9, "job", "Video montaj mutaxassisi kerak", "Dizayn va Grafika", "Xorazm", 500000, "UZS", "Doimiy hamkorlik", "Haftasiga 3 ta qisqa video (Reels va TikTok) montaj qilish kerak. Narx 1 ta video uchun."),
  S(10, "job", "Konditsioner o‘rnatish va ta’mirlash ustasi", "Ustachilik va Ta’mirlash", "Qashqadaryo", null, "UZS", "Kelishiladi", "Ofis uchun 4 ta konditsioner o‘rnatish va profilaktika qilish kerak. Tajribali usta qidiryapmiz."),
  S(11, "specialist", "Mobil ilova va veb-sayt yarataman", "IT va Dasturlash", "Toshkent shahri", 500, "USD", "4 yil tajriba", "Landing sahifa, onlayn do‘kon va mobil ilovalarni noldan yarataman. Tez, telefonga moslashgan va SEO sozlangan ishlar topshiraman."),
  S(12, "specialist", "Grafik dizayner: banner, logotip, post", "Dizayn va Grafika", "Navoiy", 300000, "UZS", "3 yil tajriba", "Ijtimoiy tarmoqlar uchun postlar, bannerlar va logotip tayyorlayman. Narx 1 ta loyiha uchun, tahrirlar bepul."),
  S(13, "specialist", "Targetolog: Instagram va Telegram reklama", "SMM va Marketing", "Jizzax", 1500000, "UZS", "2 yil tajriba", "Kichik biznes uchun reklama kampaniyalarini sozlayman va natijani har hafta hisobot qilib beraman."),
  S(14, "specialist", "Ingliz va rus tilidan yozma tarjima", "Tarjima va Matn", "Samarqand", 40000, "UZS", "6 yil tajriba", "Hujjat, shartnoma va sayt matnlarini tarjima qilaman. Narx 1 sahifa uchun, hajmi katta ishlarga chegirma bor."),
  S(15, "specialist", "Santexnik: o‘rnatish va ta’mirlash", "Ustachilik va Ta’mirlash", "Sirdaryo", null, "UZS", "8 yil tajriba", "Vannaxona, oshxona va isitish tizimlarida santexnika ishlarini bajaraman. Ishga kafolat beraman, bepul baho beraman."),
  S(16, "specialist", "Yuk tashish va yetkazib berish xizmati", "Yetkazib berish", "Surxondaryo", null, "UZS", "5 yil tajriba", "Shahar va viloyat bo‘ylab kichik va o‘rta yuklarni o‘z transportimda tez va ehtiyotkorlik bilan yetkazaman."),
  S(17, "specialist", "IELTS va ingliz tili o‘qituvchisi", "Repetitorlik", "Masofaviy (Online)", 150000, "UZS", "5 yil tajriba", "IELTS tayyorlov va umumiy ingliz tili darslari, individual reja asosida Zoom orqali. Narx 1 dars uchun, birinchi dars sinov."),
  S(18, "specialist", "Copywriter: sayt va ijtimoiy tarmoq matnlari", "Tarjima va Matn", "Buxoro", 200000, "UZS", "3 yil tajriba", "Sotuvchi matnlar, post va sayt kontentini o‘zbek va rus tillarida yozaman. Narx 1 ta matn uchun."),
  S(19, "specialist", "Mebel yig‘uvchi va duradgor", "Ustachilik va Ta’mirlash", "Qoraqalpog’iston Respublikasi", null, "UZS", "7 yil tajriba", "Mebel yig‘ish, shkaf va oshxona garniturasini buyurtma asosida tayyorlash va o‘rnatish ishlarini bajaraman."),
  S(20, "specialist", "Kichik biznes uchun buxgalter xizmati", "Boshqa", "Toshkent viloyati", 800000, "UZS", "6 yil tajriba", "YaTT va kichik korxonalar uchun hisob yuritish, soliq hisobotlari va hujjatlarni tayyorlash xizmati. Narx oylik."),
];
