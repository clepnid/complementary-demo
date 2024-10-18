const SPEED = 5;
let boomerangAux = true;

const animationOptions = {
    update: (props) => {
        let newProgress = props.progress;

        if (props.boomerang) {
            if (!boomerangAux) {
                if (!props.invert) {
                    newProgress = newProgress - 0.1 / (props.frameRate / SPEED);
                    if (newProgress <= 0.01) {
                        if (!props.isCyclic) {
                            newProgress = 0.0;
                            if (props.onAnimationFinish) props.onAnimationFinish();
                        } else {
                            newProgress = 0.01;
                            boomerangAux = true;
                        }
                    }
                } else {
                    newProgress = newProgress + 0.1 / (props.frameRate / SPEED);
                    if (newProgress >= 0.99) {
                        if (!props.isCyclic) {
                            newProgress = 1.0;
                            if (props.onAnimationFinish) props.onAnimationFinish();
                        } else {
                            newProgress = 0.99;
                            boomerangAux = true;
                        }
                    }
                }
            } else {
                if (!props.invert) {
                    newProgress = newProgress + 0.1 / (props.frameRate / SPEED);
                    if (newProgress >= 0.99) {
                        newProgress = 0.99;
                        boomerangAux = false;
                    }
                } else {
                    newProgress = newProgress - 0.1 / (props.frameRate / SPEED);
                    if (newProgress <= 0.01) {
                        newProgress = 0.01;
                        boomerangAux = false;
                    }
                }
            }
        } else {
            if (!props.invert) {
                newProgress = newProgress + 0.1 / (props.frameRate / SPEED);

                if (!props.isCyclic && newProgress >= 1.0) {
                    newProgress = 1.0;
                    if (props.onAnimationFinish) props.onAnimationFinish();
                } else if (props.isCyclic && newProgress >= 1.0) {
                    newProgress = 0.0;
                }
            } else {
                newProgress = newProgress - 0.1 / (props.frameRate / SPEED);

                if (!props.isCyclic && newProgress <= 0.0) {
                    newProgress = 0.0;
                    if (props.onAnimationFinish) props.onAnimationFinish();
                } else if (props.isCyclic && newProgress <= 0.0) {
                    newProgress = 1.0;
                }
            }
        }

        return {
            ...props,
            progress: newProgress,
            animationFinished: (newProgress === 1.0 && !props.isCyclic) || (newProgress === 0.0 && !props.isCyclic),
        };
    },
};

export default animationOptions;
