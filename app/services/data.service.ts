import {Injectable} from 'angular2/core';
import {Category} from '../classes/category'

var CATS: Category[] = [
  {"id": 1, "name": "Home"},
  {"id": 2, "name": "Work"},
  {"id": 3, "name": "Fun"},
]

@Injectable()

export class DataService {
  selectedCategory: Category = undefined;

  isLoggedIn() {
    // this really needs to be reworked into an async call that validates
    // the cookie on the server and creates a session
    var cookie = getCookie('gtoken');
    return cookie != undefined;
  }

  getCategories() {
    setTimeout(function(){
      CATS.push({"id":4, "name":"Another one"})
    }, 5000);
    return Promise.resolve(CATS);
  }

}

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
