import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from "rxjs/operators";

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
    onMemberDetails = false;

    constructor(public appService: AppService, private router: Router, route: ActivatedRoute) {
        router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event: NavigationEnd) => {
            this.onMemberDetails = event.url.includes('member-details');
        });
    }

    ngOnInit() {
    }

    logout() {
        this.appService.username = '';
        localStorage.removeItem('username');
        this.router.navigate(['/login']);
    }
}
