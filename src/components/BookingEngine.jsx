import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaCalendarAlt, FaUsers, FaSearch } from 'react-icons/fa'
import { format } from 'date-fns'
import Calendar from './Calendar'
import './BookingEngine.css'

const BookingEngine = ({ onSearch }) => {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Recupera filtros do localStorage ou usa valores padrão
  const getStoredFilters = () => {
    try {
      const stored = localStorage.getItem('casa10_booking_filters')
      if (stored) {
        const parsed = JSON.parse(stored)
        return {
          checkIn: parsed.checkIn ? new Date(parsed.checkIn) : null,
          checkOut: parsed.checkOut ? new Date(parsed.checkOut) : null,
          pessoas: parsed.pessoas || 2
        }
      }
    } catch (err) {
      console.error('Erro ao recuperar filtros:', err)
    }
    return {
      checkIn: null,
      checkOut: null,
      pessoas: 2
    }
  }

  const [filters, setFilters] = useState(getStoredFilters)
  const [showCalendar, setShowCalendar] = useState({ checkIn: false, checkOut: false })

  // Salva filtros no localStorage sempre que mudarem
  useEffect(() => {
    localStorage.setItem('casa10_booking_filters', JSON.stringify({
      checkIn: filters.checkIn ? filters.checkIn.toISOString() : null,
      checkOut: filters.checkOut ? filters.checkOut.toISOString() : null,
      pessoas: filters.pessoas,
      categoria: filters.categoria
    }))
  }, [filters])

  const handleDateSelect = (checkIn, checkOut) => {
    setFilters(prev => ({
      ...prev,
      checkIn,
      checkOut
    }))
    setShowCalendar({ checkIn: false, checkOut: false })
  }

  const handlePessoasChange = (e) => {
    const value = e.target.value
    // Permite digitar qualquer número (sem limite máximo)
    if (value === '') {
      setFilters(prev => ({ ...prev, pessoas: '' }))
      return
    }
    // Permite digitar números sem restrições
    const pessoas = parseInt(value)
    if (!isNaN(pessoas) && pessoas >= 1) {
      setFilters(prev => ({ ...prev, pessoas }))
    }
    // Se estiver digitando e ainda não completou o número, não bloqueia
    // Isso permite digitar números grandes
  }

  const handleSearch = () => {
    if (!filters.checkIn || !filters.checkOut) {
      alert('Por favor, selecione as datas de check-in e check-out')
      return
    }

    if (filters.checkOut <= filters.checkIn) {
      alert('A data de check-out deve ser posterior à data de check-in')
      return
    }

    // Validação básica
    const pessoas = typeof filters.pessoas === 'number' ? filters.pessoas : parseInt(filters.pessoas)
    if (!pessoas || pessoas < 1 || isNaN(pessoas)) {
      alert('Por favor, informe o número de hóspedes')
      return
    }
    
    // Atualiza o estado com o valor numérico
    const updatedFilters = { ...filters, pessoas }
    setFilters(updatedFilters)
    
    // Salva filtros antes de navegar
    localStorage.setItem('casa10_booking_filters', JSON.stringify({
      checkIn: filters.checkIn.toISOString(),
      checkOut: filters.checkOut.toISOString(),
      pessoas: pessoas
    }))

    // Se tem callback, chama ele
    if (onSearch) {
      onSearch(updatedFilters)
      return
    }
    
    // Lógica baseada no número de hóspedes
    // Se hóspedes > 2: redireciona para casa10inn
    // Se hóspedes <= 2: redireciona para página de quartos
    if (pessoas > 2) {
      navigate('/casa10inn')
    } else {
      navigate('/quartos-disponiveis')
    }
  }

  const openCalendar = (type) => {
    setShowCalendar({
      checkIn: type === 'checkIn',
      checkOut: type === 'checkOut'
    })
  }

  return (
    <div className="booking-engine">
      <div className="booking-engine-container">
        <div className="booking-engine-field">
          <FaCalendarAlt className="booking-engine-icon" />
          <div className="booking-engine-input-wrapper">
            <label className="booking-engine-label">CHECK-IN</label>
            <input
              type="text"
              className="booking-engine-input"
              value={filters.checkIn ? format(filters.checkIn, 'dd/MM/yyyy') : ''}
              onClick={() => openCalendar('checkIn')}
              readOnly
              placeholder="Data de entrada"
            />
            {showCalendar.checkIn && (
              <div className="booking-engine-calendar-popup">
                <Calendar
                  quartoId={null}
                  checkIn={filters.checkIn}
                  checkOut={filters.checkOut}
                  onDateSelect={handleDateSelect}
                  selectingCheckIn={true}
                />
              </div>
            )}
          </div>
        </div>

        <div className="booking-engine-field">
          <FaCalendarAlt className="booking-engine-icon" />
          <div className="booking-engine-input-wrapper">
            <label className="booking-engine-label">CHECK-OUT</label>
            <input
              type="text"
              className="booking-engine-input"
              value={filters.checkOut ? format(filters.checkOut, 'dd/MM/yyyy') : ''}
              onClick={() => openCalendar('checkOut')}
              readOnly
              placeholder="Data de saída"
            />
            {showCalendar.checkOut && (
              <div className="booking-engine-calendar-popup">
                <Calendar
                  quartoId={null}
                  checkIn={filters.checkIn}
                  checkOut={filters.checkOut}
                  onDateSelect={handleDateSelect}
                  selectingCheckIn={false}
                />
              </div>
            )}
          </div>
        </div>

        <div className="booking-engine-field">
          <FaUsers className="booking-engine-icon" />
          <div className="booking-engine-input-wrapper">
            <label className="booking-engine-label">HÓSPEDES</label>
              <input
                type="number"
                className="booking-engine-input"
                value={filters.pessoas}
                onChange={handlePessoasChange}
                min="1"
                placeholder="Número de pessoas"
              />
          </div>
        </div>

        <button 
          type="button"
          className="booking-engine-search-btn"
          onClick={handleSearch}
        >
          <FaSearch className="booking-engine-search-icon" />
          BUSCAR
        </button>
      </div>
    </div>
  )
}

export default BookingEngine

