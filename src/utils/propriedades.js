// Estrutura de dados das propriedades
// Separação clara entre HOSTEL e CASA DE CIMA

export const PROPRIEDADES = {
  HOSTEL: {
    id: 'hostel',
    nome: 'Hostel',
    tipo: 'hostel',
    tipoAluguer: 'quarto-individual',
    descricao: 'Aluguer por quarto individual - Piso Inferior',
    identificacaoVisual: 'Cobertores Azul-Escuro',
    corCobertor: '#1a4d7a', // Azul escuro
    piso: 'inferior',
    naoECasaInteira: true,
    quartos: [
      {
        id: 'quarto-duplo-amplo',
        nome: 'Quarto Duplo Amplo',
        caminho: '/quarto-duplo-amplo',
        camas: 2,
        capacidade: 2,
        preco: 450,
        descricao: 'Quarto do hostel com 2 camas individuais. Cobertores azul-escuro. Área de estar, área para refeições, banheiro privativo com chuveiro. Cozinha equipada com fogão, geladeira, utensílios e forno. Churrasqueira. Ar-condicionado, máquina de lavar roupa, entrada privativa, comodidades para chá e café, TV de tela plana com streaming.',
        imagens: ['/imagem/quarto-duplo-amplo.jpg'],
        comodidades: ['Wi-Fi', 'Ar-condicionado', 'TV', 'Cozinha', 'Banheiro privativo']
      },
      {
        id: 'quarto-duplo-standard',
        nome: 'Quarto Duplo Standard',
        caminho: '/quarto-duplo-standard',
        camas: 2,
        capacidade: 2,
        preco: 550,
        descricao: 'Quarto do hostel com 2 camas individuais. Cobertores azul-escuro. Área de estar, área para refeições, banheiro compartilhado com chuveiro. Cozinha bem equipada com fogão, geladeira, utensílios e forno. Churrasqueira. Ar-condicionado, máquina de lavar roupa, entrada privativa, comodidades para chá e café, TV de tela plana com streaming.',
        imagens: ['/imagem/quarto-duplo-standard.jpg'],
        comodidades: ['Wi-Fi', 'Ar-condicionado', 'TV', 'Cozinha', 'Banheiro compartilhado']
      },
      {
        id: 'quarto-deluxe',
        nome: 'Quarto Deluxe',
        caminho: '/quarto-deluxe',
        camas: 2,
        capacidade: 2,
        preco: 400,
        descricao: 'Quarto do hostel com 2 camas individuais. Cobertores azul-escuro. Área de estar, área para refeições, banheiro compartilhado com chuveiro. Cozinha totalmente equipada com fogão, geladeira, utensílios e forno. Churrasqueira. Ar-condicionado, máquina de lavar roupa, entrada privativa, comodidades para chá e café, TV de tela plana com streaming.',
        imagens: ['/imagem/quarto-deluxe.jpg'],
        comodidades: ['Wi-Fi', 'Ar-condicionado', 'TV', 'Cozinha', 'Banheiro compartilhado']
      },
      {
        id: 'quarto-duplo-banheiro-privado',
        nome: 'Quarto Duplo com Banheiro Privado',
        caminho: '/quarto-duplo-banheiro-privado',
        camas: 2,
        capacidade: 2,
        preco: 500,
        descricao: 'Quarto do hostel com 2 camas individuais. Cobertores azul-escuro. Área de estar, área para refeições, banheiro privativo com chuveiro. Cozinha equipada com fogão, geladeira, utensílios e forno. Churrasqueira. Ar-condicionado, máquina de lavar roupa, entrada privativa, comodidades para chá e café, TV de tela plana com streaming.',
        imagens: ['/imagem/quarto-duplo-banheiro-privado.jpg'],
        comodidades: ['Wi-Fi', 'Ar-condicionado', 'TV', 'Cozinha', 'Banheiro privativo']
      }
    ]
  },
  CASA_DE_CIMA: {
    id: 'casa-de-cima',
    nome: 'Casa de Cima (Casa da Banheira)',
    tipo: 'casa-inteira',
    tipoAluguer: 'casa-completa',
    descricao: 'Casa completa para aluguer integral - Piso Superior',
    identificacaoVisual: 'Cobertores Azul-Claro',
    corCobertor: '#87ceeb', // Azul claro
    piso: 'superior',
    naoEHostel: true,
    naoEAlugadoPorQuarto: true,
    capacidadeTotal: 15, // 5 + 3 + 3 + 4 = 15
    preco: 300,
    quartos: [
      {
        id: 'quarto-1-casa',
        nome: 'Quarto 1',
        camas: 3,
        capacidade: 3,
        tipoCamas: '3 camas de solteiro',
        descricao: 'Quarto da casa de cima com 3 camas de solteiro. Cobertores azul-claro.',
        imagens: ['/imagem/quarto-2-novo.jpg'],
        caminho: '/quarto-1'
      },
      {
        id: 'quarto-2-casa',
        nome: 'Quarto 2',
        camas: 5,
        capacidade: 5,
        tipoCamas: '5 camas de solteiro',
        descricao: 'Quarto da casa de cima com 5 camas de solteiro. Cobertores azul-claro.',
        imagens: ['/imagem/quarto-1.jpg'],
        caminho: '/quarto-2'
      },
      {
        id: 'quarto-3-casa',
        nome: 'Quarto 3',
        camas: 3,
        capacidade: 3,
        tipoCamas: '3 camas de solteiro',
        descricao: 'Quarto da casa de cima com 3 camas de solteiro. Cobertores azul-claro.',
        imagens: ['/imagem/quarto-3.jpg'],
        caminho: '/quarto-3'
      },
      {
        id: 'suite-casa',
        nome: 'Suite',
        camas: 3,
        capacidade: 4, // 3 camas + 1 cama de casal = 4 lugares
        tipoCamas: '3 camas (incluindo 1 cama de casal)',
        descricao: 'Suite da casa de cima com 3 camas no total, incluindo 1 cama de casal. Cobertores azul-claro. Capacidade para 4 pessoas.',
        imagens: ['/imagem/quarto-4.jpg'],
        caminho: '/quarto-4'
      }
    ],
    descricaoCompleta: 'Casa10inn - Casa de Cima (Casa da Banheira) fornece acomodação completa em Carapina com banheira de hidromassagem. Esta é uma casa inteira para aluguer completo, não é hostel e não é alugada por quarto individual. A casa oferece 4 quartos (1 com 3 camas, 1 com 5 camas, 1 com 3 camas, 1 suite com 3 camas incluindo 1 cama de casal), TV de tela plana com canais via satélite, cozinha com geladeira e forno, máquina de lavar roupa, além de 3 banheiros com chuveiro. Todos os quartos possuem cobertores azul-claro. Capacidade total: 15 pessoas.',
    imagens: Array.from({ length: 48 }, (_, i) => 
      `/imagem/casa-2/casa-2-${String(i + 1).padStart(2, '0')}.jpg`
    ),
    comodidades: ['Wi-Fi', 'Ar-condicionado', 'TV', 'Cozinha completa', '3 Banheiros', 'Banheira de hidromassagem', 'Estacionamento']
  }
}

// Mapeamento de IDs antigos para novos
const ID_MAPPING = {
  'premium': 'quarto-duplo-amplo',
  'exclusiva': 'quarto-duplo-standard',
  'luxo': 'quarto-deluxe',
  'imperial': 'quarto-duplo-banheiro-privado',
  'casa10inn': 'casa-de-cima'
}

// Funções auxiliares
export const getQuartosHostel = () => PROPRIEDADES.HOSTEL.quartos
export const getCasaDeCima = () => PROPRIEDADES.CASA_DE_CIMA
export const getQuartoById = (id) => {
  // Normaliza o ID usando o mapeamento
  const normalizedId = ID_MAPPING[id] || id
  
  // Busca no hostel
  const quartoHostel = PROPRIEDADES.HOSTEL.quartos.find(q => q.id === normalizedId || q.id === id)
  if (quartoHostel) return { ...quartoHostel, propriedade: 'HOSTEL' }
  
  // Busca na casa de cima
  const quartoCasa = PROPRIEDADES.CASA_DE_CIMA.quartos.find(q => q.id === normalizedId || q.id === id)
  if (quartoCasa) return { ...quartoCasa, propriedade: 'CASA_DE_CIMA' }
  
  // Se for a casa inteira
  if (normalizedId === 'casa-de-cima' || id === 'casa-de-cima' || id === 'casa10inn') {
    return { ...PROPRIEDADES.CASA_DE_CIMA, propriedade: 'CASA_DE_CIMA' }
  }
  
  return null
}

