import React from 'react';
import { ImageColorPicker } from 'react-image-color-picker';
import './estilos/ColorPicker.css'; 
import ColorChangeList from './ColorChangeList';

const ColorImagePickerChange = ({ imageSrc, handleVolver, colors, setColors, isPickerOpen, setIsPickerOpen }) => {

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
        
        const colorExists = colors.some(item => item.color1 === hex);

        if (!colorExists) {
            setColors([...colors, { color1: hex, color2: null }]);
        }
    };

    return (
        <div className="color-picker-container">
            <button className="volver-btn" onClick={handleVolver}>
                Hecho
            </button>
            <ColorChangeList colors={colors} setColors={setColors} isPickerOpen={isPickerOpen} setIsPickerOpen={setIsPickerOpen} />
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

export default ColorImagePickerChange;
