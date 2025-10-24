export function createGrid (h, w, fill = false) {
    return Array.from({length: h}, () => Array(w).fill(fill));
}
