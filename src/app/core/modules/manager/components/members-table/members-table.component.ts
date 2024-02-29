import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { PageUsers } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/memeber/user.service';

@Component({
  selector: 'members-table',
  templateUrl: './members-table.component.html',
  styleUrls: ['./members-table.component.css'],
})
export class MembersTableComponent implements OnInit {
  members!: PageUsers;
  errorMsg!: string;
  currentPage!: number;
  size!: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: UserService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = params['page'] || 1;
      this.size = params['size'] || 5;
      this.getAllMembers(this.currentPage - 1, this.size);
    });
  }

  getAllMembers(page: number, size: number) {
    this.service.getAllUser(page, size).subscribe({
      next: (res) => {
        this.members = res.data.response;
        console.info(' All Users : ', this.members);
      },
      error: (err) => {
        console.error('Error in get All Users : ', err);
        this.errorMsg = err.message;
        return throwError(() => err);
      },
    });
  }

  getTotalPagesArray(listUsers: PageUsers): number[] {
    return Array.from(
      { length: listUsers.totalPages },
      (_, index) => index + 1
    );
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  navigateToPage(page: any): void {
    const queryParams = { page: page };
    this.router.navigate(['dashboard/members'], { queryParams: queryParams });
  }

  activateMember(identityNumber: string) {
    this.service.activateUser(identityNumber).subscribe({
      next: (res) => {
        console.info(' Is User Activated : ', res.data.response);
        alert(' Is User Activated : ' + res.data.response);
        location.reload;
      },
      error: (err) => {
        console.error(
          'Error while trying activating user : ',
          err.error.message
        );
        alert('Error while trying activating user : ' + err.error.message);
        this.errorMsg = err.message;
        return throwError(() => err);
      },
    });
  }
}
