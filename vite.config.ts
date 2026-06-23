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
          // React 生态单独打包
          'react-vendor': ['react', 'react-dom'],
          // UI 组件库（实际安装的唯一重型库）
          'ui-lucide': ['lucide-react'],
          // 工具库（实际安装的）
          'utils': ['clsx', 'tailwind-merge'],
        },
      },
    },
    // Enable gzip compression reporting
    reportCompressedSize: true,
    // Reduce chunk size warning limit to 1000KB
    chunkSizeWarningLimit: 1000,
  },
  // ─── Optimize dependencies pre-bundling ───
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
  },
  // ─── Preview server optimizations ───
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  },
  // ─── Server optimizations for development ───
  server: {
    headers: {
      'Cache-Control': 'no-store',
    },
  },
});
