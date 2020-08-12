import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let routerStub;

    beforeEach(async(() => {
        routerStub = {
            navigate: jasmine.createSpy('navigate'),
        };
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [ReactiveFormsModule, RouterModule, HttpClientModule],
            providers: [
                {provide: Router, useValue: routerStub},
                HttpClient
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should clear local storage and navigate to members', () => {
        component.loginForm.controls.username.setValue('test name')
        component.login();
        expect(localStorage.getItem('username')).toEqual('test name');
        expect(routerStub.navigate).toHaveBeenCalledWith(['/members']);
    })
});
