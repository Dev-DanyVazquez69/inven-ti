import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      }
    ],
  },
    reactStrictMode: false,      // Habilita o modo estrito do React
    swcMinify: true,            // Habilita minificação com SWC para melhor performance
    compiler: {
        removeConsole: process.env.NODE_ENV !== "development", // Remove console.logs no ambiente de produção
    },
    // Função para adicionar os headers de segurança
    async headers() {
        return [
            {
                // Aplica esses headers a todas as rotas
                source: '/(.*)',
                headers: securityHeaders,
            },
            {
                source: '/sw.js',
                headers: securityHeadersWork
            }
        ];
    },
};

// Headers de segurança
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: process.env.NODE_ENV === "development"
    ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; font-src 'self';"
    : "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; font-src 'self';"
  },
  {
    //Controla a quantidade de informações do referenciador incluídas nas solicitações, equilibrando segurança e funcionalidade.
    key: 'Referrer-Policy',
    value: 'no-referrer',
  },
  {
    //Impede o sniffing do tipo MIME, reduzindo o risco de uploads de arquivos maliciosos.
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    //Protege contra ataques de clickjacking, impedindo que seu site seja incorporado em iframes.
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    //Garante que o site seja acessado apenas por HTTPS.
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    //Controla o uso de recursos sensíveis, como geolocalização, câmera e microfone.
    key: 'Permissions-Policy',
    value: 'geolocation=(), camera=(), microphone=()',
  },
];

const securityHeadersWork = [
  {
    //Garante que o service worker seja interpretado corretamente como JavaScript.
    key: 'Content-Type',
    value: 'application/javascript; charset=utf-8',
  },
  {
    // Impede o armazenamento em cache do service worker, garantindo que os usuários sempre obtenham a versão mais recente.
    key: 'Cache-Control',
    value: 'no-cache, no-store, must-revalidate',
  },
  {
    //Implementa uma Política de Segurança de Conteúdo rigorosa para o service worker, permitindo apenas scripts da mesma origem.
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self'",
  },
]

// Configuração PWA, separada da configuração dos headers
export default withPWA({
    dest: "public",                          // Destino dos arquivos do PWA
    disable: process.env.NODE_ENV === "development", // Desabilita PWA no ambiente de desenvolvimento
    register: true,                          // Registra o service worker
    skipWaiting: true,                       // Ativa imediatamente o novo service worker
})(nextConfig);
