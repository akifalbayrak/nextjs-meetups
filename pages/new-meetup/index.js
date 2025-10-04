import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { Fragment } from "react";
import Head from "next/head";
import { useTranslation } from "react-i18next";

export default function NewMeetupPage() {
    const router = useRouter();
    const { t } = useTranslation();

    async function addMeetupHandler(enteredMeetupData) {
        const response = await fetch("/api/new-meetup", {
            method: "POST",
            body: enteredMeetupData,
        });

        if (response.ok) {
            router.push("/");
        }
    }

    return (
        <Fragment>
            <Head>
                <title>{t("newMeetupForm.title")}</title>
                <meta name="description" content={t("newMeetupForm.description")} />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </Fragment>
    );
}
