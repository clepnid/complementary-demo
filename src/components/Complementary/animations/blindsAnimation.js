const blindsAnimation = (props) => {
    const combinedCanvas = props.combinedCanvasRef.current;
    const combinedCtx = combinedCanvas?.getContext('2d');
    const canvas1 = props.canvasRef1.current;
    const canvas2 = props.canvasRef2.current;

    const numBlinds = 10;  // Número de divisiones o "persianas"
    const blindHeight = canvas1.height / numBlinds;  // Altura de cada persiana
    const progressHeight = canvas1.height * props.progress;  // Altura abierta en función del progreso

    if (combinedCtx) {
        combinedCtx.drawImage(canvas1, 0, 0);
        combinedCtx.save();

        combinedCtx.beginPath();
        // Dibujar cada persiana progresivamente
        for (let i = 0; i < numBlinds; i++) {
            const y = i * blindHeight;
            const height = blindHeight * props.progress;

            combinedCtx.rect(0, y, canvas1.width, height);
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

export default blindsAnimation;
