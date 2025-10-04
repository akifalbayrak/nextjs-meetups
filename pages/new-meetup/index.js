import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { Fragment } from "react";
import Head from "next/head";

export default function NewMeetupPage() {
    const router = useRouter();

    async function addMeetupHandler(enteredMeetupData) {
        await fetch("/api/new-meetup", {
            method: "POST",
            body: enteredMeetupData,
        });

        router.push("/");
    }

    return (
        <Fragment>
            <Head>
                <title>Add a new Meetup</title>
                <meta name="description" content="Add your own meetups" />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </Fragment>
    );
}
