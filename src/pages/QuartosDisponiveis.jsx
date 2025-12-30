import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import Header from '../components/Header'
import BookingEngine from '../components/BookingEngine'
import Footer from '../components/Footer'
import './QuartosDisponiveis.css'

const QuartosDisponiveis = () => {
  const navigate = useNavigate()

  return (
    <div className="quartos-disponiveis-page">
      <Header />
      <BookingEngine />
      
      <div className="quartos-disponiveis-container">
        <button 
          className="quartos-disponiveis-back-button"
          onClick={() => navigate(-1)}
          title="Voltar"
        >
          <FaArrowLeft /> Voltar
        </button>
        
        <div className="quartos-disponiveis-header">
          <h1>Quartos Disponíveis</h1>
          <p>Escolha o quarto perfeito para sua estadia</p>
        </div>

        <section className="quartos-disponiveis-section">
          <div className="quartos-disponiveis-grid">
            <div className="quartos-disponiveis-card">
              <div className="quartos-disponiveis-card-image premium"></div>
              <h3 className="quartos-disponiveis-card-title">Quarto Duplo Amplo</h3>
              <p className="quartos-disponiveis-card-description">
                O quarto duplo oferece uma área de estar, uma área para refeições, além de um banheiro privativo com chuveiro. Os hóspedes encontrarão um fogão, uma geladeira, utensílios de cozinha e um forno na cozinha. O quarto duplo também inclui uma churrasqueira. O quarto duplo dispõe de ar-condicionado, máquina de lavar roupa, entrada privativa, comodidades para preparar chá e café e TV de tela plana com serviços de streaming. A unidade possui 2 camas.
              </p>
              <div className="quartos-disponiveis-card-price">R$ 450 / Noite</div>
              <Link to="/quarto-duplo-amplo" className="quartos-disponiveis-card-button">saiba mais</Link>
            </div>
            
            <div className="quartos-disponiveis-card">
              <div className="quartos-disponiveis-card-image exclusiva"></div>
              <h3 className="quartos-disponiveis-card-title">Quarto Duplo Standard</h3>
              <p className="quartos-disponiveis-card-description">
                O quarto duplo oferece uma área de estar e uma área para refeições, além de um banheiro compartilhado com chuveiro. Os hóspedes encontrarão um fogão, uma geladeira, utensílios de cozinha e um forno na cozinha bem equipada. O quarto duplo também disponibiliza uma churrasqueira. O quarto duplo conta com ar-condicionado, máquina de lavar roupa, entrada privativa, comodidades para preparar chá e café e TV de tela plana com serviços de streaming. A unidade dispõe de 1 cama.
              </p>
              <div className="quartos-disponiveis-card-price">R$ 550 / Noite</div>
              <Link to="/quarto-duplo-standard" className="quartos-disponiveis-card-button">saiba mais</Link>
            </div>
            
            <div className="quartos-disponiveis-card">
              <div className="quartos-disponiveis-card-image luxo"></div>
              <h3 className="quartos-disponiveis-card-title">Quarto Deluxe</h3>
              <p className="quartos-disponiveis-card-description">
                O quarto duplo oferece uma área de estar e uma área para refeições, além de um banheiro compartilhado com chuveiro. Os hóspedes encontrarão um fogão, uma geladeira, utensílios de cozinha e um forno na cozinha totalmente equipada. O quarto duplo também conta com uma churrasqueira. O quarto duplo dispõe de ar-condicionado, máquina de lavar roupa, entrada privativa, comodidades para preparar chá e café, além de TV de tela plana com serviços de streaming. A unidade possui 2 camas.
              </p>
              <div className="quartos-disponiveis-card-price">R$ 400 / Noite</div>
              <Link to="/quarto-deluxe" className="quartos-disponiveis-card-button">saiba mais</Link>
            </div>
            
            <div className="quartos-disponiveis-card">
              <div className="quartos-disponiveis-card-image imperial"></div>
              <h3 className="quartos-disponiveis-card-title">Quarto Duplo com Banheiro Privado</h3>
              <p className="quartos-disponiveis-card-description">
                O quarto duplo oferece uma área de estar, uma área para refeições, além de um banheiro privativo com chuveiro. Os hóspedes encontrarão um fogão, uma geladeira, utensílios de cozinha e um forno na cozinha. O quarto duplo também inclui uma churrasqueira. O quarto duplo dispõe de ar-condicionado, máquina de lavar roupa, entrada privativa, comodidades para preparar chá e café e TV de tela plana com serviços de streaming. A unidade possui 2 camas.
              </p>
              <div className="quartos-disponiveis-card-price">R$ 500 / Noite</div>
              <Link to="/quarto-duplo-banheiro-privado" className="quartos-disponiveis-card-button">saiba mais</Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}

export default QuartosDisponiveis

