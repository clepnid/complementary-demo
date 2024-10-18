import React, { useState, useEffect } from 'react';
import './estilos/base.css';
import './estilos/slider.css';
import ComplementaryImage from 'complementaryimage';
import Spinner from './Spinner';

const Slider = ({ handleEditor }) => {
  const colorAux = "#ffff00";
  const colorAux2 = "#CCA9DD";
  const images = [
    { src: `${process.env.PUBLIC_URL}/images/dragon_1.jpg`, alt: 'dragon 1', position: 1, coloresAopuestos: [colorAux], colorsChange: [{ color1: "#A23A3B", color2: colorAux, tolerance: 100 }] },
    { src: `${process.env.PUBLIC_URL}/images/scene.png`, alt: 'dragon 2', position: 2, coloresAopuestos: [colorAux], colorsChange: [{ color1: "#FC7BB8", color2: colorAux, tolerance: 100 }] },
    { src: `${process.env.PUBLIC_URL}/images/psy_girl.jpg`, alt: 'dragon 3', position: 3, coloresAopuestos: [colorAux], colorsChange: [{ color1: "#D1223F", color2: colorAux, tolerance: 100 }] },
    { src: `${process.env.PUBLIC_URL}/images/tiger_tattoo.png`, alt: 'dragon 4', position: 4, coloresAopuestos: [colorAux], colorsChange: [{ color1: "#000000", color2: colorAux, tolerance: 100 }] },
    { src: `${process.env.PUBLIC_URL}/images/poster_hearth.png`, alt: 'dragon 5', position: 5, coloresAopuestos: [colorAux, colorAux2], colorsChange: [{ color1: "#9A9A9A", color2: colorAux2, tolerance: 54 }, { color1: "#1D1D1D", color2: colorAux, tolerance: 27 }] },
    { src: `${process.env.PUBLIC_URL}/images/akira.png`, alt: 'dragon 6', position: 6, coloresAopuestos: [colorAux], colorsChange: [{ color1: "#010101", color2: colorAux, tolerance: 200 }] },
    { src: `${process.env.PUBLIC_URL}/images/casino.jpg`, alt: 'dragon 7', position: 7, coloresAopuestos: [colorAux], colorsChange: [{ color1: "#15150D", color2: colorAux, tolerance: 122 }] },
    { src: `${process.env.PUBLIC_URL}/images/face.png`, alt: 'dragon 8', position: 8, coloresAopuestos: [colorAux], colorsChange: [{ color1: "#FFFFFF", color2: colorAux, tolerance: 100 }] },
    { src: `${process.env.PUBLIC_URL}/images/harry_potter.jpg`, alt: 'dragon 9', position: 9, coloresAopuestos: [colorAux], colorsChange: [{ color1: "#14191C", color2: colorAux, tolerance: 190 }] },
    { src: `${process.env.PUBLIC_URL}/images/japo_circle.png`, alt: 'dragon 10', position: 10, coloresAopuestos: [colorAux], colorsChange: [{ color1: "#000001", color2: colorAux, tolerance: 100 }] },
  ];

  const [currentPosition, setCurrentPosition] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0); // Contador de imágenes cargadas

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPosition((prevPosition) => {
        const newPosition = (prevPosition + 1) % images.length;
        console.log('Posición actual:', newPosition + 1); // Imprimir posición en consola
        return newPosition;
      });
    }, 4000); // Cada 4 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  // Manejar la carga de las imágenes
  const handleImageLoad = () => {
    setLoadedCount((prevCount) => {
      const newCount = prevCount + 1;
      console.log(`Imágenes cargadas: ${newCount}`);
      if (newCount === images.length) {
        console.log('Todas las imágenes han sido cargadas');
        setIsLoading(false);
      }
      return newCount;
    });
  };

  return (
    <div className="banner">
      <button className="editor-button" onClick={handleEditor}>
        !Pruebalo!
      </button>
      {
        isLoading && <Spinner isLoading={isLoading} />
      }
      <div className="slider" style={{ '--quantity': images.length }}>
        {images.map((image, index) => (
          <div
            className={`item ${index === currentPosition ? 'active' : ''}`}
            key={image.position}
            style={{ display: isLoading ? 'none' : 'block', '--position': image.position }}
          >
            <ComplementaryImage
              imageSrc={image.src}
              maxWidthImage={100}
              maxheightImage={100}
              animation="none"
              colors={image.coloresAopuestos}
              colorsChange={image.colorsChange}
              fps={5}
              onloadImage={handleImageLoad}
            />
          </div>
        ))}
      </div>
      <div className="content">
        <h1 data-content="SYMETRY">SYMETRY</h1>
        <div className="author">
          <h2>SYMETRY</h2>
          <strong>Web</strong>
          <p className="description">Visual Component</p>
        </div>
        <div className="model"></div>
      </div>
    </div>
  );

};

export default Slider;
