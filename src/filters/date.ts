import { format, parseISO } from "date-fns";

export function date(value?: string) {
    if (!value) {
        return "";
    }
    return format(parseISO(value), "d.M.yyyy");
}
