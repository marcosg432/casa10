import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    open: true
  },
  preview: {
    host: true,
    port: 3004,
    // Otimizações do preview server
    cors: true,
    strictPort: false
  },
  build: {
    // Otimizações de build para mobile
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log em produção
        drop_debugger: true,
        passes: 2, // Mais compressão
        unsafe: true,
        unsafe_comps: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      }
    },
    // Code splitting inteligente
    rollupOptions: {
      output: {
        manualChunks: {
          // Separa bibliotecas grandes em chunks separados
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'admin-vendor': ['chart.js', 'react-chartjs-2', 'recharts'],
          'utils-vendor': ['framer-motion', 'date-fns', 'dexie']
        },
        // Nomes de arquivos otimizados
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return 'assets/images/[name]-[hash].[ext]'
          }
          if (/css/i.test(ext)) {
            return 'assets/css/[name]-[hash].[ext]'
          }
          return 'assets/[name]-[hash].[ext]'
        }
      }
    },
    // Aumenta o limite de avisos de tamanho (em KB)
    chunkSizeWarningLimit: 1000,
    // Otimizações de assets
    assetsInlineLimit: 4096, // Inline assets menores que 4KB
    cssCodeSplit: true, // Separa CSS por página
    sourcemap: false // Desabilita sourcemaps em produção (melhora performance)
  },
  // Otimizações de preview
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
})



