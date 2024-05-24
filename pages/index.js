import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
    {
        id: "m1",
        title: "A First Meetup",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Meeting_of_the_British_Association_at_Oxford%2C_1860.jpg/800px-Meeting_of_the_British_Association_at_Oxford%2C_1860.jpg",
        address: "Some address 5, 12345 Some City",
        description: "This is a first meetup!",
    },
    {
        id: "m2",
        title: "A Second Meetup",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Meeting_of_the_British_Association_at_Oxford%2C_1860.jpg/800px-Meeting_of_the_British_Association_at_Oxford%2C_1860.jpg",
        address: "Some address 10, 12345 Some City",
        description: "This is a second meetup!",
    },
];

export default function HomePage() {
    return <MeetupList meetups={DUMMY_MEETUPS} />;
}
