import { React} from "react";

function DateUtil() {

    const signUpDateFormate = {};

    const months = {"Jan":1, "Feb":2, "Mar":3, "Apr":4,"May":5 ,"June": 6, "July":7 ,"Aug":8 ,"Sep":9 ,"Oct":10 ,"Nov": 11,"Dec":12};

    const monthList = [];

    for (var key in months) {
        console.log("key " + key + " has value " + months[key]);
        monthList.push(<option>{key}</option>);
    }

    signUpDateFormate.monthList = monthList;
    signUpDateFormate.months = months;

    const days = [];
    for(let i = 1; i<32; i++){
        console.log("hi");
        days.push(i);
    }

    const daysList = [];
    days.forEach((days) => {
        console.log("hi");
        daysList.push(<option>{days}</option>)
    })

    signUpDateFormate.daysList = daysList;

    const years = [];
    for(let i = 1950; i<2005; i++){
        console.log("hi");
        years.push(i);
    }

    const yearList = [];
    years.forEach((years) => {
        console.log("hi");
        yearList.push(<option>{years}</option>)
    })

    signUpDateFormate.yearList = yearList;

    return signUpDateFormate;
}

export default DateUtil;
