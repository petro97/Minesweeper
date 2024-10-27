import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: '/manifest.json', // Reference to the existing manifest in the public folder
      registerType: 'autoUpdate', // Automatically update the service worker
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
        ],
      },
    }),
  ],
  test: {
    setupFiles: './setupTests.js',
    globals: true, // Enable global test functions (like describe, it, expect, etc.)
    environment: 'jsdom', // Set the environment to jsdom for DOM testing
    coverage: {
      reporter: ['text', 'json', 'html'], // Configure coverage report formats
      include: ['src/**/*.{js,jsx}'], // Specify files for coverage
      exclude: ['**/*.test.{js,jsx}'], // Exclude test files from coverage
      all: true, // Collect coverage for all files
      80: true, // Set coverage thresholds
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  base: 'Minesweeper', // Set to your repository name
});
