import { useState, useEffect } from 'react'
import { 
  getBackups, 
  createBackup, 
  restoreBackup, 
  deleteBackup, 
  getBackupStatus,
  exportBackupToFile,
  importBackupFromFile,
  startAutoBackup,
  stopAutoBackup
} from '../../utils/backup'
import AdminHeader from '../../components/AdminHeader'
import './BackupManager.css'

const BackupManager = () => {
  const [backups, setBackups] = useState([])
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [restoring, setRestoring] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)

  useEffect(() => {
    loadBackups()
    loadStatus()
    
    // Atualiza status a cada minuto
    const statusInterval = setInterval(loadStatus, 60000)
    
    return () => clearInterval(statusInterval)
  }, [])

  const loadBackups = async () => {
    try {
      const backupList = await getBackups()
      setBackups(backupList)
    } catch (err) {
      console.error('Erro ao carregar backups:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadStatus = async () => {
    try {
      const backupStatus = await getBackupStatus()
      setStatus(backupStatus)
    } catch (err) {
      console.error('Erro ao carregar status:', err)
    }
  }

  const handleCreateBackup = async () => {
    setCreating(true)
    try {
      await createBackup()
      await loadBackups()
      await loadStatus()
      alert('Backup criado com sucesso!')
    } catch (err) {
      alert(`Erro ao criar backup: ${err.message}`)
    } finally {
      setCreating(false)
    }
  }

  const handleRestore = async (backupId) => {
    if (!window.confirm('ATENÇÃO: Restaurar este backup irá substituir TODOS os dados atuais do banco de dados. Esta ação não pode ser desfeita! Deseja continuar?')) {
      return
    }

    if (!window.confirm('Tem CERTEZA? Todos os dados atuais serão perdidos!')) {
      return
    }

    setRestoring(backupId)
    try {
      await restoreBackup(backupId)
      alert('Backup restaurado com sucesso! A página será recarregada.')
      window.location.reload()
    } catch (err) {
      alert(`Erro ao restaurar backup: ${err.message}`)
      setRestoring(null)
    }
  }

  const handleDelete = async (backupId) => {
    if (!window.confirm('Deseja realmente excluir este backup?')) {
      return
    }

    try {
      await deleteBackup(backupId)
      await loadBackups()
      await loadStatus()
      alert('Backup excluído com sucesso!')
    } catch (err) {
      alert(`Erro ao excluir backup: ${err.message}`)
    }
  }

  const handleExport = async (backupId) => {
    try {
      await exportBackupToFile(backupId)
    } catch (err) {
      alert(`Erro ao exportar backup: ${err.message}`)
    }
  }

  const handleImport = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    try {
      await importBackupFromFile(file)
      await loadBackups()
      await loadStatus()
      alert('Backup importado com sucesso!')
      setSelectedFile(null)
      e.target.value = '' // Limpa o input
    } catch (err) {
      alert(`Erro ao importar backup: ${err.message}`)
    }
  }

  const handleToggleAutoBackup = () => {
    if (status?.isRunning) {
      stopAutoBackup()
    } else {
      startAutoBackup()
    }
    setTimeout(loadStatus, 500)
  }

  if (loading) {
    return (
      <div className="backup-manager-page">
        <AdminHeader currentPage="backup" />
        <div className="backup-manager-container">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Carregando backups...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="backup-manager-page">
      <AdminHeader currentPage="backup" />
      <div className="backup-manager-container">
        <div className="backup-manager-header">
          <h1>Gerenciador de Backups</h1>
          <div className="backup-actions">
            <button 
              onClick={handleCreateBackup} 
              className="backup-create-btn"
              disabled={creating}
            >
              {creating ? '⏳ Criando...' : '💾 Criar Backup Agora'}
            </button>
            <label className="backup-import-btn">
              📥 Importar Backup
              <input 
                type="file" 
                accept=".json" 
                onChange={handleImport}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>

        {status && (
          <div className="backup-status">
            <div className="status-card">
              <h3>Status do Sistema</h3>
              <div className="status-info">
                <div className="status-item">
                  <span className="status-label">Backup Automático:</span>
                  <span className={`status-value ${status.isRunning ? 'running' : 'stopped'}`}>
                    {status.isRunning ? '🟢 Ativo' : '🔴 Inativo'}
                  </span>
                  <button 
                    onClick={handleToggleAutoBackup}
                    className="status-toggle-btn"
                  >
                    {status.isRunning ? 'Parar' : 'Iniciar'}
                  </button>
                </div>
                <div className="status-item">
                  <span className="status-label">Último Backup:</span>
                  <span className="status-value">
                    {status.lastBackup ? status.lastBackup.date : 'Nenhum'}
                  </span>
                </div>
                <div className="status-item">
                  <span className="status-label">Próximo Backup:</span>
                  <span className="status-value">
                    {status.nextBackup || 'N/A'}
                  </span>
                </div>
                <div className="status-item">
                  <span className="status-label">Total de Backups:</span>
                  <span className="status-value">{status.totalBackups} / {30}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="backups-list">
          <h2>Backups Disponíveis ({backups.length})</h2>
          {backups.length === 0 ? (
            <div className="backup-empty">
              <p>Nenhum backup encontrado. Crie o primeiro backup agora!</p>
            </div>
          ) : (
            <div className="backups-grid">
              {backups.map(backup => (
                <div key={backup.id} className="backup-card">
                  <div className="backup-card-header">
                    <h3>{backup.date}</h3>
                    {backup.imported && (
                      <span className="backup-imported-badge">Importado</span>
                    )}
                  </div>
                  <div className="backup-card-body">
                    <div className="backup-info">
                      <p><strong>Tamanho:</strong> {backup.sizeFormatted}</p>
                      <p><strong>ID:</strong> {backup.id}</p>
                      <div className="backup-tables">
                        <strong>Tabelas:</strong>
                        <ul>
                          {Object.keys(backup.data).map(table => (
                            <li key={table}>
                              {table}: {backup.data[table]?.length || 0} registros
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="backup-card-actions">
                    <button
                      onClick={() => handleRestore(backup.id)}
                      className="backup-restore-btn"
                      disabled={restoring === backup.id}
                    >
                      {restoring === backup.id ? '⏳ Restaurando...' : '🔄 Restaurar'}
                    </button>
                    <button
                      onClick={() => handleExport(backup.id)}
                      className="backup-export-btn"
                    >
                      📥 Exportar
                    </button>
                    <button
                      onClick={() => handleDelete(backup.id)}
                      className="backup-delete-btn"
                    >
                      🗑️ Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="backup-info-section">
          <h3>ℹ️ Informações</h3>
          <ul>
            <li>O sistema cria backups automaticamente a cada <strong>6 horas</strong></li>
            <li>Os <strong>30 backups mais recentes</strong> são mantidos automaticamente</li>
            <li>Backups antigos são removidos automaticamente</li>
            <li>Você pode criar backups manuais a qualquer momento</li>
            <li>Backups podem ser exportados e importados como arquivos JSON</li>
            <li><strong>Atenção:</strong> Restaurar um backup substitui TODOS os dados atuais</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BackupManager

