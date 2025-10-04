import { useState } from "react";
import Modal from "../ui/Modal";
import classes from "./MeetupDetail.module.css";

export default function MeetupDetail(props) {
  const [modalOpen, setModalOpen] = useState(false);

  function openModalHandler() {
    setModalOpen(true);
  }

  function closeModalHandler() {
    setModalOpen(false);
  }

  return (
    <section className={classes.detail} aria-label="Meetup details">
      <img
        src={props.image}
        alt={`Image of ${props.title}`}
        onClick={openModalHandler}
        style={{ cursor: "pointer" }}
      />
      <h1>{props.title}</h1>
      <address>
        <p>{props.address}</p>
      </address>
      <p>{props.description}</p>

      {modalOpen && (
        <Modal
          image={props.image}
          title={props.title}
          onClose={closeModalHandler}
        />
      )}
    </section>
  );
}
