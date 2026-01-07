import SuiteBase from './SuiteBase'

const SuitePremium = () => {
  const suiteData = {
    id: 'premium',
    nome: 'Quarto Duplo Amplo',
    preco: 450,
    descricao: 'Quarto do hostel (piso inferior) com 2 camas individuais. Cobertores azul-escuro. O quarto oferece uma área de estar, uma área para refeições, além de um banheiro privativo com chuveiro. Os hóspedes encontrarão um fogão, uma geladeira, utensílios de cozinha e um forno na cozinha. O quarto também inclui uma churrasqueira. Dispõe de ar-condicionado, máquina de lavar roupa, entrada privativa, comodidades para preparar chá e café e TV de tela plana com serviços de streaming. Este é um quarto do hostel para aluguer individual, não é casa inteira.'
  }

  // Imagens do quarto duplo amplo - usando imagens da pasta suite-premium
  const images = Array.from({ length: 24 }, (_, i) => 
    `/imagem/suite-premium/suite-premium-${String(i + 1).padStart(2, '0')}.jpg`
  )

  return <SuiteBase suiteData={suiteData} images={images} />
}

export default SuitePremium



