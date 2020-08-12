import {inject, TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth-guard.guard';
import {RouterTestingModule} from "@angular/router/testing";

describe('AuthGuardGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthGuard],
            imports: [RouterTestingModule.withRoutes([]),]
        });
    });

    it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
        localStorage.setItem('username', 'This is a name');
        expect(guard).toBeTruthy();
    }));
});
