import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { PodiumsComponent } from './podiums/podiums.component';
import { CompetitionComponent } from './competition/competition.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { CreateCompetitionComponent } from './create-competition/create-competition.component';
import { CreateMemberComponent } from './create-member/create-member.component';
import { LoginComponent } from './shared/members/auth/login/login.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { RegisterComponent } from './shared/members/auth/register/register.component';
import { appReducer } from './store/state/app.state';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffect } from './store/user/user.effect';

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
    AuthLayoutComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([UserEffect]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
