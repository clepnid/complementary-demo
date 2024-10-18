import './estilos/Editor.css';
import Complementary from 'complementaryimage';
import React, { useState } from 'react';
import ColorImagePicker from './ColorImagePicker';
import ColorImagePickerChange from './ColorImagePickerChange';

function Editor() {
  const [pantalla, setPantalla] = useState(1);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageSrc2, setImageSrc2] = useState(null);
  const [opacityColor, setOpacityColor] = useState(false);
  const [invert, setInvert] = useState(false);
  const [cyclic, setCyclic] = useState(false);
  const [fps, setFps] = useState(60); // Estado para los fps
  const [boomerang, setBoomerang] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [colors, setColors] = useState([]);
  const [colorsChange, setColorsChange] = useState([]);
  const [orientation, setOrientation] = useState('horizontal');
  const [colorScheme, setColorScheme] = useState('triadic');
  const [animation, setAnimation] = useState('none'); // Estado de animación

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageSrc(reader.result);
      setColors([]);
      setColorsChange([]);
      reader.readAsDataURL(file);
    }
  };

  const handlePagina1 = () => {
    setPantalla(1);
  };

  const handlePagina2 = () => {
    setPantalla(2);
  };

  const handlePagina3 = () => {
    setPantalla(3);
  };

  return (
    <>
      <div className={`Editor ${pantalla === 1 ? 'show' : 'hide'}`}>
        <label className="image-upload-label">
          Seleccionar imagen:
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            className="image-upload-input"
          />
        </label>

        <label className="orientation-label">
          Orientación:
          <select
            value={orientation}
            onChange={(e) => setOrientation(e.target.value)}
            className="orientation-select"
          >
            <option value="horizontal">Horizontal</option>
            <option value="vertical">Vertical</option>
          </select>
        </label>

        <label className="color-scheme-label">
          Esquema de colores:
          <select
            value={colorScheme}
            onChange={(e) => setColorScheme(e.target.value)}
            className="color-scheme-select"
          >
            <option value="triadic">Triádico</option>
            <option value="complementary">Opuesto</option>
          </select>
        </label>

        <label className="animation-label">
          Animación:
          <select
            value={animation}
            onChange={(e) => setAnimation(e.target.value)}
            className="animation-select"
          >
            <option value="none">Ninguna</option>
            <option value="circle">Círculo</option>
            <option value="rectangle">Slide</option>
            <option value="square">Cuadrado</option>
            <option value="blinds">Persiana</option>
            <option value="randomPoligon">Polígonos Aleatorios</option>
            <option value="spiral">Spiral</option>
            <option value="diagonal">Diagonal</option>
          </select>
        </label>

        <label className="fps-label">
          FPS (1-60):
          <input
            type="number"
            value={fps}
            onChange={(e) => setFps(Math.max(1, Math.min(60, e.target.value)))} // Limita el valor entre 1 y 60
            min="1"
            max="60"
            className="fps-input"
          />
        </label>

        <label className="cyclic-label">
          Cíclico:
          <input
            type="checkbox"
            checked={cyclic}
            onChange={(e) => setCyclic(e.target.checked)}
            className="cyclic-input"
          />
        </label>

        <label className="invert-label">
          Invertir:
          <input
            type="checkbox"
            checked={invert}
            onChange={(e) => setInvert(e.target.checked)}
            className="invert-input"
          />
        </label>

        <label className="boomerang-label">
          Boomerang:
          <input
            type="checkbox"
            checked={boomerang}
            onChange={(e) => setBoomerang(e.target.checked)}
            className="boomerang-input"
          />
        </label>

        <label className="opacity-label">
          Opacidad de color:
          <input
            type="checkbox"
            checked={opacityColor}
            onChange={(e) => setOpacityColor(e.target.checked)}
            className="opacity-input"
          />
        </label>

        <div className="button-container">
          <button onClick={handlePagina2} className="select-colors-button">Seleccionar Colores Origen</button>
          <button onClick={handlePagina3} className="change-colors-button">Cambiar Colores</button>
        </div>

        <Complementary
          setImageSrc2={setImageSrc2}
          imageSrc={imageSrc}
          isHorizontal={orientation === 'horizontal'}
          colors={colors}
          colorsChange={colorsChange}
          colorScheme={colorScheme}
          opacityColor={opacityColor}
          invert={invert}
          fps={fps} // Pasar el valor de fps aquí
          boomerang={boomerang}
          cyclic={cyclic}
          isEditable={true}
          maxWidthImage={'100%'}
          maxheightImage={'100%'}
          animation={animation} // Pasar la animación seleccionada
          isDownloader={true}
        />
      </div>

      {pantalla === 2 && (
        <ColorImagePicker
          handleVolver={handlePagina1}
          imageSrc={imageSrc2}
          colors={colors}
          setColors={setColors}
        />
      )}
      {pantalla === 3 && (
        <ColorImagePickerChange
          handleVolver={handlePagina1}
          imageSrc={imageSrc}
          colors={colorsChange}
          setColors={setColorsChange}
          isPickerOpen={isPickerOpen}
          setIsPickerOpen={setIsPickerOpen}
        />
      )}
    </>
  );
}

export default Editor;
