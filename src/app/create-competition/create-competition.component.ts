import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompetitionService } from '../services/competition/competition-service.service';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-create-competition',
  templateUrl: './create-competition.component.html',
  styleUrls: ['./create-competition.component.css']
})
export class CreateCompetitionComponent {
  competitionForm!: FormGroup;

  constructor( private fb: FormBuilder, private service: CompetitionService,  private router: Router) {}

  ngOnInit(){
    this.competitionForm = this.fb.group({
      code: this.fb.control('',[Validators.required]),
      location: this.fb.control('',[Validators.required]),
      amount: this.fb.control(0,[Validators.required]),
      date: this.fb.control('',[Validators.required]),
      startTime: this.fb.control('',[Validators.required]),
      endTime: this.fb.control('',[Validators.required]),
    })
  }

  
  onSubmit(): void {
    let json = {
      code: this.competitionForm.value.code,
      location : this.competitionForm.value.location,
      amount: this.competitionForm.value.amount,
      date: this.competitionForm.value.date,
      startTime: this.competitionForm.value.startTime,
      endTime: this.competitionForm.value.endTime
    };

    console.warn('Your form has been submitted', json);

    this.service.saveCompetition(json).subscribe(({
      next: (response) => {
        alert('Competition saved successfully!');
        alert(JSON.stringify(response));

       this.router.navigate(['/admin/competitions']);
      },
      error: (err: any) => {
        console.error('Error saving competition:', err);
      },
    }));
  }


}
