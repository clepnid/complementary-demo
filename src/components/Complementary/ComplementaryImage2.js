import React, { useRef, useEffect, useState } from 'react';
import StackedCanvas from './StackedCanvas';
import ModalComponent from '../ModalComponent';

const ComplementaryImage = ({ imageSrc, isDownloader = false, setImageSrc2 = () => { }, cyclic = false, invert = false, fps = 60, boomerang = false, opacityColor = false, isEditable = false, isHorizontal = true, colors = [], colorsChange = [], colorScheme = 'triadic', animation = 'none', isSimetryAnimation, maxWidthImage = '100px', maxHeightImage = '100px' }) => {
    const canvasRef = useRef(null);
    const outputCanvasRef = useRef(null);
    const outputCanvasRef2 = useRef(null);
    const [refreshStack, setRefreshStack] = useState(false);

    const getOpuestoColor = (r, g, b) => {
        return {
            r: 255 - r,
            g: 255 - g,
            b: 255 - b,
        };
    };

    const getTriadicColor = (r, g, b) => {
        const contrast = (Math.round(r * 299) + Math.round(g * 587) + Math.round(b * 114)) / 1000;
        const valor = contrast >= 128 ? 1 : 0;
        if (valor === 1) {
            return {
                r: g,
                g: b,
                b: r,
            };
        } else if (valor === 0) {
            return {
                r: b,
                g: r,
                b: g,
            };
        }
        return {
            r: 255 - r,
            g: 255 - g,
            b: 255 - b,
        };
    };

    const getComplementaryColor = (r, g, b, scheme) => {
        if (scheme === "triadic") {
            return getTriadicColor(r, g, b);
        } else {
            return getOpuestoColor(r, g, b);
        }
    };

    function hexToRgb(hex) {
        hex = hex.replace(/^#/, '');
        let bigint = parseInt(hex, 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;
        return { r, g, b };
    }

    function estaEntreColores(colores, r, g, b) {
        for (let color of colores) {
            if (
                r >= color.r - 30 && r <= color.r + 30 &&
                g >= color.g - 30 && g <= color.g + 30 &&
                b >= color.b - 30 && b <= color.b + 30
            ) {
                return true;
            }
        }
        return false;
    }

    const setCanvas = () => {
        try {
            const canvas = canvasRef.current;
            const outputCanvas = outputCanvasRef.current;
            const outputCanvas2 = outputCanvasRef2.current;
            const ctx = canvas.getContext('2d');
            const outputCtx = outputCanvas.getContext('2d');
            const outputCtx2 = outputCanvas2.getContext('2d');
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = imageSrc;

            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                outputCanvas.width = img.width;
                outputCanvas.height = img.height;
                outputCanvas2.width = img.width;
                outputCanvas2.height = img.height;

                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                if (colorsChange && colorsChange.length > 0) {
                    // Cambia los colores en el primer canvas
                    for (let i = 0; i < data.length; i += 4) {
                        const r = data[i];
                        const g = data[i + 1];
                        const b = data[i + 2];

                        colorsChange.forEach(({ color1, color2, tolerance }) => {
                            if (color1 && color2 && tolerance) {
                                const { r: r1, g: g1, b: b1 } = hexToRgb(color1);
                                const { r: r2, g: g2, b: b2 } = hexToRgb(color2);

                                // Calcular el rango tolerado
                                const rMin = Math.max(0, r1 - tolerance);
                                const rMax = Math.min(255, r1 + tolerance);
                                const gMin = Math.max(0, g1 - tolerance);
                                const gMax = Math.min(255, g1 + tolerance);
                                const bMin = Math.max(0, b1 - tolerance);
                                const bMax = Math.min(255, b1 + tolerance);

                                // Comprobar si el color actual está dentro del rango tolerado
                                if (r >= rMin && r <= rMax && g >= gMin && g <= gMax && b >= bMin && b <= bMax) {
                                    if (opacityColor) {
                                        data[i] = r2; // Ajuste parcial, se puede modificar el factor
                                        data[i + 1] = g2;
                                        data[i + 2] = b2;
                                    } else {
                                        // Proporción de ajuste en el rango de tolerancia
                                        const rFactor = (r - rMin) / (rMax - rMin);
                                        const gFactor = (g - gMin) / (gMax - gMin);
                                        const bFactor = (b - bMin) / (bMax - bMin);

                                        // Ajustar el color actual hacia el color de destino basado en la proporción
                                        data[i] = r + (r2 - r) * rFactor;
                                        data[i + 1] = g + (g2 - g) * gFactor;
                                        data[i + 2] = b + (b2 - b) * bFactor;
                                    }
                                }
                            }
                        });
                    }

                    ctx.putImageData(imageData, 0, 0);
                }


                if (!colors || colors.length === 0) {
                    for (let i = 0; i < data.length; i += 4) {
                        const { r, g, b } = getComplementaryColor(data[i], data[i + 1], data[i + 2], colorScheme);
                        data[i] = r;
                        data[i + 1] = g;
                        data[i + 2] = b;
                    }
                } else {
                    const colores = colors.map(hexToRgb);
                    const complementaryColor1 = getComplementaryColor(colores[0].r, colores[0].g, colores[0].b, colorScheme);

                    for (let i = 0; i < data.length; i += 4) {
                        const rAux = data[i];
                        const gAux = data[i + 1];
                        const bAux = data[i + 2];
                        if (!estaEntreColores(colores, rAux, gAux, bAux)) {
                            // Si no está, ajustar el color actual hacia el color complementario
                            const { r, g, b } = complementaryColor1;
                            if (opacityColor) {
                                data[i] = r; // Ajuste parcial, se puede modificar el factor
                                data[i + 1] = g;
                                data[i + 2] = b;
                            } else {

                                // Calcular las diferencias de color
                                const rDiff = (r - rAux);
                                const gDiff = (g - gAux);
                                const bDiff = (b - bAux);

                                // Ajustar gradualmente hacia el color complementario
                                data[i] = rAux + rDiff * 0.5; // Ajuste parcial, se puede modificar el factor
                                data[i + 1] = gAux + gDiff * 0.5;
                                data[i + 2] = bAux + bDiff * 0.5;
                            }
                        }
                    }
                }
                outputCtx.putImageData(imageData, 0, 0);

                const imageData2 = outputCtx.getImageData(0, 0, canvas.width, canvas.height);
                const data2 = imageData2.data;

                for (let i = 0; i < data2.length; i += 4) {
                    const { r, g, b } = getComplementaryColor(data2[i], data2[i + 1], data2[i + 2], colorScheme);
                    data2[i] = r;
                    data2[i + 1] = g;
                    data2[i + 2] = b;
                }
                outputCtx2.putImageData(imageData2, 0, 0);
                const dataUrl = canvas.toDataURL(); // Convertir a URL de datos
                setImageSrc2(dataUrl); // Pasar la URL a setImageSrc2
                console.log("refrescar");
                setRefreshStack(!refreshStack);
            };
        } catch (error) {
            return;
        }
    }

    useEffect(() => {
        if (isEditable) {
            setCanvas();
        }
    }, [imageSrc, isHorizontal, invert, boomerang, cyclic, animation, colors, colorsChange, opacityColor, isDownloader, colorScheme]);

    useEffect(() => {
        setCanvas();
    }, []);

    return (
        <div style={{ marginTop: '30px', width: {maxWidthImage}, height: {maxHeightImage} }}>
            <div>
                <h3 style={{ display: 'none' }}>Original Image</h3>
                <canvas style={{ maxWidth: {maxWidthImage}, maxHeight: {maxHeightImage}, display: 'none',  width: {maxWidthImage}, height: {maxHeightImage}, display: 'none' }} ref={canvasRef}></canvas>
            </div>
            <div>
                <h3 style={{ display: 'none' }}>Complementary Colors Image</h3>
                <canvas style={{ maxWidth: {maxWidthImage}, maxHeight: {maxHeightImage},  width: {maxWidthImage}, height: {maxHeightImage}, display: 'none' }} ref={outputCanvasRef}></canvas>
                <canvas style={{ maxWidth: {maxWidthImage}, maxHeight: {maxHeightImage},  width: {maxWidthImage}, height: {maxHeightImage}, display: 'none' }} ref={outputCanvasRef2}></canvas>
            </div>
            {
                isDownloader && <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', width: '100%' }}>
                    <ModalComponent
                        imageSrc={imageSrc}
                        isHorizontal={isHorizontal}
                        colors={colors}
                        colorsChange={colorsChange}
                        colorScheme={colorScheme}
                        opacityColor={opacityColor}
                        invert={invert}
                        fps={fps} // Pasar el valor de fps aquí
                        boomerang={boomerang}
                        cyclic={cyclic}
                        isEditable={false}
                        maxWidthImage={maxWidthImage}
                        maxheightImage={maxHeightImage}
                        animation={animation} // Pasar la animación seleccionada
                    />
                </div>
            }


            <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', width: '100%', marginTop:'80px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignSelf: 'center', maxWidth: '100vw', width: '400px' }}>
                    <h3 style={{ display: 'none' }}>Combined Canvas</h3>
                    <StackedCanvas
                        canvasRef1={colors.length === 0 ? canvasRef : outputCanvasRef}
                        canvasRef2={colors.length === 0 ? outputCanvasRef : outputCanvasRef2}
                        animation={animation}
                        refreshStack={refreshStack}
                        isHorizontal={isHorizontal}
                        opacityColor={opacityColor}
                        ciclo={cyclic}
                        fps={fps}
                        boomerang={boomerang}
                        invert={invert}
                        isDownloader={isDownloader}
                        isSimetryAnimation={isSimetryAnimation}
                        maxWidthImage={maxWidthImage}
                    />
                </div>
            </div>
        </div>
    );
};

export default ComplementaryImage;
