import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../utils/storage'

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    let checkCount = 0
    const maxChecks = 5
    
    const checkAuth = async () => {
      if (!mounted) return
      
      try {
        // Aguarda progressivamente mais tempo a cada tentativa
        await new Promise(resolve => setTimeout(resolve, 200 + (checkCount * 100)))
        const authenticated = await isAuthenticated()
        
        if (mounted) {
          setIsAuth(authenticated)
          setLoading(false)
          
          // Se não autenticado e ainda não excedeu tentativas, tenta novamente
          if (!authenticated && checkCount < maxChecks) {
            checkCount++
            setTimeout(checkAuth, 300)
          }
        }
      } catch (error) {
        // Log apenas em desenvolvimento
        if (process.env.NODE_ENV === 'development') {
          console.error('Erro ao verificar autenticação:', error.message)
        }
        if (mounted && checkCount >= maxChecks) {
          setIsAuth(false)
          setLoading(false)
        } else if (mounted) {
          checkCount++
          setTimeout(checkAuth, 300)
        }
      }
    }
    
    checkAuth()
    
    return () => {
      mounted = false
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



