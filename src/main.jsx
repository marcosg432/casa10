import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

// Otimização: Carregar backup e db apenas após interação do usuário (lazy load)
// Isso melhora muito o tempo de carregamento inicial no mobile
if (typeof window !== 'undefined') {
  // Carregar scripts não críticos apenas após o usuário interagir ou após 2 segundos
  const loadNonCriticalScripts = () => {
    // Carregar backup apenas quando necessário
    import('./utils/backup.js').catch(() => {
      // Ignorar erros silenciosamente
    })
    
    // Carregar db apenas quando necessário
    import('./utils/db.js').then(module => {
      // Criar usuário admin se necessário
      if (module.createAdminUserInDB) {
        module.createAdminUserInDB().catch(() => {
          // Ignorar erros silenciosamente
        })
      }
    }).catch(() => {
      // Ignorar erros silenciosamente
    })
  }
  
  // Carregar após interação do usuário ou após 2 segundos
  const events = ['touchstart', 'mousedown', 'scroll', 'keydown']
  const loadScripts = () => {
    loadNonCriticalScripts()
    events.forEach(event => {
      window.removeEventListener(event, loadScripts, { passive: true })
    })
  }
  
  events.forEach(event => {
    window.addEventListener(event, loadScripts, { passive: true, once: true })
  })
  
  // Fallback: carregar após 2 segundos mesmo sem interação
  setTimeout(loadNonCriticalScripts, 2000)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)

