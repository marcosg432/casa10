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
  // Remover requestIdleCallback que pode não funcionar em todos os browsers
  // e causar problemas no mobile
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)

