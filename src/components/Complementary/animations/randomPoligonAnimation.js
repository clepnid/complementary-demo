const randomPolygonAnimation = (props) => {
    const combinedCanvas = props.combinedCanvasRef.current;
    const combinedCtx = combinedCanvas?.getContext('2d');
    const canvas1 = props.canvasRef1.current;
    const canvas2 = props.canvasRef2.current;

    const numPolygons = 6;  // Número de polígonos/puntos de expansión
    const points = [];  // Almacenar puntos aleatorios de expansión
    const maxRadius = Math.max(canvas1.width, canvas1.height);  // Radio máximo para cubrir la pantalla

    // Generar puntos aleatorios solo una vez
    if (points.length === 0) {
        for (let i = 0; i < numPolygons; i++) {
            points.push({
                x: Math.random() * canvas1.width,
                y: Math.random() * canvas1.height,
                initialRadius: Math.random() * 50,  // Radio inicial aleatorio para cada polígono
            });
        }
    }

    if (combinedCtx) {
        combinedCtx.drawImage(canvas1, 0, 0);
        combinedCtx.save();

        // Dibujar y expandir cada polígono
        points.forEach((point) => {
            const radius = point.initialRadius + (maxRadius - point.initialRadius) * props.progress;
            combinedCtx.beginPath();
            combinedCtx.moveTo(point.x + radius, point.y);

            // Crear un polígono alrededor del punto
            for (let i = 0; i <= 6; i++) {
                const angle = (i * Math.PI * 2) / 6;
                const x = point.x + radius * Math.cos(angle);
                const y = point.y + radius * Math.sin(angle);
                combinedCtx.lineTo(x, y);
            }

            combinedCtx.clip();
        });

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

export default randomPolygonAnimation;
