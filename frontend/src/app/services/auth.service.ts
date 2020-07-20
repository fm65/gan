import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000/api/v1/';

const httpOptions = {
  	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  	providedIn: 'root'
})
export class AuthService {

	constructor(private http: HttpClient) { }

	login(credentials): Observable<any> {
    	return this.http.post(AUTH_API + 'signin', {
      	  email: credentials.email,
      	  password: credentials.password
    	}, httpOptions);
    }

    register(user): Observable<any> {
	    return this.http.post(AUTH_API + 'signup', {
	      firstName: user.firstName,
	      lastName: user.lastName,
	      email: user.email,
	      password: user.password
	    }, httpOptions);
  	}
}
