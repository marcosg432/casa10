import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { getReservas, updateReserva, formatarMoeda } from '../../utils/storage'
import AdminHeader from '../../components/AdminHeader'
import './Reservas.css'

const Reservas = () => {
  const navigate = useNavigate()
  const [reservas, setReservas] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedReserva, setSelectedReserva] = useState(null)

  const loadReservas = async () => {
    try {
      // Log sempre para debug
      console.log('🔄 Carregando reservas...')
      
      const todasReservas = await getReservas()
      console.log('📊 Total de reservas no banco:', todasReservas.length)
      console.log('📋 Todas as reservas:', todasReservas)
      
      // Filtra apenas reservas pendentes (ativas)
      const reservasAtivas = todasReservas.filter(r => r.status !== 'cancelada' && r.status !== 'concluida')
      console.log('✅ Reservas ativas (pendentes):', reservasAtivas.length)
      console.log('📝 Reservas ativas:', reservasAtivas)
      
      // Mostra reservas filtradas também
      const reservasCanceladas = todasReservas.filter(r => r.status === 'cancelada')
      const reservasConcluidas = todasReservas.filter(r => r.status === 'concluida')
      console.log('❌ Reservas canceladas:', reservasCanceladas.length)
      console.log('✔️ Reservas concluídas:', reservasConcluidas.length)
      
      setReservas(reservasAtivas)
    } catch (error) {
      console.error('❌ Erro ao carregar reservas:', error)
      alert('Erro ao carregar reservas. Por favor, recarregue a página.')
    }
  }

  useEffect(() => {
    loadReservas()
  }, [])

  const filteredReservas = reservas.filter(r => {
    const search = searchTerm.toLowerCase()
    return (
      r.nome?.toLowerCase().includes(search) ||
      r.email?.toLowerCase().includes(search) ||
      r.telefone?.includes(search) ||
      r.codigo?.toLowerCase().includes(search)
    )
  })

  const handleVerFicha = (reserva) => {
    setSelectedReserva(reserva)
  }

  const handleCancelar = async (id) => {
    if (window.confirm('Deseja realmente cancelar esta reserva?')) {
      await updateReserva(id, { status: 'cancelada' })
      setReservas(reservas.filter(r => r.id !== id))
      setSelectedReserva(null)
    }
  }

  return (
    <div className="reservas-page">
      <AdminHeader currentPage="reservas" />
      <div className="reservas-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <h1 className="reservas-title">Reservas</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={loadReservas}
              style={{
                padding: '10px 20px',
                background: '#1F6FB2',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Atualizar
            </button>
            <button 
              onClick={async () => {
                const todas = await getReservas()
                console.log('🔍 DEBUG - Todas as reservas no banco:', todas)
                alert(`Total de reservas no banco: ${todas.length}\nVerifique o console (F12) para mais detalhes.`)
              }}
              style={{
                padding: '10px 20px',
                background: '#666',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Debug
            </button>
            <button 
              onClick={async () => {
                try {
                  console.log('🧪 TESTE: Tentando criar uma reserva de teste...')
                  const { saveReserva } = await import('../../utils/storage')
                  
                  const reservaTeste = {
                    nome: 'Teste Usuario',
                    email: 'teste@teste.com',
                    telefone: '27999999999',
                    quartoId: 'teste',
                    quartoNome: 'Quarto de Teste',
                    quartoImagem: '/imagem/quarto-deluxe.jpg',
                    preco: 100,
                    quantidade: 1,
                    pessoas: 2,
                    total: 100,
                    noites: 1,
                    checkIn: new Date().toISOString(),
                    checkOut: new Date(Date.now() + 86400000).toISOString(),
                    origem: 'Teste Manual',
                    metodoPagamento: 'Pix'
                  }
                  
                  console.log('🧪 Dados da reserva de teste:', reservaTeste)
                  const resultado = await saveReserva(reservaTeste)
                  console.log('✅ Reserva de teste salva:', resultado)
                  
                  // Recarrega as reservas
                  await loadReservas()
                  
                  alert('Reserva de teste criada com sucesso! Verifique o console e a lista de reservas.')
                } catch (error) {
                  console.error('❌ Erro ao criar reserva de teste:', error)
                  alert(`Erro ao criar reserva de teste: ${error.message}\nVerifique o console (F12) para mais detalhes.`)
                }
              }}
              style={{
                padding: '10px 20px',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Testar Salvamento
            </button>
          </div>
        </div>

        <div className="reservas-search">
          <input
            type="text"
            placeholder="Nome,Numero,E-mail e Código"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="reservas-search-input"
          />
          <FaSearch className="reservas-search-icon" />
        </div>

        {selectedReserva ? (
          <div className="reserva-ficha">
            <div className="ficha-header">
              <h3>{selectedReserva.codigo}</h3>
              <button onClick={() => setSelectedReserva(null)} className="ficha-close">
                <FaTimes />
              </button>
            </div>
            <div className="ficha-content">
              <div className="ficha-row">
                <div className="ficha-group">
                  <label>Nome</label>
                  <input type="text" value={selectedReserva.nome || ''} readOnly />
                </div>
                <div className="ficha-group">
                  <label>Telefone</label>
                  <input type="text" value={selectedReserva.telefone || ''} readOnly />
                </div>
              </div>
              <div className="ficha-row">
                <div className="ficha-group">
                  <label>E-mail</label>
                  <input type="text" value={selectedReserva.email || ''} readOnly />
                </div>
                <div className="ficha-group">
                  <label>Pessoas</label>
                  <input type="text" value={selectedReserva.pessoas || 0} readOnly />
                </div>
              </div>
              <div className="ficha-group">
                <label>nome da suite</label>
                <input type="text" value={selectedReserva.quartoNome || ''} readOnly />
              </div>
              <div className="ficha-row">
                <div className="ficha-group">
                  <label>crianças</label>
                  <input type="text" value={selectedReserva.quantidadeCriancas || 0} readOnly />
                </div>
                <div className="ficha-group">
                  <label>Idades</label>
                  <input type="text" value={selectedReserva.idades?.join(', ') || ''} readOnly />
                </div>
              </div>
              <div className="ficha-row">
                <div className="ficha-group">
                  <label>R$ {formatarMoeda(selectedReserva.preco || 0)} / Noite</label>
                </div>
                <div className="ficha-group">
                  <label>Total de Noite</label>
                  <input type="text" value={selectedReserva.noites || 0} readOnly />
                </div>
              </div>
              <div className="ficha-group">
                <label>Total / R$ {selectedReserva.total ? formatarMoeda(selectedReserva.total) : '0,00'}</label>
              </div>
              <div className="ficha-actions">
                <button onClick={() => handleCancelar(selectedReserva.id)} className="ficha-cancelar">
                  Cancelar reserva
                </button>
                <button onClick={() => setSelectedReserva(null)} className="ficha-sair">
                  Sair
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="reservas-list">
            {filteredReservas.length === 0 ? (
              <div className="reservas-empty">
                <p>Ainda não há reservas feitas</p>
                <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
                  Dica: Verifique o console (F12) e clique no botão "Debug" para ver todas as reservas no banco.
                </p>
              </div>
            ) : (
              filteredReservas.map(reserva => (
                <div key={reserva.id} className="reserva-item">
                  <div className="reserva-codigo">{reserva.codigo}</div>
                  <div className="reserva-info" style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                    {reserva.nome} • {reserva.quartoNome} • {reserva.checkIn ? new Date(reserva.checkIn).toLocaleDateString('pt-BR') : 'N/A'}
                  </div>
                  <div className="reserva-actions">
                    <button onClick={() => handleVerFicha(reserva)} className="reserva-button">
                      Ver ficha
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Reservas

