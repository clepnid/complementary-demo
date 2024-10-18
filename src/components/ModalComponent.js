import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

const CustomModal = ({ children, open, onClose }) => {
    if (!open) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                {children}
                <button style={styles.closeButton} onClick={onClose}>
                    Cerrar
                </button>
            </div>
        </div>
    );
};

const CustomButton = ({ style = styles.button, children, onClick }) => {
    return (
        <button style={style} onClick={onClick}>
            {children}
        </button>
    );
};

const CustomTitle = ({ children }) => {
    return <h2 style={styles.title}>{children}</h2>;
};

const CustomText = ({ children }) => {
    return <p style={styles.text}>{children}</p>;
};

const ModalComponent = ({
    imageSrc,
    cyclic = false,
    invert = false,
    fps = 60,
    boomerang = false,
    opacityColor = false,
    isEditable = false,
    isHorizontal = true,
    colors = [],
    colorsChange = [],
    colorScheme = "triadic",
    animation = "none",
    isSimetryAnimation,
    maxWidthImage = 100,
    maxHeightImage = 100,
}) => {
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const contentToCopy = `
import ComplementaryImage from 'complementaryimage';

.
.
.

<ComplementaryImage
    imageSrc={'${imageSrc}'}
    isHorizontal={${isHorizontal}}
    colors={${JSON.stringify(colors)}}
    colorsChange={${JSON.stringify(colorsChange)}}
    colorScheme={'${colorScheme}'}
    opacityColor={${opacityColor}}
    invert={${invert}}
    fps={${fps}} 
    boomerang={${boomerang}}
    cyclic={${cyclic}}
    isEditable={${animation !== 'none'}}
    maxWidthImage={'${maxWidthImage}'}
    maxheightImage={'${maxHeightImage}'}
    animation={'${animation}'} 
/>`;

    const highlightedCode = contentToCopy;
    const installCode = 'npm i a';

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100vw" }}>
            <CustomButton onClick={handleOpen}>Ver código</CustomButton>
            <CustomModal open={open} onClose={handleClose}>
                <CustomText>
                    <SyntaxHighlighter language="html" style={darcula}>
                        {installCode}
                    </SyntaxHighlighter>
                </CustomText>
                <CustomTitle>Code</CustomTitle>
                <CustomText>
                    <SyntaxHighlighter language="html" style={darcula}>
                        {highlightedCode}

                    </SyntaxHighlighter>
                </CustomText>
                <CopyToClipboard text={contentToCopy} onCopy={() => setCopied(true)}>
                    <CustomButton style={{ ...styles.button, marginRight: '10px' }}>
                        Copy to Clipboard
                    </CustomButton>
                </CopyToClipboard>
                {copied && <CustomText style={styles.successMessage}>Copied!</CustomText>}
            </CustomModal>
        </div>
    );
};

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    modal: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "500px",
        width: "100%",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    button: {
        padding: "10px 20px",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    closeButton: {
        marginTop: "10px",
        padding: "10px",
        backgroundColor: "#DC3545",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    title: {
        margin: "0 0 10px",
        fontSize: "20px",
        fontWeight: "bold",
    },
    text: {
        fontSize: "16px",
    },
    successMessage: {
        color: "green",
        marginTop: "10px",
    },
};

export default ModalComponent;
