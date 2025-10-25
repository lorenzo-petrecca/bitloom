"use client";
import { useEffect, useState } from "react";

export default function InstallButton() {
  const [deferred, setDeferred] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferred(e);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = async () => {
    if (!deferred) return;
    deferred.prompt();
    const { outcome } = await deferred.userChoice;
    setDeferred(null);
    setVisible(false);
    // outcome: "accepted" | "dismissed"
  };

  if (!visible) return null;
  return <button className={`typo-medium buttons-btn buttons-rounded buttons-primaryColor`} onClick={install}>Installa app</button>;
}
