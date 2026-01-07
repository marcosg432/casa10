import SuiteBase from './SuiteBase'

const Quarto5 = () => {
  const suiteData = {
    id: 'quarto4',
    nome: 'Suite',
    preco: 450,
    descricao: 'Suite da Casa de Cima (piso superior) com 3 camas no total, incluindo 1 cama de casal. Cobertores azul-claro. Capacidade: 4 pessoas. Esta suite faz parte da casa completa, que é alugada integralmente, não por quarto individual.'
  }

  // Imagens exclusivas do Quarto 4
  const quarto4Images = Array.from({ length: 1 }, (_, i) => 
    `/imagem/quarto-4/quarto-4-${String(i + 1).padStart(2, '0')}.jpg`
  )

  return <SuiteBase suiteData={suiteData} images={quarto4Images} disableBooking={true} />
}

export default Quarto5

