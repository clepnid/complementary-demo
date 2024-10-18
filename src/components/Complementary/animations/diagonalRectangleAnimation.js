import React, { useEffect } from 'react';

const DiagonalBandAnimation = (props) => {
    const combinedCanvas = props.combinedCanvasRef.current;
    const combinedCtx = combinedCanvas?.getContext('2d');
    const canvas1 = props.canvasRef1.current;
    const canvas2 = props.canvasRef2.current;

    const width = canvas1?.width || 500;
    const height = canvas1?.height || 500;

    useEffect(() => {
        if (combinedCtx && canvas1 && canvas2) {
            // Controla el ancho de la banda y el progreso
            const bandWidth = width * props.progress;

            combinedCtx.clearRect(0, 0, width, height); // Limpiar el canvas combinado
            combinedCtx.drawImage(canvas1, 0, 0); // Dibuja el primer canvas
            combinedCtx.save();

            // Crear una banda diagonal
            combinedCtx.beginPath();
            combinedCtx.moveTo(0, 0); // Esquina superior izquierda
            combinedCtx.lineTo(bandWidth, 0); // Esquina superior derecha
            combinedCtx.lineTo(width, height); // Esquina inferior derecha
            combinedCtx.lineTo(width - bandWidth, height); // Esquina inferior izquierda
            combinedCtx.closePath();

            combinedCtx.clip(); // Recortar a la banda
            combinedCtx.drawImage(canvas2, 0, 0); // Dibuja el segundo canvas
            combinedCtx.restore(); // Restaurar el contexto
        }
    }, [combinedCtx, canvas1, canvas2, props.progress, width, height]);

    return (
        <canvas
            ref={props.combinedCanvasRef}
            width={width}
            height={height}
            style={{ position: 'relative', width: '100%', height: '100%' }}
        />
    );
};

export default DiagonalBandAnimation;
