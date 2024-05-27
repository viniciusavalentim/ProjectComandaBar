import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';
import { Card } from '../models/card';
import { ProductService } from '../services/product.service';
import { Products } from '../models/products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  comandas: Card[] = [];
  produtos: Products[] = [];
  searchText: string = '';
  selectedProduto: any = null;

  constructor(
    private comandaService: CardService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.carregarComandas();
    this.productService.getProdutos().subscribe(data =>{
      this.produtos = data;
    })
  }

  carregarComandas(): void {
    this.comandaService.getCards().subscribe((data) => {
      this.comandas = data;
    });
  }

  addComanda(): void {
    const name = prompt('Digite o nome da comanda:');
    if(name){
      const novaComanda: Card = { name: name, totalPrice: 0, products: [] };
      this.comandaService.addComanda(novaComanda).subscribe(() => {
        this.carregarComandas();
      });
    }
  }

  searchProduct(event: any): void {
    const searchText = event.target.value.toLowerCase();
    this.productService.getProdutos().subscribe((data) => {
      this.produtos = data.filter((product) =>
        product.name.toLowerCase().includes(searchText)
      );
    });
  }

  selectProduto(produto: any): void {
    this.selectedProduto = produto;
  }

  addItem(comandaIndex: number): void {
    if (this.selectedProduto) {
      const comanda = this.comandas[comandaIndex];
      const novoItem = {
        id: this.selectedProduto.id,
        name: this.selectedProduto.name,
        quantity: 1,
        price: this.selectedProduto.price,
      };
      comanda.products.push(novoItem);
      this.calculateTotalPrice(comanda);
      this.updateComanda(comandaIndex, comanda);
      this.selectedProduto = null;
      this.searchText = '';
    }
  }

  updateItem(comandaIndex: number, itemIndex: number, increment: boolean): void {
    const comanda = this.comandas[comandaIndex];
    const item = comanda.products[itemIndex];
    item.quantity = increment ? item.quantity + 1 : item.quantity - 1;
    this.calculateTotalPrice(comanda);
    this.updateComanda(comandaIndex, comanda);
  }

  deleteItem(comandaIndex: number, itemIndex: number): void {
    const comanda = this.comandas[comandaIndex];
    comanda.products.splice(itemIndex, 1);
    this.calculateTotalPrice(comanda);
    this.updateComanda(comandaIndex, comanda);
  }

  deleteComanda(index: number): void {
    const comandaId = this.comandas[index].id;
    if (comandaId) {
      this.comandaService.deleteComanda(comandaId).subscribe(() => {
        this.carregarComandas();
      });
    }
  }

  updateComanda(index: number, comanda: Card): void {
    this.comandaService.updateComanda(comanda).subscribe(() => {
      this.carregarComandas();
    });
  }

  calculateTotalPrice(comanda: Card): void {
    comanda.totalPrice = comanda.products.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
  }
}
