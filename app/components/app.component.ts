import {Component, OnInit} from 'angular2/core';
import {DataService} from '../services/data.service';
import {HeaderComponent} from './header.component';
import {SplashComponent} from './splash.component';
import {DashboardComponent} from './dashboard.component';

@Component({
    selector: 'my-app',
    templateUrl: './app/templates/app.component.html',
    styleUrls: [
      './app/styles/app.component.css'
    ],
    providers: [DataService],
    directives: [HeaderComponent, SplashComponent, DashboardComponent]
})

export class AppComponent implements OnInit {
    loggedIn = false;

    constructor(private _dataService: DataService) { }

    ngOnInit() {
      this.loggedIn = this._dataService.isLoggedIn();
    }
}
