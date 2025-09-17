/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [], // Add your image domains here
    unoptimized: true, // For development, can be removed in production
  },
  env: {
    REACT_APP_Backend_Url: process.env.REACT_APP_Backend_Url,
  },
  // Redirect old React Router paths to new Next.js paths
  async redirects() {
    return [
      {
        source: '/Home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ProduitDétail/:id',
        destination: '/produit/:id',
        permanent: true,
      },
      {
        source: '/Connexion',
        destination: '/connexion',
        permanent: true,
      },
      {
        source: '/Inscription',
        destination: '/inscription',
        permanent: true,
      },
      {
        source: '/Panier',
        destination: '/panier',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;