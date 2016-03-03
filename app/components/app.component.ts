import {Component} from 'angular2/core';
import {DataService} from '../services/data.service';
import {HeaderComponent} from './header.component';

@Component({
    selector: 'my-app',
    templateUrl: './app/templates/app.component.html',
    styleUrls: [
      './app/styles/app.component.css'
    ],
    providers: [DataService],
    directives: [HeaderComponent]
})

export class AppComponent {
    constructor(private _dataService: DataService) { }
}
