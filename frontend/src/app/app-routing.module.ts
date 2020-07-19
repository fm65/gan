import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';

import { FlightsListComponent } from './components/flights-list/flights-list.component';
import { FlightDetailsComponent } from './components/flight-details/flight-details.component';
import { AddFlightComponent } from './components/add-flight/add-flight.component';



const routes: Routes = [
  	{ path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'user', component: BoardUserComponent },
    { path: 'mod', component: BoardModeratorComponent },
    { path: 'admin', component: BoardAdminComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
  	{ path: 'flights', component: FlightsListComponent },
  	{ path: 'flights/:id', component: FlightDetailsComponent },
  	{ path: 'add', component: AddFlightComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
