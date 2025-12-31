import { Link } from 'react-router-dom'
import { FaStar, FaHeart, FaHome, FaBed } from 'react-icons/fa'
import Header from '../components/Header'
import BookingEngine from '../components/BookingEngine'
import { VerticalImageStack } from '../components/VerticalImageStack'
import CircularImages from '../components/CircularImages'
import Footer from '../components/Footer'
import './Home.css'

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <video
            className="hero-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/video/video-praia-banner.mp4" type="video/mp4" />
          </video>
        </div>
        <Header />
        <div className="hero-content">
          <h1 className="hero-title">Casa10</h1>
          <p className="hero-subtitle">Sua experiência perfeita de hospedagem</p>
          
          {/* Categorias */}
          <div className="hero-categories">
            <Link to="/casa10inn" className="hero-category-card">
              <FaHome className="hero-category-icon" />
              <h3>Casa</h3>
              <p>Reserve uma casa completa</p>
            </Link>
            <Link to="/quartos-disponiveis" className="hero-category-card">
              <FaBed className="hero-category-icon" />
              <h3>Quartos</h3>
              <p>Escolha seu quarto ideal</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Motor de Reservas */}
      <section className="booking-engine-section">
        <BookingEngine />
      </section>

      {/* sobre nós */}
      <section className="sobre-section">
        <div className="sobre-container">
          <div className="sobre-text">
            <h2 className="sobre-title">sobre nós</h2>
            <p className="sobre-paragraph">
              O Casa10 nasceu com o propósito de oferecer mais do que hospedagem: criar experiências marcantes de conforto, descanso e bem-estar. Somos um refúgio exclusivo onde o conforto, a sofisticação e a natureza se encontram em perfeita harmonia.
            </p>
            <p className="sobre-paragraph">
              Oferecemos uma experiência única, combinando estrutura moderna, serviço de alto padrão e ambientes acolhedores, ideais para relaxar e viver momentos inesquecíveis em família ou a dois. Nossos quartos confortáveis, áreas de lazer completas e localização privilegiada garantem tranquilidade, bem-estar e experiências memoráveis.
            </p>
            <p className="sobre-paragraph">
              Cada detalhe foi pensado para que você desfrute de dias de relaxamento, conforto e excelência, sempre acompanhado pela brisa leve que inspira o nome Brisa Império.
            </p>
            <Link to="/sobre" className="sobre-button">saiba mais</Link>
          </div>
          <div className="sobre-image">
            <img
              src="/imagem/foto modelo.jpg"
              alt="Casa10"
              className="sobre-image-foto"
            />
          </div>
        </div>
      </section>


      {/* Galeria Section */}
      <section className="nova-secao-section">
        <div className="nova-secao-container">
          <h2 className="galeria-section-title">Galeria</h2>
          <CircularImages
            testimonials={[
              {
                src: "/imagem/pontos-turisticos/praia-camburi-es.webp"
              },
              {
                src: "/imagem/pontos-turisticos/praia-jacaripe.jpg"
              },
              {
                src: "/imagem/pontos-turisticos/praia-de-manguinhos.png"
              }
            ]}
            autoplay={true}
          />
          <p className="galeria-section-text">Conheça nossa galeria de imagens</p>
          <Link 
            to="/galeria" 
            className="galeria-section-button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Ir para galeria
          </Link>
        </div>
      </section>

      {/* imagem solo */}
      <section className="imagem-fundo-section"></section>

      {/* azul */}
      <section className="porque-section">
        <h2 className="porque-title">Por que escolher o Casa10?</h2>
        <div className="porque-grid">
          <div className="porque-card">
            <div className="porque-card-header">
              <FaStar className="porque-icon estrela" />
              <h3 className="porque-card-title">CONFORTO E SOFISTICAÇÃO</h3>
              <FaStar className="porque-icon estrela" />
            </div>
            <p className="porque-card-text">
              Nossos quartos e áreas comuns foram pensados para oferecer máximo conforto, elegância e bem-estar em cada detalhe da sua estadia.
            </p>
          </div>
          <div className="porque-card">
            <h3 className="porque-card-title">ATENDIMENTO ACOLHEDOR</h3>
            <p className="porque-card-text">
              Nossa equipe é treinada para receber cada hóspede com atenção, cuidado e hospitalidade, garantindo uma experiência única do início ao fim.
            </p>
            <FaHeart className="porque-icon coracao" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home

