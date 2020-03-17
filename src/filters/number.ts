export function formatNumber(value?: number) {
    if (value == undefined) {
        return "";
    }
    return value.toLocaleString();
}
