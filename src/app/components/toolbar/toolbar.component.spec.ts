import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ToolbarComponent } from './toolbar.component';

import { AlertService } from './../../services/alert/alert.service';
import { HelperService } from './../../services/helper/helper.service';
import { AuthenticationService } from './../../services/authentication/authentication.service';

import { MaterialModule } from './../../material.module';
import { HttpClientModule } from '@angular/common/http';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarComponent ],
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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });
});
