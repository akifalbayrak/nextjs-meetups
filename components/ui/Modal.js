import classes from "./Modal.module.css";

export default function Modal({ onClose, image, title }) {
  return (
    <>
      <div className={classes.backdrop} onClick={onClose}></div>
      <div className={classes.modal}>
        <h2>{title}</h2>
        <button className={classes.closeBtn} onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        <img src={image} alt={`Large view of ${title}`} />
      </div>
    </>
  );
}
