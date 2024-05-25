import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService{

  private apiUrl = `${environment.ApiUrl}/Card`;

  constructor(private http: HttpClient) { }

  GetCards() : Observable<Card[]>{
    return this.http.get<Card[]>(this.apiUrl);
  }
}
