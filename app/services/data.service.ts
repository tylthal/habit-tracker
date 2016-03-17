import {Injectable, EventEmitter} from 'angular2/core';
import {Category} from '../classes/category'

var CATS: Category[] = [
  {"id": 1, "name": "Home", "description": "Things to do around the house."},
  {"id": 2, "name": "Work", "description": "Working up the corporate ladder."},
  {"id": 3, "name": "Fun"},
]

@Injectable()

export class DataService {
  selectedCategory: Category = undefined;
  selectedChanged: EventEmitter<Category> = new EventEmitter<Category>();

  isLoggedIn() {
    // this really needs to be reworked into an async call that validates
    // the cookie on the server and creates a session
    var cookie = getCookie('gtoken');
    return cookie != undefined;
  }

  getCategories() {
    return Promise.resolve(CATS);
  }

  setSelectedCategory(cat: Category) {
    this.selectedCategory = cat;
    this.selectedChanged.emit(cat);
  }
}

//TODO: pull this into a utility class
function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    return decodeURI(dc.substring(begin + prefix.length, end));
}
