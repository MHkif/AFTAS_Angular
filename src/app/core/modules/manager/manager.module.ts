import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { MembersTableComponent } from './components/members-table/members-table.component';
import { CometitionsTableComponent } from './components/cometitions-table/cometitions-table.component';
import { PodiumsTableComponent } from './components/podiums-table/podiums-table.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CometitionsTableComponent,
    MembersTableComponent,
    PodiumsTableComponent,
  ],
  imports: [CommonModule, ManagerRoutingModule, ReactiveFormsModule],
})
export class ManagerModule {}
