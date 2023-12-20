import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetitionsComponent } from './competitions/competitions.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreateCompetitionComponent } from './create-competition/create-competition.component';
import { CompetitionComponent } from './competition/competition.component';

const routes: Routes = [
  {
    path: 'admin/competitions',
    component: HomeComponent,
  },

  {
    path: '',
    redirectTo: 'admin/competitions',
    pathMatch: 'full',
  },
  {
    path: 'admin/competitions/create',
    component: CreateCompetitionComponent,
  },
  {
    path: 'admin/competitions/:code',
    component: CompetitionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
