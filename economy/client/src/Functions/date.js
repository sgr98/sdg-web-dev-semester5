export const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export const getMonth = (date) => {
    const dat = date.split("T")[0];
    const mon = parseInt(dat.split("-")[1]);
    return months[mon - 1];
}

export const getYear = (date) => {
    const dat = date.split("T")[0];
    return dat.split("-")[0];
}

export const getMonthYear = (date) => {
    if(typeof date === "string") {
        const dat = getMonth(date) + " " + getYear(date);
        return dat;
    }
    else {
        const mon = date.getMonth();
        const year = date.getFullYear();
        const dat = months[mon] + " " + year.toString();
        return dat;
    }
}