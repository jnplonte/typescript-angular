import { Component, OnInit, Inject } from '@angular/core';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    userData: Object = {};

    constructor(@Inject('helperService') private helperService: any) {

    }

    ngOnInit() {
        if (this.helperService.readStorage('auth-token')) {
            this.userData = this.helperService.readJwtToken(this.helperService.readStorage('auth-token'));
        }
    }
}
