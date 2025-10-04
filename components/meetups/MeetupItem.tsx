import { useRouter } from "next/router";
import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import { useTranslation } from "react-i18next";
import { Meetup } from "../../types/meetup";

function MeetupItem({ id, image, title, address }: Meetup) {
    const router = useRouter();
    const { t } = useTranslation();

    function showDetailsHandler() {
        router.push("/" + id);
    }

    return (
        <li className={classes.item}>
            <Card>
                <article className={classes.article}>
                    <div className={classes.image}>
                        <img
                            src={image}
                            alt={t("meetupItem.imageAlt", { title })}
                        />
                    </div>
                    <div className={classes.content}>
                        <h3>{title}</h3>
                        <address>
                            {address.length > 75
                                ? address.slice(0, 75) + "..."
                                : address}
                        </address>
                    </div>
                    <div className={classes.actions}>
                        <button
                            onClick={showDetailsHandler}
                            aria-label={t("meetupItem.ariaLabel", { title })}>
                            {t("meetupItem.showDetails")}
                        </button>
                    </div>
                </article>
            </Card>
        </li>
    );
}

export default MeetupItem;
