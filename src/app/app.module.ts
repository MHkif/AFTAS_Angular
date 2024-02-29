import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PodiumsComponent } from './podiums/podiums.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './core/components/pages/home/home.component';
import { LoginComponent } from './core/components/pages/login/login.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { RegisterComponent } from './core/components/pages/register/register.component';
import { appReducer } from './core/store/state/app.state';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { UserEffect } from './core/store/user/user.effect';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CreateCompetitionComponent } from './create-competition/create-competition.component';
import { CreateMemberComponent } from './create-member/create-member.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { CompetitionGridComponent } from './shared/competition-grid/competition-grid.component';
import { DashboardComponent } from './core/modules/manager/components/dashboard/dashboard.component';
import { NotActivatedComponent } from './core/components/pages/not-activated/not-activated.component';
import { CompetitionsComponent } from './core/components/pages/competitions/competitions.component';
import { DashboardLayoutComponent } from './shared/layouts/dashboard-layout/dashboard-layout.component';
import { ManagerModule } from './core/modules/manager/manager.module';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { CompetationComponent } from './core/components/pages/competation/competation.component';

@NgModule({
  declarations: [
    AppComponent,
    CompetitionsComponent,
    PodiumsComponent,
    CompetitionsComponent,
    NavbarComponent,
    HomeComponent,
    CreateCompetitionComponent,
    CreateMemberComponent,
    AuthLayoutComponent,
    LoginComponent,
    RegisterComponent,
    MainLayoutComponent,
    CompetitionGridComponent,
    DashboardComponent,
    NotActivatedComponent,
    DashboardLayoutComponent,
    CompetationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ManagerModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([UserEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      autoPause: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
