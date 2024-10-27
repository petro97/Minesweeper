import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      include: ['tests/**/*.{test,spec}.{js,jsx,ts,tsx}'], // Adjust this pattern as needed
      provider: 'v8', // or 'c8', depending on what’s available
      reporter: ['text', 'html'],
      all: true, // include all files, not just those with tests
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
});
