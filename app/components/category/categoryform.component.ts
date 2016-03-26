import {Component, Output, EventEmitter} from 'angular2/core';
import {NgForm} from 'angular2/common'
import {Category} from '../../classes/category';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'category-form',
  templateUrl: './app/templates/category/categoryform.component.html',
})

export class CategoryForm {
  @Output() closed = new EventEmitter();
  category: Category = new Category("", "");

  constructor(private _dataService: DataService){
  }

  onSubmit() {
    this._dataService.addCategory(this.category.name, this.category.description);
    this.closed.emit({});
  }
}
