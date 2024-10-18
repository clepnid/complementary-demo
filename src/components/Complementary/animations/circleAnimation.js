import React from "react";

const drawStatic = (combinedCtx, canvas1, canvas2, isHorizontal) => {
    combinedCtx.clearRect(0, 0, canvas1.width, canvas1.height);
    if (isHorizontal) {
        combinedCtx.drawImage(canvas1, 0, 0, canvas1.width / 2, canvas1.height, 0, 0, canvas1.width / 2, canvas1.height);
        combinedCtx.drawImage(canvas2, canvas2.width / 2, 0, canvas2.width / 2, canvas2.height, canvas1.width / 2, 0, canvas2.width / 2, canvas2.height);
    } else {
        combinedCtx.drawImage(canvas1, 0, 0, canvas1.width, canvas1.height / 2, 0, 0, canvas1.width, canvas1.height / 2);
        combinedCtx.drawImage(canvas2, 0, canvas2.height / 2, canvas2.width, canvas2.height / 2, 0, canvas1.height / 2, canvas2.width, canvas2.height / 2);
    }
};

const circleAnimation = (props) => {
    const combinedCanvas = props.combinedCanvasRef.current;
    const combinedCtx = combinedCanvas?.getContext('2d');
    const canvas1 = props.canvasRef1.current;
    const canvas2 = props.canvasRef2.current;

    const maxRadius = Math.sqrt(Math.pow(canvas1.width / 2, 2) + Math.pow(canvas1.height / 2, 2));
    const radius = maxRadius * props.progress;

    const centerX = canvas1.width / 2;
    const centerY = canvas1.height / 2;

    if (combinedCtx) {
        if (props.isSimetryAnimation) {
            drawStatic(combinedCtx, canvas1, canvas2, props.isHorizontal);
            // Guarda el estado actual del contexto
            combinedCtx.save();
            // Comienza la lógica del recorte circular
            combinedCtx.beginPath();
            combinedCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            combinedCtx.clip();
            // Dibuja la segunda imagen en el contexto recortado
            combinedCtx.drawImage(canvas2, 0, 0);
            // Restaura el estado del contexto
            combinedCtx.restore();
        } else {
            combinedCtx.drawImage(canvas1, 0, 0);
            combinedCtx.save();
            combinedCtx.beginPath();
            combinedCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            combinedCtx.clip();
            combinedCtx.drawImage(canvas2, 0, 0);
            combinedCtx.restore();
        }
    }

    return (
        <canvas
            ref={props.combinedCanvasRef}
            width={props.canvasRef1?.current?.width || 500}
            height={props.canvasRef1?.current?.height || 500}
            style={{ position: 'relative', width: '100%', height: '100%' }}
        />
    );
};

export default circleAnimation;
