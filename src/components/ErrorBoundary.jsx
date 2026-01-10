import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary capturou erro:', error, errorInfo)
    // Em produção, você pode enviar isso para um serviço de log
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '50px 20px', 
          textAlign: 'center', 
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h1 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
            Erro ao carregar a página
          </h1>
          <p style={{ marginBottom: '30px', color: '#666' }}>
            Por favor, recarregue a página
          </p>
          <button 
            onClick={() => window.location.reload()} 
            style={{ 
              padding: '12px 30px', 
              marginTop: '20px', 
              cursor: 'pointer',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px'
            }}
          >
            Recarregar
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

