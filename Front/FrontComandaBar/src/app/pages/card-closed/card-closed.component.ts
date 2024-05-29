import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card-closed',
  templateUrl: './card-closed.component.html',
  styleUrls: ['./card-closed.component.css']
})
export class CardClosedComponent implements OnInit {

  cardsClosed: Card[] = [];

  constructor(private cardService: CardService){};

  ngOnInit(): void {
    
    this.cardService.getCardsClosed().subscribe(data =>{
      this.cardsClosed = data;
    });
  }

}
