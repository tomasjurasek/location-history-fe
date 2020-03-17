export function formatNumber(value?: number) {
    if (value == undefined) {
        return "";
    }
    return new Intl.NumberFormat("cs-CZ").format(value);
}
