import { IProduct } from "../reducer/interfaces";

export const sortByCriteria = (criteria: string, array: IProduct[]): IProduct[] => {
  switch (criteria) {
    case "ascName":
      return array.sort((a: IProduct, b: IProduct): any => {
        return a.name.localeCompare(b.name);
      });
    case "descName":
      return array.sort((a: IProduct, b: IProduct): any => {
        return b.name.localeCompare(a.name);
      });
    case "ascStock":
      return array.sort((a: IProduct, b: IProduct): any => {
        return a.stock - b.stock;
      });
    case "descStock":
      return array.sort((a: IProduct, b: IProduct): any => {
        return b.stock - a.stock;
      });
    case "ascPrice":
      return array.sort((a: IProduct, b: IProduct): any => {
        return a.price - b.price;
      });
    case "descPrice":
      return array.sort((a: IProduct, b: IProduct): any => {
        return b.price - a.price;
      });
    default:
      return array;
  }
};
