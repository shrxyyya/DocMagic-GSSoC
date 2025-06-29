/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: { unoptimized: true },
    output: 'standalone',
    // Add this to ensure API routes work correctly
    async headers() {
        return [
            {
                // Apply these headers to all routes
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
                    { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
                ],
            },
        ];
    },
    // Add environment variables with defaults for production
    env: {
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://docmagic1.netlify.app',
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bxiieunzrcdbxqadapcl.supabase.co',
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4aWlldW56cmNkYnhxYWRhcGNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4OTAzMTIsImV4cCI6MjA2NDQ2NjMxMn0.87x8KfKhfQoJlmbBg1I1zHwEMIE-Uvk-THCFmEn-n6E',
        GEMINI_API_KEY: process.env.GEMINI_API_KEY || 'AIzaSyAnota1ZAmXv3LoAfmI0J5VQarPv4qMTMA'
    }
};

module.exports = nextConfig;