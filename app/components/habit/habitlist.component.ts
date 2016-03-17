import {Component} from 'angular2/core';
import {DataService} from '../../services/data.service';
import {Category} from '../../classes/category';

@Component({
  selector: 'habit-list',
  template: `
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 *ngIf="category == undefined" class="panel-title">Select a category</h3>
              <div *ngIf="category != undefined">
                <h3 class="panel-title">
                  <b>{{category.name}}</b><br />
                  <small *ngIf="category.description"> - {{category.description}}</small>
                </h3>
              </div>
            </div>
            <div class="panel-body">
            </div>
          </div>
          `,
  styles: [
    `
    `
  ]
})

export class HabitListComponent {
  category: Category;

  constructor(private _dataService: DataService) {
    _dataService.selectedChanged.subscribe((category: Category) => {
      this.category = category;
    });
  }
}
