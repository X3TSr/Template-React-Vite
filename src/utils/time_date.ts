const now = new Date();

const time = {
    hh: String(now.getHours()).padStart(2, "0"),
    mm: String(now.getMinutes()).padStart(2, "0"),
    ss: String(now.getSeconds()).padStart(2, "0"),
}

const date = {
    fullDay: now.toLocaleDateString('en-BE', { weekday: 'long' }),
    day: String(now.getDate()).padStart(2, "0"),
    month: String(now.getMonth() + 1).padStart(2, "0"),
    year: now.getFullYear(),
}

const getTimeAndDate = () => {
    initTimeAndDate();
    return { time, date }
}

const initTimeAndDate = () => {
    // Function to update the time
    const updateTime = () => {
        const now = new Date();

        time.hh = String(now.getHours()).padStart(2, "0");
        time.mm = String(now.getMinutes()).padStart(2, "0");
        time.ss = String(now.getSeconds()).padStart(2, "0");
    };

    // Function to update the date
    const updateDate = () => {
        const now = new Date();

        date.fullDay = now.toLocaleDateString('en-BE', { weekday: 'long' });
        date.day = String(now.getDate()).padStart(2, "0");
        date.month = String(now.getMonth() + 1).padStart(2, "0");
        date.year = now.getFullYear();
    };

    // Initial update
    updateTime();
    updateDate();

    // update every second
    const interval = setInterval(() => {
        updateTime();
        updateDate();
    }, 1000);

    // Cleanup intervals on component unmount
    return () => clearInterval(interval);
}

export const TimeDateUtils = {
    getTimeAndDate
}