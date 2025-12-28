import db from './db.js'

const BACKUP_INTERVAL = 6 * 60 * 60 * 1000 // 6 horas em milissegundos
const MAX_BACKUPS = 30
const BACKUP_STORAGE_KEY = 'database_backups'

// Estrutura de um backup
// {
//   id: timestamp,
//   timestamp: Date,
//   data: { todas as tabelas },
//   size: number
// }

// ========== CRIAR BACKUP ==========
export const createBackup = async () => {
  try {
    const timestamp = Date.now()
    const backupData = {}

    // Exporta todas as tabelas
    const tableNames = ['reservas', 'quartos', 'despesas', 'funcionarios', 'usuarios', 'carrinho', 'configuracoes']
    
    for (const tableName of tableNames) {
      try {
        const table = db[tableName]
        if (table) {
          backupData[tableName] = await table.toArray()
        }
      } catch (err) {
        console.error(`Erro ao fazer backup da tabela ${tableName}:`, err)
        backupData[tableName] = []
      }
    }

    // Calcula tamanho do backup
    const backupString = JSON.stringify(backupData)
    const size = new Blob([backupString]).size

    const backup = {
      id: timestamp,
      timestamp: new Date(timestamp).toISOString(),
      date: new Date(timestamp).toLocaleString('pt-BR'),
      data: backupData,
      size: size,
      sizeFormatted: formatBytes(size)
    }

    // Salva backup
    await saveBackup(backup)

    // Remove backups antigos (mantém apenas os 30 mais recentes)
    await cleanupOldBackups()

    console.log(`Backup criado com sucesso: ${backup.date} (${backup.sizeFormatted})`)
    return backup
  } catch (error) {
    console.error('Erro ao criar backup:', error)
    throw error
  }
}

// ========== SALVAR BACKUP ==========
const saveBackup = async (backup) => {
  try {
    const backups = await getBackups()
    backups.push(backup)
    
    // Ordena por timestamp (mais recente primeiro)
    backups.sort((a, b) => b.id - a.id)
    
    // Salva no localStorage (ou IndexedDB se preferir)
    localStorage.setItem(BACKUP_STORAGE_KEY, JSON.stringify(backups))
  } catch (error) {
    console.error('Erro ao salvar backup:', error)
    throw error
  }
}

// ========== OBTER BACKUPS ==========
export const getBackups = async () => {
  try {
    const backupsJson = localStorage.getItem(BACKUP_STORAGE_KEY)
    if (!backupsJson) return []
    
    const backups = JSON.parse(backupsJson)
    // Ordena por timestamp (mais recente primeiro)
    return backups.sort((a, b) => b.id - a.id)
  } catch (error) {
    console.error('Erro ao obter backups:', error)
    return []
  }
}

// ========== LIMPAR BACKUPS ANTIGOS ==========
const cleanupOldBackups = async () => {
  try {
    const backups = await getBackups()
    
    if (backups.length > MAX_BACKUPS) {
      // Remove os backups mais antigos
      const backupsToKeep = backups.slice(0, MAX_BACKUPS)
      localStorage.setItem(BACKUP_STORAGE_KEY, JSON.stringify(backupsToKeep))
      console.log(`Removidos ${backups.length - MAX_BACKUPS} backup(s) antigo(s)`)
    }
  } catch (error) {
    console.error('Erro ao limpar backups antigos:', error)
  }
}

// ========== RESTAURAR BACKUP ==========
export const restoreBackup = async (backupId) => {
  try {
    const backups = await getBackups()
    const backup = backups.find(b => b.id === backupId)
    
    if (!backup) {
      throw new Error('Backup não encontrado')
    }

    // Limpa todas as tabelas antes de restaurar
    const tableNames = ['reservas', 'quartos', 'despesas', 'funcionarios', 'usuarios', 'carrinho', 'configuracoes']
    
    for (const tableName of tableNames) {
      await db[tableName].clear()
    }

    // Restaura dados de cada tabela
    for (const tableName of tableNames) {
      if (backup.data[tableName] && backup.data[tableName].length > 0) {
        try {
          await db[tableName].bulkAdd(backup.data[tableName])
        } catch (err) {
          // Se houver erro (ex: chave duplicada), tenta com bulkPut
          try {
            await db[tableName].bulkPut(backup.data[tableName])
          } catch (err2) {
            console.error(`Erro ao restaurar tabela ${tableName}:`, err2)
          }
        }
      }
    }

    console.log(`Backup restaurado com sucesso: ${backup.date}`)
    return true
  } catch (error) {
    console.error('Erro ao restaurar backup:', error)
    throw error
  }
}

// ========== DELETAR BACKUP ==========
export const deleteBackup = async (backupId) => {
  try {
    const backups = await getBackups()
    const filtered = backups.filter(b => b.id !== backupId)
    localStorage.setItem(BACKUP_STORAGE_KEY, JSON.stringify(filtered))
    return true
  } catch (error) {
    console.error('Erro ao deletar backup:', error)
    throw error
  }
}

// ========== INICIAR SISTEMA DE BACKUP AUTOMÁTICO ==========
let backupInterval = null

export const startAutoBackup = () => {
  // Para qualquer intervalo existente
  if (backupInterval) {
    clearInterval(backupInterval)
  }

  // Cria backup imediatamente
  createBackup().catch(err => {
    console.error('Erro no backup inicial:', err)
  })

  // Configura backup automático a cada 6 horas
  backupInterval = setInterval(() => {
    createBackup().catch(err => {
      console.error('Erro no backup automático:', err)
    })
  }, BACKUP_INTERVAL)

  console.log('Sistema de backup automático iniciado (a cada 6 horas)')
}

// ========== PARAR SISTEMA DE BACKUP ==========
export const stopAutoBackup = () => {
  if (backupInterval) {
    clearInterval(backupInterval)
    backupInterval = null
    console.log('Sistema de backup automático parado')
  }
}

// ========== VERIFICAR STATUS DO BACKUP ==========
export const getBackupStatus = async () => {
  const backups = await getBackups()
  const lastBackup = backups.length > 0 ? backups[0] : null
  
  return {
    isRunning: backupInterval !== null,
    lastBackup: lastBackup,
    totalBackups: backups.length,
    nextBackup: lastBackup ? new Date(lastBackup.id + BACKUP_INTERVAL).toLocaleString('pt-BR') : null
  }
}

// ========== EXPORTAR BACKUP COMO ARQUIVO ==========
export const exportBackupToFile = async (backupId) => {
  try {
    const backups = await getBackups()
    const backup = backups.find(b => b.id === backupId)
    
    if (!backup) {
      throw new Error('Backup não encontrado')
    }

    const dataStr = JSON.stringify(backup.data, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `backup_${new Date(backup.id).toISOString().split('T')[0]}_${backup.id}.json`
    link.click()
    URL.revokeObjectURL(url)
    
    return true
  } catch (error) {
    console.error('Erro ao exportar backup:', error)
    throw error
  }
}

// ========== IMPORTAR BACKUP DE ARQUIVO ==========
export const importBackupFromFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = async (e) => {
      try {
        const backupData = JSON.parse(e.target.result)
        
        // Cria um novo backup com os dados importados
        const timestamp = Date.now()
        const backup = {
          id: timestamp,
          timestamp: new Date(timestamp).toISOString(),
          date: new Date(timestamp).toLocaleString('pt-BR'),
          data: backupData,
          size: new Blob([JSON.stringify(backupData)]).size,
          sizeFormatted: formatBytes(new Blob([JSON.stringify(backupData)]).size),
          imported: true
        }

        await saveBackup(backup)
        await cleanupOldBackups()
        
        resolve(backup)
      } catch (error) {
        reject(new Error('Arquivo de backup inválido'))
      }
    }
    
    reader.onerror = () => {
      reject(new Error('Erro ao ler arquivo'))
    }
    
    reader.readAsText(file)
  })
}

// ========== FUNÇÃO AUXILIAR PARA FORMATAR BYTES ==========
const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

// Inicia o sistema de backup automaticamente quando o módulo é carregado
// Apenas se estiver no navegador (não em testes)
if (typeof window !== 'undefined') {
  // Aguarda um pouco para garantir que o banco está pronto
  setTimeout(() => {
    startAutoBackup()
  }, 5000) // 5 segundos após carregar a página
}

