import Header from '../components/Header'
import './Galeria.css'

const Galeria = () => {
  return (
    <div className="galeria-page">
      <section className="galeria-hero">
        <div className="galeria-hero-background"></div>
        <Header />
        <div className="galeria-hero-content">
          <h1 className="galeria-hero-title">Casa10inn</h1>
          <p className="galeria-hero-subtitle">RESORT & SPA HOTEL</p>
        </div>
      </section>

      <section className="galeria-content">
        <h2 className="galeria-title">Galeria</h2>
        <div className="galeria-placeholder">
          <p>Conteúdo em breve...</p>
        </div>
      </section>
    </div>
  )
}

export default Galeria




