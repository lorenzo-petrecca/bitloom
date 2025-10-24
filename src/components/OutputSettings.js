"use client"

import styles from "@/components/OutputSettings.module.css";

export default function OutputSettings ({ settings, onChange }) {
  const handleMode = (e) => onChange({ mode: e.target.value });
  const handleChunking = (e) => onChange({ chunking: e.target.value });
  const handleBitOrder = (e) => onChange({ bitOrder: e.target.value });
  const handleFormat = (e) => onChange({ format: e.target.value });

  return (
    <div className={styles.wrap}>
      {/* Mode */}
      <div className={styles.field}>
        <label className={`${styles.label} typo-normal`}>Mode</label>
        <select
          className={`${styles.input} typo-medium`}
          onChange={handleMode}
          value={settings.mode}
        >
          <option value="rows">Per riga</option>
          <option value="cols">Per colonna</option>
        </select>
      </div>

      {/* Chunking */}
      <div className={styles.field}>
        <label className={`${styles.label} typo-normal`}>Chunking</label>
        <select
          className={`${styles.input} typo-medium`}
          onChange={handleChunking}
          value={settings.chunking}
        >
          <option value="linear">Lineare</option>
          <option value="block">A blocchi</option>
        </select>
      </div>

      <div className={styles.field}>
        <label className={`${styles.label} typo-normal`}>Bit order</label>
        <select
          className={`${styles.input} typo-medium`}
          onChange={handleBitOrder}
          value={settings.bitOrder}
        >
          <option value="msb">MSB-first</option>
          <option value="lsb">LSB-first</option>
        </select>
      </div>

      <div className={styles.field}>
        <label className={`${styles.label} typo-normal`}>Format</label>
        <select
          className={`${styles.input} typo-medium`}
          onChange={handleFormat}
          value={settings.format}
        >
          <option value="hex">HEX</option>
          <option value="bin">BIN</option>
          <option value="dec">DEC</option>
        </select>
      </div>
    </div>
  );
}
