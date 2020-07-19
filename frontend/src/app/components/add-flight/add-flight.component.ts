import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  	selector: 'app-add-flight',
  	templateUrl: './add-flight.component.html',
  	styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {
	flight = {
    	city		  : '',
    	arrival       : '',
    	departureDate : '',
    	arrivalDate   : '',
    	published     : false
  	};
  	submitted = false;

  	constructor(private flightService: FlightService) { }

  	ngOnInit(): void {
  	}

  	saveFlight() {
    	const data = {
      		city	      : this.flight.city,
      		arrival       : this.flight.arrival,
      		departureDate : this.flight.departureDate,
      		arrivalDate   : this.flight.arrivalDate
    	};

    	this.flightService.create(data)
      		.subscribe(
        	response => {
          		console.log(response);
          		this.submitted = true;
        },
        error => {
          	console.log(error);
        });
  	}

  	newFlight() {
    	this.submitted = false;
    	this.flight = {
      		city		  : '',
    		arrival       : '',
    		departureDate : '',
    		arrivalDate   : '',
      		published	  : false
    };
  }

}