import React from 'react';
import { AspectRatio } from './AspectRatio';
import './ImageGallery.css';

// Lista de imagens de pontos turísticos com informações de localização
// Organizada por: Cultura/Religião > Parques > Serviços Essenciais > Comércio > Praias
const pontosTuristicos = [
  // Pontos Turísticos Culturais e Religiosos
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
  // Parques e Áreas Verdes
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
  // Serviços Essenciais
  {
    src: '/imagem/pontos-turisticos/Aeroporto-de-Vitoria.jpg',
    nome: 'Aeroporto de Vitória Eurico de Aguiar Salles',
    mapsLink: 'https://www.google.com/maps/place/Aeroporto+de+Vit%C3%B3ria+Eurico+de+Aguiar+Salles/@-20.2616366,-40.2858986,17z/data=!3m1!4b1!4m6!3m5!1s0xb81842f9876a0d:0xb60191750aaaa62a!8m2!3d-20.2616417!4d-40.2833237!16s%2Fm%2F03mc25c?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    src: '/imagem/pontos-turisticos/Vitoria-Apart-Hospital.jpg',
    nome: 'Vitória Apart Hospital',
    mapsLink: 'https://www.google.com/maps/place/Vit%C3%B3ria+Apart+Hospital+-+Boa+Vista+II,+Serra+-+ES/@-20.2370057,-40.2788676,18z/data=!3m1!4b1!4m6!3m5!1s0xb818e562b65c45:0x6ac4a48c843f75ca!8m2!3d-20.236929!4d-40.2785432!16s%2Fg%2F11bw3h5xl2?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D'
  },
  // Shoppings e Comércio
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
  // Empresas e Complexos
  {
    src: '/imagem/pontos-turisticos/vale-complexo-do-tubarao.jpg',
    nome: 'Vale - Complexo de Tubarão',
    mapsLink: 'https://www.google.com/maps/dir/-20.300369,-40.294827/Vale+-+Complexo+de+Tubar%C3%A3o+-+Av.+Dante+Michelini,+5500+-+Jardim+Camburi,+Vit%C3%B3ria+-+ES,+29090-860/@-20.2834472,-40.321871,13z/data=!3m1!4b1!4m10!4m9!1m1!4e1!1m5!1m1!1s0xb81837b30f9ba7:0xd7b1b837d9350ad8!2m2!1d-40.2572037!2d-20.2647139!3e0?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    src: '/imagem/pontos-turisticos/cst-norte.jpg',
    nome: 'CST Portaria Norte',
    mapsLink: 'https://www.google.com/maps/place/CST+Portaria+Norte/@-20.2165737,-40.2373809,17z/data=!3m1!4b1!4m6!3m5!1s0xb81eae16f7beaf:0xc1f88b41534a81d6!8m2!3d-20.2165737!4d-40.2373809!16s%2Fg%2F11byhj2_5y?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D'
  },
  // Praias e Áreas de Lazer
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


