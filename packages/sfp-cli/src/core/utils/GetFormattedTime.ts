export default function getFormattedTime(milliseconds: number): string {
    const date = new Date(0);
    date.setMilliseconds(milliseconds); 
    const timeString = date.toISOString().substr(11, 12);
    return timeString;
}
