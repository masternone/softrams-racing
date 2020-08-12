import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {Router} from '@angular/router';
import {Member} from "../models";

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
    members: Member[] = [];

    constructor(public appService: AppService, private router: Router) {
    }

    ngOnInit() {
        this.appService.getMembers().subscribe(members =>
            this.members = Array.isArray(members) ? members : [members]);
    }

    goToAddMemberForm() {
        this.router.navigate(['/member-details', 'new']).then();
    }

    editMemberByID(id: number) {
    }

    deleteMemberById(id: number) {
    }
}
