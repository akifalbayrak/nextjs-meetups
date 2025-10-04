import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { Fragment } from "react";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { Meetup } from "../../types/meetup";

type MeetupDetailsPageProps = {
    meetupData: Meetup;
};

export default function MeetupDetailsPage({
    meetupData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
    const { t } = useTranslation();
    if (!meetupData) {
        return <p>{t("loading")}</p>;
    }

    return (
        <Fragment>
            <Head>
                <title>{meetupData.title}</title>
                <meta name="description" content={meetupData.description} />
            </Head>
            <MeetupDetail
                id={meetupData.id}
                image={meetupData.image}
                title={meetupData.title}
                address={meetupData.address}
                description={meetupData.description}
            />
        </Fragment>
    );
}

export const getStaticProps: GetStaticProps<MeetupDetailsPageProps> = async (
    context
) => {
    const meetupId = context.params?.meetupId;

    if (typeof meetupId !== "string") {
        return { notFound: true };
    }

    let selectedMeetup = null;

    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI not set");
        }

        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();
        const meetupsCollection = db.collection("meetups");

        selectedMeetup = await meetupsCollection.findOne({
            _id: new ObjectId(meetupId),
        });

        client.close();
    } catch (error) {
        console.error("Error connecting to MongoDB or fetching data:", error);
    }

    if (!selectedMeetup) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
            },
        },
        revalidate: 60,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    let meetups: { _id: ObjectId }[] = [];

    try {
        if (process.env.MONGODB_URI) {
            const client = await MongoClient.connect(process.env.MONGODB_URI);
            const db = client.db();
            const meetupsCollection = db.collection("meetups");

            meetups = await meetupsCollection
                .find({}, { projection: { _id: 1 } })
                .toArray();

            client.close();
        } else {
            console.error("MONGODB_URI not set");
        }
    } catch (error) {
        console.error("Error connecting to MongoDB or fetching data:", error);
    }

    return {
        fallback: true,
        paths: meetups.map((meetup) => ({
            params: { meetupId: meetup._id.toString() },
        })),
    };
};
