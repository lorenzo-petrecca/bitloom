"use client"

import styles from "@/components/Output.module.css";
import { useEffect } from "react"

export default function Output ({ outputText = [] }) {
  return (
    <div className={styles.wrap}>
      <h1 className={`${styles.title} typo-pageTitle4`}>Output</h1>
      <pre className={`${styles.code} typo-big`} aria-label="output formattato">
        { outputText[0] || "// Nessun byte da mostrare" }
        <br/>
        <span className={`${styles.comment} typo-medium`}>{ outputText[1] || "" }</span>
      </pre>
    </div>
  );
}
