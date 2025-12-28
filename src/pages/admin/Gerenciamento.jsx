import { useState, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { getFuncionarios, saveFuncionario, deleteFuncionario, getUsuarioLogado, createAdminUser } from '../../utils/storage'
import { sanitizeString, sanitizeEmail, validateEmail, validatePassword, validateRequired } from '../../utils/security'
import AdminHeader from '../../components/AdminHeader'
import './Gerenciamento.css'

const Gerenciamento = () => {
  const [funcionarios, setFuncionarios] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ nome: '', email: '', senha: '' })
  const [usuarioLogado, setUsuarioLogado] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      const todosFuncionarios = await getFuncionarios()
      setFuncionarios(todosFuncionarios)
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
      // Sanitiza e cria usuário admin com senha hasheada
      const nomeSanitizado = sanitizeString(formData.nome)
      const emailSanitizado = sanitizeEmail(formData.email)
      
      await createAdminUser(nomeSanitizado, emailSanitizado, formData.senha)
      
      const todosFuncionarios = await getFuncionarios()
      setFuncionarios(todosFuncionarios)
      setFormData({ nome: '', email: '', senha: '' })
      setShowForm(false)
      alert('Funcionário criado com sucesso!')
    } catch (err) {
      alert(`Erro ao criar funcionário: ${err.message}`)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente excluir este funcionário?')) {
      await deleteFuncionario(id)
      const todosFuncionarios = await getFuncionarios()
      setFuncionarios(todosFuncionarios)
    }
  }

  const handleVerFicha = (funcionario) => {
    alert(`Nome: ${funcionario.nome}\nE-mail: ${funcionario.email}`)
  }

  return (
    <div className="gerenciamento-page">
      <AdminHeader currentPage="gerenciamento" />
      <div className="gerenciamento-container">
        <h1 className="gerenciamento-title">Gestão de Funcionários</h1>

        <div className="gerenciamento-header">
          <h2>Todos os Gestores</h2>
          <button onClick={handleAdd} className="gerenciamento-add-button">
            <FaPlus /> Adicionar
          </button>
        </div>

        {showForm && (
          <form className="gerenciamento-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nome do funcionário</label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
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
          {funcionarios.map(funcionario => (
            <div key={funcionario.id} className="gerenciamento-item">
              <input
                type="text"
                value={funcionario.nome || 'Nome do funcionário'}
                readOnly
                className="funcionario-nome"
              />
              <div className="funcionario-actions">
                <button onClick={() => handleDelete(funcionario.id)} className="funcionario-button excluir">
                  Excluir
                </button>
                <button onClick={() => handleVerFicha(funcionario)} className="funcionario-button">
                  Ver ficha
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Gerenciamento

