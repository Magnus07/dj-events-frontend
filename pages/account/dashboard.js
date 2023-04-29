import React from "react";
import Layout from "@/components/Layout";
import { parseCookies } from "@/helpers";
import { API_URL } from "@/config";
import styles from "@/styles/Dashboard.module.css";
import DashboardEvent from "@/components/DashboardEvent";

export default function dashboard({ events }) {
  const deleteEvent = (id) => {
    console.log(id);
  };
  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>dashboard</h1>
        <h3>My Events</h3>
        {events.map((evt) => {
          return (
            <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
          );
        })}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();
  return {
    props: {
      events: events,
    },
  };
}
