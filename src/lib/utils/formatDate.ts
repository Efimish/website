const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
] as const;

const dayWithSuffix = (day: number) => {
    if (day >= 11 && day <= 19) return day + 'th';
    else if (day % 10 == 1) return day + 'st';
    else if (day % 10 == 2) return day + 'nd';
    else if (day % 10 == 3) return day + 'rd';
    else return day + 'th';
}

const leadingZero = (n: number) => {
    if (n < 10) return `0${n}`;
    return `${n}`;
}

export const formatDate = (date: Date | null) => {
    if (date === null) return 'Never';
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = dayWithSuffix(date.getDate());
    const hour = leadingZero(date.getHours());
    const minute = leadingZero(date.getMinutes());
    const second = leadingZero(date.getSeconds());
    return `${day} ${month} ${year} ${hour}:${minute}:${second}`;
}