import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  base: '/',  // ✅ 修复：使用绝对路径，匹配视频路径 /assets/video/...
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // ─── Build optimizations for better TTFB ───
  build: {
    target: 'esnext',
    minify: 'esbuild',  // Fast minification
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react'],
        },
      },
    },
    // Enable gzip compression reporting
    reportCompressedSize: true,
    // Reduce chunk size
    chunkSizeWarningLimit: 1000,
  },
  // ─── Preview server optimizations ───
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  },
});
