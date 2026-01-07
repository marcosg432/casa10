import { Link } from 'react-router-dom'
import { FaHome, FaBed, FaUsers } from 'react-icons/fa'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { PROPRIEDADES } from '../utils/propriedades'
import './CasaDeCima.css'

const CasaDeCima = () => {
  const casa = PROPRIEDADES.CASA_DE_CIMA

  return (
    <div className="casa-de-cima-page">
      {/* Hero Section */}
      <section className="casa-de-cima-hero">
        <div className="casa-de-cima-hero-background"></div>
        <Header />
        <div className="casa-de-cima-hero-content">
          <h1 className="casa-de-cima-hero-title">Casa de Cima</h1>
          <p className="casa-de-cima-hero-subtitle">Casa da Banheira - Aluguer Completo</p>
        </div>
      </section>

      {/* Informações Principais */}
      <section className="casa-de-cima-info-section">
        <div className="casa-de-cima-info-container">
          <div className="casa-de-cima-info-card">
            <FaHome className="casa-de-cima-info-icon" />
            <h3>Tipo de Hospedagem</h3>
            <p>Casa Completa</p>
            <p className="casa-de-cima-info-note">Aluguer integral - Não é hostel</p>
          </div>
          <div className="casa-de-cima-info-card">
            <div className="casa-de-cima-info-color" style={{ backgroundColor: casa.corCobertor }}></div>
            <h3>Identificação Visual</h3>
            <p>Cobertores Azul-Claro</p>
            <p className="casa-de-cima-info-note">Piso Superior</p>
          </div>
          <div className="casa-de-cima-info-card">
            <FaUsers className="casa-de-cima-info-icon" />
            <h3>Capacidade Total</h3>
            <p>{casa.capacidadeTotal} pessoas</p>
            <p className="casa-de-cima-info-note">4 quartos com diferentes capacidades</p>
          </div>
        </div>
      </section>

      {/* Descrição Completa */}
      <section className="casa-de-cima-descricao-section">
        <div className="casa-de-cima-descricao-container">
          <h2 className="casa-de-cima-section-title">Sobre a Casa de Cima</h2>
          <p className="casa-de-cima-descricao-text">
            {casa.descricaoCompleta}
          </p>
        </div>
      </section>

      {/* Quartos da Casa */}
      <section className="casa-de-cima-quartos-section">
        <div className="casa-de-cima-quartos-container">
          <h2 className="casa-de-cima-section-title">Quartos da Casa</h2>
          <p className="casa-de-cima-section-subtitle">
            Todos os quartos possuem cobertores azul-claro. A casa é alugada completa, não por quarto individual.
          </p>
          
          <div className="casa-de-cima-quartos-grid">
            {casa.quartos.map((quarto) => (
              <div key={quarto.id} className="casa-de-cima-quarto-card">
                <div className="casa-de-cima-quarto-image-container">
                  <img 
                    src={quarto.imagens[0]} 
                    alt={quarto.nome}
                    className="casa-de-cima-quarto-image"
                  />
                  <div className="casa-de-cima-quarto-badge" style={{ backgroundColor: casa.corCobertor }}>
                    Cobertores Azul-Claro
                  </div>
                </div>
                <div className="casa-de-cima-quarto-content">
                  <h3 className="casa-de-cima-quarto-title">{quarto.nome}</h3>
                  <div className="casa-de-cima-quarto-specs">
                    <span className="casa-de-cima-quarto-spec">
                      <FaBed /> {quarto.tipoCamas}
                    </span>
                    <span className="casa-de-cima-quarto-spec">
                      <FaUsers /> {quarto.capacidade} pessoas
                    </span>
                  </div>
                  <p className="casa-de-cima-quarto-description">{quarto.descricao}</p>
                  <Link to={quarto.caminho} className="casa-de-cima-quarto-button">
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comodidades */}
      <section className="casa-de-cima-comodidades-section">
        <div className="casa-de-cima-comodidades-container">
          <h2 className="casa-de-cima-section-title">Comodidades</h2>
          <div className="casa-de-cima-comodidades-grid">
            {casa.comodidades.map((comodidade, index) => (
              <div key={index} className="casa-de-cima-comodidade-item">
                {comodidade}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Botão de Reserva */}
      <section className="casa-de-cima-reserva-section">
        <div className="casa-de-cima-reserva-container">
          <div className="casa-de-cima-reserva-content">
            <h2 className="casa-de-cima-reserva-title">Pronto para reservar?</h2>
            <p className="casa-de-cima-reserva-subtitle">
              Reserve a Casa de Cima completa e aproveite toda a comodidade e espaço para até {casa.capacidadeTotal} pessoas
            </p>
            <div className="casa-de-cima-reserva-price">
              <span className="casa-de-cima-reserva-price-label">A partir de</span>
              <span className="casa-de-cima-reserva-price-value">R$ {casa.preco} / Noite</span>
            </div>
            <Link to="/casa10inn" className="casa-de-cima-reserva-button">
              Fazer Reserva
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default CasaDeCima

