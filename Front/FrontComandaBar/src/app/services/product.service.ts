import { Injectable } from '@angular/core';
import { Products } from '../models/products';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private apiUrl = `${environment.ApiUrl}/Product`;

  constructor(private http: HttpClient) { }

  getProdutos() : Observable<Products[]>{
    return this.http.get<Products[]>(this.apiUrl);
  }

}
