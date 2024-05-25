import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
    {
        id: "m1",
        title: "A First Meetup",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/91/SamuelTaylorColeridge.jpg",
        address: "Some address 5, 12345 Some City",
        description: "This is a first meetup!",
    },
    {
        id: "m2",
        title: "A Second Meetup",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Plains-wanderer_female_8173.jpg",
        address: "Some address 10, 12345 Some City",
        description: "This is a second meetup!",
    },
];

export default function HomePage(props) {
    return <MeetupList meetups={props.meetups} />;
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
    return {
        props: {
            meetups: DUMMY_MEETUPS,
        },
        revalidate: 10,
    };
}
