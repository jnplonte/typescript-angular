import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MATERIAL_SANITY_CHECKS } from '@angular/material';

import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';

import { HelperService } from './services/helper/helper.service';
import { AlertService } from './services/alert/alert.service';
import { AuthenticationService } from './services/authentication/authentication.service';

import { AuthGuard } from './guards/auth.guard';
import { UnAuthGuard } from './guards/un-auth.guard';

import { LogInComponent } from './components/log-in/log-in.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AlertComponent } from './components/alert/alert.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { GuideComponent } from './components/guide/guide.component';
import { ProfileComponent } from './components/profile/profile.component';


const appRoutes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [AuthGuard], data: {title: 'Dashboard'}},
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: {title: 'Profile'}},
    { path: 'guide', component: GuideComponent, canActivate: [AuthGuard], data: {title: 'Guide'}},

    { path: 'log-in', component: LogInComponent, canActivate: [UnAuthGuard], data: {title: 'Log In'} },

    { path: '**', component: PageNotFoundComponent, data: {title: 'Page Not Found'} }
];

@NgModule({
  imports:      [ BrowserAnimationsModule,
                  BrowserModule,
                  MaterialModule,
                  HttpClientModule,
                  FormsModule,
                  ReactiveFormsModule,
                  HttpClientModule,
                  RouterModule.forRoot(appRoutes, { useHash: true }) ],
  declarations: [ AppComponent,
                  LogInComponent,
                  PageNotFoundComponent,
                  DashboardComponent,
                  AlertComponent,
                  ToolbarComponent,
                  GuideComponent,
                  ProfileComponent
                ],
  providers:    [ AuthGuard, UnAuthGuard, Title,
                  { provide: MATERIAL_SANITY_CHECKS,  useValue: false },
                  { provide: 'helperService', useClass: HelperService },
                  { provide: 'alertService', useClass: AlertService },
                  { provide: 'authenticationService', useClass: AuthenticationService }
                ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
