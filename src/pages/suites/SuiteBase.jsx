import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaSnowflake, FaLock, FaWifi, FaBriefcase, FaTv, FaChevronLeft, FaChevronRight, FaUsers, FaRulerCombined, FaDollarSign, FaUtensils, FaBed, FaFire, FaCouch, FaTshirt, FaPlug, FaBan, FaHome, FaKey, FaBolt, FaBox, FaBath, FaVideo, FaWheelchair, FaHandPaper, FaArrowLeft } from 'react-icons/fa'
import PrivateHeader from '../../components/PrivateHeader'
import Footer from '../../components/Footer'
import Calendar from '../../components/Calendar'
import { format } from 'date-fns'
import { saveCarrinho, formatarMoeda } from '../../utils/storage'
import { sanitizeString, sanitizeEmail, sanitizePhone, validateEmail, validatePhone, validateRequired } from '../../utils/security'
import './SuiteBase.css'

const SuiteBase = ({ suiteData, images, customInfo, disableBooking = false, internalRooms = null, customHouseInfo = null }) => {
  const navigate = useNavigate()
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [showCalendar, setShowCalendar] = useState({ checkIn: false, checkOut: false })
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)
  const [modalImageIndex, setModalImageIndex] = useState(0)
  
  // Imagens do carrossel - usa imagens passadas como prop ou imagens padrão
  const suiteImages = images || [
    '/imagem/suite-premium/suite-premium-01.jpg',
    '/imagem/suite-premium/suite-premium-02.jpg',
    '/imagem/suite-premium/suite-premium-03.jpg',
    '/imagem/suite-premium/suite-premium-04.jpg',
    '/imagem/suite-premium/suite-premium-05.jpg',
    '/imagem/suite-premium/suite-premium-06.jpg',
    '/imagem/suite-premium/suite-premium-07.jpg',
    '/imagem/suite-premium/suite-premium-08.jpg',
    '/imagem/suite-premium/suite-premium-09.jpg',
    '/imagem/suite-premium/suite-premium-10.jpg',
    '/imagem/suite-premium/suite-premium-11.jpg',
    '/imagem/suite-premium/suite-premium-12.jpg',
    '/imagem/suite-premium/suite-premium-13.jpg',
    '/imagem/suite-premium/suite-premium-14.jpg',
    '/imagem/suite-premium/suite-premium-15.jpg',
    '/imagem/suite-premium/suite-premium-16.jpg',
    '/imagem/suite-premium/suite-premium-17.jpg',
    '/imagem/suite-premium/suite-premium-18.jpg',
    '/imagem/suite-premium/suite-premium-19.jpg',
    '/imagem/suite-premium/suite-premium-20.jpg',
    '/imagem/suite-premium/suite-premium-21.jpg',
    '/imagem/suite-premium/suite-premium-22.jpg',
    '/imagem/suite-premium/suite-premium-23.jpg',
    '/imagem/suite-premium/suite-premium-24.jpg'
  ]

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    pessoas: 2,
    temCriancas: false,
    quantidadeCriancas: 0,
    idades: [],
    checkIn: null,
    checkOut: null
  })

  const handleDateSelect = (checkIn, checkOut) => {
    setFormData({
      ...formData,
      checkIn,
      checkOut
    })
    setShowCalendar({ checkIn: false, checkOut: false })
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleCriancasChange = (e) => {
    const temCriancas = e.target.checked
    setFormData({
      ...formData,
      temCriancas,
      quantidadeCriancas: temCriancas ? 1 : 0,
      idades: temCriancas ? [0] : []
    })
  }

  const handleQuantidadeCriancas = (e) => {
    const quantidade = parseInt(e.target.value) || 0
    const maxCriancas = Math.min(quantidade, 4)
    setFormData({
      ...formData,
      quantidadeCriancas: maxCriancas,
      idades: Array(maxCriancas).fill(0).map((_, i) => formData.idades[i] || 0)
    })
  }

  const handleIdadeChange = (index, value) => {
    const novasIdades = [...formData.idades]
    novasIdades[index] = parseInt(value) || 0
    setFormData({
      ...formData,
      idades: novasIdades
    })
  }

  const calcularTotal = () => {
    if (!formData.checkIn || !formData.checkOut) return 0
    const checkIn = formData.checkIn instanceof Date ? formData.checkIn : new Date(formData.checkIn)
    const checkOut = formData.checkOut instanceof Date ? formData.checkOut : new Date(formData.checkOut)
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays * suiteData.preco
  }

  const calcularNoites = () => {
    if (!formData.checkIn || !formData.checkOut) return 0
    const checkIn = formData.checkIn instanceof Date ? formData.checkIn : new Date(formData.checkIn)
    const checkOut = formData.checkOut instanceof Date ? formData.checkOut : new Date(formData.checkOut)
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  // Scroll para o topo quando a página carregar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Pré-carrega apenas as 2 imagens próximas (anterior e próxima) para melhor performance no mobile
  useEffect(() => {
    // No mobile, reduz o pré-carregamento para economizar banda
    const isMobile = window.innerWidth <= 768
    const preloadCount = isMobile ? 1 : 2
    
    const preloadImages = () => {
      const indicesToPreload = []
      
      // Sempre pré-carrega a próxima imagem
      indicesToPreload.push((currentImageIndex + 1) % suiteImages.length)
      
      // No desktop, também pré-carrega a anterior
      if (!isMobile) {
        indicesToPreload.push((currentImageIndex - 1 + suiteImages.length) % suiteImages.length)
      }

      indicesToPreload.forEach(index => {
        const img = new Image()
        img.src = suiteImages[index]
      })
    }

    preloadImages()
  }, [currentImageIndex, suiteImages])

  // Autoplay do carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % suiteImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [suiteImages.length])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % suiteImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + suiteImages.length) % suiteImages.length)
  }

  const openImageModal = (index) => {
    setModalImageIndex(index)
    setShowImageModal(true)
  }

  const closeImageModal = () => {
    setShowImageModal(false)
  }

  const nextModalImage = () => {
    setModalImageIndex((prev) => (prev + 1) % suiteImages.length)
  }

  const prevModalImage = () => {
    setModalImageIndex((prev) => (prev - 1 + suiteImages.length) % suiteImages.length)
  }

  // Fechar modal com ESC
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        closeImageModal()
      }
    }
    if (showImageModal) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [showImageModal])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (!formData.checkIn || !formData.checkOut) {
        alert('Por favor, selecione as datas de check-in e check-out')
        return
      }

      // Validações
      if (!validateRequired(formData.nome)) {
        alert('Por favor, preencha o nome')
        return
      }
      if (!validateEmail(formData.email)) {
        alert('Por favor, insira um email válido')
        return
      }
      if (!validatePhone(formData.telefone)) {
        alert('Por favor, insira um telefone válido')
        return
      }

      // Validação de pessoas
      if (!formData.pessoas || formData.pessoas <= 0) {
        alert('Por favor, informe o número de pessoas')
        return
      }

      // Validação dos limites por tipo de acomodação
      const pessoas = parseInt(formData.pessoas)
      const maxPessoas = customHouseInfo ? 15 : 2
      if (pessoas > maxPessoas) {
        const tipoAcomodacao = customHouseInfo ? 'Casa10inn' : 'quarto'
        alert(`O número máximo de hóspedes para ${tipoAcomodacao} é ${maxPessoas}. Por favor, ajuste o número de pessoas.`)
        return
      }

      // Converte datas para strings ISO
      let checkInDate = formData.checkIn
      let checkOutDate = formData.checkOut
      
      if (checkInDate instanceof Date) {
        checkInDate = checkInDate.toISOString()
      } else if (typeof checkInDate === 'string') {
        // Se já for string, tenta converter para Date e depois para ISO
        const date = new Date(checkInDate)
        if (!isNaN(date.getTime())) {
          checkInDate = date.toISOString()
        }
      }
      
      if (checkOutDate instanceof Date) {
        checkOutDate = checkOutDate.toISOString()
      } else if (typeof checkOutDate === 'string') {
        const date = new Date(checkOutDate)
        if (!isNaN(date.getTime())) {
          checkOutDate = date.toISOString()
        }
      }

      const noites = calcularNoites()
      const total = calcularTotal()

      // Sanitiza dados antes de salvar
      const carrinho = {
        nome: sanitizeString(formData.nome),
        email: sanitizeEmail(formData.email),
        telefone: sanitizePhone(formData.telefone),
        quartoId: suiteData.id,
        quartoNome: suiteData.nome,
        preco: suiteData.preco,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        quantidade: noites,
        pessoas: parseInt(formData.pessoas) || 2,
        total: total,
        noites: noites,
        temCriancas: formData.temCriancas || false,
        quantidadeCriancas: formData.quantidadeCriancas || 0,
        idades: formData.idades || []
      }

      await saveCarrinho(carrinho)
      navigate('/carrinho')
    } catch (error) {
      // Log do erro apenas no console em desenvolvimento (sem stack trace)
      if (process.env.NODE_ENV === 'development') {
        console.error('Erro ao fazer reserva:', error.message)
      }
      // Mensagem genérica para o usuário (não expõe detalhes técnicos)
      alert('Ocorreu um erro ao processar sua reserva. Por favor, verifique os dados e tente novamente.')
    }
  }

  return (
    <div className="suite-page">
      <PrivateHeader />
      
      <div className="suite-container">
        <button 
          className="suite-back-button"
          onClick={() => navigate(-1)}
          title="Voltar"
        >
          <FaArrowLeft /> Voltar
        </button>
        <div className="suite-left">
          <div className="suite-image-carousel">
            <div 
              className="suite-carousel-image"
              style={{ backgroundImage: `url(${suiteImages[currentImageIndex]})` }}
              onClick={() => openImageModal(currentImageIndex)}
            >
              <button 
                className="suite-carousel-button suite-carousel-button-prev"
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
                aria-label="Imagem anterior"
              >
                <FaChevronLeft />
              </button>
              <button 
                className="suite-carousel-button suite-carousel-button-next"
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
                aria-label="Próxima imagem"
              >
                <FaChevronRight />
              </button>
              <div className="suite-carousel-dots" onClick={(e) => e.stopPropagation()}>
                {suiteImages.map((_, index) => (
                  <button
                    key={index}
                    className={`suite-carousel-dot ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentImageIndex(index)
                    }}
                    aria-label={`Ir para imagem ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Descrição - apenas para quartos que não têm disableBooking */}
          {!disableBooking && (
          <div className="suite-description">
            <div className="suite-description-logo">
              <img src="/icones/logo boa.png" className="suite-description-logo-icon" alt="Casa10 Logo" />
            </div>
            <h2 className="suite-title">{suiteData.nome}</h2>
            <p className="suite-text">{suiteData.descricao}</p>
            </div>
          )}

          {/* Cards internos dos quartos (apenas para Casa10inn) */}
          {internalRooms && (
            <div className="suite-internal-rooms">
              {internalRooms.map((room, index) => (
                <div key={index} className="suite-internal-room-card">
                  <div className="suite-internal-room-image" style={{ backgroundImage: `url(${room.image})` }}></div>
                  <div className="suite-internal-room-content">
                    <h4 className="suite-internal-room-title">{room.title}</h4>
                    <p className="suite-internal-room-description">{room.description}</p>
                    <Link to={room.link} className="suite-internal-room-button">saiba mais</Link>
                  </div>
                </div>
              ))}
          </div>
          )}

          {/* Comodidades - apenas para quartos que não têm disableBooking (ou seja, não são quartos individuais) */}
          {!disableBooking && (
          <div className="suite-amenities-section">
            <h3 className="suite-amenities-title">Comodidades{customHouseInfo ? ' da Casa' : ''}</h3>
          <div className="suite-amenities">
              {customHouseInfo ? (
                <>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaBath /></span>
                    <span>Jacuzzi</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaSnowflake /></span>
                    <span>Ar-condicionado</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaUtensils /></span>
                    <span>Cozinha</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaTshirt /></span>
                    <span>Máquina de lavar roupas</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaCouch /></span>
                    <span>Sofá</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaTshirt /></span>
                    <span>Roupa de cama</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaPlug /></span>
                    <span>Tomada perto da cama</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaBolt /></span>
                    <span>Produtos de limpeza</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaHome /></span>
                    <span>Piso de mármore/azulejo</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaBriefcase /></span>
                    <span>Mesa de trabalho</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaCouch /></span>
                    <span>Área de estar</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaVideo /></span>
                    <span>Aparelho de vídeo</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaKey /></span>
                    <span>Entrada privativa</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaTv /></span>
                    <span>TV</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaBolt /></span>
                    <span>Geladeira</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaTv /></span>
                    <span>Canais via satélite</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaBolt /></span>
                    <span>Micro-ondas</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaTv /></span>
                    <span>TV de tela plana</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaUtensils /></span>
                    <span>Utensílios de cozinha</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaTv /></span>
                    <span>Canais a cabo</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaFire /></span>
                    <span>Forno</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaFire /></span>
                    <span>Fogão</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaUtensils /></span>
                    <span>Área para refeições</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaUtensils /></span>
                    <span>Mesa de jantar</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaHome /></span>
                    <span>Independente</span>
                  </div>
            <div className="amenity-item">
              <span className="amenity-icon"><FaSnowflake /></span>
                    <span>Ar-condicionado individual para cada ambiente na acomodação</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaHandPaper /></span>
                    <span>Álcool gel</span>
            </div>
            <div className="amenity-item">
                    <span className="amenity-icon"><FaWheelchair /></span>
                    <span>Acessível para pessoas com deficiência auditiva</span>
            </div>
            <div className="amenity-item">
              <span className="amenity-icon"><FaWifi /></span>
                    <span>WiFi Gratuito</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaSnowflake /></span>
                    <span>Ar-condicionado</span>
                  </div>
                  {customInfo && (
                    <div className="amenity-item">
                      <span className="amenity-icon"><FaUtensils /></span>
                      <span>Cozinha</span>
                    </div>
                  )}
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaTshirt /></span>
                    <span>Máquina de lavar roupas</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaTv /></span>
                    <span>Serviço de streaming (como Netflix)</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaCouch /></span>
                    <span>Sofá</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaTshirt /></span>
                    <span>Roupa de cama</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaPlug /></span>
                    <span>Tomada perto da cama</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaHome /></span>
                    <span>Piso de mármore/azulejo</span>
            </div>
            <div className="amenity-item">
              <span className="amenity-icon"><FaBriefcase /></span>
              <span>Mesa de trabalho</span>
            </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaCouch /></span>
                    <span>Área de estar</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaKey /></span>
                    <span>Entrada privativa</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaBolt /></span>
                    <span>Geladeira</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaTshirt /></span>
                    <span>Comodidades para passar roupa</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaUtensils /></span>
                    <span>Chaleira/cafeteira</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaTshirt /></span>
                    <span>Ferro de passar roupa</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaBolt /></span>
                    <span>Micro-ondas</span>
                  </div>
            <div className="amenity-item">
              <span className="amenity-icon"><FaTv /></span>
                    <span>TV de tela plana</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaUtensils /></span>
                    <span>Utensílios de cozinha</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaBox /></span>
                    <span>Guarda-roupa ou armário</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaFire /></span>
                    <span>Forno</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaFire /></span>
                    <span>Fogão</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaFire /></span>
                    <span>Churrasqueira</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaUtensils /></span>
                    <span>Área para refeições</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaUtensils /></span>
                    <span>Mesa de jantar</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaHome /></span>
                    <span>Toda a unidade localizada no térreo</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaTshirt /></span>
                    <span>Varal para secar roupas</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><FaWifi /></span>
                    <span>WiFi Gratuito</span>
                  </div>
                </>
              )}
            </div>
          </div>
          )}

          {/* Cozinha Privativa - Customizada para Casa10inn ou padrão - apenas para quartos que não têm disableBooking */}
          {!disableBooking && (
            <>
              {customHouseInfo ? (
                <div className="suite-kitchen-section">
                  <h3 className="suite-amenities-title">Na sua cozinha privativa:</h3>
                  <div className="suite-amenities">
                    <div className="amenity-item">
                      <span className="amenity-icon"><FaTshirt /></span>
                      <span>Máquina de lavar roupas</span>
                    </div>
                    <div className="amenity-item">
                      <span className="amenity-icon"><FaBolt /></span>
                      <span>Produtos de limpeza</span>
                    </div>
                    <div className="amenity-item">
                      <span className="amenity-icon"><FaBolt /></span>
                      <span>Geladeira</span>
                    </div>
                    <div className="amenity-item">
                      <span className="amenity-icon"><FaBolt /></span>
                      <span>Micro-ondas</span>
                    </div>
                    <div className="amenity-item">
                      <span className="amenity-icon"><FaUtensils /></span>
                      <span>Utensílios de cozinha</span>
                    </div>
                    <div className="amenity-item">
                      <span className="amenity-icon"><FaFire /></span>
                      <span>Forno</span>
                    </div>
                    <div className="amenity-item">
                      <span className="amenity-icon"><FaFire /></span>
                      <span>Fogão</span>
                    </div>
                    <div className="amenity-item">
                      <span className="amenity-icon"><FaUtensils /></span>
                      <span>Mesa de jantar</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="suite-kitchen-section">
                  <h3 className="suite-amenities-title">Cozinha Privativa</h3>
                  <div className="suite-amenities">
                    <div className="amenity-item">
                      <span className="amenity-icon"><FaTshirt /></span>
                      <span>Máquina de lavar roupas</span>
                    </div>
                    <div className="amenity-item">
                      <span className="amenity-icon"><FaBolt /></span>
                      <span>Geladeira</span>
                    </div>
                    <div className="amenity-item">
                      <span className="amenity-icon"><FaBolt /></span>
                      <span>Micro-ondas</span>
                    </div>
                    <div className="amenity-item">
                      <span className="amenity-icon"><FaUtensils /></span>
                      <span>Utensílios de cozinha</span>
                    </div>
                    <div className="amenity-item">
                      <span className="amenity-icon"><FaFire /></span>
                      <span>Forno</span>
                    </div>
                    <div className="amenity-item">
                      <span className="amenity-icon"><FaFire /></span>
                      <span>Fogão</span>
                    </div>
                    <div className="amenity-item">
                      <span className="amenity-icon"><FaUtensils /></span>
                      <span>Mesa de jantar</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Banheiro Privativo - Apenas para Casa10inn */}
          {!disableBooking && customHouseInfo && (
            <div className="suite-bathroom-section">
              <h3 className="suite-amenities-title">No seu banheiro privativo:</h3>
              <div className="suite-amenities">
                <div className="amenity-item">
                  <span className="amenity-icon"><FaBath /></span>
                  <span>Produtos de higiene pessoal gratuitos</span>
                </div>
                <div className="amenity-item">
                  <span className="amenity-icon"><FaBath /></span>
                  <span>Vaso sanitário</span>
                </div>
                <div className="amenity-item">
                  <span className="amenity-icon"><FaBath /></span>
                  <span>Banheira ou chuveiro</span>
                </div>
                <div className="amenity-item">
                  <span className="amenity-icon"><FaTshirt /></span>
                  <span>Toalhas</span>
                </div>
                <div className="amenity-item">
                  <span className="amenity-icon"><FaBath /></span>
                  <span>Papel higiênico</span>
                </div>
            </div>
          </div>
          )}

          {/* Cards de Informação e Regras - apenas para quartos que não têm disableBooking */}
          {!disableBooking && (
            <>
          <div className="suite-info-cards">
                {customHouseInfo ? (
                  <>
                    <div className="suite-info-card">
                      <div className="suite-info-icon">
                        <FaUsers />
                      </div>
                      <div className="suite-info-label">Capacidade</div>
                      <div className="suite-info-value">{customHouseInfo.capacidade || '15 pessoas'}</div>
                    </div>
                    <div className="suite-info-card">
                      <div className="suite-info-icon">
                        <FaRulerCombined />
                      </div>
                      <div className="suite-info-label">Área da Casa</div>
                      <div className="suite-info-value">{customHouseInfo.area || '180 m²'}</div>
                    </div>
                    <div className="suite-info-card">
                      <div className="suite-info-icon">
                        <FaBath />
                      </div>
                      <div className="suite-info-label">Banheiros</div>
                      <div className="suite-info-value">{customHouseInfo.banheiros || '3'}</div>
                    </div>
                    <div className="suite-info-card">
                      <div className="suite-info-icon">
                        <FaDollarSign />
                      </div>
                      <div className="suite-info-label">Valor da Diária</div>
                      <div className="suite-info-value">R$ {formatarMoeda(suiteData.preco)}/noite</div>
                    </div>
                  </>
                ) : (
                  <>
            <div className="suite-info-card">
              <div className="suite-info-icon">
                <FaUsers />
              </div>
              <div className="suite-info-label">Capacidade</div>
                      <div className="suite-info-value">2 pessoas</div>
            </div>
            <div className="suite-info-card">
              <div className="suite-info-icon">
                <FaRulerCombined />
              </div>
              <div className="suite-info-label">Tamanho</div>
                      <div className="suite-info-value">{customInfo?.tamanho || '12 m²'}</div>
                    </div>
                    <div className="suite-info-card">
                      <div className="suite-info-icon">
                        <FaBed />
                      </div>
                      <div className="suite-info-label">Camas</div>
                      <div className="suite-info-value">{customInfo?.camas || '2 camas de solteiro'}</div>
            </div>
            <div className="suite-info-card">
              <div className="suite-info-icon">
                <FaDollarSign />
              </div>
              <div className="suite-info-label">Valor da Diária</div>
              <div className="suite-info-value">R$ {formatarMoeda(suiteData.preco)}/noite</div>
            </div>
                  </>
                )}
          </div>

          <div className="suite-rules-policies">
            <h4 className="suite-rules-title">Regras e Políticas</h4>
            <p className="suite-rules-details">Check-in: 14h | Check-out: 12h | Aceita pets | Estacionamento gratuito</p>
                <div className="suite-smoking-policy">
                  <span className="smoking-icon"><FaBan /></span>
                  <span className="smoking-text">Fumantes: Não é permitido fumar</span>
                </div>
          </div>
            </>
          )}

          {!disableBooking && !showBookingForm && (
            <button 
              className="suite-initial-reserve-button"
              onClick={() => setShowBookingForm(true)}
            >
              Fazer reserva
            </button>
          )}
        </div>

        {!disableBooking && showBookingForm && (
          <div className="suite-booking-below">
          <div className="suite-booking">
            <div className="suite-booking-logo">
              <img src="/icones/logo boa.png" className="suite-booking-logo-icon" alt="Casa10 Logo" />
            </div>
            <h3 className="suite-booking-title">{suiteData.nome}</h3>
            
            <div className="suite-booking-info">
              <div className="booking-info-item">
                <label>Horário de check-in</label>
                <p>check-in a partir das 13:00</p>
                <p>check-out ate as 10:00</p>
              </div>
              <div className="booking-info-item">
                <label>Capacidade de pessoas</label>
                <p>Máximo {customHouseInfo ? (customHouseInfo.capacidade ? customHouseInfo.capacidade.split(' ')[0] : '15') : '2'} pessoas</p>
              </div>
              <div className="booking-info-item">
                <label>Valor da diaria</label>
                <p className="booking-price">R$ {formatarMoeda(suiteData.preco)} / Noite</p>
              </div>
            </div>

            <form className="suite-form" onSubmit={handleSubmit}>
              <div className="form-dates">
                <div className="form-date-group">
                  <label>Check-in</label>
                  <input
                    type="text"
                    value={formData.checkIn ? format(formData.checkIn, 'dd/MM/yyyy') : ''}
                    onClick={() => setShowCalendar({ checkIn: true, checkOut: false })}
                    readOnly
                    placeholder="Selecione a data"
                  />
                  {showCalendar.checkIn && (
                    <div className="calendar-popup">
                      <Calendar
                        quartoId={suiteData.id}
                        checkIn={formData.checkIn}
                        checkOut={formData.checkOut}
                        onDateSelect={handleDateSelect}
                        selectingCheckIn={true}
                      />
                    </div>
                  )}
                </div>
                <div className="form-date-group">
                  <label>Check-out</label>
                  <input
                    type="text"
                    value={formData.checkOut ? format(formData.checkOut, 'dd/MM/yyyy') : ''}
                    onClick={() => setShowCalendar({ checkIn: false, checkOut: true })}
                    readOnly
                    placeholder="Selecione a data"
                  />
                  {showCalendar.checkOut && (
                    <div className="calendar-popup">
                      <Calendar
                        quartoId={suiteData.id}
                        checkIn={formData.checkIn}
                        checkOut={formData.checkOut}
                        onDateSelect={handleDateSelect}
                        selectingCheckIn={false}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Nome completo*</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Telefone*</label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>E-mail*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Pessoas*</label>
                  <input
                    type="number"
                    name="pessoas"
                    value={formData.pessoas}
                    onChange={handleChange}
                    min="1"
                    max={customHouseInfo ? "15" : "2"}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>nome da suite</label>
                <input
                  type="text"
                  value={suiteData.nome}
                  readOnly
                />
              </div>

              <div className="form-checkbox">
                <input
                  type="checkbox"
                  name="temCriancas"
                  checked={formData.temCriancas}
                  onChange={handleCriancasChange}
                />
                <label>Há crianças?</label>
              </div>

              {formData.temCriancas && (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Quantas*</label>
                      <input
                        type="number"
                        value={formData.quantidadeCriancas}
                        onChange={handleQuantidadeCriancas}
                        min="1"
                        max="4"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Idades*</label>
                      <select
                        value={formData.idades[0] || 0}
                        onChange={(e) => handleIdadeChange(0, e.target.value)}
                        required
                      >
                        {Array.from({ length: 17 }, (_, i) => i + 1).map(idade => (
                          <option key={idade} value={idade}>{idade} anos</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {formData.quantidadeCriancas > 1 && (
                    <div className="form-group">
                      <label>Idades das outras crianças*</label>
                      {Array.from({ length: formData.quantidadeCriancas - 1 }, (_, i) => (
                        <select
                          key={i}
                          value={formData.idades[i + 1] || 0}
                          onChange={(e) => handleIdadeChange(i + 1, e.target.value)}
                          required
                          style={{ marginBottom: '10px' }}
                        >
                          {Array.from({ length: 17 }, (_, j) => j + 1).map(idade => (
                            <option key={idade} value={idade}>{idade} anos</option>
                          ))}
                        </select>
                      ))}
                    </div>
                  )}
                </>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label>R$ {formatarMoeda(suiteData.preco)} / Noite</label>
                </div>
                <div className="form-group">
                  <label>Total de Noite</label>
                  <input
                    type="text"
                    value={calcularNoites()}
                    readOnly
                  />
                </div>
              </div>

              <div className="form-total">
                <label>Total / R$ {formatarMoeda(calcularTotal())}</label>
              </div>

              <button type="submit" className="form-submit-button">
                Fazer reserva
              </button>
            </form>
          </div>
        </div>
        )}
      </div>

      {/* Modal de Imagem */}
      {showImageModal && (
        <div className="suite-image-modal" onClick={closeImageModal}>
          <div className="suite-image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="suite-image-modal-close"
              onClick={closeImageModal}
              aria-label="Fechar"
            >
              ×
            </button>
            <button 
              className="suite-image-modal-button suite-image-modal-prev"
              onClick={prevModalImage}
              aria-label="Imagem anterior"
            >
              <FaChevronLeft />
            </button>
            <img 
              src={suiteImages[modalImageIndex]} 
              alt={`Imagem ${modalImageIndex + 1} da ${suiteData.nome}`}
              className="suite-image-modal-img"
              loading="eager"
            />
            <button 
              className="suite-image-modal-button suite-image-modal-next"
              onClick={nextModalImage}
              aria-label="Próxima imagem"
            >
              <FaChevronRight />
            </button>
            <div className="suite-image-modal-counter">
              {modalImageIndex + 1} / {suiteImages.length}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default SuiteBase

