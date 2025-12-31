import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { sanitizeString, sanitizeEmail, sanitizePhone, sanitizeText, validateEmail, validatePhone } from '../utils/security'
import './Contato.css'

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: ''
  })
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validações
    const newErrors = {}
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório'
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido'
    }
    if (!validatePhone(formData.telefone)) {
      newErrors.telefone = 'Telefone inválido'
    }
    if (!formData.mensagem.trim()) {
      newErrors.mensagem = 'Mensagem é obrigatória'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    // Sanitiza dados antes de processar
    const sanitizedData = {
      nome: sanitizeString(formData.nome),
      email: sanitizeEmail(formData.email),
      telefone: sanitizePhone(formData.telefone),
      mensagem: sanitizeText(formData.mensagem)
    }
    
    // Formata mensagem para WhatsApp
    const mensagemWhatsApp = `Olá! Recebi uma mensagem através do formulário de contato do site Casa10.

*Nome:* ${sanitizedData.nome}
*E-mail:* ${sanitizedData.email}
*Telefone:* ${sanitizedData.telefone}

*Mensagem:*
${sanitizedData.mensagem}`

    // Codifica a mensagem para URL
    const mensagemEncoded = encodeURIComponent(mensagemWhatsApp)
    
    // Abre WhatsApp com a mensagem formatada
    const whatsappUrl = `https://wa.me/5527999095799?text=${mensagemEncoded}`
    window.open(whatsappUrl, '_blank')
    
    // Limpa formulário após abrir WhatsApp
    setFormData({ nome: '', email: '', telefone: '', mensagem: '' })
    setErrors({})
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // Limpa erro do campo quando usuário começa a digitar
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  return (
    <div className="contato-page">
      <section className="contato-hero">
        <div className="contato-hero-background"></div>
        <Header />
        <div className="contato-hero-content">
          <h1 className="contato-hero-title">Contato</h1>
        </div>
      </section>

      <section className="contato-content">
        <div className="contato-container">
          <form className="contato-form" onSubmit={handleSubmit}>
            <div className="contato-form-left">
              <div className="contato-form-group">
                <label>Nome completo*</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
                {errors.nome && <span style={{ color: '#c33', fontSize: '14px' }}>{errors.nome}</span>}
              </div>
              <div className="contato-form-group">
                <label>E-mail*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <span style={{ color: '#c33', fontSize: '14px' }}>{errors.email}</span>}
              </div>
              <div className="contato-form-group">
                <label>Telefone*</label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                />
                {errors.telefone && <span style={{ color: '#c33', fontSize: '14px' }}>{errors.telefone}</span>}
              </div>
              <div className="contato-form-group">
                <label>Mensagem*</label>
                <textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  rows="5"
                  required
                ></textarea>
                {errors.mensagem && <span style={{ color: '#c33', fontSize: '14px' }}>{errors.mensagem}</span>}
              </div>
            </div>
            <div className="contato-form-right">
              <div className="contato-logo">
                <img src="/icones/logo boa.png" className="contato-logo-icon" alt="Casa10 Logo" />
              </div>
              <button type="submit" className="contato-submit-button">
                Enviar
              </button>
            </div>
          </form>

          <div className="contato-map">
            <iframe
              src="https://www.google.com/maps?q=Rua+Rio+Tocantins,+10+-+Hélio+Ferraz+-+Serra-ES&output=embed"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '15px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Contato

