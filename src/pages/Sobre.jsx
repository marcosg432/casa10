import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './Sobre.css'

// Sempre as MESMAS 3 imagens, apenas trocando de posição (carrossel)
const carouselImages = [
  '/imagem/sobre/sobre-01.jpg',
  '/imagem/sobre/sobre-02.jpg',
  '/imagem/sobre/sobre-03.jpg'
]

const Sobre = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  // Calcula qual imagem ocupa cada posição (esquerda, centro, direita)
  const leftImage = carouselImages[currentIndex]
  const centerImage = carouselImages[(currentIndex + 1) % carouselImages.length]
  const rightImage = carouselImages[(currentIndex + 2) % carouselImages.length]

  return (
    <div className="sobre-page">
      {/* Hero Section */}
      <section className="sobre-page-hero">
        <div className="sobre-page-hero-background"></div>
        <Header />
        <div className="sobre-page-hero-content">
          <h1 className="sobre-page-hero-title">Casa10inn</h1>
        </div>
      </section>

      {/* Conheça Section */}
      <section className="conheca-section">
        <h2 className="conheca-title">Conheça o Casa10inn</h2>
        <div className="conheca-images">
          <div
            className="conheca-image-left"
            style={{ backgroundImage: `url(${leftImage})` }}
          ></div>
          <div
            className="conheca-image-center"
            style={{ backgroundImage: `url(${centerImage})` }}
          ></div>
          <div
            className="conheca-image-right"
            style={{ backgroundImage: `url(${rightImage})` }}
          ></div>
        </div>
      </section>

      {/* Nossa História Section */}
      <section className="historia-section">
        <div className="historia-background"></div>
        <div className="historia-content">
          <h2 className="historia-title">Nossa Historia</h2>
          <div className="historia-text">
            <p>
              O Casa10inn nasceu com o propósito de oferecer mais do que hospedagem: criar experiências marcantes de conforto, descanso e bem-estar. Nossa missão é combinar qualidade, serviço humanizado e um ambiente acolhedor, onde cada hóspede se sinta especial e único.
            </p>
            <p>
              Inspirados pela tranquilidade da brisa e pela beleza natural da região, cada detalhe foi pensado para proporcionar momentos únicos. Ao longo dos anos, evoluímos nossa estrutura e serviços, sempre mantendo o compromisso com a excelência, a hospitalidade e o cuidado com nossos hóspedes.
            </p>
            <p>
              Hoje, seguimos construindo nossa história com dedicação, respeito e paixão por receber bem, transformando cada estadia em uma lembrança inesquecível.
            </p>
          </div>
        </div>
      </section>

      {/* Conforto Section */}
      <section className="localizacao-section">
        <div className="localizacao-container">
          <div className="localizacao-card">
            <h3 className="localizacao-card-title">Conforto em cada detalhe</h3>
            <p className="localizacao-card-text">
              Nossos quartos e áreas comuns foram cuidadosamente planejados para oferecer bem-estar, elegância e descanso em todos os momentos da sua estadia.
            </p>
            <div className="localizacao-card-image estrutura"></div>
          </div>
        </div>
      </section>

      {/* Ambiente Ideal Section */}
      <section className="ambiente-section">
        <h2 className="ambiente-title">Ambiente ideal para relaxar</h2>
        <p className="ambiente-text">
          O Casa10inn oferece o equilíbrio perfeito entre conforto, tranquilidade e lazer, em um ambiente cuidadosamente planejado para proporcionar descanso e bem-estar. Cada espaço foi pensado para criar uma atmosfera acolhedora e silenciosa, ideal para quem deseja desacelerar, relaxar e renovar as energias, aproveitando momentos únicos em meio a uma experiência completa de hospedagem.
        </p>
        <div className="ambiente-image"></div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Sobre

