import { useState, useEffect } from 'react'
import db from '../../utils/db'
import AdminHeader from '../../components/AdminHeader'
import './DatabaseViewer.css'

const DatabaseViewer = () => {
  const [tables, setTables] = useState({})
  const [selectedTable, setSelectedTable] = useState('reservas')
  const [loading, setLoading] = useState(true)

  const tableNames = ['reservas', 'quartos', 'despesas', 'funcionarios', 'usuarios', 'carrinho', 'configuracoes']

  useEffect(() => {
    loadAllTables()
  }, [])

  const loadAllTables = async () => {
    setLoading(true)
    try {
      const data = {}
      for (const tableName of tableNames) {
        try {
          const table = db[tableName]
          if (table) {
            data[tableName] = await table.toArray()
          }
        } catch (err) {
          console.error(`Erro ao carregar ${tableName}:`, err)
          data[tableName] = []
        }
      }
      setTables(data)
    } catch (err) {
      console.error('Erro ao carregar dados:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    loadAllTables()
  }

  const handleClearTable = async (tableName) => {
    if (!window.confirm(`Tem certeza que deseja limpar a tabela "${tableName}"? Esta ação não pode ser desfeita!`)) {
      return
    }
    
    try {
      await db[tableName].clear()
      await loadAllTables()
      alert(`Tabela "${tableName}" limpa com sucesso!`)
    } catch (err) {
      alert(`Erro ao limpar tabela: ${err.message}`)
    }
  }

  const formatValue = (value) => {
    if (value === null || value === undefined) {
      return <span style={{ color: '#999', fontStyle: 'italic' }}>null</span>
    }
    if (typeof value === 'object') {
      return <pre style={{ margin: 0, fontSize: '12px' }}>{JSON.stringify(value, null, 2)}</pre>
    }
    if (typeof value === 'boolean') {
      return <span style={{ color: value ? '#0a0' : '#a00' }}>{value.toString()}</span>
    }
    return String(value)
  }

  const getTableStats = (tableName) => {
    const data = tables[tableName] || []
    return {
      count: data.length,
      size: JSON.stringify(data).length
    }
  }

  if (loading) {
    return (
      <div className="database-viewer-page">
        <AdminHeader currentPage="database" />
        <div className="database-viewer-container">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Carregando dados do banco...</p>
          </div>
        </div>
      </div>
    )
  }

  const currentData = tables[selectedTable] || []
  const stats = getTableStats(selectedTable)

  return (
    <div className="database-viewer-page">
      <AdminHeader currentPage="database" />
      <div className="database-viewer-container">
        <div className="database-viewer-header">
          <h1>Visualizador de Banco de Dados</h1>
          <button onClick={handleRefresh} className="database-refresh-btn">
            🔄 Atualizar
          </button>
        </div>

        <div className="database-stats">
          {tableNames.map(tableName => {
            const tableStats = getTableStats(tableName)
            return (
              <div 
                key={tableName} 
                className={`database-stat-card ${selectedTable === tableName ? 'active' : ''}`}
                onClick={() => setSelectedTable(tableName)}
              >
                <h3>{tableName}</h3>
                <p className="stat-count">{tableStats.count} registros</p>
                <p className="stat-size">{(tableStats.size / 1024).toFixed(2)} KB</p>
              </div>
            )
          })}
        </div>

        <div className="database-content">
          <div className="database-table-header">
            <h2>Tabela: {selectedTable}</h2>
            <div className="database-actions">
              <span className="database-info">
                {stats.count} registro(s) • {(stats.size / 1024).toFixed(2)} KB
              </span>
              <button 
                onClick={() => handleClearTable(selectedTable)}
                className="database-clear-btn"
                style={{ marginLeft: '10px' }}
              >
                🗑️ Limpar Tabela
              </button>
            </div>
          </div>

          {currentData.length === 0 ? (
            <div className="database-empty">
              <p>Tabela vazia</p>
            </div>
          ) : (
            <div className="database-table-wrapper">
              <table className="database-table">
                <thead>
                  <tr>
                    {Object.keys(currentData[0] || {}).map(key => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((row, index) => (
                    <tr key={index}>
                      {Object.keys(row).map(key => (
                        <td key={key} className="database-cell">
                          {formatValue(row[key])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="database-export">
          <h3>Exportar Dados</h3>
          <button 
            onClick={() => {
              const dataStr = JSON.stringify(tables[selectedTable], null, 2)
              const dataBlob = new Blob([dataStr], { type: 'application/json' })
              const url = URL.createObjectURL(dataBlob)
              const link = document.createElement('a')
              link.href = url
              link.download = `${selectedTable}_${new Date().toISOString().split('T')[0]}.json`
              link.click()
            }}
            className="database-export-btn"
          >
            📥 Exportar {selectedTable} como JSON
          </button>
        </div>
      </div>
    </div>
  )
}

export default DatabaseViewer

