export const CURRENT_DATE_UNIX = new Date();
const START_DAY_UNIX = 1_643_670_000_000;
const END_DAY_UNIX = 1_648_764_000_000;
const DAY_MILLISEC = 86_400_000;

export const DAYS_UNIX = [];
export const HOURS = [];
export const MINUTES = [];

for (let i = START_DAY_UNIX; i < END_DAY_UNIX; i += DAY_MILLISEC) {
    DAYS_UNIX.push(i);
}

for (let i = -1; i < 24; i++) {
    HOURS.push(i);
}

for (let i = -1; i < 60; i++) {
    MINUTES.push(i);
}

const DAYS = DAYS_UNIX.map((day_unix) => new Date(day_unix));
export const ORDERED_DAYS = [
    new Date(CURRENT_DATE_UNIX),
    ...DAYS.filter((day) => day < new Date(CURRENT_DATE_UNIX - DAY_MILLISEC)),
];

export const TODAY = new Date(
    new Intl.DateTimeFormat("hu-HU").format(ORDERED_DAYS[0])
).getTime();

export const formDateLabel = (date) => {
    let p = new Intl.DateTimeFormat("hu-HU", {
        month: "long",
        day: "2-digit",
    })
        .formatToParts(date)
        .reduce((acc, part) => {
            acc[part.type] = part.value;
            return acc;
        }, {});
    return `${p.month} ${p.day}.`;
};

export const formDateValue = (date) => {
    let p = new Intl.DateTimeFormat("hu-HU", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    })
        .formatToParts(date)
        .reduce((acc, part) => {
            acc[part.type] = part.value;
            return acc;
        }, {});

    return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}`;
};
