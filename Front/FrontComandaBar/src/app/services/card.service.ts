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

  getCards() : Observable<Card[]>{
    return this.http.get<Card[]>(this.apiUrl);
  }
  
  getCardsClosed() : Observable<Card[]>{
    return this.http.get<Card[]>(`${this.apiUrl}/Closed`);
  }

  addComanda(card: Card): Observable<Card> {
    return this.http.post<any>(this.apiUrl, card);
  }

  addCardClosed(card: Card): Observable<Card> {
    return this.http.post<any>(`${this.apiUrl}/Closed`, card);
  }

  updateComanda(card: Card): Observable<Card> {
    return this.http.put<any>(`${this.apiUrl}/${card.id}`, card);
  }

  deleteComanda(id: string): Observable<Card> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
