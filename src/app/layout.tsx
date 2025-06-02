import "./globals.css";
export const metadata = {
  title: "WHYNE",
  description: "와인 플랫폼",
  icons: {
    href: "/favicon.ico",
    rel: "icon",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
