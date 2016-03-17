import {Component, OnInit} from 'angular2/core';
import {DataService} from '../../services/data.service';
import {Category} from '../../classes/category';
import {CategoryComponent} from './category.component';

@Component({
    selector: 'category-list',
    template: `
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">Categories</h3>
            </div>
            <ul class="nav nav-pills nav-stacked">
              <li *ngFor="#cat of categories"
                roles="presentation"
                [class.active]="cat == selected">
                  <a (click)="onSelect(cat)">
                      <category [category]=cat></category>
                  </a>
              </li>
            </ul>
          </div>
              `,
    directives: [CategoryComponent]
})

export class CategoryListComponent implements OnInit {
  categories: Category[];
  selected: Category;

  constructor(private _dataService: DataService) {
    _dataService.selectedChanged.subscribe((category: Category) => {
      this.selected = category;
    });
  }

  ngOnInit() {
    this._dataService.getCategories().then(cats => this.categories = cats);
  }

  onSelect(category: Category) {
      this._dataService.setSelectedCategory(category);
  }
}
