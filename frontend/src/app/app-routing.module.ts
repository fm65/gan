import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightsListComponent } from './components/flights-list/flights-list.component';
import { FlightDetailsComponent } from './components/flight-details/flight-details.component';
import { AddFlightComponent } from './components/add-flight/add-flight.component';


const routes: Routes = [
	{ path: '', redirectTo: 'flights', pathMatch: 'full' },
  	{ path: 'flights', component: FlightsListComponent },
  	{ path: 'flights/:id', component: FlightDetailsComponent },
  	{ path: 'add', component: AddFlightComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
