import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: `
              <div id="login">
                <div id="navbar"></div>
              </div>
              <h1>{{title}}</h1>
              `,
    styles:   [`
                #login {
                  float: right;
                }
              `]
})

export class AppComponent {
    title = 'Habit Tracker';
}
