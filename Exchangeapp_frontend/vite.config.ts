import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 配置 @ 指向 src 文件夹
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://47.108.183.65', // 目标服务器地址
        changeOrigin: true, // 是否改变源
        secure: false, // 是否使用 HTTPS
        rewrite: (path) => path.replace(/^\/api/, ''), // 请求时移除 /api 前缀
      },
    },
  },
  optimizeDeps: {
    include: ['chart.js'], // 确保 chart.js 在开发时被优化
  },
});
