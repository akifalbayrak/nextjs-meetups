import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { Fragment } from "react";
import Head from "next/head";

export default function MeetupDetailsPage(props) {
    if (!props.meetupData) {
        return <p>Loading...</p>;
    }

    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta
                    name="description"
                    content={props.meetupData.description}
                />
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </Fragment>
    );
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
    let selectedMeetup = null;

    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI not set');
        }

        const client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();
        const meetupsCollection = db.collection("meetups");

        selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });

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
    };
}

export async function getStaticPaths() {
    let meetups = [];

    try {
        if (process.env.MONGODB_URI) {
            const client = await MongoClient.connect(process.env.MONGODB_URI);
            const db = client.db();
            const meetupsCollection = db.collection("meetups");

            meetups = await meetupsCollection.find({}, { projection: { _id: 1 } }).toArray();

            client.close();
        } else {
            console.error('MONGODB_URI not set');
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
}
