import { formatNumber } from "@/filters/number";

export function formatDistance(value?: number) {
    if (!value) {
        return "";
    }
    return `${formatNumber(value)} m`;
}
