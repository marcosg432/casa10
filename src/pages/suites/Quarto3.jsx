import SuiteBase from './SuiteBase'

const Quarto3 = () => {
  const suiteData = {
    id: 'quarto2',
    nome: 'Quarto 2',
    preco: 380,
    descricao: 'Quarto da Casa de Cima (piso superior) com 5 camas de solteiro. Cobertores azul-claro. Capacidade: 5 pessoas. Este quarto faz parte da casa completa, que é alugada integralmente, não por quarto individual.'
  }

  // Imagens exclusivas do Quarto 2 (5 camas)
  const quarto2Images = Array.from({ length: 14 }, (_, i) => 
    `/imagem/quarto-1/quarto-1-${String(i + 1).padStart(2, '0')}.jpg`
  )

  return <SuiteBase suiteData={suiteData} images={quarto2Images} disableBooking={true} />
}

export default Quarto3

