import { MongoClient, ObjectId } from "mongodb";
import MeetupDetails from "../../components/meetups/MeetupDetail";
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
            <MeetupDetails
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
        const client = await MongoClient.connect(
            "mongodb+srv://akif:Xa5f9stib7d72D1E@cluster0.pizeaf2.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
        );

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
    };
}

export async function getStaticPaths() {
    let meetups = [];

    try {
        const client = await MongoClient.connect(
            "mongodb+srv://akif:Xa5f9stib7d72D1E@cluster0.pizeaf2.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
        );

        const db = client.db();
        const meetupsCollection = db.collection("meetups");

        meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

        client.close();
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
