import * as React from "react";

export const MAX_FPS = 60;

export const withAnimation = (options) => {
    return (Component) => {
        return class Animation extends React.Component {
            constructor(props) {
                super(props);
                this.state = props;
                this.frameCount = 0;
                this.frameId = 0;
            }

            render() {
                return <Component {...this.state} />;
            }

            componentDidMount() {
                this.update();
            }

            componentWillUnmount() {
                if (this.frameId) {
                    window.cancelAnimationFrame(this.frameId);
                }
            }

            update = () => {
                this.frameCount++;
                const shouldStopAnimation = options.update(this.state).progress >= 1.0 && !this.state.isCyclic;

                if (this.frameCount >= Math.round(MAX_FPS / this.props.frameRate)) {
                    // Call the update function and set the new state
                    const newState = options.update(this.state);
                    this.setState(newState);
                    this.frameCount = 0;

                    // Stop the animation if it should stop
                    if (shouldStopAnimation) {
                        window.cancelAnimationFrame(this.frameId);
                        return; // Exit the update function
                    }
                }

                // Request the next animation frame
                this.frameId = window.requestAnimationFrame(this.update);
            };
        };
    };
};
