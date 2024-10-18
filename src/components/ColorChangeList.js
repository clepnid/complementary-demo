import React, { useState } from 'react';
import ColorPicker from './ColorPicker';

const ColorChangeList = ({ colors, setColors, isPickerOpen, setIsPickerOpen }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [tolerance, setTolerance] = useState(100); // Estado para la tolerancia

  const removeColor = (colorToRemove) => {
    setColors(colors.filter(item => item.color1 !== colorToRemove.color1));
  };

  const setColor2 = (item, color) => {
    console.log(colors);
    const colorAux = colors.map(element =>
      element.color1 === item.color1 ? { ...element, color2: color, tolerance: tolerance } : element
    );
    setColors(colorAux);
  };

  const handleOpenPicker = (item) => {
    setActiveItem(item);
    setSelectedColor(item.color2 || '#000');
    setTolerance(item.tolerance || 100); // Establecer la tolerancia del color seleccionado
    setIsPickerOpen(true);
  };

  const handleChangeComplete = (color) => {
    setSelectedColor(color.hex);
  };

  const handleAccept = () => {
    if (activeItem) {
      setColor2(activeItem, selectedColor);
    }
    setIsPickerOpen(false);
  };

  const handleCancel = () => {
    setIsPickerOpen(false);
  };

  return (
    <div>
      {colors.map((item, index) => (
        <div key={index} style={styles.colorItem}>
          <div style={{ ...styles.colorBox, backgroundColor: item.color1 }}></div>
          <span style={styles.colorHex}>{item.color1}</span>
          <span style={styles.colorHex}>{"Cambiar a"}</span>
          {item.color2 && (
            <>
              <div style={{ ...styles.colorBox, backgroundColor: item.color2 }}></div>
              <span style={styles.colorHex}>{item.color2}</span>
            </>
          )}
          <button style={styles.elegir} onClick={() => handleOpenPicker(item)}>
            Elegir Color
          </button>
          <span style={styles.toleranceLabel}>Tolerancia:</span>
          <input 
            type="range" 
            min="1" 
            max="255" 
            value={item.tolerance || 100} 
            onChange={(e) => {
              const newTolerance = Number(e.target.value);
              setTolerance(newTolerance);
              setColors(colors.map(element =>
                element.color1 === item.color1 ? { ...element, tolerance: newTolerance } : element
              ));
            }}
            style={styles.slider}
          />
          <span style={styles.toleranceValue}>{item.tolerance || 100}</span>
          <button style={styles.deleteButton} onClick={() => removeColor(item)}>
            &times;
          </button>
        </div>
      ))}

      {isPickerOpen && (
        <ColorPicker
          color={selectedColor}
          handleChangeComplete={handleChangeComplete}
          handleAccept={handleAccept}
          handleCancel={handleCancel}
        />
      )}
    </div>
  );
};

const styles = {
  colorItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    justifyContent: 'space-between', // Espacia los elementos
    flexWrap: 'wrap', // Permitir que los elementos se envuelvan
  },
  colorBox: {
    width: '30px',
    height: '30px',
    borderRadius: '5px',
    marginRight: '10px',
  },
  colorHex: {
    marginRight: '10px',
    fontFamily: 'monospace',
  },
  elegir: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    padding: '5px 10px',
    cursor: 'pointer',
    marginRight: '10px'
  },
  deleteButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    padding: '5px',
    cursor: 'pointer',
    marginLeft: '10px', // Espacio a la izquierda del botón de cerrar
    marginBottom: '10px', // Agrega margen para evitar superposición en wrap
  },
  toleranceLabel: {
    marginRight: '10px',
    marginBottom: '10px', // Agrega margen para evitar superposición en wrap
  },
  slider: {
    marginLeft: '10px',
    marginBottom: '10px', // Agrega margen para evitar superposición en wrap
  },
  toleranceValue: {
    marginLeft: '10px',
    fontFamily: 'monospace',
    marginBottom: '10px', // Agrega margen para evitar superposición en wrap
  },
};

export default ColorChangeList;
