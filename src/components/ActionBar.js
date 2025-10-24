"use client"

import { useCallback, useState } from "react";
import styles from "@/components/ActionsBar.module.css";

export default function ActionBar ({
  outputText = [],
  onClear,
  onInvert,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy =  useCallback(async () => {
    const completedText = outputText[0] + `\n`+ outputText[1];
    try {
      await navigator.clipboard.writeText(completedText || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = completedText || "";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  }, [outputText]);

  return (
    <div className={styles.wrap}>
      <div className={styles.bar}>
        <div className={styles.group}>
          <button className={`typo-medium buttons-btn buttons-rounded buttons-secondary ${styles.groupItem}`} onClick={handleCopy}>
            { copied ? 'Copiato!' : 'Copia output' }
          </button>
          <button className={`typo-medium buttons-btn buttons-rounded buttons-secondary ${styles.groupItem}`} onClick={onClear}>Pulisci</button>
          <button className={`typo-medium buttons-btn buttons-rounded buttons-secondary ${styles.groupItem}`} onClick={onInvert}>Inverti</button>
        </div>
      </div>
    </div>
  );
}
