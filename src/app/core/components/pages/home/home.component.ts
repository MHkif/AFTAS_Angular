import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { PageCompetition } from 'src/app/core/models/competition.model';
import { CompetitionService } from 'src/app/core/services/competition/competition-service.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  competitions!: PageCompetition;
  errorMsg!: string;
  currentPage!: number;
  size!: number;
  showModal = false;

  constructor(
    private service: CompetitionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      let currentPage = params['page'] || 1;
      let size = params['size'] || 5;
      this.getAllCompetitions(currentPage - 1, size);
    });
  }

  getAllCompetitions(page: number, size: number) {
    this.service.getCompetitions(page, size).subscribe({
      next: (res) => {
        this.competitions = res.data.response;
        console.log('Competition : ', res.data.response.content);
      },
      error: (err) => {
        console.error('Error in get All Competitions : ', err);
        //this.errorMsg = err.message;
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
