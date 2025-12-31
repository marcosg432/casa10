import Dexie from 'dexie'

// Configuração do banco de dados IndexedDB usando Dexie
class Casa10Database extends Dexie {
  constructor() {
    super('Casa10Database')
    
    // Define o schema do banco de dados
    // Versão 1: Schema inicial
    this.version(1).stores({
      reservas: '++id, codigo, quartoId, checkIn, checkOut, status, dataReserva, nome, email, telefone',
      quartos: 'id, nome, preco',
      despesas: '++id, categoria, quantidade, total',
      funcionarios: '++id, nome, email',
      usuarios: 'id, nome, email, senha',
      carrinho: 'id, quartoId, checkIn, checkOut, preco, quantidade',
      configuracoes: 'key'
    })
    
    // Versão 2: Adiciona índices adicionais para melhor performance
    this.version(2).stores({
      reservas: '++id, codigo, quartoId, checkIn, checkOut, status, dataReserva, nome, email, telefone, origem, metodoPagamento',
      quartos: 'id, nome, preco, descricao',
      despesas: '++id, categoria, quantidade, total',
      funcionarios: '++id, nome, email, senha',
      usuarios: 'id, nome, email, senha, role, createdAt',
      carrinho: 'id, quartoId, checkIn, checkOut, preco, quantidade, nome, email, telefone',
      configuracoes: 'key, value'
    }).upgrade(async (tx) => {
      // Migração automática - não precisa fazer nada, Dexie preserva os dados
    })
    
    // Versão 3: Adiciona categoria aos quartos
    this.version(3).stores({
      reservas: '++id, codigo, quartoId, checkIn, checkOut, status, dataReserva, nome, email, telefone, origem, metodoPagamento',
      quartos: 'id, nome, preco, descricao, categoria',
      despesas: '++id, categoria, quantidade, total',
      funcionarios: '++id, nome, email, senha',
      usuarios: 'id, nome, email, senha, role, createdAt',
      carrinho: 'id, quartoId, checkIn, checkOut, preco, quantidade, nome, email, telefone',
      configuracoes: 'key, value'
    }).upgrade(async (tx) => {
      // Atualiza quartos existentes para incluir categoria
      const quartos = await tx.table('quartos').toCollection().toArray()
      for (const quarto of quartos) {
        if (!quarto.categoria) {
          // Define categoria baseado no ID
          if (quarto.id === 'casa10inn') {
            quarto.categoria = 'casa'
          } else {
            quarto.categoria = 'quartos'
          }
          await tx.table('quartos').put(quarto)
        }
      }
    })
    
    // Versão 4: Adiciona tabela de mensagens de contato
    this.version(4).stores({
      reservas: '++id, codigo, quartoId, checkIn, checkOut, status, dataReserva, nome, email, telefone, origem, metodoPagamento',
      quartos: 'id, nome, preco, descricao, categoria',
      despesas: '++id, categoria, quantidade, total',
      funcionarios: '++id, nome, email, senha',
      usuarios: 'id, nome, email, senha, role, createdAt',
      carrinho: 'id, quartoId, checkIn, checkOut, preco, quantidade, nome, email, telefone',
      configuracoes: 'key, value',
      mensagens: '++id, nome, email, telefone, mensagem, dataEnvio, lida'
    })
    
    // Inicializa as tabelas
    this.reservas = this.table('reservas')
    this.quartos = this.table('quartos')
    this.despesas = this.table('despesas')
    this.funcionarios = this.table('funcionarios')
    this.usuarios = this.table('usuarios')
    this.carrinho = this.table('carrinho')
    this.configuracoes = this.table('configuracoes')
    this.mensagens = this.table('mensagens')
  }
}

// Cria uma instância do banco de dados
const db = new Casa10Database()

// Função para migrar dados do localStorage para o banco de dados (executa apenas uma vez)
export const migrateFromLocalStorage = async () => {
  try {
    // Verifica se já migrou
    const migrado = await db.configuracoes.get('migrado')
    if (migrado) return
    
    // Migra reservas
    const reservasLS = localStorage.getItem('brisa_azul_reservas')
    if (reservasLS) {
      const reservas = JSON.parse(reservasLS)
      if (reservas.length > 0) {
        await db.reservas.bulkPut(reservas)
      }
    }
    
    // Migra quartos
    const quartosLS = localStorage.getItem('brisa_azul_quartos')
    if (quartosLS) {
      const quartos = JSON.parse(quartosLS)
      if (quartos.length > 0) {
        await db.quartos.bulkPut(quartos)
      }
    }
    
    // Migra despesas
    const despesasLS = localStorage.getItem('brisa_azul_despesas')
    if (despesasLS) {
      const despesas = JSON.parse(despesasLS)
      if (despesas.length > 0) {
        await db.despesas.bulkPut(despesas)
      }
    }
    
    // Migra funcionários
    const funcionariosLS = localStorage.getItem('brisa_azul_funcionarios')
    if (funcionariosLS) {
      const funcionarios = JSON.parse(funcionariosLS)
      if (funcionarios.length > 0) {
        await db.funcionarios.bulkPut(funcionarios)
      }
    }
    
    // Migra carrinho
    const carrinhoLS = localStorage.getItem('brisa_azul_carrinho')
    if (carrinhoLS) {
      const carrinho = JSON.parse(carrinhoLS)
      await db.carrinho.put({ id: 'current', ...carrinho })
    }
    
    // Migra meta de ocupação
    const metaLS = localStorage.getItem('brisa_azul_meta_ocupacao')
    if (metaLS) {
      await db.configuracoes.put({ key: 'meta_ocupacao', value: metaLS })
    }
    
    // Migra usuário logado (não sobrescreve usuários admin)
    const usuarioLS = localStorage.getItem('brisa_azul_usuario_logado')
    if (usuarioLS) {
      const usuario = JSON.parse(usuarioLS)
      // Só migra se não for o usuário admin
      if (usuario.email !== 'admin@casa10.com') {
        await db.usuarios.put({ id: 'current', ...usuario })
      }
    }
    
    // Marca como migrado
    await db.configuracoes.put({ key: 'migrado', value: 'true' })
    
    // Log apenas em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.log('Migração do localStorage para IndexedDB concluída!')
    }
  } catch (error) {
    // Log apenas em desenvolvimento, sem expor detalhes sensíveis
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro na migração:', error.message)
    }
  }
}

// Função para criar o usuário admin no banco de dados
export const createAdminUserInDB = async () => {
  try {
    // Abre o banco de dados
    await db.open()
    
    const { hashPassword } = await import('./security.js')
    const adminEmail = 'admin@casa10.com'
    
    // Verifica se o usuário já existe
    const usuarioExistente = await db.usuarios.get(adminEmail)
    
    // Cria o hash da senha padrão: admin123
    const hashedPassword = await hashPassword('admin123')
    
    // Sempre cria/atualiza o usuário usando put (garante que todos os campos sejam salvos)
    const adminUser = {
      id: adminEmail,
      nome: 'Administrador',
      email: adminEmail,
      senha: hashedPassword,
      role: 'admin',
      createdAt: usuarioExistente?.createdAt || new Date().toISOString()
    }
    
    // Usa put para garantir que todos os campos sejam salvos corretamente
    await db.usuarios.put(adminUser)
    await db.configuracoes.put({ key: 'admin_criado', value: 'true' })
    
    // Verifica se foi salvo corretamente
    const usuarioVerificado = await db.usuarios.get(adminEmail)
    if (usuarioVerificado && usuarioVerificado.senha) {
      return { success: true, message: 'Usuário criado com sucesso' }
    } else {
      throw new Error('Usuário não foi salvo corretamente')
    }
  } catch (error) {
    // Log apenas em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro ao criar usuário admin:', error.message)
    }
    throw error
  }
}

// Inicializa a migração e cria o usuário admin quando o módulo é carregado
(async () => {
  try {
    await migrateFromLocalStorage()
    // Aguarda um pouco para garantir que a migração terminou
    await new Promise(resolve => setTimeout(resolve, 100))
    // Cria o usuário admin imediatamente após a migração
    await createAdminUserInDB()
  } catch (err) {
    // Log apenas em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.error('Erro ao inicializar banco de dados:', err.message)
    }
    // Tenta criar o usuário mesmo se a migração falhar
    try {
      await createAdminUserInDB()
    } catch (err2) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Erro ao criar usuário admin:', err2.message)
      }
    }
  }
})()

export default db

