import { React} from "react";

function DateFormatter(month, day, year, months) {
    console.log(month, day, year ,months);
    console.log(months[month] + "-" + day + "-" + year);
    const date = new Date(months[month] + "," + day + "," + year);
    console.log(date);
    return date;
}

export default DateFormatter;
