import "./globals.css";

export const metadata = {
  title: "VazifaBor — Ishonchli xizmatlar birjasi",
  description: "Ish beruvchilar va mutaxassislar uchrashadigan eng ishonchli maydon. IT, dizayn, ta’mirlash va boshqa xizmatlar.",
};

export const viewport = { width: "device-width", initialScale: 1, themeColor: "#1E1B4B" };

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
