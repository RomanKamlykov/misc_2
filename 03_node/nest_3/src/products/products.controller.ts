// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  @Get()
  getAll() {
    return 'get all';
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return 'get one - ' + id;
  }

  @Post()
  createOne(@Body() createProductDto: CreateProductDto) {
    return 'create one - ' + createProductDto.title;
  }

  @Put(':id')
  updateOne(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    console.log(updateProductDto);
    return 'update one - ' + id;
  }

  @Delete(':id')
  removeOne(@Param('id') id: string) {
    return 'delete one - ' + id;
  }
}
