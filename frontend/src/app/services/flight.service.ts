import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:3000/api/v1/flights';

@Injectable({
  	providedIn: 'root'
})
export class FlightService {

	constructor(private http: HttpClient) { }

  	getAll() {
    	return this.http.get(baseUrl);
	}

	get(id) {
    	return this.http.get(`${baseUrl}/${id}`);
  	}

  	create(data) {
    	return this.http.post(baseUrl, data);
  	}

	update(id, data) {
    	return this.http.put(`${baseUrl}/${id}`, data);
  	}

  	delete(id) {
    	return this.http.delete(`${baseUrl}/${id}`);
  	}

  	deleteAll() {
    	return this.http.delete(baseUrl);
  	}

  	findByCity(city) {
    	return this.http.get(`${baseUrl}?city=${city}`);
  	}  	
}