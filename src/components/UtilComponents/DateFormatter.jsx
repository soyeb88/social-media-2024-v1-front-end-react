import { PatternUtil } from "./PatternUtil";

function DateFormatter(month, day, year, months) {
    const dob = months[month] + "-" + day + "-" + year;

    if(!PatternUtil.date_pattern.test(dob))
        return false;

    const date = new Date(dob);
    console.log(date);
    return date;
}

export default DateFormatter;
