import SuiteBase from './SuiteBase'

const SuiteLuxo = () => {
  const suiteData = {
    id: 'luxo',
    nome: 'Quarto Deluxe',
    preco: 400,
    descricao: 'O quarto duplo oferece uma área de estar e uma área para refeições, além de um banheiro compartilhado com chuveiro. Os hóspedes encontrarão um fogão, uma geladeira, utensílios de cozinha e um forno na cozinha totalmente equipada. O quarto duplo também conta com uma churrasqueira. O quarto duplo dispõe de ar-condicionado, máquina de lavar roupa, entrada privativa, comodidades para preparar chá e café, além de TV de tela plana com serviços de streaming. A unidade possui 2 camas.'
  }

  // Imagens exclusivas do Quarto Deluxe
  const images = [
    '/imagem/quarto-deluxe/quarto-deluxe-01.jpg',
    '/imagem/quarto-deluxe/quarto-deluxe-02.jpg',
    '/imagem/quarto-deluxe/quarto-deluxe-03.jpg',
    '/imagem/quarto-deluxe/quarto-deluxe-04.jpg',
    '/imagem/quarto-deluxe/quarto-deluxe-05.jpg',
    '/imagem/quarto-deluxe/quarto-deluxe-06.jpg',
    '/imagem/quarto-deluxe/quarto-deluxe-07.jpg',
    '/imagem/quarto-deluxe/quarto-deluxe-08.jpg',
    '/imagem/quarto-deluxe/quarto-deluxe-09.jpg',
    '/imagem/quarto-deluxe/quarto-deluxe-10.jpg',
    '/imagem/quarto-deluxe/quarto-deluxe-11.jpg',
    '/imagem/quarto-deluxe/quarto-deluxe-12.jpg',
    '/imagem/quarto-deluxe/quarto-deluxe-13.jpg',
    '/imagem/quarto-deluxe/quarto-deluxe-14.jpg',
    '/imagem/quarto-deluxe/quarto-deluxe-15.jpg',
    '/imagem/quarto-deluxe/quarto-deluxe-16.jpg',
    '/imagem/quarto-deluxe/quarto-deluxe-17.jpg',
    '/imagem/quarto-deluxe/quarto-deluxe-18.jpg',
    '/imagem/quarto-deluxe/quarto-deluxe-19.jpg',
    '/imagem/quarto-deluxe/quarto-deluxe-20.jpg',
    '/imagem/quarto-deluxe/quarto-deluxe-21.jpg',
    '/imagem/quarto-deluxe/quarto-deluxe-22.jpg',
    '/imagem/quarto-deluxe/quarto-deluxe-23.jpg'
  ]

  // Informações customizadas exclusivas do Quarto Deluxe
  const customInfo = {
    tamanho: '10 m²',
    camas: '2 camas de solteiro'
  }

  return <SuiteBase suiteData={suiteData} images={images} customInfo={customInfo} />
}

export default SuiteLuxo



