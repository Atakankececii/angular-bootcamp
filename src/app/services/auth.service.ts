import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequestModel } from '../models/loginRequestModel';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginResponseModel } from '../models/loginResponseModel';
import { RegisterRequestModel } from '../models/registerRequestModel';
import { RegisterResponseModel } from '../models/registerResponseModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = 'https://dummyjson.com/';
  constructor(
    private httpClient: HttpClient,
    private jwtService: JwtHelperService
  ) {}

  login(model: LoginRequestModel): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>(
      this.apiUrl + 'auth/login',
      model
    );
  }

  isAuthenticated(): boolean {
    let token = localStorage.getItem('token');
    if (!token) return false;
    try {
      let expired = this.jwtService.isTokenExpired(token);
      if (expired) return false;
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }
}
