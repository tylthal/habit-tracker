import {Component, OnInit, ElementRef} from 'angular2/core';
import {DataService} from '../../services/data.service';
import {Category} from '../../classes/category';
import {CategoryComponent} from './category.component';
import {CategoryForm} from './categoryform.component';

@Component({
    selector: 'category-list',
    templateUrl: './app/templates/category/categorylist.component.html',
    styles: [
      `
        .addbutton {
          width: 40px;
          float: right;
          margin-right: 5px;
        }
      `
    ],
    directives: [CategoryComponent, CategoryForm]
})

export class CategoryListComponent implements OnInit {
  categories: Category[];
  selected: Category;
  showCatForm: boolean = false;

  constructor(private _dataService: DataService, private _elementRef: ElementRef) {
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

  toggleCategoryForm() {
    this.showCatForm = !this.showCatForm;
  }

  categoryFormClosed() {
    this.showCatForm = false;
  }
}
