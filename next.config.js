/** @type {import('next').NextConfig} */
const nextConfig = {
    // Disable React Strict Mode to prevent double-rendering in development
    reactStrictMode: false,
    
    // Image optimization
    images: {
        unoptimized: true,
        domains: ['bxiieunzrcdbxqadapcl.supabase.co'],
    },
    
    // URL handling
    trailingSlash: false,
    
    // Security headers
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin'
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block'
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains'
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://*.supabase.co https://api.stripe.com https://generativelanguage.googleapis.com; frame-src https://js.stripe.com; object-src 'none'; base-uri 'self';"
                    }
                ]
            }
        ];
    },
    
    // Build configurations
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    
    // Webpack configuration
    webpack: (config, { isServer }) => {
        // Add file-loader for PDF files
        config.module.rules.push({
            test: /\.pdf$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        publicPath: '/_next/static/files',
                        outputPath: 'static/files',
                        name: '[name].[ext]',
                    },
                },
            ],
        });
        
        return config;
    },
};

module.exports = nextConfig;