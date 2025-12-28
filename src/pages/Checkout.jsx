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

    // Sanitiza dados antes de salvar
    const reserva = {
      ...carrinho,
      nome: carrinho.nome ? sanitizeString(carrinho.nome) : carrinho.nome,
      email: carrinho.email ? sanitizeEmail(carrinho.email) : carrinho.email,
      telefone: carrinho.telefone ? sanitizePhone(carrinho.telefone) : carrinho.telefone,
      metodoPagamento: sanitizeString(metodoPagamento),
      origem: 'Site / whatsapp'
    }

    await saveReserva(reserva)
    await clearCarrinho()
    setReservaConcluida(true)

    setTimeout(() => {
      navigate('/')
    }, 3000)
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

