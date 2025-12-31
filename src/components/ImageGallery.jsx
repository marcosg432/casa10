import React from 'react';
import { AspectRatio } from './AspectRatio';
import './ImageGallery.css';

// Lista de imagens de pontos turísticos com informações de localização
const pontosTuristicos = [
  {
    src: '/imagem/pontos-turisticos/Convento da penha.jpg',
    nome: 'Convento da Penha',
    mapsLink: 'https://maps.app.goo.gl/RSbuaUa3LvEJhNvFA?g_st=iw'
  },
  {
    src: '/imagem/pontos-turisticos/Convento_da_Penha_e_Terceira_Ponte_com_Mar_e_Vitória_ao_fundo.jpg',
    nome: 'Convento da Penha e Terceira Ponte',
    mapsLink: 'https://maps.app.goo.gl/RSbuaUa3LvEJhNvFA?g_st=iw'
  },
  {
    src: '/imagem/pontos-turisticos/parque botanico do vale.png',
    nome: 'Parque Botânico do Vale',
    mapsLink: 'https://maps.app.goo.gl/txSafaAZg37RJnzN9?g_st=iw'
  },
  {
    src: '/imagem/pontos-turisticos/parque-da-cidade-na-serra-529815.webp',
    nome: 'Parque da Cidade na Serra',
    mapsLink: 'https://maps.app.goo.gl/ohpe3NtqP55nmewV6?g_st=iw'
  },
  {
    src: '/imagem/pontos-turisticos/pavilhao de carapina.jpg',
    nome: 'Pavilhão de Carapina',
    mapsLink: 'https://maps.app.goo.gl/Zb6e61Pw8CuGjnKK9?g_st=iw'
  },
  {
    src: '/imagem/pontos-turisticos/Pmserra_jacaraipe3-scaled.jpg',
    nome: 'Jacaraípe',
    mapsLink: 'https://maps.app.goo.gl/NhumAh81XZYEMVJE7?g_st=iw'
  },
  {
    src: '/imagem/pontos-turisticos/praia bicanba e carapebus.jpg',
    nome: 'Praia Bicamba e Carapebus',
    mapsLink: 'https://www.google.com/maps/search/Praia+de+Carapebus,+Serra+-+ES'
  },
  {
    src: '/imagem/pontos-turisticos/praia-de-manguinhos.png',
    nome: 'Praia de Manguinhos',
    mapsLink: 'https://maps.app.goo.gl/txSafaAZg37RJnzN9?g_st=iw'
  },
  {
    src: '/imagem/pontos-turisticos/praia-jacaripe.jpg',
    nome: 'Praia de Jacaraípe',
    mapsLink: 'https://maps.app.goo.gl/txSafaAZg37RJnzN9?g_st=iw'
  },
  {
    src: '/imagem/pontos-turisticos/Shopping vitoria.jpg',
    nome: 'Shopping Vitória',
    mapsLink: 'https://maps.app.goo.gl/85W3aJKwpziMZ37d9?g_st=iw'
  },
  {
    src: '/imagem/pontos-turisticos/Shopping-mestre-alvaro.jpg',
    nome: 'Shopping Mestre Álvaro',
    mapsLink: 'https://maps.app.goo.gl/PjxtTsfpdKFcqAqy5?g_st=iw'
  },
  {
    src: '/imagem/pontos-turisticos/praia-camburi-es.webp',
    nome: 'Praia de Camburi',
    mapsLink: 'https://maps.app.goo.gl/5jKQtFDKD4R7kuaG8?g_st=iw'
  },
  {
    src: '/imagem/pontos-turisticos/praia-de-camburi-2.jpg',
    nome: 'Praia de Camburi',
    mapsLink: 'https://maps.app.goo.gl/5jKQtFDKD4R7kuaG8?g_st=iw'
  }
];

export function ImageGallery() {
  // Distribui as imagens em 3 colunas
  const columns = [[], [], []];
  pontosTuristicos.forEach((item, index) => {
    columns[index % 3].push(item);
  });

  return (
    <div className="image-gallery-container">
      <div className="image-gallery-grid">
        {columns.map((columnImages, col) => (
          <div key={col} className="image-gallery-column">
            {columnImages.map((item, index) => {
              // Usa ratio padrão 16:9 para a maioria, mas pode ajustar conforme necessário
              const ratio = 16 / 9;
              return (
                <AnimatedImage
                  key={`${col}-${index}`}
                  alt={item.nome}
                  src={item.src}
                  ratio={ratio}
                  mapsLink={item.mapsLink}
                  nome={item.nome}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function AnimatedImage({ alt, src, ratio, mapsLink, nome }) {
  const handleMapsClick = (e) => {
    e.stopPropagation();
    if (mapsLink) {
      window.open(mapsLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <AspectRatio
      ratio={ratio}
      className="image-gallery-aspect-ratio"
    >
      <img
        alt={alt}
        src={src}
        className="image-gallery-image"
        loading="lazy"
      />
      {/* Nome do ponto turístico - sempre visível */}
      <div className="image-gallery-name-overlay">
        <h3 className="image-gallery-name">{nome}</h3>
      </div>
      
      {/* Botão de localização - aparece no hover */}
      {mapsLink && (
        <div className="image-gallery-overlay">
          <button
            className="image-gallery-maps-button"
            onClick={handleMapsClick}
            aria-label={`Ver localização de ${nome} no Google Maps`}
          >
            Ver localização
          </button>
        </div>
      )}
    </AspectRatio>
  );
}


