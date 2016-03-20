import {Component} from 'angular2/core';
import {DataService} from '../../services/data.service';
import {HabitComponent} from './habit.component';
import {Category} from '../../classes/category';
import {Habit} from '../../classes/habit';

@Component({
  selector: 'habit-list',
  templateUrl: './app/templates/habit/habitlist.component.html',
  directives: [HabitComponent]
})

export class HabitListComponent {
  category: Category;
  habits: Habit[];

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
}
