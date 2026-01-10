// Utilitário para detectar mobile e otimizar performance
export const isMobile = () => {
  if (typeof window === 'undefined') return false
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth <= 768
}

export const isSlowConnection = () => {
  if (typeof navigator === 'undefined' || !navigator.connection) return false
  
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
  if (!connection) return false
  
  // Verificar se é conexão lenta (2G, 3G lento, save-data ativado)
  return (
    connection.effectiveType === 'slow-2g' ||
    connection.effectiveType === '2g' ||
    connection.saveData === true
  )
}

// Reduzir animações em mobile/conexão lenta
export const shouldReduceMotion = () => {
  if (typeof window === 'undefined') return false
  
  // Preferência do usuário
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return true
  }
  
  // Mobile + conexão lenta
  return isMobile() && isSlowConnection()
}

// Configuração otimizada de animações para mobile
export const getMotionConfig = () => {
  if (shouldReduceMotion() || isMobile()) {
    return {
      transition: { duration: 0.2, ease: 'easeOut' },
      animate: { opacity: 1 },
      initial: { opacity: 0 }
    }
  }
  
  return {
    transition: { type: 'spring', stiffness: 300, damping: 30 },
    animate: { opacity: 1, scale: 1 },
    initial: { opacity: 0, scale: 0.95 }
  }
}

// Preload de imagens críticas apenas em conexões rápidas
export const preloadCriticalImages = (imageUrls) => {
  if (isSlowConnection() || typeof window === 'undefined') return
  
  imageUrls.forEach(url => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = url
    document.head.appendChild(link)
  })
}

