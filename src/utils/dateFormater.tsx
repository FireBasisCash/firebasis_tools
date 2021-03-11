
export default function formatBlockTimeStamp(timestamp: number): string {

    let date = new Date();
    date.setTime(timestamp * 1000);
    let format = date.getFullYear() + '-' +
        (date.getMonth() + 1) + '-' +
        date.getDate() + ' ' +
        date.getHours() + ':' +
        date.getMinutes() + ':' +
        date.getSeconds();

    return format;
}

