import "./globals.css";

import localFont from "next/font/local";

const pretendard = localFont({
	src: "../fonts/PretendardVariable.woff2",
	display: "swap",
	weight: "45 920",
	variable: "--font-pretendard",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html className={`${pretendard.variable}`} lang="ko">
			<body className={pretendard.className}>{children}</body>
		</html>
	);
}
