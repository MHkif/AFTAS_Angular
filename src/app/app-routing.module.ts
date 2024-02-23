import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateCompetitionComponent } from './create-competition/create-competition.component';
import { CompetitionComponent } from './competition/competition.component';
import { LoginComponent } from './shared/members/auth/login/login.component';
import { RegisterComponent } from './shared/members/auth/register/register.component';
import { AuthGuard } from './guards/users/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: 'competitions',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },

  {
    path: '',
    redirectTo: 'competitions',
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
