import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import {MemberDetailsComponent} from './member-details.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';

import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AppService} from "../app.service";
import {Team} from "../models/Team";
import {Member} from "../models";

// Bonus points!
describe('MemberDetailsComponent', () => {
    let component: MemberDetailsComponent;
    let fixture: ComponentFixture<MemberDetailsComponent>;
    let httpMock: HttpTestingController;
    let routerStub;

    let appService: AppService;

    beforeEach(async(() => {
        routerStub = {
            navigate: jasmine.createSpy('navigate'),
        };
        TestBed.configureTestingModule({
            declarations: [MemberDetailsComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                HttpClientTestingModule,
                RouterTestingModule
            ],
            providers: [
                HttpClient,
                FormBuilder,
                AppService,
                {provide: Router, useValue: routerStub},
                {provide: ActivatedRoute, useValue: {snapshot: {params: {id: 'new'}}}}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MemberDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        httpMock = getTestBed().get(HttpTestingController);
        appService = getTestBed().get(AppService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should retrieve team data', () => {
        component.memberId = undefined;
        component.getTeams = jasmine.createSpy('getTeams');
        component.getMember = jasmine.createSpy('getMember');
        component.ngOnInit();

        expect(component.getTeams).toHaveBeenCalled()
        expect(component.getMember).toHaveBeenCalledTimes(0);
    });

    it('should retrieve team data and member data', () => {
        component.memberId = 1;
        component.getTeams = jasmine.createSpy('getTeams');
        component.getMember = jasmine.createSpy('getMember');

        component.ngOnInit();

        expect(component.getTeams).toHaveBeenCalled()
        expect(component.getMember).toHaveBeenCalledWith(1);
    });

    it('should call onSubmit with a member id', () => {
        component.memberId = 1;
        component.memberForm.controls.firstName.setValue('First Name');
        component.memberForm.controls.lastName.setValue('Last Name');
        component.memberForm.controls.jobTitle.setValue('Job Title');
        component.memberForm.controls.team.setValue('Test Team Name');
        component.memberForm.controls.status.setValue("Active");

        component.onSubmit(component.memberForm);

        const req = httpMock.match(`http://localhost:8000/api/members/${component.memberId}`)[0];
        expect(req.request.method).toBe('PUT');
        req.flush({});

        expect(routerStub.navigate).toHaveBeenCalledWith(['/members']);
    });
it('should call onSubmit without a member id', () => {
        component.memberId = undefined;
        component.memberForm.controls.firstName.setValue('First Name');
        component.memberForm.controls.lastName.setValue('Last Name');
        component.memberForm.controls.jobTitle.setValue('Job Title');
        component.memberForm.controls.team.setValue('Test Team Name');
        component.memberForm.controls.status.setValue("Active");

        component.onSubmit(component.memberForm);

        const req = httpMock.match(`http://localhost:8000/api/members`)[0];
        expect(req.request.method).toBe('POST');
        req.flush({});

        expect(routerStub.navigate).toHaveBeenCalledWith(['/members']);
    });

    it('should call getMembers with an id', () => {
        const testMember: Member = {
            id: 1,
            firstName: 'First Name',
            lastName: 'Last Name',
            jobTitle: 'Job Title',
            team: 'Test Team Name',
            status: "Active"
        }

        component.getMember(testMember.id);

        const req = httpMock.match(`http://localhost:8000/api/members/${testMember.id}`)[0];
        expect(req.request.method).toBe('GET');
        req.flush(testMember);

        expect({id: testMember.id, ...component.memberForm.value}).toEqual(testMember)
    });

    it('should call getTeams', () => {
        const testTeams: Team[] = [{id: 1, teamName: 'Test Team Name'}];

       component.getTeams();

        const req = httpMock.match('http://localhost:8000/api/teams')[0];
        expect(req.request.method).toBe('GET');
        req.flush(testTeams);

        expect(component.teams).toEqual(testTeams);
    });
});
