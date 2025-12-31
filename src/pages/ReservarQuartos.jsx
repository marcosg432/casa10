import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import BookingEngine from '../components/BookingEngine'
import { getQuartos, isQuartoDisponivel, formatarMoeda } from '../utils/storage'
import { format } from 'date-fns'
import Footer from '../components/Footer'
import './ReservarQuartos.css'

const ReservarQuartos = () => {
  const [quartos, setQuartos] = useState([])
  const [filtros, setFiltros] = useState({
    checkIn: null,
    checkOut: null,
    pessoas: 2
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadQuartos = async () => {
      setLoading(true)
      // Busca apenas quartos da categoria 'quartos'
      const todosQuartos = await getQuartos('quartos')
      setQuartos(todosQuartos)
      setLoading(false)
    }
    loadQuartos()
  }, [])

  useEffect(() => {
    // Recupera filtros do localStorage
    try {
      const stored = localStorage.getItem('casa10_booking_filters')
      if (stored) {
        const parsed = JSON.parse(stored)
        setFiltros({
          checkIn: parsed.checkIn ? new Date(parsed.checkIn) : null,
          checkOut: parsed.checkOut ? new Date(parsed.checkOut) : null,
          pessoas: parsed.pessoas || 2
        })
      }
    } catch (err) {
      console.error('Erro ao recuperar filtros:', err)
    }
  }, [])

  const handleSearch = (newFilters) => {
    setFiltros(newFilters)
  }

  const verificarDisponibilidade = async (quartoId) => {
    if (!filtros.checkIn || !filtros.checkOut) {
      alert('Por favor, selecione as datas de check-in e check-out primeiro')
      return
    }
    return await isQuartoDisponivel(quartoId, filtros.checkIn, filtros.checkOut)
  }

  const calcularTotal = (preco) => {
    if (!filtros.checkIn || !filtros.checkOut) return 0
    const diffTime = Math.abs(new Date(filtros.checkOut) - new Date(filtros.checkIn))
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays * preco
  }

  const handleReservar = async (quarto) => {
    if (!filtros.checkIn || !filtros.checkOut) {
      alert('Por favor, selecione as datas de check-in e check-out primeiro')
      return
    }

    const disponivel = await verificarDisponibilidade(quarto.id)
    if (!disponivel) {
      alert('Este quarto não está disponível para as datas selecionadas')
      return
    }

    // Salva no carrinho e redireciona para checkout
    const carrinho = {
      quartoId: quarto.id,
      quartoNome: quarto.nome,
      checkIn: filtros.checkIn.toISOString(),
      checkOut: filtros.checkOut.toISOString(),
      preco: quarto.preco,
      total: calcularTotal(quarto.preco),
      pessoas: filtros.pessoas
    }

    localStorage.setItem('casa10_carrinho', JSON.stringify(carrinho))
    window.location.href = '/checkout'
  }

  const quartosFiltrados = quartos.filter(quarto => {
    // Filtra por número de pessoas (assumindo que cada quarto suporta pelo menos 2 pessoas)
    return true // Por enquanto mostra todos, pode adicionar lógica de capacidade depois
  })

  return (
    <div className="reservar-quartos-page">
      <Header />
      <BookingEngine categoria="quartos" onSearch={handleSearch} />
      
      <div className="reservar-quartos-container">
        <div className="reservar-quartos-header">
          <h1>Reservar Quartos</h1>
          <p>Escolha o quarto perfeito para sua estadia</p>
        </div>

        {loading ? (
          <div className="reservar-quartos-loading">
            <p>Carregando opções...</p>
          </div>
        ) : quartosFiltrados.length === 0 ? (
          <div className="reservar-quartos-empty">
            <p>Nenhum quarto disponível no momento.</p>
          </div>
        ) : (
          <div className="reservar-quartos-grid">
            {quartosFiltrados.map(quarto => (
              <div key={quarto.id} className="reservar-quartos-card">
                <div className={`reservar-quartos-card-image ${quarto.id}`}></div>
                <div className="reservar-quartos-card-content">
                  <h3>{quarto.nome}</h3>
                  <p className="reservar-quartos-card-description">
                    {quarto.descricao}
                  </p>
                  <div className="reservar-quartos-card-price">
                    <span className="price-label">A partir de</span>
                    <span className="price-value">R$ {formatarMoeda(quarto.preco)} / noite</span>
                  </div>
                  {filtros.checkIn && filtros.checkOut && (
                    <div className="reservar-quartos-card-total">
                      <span>Total para {Math.ceil((new Date(filtros.checkOut) - new Date(filtros.checkIn)) / (1000 * 60 * 60 * 24))} noites:</span>
                      <strong>R$ {formatarMoeda(calcularTotal(quarto.preco))}</strong>
                    </div>
                  )}
                  <button
                    className="reservar-quartos-card-button"
                    onClick={() => handleReservar(quarto)}
                  >
                    Reservar Agora
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default ReservarQuartos


