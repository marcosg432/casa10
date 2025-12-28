import SuiteBase from './SuiteBase'

const SuiteImperial = () => {
  const suiteData = {
    id: 'imperial',
    nome: 'Quarto Duplo com Banheiro Privado',
    preco: 500,
    descricao: 'O quarto duplo oferece uma área de estar, uma área para refeições, além de um banheiro privativo com chuveiro. Os hóspedes encontrarão um fogão, uma geladeira, utensílios de cozinha e um forno na cozinha. O quarto duplo também inclui uma churrasqueira. O quarto duplo dispõe de ar-condicionado, máquina de lavar roupa, entrada privativa, comodidades para preparar chá e café e TV de tela plana com serviços de streaming. A unidade possui 2 camas.'
  }

  // Imagens exclusivas do Quarto Duplo com Banheiro Privado
  const images = [
    '/imagem/quarto-duplo-banheiro-privado/quarto-duplo-banheiro-privado-01.jpg',
    '/imagem/quarto-duplo-banheiro-privado/quarto-duplo-banheiro-privado-02.jpg',
    '/imagem/quarto-duplo-banheiro-privado/quarto-duplo-banheiro-privado-03.jpg',
    '/imagem/quarto-duplo-banheiro-privado/quarto-duplo-banheiro-privado-04.jpg',
    '/imagem/quarto-duplo-banheiro-privado/quarto-duplo-banheiro-privado-05.jpg',
    '/imagem/quarto-duplo-banheiro-privado/quarto-duplo-banheiro-privado-06.jpg',
    '/imagem/quarto-duplo-banheiro-privado/quarto-duplo-banheiro-privado-07.jpg',
    '/imagem/quarto-duplo-banheiro-privado/quarto-duplo-banheiro-privado-08.jpg',
    '/imagem/quarto-duplo-banheiro-privado/quarto-duplo-banheiro-privado-09.jpg',
    '/imagem/quarto-duplo-banheiro-privado/quarto-duplo-banheiro-privado-10.jpg',
    '/imagem/quarto-duplo-banheiro-privado/quarto-duplo-banheiro-privado-11.jpg',
    '/imagem/quarto-duplo-banheiro-privado/quarto-duplo-banheiro-privado-12.jpg',
    '/imagem/quarto-duplo-banheiro-privado/quarto-duplo-banheiro-privado-13.jpg',
    '/imagem/quarto-duplo-banheiro-privado/quarto-duplo-banheiro-privado-14.jpg',
    '/imagem/quarto-duplo-banheiro-privado/quarto-duplo-banheiro-privado-15.jpg',
    '/imagem/quarto-duplo-banheiro-privado/quarto-duplo-banheiro-privado-16.jpg',
    '/imagem/quarto-duplo-banheiro-privado/quarto-duplo-banheiro-privado-17.jpg',
    '/imagem/quarto-duplo-banheiro-privado/quarto-duplo-banheiro-privado-18.jpg',
    '/imagem/quarto-duplo-banheiro-privado/quarto-duplo-banheiro-privado-19.jpg',
    '/imagem/quarto-duplo-banheiro-privado/quarto-duplo-banheiro-privado-20.jpg',
    '/imagem/quarto-duplo-banheiro-privado/quarto-duplo-banheiro-privado-21.jpg',
    '/imagem/quarto-duplo-banheiro-privado/quarto-duplo-banheiro-privado-22.jpg',
    '/imagem/quarto-duplo-banheiro-privado/quarto-duplo-banheiro-privado-23.jpg',
    '/imagem/quarto-duplo-banheiro-privado/quarto-duplo-banheiro-privado-24.jpg',
    '/imagem/quarto-duplo-banheiro-privado/quarto-duplo-banheiro-privado-25.jpg',
    '/imagem/quarto-duplo-banheiro-privado/quarto-duplo-banheiro-privado-26.jpg'
  ]

  // Informações customizadas exclusivas do Quarto Duplo com Banheiro Privado
  const customInfo = {
    tamanho: '15 m²',
    camas: '2 camas de solteiro'
  }

  return <SuiteBase suiteData={suiteData} images={images} customInfo={customInfo} />
}

export default SuiteImperial



