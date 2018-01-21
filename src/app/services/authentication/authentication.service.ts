import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, tap, map } from 'rxjs/operators';

import { ApiModel } from './../../models/api.model';
import { environment } from './../../../environments/environment';

const httpOptions: Object = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthenticationService {
    private url: string = '';

    constructor(private http: HttpClient, @Inject('helperService') private helperService: any) {
        this.url = environment.api.login;
    }

    login(username: string, password: string): Observable<ApiModel[]> {
        username = this.helperService.cleanData(username);
        password = this.helperService.cleanData(password);

        return this.http.post<ApiModel[]>(this.url, {username: username, password: username}, httpOptions).pipe(
            map((result) => {
                if (typeof(result) !== 'undefined' && result['status'] === 'success' ) {
                    return this.helperService.createStorage('auth-token', this.helperService.createJwtToken(result['data'][0]));
                }
            }),
            catchError(this.helperService.handleObservableError('login', false))
        );
    }

    logout() {
        return this.helperService.clearStorage();
    }

    get isLogin() {
        return (this.helperService.readStorage('auth-token')) ? true : false;
    }
}
