import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { environment } from './../../../environments/environment';

import * as cryptoJS from 'crypto-js';
import * as jwt from 'angular2-jwt-simple';

@Injectable()
export class HelperService {

    toJson(jsonData: any) {
        let response: any = '';
        try {
            response = JSON.parse(jsonData);
        } catch (e) {
            response = jsonData;
        }
        return response;
    }

    toString(jsonData: any) {
        let response: any = '';
        if (typeof(jsonData) === 'object') {
            try {
              response = JSON.stringify(jsonData);
            } catch (e) {
              response = jsonData;
            }
        } else {
            response = jsonData;
        }
        return response;
    }

    createStorage(name: string, value: any, param: string = 'session') {
      let returnValue: boolean = false;

      if (typeof(localStorage) !== 'undefined') {
          switch (param) {
              case 'local':
                  localStorage.setItem(name, value);
                  break;
              case 'session':
                  sessionStorage.setItem(name, value);
                  break;
              default:
                  localStorage.setItem(name, value);
          }
          returnValue = true;
      }

      return returnValue;
    }

    readStorage(name: string, param: string = 'session') {
        let returnValue: any = '';
        if (typeof(localStorage) !== 'undefined') {
            switch (param) {
                case 'local':
                    returnValue = localStorage.getItem(name);
                    break;
                case 'session':
                    returnValue = sessionStorage.getItem(name);
                    break;
                default:
                    returnValue = localStorage.getItem(name);
            }
        } else {
            returnValue = '';
        }

        return returnValue;
    }

    eraseStorage(name: string, param: string = 'session') {
        let returnValue: boolean = false;
        if (typeof(localStorage) !== 'undefined') {
            switch (param) {
                case 'local':
                    localStorage.removeItem(name);
                break;
                case 'session':
                    sessionStorage.removeItem(name);
                break;
                default:
                    localStorage.removeItem(name);
            }
            returnValue = true;
        }

        return returnValue;
    }

    clearStorage(param: string = 'session') {
        let returnValue: boolean = false;
        if (typeof(localStorage) !== 'undefined') {
            switch (param) {
                case 'local':
                    localStorage.clear();
                break;
                case 'session':
                    sessionStorage.clear();
                break;
                default:
                    localStorage.clear(); sessionStorage.clear();
            }
            returnValue = true;
        }

        return returnValue;
    }

    formatDate(date: Date) {
        let month: string = (date.getMonth() + 1).toString(), day: string = date.getDate().toString();

        const year: string = date.getFullYear().toString();

        if (month.length < 2) { month = '0' + month; }
        if (day.length < 2) { day = '0' + day; }

        return [month, day, year].join('-');
    }

    cleanData(data: any) {
        if (typeof(data) === 'object') {
            data.forEach((value, key) => {
                if (typeof(value) === 'object') {
                    this.cleanData(value);
                } else {
                    if (typeof(value.replace) !== 'undefined') {
                        data[key] = value.replace(/[^A-Za-z0-9 @._,-]/g, '').trim();
                    }
                }
            });
            return data;
        } else {
            if (typeof(data.replace) !== 'undefined') {
                return data.replace(/[^A-Za-z0-9 @._,-]/g, '').trim();
            } else {
                return data;
            }
        }
    }

    handleObservableError<T> (operation: string = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          return of(result as T);
        };
    }

    createJwtToken(userInformation: Object = {}) {
        const jwtToken: String = jwt.encode(userInformation, cryptoJS.MD5(environment.secretKey).toString());
        return jwtToken;
    }

    readJwtToken(jwtToken: String = '') {
        const userInformation: Object = jwt.decode(jwtToken, cryptoJS.MD5(environment.secretKey).toString());
        return userInformation;
    }
}
