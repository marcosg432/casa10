import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import BookingEngine from '../components/BookingEngine'
import { getQuartos, isQuartoDisponivel, formatarMoeda } from '../utils/storage'
import { format } from 'date-fns'
import Footer from '../components/Footer'
import './ReservarCasa.css'

const ReservarCasa = () => {
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
      // Busca apenas quartos da categoria 'casa'
      const todosQuartos = await getQuartos('casa')
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

    // Busca a imagem do quarto/casa
    const { PROPRIEDADES } = await import('../utils/propriedades')
    const casaInfo = PROPRIEDADES.CASA_DE_CIMA
    const quartoImagem = casaInfo.imagens && casaInfo.imagens.length > 0 
      ? casaInfo.imagens[0] 
      : '/imagem/casa-2.jpg'
    
    // Calcula número de noites
    const diffTime = Math.abs(new Date(filtros.checkOut) - new Date(filtros.checkIn))
    const noites = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    // Salva no carrinho e redireciona para checkout
    const carrinho = {
      quartoId: quarto.id,
      quartoNome: quarto.nome,
      quartoImagem: quartoImagem,
      checkIn: filtros.checkIn.toISOString(),
      checkOut: filtros.checkOut.toISOString(),
      preco: quarto.preco,
      total: calcularTotal(quarto.preco),
      pessoas: filtros.pessoas,
      noites: noites
    }

    localStorage.setItem('casa10_carrinho', JSON.stringify(carrinho))
    window.location.href = '/checkout'
  }

  const quartosFiltrados = quartos.filter(quarto => {
    // Filtra por número de pessoas (assumindo que cada quarto suporta pelo menos 2 pessoas)
    // Você pode ajustar essa lógica baseado na capacidade real de cada quarto
    return true // Por enquanto mostra todos, pode adicionar lógica de capacidade depois
  })

  return (
    <div className="reservar-casa-page">
      <Header />
      <BookingEngine categoria="casa" onSearch={handleSearch} />
      
      <div className="reservar-casa-container">
        <div className="reservar-casa-header">
          <h1>Reservar Casa</h1>
          <p>Escolha a casa perfeita para sua estadia</p>
        </div>

        {loading ? (
          <div className="reservar-casa-loading">
            <p>Carregando opções...</p>
          </div>
        ) : quartosFiltrados.length === 0 ? (
          <div className="reservar-casa-empty">
            <p>Nenhuma casa disponível no momento.</p>
          </div>
        ) : (
          <div className="reservar-casa-grid">
            {quartosFiltrados.map(quarto => (
              <div key={quarto.id} className="reservar-casa-card">
                <div className={`reservar-casa-card-image ${quarto.id}`}></div>
                <div className="reservar-casa-card-content">
                  <h3>{quarto.nome}</h3>
                  <p className="reservar-casa-card-description">
                    {quarto.descricao}
                  </p>
                  <div className="reservar-casa-card-price">
                    <span className="price-label">A partir de</span>
                    <span className="price-value">R$ {formatarMoeda(quarto.preco)} / noite</span>
                  </div>
                  {filtros.checkIn && filtros.checkOut && (
                    <div className="reservar-casa-card-total">
                      <span>Total para {Math.ceil((new Date(filtros.checkOut) - new Date(filtros.checkIn)) / (1000 * 60 * 60 * 24))} noites:</span>
                      <strong>R$ {formatarMoeda(calcularTotal(quarto.preco))}</strong>
                    </div>
                  )}
                  <button
                    className="reservar-casa-card-button"
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

export default ReservarCasa








