import {Injectable, EventEmitter} from 'angular2/core';
import {Category} from '../classes/category';
import {Habit} from '../classes/habit';

var CATS: Category[] = [
  {
    "id": 1,
    "name": "Home",
    "description": "Things to do around the house.",
    "habits": [
      {"id":1, "name":"Work out", "description": "Run 3 miles.", "currentWeek": [false, false, false, false, false, false, false]},
      {"id":2, "name":"Get up early", "description": "", "currentWeek": [false, false, false, false, false, false, false]},
    ]
  },
  {
    "id": 2,
    "name": "Work",
    "description": "Working up the corporate ladder.",
    "habits": [
      {"id":1, "name":"Inbox Zero", "description": "Go through inbox", "currentWeek": [false, false, false, false, false, false, false]},
    ]
  },
];

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

  getCategories() : Promise<Category[]> {
    return Promise.resolve(CATS);
  }

  setSelectedCategory(cat: Category) {
    this.selectedCategory = cat;
    this.selectedChanged.emit(cat);
  }

  addCategory(name: string, description?: string) {
    console.log(name);
    CATS.push({"id":0,"name":name,"description":description});
  }

  getHabits(category: Category) : Promise<Habit[]> {
    for(var i = 0; i < CATS.length; i++) {
      if (CATS[i] === category) {
        return Promise.resolve(category.habits);
      }
    }
    return Promise.resolve(undefined);
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
