import SuiteBase from './SuiteBase'

const Quarto1 = () => {
  const suiteData = {
    id: 'casa2',
    nome: 'Casa 2',
    preco: 300,
    descricao: 'Casa10inn fornece acomodação em Carapina com banheira de hidromassagem. Parque Municipal de Mangue Seco fica a 8,2 km de distância. Você contará com Wi-Fi grátis e estacionamento privativo disponível no local nesta acomodação com ar-condicionado. Parque Pedra da Cebola fica a 6,5 km de distância.\n\nA casa de temporada oferece 4 quartos, TV de tela plana com canais via satélite, cozinha com geladeira e forno, máquina de lavar roupa, além de 3 banheiros com chuveiro. A casa de temporada oferece toalhas e roupa de cama.\n\nCasa10inn fica a 9,2 km de Praça dos Namorados e a 12 km de Praça do Papa. O Aeroporto de Aeroporto de Vitória - Eurico de Aguiar Salles fica a 1 km de distância.'
  }

  // Imagens exclusivas da Casa 2
  const casa2Images = Array.from({ length: 48 }, (_, i) => 
    `/imagem/casa-2/casa-2-${String(i + 1).padStart(2, '0')}.jpg`
  )

  const internalRooms = [
    {
      image: '/imagem/quarto-1.jpg',
      title: 'Quarto 1',
      description: '3 camas de solteiro',
      link: '/quarto-1'
    },
    {
      image: '/imagem/quarto-2-novo.jpg',
      title: 'Quarto 2',
      description: '5 camas de solteiros',
      link: '/quarto-2'
    },
    {
      image: '/imagem/quarto-3.jpg',
      title: 'Quarto 3',
      description: '3 camas de solteiro',
      link: '/quarto-3'
    },
    {
      image: '/imagem/quarto-4.jpg',
      title: 'Quarto 4',
      description: '4 camas de solteiro',
      link: '/quarto-4'
    }
  ]

  const customHouseInfo = {
    area: '180 m²',
    banheiros: '3',
    capacidade: '15 pessoas'
  }

  return <SuiteBase suiteData={suiteData} images={casa2Images} internalRooms={internalRooms} customHouseInfo={customHouseInfo} />
}

export default Quarto1

