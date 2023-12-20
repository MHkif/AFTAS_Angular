import { Component, OnInit } from '@angular/core';
import { PageCompetition } from '../models/competition.model';
import { Observable, catchError, throwError } from 'rxjs';
import { CompetitionService } from '../services/competition/competition-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from '../services/memeber/member.service';
import { Member } from '../models/member.model';
import { RankingService } from '../services/ranking/ranking.service';
import { Ranking } from '../models/ranking.model';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css'],
})
export class CompetitionsComponent implements OnInit {
  competitions!: Observable<PageCompetition>;
  memberForm!: FormGroup;
  errorMsg!: string;
  currentPage!: number;
  size!: number;
  showModal = false;
  isNew = false;
  checkMember = false;

  constructor(
    private fb: FormBuilder,
    private service: CompetitionService,
    private route: ActivatedRoute,
    private router:Router,
    private memberService: MemberService,
    private rankingService: RankingService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = params['page'] || 1;
      this.size = params['size'] || 5;
      this.getAllCompetitions(this.currentPage - 1, this.size);
    });
    this.memberForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      familtyName: this.fb.control('', [Validators.required]),
      identityDocument: this.fb.control('', [Validators.required]),
      identityNumber: this.fb.control('', [Validators.required]),
      nationality: this.fb.control('', [Validators.required]),
    });
  }

  handleExistingMember(member: Member, competitionCode: string): void {
    console.log('Member:', member);

    const ranking = {
      id: {
        competitionCode: competitionCode,
        memberId: member.num,
      },
      competition: {
        code: competitionCode,
      },
      member: {
        num: member.num,
      },
      rank: 0,
      score: 0,
    };
    this.rankingService.save(ranking).subscribe({
      next: (rankingRes: Ranking) => {
        alert('Member has been registred to competition successfully!');
        alert(JSON.stringify(rankingRes));

        this.showModal = false;
      },
      error: (err: any) => {
        console.error(err);
        alert('Error registring a member into a competition : ' + err);
      },
    });
  }

  handleNewMember(competitionCode: string): void {
    this.checkMember = true;

    const member = {
      name: this.memberForm.value.name,
      familtyName: this.memberForm.value.familtyName,
      identityDocument: this.memberForm.value.identityDocument,
      identityNumber: this.memberForm.value.identityNumber,
      nationality: this.memberForm.value.nationality,
    };

    this.memberService.save(member).subscribe({
      next: (memberRes: Member) => {
        alert('Member saved successfully!');
        alert(JSON.stringify(memberRes));

        const ranking = {
          id: {
            competitionCode: competitionCode,
            memberId: memberRes.num,
          },
          competition: {
            code: competitionCode,
          },
          member: {
            num: memberRes.num,
          },
          rank: 0,
          score: 0,
        };
        this.rankingService.save(ranking).subscribe({
          next: (rankingRes: Ranking) => {
            alert('Member has been registred to competition successfully!');
            alert(JSON.stringify(rankingRes));

            this.showModal = false;
          },
          error: (err: any) => {
            console.error(err);
            alert('Error registring a member into a competition : ' + err);
          },
        });
      },
      error: (err: any) => {
        console.error(err);
        alert('Error saving member: ' + err);
      },
    });
  }

  // Modify onSubmit function to use the separated logic
  onSubmit(competitionCode: string): void {
    this.memberService
      .checkMember(this.memberForm.value.identityNumber)
      .subscribe({
        next: (member: Member) => {
          this.handleExistingMember(member, competitionCode);
        },
        error: (error) => {
          alert('Member Not Existed, Try To Create him');
          this.checkMember = true;
        },
      });
  }
  getAllCompetitions(page: number, size: number) {
    this.competitions = this.service.getCompetitions(page, size).pipe(
      catchError((err) => {
        console.error('Error in get All Competitions : ', err);
        this.errorMsg = err.message;
        return throwError(() => err);
      })
    );
  }

  getTotalPagesArray(listCompetition: PageCompetition): number[] {
    return Array.from(
      { length: listCompetition.totalPages },
      (_, index) => index + 1
    );
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  navigateToAdminCompetitions(page:any): void {
    const queryParams = { page: page }; // Assuming this.page is your parameter value
    this.router.navigate(['admin/competitions'], { queryParams: queryParams });
  }
}
