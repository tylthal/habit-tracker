import {Component, Input} from 'angular2/core';
import {Habit} from '../../classes/habit';

var MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

@Component({
  selector: 'habit',
  templateUrl: './app/templates/habit/habit.component.html',
  styles: [`
            .day {
              min-width: 50px;
              font-size: 2em;
              color: lightgray;
            }
            .habit-done {
              color: green;
            }
            .habit-missed {
              color: darkred;
            }
            .today {
                border-right: solid 2px lightblue;
                border-left: solid 2px lightblue;
                border-bottom: solid 2px lightblue;
            }
            .today-header {
                border-right: solid 2px lightblue;
                border-left: solid 2px lightblue;
                border-top: solid 2px lightblue;
            }

            .header {
            }

            .month {
              font-size: .8em;
              clear: both;
            }

            .day-header {
            }
          `]
})

export class HabitComponent {
  @Input() habit: Habit;
  today: Date = new Date();
  currentStreak: number;
  bestStreak: number;

  dayPressed(day) {
    this.habit.currentWeek[day].completed = !this.habit.currentWeek[day].completed;
  }

  isToday(date: Date) {
    return this.today.getFullYear() == date.getFullYear() && this.today.getMonth() == date.getMonth() &&
      this.today.getDate() == date.getDate();
  }

  isPast(date: Date) {
    return this.today.getFullYear() > date.getFullYear() || this.today.getMonth() > date.getMonth() ||
      this.today.getDate() > date.getDate();
  }

  monthDisplay(index: number):string {
    var date = this.habit.currentWeek[0].date;
    if(index == 0 || date.getDate() == 0)
    {
      return MONTH_NAMES[date.getMonth()];
    }
    return " ";
  }
}
