import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "당근마켓 챌린지",
  description: "Assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`mx-auto max-w-screen-sm antialiased`}>
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
          {children}
        </div>
      </body>
    </html>
  );
}
