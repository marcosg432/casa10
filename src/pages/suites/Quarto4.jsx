import SuiteBase from './SuiteBase'

const Quarto4 = () => {
  const suiteData = {
    id: 'quarto3',
    nome: 'Quarto 3',
    preco: 420,
    descricao: '3 camas de solteiro'
  }

  // Imagens exclusivas do Quarto 3
  const quarto3Images = Array.from({ length: 3 }, (_, i) => 
    `/imagem/quarto-3/quarto-3-${String(i + 1).padStart(2, '0')}.jpg`
  )

  return <SuiteBase suiteData={suiteData} images={quarto3Images} disableBooking={true} />
}

export default Quarto4

