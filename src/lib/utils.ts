import { clsx, ClassArray } from "clsx";
import { addHours, format, parseISO, subDays } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassArray) {
    return twMerge(clsx(inputs));
}

export function formatDateString(dateString : string) { 
    const parsedDate = parseISO(dateString); 
    const updatedDate = subDays(addHours(parsedDate, 10), 194);
    return format(updatedDate, 'h:mm, MMM dd, yyyy');
}
