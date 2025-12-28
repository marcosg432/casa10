import SuiteBase from './SuiteBase'

const Quarto5 = () => {
  const suiteData = {
    id: 'quarto4',
    nome: 'Quarto 4',
    preco: 450,
    descricao: '4 camas de solteiro'
  }

  // Imagens exclusivas do Quarto 4
  const quarto4Images = Array.from({ length: 1 }, (_, i) => 
    `/imagem/quarto-4/quarto-4-${String(i + 1).padStart(2, '0')}.jpg`
  )

  return <SuiteBase suiteData={suiteData} images={quarto4Images} disableBooking={true} />
}

export default Quarto5

