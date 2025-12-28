import SuiteBase from './SuiteBase'

const Quarto3 = () => {
  const suiteData = {
    id: 'quarto2',
    nome: 'Quarto 2',
    preco: 380,
    descricao: '5 camas de solteiros'
  }

  // Imagens exclusivas do Quarto 2
  const quarto2Images = Array.from({ length: 3 }, (_, i) => 
    `/imagem/quarto-2/quarto-2-${String(i + 1).padStart(2, '0')}.jpg`
  )

  return <SuiteBase suiteData={suiteData} images={quarto2Images} disableBooking={true} />
}

export default Quarto3

