import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { PageCompetition } from 'src/app/core/models/competition.model';
import { CompetitionService } from 'src/app/core/services/competition/competition-service.service';
import { UserService } from 'src/app/core/services/memeber/user.service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css'],
})
export class CompetitionsComponent {
  competitions!: PageCompetition;
  errorMsg!: string;
  currentPage!: number;
  size!: number;

  constructor(
    private service: CompetitionService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = params['page'] || 1;
      this.size = params['size'] || 5;
      this.getAllCompetitions(this.currentPage - 1, this.size);
    });
  }

  getAllCompetitions(page: number, size: number) {
    this.service.getCompetitions(page, size).subscribe({
      next: (res) => {
        this.competitions = res.data.response;
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

  navigateToAdminCompetitions(page: any): void {
    const queryParams = { page: page }; // Assuming this.page is your parameter value
    this.router.navigate(['admin/competitions'], { queryParams: queryParams });
  }
}
