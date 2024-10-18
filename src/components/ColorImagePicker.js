import React from 'react';
import { ImageColorPicker } from 'react-image-color-picker';
import './estilos/ColorPicker.css'; 
import ColorList from './ColorList';

const ColorImagePicker = ({ imageSrc, handleVolver, colors, setColors }) => {

    function rgbStringToHex(rgbString) {
        // Extraemos los números de la cadena RGB
        const rgbValues = rgbString.match(/\d+/g).map(Number);
        const [r, g, b] = rgbValues;

        // Función auxiliar para convertir a hexadecimal
        const toHex = (value) => {
            const hex = value.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        };

        // Convertimos a hexadecimal
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
    }

    const handleColorPick = (color) => {
        const hex = rgbStringToHex(color);
        console.log(colors);
        // Verificamos si el array `colors` ya contiene el color hexadecimal
        if (!colors.includes(hex)) {
            setColors([...colors, hex]);
        }
    };

    return (
        <div className="color-picker-container">
            <button className="volver-btn" onClick={handleVolver}>
                Hecho
            </button>
            <ColorList colors={colors} setColors={setColors} />
            <div className="color-picker">
                <ImageColorPicker
                    onColorPick={handleColorPick}
                    imgSrc={imageSrc}
                    zoom={1}
                />
            </div>
        </div>
    );
};

export default ColorImagePicker;
