// Sistema de armazenamento usando IndexedDB (Dexie)
import db, { migrateFromLocalStorage } from './db.js'
import { hashPassword, comparePassword, sanitizeEmail, sanitizeString, createSession, validateSession, clearSession } from './security.js'

// Garante que a migração seja executada
migrateFromLocalStorage()

// Função para verificar e atualizar reservas concluídas automaticamente
const atualizarReservasConcluidas = async () => {
  const agora = new Date()
  const horaCheckout = 10 // 10:00
  
  const reservas = await db.reservas.toArray()
  
  for (const reserva of reservas) {
    if (reserva.status === 'pendente' && reserva.checkOut) {
      const checkOut = new Date(reserva.checkOut)
      checkOut.setHours(horaCheckout, 0, 0, 0)
      
      if (agora >= checkOut) {
        await db.reservas.update(reserva.id, { status: 'concluida' })
      }
    }
  }
}

// ========== RESERVAS ==========
export const getReservas = async () => {
  await atualizarReservasConcluidas()
  return await db.reservas.toArray()
}

export const saveReserva = async (reserva) => {
  const novaReserva = {
    ...reserva,
    id: Date.now(),
    codigo: `BR${Date.now()}`,
    status: 'pendente',
    dataReserva: new Date().toISOString()
  }
  await db.reservas.add(novaReserva)
  return novaReserva
}

export const updateReserva = async (id, updates) => {
  // Sanitiza dados antes de atualizar
  const updatesSanitizados = { ...updates }
  if (updates.nome) updatesSanitizados.nome = sanitizeString(updates.nome)
  if (updates.email) updatesSanitizados.email = sanitizeEmail(updates.email)
  if (updates.telefone) updatesSanitizados.telefone = sanitizePhone(updates.telefone)
  if (updates.origem) updatesSanitizados.origem = sanitizeString(updates.origem)
  if (updates.metodoPagamento) updatesSanitizados.metodoPagamento = sanitizeString(updates.metodoPagamento)
  
  await db.reservas.update(id, updatesSanitizados)
  return await db.reservas.get(id)
}

export const deleteReserva = async (id) => {
  await db.reservas.delete(id)
}

// ========== QUARTOS ==========
export const getQuartos = async () => {
  const quartos = await db.quartos.toArray()
  
  if (quartos.length > 0) {
    return quartos
  }
  
  // Inicializar quartos padrão - sincronizados com a página Quartos.jsx
  const quartosPadrao = [
    {
      id: 'premium',
      nome: 'Quarto Duplo Amplo',
      preco: 450,
      descricao: 'O quarto duplo oferece uma área de estar, uma área para refeições, além de um banheiro privativo com chuveiro. Os hóspedes encontrarão um fogão, uma geladeira, utensílios de cozinha e um forno na cozinha. O quarto duplo também inclui uma churrasqueira. O quarto duplo dispõe de ar-condicionado, máquina de lavar roupa, entrada privativa, comodidades para preparar chá e café e TV de tela plana com serviços de streaming. A unidade possui 2 camas.'
    },
    {
      id: 'exclusiva',
      nome: 'Quarto Duplo Standard',
      preco: 550,
      descricao: 'O quarto duplo oferece uma área de estar e uma área para refeições, além de um banheiro compartilhado com chuveiro. Os hóspedes encontrarão um fogão, uma geladeira, utensílios de cozinha e um forno na cozinha bem equipada. O quarto duplo também disponibiliza uma churrasqueira. O quarto duplo conta com ar-condicionado, máquina de lavar roupa, entrada privativa, comodidades para preparar chá e café e TV de tela plana com serviços de streaming. A unidade dispõe de 1 cama.'
    },
    {
      id: 'luxo',
      nome: 'Quarto Deluxe',
      preco: 400,
      descricao: 'O quarto duplo oferece uma área de estar e uma área para refeições, além de um banheiro compartilhado com chuveiro. Os hóspedes encontrarão um fogão, uma geladeira, utensílios de cozinha e um forno na cozinha totalmente equipada. O quarto duplo também conta com uma churrasqueira. O quarto duplo dispõe de ar-condicionado, máquina de lavar roupa, entrada privativa, comodidades para preparar chá e café, além de TV de tela plana com serviços de streaming. A unidade possui 2 camas.'
    },
    {
      id: 'imperial',
      nome: 'Quarto Duplo com Banheiro Privado',
      preco: 500,
      descricao: 'O quarto duplo oferece uma área de estar, uma área para refeições, além de um banheiro privativo com chuveiro. Os hóspedes encontrarão um fogão, uma geladeira, utensílios de cozinha e um forno na cozinha. O quarto duplo também inclui uma churrasqueira. O quarto duplo dispõe de ar-condicionado, máquina de lavar roupa, entrada privativa, comodidades para preparar chá e café e TV de tela plana com serviços de streaming. A unidade possui 2 camas.'
    },
    {
      id: 'casa2',
      nome: 'Casa 2',
      preco: 300,
      descricao: 'Casa10inn fornece acomodação em Carapina com banheira de hidromassagem. Parque Municipal de Mangue Seco fica a 8,2 km de distância. Você contará com Wi-Fi grátis e estacionamento privativo disponível no local nesta acomodação com ar-condicionado. Parque Pedra da Cebola fica a 6,5 km de distância. A casa de temporada oferece 4 quartos, TV de tela plana com canais via satélite, cozinha com geladeira e forno, máquina de lavar roupa, além de 3 banheiros com chuveiro. A casa de temporada oferece toalhas e roupa de cama. Casa10inn fica a 9,2 km de Praça dos Namorados e a 12 km de Praça do Papa. O Aeroporto de Aeroporto de Vitória - Eurico de Aguiar Salles fica a 1 km de distância.'
    }
  ]
  
  await db.quartos.bulkAdd(quartosPadrao)
  return quartosPadrao
}

// ========== DESPESAS ==========
export const getDespesas = async () => {
  const despesas = await db.despesas.toArray()
  
  if (despesas.length > 0) {
    return despesas
  }
  
  const despesasPadrao = [
    { id: 1, categoria: 'Funcionarios', quantidade: 7, total: 1300.00 },
    { id: 2, categoria: 'Limpeza', quantidade: null, total: 3800.00 },
    { id: 3, categoria: 'Manutenção', quantidade: null, total: 1400.80 },
    { id: 4, categoria: 'Taxas de plataformas', quantidade: null, total: 3800.00 },
    { id: 5, categoria: 'Gasto a parte', quantidade: null, total: 1300.00 },
    { id: 6, categoria: 'Despesas fixa', quantidade: null, total: 3800.00 }
  ]
  
  await db.despesas.bulkAdd(despesasPadrao)
  return despesasPadrao
}

export const updateDespesas = async (despesas) => {
  await db.despesas.clear()
  await db.despesas.bulkAdd(despesas)
}

// ========== FUNCIONÁRIOS ==========
export const getFuncionarios = async () => {
  return await db.funcionarios.toArray()
}

export const saveFuncionario = async (funcionario) => {
  // Esta função está obsoleta - use createAdminUser ao invés
  // Mantida apenas para compatibilidade
  const novo = {
    ...funcionario,
    id: Date.now()
  }
  await db.funcionarios.add(novo)
  return novo
}

export const deleteFuncionario = async (id) => {
  await db.funcionarios.delete(id)
}

// ========== USUÁRIOS E AUTENTICAÇÃO ==========
// Cria ou atualiza um usuário admin
export const createAdminUser = async (nome, email, senha) => {
  const hashedPassword = await hashPassword(senha)
  const usuario = {
    id: email.toLowerCase(),
    nome: sanitizeString(nome),
    email: sanitizeEmail(email),
    senha: hashedPassword,
    role: 'admin',
    createdAt: new Date().toISOString()
  }
  await db.usuarios.put(usuario)
  return usuario
}

// Autentica um usuário
export const authenticateUser = async (email, senha) => {
  const emailSanitizado = sanitizeEmail(email)
  if (!emailSanitizado) {
    throw new Error('Email inválido')
  }
  
  console.log('🔵 Autenticando usuário:', emailSanitizado)
  const usuario = await db.usuarios.get(emailSanitizado)
  
  if (!usuario) {
    console.error('❌ Usuário não encontrado:', emailSanitizado)
    throw new Error('Usuário não encontrado')
  }
  
  console.log('🔵 Usuário encontrado, verificando senha...')
  console.log('🔵 Hash armazenado:', usuario.senha ? usuario.senha.substring(0, 20) + '...' : 'VAZIO')
  
  const senhaValida = await comparePassword(senha, usuario.senha)
  console.log('🔵 Senha válida?', senhaValida)
  
  if (!senhaValida) {
    console.error('❌ Senha incorreta para usuário:', emailSanitizado)
    throw new Error('Senha incorreta')
  }
  
  console.log('✅ Autenticação bem-sucedida!')
  
  // Cria sessão
  const session = createSession(usuario.id)
  
  // Salva usuário logado (sem senha)
  const { senha: _, ...usuarioSemSenha } = usuario
  await db.usuarios.put({ id: 'current', ...usuarioSemSenha })
  
  return { usuario: usuarioSemSenha, session }
}

// Verifica se há usuário logado e sessão válida
export const getUsuarioLogado = async () => {
  // Verifica sessão primeiro
  if (!validateSession()) {
    await logout()
    return null
  }
  
  const usuario = await db.usuarios.get('current')
  if (!usuario) return null
  
  const { id, ...rest } = usuario
  return rest
}

// Verifica se usuário está autenticado
export const isAuthenticated = async () => {
  if (!validateSession()) {
    return false
  }
  const usuario = await getUsuarioLogado()
  return usuario !== null
}

export const setUsuarioLogado = async (usuario) => {
  // Função mantida para compatibilidade, mas não deve ser usada diretamente
  // Use authenticateUser ao invés
  await db.usuarios.put({ id: 'current', ...usuario })
}

export const logout = async () => {
  clearSession()
  await db.usuarios.delete('current')
}

// Busca usuário por email
export const getUsuarioByEmail = async (email) => {
  const emailSanitizado = sanitizeEmail(email)
  if (!emailSanitizado) return null
  return await db.usuarios.get(emailSanitizado)
}

// ========== CARRINHO ==========
export const getCarrinho = async () => {
  const carrinho = await db.carrinho.get('current')
  return carrinho || null
}

export const saveCarrinho = async (carrinho) => {
  // Sanitiza dados do carrinho antes de salvar
  const carrinhoSanitizado = {
    ...carrinho,
    nome: carrinho.nome ? sanitizeString(carrinho.nome) : carrinho.nome,
    email: carrinho.email ? sanitizeEmail(carrinho.email) : carrinho.email,
    telefone: carrinho.telefone ? sanitizePhone(carrinho.telefone) : carrinho.telefone,
    quartoNome: carrinho.quartoNome ? sanitizeString(carrinho.quartoNome) : carrinho.quartoNome
  }
  await db.carrinho.put({ id: 'current', ...carrinhoSanitizado })
}

export const clearCarrinho = async () => {
  await db.carrinho.delete('current')
}

// ========== CONFIGURAÇÕES ==========
export const getMetaOcupacao = async () => {
  const config = await db.configuracoes.get('meta_ocupacao')
  return config ? parseInt(config.value) : 100
}

export const setMetaOcupacao = async (meta) => {
  await db.configuracoes.put({ key: 'meta_ocupacao', value: meta.toString() })
}

// ========== FUNÇÕES AUXILIARES PARA CÁLCULOS ==========
export const getReservasPorMes = async (mes, ano) => {
  const reservas = await getReservas()
  return reservas.filter(r => {
    const dataReserva = new Date(r.dataReserva)
    return dataReserva.getMonth() === mes && dataReserva.getFullYear() === ano
  })
}

export const getReservasPorQuarto = async (quartoId) => {
  const reservas = await getReservas()
  return reservas.filter(r => r.quartoId === quartoId)
}

export const getReservasPorData = async (data) => {
  const reservas = await getReservas()
  const dataStr = data.toISOString().split('T')[0]
  return reservas.filter(r => {
    const checkIn = new Date(r.checkIn).toISOString().split('T')[0]
    const checkOut = new Date(r.checkOut).toISOString().split('T')[0]
    return dataStr >= checkIn && dataStr < checkOut
  })
}

export const isDataOcupada = async (data, quartoId) => {
  const reservas = await getReservas()
  const dataStr = data.toISOString().split('T')[0]
  return reservas.some(r => {
    if (r.quartoId !== quartoId || r.status === 'cancelada') return false
    const checkIn = new Date(r.checkIn).toISOString().split('T')[0]
    const checkOut = new Date(r.checkOut).toISOString().split('T')[0]
    return dataStr >= checkIn && dataStr < checkOut
  })
}

// ========== FUNÇÃO PARA FORMATAR VALORES MONETÁRIOS ==========
export const formatarMoeda = (valor) => {
  if (valor === null || valor === undefined || isNaN(valor)) return '0,00'
  const valorFormatado = parseFloat(valor).toFixed(2)
  const partes = valorFormatado.split('.')
  const inteiro = partes[0]
  const decimal = partes[1]
  
  // Adicionar ponto como separador de milhares
  const inteiroFormatado = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  
  return `${inteiroFormatado},${decimal}`
}
