import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaExclamationTriangle } from 'react-icons/fa'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getCarrinho, clearCarrinho, saveReserva, formatarMoeda } from '../utils/storage'
import { sanitizeString, sanitizeEmail, sanitizePhone } from '../utils/security'
import './Checkout.css'

const Checkout = () => {
  const navigate = useNavigate()
  const [carrinho, setCarrinho] = useState(null)
  const [metodoPagamento, setMetodoPagamento] = useState('')
  const [reservaConcluida, setReservaConcluida] = useState(false)

  useEffect(() => {
    const loadCarrinho = async () => {
      const carrinhoData = await getCarrinho()
      if (!carrinhoData) {
        navigate('/')
        return
      }
      setCarrinho(carrinhoData)
    }
    loadCarrinho()
  }, [navigate])

  const handlePagamento = async () => {
    if (!metodoPagamento) {
      alert('Por favor, selecione um método de pagamento')
      return
    }

    // Valida se os dados necessários estão presentes
    if (!carrinho.nome || carrinho.nome.trim().length < 2) {
      alert('Por favor, preencha o nome completo')
      return
    }

    if (!carrinho.email || !carrinho.email.includes('@')) {
      alert('Por favor, preencha um email válido')
      return
    }

    if (!carrinho.telefone || carrinho.telefone.trim().length < 8) {
      alert('Por favor, preencha um telefone válido')
      return
    }

    try {
      // Sanitiza dados antes de salvar
      const reserva = {
        ...carrinho,
        nome: carrinho.nome ? sanitizeString(carrinho.nome) : carrinho.nome,
        email: carrinho.email ? sanitizeEmail(carrinho.email) : carrinho.email,
        telefone: carrinho.telefone ? sanitizePhone(carrinho.telefone) : carrinho.telefone,
        metodoPagamento: sanitizeString(metodoPagamento),
        origem: 'Site / whatsapp'
      }

      // Log antes de salvar
      console.log('💾 Tentando salvar reserva:', reserva)
      
      // Salva a reserva
      const reservaSalva = await saveReserva(reserva)
      console.log('✅ Reserva salva com sucesso:', reservaSalva)
      
      // Verifica se foi realmente salva
      const { getReservas } = await import('../utils/storage')
      const todasReservas = await getReservas()
      const reservaEncontrada = todasReservas.find(r => r.id === reservaSalva.id)
      
      if (!reservaEncontrada) {
        console.error('❌ Reserva não encontrada após salvar!')
        throw new Error('Reserva não foi encontrada após salvar. Verifique o console para mais detalhes.')
      }
      
      console.log('✅ Reserva confirmada no banco:', reservaEncontrada)
      
      // Limpa o carrinho apenas se a reserva foi salva com sucesso
      await clearCarrinho()
      
      setReservaConcluida(true)

      setTimeout(() => {
        navigate('/')
      }, 3000)
    } catch (error) {
      // Exibe mensagem de erro para o usuário
      console.error('❌❌❌ ERRO CRÍTICO NO CHECKOUT:', error)
      console.error('📚 Stack trace:', error.stack)
      console.error('📝 Dados do carrinho:', carrinho)
      console.error('📝 Dados da reserva que tentou salvar:', reserva)
      alert(`Erro ao finalizar reserva: ${error.message || 'Erro desconhecido. Por favor, tente novamente.\n\nVerifique o console (F12) para mais detalhes.'}`)
    }
  }

  if (!carrinho) return null

  if (reservaConcluida) {
    return (
      <div className="checkout-page">
        <Header />
        <div className="checkout-success">
          <h2>Sua reserva foi concluída com sucesso</h2>
          <p>Vá até o painel para ver como funciona o sistema</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <Header />
      <div className="checkout-container">
        <div className="checkout-warning">
          <p><FaExclamationTriangle /> Este checkout é apenas ilustrativo, não funciona de verdade. Ele existe apenas para demonstrar o funcionamento do sistema.</p>
        </div>

        <div className="checkout-content">
          <div className="checkout-summary">
            <h2 className="checkout-title">Resumo da Reserva</h2>
            <div className="checkout-item">
              <span>Quarto:</span>
              <span>{carrinho.quartoNome}</span>
            </div>
            <div className="checkout-item">
              <span>Check-in:</span>
              <span>{new Date(carrinho.checkIn).toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="checkout-item">
              <span>Check-out:</span>
              <span>{new Date(carrinho.checkOut).toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="checkout-item">
              <span>Noites:</span>
              <span>{carrinho.noites}</span>
            </div>
            <div className="checkout-item">
              <span>Total:</span>
              <span className="checkout-total">R$ {formatarMoeda(carrinho.total)}</span>
            </div>
          </div>

          <div className="checkout-payment">
            <h2 className="checkout-title">Método de Pagamento</h2>
            <div className="payment-methods">
              <label className="payment-method">
                <input
                  type="radio"
                  name="pagamento"
                  value="pix"
                  checked={metodoPagamento === 'pix'}
                  onChange={(e) => setMetodoPagamento(e.target.value)}
                />
                <span>Pix</span>
              </label>
              <label className="payment-method">
                <input
                  type="radio"
                  name="pagamento"
                  value="cartao"
                  checked={metodoPagamento === 'cartao'}
                  onChange={(e) => setMetodoPagamento(e.target.value)}
                />
                <span>Cartão</span>
              </label>
              <label className="payment-method">
                <input
                  type="radio"
                  name="pagamento"
                  value="boleto"
                  checked={metodoPagamento === 'boleto'}
                  onChange={(e) => setMetodoPagamento(e.target.value)}
                />
                <span>Boleto</span>
              </label>
            </div>

            <button className="checkout-button" onClick={handlePagamento}>
              Pagar
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Checkout

