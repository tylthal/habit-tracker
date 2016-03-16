import {Component, OnInit} from 'angular2/core';
import {DataService} from '../../services/data.service';
import {Category} from '../../classes/category';

@Component({
    selector: 'category-list',
    template: `
              <h3><u>Categories</u></h3>
              <div>
                <ul>
                  <li *ngFor="#cat of categories">
                    <div>{{cat.name}}</div>
                  </li>
                </ul>
              </div>
              `
})

export class CategoryListComponent implements OnInit {
  categories: Category[];

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    this._dataService.getCategories().then(cats => this.categories = cats);
  }
}
