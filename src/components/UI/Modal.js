import classes from "./Modal.module.css";

const Backdrop = ({ onClose }) => {
    return <div onClick={onClose} className={classes.backdrop} />;
};

const ModalOverlay = ({ children }) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{children}</div>
        </div>
    );
};

const Modal = ({ children, onClose }) => {
    return (
        <>
            <Backdrop onClose={onClose} />
            <ModalOverlay>{children}</ModalOverlay>
        </>
    );
};

export default Modal;
