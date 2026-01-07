import { useState, useEffect } from 'react'
import './HeroCarousel.css'

const HeroCarousel = ({ images, autoplayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  // Navegação automática
  useEffect(() => {
    if (images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, autoplayInterval)

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

  return (
    <div 
      className="hero-carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="hero-carousel-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`hero-carousel-slide ${
              index === currentIndex ? 'active' : ''
            } ${index < currentIndex ? 'prev' : 'next'}`}
            style={{
              backgroundImage: `url(${image})`,
            }}
            role="img"
            aria-label={`Slide ${index + 1} do carrossel`}
          />
        ))}
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

