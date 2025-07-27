#!/usr/bin/env node

/**
 * Security Audit Script for DocMagic
 * Run this script to check for common security issues
 */

const fs = require('fs');
const path = require('path');

const COLORS = {
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
  RESET: '\x1b[0m'
};

function log(message, color = COLORS.RESET) {
  console.log(`${color}${message}${COLORS.RESET}`);
}

function checkEnvironmentVariables() {
  log('\n🔍 Checking Environment Variables...', COLORS.BLUE);
  
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'GEMINI_API_KEY'
  ];
  
  const optionalVars = [
    'NEXTAUTH_SECRET',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET'
  ];
  
  let issues = 0;
  
  // Check for .env.local file
  if (!fs.existsSync('.env.local')) {
    log('❌ .env.local file not found', COLORS.RED);
    issues++;
  } else {
    log('✅ .env.local file exists', COLORS.GREEN);
  }
  
  // Check required variables
  requiredVars.forEach(varName => {
    if (!process.env[varName]) {
      log(`❌ Missing required environment variable: ${varName}`, COLORS.RED);
      issues++;
    } else {
      log(`✅ ${varName} is set`, COLORS.GREEN);
    }
  });
  
  // Check optional but recommended variables
  optionalVars.forEach(varName => {
    if (!process.env[varName]) {
      log(`⚠️  Optional but recommended: ${varName}`, COLORS.YELLOW);
    } else {
      log(`✅ ${varName} is set`, COLORS.GREEN);
    }
  });
  
  return issues;
}

function checkHardcodedSecrets() {
  log('\n🔍 Checking for Hardcoded Secrets...', COLORS.BLUE);
  
  const suspiciousPatterns = [
    /sk_live_[a-zA-Z0-9]+/g, // Stripe live secret keys
    /pk_live_[a-zA-Z0-9]+/g, // Stripe live publishable keys
    /AIza[0-9A-Za-z\\-_]{35}/g, // Google API keys
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g, // UUIDs that might be secrets
  ];
  
  const filesToCheck = [
    'next.config.js',
    'lib/supabase/client.ts',
    'lib/supabase/server.ts'
  ];
  
  let issues = 0;
  
  filesToCheck.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      suspiciousPatterns.forEach(pattern => {
        const matches = content.match(pattern);
        if (matches) {
          log(`❌ Potential hardcoded secret found in ${filePath}`, COLORS.RED);
          issues++;
        }
      });
    }
  });
  
  if (issues === 0) {
    log('✅ No hardcoded secrets detected', COLORS.GREEN);
  }
  
  return issues;
}

function checkSecurityHeaders() {
  log('\n🔍 Checking Security Headers Configuration...', COLORS.BLUE);
  
  let issues = 0;
  
  // Check next.config.js for security headers
  if (fs.existsSync('next.config.js')) {
    const content = fs.readFileSync('next.config.js', 'utf8');
    
    const requiredHeaders = [
      'X-Frame-Options',
      'X-Content-Type-Options',
      'Content-Security-Policy',
      'Strict-Transport-Security'
    ];
    
    requiredHeaders.forEach(header => {
      if (content.includes(header)) {
        log(`✅ ${header} configured`, COLORS.GREEN);
      } else {
        log(`❌ Missing security header: ${header}`, COLORS.RED);
        issues++;
      }
    });
  } else {
    log('❌ next.config.js not found', COLORS.RED);
    issues++;
  }
  
  return issues;
}

function checkMiddleware() {
  log('\n🔍 Checking Middleware Configuration...', COLORS.BLUE);
  
  let issues = 0;
  
  if (fs.existsSync('middleware.ts')) {
    const content = fs.readFileSync('middleware.ts', 'utf8');
    
    const requiredFeatures = [
      'rate limiting',
      'CSRF protection',
      'authentication check'
    ];
    
    const checks = [
      { feature: 'rate limiting', pattern: /rateLimit/i },
      { feature: 'CSRF protection', pattern: /CSRF|origin/i },
      { feature: 'authentication check', pattern: /getSession|auth/i }
    ];
    
    checks.forEach(({ feature, pattern }) => {
      if (pattern.test(content)) {
        log(`✅ ${feature} implemented`, COLORS.GREEN);
      } else {
        log(`❌ Missing ${feature}`, COLORS.RED);
        issues++;
      }
    });
  } else {
    log('❌ middleware.ts not found', COLORS.RED);
    issues++;
  }
  
  return issues;
}

function checkDependencies() {
  log('\n🔍 Checking Dependencies...', COLORS.BLUE);
  
  let issues = 0;
  
  if (fs.existsSync('package.json')) {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    // Check for security-related dependencies
    const securityDeps = ['zod', 'bcryptjs'];
    
    securityDeps.forEach(dep => {
      if (packageJson.dependencies && packageJson.dependencies[dep]) {
        log(`✅ Security dependency ${dep} found`, COLORS.GREEN);
      } else {
        log(`⚠️  Consider adding security dependency: ${dep}`, COLORS.YELLOW);
      }
    });
    
    // Check for potentially vulnerable dependencies (basic check)
    const potentiallyVulnerable = ['eval', 'vm2', 'serialize-javascript'];
    
    potentiallyVulnerable.forEach(dep => {
      if (packageJson.dependencies && packageJson.dependencies[dep]) {
        log(`⚠️  Potentially vulnerable dependency: ${dep}`, COLORS.YELLOW);
      }
    });
  } else {
    log('❌ package.json not found', COLORS.RED);
    issues++;
  }
  
  return issues;
}

function checkFilePermissions() {
  log('\n🔍 Checking File Permissions...', COLORS.BLUE);
  
  const sensitiveFiles = ['.env.local', '.env', 'next.config.js'];
  let issues = 0;
  
  sensitiveFiles.forEach(file => {
    if (fs.existsSync(file)) {
      try {
        const stats = fs.statSync(file);
        const mode = stats.mode & parseInt('777', 8);
        
        if (mode > parseInt('644', 8)) {
          log(`⚠️  ${file} has overly permissive permissions: ${mode.toString(8)}`, COLORS.YELLOW);
        } else {
          log(`✅ ${file} has appropriate permissions`, COLORS.GREEN);
        }
      } catch (error) {
        log(`❌ Could not check permissions for ${file}`, COLORS.RED);
        issues++;
      }
    }
  });
  
  return issues;
}

function generateReport(totalIssues) {
  log('\n📊 Security Audit Report', COLORS.BLUE);
  log('========================', COLORS.BLUE);
  
  if (totalIssues === 0) {
    log('🎉 No security issues found!', COLORS.GREEN);
    log('Your application appears to be following security best practices.', COLORS.GREEN);
  } else if (totalIssues <= 3) {
    log(`⚠️  ${totalIssues} minor security issues found.`, COLORS.YELLOW);
    log('Please review and address the issues above.', COLORS.YELLOW);
  } else {
    log(`❌ ${totalIssues} security issues found.`, COLORS.RED);
    log('Please address these issues before deploying to production.', COLORS.RED);
  }
  
  log('\n📚 Additional Recommendations:', COLORS.BLUE);
  log('• Run `npm audit` to check for vulnerable dependencies');
  log('• Enable Dependabot or similar for automated security updates');
  log('• Consider implementing automated security testing in CI/CD');
  log('• Regularly review and update security configurations');
  log('• Monitor application logs for security events');
}

function main() {
  log('🔒 DocMagic Security Audit', COLORS.BLUE);
  log('==========================', COLORS.BLUE);
  
  let totalIssues = 0;
  
  totalIssues += checkEnvironmentVariables();
  totalIssues += checkHardcodedSecrets();
  totalIssues += checkSecurityHeaders();
  totalIssues += checkMiddleware();
  totalIssues += checkDependencies();
  totalIssues += checkFilePermissions();
  
  generateReport(totalIssues);
  
  process.exit(totalIssues > 5 ? 1 : 0);
}

if (require.main === module) {
  main();
}

module.exports = { main };