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

// Disponibiliza função global para criar/resetar admin manualmente
if (typeof window !== 'undefined') {
  window.criarAdmin = async () => {
    try {
      const db = (await import('./utils/db.js')).default
      const { hashPassword } = await import('./utils/security.js')
      const adminEmail = 'admin@casa10.com'
      
      await db.open()
      const hashedPassword = await hashPassword('admin123')
      
      const adminUser = {
        id: adminEmail,
        nome: 'Administrador',
        email: adminEmail,
        senha: hashedPassword,
        role: 'admin',
        createdAt: new Date().toISOString()
      }
      
      // Usa put para garantir que todos os campos sejam salvos
      await db.usuarios.put(adminUser)
      await db.configuracoes.put({ key: 'admin_criado', value: 'true' })
      
      // Verifica se foi salvo
      await new Promise(resolve => setTimeout(resolve, 300))
      const verificado = await db.usuarios.get(adminEmail)
      
      if (verificado && verificado.senha) {
        alert('✅ Usuário admin criado/resetado com sucesso!\n\n📧 Email: admin@casa10.com\n🔑 Senha: admin123')
      } else {
        throw new Error('Usuário não foi salvo corretamente')
      }
    } catch (err) {
      console.error('Erro:', err)
      alert('❌ Erro ao criar usuário: ' + err.message)
    }
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)

