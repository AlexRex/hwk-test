import Products from './modules/products';
import * as products from './assets/products.json';

export default class App {
  constructor() {
    let products = new Products();
    products.loadProducts();
    window.products = products;
  }
}