import {Component, Output, EventEmitter} from 'angular2/core';
import {NgForm} from 'angular2/common'
import {Habit} from '../../classes/habit';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'habit-form',
  templateUrl: './app/templates/habit/habitform.component.html',
})

export class HabitFormComponent {
  @Output() closed = new EventEmitter();
  habit: Habit = new Habit("", "", this._dataService.today);

  constructor(private _dataService: DataService){
  }

  onSubmit() {
    //this._dataService.addCategory(this.category.name, this.category.description);
    this.closed.emit({});
  }
}
