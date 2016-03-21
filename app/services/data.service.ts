import {Injectable, EventEmitter} from 'angular2/core';
import {Category} from '../classes/category';
import {Habit} from '../classes/habit';

@Injectable()

export class DataService {
  selectedChanged: EventEmitter<Category> = new EventEmitter<Category>();

  selectedCategory: Category = undefined;
  categories: Category[] = new Array<Category>();

  constructor() {
    var cat1 = new Category("Home", "Things to do around the house.");
    cat1.habits.push(new Habit("Work Out", "Run 3 miles.", new Date()));
    cat1.habits.push(new Habit("Get up early", "", new Date()));
    var cat2 = new Category("Work", "Working up the corporate ladder");
    cat2.habits.push(new Habit("Inbox Zero", "Go through inbox", new Date()));
    this.categories.push(cat1);
    this.categories.push(cat2);
  }

  isLoggedIn() {
    // this really needs to be reworked into an async call that validates
    // the cookie on the server and creates a session
    var cookie = getCookie('gtoken');
    return cookie != undefined;
  }

  getCategories() : Promise<Category[]> {
    return Promise.resolve(this.categories);
  }

  setSelectedCategory(cat: Category) {
    this.selectedCategory = cat;
    this.selectedChanged.emit(cat);
  }

  addCategory(name: string, description?: string) {
    console.log(name);
    this.categories.push(new Category(name, description));
  }

  getHabits(category: Category) : Promise<Habit[]> {
    for(var i = 0; i < this.categories.length; i++) {
      if (this.categories[i] === category) {
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
