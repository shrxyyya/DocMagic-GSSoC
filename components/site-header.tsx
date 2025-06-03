"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { File as FileIcon, FileText, Presentation as LayoutPresentation, Mail as MailIcon, Menu, LogOut } from "lucide-react";
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
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="hidden md:block">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6" />
              <span className="font-bold text-xl">DocMagic</span>
            </div>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-6 pt-6">
                <Link href="/" className="flex items-center space-x-2">
                  <FileText className="h-6 w-6" />
                  <span className="font-bold text-xl">DocMagic</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/resume"
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      pathname === "/resume" ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <FileIcon className="h-5 w-5" />
                      <span>Resume</span>
                    </div>
                  </Link>
                  <Link
                    href="/presentation"
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      pathname === "/presentation" ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <LayoutPresentation className="h-5 w-5" />
                      <span>Presentation</span>
                    </div>
                  </Link>
                  <Link
                    href="/letter"
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      pathname === "/letter" ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <MailIcon className="h-5 w-5" />
                      <span>Letter</span>
                    </div>
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/resume"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/resume" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Resume
            </Link>
            <Link
              href="/presentation"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/presentation" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Presentation
            </Link>
            <Link
              href="/letter"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/letter" ? "text-primary" : "text-muted-foreground"
              )}
            >
              Letter
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.name || user.email} />
                    <AvatarFallback>{(user.user_metadata?.name?.[0] || user.email?.[0] || 'U').toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}