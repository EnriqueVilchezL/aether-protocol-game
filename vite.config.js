import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// IMPORTANT: Replace '/aether-protocol-game/' with the actual name of your GitHub repository.
export default defineConfig({
  plugins: [react()],
  base: '/aether-protocol-game/', 
});