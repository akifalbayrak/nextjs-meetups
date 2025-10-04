import { useState } from "react";
import Modal from "../ui/Modal";
import classes from "./MeetupDetail.module.css";
import { Meetup } from "../../types/meetup";
import { useTranslation } from "react-i18next";

export default function MeetupDetail({
    image,
    title,
    address,
    description,
}: Meetup) {
    const [modalOpen, setModalOpen] = useState(false);
    const { t } = useTranslation();

    function openModalHandler() {
        setModalOpen(true);
    }

    function closeModalHandler() {
        setModalOpen(false);
    }

    return (
        <section className={classes.detail} aria-label="Meetup details">
            <img
                src={image}
                alt={`Image of ${title}`}
                onClick={openModalHandler}
                style={{ cursor: "pointer" }}
            />
            <h1>{t("meetupDetail.title")} {title}</h1>
            <address>
                <p>{t("meetupDetail.addressLabel")} {address}</p>
            </address>
            <p>{t("meetupDetail.descriptionLabel")} {description}</p>

            {modalOpen && (
                <Modal
                    image={image}
                    title={title}
                    onClose={closeModalHandler}
                />
            )}
        </section>
    );
}
