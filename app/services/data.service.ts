import {Injectable, EventEmitter} from 'angular2/core';
import {Category} from '../classes/category';
import {Habit} from '../classes/habit';

@Injectable()

export class DataService {
  selectedChanged: EventEmitter<Category> = new EventEmitter<Category>();

  selectedCategory: Category = undefined;
  categories: Category[] = new Array<Category>();
  today: Date;

  constructor()
  {
    this.today = new Date();
    var cat1 = new Category("Home", "Things to do around the house.");
    cat1.habits.push(new Habit("Work Out", "Run 3 miles.", this.getDay(-2)));
    cat1.habits.push(new Habit("Get up early", "", this.getDay(-2)));
    var cat2 = new Category("Work", "Working up the corporate ladder");
    cat2.habits.push(new Habit("Inbox Zero", "Go through inbox", this.getDay(-2)));
    this.categories.push(cat1);
    this.categories.push(cat2);
  }

  httpGetAsync(theUrl: string, callback: Function)
  {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200 && callback != null)
            callback(xmlHttp.responseText);
    }
    console.log("Calling " + theUrl);
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
  }

  getDay(offsetFromToday: number) : Date {
    var day = new Date();
    day.setDate(this.today.getDate() + offsetFromToday);
    return day;
  }

  isLoggedIn(callback: Function) : boolean {
    if(!getCookie('gtoken')) {
      return false;
    }
    this.httpGetAsync("validateuser", function(response: any) {
      if(callback) {
        response = JSON.parse(response);
        callback(response.valid);
        console.log(response.userid);
      }
    });
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
