import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        paintStudio: resolve(import.meta.dirname, 'paint-wallpaper-studio.html'),
        roomComposer: resolve(import.meta.dirname, 'room-composer.html')
      }
    }
  }
});
