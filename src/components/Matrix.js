"use client"
import styles from "@/components/Matrix.module.css";
import { useCallback, useEffect, useState } from "react";

export default function Matrix ({grid, setGrid}) {
  const h = grid?.length ?? 0;
  const w = h > 0 ? (grid[0]?.length ?? 0) : 0;
  const [painting, setPainting] = useState(false); // Sto trascinando?
  const [paintValue, setPaintValue] = useState(true); // valore da pennellare

  // toggle singolo
  const toggleAt = useCallback((y, x) => {
    setGrid(prev => {
      if (!prev?.[y] || typeof prev[y][x] === "undefined") return prev;
      const row = [...prev[y]];
      row[x] = !row[x];
      const next = [...prev];
      next[y] = row;
      return next;
    });
  }, [setGrid]);

  // apply per drag
  const applyAt = useCallback((y, x, value) => {
    setGrid(prev => {
      if (!prev?.[y] || typeof prev[y][x] === "undefined") return prev;
      const row = [...prev[y]];
      row[x] = value;
      const next = [...prev];
      next[y] = row;
      return next;
    });
  }, [setGrid]);


  // Helpers per estrarre coordinate della cella
  const getYX = (target) => {
    const y = Number(target.dataset.y);
    const x = Number(target.dataset.x);
    if (Number.isNaN(y) || Number.isNaN(x)) return false;
    return { y, x };
  };


  // Inizio disegno (al mouse down [con pointer che va bene anche per touch])
  const onPointerDown = (e) => {
    e.preventDefault(); // evita selezioni testo ecc.
    const pos = getYX(e.target);
    if (!pos) return;

    const erase = e.button === 2 || e.altKey; // "gomma" = tasto destro o alt + tasto sinistro
    toggleAt(pos.y, pos.x); // toggle singolo sulla cella
    setPaintValue(erase ? false : !grid[pos.y][pos.x]);
    setPainting(true);
  };



  // Trascinamento
  const onPointerEnter = useCallback((e) => {
    if (!painting) return;
    const pos = getYX(e.target);
    if (!pos) return;

    applyAt(pos.y, pos.x, paintValue);
  }, [painting, paintValue, applyAt]);


  // Ferma il Trascinamento
  const onPointerUp = useCallback((e) => {
    setPainting(false);
  }, []);


  // disabilita menu tasto destro per usare destro come “gomma”
  const onContextMenu = (e) => {
    e.preventDefault();
  };

  if (!h || !w) {
    return (
      <div className={styles.wrap}>
        <div className={styles.empty}>Nessuna griglia da mostrare</div>
      </div>
    );
  }

  return (
    <div className={styles.wrap} onContextMenu={onContextMenu}>
      <div
        className={styles.grid}
        style={{gridTemplateColumns: `repeat(${w}, var(--cell-size))`}}
        role="grid" aria-rowcount={h}
        aria-colcount={w}
        onPointerUp={onPointerUp}
      >
        {grid.map((row, y) => (
          row.map((on, x) => (
            <div
              key={`${y}-${x}`}
              className={`${styles.cell} ${on ? styles.on : ""}`}
              role="button"
              data-y={y}
              data-x={x}
              aria-pressed={on ? "true" : "false"}
              aria-label={`riga ${y + 1}, colonna ${x + 1}`}
              onPointerDown={onPointerDown}
              onPointerEnter={onPointerEnter}
            />
          ))
        ))}
      </div>
    </div>
  );
}
