import { Component, OnInit } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Competition } from '../models/competition.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitionService } from '../services/competition/competition-service.service';
import { User } from '../models/user.model';
import { RankingService } from '../services/ranking/ranking.service';
import { Ranking, RankingRes } from '../models/ranking.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fish, PageFish } from '../models/fish.model';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css'],
})
export class CompetitionComponent implements OnInit {
  code!: string;
  competition!: Competition;
  participants!: Array<User>;
  errorMsg!: string;
  rankings!: Observable<Array<RankingRes>>;
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
      next: (competition: Competition) => {
        this.competition = competition;
      },
      error: (err: any) => {
        console.error(err);
      },
    });
    this.huntingForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      numberofFish: this.fb.control(1, [Validators.required]),
    });

    this.rankings = this.rankingService
      .getRankingsOfCompetition(this.code)
      .pipe(
        catchError((err) => {
          console.error('Error in get All Competitions : ', err);
          this.errorMsg = err.message;
          return throwError(() => err);
        })
      );
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
