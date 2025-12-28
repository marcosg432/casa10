import SuiteBase from './SuiteBase'

const Quarto2 = () => {
  const suiteData = {
    id: 'quarto1',
    nome: 'Quarto 1',
    preco: 350,
    descricao: '3 camas de solteiro'
  }

  // Imagens exclusivas do Quarto 1
  const quarto1Images = Array.from({ length: 14 }, (_, i) => 
    `/imagem/quarto-1/quarto-1-${String(i + 1).padStart(2, '0')}.jpg`
  )

  return <SuiteBase suiteData={suiteData} images={quarto1Images} disableBooking={true} />
}

export default Quarto2

