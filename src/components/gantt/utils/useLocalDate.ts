import { useContext } from "react";
import { TranslationContext } from "translation";

type UseLocalDate = () => {
    toLocalDate: (date: number, format: string) => string;
};
const useLocalDate: UseLocalDate = () => {
    const { local } = useContext(TranslationContext);
    return {
        toLocalDate: (date: number, format: string) => toLocal(date, format, local),
    };
};

function toLocal(date: number, format: string, local: string) {
    const delimiter: string[] | null = format.match(/\/|\s/);
    if (delimiter && delimiter[0]) {
        return format.split(delimiter[0]).reduce((sum, partFormat, index) => {
            return sum + (index !== 0 ? delimiter : "") + toLocalPart(date, partFormat, local);
        }, "");
    } else return toLocalPart(date, format, local);
}

function toLocalPart(date: number, format: string, local: string): string {
    if (local === "fa-IR") {
        const localeStart = new Date(date).toLocaleDateString(local);
        const localMonths = [
            "فروردین",
            "اردیبهشت",
            "خرداد",
            "تیر",
            "مرداد",
            "شهریور",
            "مهر",
            "آبان",
            "آذر",
            "دی",
            "بهمن",
            "اسفند",
        ];
        const localNumbers: { [key: string]: string } = {
            "۰": "0",
            "۱": "1",
            "۲": "2",
            "۳": "3",
            "۴": "4",
            "۵": "5",
            "۶": "6",
            "۷": "7",
            "۸": "8",
            "۹": "9",
        };
        switch (format) {
            case "DD":
                return localeStart.split("/")[2];
            case "MM":
                return localeStart.split("/")[1];
            case "MMMM":
                const month = localeStart
                    .split("/")[1]
                    .split("")
                    .map(d => localNumbers[d])
                    .join("");
                return localMonths[Number(month) - 1];
            case "YYYY":
                return localeStart.split("/")[0];
            default:
                return localeStart.split("/")[2];
        }
    } else {
        const start = new Date(date);
        switch (format) {
            case "DD":
                return start.toLocaleDateString(local, { day: "numeric" });
            case "MM":
                return start.toLocaleDateString(local, { month: "numeric" });
            case "MMMM":
                return start.toLocaleDateString(local, { month: "long" });
            case "YYYY":
                return start.toLocaleDateString(local, { year: "numeric" });
            default:
                return start.toLocaleDateString(local, { day: "numeric" });
        }
    }
}
export { useLocalDate };
