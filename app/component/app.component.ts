import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    templateUrl: './app/template/app.component.html',
    styles:   [`
                #login {
                  float: right;
                }
              `]
})

export class AppComponent {
    title = 'Habit Tracker';
}
