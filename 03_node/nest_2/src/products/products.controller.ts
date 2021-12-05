// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  createOne(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    const id = this.productsService.addProduct(title, description, price);
    return { id };
  }

  @Get()
  readAll() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  readOne(@Param('id') id: number) {
    return this.productsService.getProduct(id);
  }

  @Put(':id')
  updateOne(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    return this.productsService.editProduct(id, title, description, price);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.productsService.removeProduct(id);
  }
}
