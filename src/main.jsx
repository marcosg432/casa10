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

// Disponibiliza função global para criar/resetar admin manualmente (para debug)
if (typeof window !== 'undefined') {
  window.criarAdmin = async () => {
    try {
      // Força a criação mesmo se já existir
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
      
      await db.usuarios.put(adminUser)
      await db.configuracoes.put({ key: 'admin_criado', value: 'true' })
      
      console.log('✅ Usuário admin criado/resetado!')
      console.log('📧 Email: admin@casa10.com')
      console.log('🔑 Senha: admin123')
      alert('✅ Usuário admin criado/resetado!\n\nEmail: admin@casa10.com\nSenha: admin123')
    } catch (err) {
      console.error('Erro:', err)
      alert('Erro ao criar usuário: ' + err.message)
    }
  }
  console.log('💡 Dica: Você pode criar/resetar o usuário admin executando: criarAdmin()')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)

