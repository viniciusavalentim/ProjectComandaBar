import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  cards?: Card[];

  constructor(private cardSercice: CardService) {}
  ngOnInit(): void {
    this.cardSercice.getCards().subscribe(data =>{
      this.cards = data;
    });
  }

}
