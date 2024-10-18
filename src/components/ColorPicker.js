import React from 'react';
import { PhotoshopPicker } from 'react-color';

class ColorPicker extends React.Component {
    render() {
        const { handleChangeComplete, handleAccept, handleCancel, color } = this.props;
        var colorAux = color;
        const handleChange = (color, event) => {
            colorAux = color.hex;
        }
        return (
            <div style={styles.modal}>
                <div style={styles.modalContent}>
                    <PhotoshopPicker
                        color={colorAux}
                        onChange={handleChange}
                        onChangeComplete={handleChangeComplete}
                        onAccept={handleAccept}
                        onCancel={handleCancel}
                        styles={{maxWidth: '80vw'}}
                    />
                </div>
            </div>
        );
    }
}

const styles = {
    modal: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        zIndex: 1000,
        borderRadius: '5px',
    },
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
    },
};

export default ColorPicker;
