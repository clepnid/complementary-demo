import React from 'react';
import './estilos/ColorPicker.css';

const ColorList = ({ handleVolver, colors, setColors }) => {

  const removeColor = (colorToRemove) => {
    setColors(colors.filter(color => color !== colorToRemove));
  };

  return (
    <div>
      {colors.map((color, index) => (
        <div key={index} style={styles.colorItem}>
          <div style={{ ...styles.colorBox, backgroundColor: color }}></div>
          <span style={styles.colorHex}>{color}</span>
          <button style={styles.deleteButton} onClick={() => removeColor(color)}>
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

const styles = {
  colorItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
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
  deleteButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    padding: '5px',
    cursor: 'pointer',
  },
};

export default ColorList;
