import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.css";
import { useState, useEffect } from "react";

export default function EventItem({ evt }) {
  const useFormattedDate = (date) => {
    const [formattedDate, setFormattedDate] = useState(null);

    useEffect(
      () => setFormattedDate(new Date(date).toLocaleDateString("en-US")),
      []
    );

    return formattedDate;
  };
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            evt.attributes.image.data?.attributes.formats.thumbnail.url
              ? evt.attributes.image.data.attributes.formats.thumbnail.url
              : "/images/event-default.png"
          }
          width={170}
          height={100}
        />
      </div>
      <div className={styles.info}>
        <span>
          {useFormattedDate(evt.attributes.date)} at {evt.attributes.time}
        </span>
        <h3>{evt.attributes.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${evt.attributes.slug}`} legacyBehavior>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  );
}
