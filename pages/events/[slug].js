import Layout from "@/components/Layout";
import { API_URL } from "@/config";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
export default function EventPage({ evt }) {
  const deleteEvent = () => {};
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.attributes.id}`} legacyBehavior>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <Link href="#" onClick={deleteEvent} legacyBehavior>
            <a className={styles.delete}>
              <FaTimes /> Delete Event
            </a>
          </Link>
        </div>
        <span>
          {new Date(evt.attributes.date).toLocaleDateString("en-US")} at{" "}
          {evt.attributes.time}
        </span>
        <h1>{evt.attributes.name}</h1>
        {evt.attributes.image.data.attributes.formats.thumbnail.url && (
          <div className={styles.image}>
            <Image
              src={evt.attributes.image.data.attributes.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.attributes.performers}</p>
        <h3>Description:</h3>
        <p>{evt.attributes.description}</p>
        <h3>Venue: {evt.attributes.venue}</h3>
        <p>{evt.attributes.address}</p>
        <Link href={`/events`} legacyBehavior>
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`);
  var events = await res.json();
  events = events.data;

  const paths = events.map((evt) => ({
    params: { slug: evt.attributes.slug },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(
    `${API_URL}/events?filters[slug][$eq]=${slug}&populate=*`
  );
  var events = await res.json();
  events = events.data;
  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  };
}
