import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dashboard | DocMagic',
  description: 'Your personal document workspace',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">
              <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
                <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
                  <div className="py-6 pr-6 lg:py-8">
                    <nav className="space-y-1">
                      <a
                        href="/dashboard"
                        className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4"
                        >
                          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                          <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        Dashboard
                      </a>
                      <a
                        href="/dashboard/documents"
                        className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4"
                        >
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                        My Documents
                      </a>
                      <a
                        href="/dashboard/templates"
                        className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4"
                        >
                          <rect width="16" height="6" x="4" y="2" rx="1" />
                          <rect width="9" height="6" x="4" y="12" rx="1" />
                          <rect width="16" height="6" x="4" y="22" rx="1" />
                        </svg>
                        Templates
                      </a>
                      <a
                        href="/dashboard/account"
                        className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-2 h-4 w-4"
                        >
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        Account
                      </a>
                    </nav>
                  </div>
                </aside>
                <main className="flex w-full flex-col overflow-hidden">
                  <div className="flex-1 space-y-6 py-6">
                    {children}
                  </div>
                </main>
              </div>
            </div>
            <SiteFooter className="border-t" />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
