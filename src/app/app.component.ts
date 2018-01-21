import { Component, Inject } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Title } from '@angular/platform-browser';

import { Router, NavigationEnd } from '@angular/router';

import { environment } from './../environments/environment';

@Component({
    selector: 'app-logflows',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})

export class AppComponent {
    appActive: boolean = true;

    constructor(private title: Title, private router: Router, @Inject('alertService') private alertService: any, @Inject('authenticationService') private authenticationService: any, private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
        this.setIcons();
        this.setTitle();
    }

    private setTitle() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                const titleString: string = this.getTitle(this.router.routerState, this.router.routerState.root).join('-');
                if (titleString) {
                   this.title.setTitle(titleString);
                }
            }
        });
    }

    private getTitle(state: any, parent: any) {
        const data: any = [], companyName: string = environment.companyName;
        if (parent && parent.snapshot.data && parent.snapshot.data.title) {
            data.push(companyName + ' | ' + parent.snapshot.data.title);
        }

        if (state && parent) {
            data.push(... this.getTitle(state, state.firstChild(parent)));
        }

        return data;
    }

    private setIcons() {
        this.iconRegistry.addSvgIcon('menu', this.sanitizer.bypassSecurityTrustResourceUrl(require('./../assets/images/icons/menu.svg')));

        this.iconRegistry.addSvgIcon('error', this.sanitizer.bypassSecurityTrustResourceUrl(require('./../assets/images/icons/error.svg')));
        this.iconRegistry.addSvgIcon('warning', this.sanitizer.bypassSecurityTrustResourceUrl(require('./../assets/images/icons/warning.svg')));
        this.iconRegistry.addSvgIcon('success', this.sanitizer.bypassSecurityTrustResourceUrl(require('./../assets/images/icons/success.svg')));

        this.iconRegistry.addSvgIcon('more_vert', this.sanitizer.bypassSecurityTrustResourceUrl(require('./../assets/images/icons/more_vert.svg')));
        this.iconRegistry.addSvgIcon('face', this.sanitizer.bypassSecurityTrustResourceUrl(require('./../assets/images/icons/face.svg')));
        this.iconRegistry.addSvgIcon('help', this.sanitizer.bypassSecurityTrustResourceUrl(require('./../assets/images/icons/help.svg')));
        this.iconRegistry.addSvgIcon('exit', this.sanitizer.bypassSecurityTrustResourceUrl(require('./../assets/images/icons/exit.svg')));
    }
}
