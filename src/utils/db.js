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
    
    // Inicializa as tabelas
    this.reservas = this.table('reservas')
    this.quartos = this.table('quartos')
    this.despesas = this.table('despesas')
    this.funcionarios = this.table('funcionarios')
    this.usuarios = this.table('usuarios')
    this.carrinho = this.table('carrinho')
    this.configuracoes = this.table('configuracoes')
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
    
    // Migra usuário logado
    const usuarioLS = localStorage.getItem('brisa_azul_usuario_logado')
    if (usuarioLS) {
      const usuario = JSON.parse(usuarioLS)
      await db.usuarios.put({ id: 'current', ...usuario })
    }
    
    // Marca como migrado
    await db.configuracoes.put({ key: 'migrado', value: 'true' })
    
    console.log('Migração do localStorage para IndexedDB concluída!')
  } catch (error) {
    console.error('Erro na migração:', error)
  }
}

// Função para criar o usuário admin no banco de dados (executa apenas uma vez)
export const createAdminUserInDB = async () => {
  try {
    // Verifica se já criou o admin
    const adminCriado = await db.configuracoes.get('admin_criado')
    if (adminCriado) return
    
    const { hashPassword } = await import('./security.js')
    const adminEmail = 'admin@casa10.com'
    
    // Cria o usuário admin com senha padrão: admin123
    const hashedPassword = await hashPassword('admin123')
    const adminUser = {
      id: adminEmail,
      nome: 'Administrador',
      email: adminEmail,
      senha: hashedPassword,
      role: 'admin',
      createdAt: new Date().toISOString()
    }
    
    await db.usuarios.put(adminUser)
    await db.configuracoes.put({ key: 'admin_criado', value: 'true' })
    console.log('Usuário admin criado no banco de dados: admin@casa10.com / admin123')
  } catch (error) {
    console.error('Erro ao criar usuário admin:', error)
  }
}

// Inicializa a migração quando o módulo é carregado
migrateFromLocalStorage()

// Cria o usuário admin quando o módulo é carregado (apenas uma vez)
createAdminUserInDB()

export default db

