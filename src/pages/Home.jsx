import { Link } from 'react-router-dom'
import { FaStar, FaHeart } from 'react-icons/fa'
import Header from '../components/Header'
import { VerticalImageStack } from '../components/VerticalImageStack'
import CircularImages from '../components/CircularImages'
import Footer from '../components/Footer'
import './Home.css'

const Home = () => {
  console.log('Home component rendering')
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
            <source src="/video/video mar.mp4" type="video/mp4" />
          </video>
        </div>
        <Header />
        <div className="hero-content">
          <h1 className="hero-title">Casa10</h1>
        </div>
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
            <button className="sobre-button">saiba mais</button>
          </div>
          <div className="sobre-image">
            <img
              src="/imagem/foto modelo.png"
              alt="Casa10"
              className="sobre-image-foto"
            />
          </div>
        </div>
      </section>

      {/* suite */}
      <section className="quartos-section">
        <div className="quartos-container">
          <div className="quartos-card">
            <div className="quartos-card-image premium"></div>
            <h3 className="quartos-card-title">Quarto Duplo Amplo</h3>
            <p className="quartos-card-description">
              O quarto duplo oferece uma área de estar, uma área para refeições, além de um banheiro privativo com chuveiro. Os hóspedes encontrarão um fogão, uma geladeira, utensílios de cozinha e um forno na cozinha. O quarto duplo também inclui uma churrasqueira. O quarto duplo dispõe de ar-condicionado, máquina de lavar roupa, entrada privativa, comodidades para preparar chá e café e TV de tela plana com serviços de streaming. A unidade possui 2 camas.
            </p>
            <div className="quartos-card-price">R$ 450 / Noite</div>
            <Link to="/quarto-duplo-amplo" className="quartos-card-button">saiba mais</Link>
          </div>
          <div className="quartos-card">
            <div className="quartos-card-image exclusiva"></div>
            <h3 className="quartos-card-title">Quarto Duplo Standard</h3>
            <p className="quartos-card-description">
              O quarto duplo oferece uma área de estar e uma área para refeições, além de um banheiro compartilhado com chuveiro. Os hóspedes encontrarão um fogão, uma geladeira, utensílios de cozinha e um forno na cozinha bem equipada. O quarto duplo também disponibiliza uma churrasqueira. O quarto duplo conta com ar-condicionado, máquina de lavar roupa, entrada privativa, comodidades para preparar chá e café e TV de tela plana com serviços de streaming. A unidade dispõe de 1 cama.
            </p>
            <div className="quartos-card-price">R$ 550 / Noite</div>
            <Link to="/quarto-duplo-standard" className="quartos-card-button">saiba mais</Link>
          </div>
          <div className="quartos-card">
            <div className="quartos-card-image luxo"></div>
            <h3 className="quartos-card-title">Quarto Deluxe</h3>
            <p className="quartos-card-description">
              O quarto duplo oferece uma área de estar e uma área para refeições, além de um banheiro compartilhado com chuveiro. Os hóspedes encontrarão um fogão, uma geladeira, utensílios de cozinha e um forno na cozinha totalmente equipada. O quarto duplo também conta com uma churrasqueira. O quarto duplo dispõe de ar-condicionado, máquina de lavar roupa, entrada privativa, comodidades para preparar chá e café, além de TV de tela plana com serviços de streaming. A unidade possui 2 camas.
            </p>
            <div className="quartos-card-price">R$ 400 / Noite</div>
            <Link to="/quarto-deluxe" className="quartos-card-button">saiba mais</Link>
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
                src: "/imagem/imagem 1.jpg"
              },
              {
                src: "/imagem/imagem 2.jpg"
              },
              {
                src: "/imagem/imagem 3.jpg"
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

