import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.scss']
})

export class LogInComponent implements OnInit {
    loading: boolean = false;
    username: String = '';
    password: String = '';

    constructor(@Inject('helperService') private helperService: any, @Inject('authenticationService') private authenticationService: any, @Inject('alertService') private alertService: any, private router: Router) {

    }

    ngOnInit() {
        this.authenticationService.logout();
    }

    onLogIn() {
        this.loading = true;

        this.authenticationService.login(this.username, this.password).subscribe((result) => {
            if (result) {
                this.router.navigate(['/']).then(() => {
                    this.alertService.success('login success');
                });
            } else {
                this.alertService.error('invalid username or password');
                this.loading = false;
            }
        });
    }
}
