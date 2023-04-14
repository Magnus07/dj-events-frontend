import Link from "next/link";
import styles from "../styles/404.module.css";
import Layout from "@/components/Layout";
import { FaExclamationTriangle } from "react-icons/fa";
function NotFoundPage() {
  return (
    <Layout>
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle />
          404
        </h1>
        <h4>Sorry, there's nothing here</h4>
        <Link href="/">Go Back Home</Link>
      </div>
    </Layout>
  );
}

export default NotFoundPage;
