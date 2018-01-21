import { async, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthenticationService } from './authentication.service';
import { HelperService } from './../helper/helper.service';

import { HttpClientModule } from '@angular/common/http';

describe('AuthenticationService', () => {
    let service: AuthenticationService;

    beforeEach(async(() => {
            TestBed.configureTestingModule({
              providers: [
                  {provide: 'helperService', useClass: HelperService},
                  AuthenticationService
              ],
              imports: [
                  RouterTestingModule,
                  HttpClientModule
              ]
            });
      }));

    beforeEach(inject([AuthenticationService], s => { service = s; }));

    it('should create service', () => {
        expect(service).toBeDefined();
    });
});
