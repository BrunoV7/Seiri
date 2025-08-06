import type { Metadata } from "next";
import { Inter as InterFont } from "next/font/google";
import { Toaster } from 'sonner';
import "./globals.css";

const inter = InterFont({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Seiri | Organize suas tarefas com elegância",
  description: "Seiri é um app de organização visual de tarefas, ideal para quem busca clareza e leveza no dia a dia.",
  keywords: ["organização", "kanban", "produtividade", "tarefas", "Seiri", "app de tarefas"],
  authors: [{ name: "Equipe Seiri" }],
  creator: "Seiri",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
