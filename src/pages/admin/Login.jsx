import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authenticateUser, createAdminUser } from '../../utils/storage'
import { sanitizeEmail, sanitizeString, validateEmail, validatePassword, checkLoginAttempts, recordLoginAttempt, generateCSRFToken } from '../../utils/security'
import PixelCursorTrail from '../../components/PixelCursorTrail'
import './Login.css'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [csrfToken] = useState(() => generateCSRFToken())

  // Cria usuário admin padrão na primeira execução
  useEffect(() => {
    const initializeAdmin = async () => {
      try {
        const { getUsuarioByEmail } = await import('../../utils/storage')
        // Verifica se já existe um admin
        const adminExists = await getUsuarioByEmail('admin@casa10.com')
        if (!adminExists) {
          // Cria admin padrão: admin@casa10.com / admin123
          await createAdminUser('Administrador', 'admin@casa10.com', 'admin123')
          console.log('Usuário admin padrão criado: admin@casa10.com / admin123')
        }
      } catch (err) {
        console.error('Erro ao inicializar admin:', err)
      }
    }
    initializeAdmin()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validações
      const emailSanitizado = sanitizeEmail(formData.email)
      if (!emailSanitizado || !validateEmail(emailSanitizado)) {
        throw new Error('Email inválido')
      }

      if (!validatePassword(formData.senha)) {
        throw new Error('Senha deve ter pelo menos 6 caracteres')
      }

      // Verifica tentativas de login
      const attemptCheck = checkLoginAttempts(emailSanitizado)
      if (!attemptCheck.allowed) {
        setError(attemptCheck.message)
        setLoading(false)
        return
      }

      // Autentica usuário
      await authenticateUser(emailSanitizado, formData.senha)
      recordLoginAttempt(emailSanitizado, true)
      
      // Redireciona para admin
      navigate('/admin')
    } catch (err) {
      recordLoginAttempt(formData.email, false)
      setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // Limpa erro quando usuário começa a digitar
    if (error) setError('')
  }

  return (
    <div className="login-page">
      <PixelCursorTrail />
      <div className="login-logo-corner">
        <img src="/icones/logo boa.png" className="login-logo-corner-icon" alt="Casa10 Logo" />
      </div>
      <div className="login-container">
        <div className="login-logo">
          <div className="login-logo-icon"></div>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="login-error" style={{
              backgroundColor: '#fee',
              color: '#c33',
              padding: '12px',
              borderRadius: '4px',
              marginBottom: '16px',
              border: '1px solid #fcc'
            }}>
              {error}
            </div>
          )}
          <div className="login-form-group">
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              disabled={loading}
            />
          </div>
          <div className="login-form-group">
            <label>Senha</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
              autoComplete="current-password"
              disabled={loading}
              minLength={6}
            />
          </div>
          <div className="login-info">
            <p>Este sistema possui autenticação segura. Use suas credenciais para acessar.</p>
          </div>
          <input type="hidden" name="csrf_token" value={csrfToken} />
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Entrando...' : 'Fazer login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
