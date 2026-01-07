import SuiteBase from './SuiteBase'

const Quarto1 = () => {
  const suiteData = {
    id: 'casa10inn',
    nome: 'Casa10inn',
    preco: 300,
    descricao: 'Casa de Cima (Casa da Banheira) - Casa completa para aluguer integral. Piso superior com cobertores azul-claro. Esta é uma casa inteira, não é hostel e não é alugada por quarto individual. A casa oferece 4 quartos (1 com 3 camas, 1 com 5 camas, 1 com 3 camas, 1 suite com 3 camas incluindo 1 cama de casal), TV de tela plana com canais via satélite, cozinha com geladeira e forno, máquina de lavar roupa, além de 3 banheiros com chuveiro e banheira de hidromassagem. Capacidade total: 15 pessoas. Todos os quartos possuem cobertores azul-claro.'
  }

  // Imagens exclusivas da Casa10inn
  const casa10innImages = Array.from({ length: 48 }, (_, i) => 
    `/imagem/casa-2/casa-2-${String(i + 1).padStart(2, '0')}.jpg`
  )

  const internalRooms = [
    {
      image: '/imagem/quarto-2-novo.jpg',
      title: 'Quarto 1',
      description: '3 camas de solteiro • Capacidade: 3 pessoas • Cobertores Azul-Claro',
      link: '/quarto-1'
    },
    {
      image: '/imagem/quarto-1.jpg',
      title: 'Quarto 2',
      description: '5 camas de solteiro • Capacidade: 5 pessoas • Cobertores Azul-Claro',
      link: '/quarto-2'
    },
    {
      image: '/imagem/quarto-3.jpg',
      title: 'Quarto 3',
      description: '3 camas de solteiro • Capacidade: 3 pessoas • Cobertores Azul-Claro',
      link: '/quarto-3'
    },
    {
      image: '/imagem/quarto-4.jpg',
      title: 'Suite',
      description: '3 camas (incluindo 1 cama de casal) • Capacidade: 4 pessoas • Cobertores Azul-Claro',
      link: '/quarto-4'
    }
  ]

  const customHouseInfo = {
    area: '180 m²',
    banheiros: '3',
    capacidade: '15 pessoas',
    tipo: 'Casa Inteira',
    identificacao: 'Cobertores Azul-Claro'
  }

  return <SuiteBase suiteData={suiteData} images={casa10innImages} internalRooms={internalRooms} customHouseInfo={customHouseInfo} />
}

export default Quarto1

