"use client"

import styles from "./page.module.css";
import MatrixSize from "@/components/MatrixSize";
import Matrix from "@/components/Matrix";
import OutputSettings from "@/components/OutputSettings";
import Output from "@/components/Output";
import ActionBar from "@/components/ActionBar";
import { createGrid } from "@/lib/grid";
import { useCallback, useMemo, useState } from "react";
import { generateComment, packGridToBytes } from "@/lib/packing";

export default function Home() {
  const [w, setW] = useState(5);
  const [h, setH] = useState(8);
  const [grid, setGrid] = useState(() => createGrid(8, 5, false));

  // Impostazioni Output
  // mode: "rows" | "cols"
  // chunking: "linear" | "block"
  // bitOrder: "lsb" | "msb"
  // format: "hex" | "bin" | "dec"
  const [outSettings, setOutSettings] = useState({ mode: "rows", chunking: 'block', bitOrder: "lsb", format: "hex" });

  const handleSizeChange = useCallback((newH, newW) => {
    setH(newH);
    setW(newW);
    setGrid(createGrid(newH, newW, false));
  }, []);

  const handleSettingsChange = useCallback((partial) => {
    setOutSettings((s) => ({...s, ...partial}));
  }, [])

  // Calcolo dell'output
  const outputText = useMemo(() => packGridToBytes(grid, outSettings), [grid, outSettings]);
  const codeComment = useMemo(() => generateComment(grid, outSettings), [grid, outSettings]);
  const completedText = [];
  completedText.push(outputText);
  completedText.push(codeComment);

  // Pulisce la matrice
  const handleClear = useCallback(() => {
    setGrid(createGrid(h, w, false));
  }, [h, w]);

  // Inverte la matrice
  const handleInvert = useCallback(() => {
    setGrid(prev => prev.map(row => row.map(v => !v)));
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className="typo-pageTitle">Bitloom</h1>
        </div>
        <div className={styles.editor}>
          <div className={styles.settings}>
            <MatrixSize
              w={w}
              h={h}
              onChange={handleSizeChange}
            />
            <OutputSettings settings={outSettings} onChange={handleSettingsChange} />
            <ActionBar
              outputText={completedText}
              onClear={handleClear}
              onInvert={handleInvert}
            />
          </div>
          <div className={styles.ui}>
            <Matrix grid={grid} setGrid={setGrid} />
            <Output outputText={completedText} />
          </div>
        </div>
      </main>
    </div>
  );
}
