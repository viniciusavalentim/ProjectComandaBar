import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { Card } from '../../models/card';
import { ProductService } from '../../services/product.service';
import { Products } from '../../models/products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{


  constructor(
    private comandaService: CardService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
 
  }

}
