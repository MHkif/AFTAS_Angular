import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { PageCompetition } from 'src/app/core/models/competition.model';
import { CompetitionService } from 'src/app/core/services/competition/competition-service.service';

@Component({
  selector: 'competition-grid',
  templateUrl: './competition-grid.component.html',
  styleUrls: ['./competition-grid.component.css'],
})
export class CompetitionGridComponent {
  @Input() competitions!: PageCompetition;
  errorMsg!: string;
  currentPage!: number;
  size!: number;
  showModal = false;

  constructor(
    private service: CompetitionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}



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
