import Layout from "@/components/Layout";
import { API_URL, PER_PAGE } from "@/config";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";

export default function Home({ events, page, total }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;
  // Fetch events
  const eventRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&pagination[limit]=${PER_PAGE}&pagination[start]=${start}&populate=*`
  );
  var events = await eventRes.json();
  var total = events.meta.pagination.total;

  events = events.data;

  return {
    props: { events, page: +page, total },
  };
}
