import {getTestBed, inject, TestBed} from '@angular/core/testing';

import {AppService} from './app.service';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Team} from "./models";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('AppService', () => {
    let httpMock: HttpTestingController;
    let appService: AppService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AppService, HttpClient],
            imports: [HttpClientTestingModule]
        });
    });

    beforeEach(() => {
        httpMock = getTestBed().get(HttpTestingController);
        appService = getTestBed().get(AppService);
    })

    it('should be created', inject([AppService], (service: AppService) => {
        expect(service).toBeTruthy();
    }));

    it('should call getTeams', () => {
        const testTeams: Team[] = [{id: 1, teamName: 'Test Team Name'}];

        appService.getTeams().subscribe(teams => {
            expect(teams).toEqual(testTeams);
        });

        const req = httpMock.expectOne('http://localhost:8000/api/teams');
        expect(req.request.method).toBe('GET');
        req.flush(testTeams);
    });
});
