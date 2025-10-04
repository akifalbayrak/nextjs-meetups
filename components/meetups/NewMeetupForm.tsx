import { useRef, useState, FormEvent, ChangeEvent } from "react";
import Card from "../ui/Card";
import Modal from "../ui/Modal";
import classes from "./NewMeetupForm.module.css";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Meetup } from "../../types/meetup";

type NewMeetupFormProps = {
  onAddMeetup: (data: Meetup) => void;
};

function NewMeetupForm({ onAddMeetup }: NewMeetupFormProps) {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const [selectedFileName, setSelectedFileName] = useState<string>(t("newMeetupForm.noFileChosen"));
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  async function fileChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || !event.target.files.length) return;

    const file = event.target.files[0];
    setSelectedFileName(file.name);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setImageUrl(data.imageUrl);
        toast.success(t("toasts.imageUploadSuccess"));
      } else {
        toast.error(data.message || t("toasts.imageUploadFail"));
      }
    } catch (error) {
      toast.error(t("toasts.imageUploadError"));
    } finally {
      setUploading(false);
    }
  }

  function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!imageUrl) {
      toast.error(t("toasts.waitForUpload"));
      return;
    }

    const meetupData: Meetup = {
      title: titleInputRef.current!.value,
      address: addressInputRef.current!.value,
      description: descriptionInputRef.current!.value,
      image: imageUrl,
    };

    onAddMeetup(meetupData);
    toast.success(t("toasts.meetupAdded"));
  }

  return (
    <>
      <Card>
        <form className={classes.form} onSubmit={submitHandler}>
          <h2 className={classes.title}>{t("newMeetupForm.title")}</h2>

          <div className={classes.control}>
            <label htmlFor="title">{t("newMeetupForm.labels.meetupTitle")}</label>
            <input type="text" id="title" required ref={titleInputRef} />
          </div>

          <div className={classes.control}>
            <label htmlFor="image">{t("newMeetupForm.labels.meetupImage")}</label>
            <div className={classes.fileInputWrapper}>
              <input
                type="file"
                id="image"
                accept="image/png, image/jpeg"
                ref={imageInputRef}
                onChange={fileChangeHandler}
                style={{ display: "none" }}
              />
              <button
                type="button"
                className={classes.fileButton}
                onClick={() => imageInputRef.current?.click()}
              >
                {t("newMeetupForm.labels.chooseFile")}
              </button>
              <span className={classes.fileName}>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={t("newMeetupForm.uploadedPreviewAlt")}
                    className={classes.inlinePreview}
                    style={{ cursor: "pointer" }}
                    onClick={openModal}
                  />
                ) : (
                  selectedFileName
                )}
              </span>
            </div>
          </div>

          <div className={classes.control}>
            <label htmlFor="address">{t("newMeetupForm.labels.address")}</label>
            <input type="text" id="address" required ref={addressInputRef} />
          </div>

          <div className={classes.control}>
            <label htmlFor="description">{t("newMeetupForm.labels.description")}</label>
            <textarea id="description" rows={5} required ref={descriptionInputRef}></textarea>
          </div>

          <div className={classes.actions}>
            <button type="submit" disabled={uploading}>
              {uploading
                ? t("newMeetupForm.buttons.uploading")
                : t("newMeetupForm.buttons.addMeetup")}
            </button>
          </div>
        </form>
      </Card>

      {modalOpen && (
        <Modal
          onClose={closeModal}
          image={imageUrl !}
          title={selectedFileName || t("newMeetupForm.labels.meetupImage")}
        />
      )}
    </>
  );
}

export default NewMeetupForm;
