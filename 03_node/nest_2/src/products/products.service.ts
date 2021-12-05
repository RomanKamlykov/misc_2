import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './models/product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  addProduct(title: string, description: string, price: number) {
    const newProduct = new Product(Date.now(), title, description, price);
    this.products.push(newProduct);
    return this.products.at(-1).id;
  }

  getProducts() {
    return new Array(...this.products);
  }

  getProduct(id: number) {
    const product = this.products.find((el) => el.id == id);
    if (product === undefined) {
      throw new NotFoundException('Could not find the product!');
    }
    return product;
  }

  editProduct(id: number, title: string, description: string, price: number) {
    const product = this.products.find((el) => el.id == id);
    if (product === undefined) {
      throw new NotFoundException('Could not find the product!');
    }
    if (title) product.title = title;
    if (description) product.description = description;
    if (price) product.price = price;
    return product;
  }

  removeProduct(id: number) {
    const product = this.products.find((el) => el.id == id);
    if (product === undefined) {
      throw new NotFoundException('Could not find the product!');
    }
    this.products = this.products.filter((el) => el.id != id);
    return null;
  }
}
