import {Component, OnInit} from 'angular2/core';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './app/templates/header.component.html'
})

export class HeaderComponent implements OnInit {
  constructor(private _dataService: DataService) {}

  ngOnInit() {
                // load the navbar
                window.google.identitytoolkit.signInButton(
                  '#navbar', // accepts any CSS selector
                  {
                    widgetUrl: "http://localhost:3000/signin.html",
                    signOutUrl: "/",
                    // Optional - Begin the sign-in flow in a popup window
                    //popupMode: true,

                    // Optional - Cookie name (default: gtoken)
                    //            NOTE: Also needs to be added to config of ‘widget
                    //                  page’. See below
                    //cookieName: ‘example_cookie’,
                  }
                )
            }
}
