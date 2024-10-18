import React, { useRef, useEffect } from 'react';
import Animation from './Animation';

const StackedCanvas = ({ maxWidthImage, canvasRef1, isDownloader = false, canvasRef2, animation = "none", isHorizontal = true, refreshStack = 0, ciclo = false, boomerang = false, invert = false, fps = 60, isSimetryAnimation }) => {
    const combinedCanvasRef = useRef(null);

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

    useEffect(() => {
        const combinedCanvas = combinedCanvasRef.current;
        const combinedCtx = combinedCanvas?.getContext('2d');
        const canvas1 = canvasRef1.current;
        const canvas2 = canvasRef2.current;

        if (animation === "none") {
            drawStatic(combinedCtx, canvas1, canvas2, isHorizontal);
        }

    }, [canvasRef1, canvasRef2, refreshStack, animation, invert, boomerang, isHorizontal, ciclo]);

    const downloadImage = () => {
        const combinedCanvas = combinedCanvasRef.current;
        const link = document.createElement('a');
        link.href = combinedCanvas.toDataURL('image/png');
        link.download = 'combined-canvas.png';
        link.click();
    };

    return (
        <>
            {animation === "none" &&
                <>
                    <canvas
                        ref={combinedCanvasRef}
                        width={canvasRef1?.current?.width || 100}
                        height={canvasRef1?.current?.height || 100}
                        style={{ position: 'relative', maxWidth: maxWidthImage, width: '100%', height: '100%', 
                            objectFit: 'cover' }}
                    />
                    {
                        isDownloader &&
                        <button className='btn-descargar' onClick={downloadImage} style={{ marginTop: '10px', alignSelf: 'center' }}>Download Image</button>
                    }
                </>
            }
            {animation !== "none" &&
                <Animation
                    canvasRef1={canvasRef1}
                    canvasRef2={canvasRef2}
                    isCyclic={ciclo}
                    animation={animation}
                    boomerang={boomerang}
                    invert={invert}
                    isHorizontal={isHorizontal}
                    isSimetryAnimation={isSimetryAnimation}
                    fps={fps}
                />
            }
        </>
    );
};

export default StackedCanvas;
