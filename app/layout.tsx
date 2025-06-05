import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/auth-provider';
import { SessionWrapper } from '@/components/sessionwraper'; // ✅ use your wrapper

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DocMagic - AI Document Creation Platform',
  description: 'Create beautiful resumes, presentations, CVs and letters with AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionWrapper> {/* ✅ Now wrapped correctly in a client component */}
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              {children}
              <Toaster />
            </ThemeProvider>
          </AuthProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
