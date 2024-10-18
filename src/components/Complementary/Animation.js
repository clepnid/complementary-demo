import React, { useEffect, useState, useRef } from "react";
import { withAnimation } from "./reactFrameRate";
import animationOptions from "./animationOption";
import circleAnimation from "./animations/circleAnimation";
import squareAnimation from "./animations/squareAnimation";
import slidingRectangleAnimation from "./animations/slidingRectangleAnimation";
import blindsAnimation from "./animations/blindsAnimation";
import spiralAnimation from "./animations/spiralAnimation";
import randomPolygonAnimation from "./animations/randomPoligonAnimation";
import diagonalRectangleAnimation from "./animations/diagonalRectangleAnimation";

const Animation = ({ canvasRef1, canvasRef2, isCyclic, boomerang, invert, isHorizontal = true, isSimetryAnimation = false, animation, fps }) => {
    const [WithAnimation, setWithAnimation] = useState(null);
    const combinedCanvasRef = useRef(null);
    let initialProgress = invert ? 1 : 0;

    useEffect(() => {
        if (animation === 'none') {
            setWithAnimation(null);
        }
        if (animation === 'circle') {
            const animationComponent = withAnimation(animationOptions)(circleAnimation);
            setWithAnimation(() => animationComponent);
        }
        if (animation === 'square') {
            const animationComponent = withAnimation(animationOptions)(squareAnimation);
            setWithAnimation(() => animationComponent);
        }
        if (animation === 'rectangle') {
            const animationComponent = withAnimation(animationOptions)(slidingRectangleAnimation);
            setWithAnimation(() => animationComponent);
        }
        if (animation === 'blinds') {
            const animationComponent = withAnimation(animationOptions)(blindsAnimation);
            setWithAnimation(() => animationComponent);
        }
        if (animation === 'spiral') {
            const animationComponent = withAnimation(animationOptions)(spiralAnimation);
            setWithAnimation(() => animationComponent);
        }
        if (animation === 'randomPoligon') {
            const animationComponent = withAnimation(animationOptions)(randomPolygonAnimation);
            setWithAnimation(() => animationComponent);
        }
        if (animation === 'diagonal') {
            const animationComponent = withAnimation(animationOptions)(diagonalRectangleAnimation);
            setWithAnimation(() => animationComponent);
        }
    }, [animation]);

    const handleAnimationFinish = (frameRate) => {
        console.log(`Animation finished for frame rate: ${frameRate}, Cyclic: ${isCyclic}`);
    };

    return (
        <>
            {WithAnimation && (
                <WithAnimation
                    combinedCanvasRef={combinedCanvasRef}
                    canvasRef1={canvasRef1}
                    canvasRef2={canvasRef2}
                    progress={initialProgress}
                    frameRate={fps}
                    isCyclic={isCyclic}
                    isHorizontal={isHorizontal}
                    isSimetryAnimation={isSimetryAnimation}
                    invert={invert}
                    boomerang={boomerang}
                    onAnimationFinish={() => handleAnimationFinish(60)}
                />
            )}
        </>
    );
};

export default Animation;
