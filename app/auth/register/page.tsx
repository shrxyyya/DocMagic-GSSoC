import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { SignUpForm } from '@/components/auth/signup-form';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles, Shield, Wand2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Create an account',
  description: 'Create a new account to get started',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden py-8">
      {/* Background elements matching landing page */}
      <div className="absolute inset-0 mesh-gradient opacity-20"></div>
      
      {/* Floating orbs */}
      <div className="floating-orb w-32 h-32 sm:w-48 sm:h-48 bolt-gradient opacity-15 top-20 -left-24"></div>
      <div className="floating-orb w-24 h-24 sm:w-36 sm:h-36 bolt-gradient opacity-20 bottom-20 -right-18"></div>
      <div className="floating-orb w-40 h-40 sm:w-56 sm:h-56 bolt-gradient opacity-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23000000' fill-opacity='1'%3e%3ccircle cx='30' cy='30' r='1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e")`,
        }}
      />

      <div className="w-full max-w-md mx-4 relative z-10">
        {/* Enhanced card with glass effect */}
        <div className="glass-effect p-6 sm:p-8 rounded-2xl shadow-2xl border border-yellow-400/20 relative overflow-hidden">
          {/* Card shimmer effect */}
          <div className="absolute inset-0 shimmer opacity-30"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-4 right-4">
            <Sparkles className="h-5 w-5 text-yellow-500 animate-pulse" />
          </div>
          <div className="absolute bottom-4 left-4">
            <Wand2 className="h-4 w-4 text-blue-500" />
          </div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-4">
                <Wand2 className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Join the Magic</span>
                <Shield className="h-4 w-4 text-green-500" />
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                Create Your{" "}
                <span className="bolt-gradient-text">DocMagic</span>{" "}
                Account
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Start creating professional documents with AI
              </p>
            </div>
            
            <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-md" />}>
              <SignUpForm />
            </Suspense>
            
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
            <p className="text-center text-sm text-muted-foreground mt-4">
              By signing up, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-foreground"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-foreground"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}