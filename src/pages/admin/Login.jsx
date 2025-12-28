import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authenticateUser } from '../../utils/storage'
import { sanitizeEmail, validateEmail, validatePassword, checkLoginAttempts, recordLoginAttempt, generateCSRFToken } from '../../utils/security'
import { createAdminUserInDB } from '../../utils/db'
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

  // Garante que o usuário admin existe quando a página carrega
  useEffect(() => {
    const ensureAdminExists = async () => {
      try {
        await createAdminUserInDB()
      } catch (err) {
        console.error('Erro ao garantir usuário admin:', err)
      }
    }
    ensureAdminExists()
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
      
      // Aguarda um pouco para garantir que a sessão foi salva
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Redireciona para admin
      navigate('/admin', { replace: true })
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
