import classes from "./Modal.module.css";

interface ModalProps {
    onClose: () => void;
    image: string;
    title: string;
}

export default function Modal({ onClose, image, title }: ModalProps) {
    return (
        <>
            <div
                className={classes.backdrop}
                onClick={onClose}
                role="presentation"
                tabIndex={-1}></div>
            <div
                className={classes.modal}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title">
                <button
                    className={classes.closeBtn}
                    onClick={onClose}
                    aria-label="Close modal"
                    type="button">
                    &times;
                </button>
                <h2 id={`modal-title-${title}`}>{title}</h2>
                <img src={image} alt={`Large view of ${title}`} />
            </div>
        </>
    );
}
