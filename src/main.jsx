import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'
// Inicia sistema de backup automático
import './utils/backup.js'
// Cria usuário admin no banco de dados
import { createAdminUserInDB } from './utils/db.js'

// O usuário admin é criado automaticamente no db.js após a migração
// Não precisa fazer nada aqui, apenas garantir que o módulo seja importado

// Otimização: Carregar backup apenas após interação do usuário em mobile
if (typeof window !== 'undefined') {
  const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
  
  if (isMobileDevice) {
    // Delay carregamento de scripts não críticos em mobile
    requestIdleCallback(() => {
      // Executar apenas quando o browser estiver ocioso
    }, { timeout: 2000 })
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)

