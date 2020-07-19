import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  	selector: 'app-flights-list',
  	templateUrl: './flights-list.component.html',
  	styleUrls: ['./flights-list.component.css']
})
export class FlightsListComponent implements OnInit {

	flights: any;
  	currentFlight = null;
  	currentIndex = -1;
  	city = '';

  	constructor(private flightService: FlightService) { }

  	ngOnInit(): void {
  		this.retrieveFlights();
  	}

  	retrieveFlights() {
    	this.flightService.getAll()
      		.subscribe(
        		data => {
          			this.flights = data;
          			console.log(data);
        },
        error => {
          	console.log(error);
        });
  	}

  	refreshList() {
    	this.retrieveFlights();
    	this.currentFlight = null;
    	this.currentIndex = -1;
  	}

  	setActiveFlight(flight, index) {
    	this.currentFlight = flight;
    	this.currentIndex = index;
  	}

  	removeAllFlights() {
    	this.flightService.deleteAll()
      		.subscribe(
        		response => {
          		console.log(response);
          		this.retrieveFlights();
        	},
        	error => {
          		console.log(error);
        });
  	}

  	searchCity() {
    this.flightService.findByCity(this.city)
      	.subscribe(
        	data => {
          	this.flights = data;
          	console.log(data);
        	},
        	error => {
          		console.log(error);
        });
  	}
}
