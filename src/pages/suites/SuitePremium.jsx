import SuiteBase from './SuiteBase'

const SuitePremium = () => {
  const suiteData = {
    id: 'premium',
    nome: 'Quarto Duplo Amplo',
    preco: 450,
    descricao: 'O quarto duplo oferece uma área de estar, uma área para refeições, além de um banheiro privativo com chuveiro. Os hóspedes encontrarão um fogão, uma geladeira, utensílios de cozinha e um forno na cozinha. O quarto duplo também inclui uma churrasqueira. O quarto duplo dispõe de ar-condicionado, máquina de lavar roupa, entrada privativa, comodidades para preparar chá e café e TV de tela plana com serviços de streaming. A unidade possui 2 camas.'
  }

  return <SuiteBase suiteData={suiteData} />
}

export default SuitePremium



