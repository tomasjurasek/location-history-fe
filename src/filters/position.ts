function formatCoord(value: number) {
    return Math.floor(value * 10 ** 7) / 10 ** 7;
}

export function formatPosition(value?: [number, number]) {
    if (!value) {
        return "";
    }
    return `${formatCoord(value[1])}, ${formatCoord(value[0])}`;
}
