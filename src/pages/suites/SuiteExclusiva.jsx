import SuiteBase from './SuiteBase'

const SuiteExclusiva = () => {
  const suiteData = {
    id: 'exclusiva',
    nome: 'Quarto Duplo Standard',
    preco: 550,
    descricao: 'Quarto do hostel (piso inferior) com 2 camas individuais. Cobertores azul-escuro. O quarto oferece uma área de estar e uma área para refeições, além de um banheiro compartilhado com chuveiro. Os hóspedes encontrarão um fogão, uma geladeira, utensílios de cozinha e um forno na cozinha bem equipada. O quarto também disponibiliza uma churrasqueira. Conta com ar-condicionado, máquina de lavar roupa, entrada privativa, comodidades para preparar chá e café e TV de tela plana com serviços de streaming. Este é um quarto do hostel para aluguer individual, não é casa inteira.'
  }

  // Imagens exclusivas do Quarto Duplo Standard
  const images = [
    '/imagem/quarto-duplo-standard/quarto-duplo-standard-01.jpg',
    '/imagem/quarto-duplo-standard/quarto-duplo-standard-02.jpg',
    '/imagem/quarto-duplo-standard/quarto-duplo-standard-03.jpg',
    '/imagem/quarto-duplo-standard/quarto-duplo-standard-04.jpg',
    '/imagem/quarto-duplo-standard/quarto-duplo-standard-05.jpg',
    '/imagem/quarto-duplo-standard/quarto-duplo-standard-06.jpg',
    '/imagem/quarto-duplo-standard/quarto-duplo-standard-07.jpg',
    '/imagem/quarto-duplo-standard/quarto-duplo-standard-08.jpg',
    '/imagem/quarto-duplo-standard/quarto-duplo-standard-09.jpg',
    '/imagem/quarto-duplo-standard/quarto-duplo-standard-10.jpg',
    '/imagem/quarto-duplo-standard/quarto-duplo-standard-11.jpg',
    '/imagem/quarto-duplo-standard/quarto-duplo-standard-12.jpg',
    '/imagem/quarto-duplo-standard/quarto-duplo-standard-13.jpg',
    '/imagem/quarto-duplo-standard/quarto-duplo-standard-14.jpg',
    '/imagem/quarto-duplo-standard/quarto-duplo-standard-15.jpg',
    '/imagem/quarto-duplo-standard/quarto-duplo-standard-16.jpg',
    '/imagem/quarto-duplo-standard/quarto-duplo-standard-17.jpg',
    '/imagem/quarto-duplo-standard/quarto-duplo-standard-18.jpg',
    '/imagem/quarto-duplo-standard/quarto-duplo-standard-19.jpg',
    '/imagem/quarto-duplo-standard/quarto-duplo-standard-20.jpg',
    '/imagem/quarto-duplo-standard/quarto-duplo-standard-21.jpg',
    '/imagem/quarto-duplo-standard/quarto-duplo-standard-22.jpg',
    '/imagem/quarto-duplo-standard/quarto-duplo-standard-23.jpg',
    '/imagem/quarto-duplo-standard/quarto-duplo-standard-24.jpg',
    '/imagem/quarto-duplo-standard/quarto-duplo-standard-25.jpg',
    '/imagem/quarto-duplo-standard/quarto-duplo-standard-26.jpg'
  ]

  // Informações customizadas exclusivas do Quarto Duplo Standard
  const customInfo = {
    tamanho: '8 m²',
    camas: '2 camas de solteiro'
  }

  return <SuiteBase suiteData={suiteData} images={images} customInfo={customInfo} />
}

export default SuiteExclusiva



