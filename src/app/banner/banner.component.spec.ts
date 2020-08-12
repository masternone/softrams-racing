import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BannerComponent} from './banner.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute, Router} from "@angular/router";
import {of} from "rxjs";

describe('BannerComponent', () => {
    let component: BannerComponent;
    let fixture: ComponentFixture<BannerComponent>;
    let routerStub;

    beforeEach(async(() => {
        routerStub = {
            events: of(''),
            navigate: jasmine.createSpy('navigate'),
        };
        TestBed.configureTestingModule({
            declarations: [BannerComponent],
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                {provide: Router, useValue: routerStub},
                {provide: ActivatedRoute, useValue: {snapshot: {params: {id: 'new'}}}}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BannerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should clear local storage and navigate to login', () => {
        component.logout();
        expect(localStorage.getItem('username')).toBeNull();
        expect(routerStub.navigate).toHaveBeenCalledWith(['/login']);
    })
});
