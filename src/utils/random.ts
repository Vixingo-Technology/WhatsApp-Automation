export function seededRandom(seed: number) {
    let value = seed + 0x6d2b79f5;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
}

export function seededRange(seed: number, min: number, max: number) {
    return min + seededRandom(seed) * (max - min);
}
