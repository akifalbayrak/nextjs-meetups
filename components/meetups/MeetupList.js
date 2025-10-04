import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';
import { useTranslation } from 'react-i18next';

function MeetupList({ meetups }) {
  const { t } = useTranslation();

  if (!meetups || meetups.length === 0) {
    return (
      <p className={classes.noMeetups}>
        {t('meetupList.noMeetups')}
      </p>
    );
  }

  return (
    <ul className={classes.list}>
      {meetups.map(({ id, image, title, address }) => (
        <MeetupItem
          key={id}
          id={id}
          image={image}
          title={title}
          address={address}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
