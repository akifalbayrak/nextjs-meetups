import MeetupDetails from "../../components/meetups/MeetupDetail";

export default function MeetupDetailsPage() {
    return (
        <MeetupDetails
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Meeting_of_the_British_Association_at_Oxford%2C_1860.jpg/800px-Meeting_of_the_British_Association_at_Oxford%2C_1860.jpg"
            title="A First Meetup"
            address="123, Some Street, Some City, Some Country"
            description="This is a first meetup. It is a very important meetup. It is a very important meetup because it is the first one."
        />
    );
}
