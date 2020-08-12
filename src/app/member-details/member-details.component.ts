import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../app.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Member, Team} from "../models";

@Component({
    selector: 'app-member-details',
    templateUrl: './member-details.component.html',
    styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
    memberId?: number;
    memberModel: Member;
    memberForm: FormGroup = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        jobTitle: ['', Validators.required],
        team: ['', Validators.required],
        status: ['', Validators.required]
    })


    submitted = false;
    alertType: String;
    alertMessage: String;
    teams: Team[] = [];

    constructor(private fb: FormBuilder, private appService: AppService, private router: Router, private route: ActivatedRoute) {
        this.memberId = route.snapshot.params.id !== 'new' ? Number(route.snapshot.params.id) : undefined;
    }

    ngOnInit() {
        this.getTeams();
        if (this.memberId) {
            this.getMember(this.memberId);
        }
    }

    // TODO: Add member to members
    onSubmit(form: FormGroup) {
        this.submitted = true;
        this.memberModel = form.value;
        if (this.memberId) {
            this.appService.putMember({id: this.memberId, ...this.memberModel})
                .subscribe(() => {
                    this.router.navigate(['/members'])
                });
        } else {
            this.appService.postMember(this.memberModel)
                .subscribe(() => {
                    this.router.navigate(['/members'])
                });
        }
    }

    getMember(memberId: number): void {
        this.appService.getMembers(memberId).subscribe((member: Member) => {
            this.memberForm.controls.firstName.setValue(member.firstName);
            this.memberForm.controls.lastName.setValue(member.lastName);
            this.memberForm.controls.jobTitle.setValue(member.jobTitle);
            this.memberForm.controls.team.setValue(member.team);
            this.memberForm.controls.status.setValue(member.status);
        });
    }

    getTeams(): void {
        this.appService.getTeams().subscribe(teams => this.teams = teams);
    }
}
