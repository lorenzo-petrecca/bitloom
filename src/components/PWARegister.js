'use client';

import { useEffect, useState } from 'react';
import { Workbox } from 'workbox-window';

export default function PWARegister() {
  const [hasUpdate, setHasUpdate] = useState(false);
  const [wb, setWb] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) return;

    const wbInstance = new Workbox('/sw.js');
    setWb(wbInstance);

    const onWaiting = () => setHasUpdate(true);
    const onExternalWaiting = () => setHasUpdate(true);

    wbInstance.addEventListener('waiting', onWaiting);
    wbInstance.addEventListener('externalwaiting', onExternalWaiting);

    wbInstance.register().catch(console.error);

    return () => {
      wbInstance.removeEventListener('waiting', onWaiting);
      wbInstance.removeEventListener('externalwaiting', onExternalWaiting);
    };
  }, []);

  const confirmUpdate = async () => {
    if (!wb) return;
    try {
      await wb.messageSkipWaiting();
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  if (!hasUpdate) return null;

  return (
    <div
      style={{
        position: 'fixed',
        insetInline: 12,
        bottom: 12,
        zIndex: 1000,
        display: 'flex',
        gap: 8,
        padding: '10px 12px',
        background: 'var(--surface-2, #1b1f28)',
        border: '1px solid var(--border, #2b3240)',
        borderRadius: 10,
        alignItems: 'center'
      }}
      role="status"
      aria-live="polite"
    >
      <span>Nuova versione disponibile.</span>
      <button
        onClick={confirmUpdate}
        style={{
          padding: '6px 10px',
          borderRadius: 8,
          cursor: 'pointer',
          border: '1px solid var(--accent, #6f4aff)',
          background: 'var(--accent, #6f4aff)',
          color: 'var(--on-accent, #0b0720)'
        }}
      >
        Aggiorna
      </button>
    </div>
  );
}
