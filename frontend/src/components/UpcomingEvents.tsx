import React, { Dispatch, SetStateAction } from 'react';

import styles from 'src/styles/UpcomingEvents.module.scss';
import Card from 'src/components/Card';
import eventData, { eventDetails } from 'src/data/eventData';
import {
  getDateUnix,
  sortEndDateDecreasing,
  sortStartDateDecreasing
} from 'src/helpers/eventHelpers';
import moment from 'moment';

const checkIndex = (sortedEventData: Array<eventDetails>, index: number): number => {
  const length = sortedEventData.length;
  const modNum = index % length;
  if (modNum < 0) return modNum + length;
  return modNum;
};

/**
 *
 * @param eventIndex integer
 * @returns array of 3 eventData
 */
const figureOutWhatEventsToShow = (sortedEventData: Array<eventDetails>, eventIndex: number) => {
  sortedEventData.sort(sortStartDateDecreasing);
  sortedEventData.sort(sortEndDateDecreasing);

  if (sortedEventData.length === 1) {
    return [sortedEventData[checkIndex(sortedEventData, eventIndex)]];
  } else if (sortedEventData.length === 2) {
    return [
      sortedEventData[checkIndex(sortedEventData, eventIndex)],
      sortedEventData[checkIndex(sortedEventData, eventIndex + 1)]
    ];
  } else {
    return [
      sortedEventData[checkIndex(sortedEventData, eventIndex)],
      sortedEventData[checkIndex(sortedEventData, eventIndex + 1)],
      sortedEventData[checkIndex(sortedEventData, eventIndex + 2)]
    ];
  }
};

export type UpComingEventProps = {
  eventIndex: number;
  setEventIndex: Dispatch<SetStateAction<number>>;
};

const UpcomingEvents = ({ eventIndex, setEventIndex }: UpComingEventProps): JSX.Element => {
  const sortedEventData = eventData.filter((x) => getDateUnix(x.endDate) - moment().valueOf() >= 0);

  return (
    <section className={styles.newEventsContainer}>
      <h1 className={styles.newEventsTitle}>Upcoming Events</h1>
      <div className={styles.events}>
        {sortedEventData.length > 3 && (
          <img
            src='/images/leftArrow.svg'
            className={styles.arrows}
            aria-label='back arrow'
            alt='back arrow'
            onClick={() => setEventIndex(eventIndex - 1)}
          />
        )}
        {figureOutWhatEventsToShow(sortedEventData, eventIndex).map((x, index) => (
          <Card key={index} {...x} />
        ))}
        {sortedEventData.length > 3 && (
          <img
            src='/images/rightArrow.svg'
            className={styles.arrows}
            aria-label='forward arrow'
            alt='forward arrow'
            onClick={() => setEventIndex(eventIndex + 1)}
          />
        )}
      </div>
    </section>
  );
};

export default UpcomingEvents;
