import {Component, Input} from 'angular2/core';
import {Habit} from '../../classes/habit';

@Component({
  selector: 'habit',
  template: `
            <div class="panel panel-default">
              <div class="panel-heading">{{habit.name}}</div>
              <div class="panel-body">
                <div class="table-responsive">
                  <table class="table table-bordered">
                    <tr>
                      <th class="text-center">Mon</th>
                      <th class="text-center">Tue</th>
                      <th class="text-center">Wed</th>
                      <th class="text-center">Thu</th>
                      <th class="text-center">Fri</th>
                      <th class="text-center">Sat</th>
                      <th class="text-center">Sun</th>
                    </tr>
                    <tr style="height: 50px;">
                      <td class="day text-center" (click)="dayPressed(0)">
                        <span class="glyphicon" [class.glyphicon-ok-circle]="habit.currentWeek[0]"></span>
                      </td>
                      <td class="day text-center" (click)="dayPressed(1)">
                        <span class="glyphicon" [class.glyphicon-ok-circle]="habit.currentWeek[1]"></span>
                      </td>
                      <td class="day text-center" (click)="dayPressed(2)">
                        <span class="glyphicon" [class.glyphicon-ok-circle]="habit.currentWeek[2]"></span>
                      </td>
                      <td class="day text-center" (click)="dayPressed(3)">
                        <span class="glyphicon" [class.glyphicon-ok-circle]="habit.currentWeek[3]"></span>
                      </td>
                      <td class="day text-center" (click)="dayPressed(4)">
                        <span class="glyphicon" [class.glyphicon-ok-circle]="habit.currentWeek[4]"></span>
                      </td>
                      <td class="day text-center" (click)="dayPressed(5)">
                        <span class="glyphicon" [class.glyphicon-ok-circle]="habit.currentWeek[5]"></span>
                      </td>
                      <td class="day text-center" (click)="dayPressed(6)">
                        <span class="glyphicon" [class.glyphicon-ok-circle]="habit.currentWeek[6]"></span>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            `,
  styles: [`
            .day {
              min-width: 50px;
              font-size: 2em;
              color: green;
            }

            th {

            }
          `]
})

export class HabitComponent {
  @Input() habit: Habit;

  dayPressed(day) {
    this.habit.currentWeek[day] = !this.habit.currentWeek[day];
  }
}
