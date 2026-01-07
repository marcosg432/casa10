import { Link } from 'react-router-dom'
import { FaBed, FaHome, FaUsers } from 'react-icons/fa'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { PROPRIEDADES } from '../utils/propriedades'
import './Hostel.css'

const Hostel = () => {
  const hostel = PROPRIEDADES.HOSTEL

  return (
    <div className="hostel-page">
      {/* Hero Section */}
      <section className="hostel-hero">
        <div className="hostel-hero-background"></div>
        <Header />
        <div className="hostel-hero-content">
          <h1 className="hostel-hero-title">Hostel</h1>
          <p className="hostel-hero-subtitle">Aluguer por Quarto Individual - Piso Inferior</p>
        </div>
      </section>

      {/* Informações Principais */}
      <section className="hostel-info-section">
        <div className="hostel-info-container">
          <div className="hostel-info-card">
            <FaBed className="hostel-info-icon" />
            <h3>Tipo de Hospedagem</h3>
            <p>Hostel - Aluguer por quarto individual</p>
            <p className="hostel-info-note">Não é casa inteira</p>
          </div>
          <div className="hostel-info-card">
            <div className="hostel-info-color" style={{ backgroundColor: hostel.corCobertor }}></div>
            <h3>Identificação Visual</h3>
            <p>Cobertores Azul-Escuro</p>
            <p className="hostel-info-note">Piso Inferior</p>
          </div>
          <div className="hostel-info-card">
            <FaUsers className="hostel-info-icon" />
            <h3>Configuração</h3>
            <p>Cada quarto possui 2 camas</p>
            <p className="hostel-info-note">Capacidade: 2 pessoas por quarto</p>
          </div>
        </div>
      </section>

      {/* Quartos do Hostel */}
      <section className="hostel-quartos-section">
        <div className="hostel-quartos-container">
          <h2 className="hostel-section-title">Quartos Disponíveis</h2>
          <p className="hostel-section-subtitle">
            Todos os quartos do hostel possuem 2 camas e cobertores azul-escuro
          </p>
          
          <div className="hostel-quartos-grid">
            {hostel.quartos.map((quarto) => (
              <div key={quarto.id} className="hostel-quarto-card">
                <div className="hostel-quarto-image-container">
                  <img 
                    src={quarto.imagens[0]} 
                    alt={quarto.nome}
                    className="hostel-quarto-image"
                  />
                  <div className="hostel-quarto-badge" style={{ backgroundColor: hostel.corCobertor }}>
                    Cobertores Azul-Escuro
                  </div>
                </div>
                <div className="hostel-quarto-content">
                  <h3 className="hostel-quarto-title">{quarto.nome}</h3>
                  <div className="hostel-quarto-specs">
                    <span className="hostel-quarto-spec">
                      <FaBed /> {quarto.camas} camas
                    </span>
                    <span className="hostel-quarto-spec">
                      <FaUsers /> {quarto.capacidade} pessoas
                    </span>
                  </div>
                  <p className="hostel-quarto-description">{quarto.descricao}</p>
                  <div className="hostel-quarto-price">R$ {quarto.preco} / Noite</div>
                  <Link to={quarto.caminho} className="hostel-quarto-button">
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Áreas Comuns do Hostel */}
      <section className="hostel-areas-section">
        <div className="hostel-areas-container">
          <h2 className="hostel-section-title">Áreas Comuns do Hostel</h2>
          <div className="hostel-areas-grid">
            <div className="hostel-area-card">
              <FaHome className="hostel-area-icon" />
              <h3>Cozinha Compartilhada</h3>
              <p>Área de preparo de refeições com equipamentos completos</p>
            </div>
            <div className="hostel-area-card">
              <FaUsers className="hostel-area-icon" />
              <h3>Área de Convivência</h3>
              <p>Espaços comuns para socialização e descanso</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Hostel

