import SuiteBase from './SuiteBase'

const Quarto2 = () => {
  const suiteData = {
    id: 'quarto1',
    nome: 'Quarto 1',
    preco: 350,
    descricao: 'Quarto da Casa de Cima (piso superior) com 3 camas de solteiro. Cobertores azul-claro. Capacidade: 3 pessoas. Este quarto faz parte da casa completa, que é alugada integralmente, não por quarto individual.'
  }

  // Imagens exclusivas do Quarto 1 (3 camas)
  const quarto1Images = Array.from({ length: 3 }, (_, i) => 
    `/imagem/quarto-2/quarto-2-${String(i + 1).padStart(2, '0')}.jpg`
  )

  return <SuiteBase suiteData={suiteData} images={quarto1Images} disableBooking={true} />
}

export default Quarto2

