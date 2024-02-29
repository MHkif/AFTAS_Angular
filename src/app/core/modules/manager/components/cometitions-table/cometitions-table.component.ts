import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { PageCompetition } from 'src/app/core/models/competition.model';
import { Ranking } from 'src/app/core/models/ranking.model';
import { User } from 'src/app/core/models/user.model';
import { CompetitionService } from 'src/app/core/services/competition/competition-service.service';
import { UserService } from 'src/app/core/services/memeber/user.service';
import { RankingService } from 'src/app/core/services/ranking/ranking.service';

@Component({
  selector: 'app-cometitions-table',
  templateUrl: './cometitions-table.component.html',
  styleUrls: ['./cometitions-table.component.css'],
})
export class CometitionsTableComponent implements OnInit {
  competitions!: PageCompetition;
  searchUsers!: FormGroup;
  filtredUsers: Array<string> = [];
  user!: User | null;
  errorMsg!: string;
  currentPage!: number;
  size!: number;
  showModal = false;
  showCreate = false;
  competitionForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: CompetitionService,
    private userService: UserService,
    private rankingService: RankingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = params['page'] || 1;
      this.size = params['size'] || 5;
      this.getAllCompetitions(this.currentPage - 1, this.size);
    });

    this.competitionForm = this.fb.group({
      location: this.fb.control('', [Validators.required]),
      amount: this.fb.control(0, [Validators.required]),
      date: this.fb.control('', [Validators.required]),
      startTime: this.fb.control('', [Validators.required]),
      endTime: this.fb.control('', [Validators.required]),
    });

    this.searchUsers = this.fb.group({
      identityNumber: this.fb.control('', [Validators.required]),
    });

    this.searchUsers
      .get('identityNumber')
      ?.valueChanges.subscribe((response) => {
        console.log('Data :', response);

        this.userService.getUserByIdNum(response).subscribe({
          next: (res) => {
            this.user = res.data.response;
          },
        });
      });
  }

  getAllCompetitions(page: number, size: number) {
    this.service.getCompetitions(page, size).subscribe({
      next: (res) => {
        this.competitions = res.data.response;
        console.info('All Competitions : ', this.competitions);
      },
      error: (err) => {
        console.error('Error in get All Competitions : ', err);
        this.errorMsg = err.message;
        return throwError(() => err);
      },
    });
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

  navigateToPage(page: any): void {
    const queryParams = { page: page };
    this.router.navigate(['admin/competitions'], { queryParams: queryParams });
  }
  toggleModal() {
    this.showModal = !this.showModal;
  }

  togglecreateModal() {
    this.showCreate = !this.showCreate;
  }

  OnCreate() {
    let json = {
      location: this.competitionForm.value.location,
      amount: this.competitionForm.value.amount,
      date: this.competitionForm.value.date,
      startTime: this.competitionForm.value.startTime,
      endTime: this.competitionForm.value.endTime,
    };

    this.service.saveCompetition(json).subscribe({
      next: (response) => {
        alert('Competition saved successfully!');
        location.reload();
      },
      error: (err) => {
        alert('Competition : ' + err.error.message);
      },
    });
  }
  onSearch(competitionCode: string): void {
    const ranking = {
      id: {
        competitionCode: competitionCode,
        userId: this.user?.num,
      },
      competition: {
        code: competitionCode,
      },
      user: {
        num: this.user?.num,
      },
    };

    this.rankingService.save(ranking).subscribe({
      next: (rankingRes) => {
        alert('Member has been registred to competition successfully!');
        this.showModal = false;
      },
      error: (err) => {
        console.error(err);
        alert(
          'Error registring a member into a competition : ' + err.error.message
        );
      },
    });
    // this.userService.getUserByIdNum(id).subscribe({
    //   next: (res) => {
    //     this.user = res.data.response;
    //     alert(JSON.stringify(this.user));
    //   },
    //   error: (error) => {
    //     this.user = null;

    //     console.error('ERR User : ', error);
    //     alert(
    //       'No User Found with the given Identity number ' +
    //         this.searchUsers.value.identityNumber
    //     );
    //   },
    // });
  }
}
