const slidingRectangleAnimation = (props) => {
    const combinedCanvas = props.combinedCanvasRef.current;
    const combinedCtx = combinedCanvas?.getContext('2d');
    const canvas1 = props.canvasRef1.current;
    const canvas2 = props.canvasRef2.current;

    const slideWidth = canvas1.width * props.progress;

    if (combinedCtx) {
        combinedCtx.drawImage(canvas1, 0, 0);
        combinedCtx.save();
        combinedCtx.beginPath();
        combinedCtx.rect(0, 0, slideWidth, canvas1.height);
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

export default slidingRectangleAnimation;
