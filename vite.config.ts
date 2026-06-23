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
          // UI 组件库
          'ui-lucide': ['lucide-react'],
          // 重型库单独打包（按需加载）
          'framer-motion': ['framer-motion'],
          'recharts': ['recharts'],
          // Firebase 单独打包（避免在首屏加载）
          // 注意：不使用 'firebase' 主入口（它不包含 main 字段），只使用子包
          'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          // 工具库
          'utils': ['date-fns', 'clsx', 'tailwind-merge'],
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
