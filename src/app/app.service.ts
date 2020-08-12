import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Member, Team} from "./models";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AppService {
    api = 'http://localhost:8000/api';
    username: string;

    constructor(private http: HttpClient) {
    }

    // Returns all members
    getMembers(id?: number): Observable<Member | Member[]> {
        const idToGet: string = id !== undefined ? `/${id}` : '';
        return this.http
            .get<Member | Member[]>(`${this.api}/members${idToGet}`)
            .pipe(catchError(this.handleError));
    }

    postMember(member: Member): Observable<Object> {
        return this.http
            .post(`${this.api}/members`, member)
            .pipe(catchError(this.handleError));
    }

    putMember(member: Member): Observable<Object> {
        return this.http
            .put(`${this.api}/members/${member.id}`, member)
            .pipe(catchError(this.handleError));
    }

    setUsername(name: string): void {
        this.username = name;
    }

    getTeams(): Observable<Team[]> {
        return this.http.get<Team[]>(`${this.api}/teams`).pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` + `body was: ${error.error}`
            );
        }
        return [];
    }
}
