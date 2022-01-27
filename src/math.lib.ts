const roundTo2Decimals = (t: number): number => Math.round(1e4 * t) / 1e4
const roundTo3Decimals = (t: number): number => Math.round(100 * t) / 100


export {
    roundTo2Decimals, roundTo3Decimals
}