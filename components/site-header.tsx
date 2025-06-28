"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { File as FileIcon, FileText, Presentation as LayoutPresentation, Mail as MailIcon, Menu, LogOut, Zap, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/components/auth-provider";
import { createClient } from "@/lib/supabase/client";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function SiteHeader() {
  const pathname = usePathname();
  const { user } = useAuth();
  const supabase = createClient;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 px-10">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="hidden md:block group">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-yellow-400 to-blue-500 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-2xl bolt-gradient-text">DocMagic</span>
              <div className="hidden lg:flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20">
                <Sparkles className="h-3 w-3 text-yellow-500" />
                <span className="text-xs font-medium text-yellow-600">AI</span>
              </div>
            </div>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden glass-effect border-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="glass-effect border-0">
              <div className="flex flex-col gap-6 pt-6">
                <Link href="/" className="flex items-center space-x-3 group">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-yellow-400 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-bold text-xl bolt-gradient-text">DocMagic</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/resume"
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-yellow-600 group flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-950/20",
                      pathname === "/resume" ? "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20" : "text-muted-foreground"
                    )}
                  >
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                      <FileIcon className="h-4 w-4 text-white" />
                    </div>
                    <span>Resume</span>
                  </Link>
                  <Link
                    href="/presentation"
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-yellow-600 group flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-950/20",
                      pathname === "/presentation" ? "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20" : "text-muted-foreground"
                    )}
                  >
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <LayoutPresentation className="h-4 w-4 text-white" />
                    </div>
                    <span>Presentation</span>
                  </Link>
                  <Link
                    href="/letter"
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-yellow-600 group flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-950/20",
                      pathname === "/letter" ? "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20" : "text-muted-foreground"
                    )}
                  >
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <MailIcon className="h-4 w-4 text-white" />
                    </div>
                    <span>Letter</span>
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/resume"
              className={cn(
                "text-sm font-medium transition-all duration-300 hover:text-yellow-600 relative group",
                pathname === "/resume" ? "text-yellow-600" : "text-muted-foreground"
              )}
            >
              Resume
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-blue-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/presentation"
              className={cn(
                "text-sm font-medium transition-all duration-300 hover:text-yellow-600 relative group",
                pathname === "/presentation" ? "text-yellow-600" : "text-muted-foreground"
              )}
            >
              Presentation
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-blue-500 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/letter"
              className={cn(
                "text-sm font-medium transition-all duration-300 hover:text-yellow-600 relative group",
                pathname === "/letter" ? "text-yellow-600" : "text-muted-foreground"
              )}
            >
              Letter
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-blue-500 group-hover:w-full transition-all duration-300" />
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 ring-2 ring-yellow-400/30 hover:ring-yellow-400/50 transition-all">
                    <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.name || user.email} />
                    <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-blue-500 text-white font-bold">
                      {(user.user_metadata?.name?.[0] || user.email?.[0] || 'U').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-effect border-0 shadow-xl">
                <DropdownMenuItem onClick={handleSignOut} className="hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="btn-bolt hover-lift font-bold px-6 rounded-full">
              <Link href="/auth/signin" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Sign In
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}