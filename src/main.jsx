import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'
// Inicia sistema de backup automático
import './utils/backup.js'
// Cria usuário admin no banco de dados
import { createAdminUserInDB } from './utils/db.js'

// Garante que o usuário admin seja criado quando o app inicia
// Aguarda um pouco para garantir que o banco está pronto
setTimeout(async () => {
  try {
    await createAdminUserInDB()
  } catch (err) {
    console.error('Erro ao inicializar usuário admin:', err)
    // Tenta novamente após 2 segundos
    setTimeout(async () => {
      try {
        await createAdminUserInDB()
      } catch (err2) {
        console.error('Erro na segunda tentativa:', err2)
      }
    }, 2000)
  }
}, 500)

// Disponibiliza função global para criar admin manualmente (para debug)
if (typeof window !== 'undefined') {
  window.criarAdmin = async () => {
    try {
      const result = await createAdminUserInDB()
      console.log('Resultado:', result)
      alert('Usuário admin criado! Email: admin@casa10.com | Senha: admin123')
    } catch (err) {
      console.error('Erro:', err)
      alert('Erro ao criar usuário: ' + err.message)
    }
  }
  console.log('💡 Dica: Você pode criar o usuário admin manualmente executando: criarAdmin()')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)

