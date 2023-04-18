import Layout from "@/components/Layout";
import { API_URL } from "@/config";
import EventItem from "@/components/EventItem";
import Link from "next/link";

export default function Home({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      {events.length > 0 && (
        <Link href="/events" legacyBehavior>
          <a className="btn-secondary">View All</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=3&populate=*`
  );
  var events = await res.json();
  events = events.data;

  return {
    props: { events },
    revalidate: 1,
  };
}
