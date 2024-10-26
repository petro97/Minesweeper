import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        short_name: "MineSweeper",
        name: "MineSweeper",
        icons: [
          {
            src: "favicon.ico",
            sizes: "48x48",
            type: "image/x-icon"
          },
          {
            src: "logo192.png",
            type: "image/png",
            sizes: "192x192"
          },
          {
            src: "logo512.png",
            type: "image/png",
            sizes: "512x512"
          }
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#ffffff"
      },
      registerType: 'autoUpdate', // Automatically update the service worker
      workbox: {
        // Options for Workbox
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst', // Use the NetworkFirst strategy for HTML documents
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst', // Use CacheFirst for images
            options: {
              cacheName: 'images', // Cache name
              expiration: {
                maxEntries: 50, // Limit the number of entries
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
              },
            },
          },
          // Add more caching strategies as needed
        ],
      },
    }),
  ],
  base: 'Minesweeper', // Set to your repository name
});
