import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { Competition } from 'src/app/core/models/competition.model';
import { PageFish } from 'src/app/core/models/fish.model';
import { RankingRes } from 'src/app/core/models/ranking.model';
import { User } from 'src/app/core/models/user.model';
import { CompetitionService } from 'src/app/core/services/competition/competition-service.service';
import { RankingService } from 'src/app/core/services/ranking/ranking.service';

@Component({
  selector: 'app-competation',
  templateUrl: './competation.component.html',
  styleUrls: ['./competation.component.css'],
})
export class CompetationComponent {
  code!: string;
  competition!: Competition;
  participants!: Array<User>;
  errorMsg!: string;
  rankings!: Array<RankingRes>;
  showModal = false;
  huntingForm!: FormGroup;
  fishes!: Observable<PageFish>;

  constructor(
    private service: CompetitionService,
    private rankingService: RankingService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.code = params['code'];
    });

    this.service.getCompetition(this.code).subscribe({
      next: (res) => {
        this.competition = res.data.response;
      },
      error: (err: any) => {
        console.error(err);
      },
    });
    this.huntingForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      numberofFish: this.fb.control(1, [Validators.required]),
    });
    this.rankingService.getRankingsOfCompetition(this.code).subscribe({
      next: (res) => {
        this.rankings = res.data.response.content;
      },
      error: (err: any) => {
        console.error(err.error.message);
      },
    });

    this.getFishes();
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  getFishes() {
    this.fishes = this.service.getFish().pipe(
      catchError((err) => {
        console.error('Error in get All Competitions : ', err);
        this.errorMsg = err.message;
        return throwError(() => err);
      })
    );
  }

  onHunting(competitionCode: string, member: number): void {
    alert(this.huntingForm.value.name);
    let json = {
      member: {
        num: member,
      },
      competition: {
        code: competitionCode,
      },
      fish: {
        name: this.huntingForm.value.name,
      },
      nomberOfFish: this.huntingForm.value.nomberOfFish,
    };

    this.service.hunting(json).subscribe({
      next: (response) => {
        alert('Competition saved successfully!');
        alert(JSON.stringify(response));

        this.router.navigate(['/admin/competitions/' + competitionCode]);
      },
      error: (err: any) => {
        console.error('Error Hunting:', err);
      },
    });
  }
}
