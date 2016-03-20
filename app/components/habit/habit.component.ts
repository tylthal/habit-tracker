import {Component, Input} from 'angular2/core';
import {Habit} from '../../classes/habit';

@Component({
  selector: 'habit',
  templateUrl: './app/templates/habit/habit.component.html',
  styles: [`
            .day {
              min-width: 50px;
              font-size: 2em;
              color: green;
            }
          `]
})

export class HabitComponent {
  @Input() habit: Habit;

  dayPressed(day) {
    this.habit.currentWeek[day] = !this.habit.currentWeek[day];
  }
}
