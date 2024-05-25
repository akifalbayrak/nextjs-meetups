import classes from "./MeetupDetail.module.css";
export default function MeetupDetail(props) {
    return (
        <section className={classes.detail}>
            <img src={props.image} alt={props.title} />
            <h1>{props.title}</h1>
            <address>
                <p>Address: {props.address}</p>
            </address>
            <p>{props.description}</p>
        </section>
    );
}
