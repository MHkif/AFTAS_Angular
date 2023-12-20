import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { PodiumsComponent } from './podiums/podiums.component';
import { CompetitionComponent } from './competition/competition.component';
import { NavbarComponent } from './navbar/navbar.component';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { CreateCompetitionComponent } from './create-competition/create-competition.component';
import { CreateMemberComponent } from './create-member/create-member.component';
import { MembersComponent } from './members/members.component';

@NgModule({
  declarations: [
    AppComponent,
    CompetitionsComponent,
    PodiumsComponent,
    CompetitionComponent,
    NavbarComponent,
    HomeComponent,
    CreateCompetitionComponent,
    CreateMemberComponent,
    MembersComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
