import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../utils/storage'

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    
    const checkAuth = async () => {
      try {
        console.log('🔵 ProtectedRoute: Verificando autenticação...')
        // Aguarda um pouco para garantir que o banco está pronto
        await new Promise(resolve => setTimeout(resolve, 200))
        const authenticated = await isAuthenticated()
        console.log('🔵 ProtectedRoute: Autenticado?', authenticated)
        if (mounted) {
          setIsAuth(authenticated)
          setLoading(false)
        }
      } catch (error) {
        console.error('🔴 ProtectedRoute: Erro ao verificar autenticação:', error)
        if (mounted) {
          setIsAuth(false)
          setLoading(false)
        }
      }
    }
    
    checkAuth()
    
    // Re-verifica após um tempo maior (para casos de redirecionamento após login)
    const timeout = setTimeout(async () => {
      if (!mounted) return
      try {
        const authenticated = await isAuthenticated()
        console.log('🔵 ProtectedRoute: Re-verificação após 1s - Autenticado?', authenticated)
        if (mounted) {
          setIsAuth(authenticated)
        }
      } catch (error) {
        console.error('Erro ao re-verificar autenticação:', error)
      }
    }, 1000)
    
    return () => {
      mounted = false
      clearTimeout(timeout)
    }
  }, [])

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{ 
          width: '50px', 
          height: '50px', 
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #1F6FB2',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <p>Verificando autenticação...</p>
      </div>
    )
  }

  if (!isAuth) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default ProtectedRoute



