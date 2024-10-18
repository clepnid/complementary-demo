import React from 'react';
import './estilos/spinner.css';

const Spinner = ({ isLoading }) => {
  return (
    <div
      className="spinner"
      style={{
        display: isLoading ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo semitransparente
        zIndex: 1000 // Asegúrate de que esté encima de otros elementos
      }}
    >
      <div className="spinner-message">Cargando...</div>
    </div>
  );
};

export default Spinner;
