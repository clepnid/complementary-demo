const spiralAnimation = (props) => {
    const combinedCanvas = props.combinedCanvasRef.current;
    const combinedCtx = combinedCanvas?.getContext('2d');
    const canvas1 = props.canvasRef1.current;
    const canvas2 = props.canvasRef2.current;

    const centerX = canvas1.width / 2;
    const centerY = canvas1.height / 2;
    const maxRadius = Math.min(canvas1.width, canvas1.height) / 2;

    // Controla la cantidad de vueltas y el progreso de la espiral
    const numTurns = 5;  // Número de vueltas de la espiral
    const maxAngle = Math.PI * 2 * numTurns;
    const angle = maxAngle * props.progress;  // Progreso de la espiral
    const radius = maxRadius * props.progress;  // Radio de la espiral progresiva

    if (combinedCtx) {
        combinedCtx.drawImage(canvas1, 0, 0);
        combinedCtx.save();

        combinedCtx.beginPath();
        // Crear la espiral
        for (let a = 0; a <= angle; a += 0.05) {
            const r = radius * (a / maxAngle);
            const x = centerX + r * Math.cos(a);
            const y = centerY + r * Math.sin(a);
            if (a === 0) {
                combinedCtx.moveTo(x, y);
            } else {
                combinedCtx.lineTo(x, y);
            }
        }

        combinedCtx.clip();
        combinedCtx.drawImage(canvas2, 0, 0);
        combinedCtx.restore();
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

export default spiralAnimation;
