import {Component} from 'angular2/core';
import {CategoryListComponent} from './category/categorylist.component';
import {HabitListComponent} from './habit/habitlist.component';

@Component({
  selector: 'app-dashboard',
  template: `
          <div id="row">
            <div class="col-xs-3"><category-list></category-list></div>
            <div class="col-xs-9"><habit-list></habit-list></div>
          </div>
          `,
  styles: [`
          #container {
            display: flex;
          }
          #left {
            padding-right: 25px;
            margin-left: 10px;
            height: 100%;
          }
          #right {
          }
          `],
  directives: [CategoryListComponent, HabitListComponent]
})

export class DashboardComponent {

}
