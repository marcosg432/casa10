import { useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { getAllUsuarios, deleteUsuario, getUsuarioLogado, createAdminUser } from '../../utils/storage'
import { sanitizeString, sanitizeEmail, validateEmail, validatePassword, validateRequired } from '../../utils/security'
import AdminHeader from '../../components/AdminHeader'
import './Gerenciamento.css'

const Gerenciamento = () => {
  const [usuarios, setUsuarios] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ nome: '', email: '', senha: '' })
  const [usuarioLogado, setUsuarioLogado] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      const todosUsuarios = await getAllUsuarios()
      setUsuarios(todosUsuarios)
      const usuario = await getUsuarioLogado()
      setUsuarioLogado(usuario)
    }
    loadData()
  }, [])

  const handleAdd = () => {
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validações
    if (!validateRequired(formData.nome)) {
      alert('Por favor, preencha o nome')
      return
    }
    if (!validateEmail(formData.email)) {
      alert('Por favor, insira um email válido')
      return
    }
    if (!validatePassword(formData.senha)) {
      alert('A senha deve ter pelo menos 6 caracteres')
      return
    }
    
    try {
      // Verifica se o email já existe
      const { getUsuarioByEmail } = await import('../../utils/storage')
      const usuarioExistente = await getUsuarioByEmail(formData.email)
      if (usuarioExistente) {
        alert('Este email já está cadastrado!')
        return
      }
      
      // Sanitiza e cria usuário admin com senha hasheada
      const nomeSanitizado = sanitizeString(formData.nome)
      const emailSanitizado = sanitizeEmail(formData.email)
      
      await createAdminUser(nomeSanitizado, emailSanitizado, formData.senha)
      
      const todosUsuarios = await getAllUsuarios()
      setUsuarios(todosUsuarios)
      setFormData({ nome: '', email: '', senha: '' })
      setShowForm(false)
      alert('Usuário admin criado com sucesso!')
    } catch (err) {
      alert(`Erro ao criar usuário: ${err.message}`)
    }
  }

  const handleDelete = async (email) => {
    if (window.confirm('Deseja realmente excluir este usuário?')) {
      await deleteUsuario(email)
      const todosUsuarios = await getAllUsuarios()
      setUsuarios(todosUsuarios)
      alert('Usuário excluído com sucesso!')
    }
  }

  const handleVerFicha = (usuario) => {
    alert(`Nome: ${usuario.nome}\nE-mail: ${usuario.email}\nRole: ${usuario.role || 'admin'}\nCriado em: ${usuario.createdAt ? new Date(usuario.createdAt).toLocaleString('pt-BR') : 'N/A'}`)
  }

  return (
    <div className="gerenciamento-page">
      <AdminHeader currentPage="gerenciamento" />
      <div className="gerenciamento-container">
        <h1 className="gerenciamento-title">Gestão de Usuários Admin</h1>

        <div className="gerenciamento-header">
          <h2>Todos os Usuários Administradores</h2>
          <button onClick={handleAdd} className="gerenciamento-add-button">
            <FaPlus /> Adicionar Usuário
          </button>
        </div>

        {showForm && (
          <form className="gerenciamento-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome do usuário</label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
                placeholder="Digite o nome completo"
              />
            </div>
            <div className="form-group">
              <label>E-mail</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Senha</label>
              <input
                type="password"
                value={formData.senha}
                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                required
                minLength={6}
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="form-submit">Salvar</button>
              <button type="button" onClick={() => setShowForm(false)} className="form-cancel">
                Cancelar
              </button>
            </div>
          </form>
        )}

        <div className="gerenciamento-list">
          {usuarios.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
              Nenhum usuário cadastrado. Clique em "Adicionar Usuário" para criar um novo.
            </p>
          ) : (
            usuarios.map(usuario => (
              <div key={usuario.id} className="gerenciamento-item">
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{usuario.nome}</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>{usuario.email}</div>
                </div>
                <div className="funcionario-actions">
                  <button onClick={() => handleDelete(usuario.email)} className="funcionario-button excluir">
                    Excluir
                  </button>
                  <button onClick={() => handleVerFicha(usuario)} className="funcionario-button">
                    Ver detalhes
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Gerenciamento

