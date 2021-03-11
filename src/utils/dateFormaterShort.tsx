
export default function formatBlockTimeStampShort(timestamp: number): string {

    let date = new Date();
    date.setTime(timestamp * 1000);
    let format = date.getFullYear() + '-' +
        (date.getMonth() + 1) + '-' +
        date.getDate()

    return format;
}

