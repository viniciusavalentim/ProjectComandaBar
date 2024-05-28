import { Products } from "./products";

export interface Card{
    id?: string;
    name: string;
    totalPrice: number;
    products: Products[];
    searchText: any;

}