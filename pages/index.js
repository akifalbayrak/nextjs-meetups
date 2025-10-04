import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

export default function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>Meetups</title>
                <meta
                    name="description"
                    content="Browse a huge list of highly active meetups"
                />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    );
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS,
//         },
//     };
// }

export async function getStaticProps() {
    if (!process.env.MONGODB_URI) {
        console.error('MONGODB_URI not set');
        return { props: { meetups: [] }, revalidate: 10 };
    }

    let client;
    let meetups = [];
    try {
        client = await MongoClient.connect(process.env.MONGODB_URI);
        const db = client.db();

        const meetupsCollection = db.collection("meetups");

        meetups = await meetupsCollection.find().toArray();
    } catch (error) {
        console.error('Error fetching meetups:', error);
    } finally {
        if (client) client.close();
    }

    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            })),
        },
        revalidate: 10,
    };
}
