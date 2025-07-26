import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SiteFooter({ className }: { className?: string }) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={cn("border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold">DocMagic</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Create professional documents in minutes with our AI-powered tools.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/your-org/DocMagic"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://twitter.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://linkedin.com/company/yourcompany"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link href="/templates" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Templates</Link></li>
              <li><Link href="/integrations" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Integrations</Link></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</Link></li>
              <li><Link href="/tutorials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Tutorials</Link></li>
              <li><Link href="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Support</Link></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} DocMagic. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
