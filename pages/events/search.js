import Layout from "@/components/Layout";
import { API_URL } from "@/config";
import EventItem from "@/components/EventItem";
import QueryString from "qs";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SearchPage({ events }) {
  const router = useRouter();
  return (
    <Layout title="Search Results">
      <Link href="/events">{"< "}Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = QueryString.stringify({
    filters: {
      $or: [
        { name: { $contains: term } },
        { performers: { $contains: term } },
        { description: { $contains: term } },
        { venue: { $contains: term } },
      ],
    },
  });
  const res = await fetch(`${API_URL}/events?${query}&populate=*`);
  var events = await res.json();
  events = events.data;

  return {
    props: { events },
  };
}
