import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import paths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), paths()],
	test: {
		coverage: {
			exclude: ['mock/**', 'dist/**', 'eslint.config.js', 'vite.config.*', 'public/**'],
			provider: 'v8',
		},
		environment: 'jsdom',
		globals: true,
		setupFiles: './vite.config.setup.ts',
	},
});
