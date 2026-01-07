import { Link } from 'react-router-dom'
import { FaTv, FaHome, FaBed, FaUsers } from 'react-icons/fa'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { PROPRIEDADES } from '../utils/propriedades'
import './Quartos.css'

const Quartos = () => {
  const hostel = PROPRIEDADES.HOSTEL
  const casaDeCima = PROPRIEDADES.CASA_DE_CIMA

  return (
    <div className="quartos-page">
      {/* Hero Section */}
      <section className="quartos-hero">
        <div className="quartos-hero-background"></div>
        <Header />
        <div className="quartos-hero-content">
          <h1 className="quartos-hero-title">Nossas Propriedades</h1>
          <p className="quartos-hero-subtitle">Escolha entre Hostel ou Casa Completa</p>
        </div>
      </section>

      {/* Text Section */}
      <section className="quartos-text-section">
        <p className="quartos-text">
          O Casa10inn oferece duas opções distintas de hospedagem: Hostel (aluguer por quarto individual) 
          e Casa de Cima (casa completa para aluguer integral). Cada propriedade possui características 
          únicas e identificação visual própria.
        </p>
      </section>

      {/* Propriedades Separadas */}
      <section className="quartos-cards-section">
        <div className="quartos-cards-container">
          
          {/* HOSTEL - Piso Inferior */}
          <div className="quartos-property-section">
            <div className="quartos-property-header" style={{ borderLeftColor: hostel.corCobertor }}>
              <FaBed className="quartos-property-icon" style={{ color: hostel.corCobertor }} />
              <div>
                <h2 className="quartos-property-title">Hostel - Piso Inferior</h2>
                <p className="quartos-property-subtitle">Aluguer por quarto individual • Cobertores Azul-Escuro</p>
              </div>
            </div>
            
            <div className="quartos-property-cards-grid">
              {hostel.quartos.map((quarto) => (
                <div key={quarto.id} className="quartos-page-card">
                  <div className="quartos-page-card-image" style={{ backgroundImage: `url(${quarto.imagens[0]})` }}></div>
                  <div className="quartos-page-card-badge" style={{ backgroundColor: hostel.corCobertor }}>
                    Azul-Escuro • 2 Camas
                  </div>
                  <div className="quartos-page-card-icon"><FaTv /></div>
                  <h3 className="quartos-page-card-title">{quarto.nome}</h3>
                  <p className="quartos-page-card-description">{quarto.descricao}</p>
                  <div className="quartos-page-card-price">R$ {quarto.preco} / Noite</div>
                  <Link to={quarto.caminho} className="quartos-page-card-button">saiba mais</Link>
                </div>
              ))}
            </div>
            
            <div className="quartos-property-footer">
              <Link to="/hostel" className="quartos-property-link">
                Ver página completa do Hostel →
              </Link>
            </div>
          </div>

          {/* CASA DE CIMA - Piso Superior */}
          <div className="quartos-property-section">
            <div className="quartos-property-header" style={{ borderLeftColor: casaDeCima.corCobertor }}>
              <FaHome className="quartos-property-icon" style={{ color: casaDeCima.corCobertor }} />
              <div>
                <h2 className="quartos-property-title">Casa de Cima - Piso Superior</h2>
                <p className="quartos-property-subtitle">Casa completa para aluguer integral • Cobertores Azul-Claro</p>
              </div>
            </div>
            
            <div className="quartos-property-cards-grid">
              <div className="quartos-page-card quartos-page-card-full-width">
                <div className="quartos-page-card-image" style={{ backgroundImage: `url(${casaDeCima.imagens[0]})` }}></div>
                <div className="quartos-page-card-badge" style={{ backgroundColor: casaDeCima.corCobertor }}>
                  Azul-Claro • Casa Inteira
                </div>
                <div className="quartos-page-card-icon"><FaHome /></div>
                <h3 className="quartos-page-card-title">{casaDeCima.nome}</h3>
                <p className="quartos-page-card-description">
                  {casaDeCima.descricaoCompleta}
                </p>
                <div className="quartos-page-card-specs">
                  <span><FaUsers /> {casaDeCima.capacidadeTotal} pessoas</span>
                  <span><FaBed /> 4 quartos</span>
                </div>
                <div className="quartos-page-card-price">R$ {casaDeCima.preco} / Noite</div>
                <Link to="/casa-de-cima" className="quartos-page-card-button">saiba mais</Link>
                
                {/* Quartos internos da casa */}
                <div className="casa-de-cima-internal-cards">
                  {casaDeCima.quartos.map((quarto) => (
                    <div key={quarto.id} className="quartos-page-card-internal">
                      <div className="quartos-page-card-image" style={{ backgroundImage: `url(${quarto.imagens[0]})` }}></div>
                      <h4 className="quartos-page-card-title-small">{quarto.nome}</h4>
                      <p className="quartos-page-card-description-small">{quarto.tipoCamas}</p>
                      <p className="quartos-page-card-description-small">Capacidade: {quarto.capacidade} pessoas</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="quartos-property-footer">
              <Link to="/casa-de-cima" className="quartos-property-link">
                Ver página completa da Casa de Cima →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Quartos

