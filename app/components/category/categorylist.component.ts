import {Component, DynamicComponentLoader, OnInit, ElementRef, ComponentRef, Injector} from 'angular2/core';
import {DataService} from '../../services/data.service';
import {Category} from '../../classes/category';
import {CategoryComponent} from './category.component';
import {CategoryForm} from './categoryform.component';

@Component({
    selector: 'category-list',
    template: `
          <div class="panel panel-default">
            <div class="panel-heading">
              <div class="row">
                <h3 class="panel-title col-xs-8">Categories</h3>
                <button class="btn btn-default col-xs-4 addbutton" (click)="showCategoryForm()">
                  <span class="glyphicon glyphicon-plus"></span>
                </button>
              </div>
            </div>
            <div #catForm></div>
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
  categoryForm: ComponentRef;

  constructor(private _dataService: DataService, private _dcl: DynamicComponentLoader, private _elementRef: ElementRef,
              private _injector: Injector) {
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

  showCategoryForm() {
    if(this.categoryForm) {
      this.categoryForm.dispose();
      this.categoryForm = undefined;
    }
    else {
      this._dcl.loadIntoLocation(CategoryForm, this._elementRef, "catForm")
        .then((compRef) => {
          this.categoryForm = compRef;
        });
      //this._dcl.loadAsRoot(CategoryForm, "body", this._injector)
    }
  }
}
