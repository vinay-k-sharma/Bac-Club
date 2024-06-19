import withPWA from 'next-pwa'
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {domains : ['utfs.io'],
        remotePatterns : [
            {
                protocol: 'https',
                hostname:'utfs.io',
                port:''
            }
        ]
    },
   
};

export default withPWA({
    dest: "public",         
    register: true,         // register the PWA service worker
    skipWaiting: true,      // skip waiting for service worker activation
})(nextConfig);
