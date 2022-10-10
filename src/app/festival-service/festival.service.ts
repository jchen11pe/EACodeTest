import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MusicFestival } from './festival-model';

const httpOptions = {

  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class FestivalService {

  private errorMsg = 'Error in service method -- ';
  constructor(private http: HttpClient) {}

  public getJSON(): Observable<any> {
    return this.http.get("./assets/auth.clientConfiguration.json");
  }

  public getFestivals(baseAddr: string): Observable<MusicFestival[]> {
    try {
      return this.http.get<MusicFestival[]>(baseAddr + 'festivals');
    } 
    catch (error) {
      console.log(this.errorMsg + 'getFestivals');
      return throwError(error);
    }
  }
}