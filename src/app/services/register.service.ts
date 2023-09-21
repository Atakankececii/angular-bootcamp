import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { RegisterRequestModel } from "../models/registerRequestModel";
import { RegisterResponseModel } from "../models/registerResponseModel";

@Injectable({
  providedIn:'root',
})

export class RegisterService{

  apiUrl : string = 'https://dummyjson.com/';
  constructor(
    private httpClient:HttpClient,
    private jwtService:JwtHelperService

  ){

  }


register(model:RegisterRequestModel): Observable<RegisterResponseModel>{
  return this.httpClient.post<RegisterResponseModel>(
    this.apiUrl+'users/add',
    model
  );

}


}
