import { Link } from 'react-router-dom'
import { FaTv } from 'react-icons/fa'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './Quartos.css'

const Quartos = () => {
  return (
    <div className="quartos-page">
      {/* Hero Section */}
      <section className="quartos-hero">
        <div className="quartos-hero-background"></div>
        <Header />
        <div className="quartos-hero-content">
          <h1 className="quartos-hero-title">Casa10</h1>
        </div>
      </section>

      {/* Text Section */}
      <section className="quartos-text-section">
        <p className="quartos-text">
          CONHEÇA TODOS OS NOSSOS QUARTOS E ESCOLHA A OPÇÃO IDEAL PARA A SUA ESTADIA.
          NO BRISA IMPÉRIO, CADA SUÍTE OFERECE CONFORTO, TRANQUILIDADE E O AMBIENTE
          PERFEITO PARA VOCÊ RELAXAR E APROVEITAR MOMENTOS INESQUECÍVEIS.
        </p>
      </section>

      {/* Quartos Cards */}
      <section className="quartos-cards-section">
        <div className="quartos-cards-container">
          {/* Primeiros 4 cards em grid de 2 colunas */}
          <div className="quartos-page-card">
            <div className="quartos-page-card-image quarto-duplo-amplo"></div>
            <div className="quartos-page-card-icon"><FaTv /></div>
            <h3 className="quartos-page-card-title">Quarto Duplo Amplo</h3>
            <p className="quartos-page-card-description">
              O quarto duplo oferece uma área de estar, uma área para refeições, além de um banheiro privativo com chuveiro. Os hóspedes encontrarão um fogão, uma geladeira, utensílios de cozinha e um forno na cozinha. O quarto duplo também inclui uma churrasqueira. O quarto duplo dispõe de ar-condicionado, máquina de lavar roupa, entrada privativa, comodidades para preparar chá e café e TV de tela plana com serviços de streaming. A unidade possui 2 camas.
            </p>
            <div className="quartos-page-card-price">R$ 450 / Noite</div>
            <Link to="/quarto-duplo-amplo" className="quartos-page-card-button">saiba mais</Link>
          </div>
          <div className="quartos-page-card">
            <div className="quartos-page-card-image quarto-duplo-standard"></div>
            <div className="quartos-page-card-icon"><FaTv /></div>
            <h3 className="quartos-page-card-title">Quarto Duplo Standard</h3>
            <p className="quartos-page-card-description">
              O quarto duplo oferece uma área de estar e uma área para refeições, além de um banheiro compartilhado com chuveiro. Os hóspedes encontrarão um fogão, uma geladeira, utensílios de cozinha e um forno na cozinha bem equipada. O quarto duplo também disponibiliza uma churrasqueira. O quarto duplo conta com ar-condicionado, máquina de lavar roupa, entrada privativa, comodidades para preparar chá e café e TV de tela plana com serviços de streaming. A unidade dispõe de 1 cama.
            </p>
            <div className="quartos-page-card-price">R$ 550 / Noite</div>
            <Link to="/quarto-duplo-standard" className="quartos-page-card-button">saiba mais</Link>
          </div>
          <div className="quartos-page-card">
            <div className="quartos-page-card-image quarto-deluxe"></div>
            <div className="quartos-page-card-icon"><FaTv /></div>
            <h3 className="quartos-page-card-title">Quarto Deluxe</h3>
            <p className="quartos-page-card-description">
              O quarto duplo oferece uma área de estar e uma área para refeições, além de um banheiro compartilhado com chuveiro. Os hóspedes encontrarão um fogão, uma geladeira, utensílios de cozinha e um forno na cozinha totalmente equipada. O quarto duplo também conta com uma churrasqueira. O quarto duplo dispõe de ar-condicionado, máquina de lavar roupa, entrada privativa, comodidades para preparar chá e café, além de TV de tela plana com serviços de streaming. A unidade possui 2 camas.
            </p>
            <div className="quartos-page-card-price">R$ 400 / Noite</div>
            <Link to="/quarto-deluxe" className="quartos-page-card-button">saiba mais</Link>
          </div>
          <div className="quartos-page-card">
            <div className="quartos-page-card-image quarto-duplo-banheiro-privado"></div>
            <div className="quartos-page-card-icon"><FaTv /></div>
            <h3 className="quartos-page-card-title">Quarto Duplo com Banheiro Privado</h3>
            <p className="quartos-page-card-description">
              O quarto duplo oferece uma área de estar, uma área para refeições, além de um banheiro privativo com chuveiro. Os hóspedes encontrarão um fogão, uma geladeira, utensílios de cozinha e um forno na cozinha. O quarto duplo também inclui uma churrasqueira. O quarto duplo dispõe de ar-condicionado, máquina de lavar roupa, entrada privativa, comodidades para preparar chá e café e TV de tela plana com serviços de streaming. A unidade possui 2 camas.
            </p>
            <div className="quartos-page-card-price">R$ 500 / Noite</div>
            <Link to="/quarto-duplo-banheiro-privado" className="quartos-page-card-button">saiba mais</Link>
          </div>
          
          {/* Casa10inn - Card único em linha completa com cards internos */}
          <div className="quartos-page-card quartos-page-card-full-width quartos-page-card-casa10inn">
            <div className="casa10inn-main-content">
              <div className="quartos-page-card-image casa10inn"></div>
              <div className="quartos-page-card-icon"><FaTv /></div>
              <h3 className="quartos-page-card-title">Casa10inn</h3>
              <p className="quartos-page-card-description">
                Casa10inn fornece acomodação em Carapina com banheira de hidromassagem. Parque Municipal de Mangue Seco fica a 8,2 km de distância. Você contará com Wi-Fi grátis e estacionamento privativo disponível no local nesta acomodação com ar-condicionado. Parque Pedra da Cebola fica a 6,5 km de distância.

                A casa de temporada oferece 4 quartos, TV de tela plana com canais via satélite, cozinha com geladeira e forno, máquina de lavar roupa, além de 3 banheiros com chuveiro. A casa de temporada oferece toalhas e roupa de cama.

                Casa10inn fica a 9,2 km de Praça dos Namorados e a 12 km de Praça do Papa. O Aeroporto de Aeroporto de Vitória - Eurico de Aguiar Salles fica a 1 km de distância.
              </p>
              <div className="quartos-page-card-price">R$ 300 / Noite</div>
              <Link to="/casa10inn" className="quartos-page-card-button">saiba mais</Link>
            </div>
            
            {/* Cards internos da Casa10inn - sem botões */}
            <div className="casa10inn-internal-cards">
              <div className="quartos-page-card quartos-page-card-internal">
                <div className="quartos-page-card-image quarto-1"></div>
                <div className="quartos-page-card-icon"><FaTv /></div>
                <h3 className="quartos-page-card-title">Quarto 1</h3>
                <p className="quartos-page-card-description">
                  3 camas de solteiro
                </p>
              </div>
              <div className="quartos-page-card quartos-page-card-internal">
                <div className="quartos-page-card-image quarto-2-novo"></div>
                <div className="quartos-page-card-icon"><FaTv /></div>
                <h3 className="quartos-page-card-title">Quarto 2</h3>
                <p className="quartos-page-card-description">
                  5 camas de solteiros
                </p>
              </div>
              <div className="quartos-page-card quartos-page-card-internal">
                <div className="quartos-page-card-image quarto-3"></div>
                <div className="quartos-page-card-icon"><FaTv /></div>
                <h3 className="quartos-page-card-title">Quarto 3</h3>
                <p className="quartos-page-card-description">
                  3 camas de solteiro
                </p>
              </div>
              <div className="quartos-page-card quartos-page-card-internal">
                <div className="quartos-page-card-image quarto-4"></div>
                <div className="quartos-page-card-icon"><FaTv /></div>
                <h3 className="quartos-page-card-title">Quarto 4</h3>
                <p className="quartos-page-card-description">
                  4 camas de solteiro
                </p>
              </div>
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

