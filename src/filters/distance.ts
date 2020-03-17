export function formatDistance(value?: number) {
    if (!value) {
        return "";
    }
    return `${value.toLocaleString()} m`;
}
