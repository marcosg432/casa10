import { useState, useEffect } from 'react'
import { isMobile } from '../utils/mobileOptimization'
import './HeroCarousel.css'

const HeroCarousel = ({ images, autoplayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  // Navegação automática (habilitado também no mobile com velocidade maior)
  useEffect(() => {
    if (images.length <= 1) return
    
    // Intervalo mais rápido no mobile
    const intervalTime = isMobile() ? Math.max(2000, autoplayInterval * 0.8) : autoplayInterval

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, intervalTime)

    return () => clearInterval(interval)
  }, [images.length, autoplayInterval])

  // Navegação manual - anterior
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Navegação manual - próximo
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  // Touch handlers para mobile (swipe)
  const handleTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      goToNext()
    }
    if (isRightSwipe) {
      goToPrevious()
    }
  }

  if (!images || images.length === 0) {
    return null
  }

  // Pré-carrega apenas a imagem atual e próximas 2 (otimização de performance)
  // Em mobile, carrega apenas a atual e próxima para economizar banda
  const getVisibleImages = () => {
    const visible = []
    const maxDistance = isMobile() ? 1 : 2 // Menos imagens em mobile
    
    for (let i = 0; i < images.length; i++) {
      const distance = Math.min(
        Math.abs(i - currentIndex),
        Math.abs(i - currentIndex + images.length),
        Math.abs(i - currentIndex - images.length)
      )
      // Carrega apenas current, prev, next (e próximas 2 em desktop)
      if (distance <= maxDistance) {
        visible.push(i)
      }
    }
    return visible
  }

  const visibleIndices = getVisibleImages()

  // Pré-carrega a próxima imagem
  useEffect(() => {
    if (images.length > 1) {
      const nextIndex = (currentIndex + 1) % images.length
      const img = new Image()
      img.src = images[nextIndex]
    }
  }, [currentIndex, images])

  return (
    <div 
      className="hero-carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="hero-carousel-container">
        {images.map((image, index) => {
          const isVisible = visibleIndices.includes(index)
          const isActive = index === currentIndex
          
          return (
          <div
            key={index}
            className={`hero-carousel-slide ${
                isActive ? 'active' : ''
            } ${index < currentIndex ? 'prev' : 'next'}`}
            style={{
                backgroundImage: isVisible ? `url(${image})` : 'none',
                display: isVisible ? 'block' : 'none'
            }}
            role="img"
            aria-label={`Slide ${index + 1} do carrossel`}
          />
          )
        })}
      </div>

      {/* Setas de navegação */}
      {images.length > 1 && (
        <>
          <button
            className="hero-carousel-arrow hero-carousel-arrow-left"
            onClick={goToPrevious}
            aria-label="Imagem anterior"
          >
            ‹
          </button>
          <button
            className="hero-carousel-arrow hero-carousel-arrow-right"
            onClick={goToNext}
            aria-label="Próxima imagem"
          >
            ›
          </button>
        </>
      )}
    </div>
  )
}

export default HeroCarousel

