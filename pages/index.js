import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { useTranslation } from "react-i18next";

export default function HomePage({ meetups }) {
    const { t } = useTranslation();
    return (
        <>
            <Head>
                <title>{t("homePage.title")}</title>
                <meta name="description" content={t("homePage.description")} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <MeetupList meetups={meetups} />
        </>
    );
}

export async function getStaticProps() {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        console.error("MONGODB_URI environment variable is not set!");
        return { props: { meetups: [] }, revalidate: 10 };
    }

    let client;

    try {
        client = await MongoClient.connect(uri);
        const db = client.db();
        const meetupsCollection = db.collection("meetups");

        const meetupsData = await meetupsCollection.find().toArray();

        const meetups = meetupsData.map((meetup) => ({
            id: meetup._id.toString(),
            title: meetup.title,
            address: meetup.address,
            image: meetup.image,
        }));

        return { props: { meetups }, revalidate: 10 };
    } catch (error) {
        console.error("Failed to fetch meetups:", error);
        return { props: { meetups: [] }, revalidate: 10 };
    } finally {
        if (client) await client.close();
    }
}
