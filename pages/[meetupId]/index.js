import MeetupDetails from "../../components/meetups/MeetupDetail";

export default function MeetupDetailsPage(props) {
    return (
        <MeetupDetails
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
    );
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    return {
        props: {
            meetupData: {
                image: "https://upload.wikimedia.org/wikipedia/commons/9/91/SamuelTaylorColeridge.jpg",
                id: meetupId,
                title: "A First Meetup",
                address: "123, Some Street, Some City, Some Country",
                description:
                    "This is a first meetup. It is a very important meetup. It is a very important meetup because it is the first one.",
            },
        },
    };
}
export async function getStaticPaths() {
    return {
        fallback: false,
        paths: [
            {
                params: {
                    meetupId: "m1",
                },
            },
            {
                params: {
                    meetupId: "m2",
                },
            },
        ],
    };
}
