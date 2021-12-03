export const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

// Get date from date string
export const getDate = (date) => {
    const dat = date.split("T")[0];
    return dat.split("-")[2];
}

// Get month from date string
export const getMonth = (date) => {
    const dat = date.split("T")[0];
    const mon = parseInt(dat.split("-")[1]);
    return months[mon - 1];
}

// Get Year from date string
export const getYear = (date) => {
    const dat = date.split("T")[0];
    return dat.split("-")[0];
}

// Get monthYear combined string for sidebarDate from date string
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