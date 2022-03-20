export interface IProduct {
    name: string;
    description: string;
    stock: number;
    minStock: number;
    price: number;
    _id: string;
}

export interface IState {
    username: string;
    products: IProduct[];
    productsCopy: IProduct[];
    errors: string[];
}
