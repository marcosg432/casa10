// Servidor Node.js otimizado para produção
import express from 'express'
import compression from 'compression'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFileSync, existsSync, statSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3004
const DIST_PATH = join(__dirname, 'dist')

// Middleware de compressão (Gzip) - Otimizado para mobile
app.use(compression({
  level: 9, // Máxima compressão
  threshold: 1024, // Comprimir arquivos maiores que 1KB
  filter: (req, res) => {
    // Comprimir apenas arquivos textuais
    if (req.headers['x-no-compression']) {
      return false
    }
    return compression.filter(req, res)
  }
}))

// Cache headers para assets estáticos - Otimizado para mobile
app.use((req, res, next) => {
  // Cache de 1 ano para arquivos com hash (imutáveis)
  if (req.url.match(/\.(js|css|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    // Headers adicionais para mobile
    res.setHeader('Vary', 'Accept-Encoding')
  } else {
    // Cache de 1 hora para HTML
    res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate')
  }
  // Headers de performance mobile
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  next()
})

// Servir arquivos estáticos com cache otimizado
app.use(express.static(DIST_PATH, {
  maxAge: '1y',
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    // Headers adicionais para performance
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'public, max-age=3600')
    }
  }
}))

// SPA Fallback - sempre retornar index.html para rotas do React Router
app.get('*', (req, res) => {
  const indexPath = join(DIST_PATH, 'index.html')
  
  if (existsSync(indexPath)) {
    const html = readFileSync(indexPath, 'utf-8')
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Cache-Control', 'public, max-age=3600')
    res.send(html)
  } else {
    res.status(404).send('Build não encontrado. Execute: npm run build')
  }
})

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando em http://0.0.0.0:${PORT}`)
  console.log(`📁 Servindo arquivos de: ${DIST_PATH}`)
  console.log(`⚡ Modo: ${process.env.NODE_ENV || 'production'}`)
})

