export interface IDay {
    date: Date;
    required: boolean; // indicates if the habit needs to be done on this day
    completed: boolean;
    isPast: boolean;
}

var DAYS: Array<string> = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export class Day implements IDay {
  date: Date;
  required: boolean;
  completed: boolean;
  isPast: boolean;

  constructor(date: Date) {
    this.date = date;
  }

  getDayStr() {
    return DAYS[this.date.getDay()] + ' (' + this.date.getDate() + ')';
  }
}
