import React from "react";
import { useState, useEffect } from "react";
import styles from "@/styles/Modal.module.css";
import { ReactDOM } from "react";
import { FaTimes } from "react-icons/fa";

export default function Modal({ show, onClose, children, title }) {
  const [isBrowser, setIsBrowser] = useState(false);
  return <div>Modal</div>;
}
