import { Component, OnInit } from '@angular/core';
import { ConfirmBoxInitializer, DialogLayoutDisplay, AppearanceAnimation, DisappearanceAnimation } from '@costlydeveloper/ngx-awesome-popup';
import { Card } from 'src/app/models/card';
import { Products } from 'src/app/models/products';
import { CardService } from 'src/app/services/card.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  comandas: Card[] = [];
  produtos: Products[] = [];
  searchText: string = '';
  selectedProduto: any = null;
  noProductsFound: boolean = false;

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
      const novaComanda: Card = { 
        name: name, 
        totalPrice: 0, 
        products: [], 
        searchText: '', 
        date: null};
      this.comandaService.addComanda(novaComanda).subscribe(() => {
        this.carregarComandas();
      });
    }
  }

  searchProduct(event: any): void {
    if (event && event.target && event.target.value) {
      const searchText = event.target.value.toLowerCase();
      this.productService.getProdutos().subscribe((data) => {
        this.produtos = data.filter((product) =>
          product.name.toLowerCase().includes(searchText)
        );
        this.noProductsFound = this.produtos.length === 0; 
      });
    } else {
      this.noProductsFound = false; 
    }
  }

  filteredProdutos(comanda: Card): Products[] {
    const searchText = comanda.searchText.toLowerCase();
    return this.produtos.filter((product) =>
      product.name.toLowerCase().includes(searchText)
    );
  }

  selectProduto(produto: Products, comanda: Card, comandaIndex: number): void {
    const novoItem = {
      id: produto.id,
      name: produto.name,
      quantity: 1,
      price: produto.price,
    };
    comanda.products.push(novoItem);
    this.calculateTotalPrice(comanda);
    this.updateComanda(comandaIndex, comanda);
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
    const newConfirmBox = new ConfirmBoxInitializer();

    newConfirmBox.setTitle('Confirm Delete!');
    newConfirmBox.setMessage('Você tem certeza que deseja excluir?');

    // Choose layout color type
    newConfirmBox.setConfig({
    layoutType: DialogLayoutDisplay.DANGER, 
    animationIn: AppearanceAnimation.SLIDE_IN_UP, 
    animationOut: DisappearanceAnimation.BOUNCE_OUT,
    buttonPosition: 'center',
    });

    newConfirmBox.setButtonLabels('SIM', 'NÃO');
    newConfirmBox.openConfirmBox$().subscribe(resp => {
      if(resp.clickedButtonID == 'sim'){
        const comanda = this.comandas[comandaIndex];
        comanda.products.splice(itemIndex, 1);
        this.calculateTotalPrice(comanda);
        this.updateComanda(comandaIndex, comanda);
      }
     });

  }

  deleteComanda(index: number, card: Card): void {
    const newConfirmBox = new ConfirmBoxInitializer();

    newConfirmBox.setTitle(`VALOR TOTAL R$ ${card.totalPrice}`);
    newConfirmBox.setMessage('Você tem certeza que deseja fechar essa comanda?');

    // Choose layout color type
    newConfirmBox.setConfig({
    layoutType: DialogLayoutDisplay.SUCCESS, 
    animationIn: AppearanceAnimation.SLIDE_IN_UP, 
    animationOut: DisappearanceAnimation.BOUNCE_OUT,
    buttonPosition: 'center',
    });

    newConfirmBox.setButtonLabels('SIM', 'NÃO');
    newConfirmBox.openConfirmBox$().subscribe(resp => {
      if(resp.clickedButtonID == 'sim'){
        const comandaId = this.comandas[index].id;
        if (comandaId) {
          this.comandaService.addCardClosed(card).subscribe((data =>{
            console.log(card);
          }))
    
          this.comandaService.deleteComanda(comandaId).subscribe(() => {
            this.carregarComandas();
          });
        }        
      }

     });
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


