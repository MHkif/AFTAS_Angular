import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { ManagerRoleGuard } from '../../guards/user/manager-role.guard';
import { IsActiveAccountGuard } from '../../guards/user/is-active-account.guard';
import { CometitionsTableComponent } from './components/cometitions-table/cometitions-table.component';
import { MembersTableComponent } from './components/members-table/members-table.component';
import { PodiumsTableComponent } from './components/podiums-table/podiums-table.component';

const routes: Routes = [
  {
    path: '',
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
        path: 'members',
        component: MembersTableComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
