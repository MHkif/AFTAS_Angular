import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCompetitionComponent } from './create-competition/create-competition.component';
import { LoginComponent } from './core/components/pages/login/login.component';
import { RegisterComponent } from './core/components/pages/register/register.component';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { HomeComponent } from './core/components/pages/home/home.component';
import { NoAuthGuard } from './core/guards/auth/no-auth.guard';
import { IsActiveAccountGuard } from './core/guards/user/is-active-account.guard';
import { NotActivatedComponent } from './core/components/pages/not-activated/not-activated.component';
import { CompetitionsComponent } from './core/components/pages/competitions/competitions.component';
import { DashboardComponent } from './core/modules/manager/components/dashboard/dashboard.component';
import { ManagerRoleGuard } from './core/guards/user/manager-role.guard';
import { PodiumsTableComponent } from './core/modules/manager/components/podiums-table/podiums-table.component';
import { CometitionsTableComponent } from './core/modules/manager/components/cometitions-table/cometitions-table.component';
import { MembersTableComponent } from './core/modules/manager/components/members-table/members-table.component';
import { CompetationComponent } from './core/components/pages/competation/competation.component';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [NoAuthGuard],
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
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, ManagerRoleGuard, IsActiveAccountGuard],
    children: [
      {
        path: '',
        redirectTo: 'competitions',
        pathMatch: 'full',
      },
      {
        path: 'podiums',
        component: PodiumsTableComponent,
      },
      {
        path: 'competitions',
        component: CometitionsTableComponent,
      },
      {
        path: 'competitions/:code',
        component: CompetationComponent,
      },
      {
        path: 'members',
        component: MembersTableComponent,
      },
    ],
  },
  {
    path: 'account-not-activated',
    component: NotActivatedComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard, IsActiveAccountGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'competitions',
    component: CompetitionsComponent,
    canActivate: [AuthGuard, IsActiveAccountGuard],
  },

  {
    path: 'admin/competitions/:code',
    component: CompetitionsComponent,
  },
  // {
  //   path: 'dashboard',
  //   loadChildren: () =>
  //     import('./core/modules/manager/manager.module').then(
  //       (m) => m.ManagerModule
  //     ),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
