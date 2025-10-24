export function packGridToBytes (grid, settings = {}) {
  const h = Array.isArray(grid) ? grid.length : 0;
  const w = h > 0 && Array.isArray(grid[0]) ? grid[0].length : 0;
  if (!h || !w) return [];

  // const mode = settings.mode ?? 'rows';
  // const chunking = settings.chunking ?? 'block';
  // const bitOrder = settings.bitOrder ?? 'lsb';
  // const format = settings.format ?? 'hex';

  // Costruzione array di bits nel verso passato
  const sequences = [];
  switch (settings.chunking) {

    case 'linear':
      const bits = [];
      switch (settings.mode) {
      case 'rows':
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            bits.push(!!grid[y][x]);
          }
        }
      break;
      case 'cols':
        for (let x = 0; x < w; x++) {
          for (let y = 0; y < h; y++) {
            bits.push(!!grid[y][x]);
          }
        }
      break;
      default:
        return [];
    }

    sequences.push(bits);
    break;


    case 'block':
      switch (settings.mode) {
        case 'rows':
          for (let y = 0; y < h; y++) {
            const rowBits = [];
            for (let x = 0; x < w; x++) {
              rowBits.push(!!grid[y][x]);
            }
            sequences.push(rowBits);
          }
        break;
        case 'cols':
          for (let x = 0; x < w; x++) {
            const colBits = [];
            for (let y = 0; y < h; y++) {
              colBits.push(!!grid[y][x]);
            }
            sequences.push(colBits);
          }
        break;
        default:
          return [];
      }
    break;

    default:
      return [];
  }


  // Trasformazione dei bit in byte
  const bytes = [];

  for (const bits of sequences) {
    for (let i = 0; i < bits.length; i += 8) {
      let r = 0;
      for (let k = 0; k < 8; k++) {
        const bit = bits[i + k] ? 1 : 0; // se fuori range → undefined → false
        switch (settings.bitOrder) {
          case 'msb':
            r |= bit << (7 - k);  // primo bit del gruppo → bit7
          break;
          case 'lsb':
            r |= bit << k;  // primo bit del gruppo → bit0
          break;
          default:
            return [];
        }
      }
      bytes.push(r & 0xff); // ripulisce il byte e lo inserisce nell'array "bytes"
    }
  }


  // Formattazione dei byte
  switch (settings.format) {
    case 'hex':
      return bytes.map(b => `0x${b.toString(16).padStart(2, '0')}`).join(', ');
    break;
    case 'bin':
      return bytes.map(b => `0b${b.toString(2).padStart(8, '0')}`).join(', ');
    break;
    case 'dec':
      return bytes.join(', ');
    break;
    default:
      return [];
  }

}


export function generateComment (grid, settings = {}) {
  const h = Array.isArray(grid) ? grid.length : 0;
  const w = h > 0 && Array.isArray(grid[0]) ? grid[0].length : 0;
  if (!h || !w) return [];
  if (!settings.mode || !settings.chunking || !settings.bitOrder || !settings.format) return "";
  return `
/* Note:
 *  Dimensioni matrice: ${h}(h) x ${w}(w)
 *  Impacchettamento: ${settings.chunking}
 *  Lettura bit: ${settings.mode}
 *  Ordine bit: ${settings.bitOrder}
 *  Formato: ${settings.format}
 */
`;
}
