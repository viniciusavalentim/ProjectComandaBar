import { Products } from "./products";

export interface Card{
    id?: number;
    name: string;
    totalPrice: number;
    products: Products[];
}