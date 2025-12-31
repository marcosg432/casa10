import { Link } from 'react-router-dom'
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  const FooterContent = ({ className = '' }) => (
    <footer className={`home-footer ${className}`}>
      <div className="home-footer-background"></div>
      <div className="home-footer-content">
        <div className="home-footer-left">
          <div className="home-footer-logo">
            <img src="/icones/logo boa.png" alt="Casa10 Logo" />
          </div>
          <h2 className="home-footer-title">
            Bem-vindo<br />
            ao<br />
            Casa10inn
          </h2>
        </div>

        <div className="home-footer-center">
          <nav className="home-footer-nav">
            <Link to="/" className="home-footer-nav-link">Inicio</Link>
            <Link to="/quartos" className="home-footer-nav-link">Quartos</Link>
            <Link to="/galeria" className="home-footer-nav-link">Galeria</Link>
            <Link to="/sobre" className="home-footer-nav-link">sobre</Link>
            <Link to="/contato" className="home-footer-nav-link">contato</Link>
          </nav>
        </div>

        <div className="home-footer-right">
          <div className="home-footer-contact">
            <a href="https://wa.me/5527999095799" target="_blank" rel="noopener noreferrer" className="home-footer-phone">
              <FaWhatsapp className="home-footer-icon" />
            </a>
            <a href="mailto:casa10inn@gmail.com" className="home-footer-email">
              <FaEnvelope className="home-footer-icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )

  return (
    <>
      {/* Footer Desktop - oculto no mobile */}
      <FooterContent className="home-footer-desktop" />
      {/* Footer Mobile - oculto no desktop */}
      <FooterContent className="home-footer-mobile" />
    </>
  )
}

export default Footer


