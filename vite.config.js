import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // ▼▼▼ 로컬 개발용 프록시 설정 추가 ▼▼▼
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // 백엔드 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // /api 를 지우고 보냄
      }
    }
  }
})