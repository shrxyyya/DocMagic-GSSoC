import "./globals.css";
import type { ReactNode } from "react";
import { Inter, Poppins } from "next/font/google";
import { Providers } from "./providers";
import { CursorProvider } from "@/components/cursor-provider";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins"
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${poppins.variable}`}>
        <Providers>
          <CursorProvider>
            {children}
          </CursorProvider>
        </Providers>
      </body>
    </html>
  );
}
