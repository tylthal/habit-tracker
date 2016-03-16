import {Component} from 'angular2/core';
import {CategoryListComponent} from './category/categorylist.component';

@Component({
  selector: 'app-dashboard',
  template: `
          <div id="container">
            <div id="left"><category-list></category-list></div>
            <div id="right"><h3>Currently selected category will show here.</h3></div>
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
  directives: [CategoryListComponent]
})

export class DashboardComponent {

}
