import {Injectable, EventEmitter} from 'angular2/core';
import {Category} from '../classes/category';
import {Habit} from '../classes/habit';

@Injectable()

export class DataService {
  selectedChanged: EventEmitter<Category> = new EventEmitter<Category>();
  selectedCategory: Category = undefined;
  categories: Category[];
  today: Date;
  user_id: string;

  constructor()
  {
    this.today = new Date();
    this.today.setHours(0);
    this.today.setMinutes(0);
    this.today.setSeconds(0);
    this.today.setMilliseconds(0);

    //this.categories = new Array<Category>();
    //var cat1 = new Category("Home", "Things to do around the house.");
    //cat1.habits.push(new Habit("Work Out", "Run 3 miles.", this.getDay(-2)));
    //cat1.habits.push(new Habit("Get up early", "", this.getDay(-2)));
    //var cat2 = new Category("Work", "Working up the corporate ladder");
    //cat2.habits.push(new Habit("Inbox Zero", "Go through inbox", this.getDay(-2)));
    //this.categories.push(cat1);
    //this.categories.push(cat2);
  }

  setSelectedCategory(cat: Category) {
    this.selectedCategory = cat;
    this.selectedChanged.emit(cat);
  }

  getDay(offsetFromToday: number) : Date {
    var day = new Date();
    day.setDate(this.today.getDate() + offsetFromToday);
    return day;
  }

  isLoggedIn(callback: Function) : boolean {
    var self = this;
    if(!getCookie('gtoken')) {
      return false;
    }

    $.get("validateuser", function(response: any) {
      if(callback) {
        if(response.valid) {
          self.user_id = response.user_id;
        }
        callback(response.valid);
      }
    });
  }

  getCategories() : Promise<Category[]> {
    if(this.categories) {
      return Promise.resolve(this.categories);
    } else {
      var self = this;
      return new Promise((resolve, reject) => {
        $.get("categories", function(response: any) {
          if(response) {
            self.categories = response;
          }
          resolve(self.categories);
        });
      });
    }
  }

  addCategory(name: string, description?: string) {
    var self = this;
    $.post('/category', {"name":name, "description":description}, function(response) {
      if(response.inserted) {
        self.categories.push(new Category(response.id, name, description));
      }
    })
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
