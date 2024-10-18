const squareAnimation = (props) => {
    const combinedCanvas = props.combinedCanvasRef.current;
    const combinedCtx = combinedCanvas?.getContext('2d');
    const canvas1 = props.canvasRef1.current;
    const canvas2 = props.canvasRef2.current;

    const maxSize = Math.max(canvas1.width, canvas1.height);
    const size = maxSize * props.progress;

    const centerX = canvas1.width / 2;
    const centerY = canvas1.height / 2;

    if (combinedCtx) {
        combinedCtx.drawImage(canvas1, 0, 0);
        combinedCtx.save();
        combinedCtx.beginPath();
        combinedCtx.rect(centerX - size / 2, centerY - size / 2, size, size);
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

export default squareAnimation;
