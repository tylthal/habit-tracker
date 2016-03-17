import {Component, Input} from 'angular2/core';
import {Category} from '../../classes/category';

@Component({
  selector: 'category',
  template: `
              <div *ngIf="category">
                {{category.name}}
              </div>
            `
})

export class CategoryComponent {
  @Input() category: Category;
}
