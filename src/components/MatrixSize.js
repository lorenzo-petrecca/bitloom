"use client"
import styles from "@/components/MatrixSize.module.css";

export default function MatrixSize ({w, h, onChange}) {
  const min = 1, max = 128;

  const clamp = (v) => {
    const n = Number(v);
    if (Number.isNaN(n)) return min;
    return Math.min(max, Math.max(min, n));
  };


  const handleW = (e) => {
    const newW = clamp(e.target.value);
    if (newW !== w) onChange(h, newW);
  };

  const handleH = (e) => {
    const newH = clamp(e.target.value);
    if (newH !== h) onChange(newH, w);
  };


  return (
    <div className={styles.wrap}>
      <label className={`${styles.label} typo-normal`}>
        Larghezza (px)
        <input
          className={`${styles.input} typo-big`}
          type="number"
          min={min}
          max={max}
          value={w}
          onChange={handleW}
          inputMode="numeric"
        />
      </label>

      <label className={`${styles.label} typo-normal`}>
        Altezza (px)
        <input
          className={`${styles.input} typo-big`}
          type="number"
          min={min}
          max={max}
          value={h}
          onChange={handleH}
          inputMode="numeric"
        />
      </label>

      <p className={`${styles.hint} typo-normal`}>
        Intervallo consentito: {min}–{max}. I pixel vengono azzerati al ridimensionamento.
      </p>
    </div>
  );
}
