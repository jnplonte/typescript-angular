import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AlertComponent } from './components/alert/alert.component';

import { AlertService } from './services/alert/alert.service';
import { HelperService } from './services/helper/helper.service';
import { AuthenticationService } from './services/authentication/authentication.service';

import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', function () {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [
              AppComponent,
              ToolbarComponent,
              AlertComponent
          ],
          providers: [
              {provide: 'alertService', useClass: AlertService},
              {provide: 'helperService', useClass: HelperService},
              {provide: 'authenticationService', useClass: AuthenticationService}
          ],
          imports: [
              RouterTestingModule,
              MaterialModule,
              HttpClientModule
          ]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    }));

    it('should create component', () => {
        expect(component).toBeDefined();
        expect(component.appActive).toBeTruthy();
    });
});
