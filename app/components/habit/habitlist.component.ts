import {Component} from 'angular2/core';
import {DataService} from '../../services/data.service';
import {HabitComponent} from './habit.component';
import {HabitFormComponent} from './habitform.component';
import {Category} from '../../classes/category';
import {Habit} from '../../classes/habit';

@Component({
  selector: 'habit-list',
  templateUrl: './app/templates/habit/habitlist.component.html',
  styles: [
      `
        .addbutton {
          width: 40px;
          float: right;
          margin-right: 5px;
        }
      `
  ],
  directives: [HabitComponent, HabitFormComponent]
})

export class HabitListComponent {
  category: Category;
  habits: Habit[];
  showHabitForm: boolean = false;

  setCategory(category: Category) {
    this.category = category;
    this._dataService.getHabits(this.category).then(habits => {
      this.habits = habits;
    });
  }

  constructor(private _dataService: DataService) {
    _dataService.selectedChanged.subscribe((category: Category) => {
      this.setCategory(category);
    });
  }

  toggleHabitForm() {
    this.showHabitForm = !this.showHabitForm;
  }

  habitFormClosed() {
    this.showHabitForm = false;
  }
}
