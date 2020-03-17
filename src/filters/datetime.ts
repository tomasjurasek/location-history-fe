import { format, parseISO } from "date-fns";

export function formatDatetime(value?: string) {
    if (!value) {
        return "";
    }
    return format(parseISO(value), "d.M.yyyy H:mm");
}
