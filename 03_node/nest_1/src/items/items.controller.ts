// eslint-disable-next-line prettier/prettier
import { Body, Controller, Get, Post, Param, Put, Delete } from '@nestjs/common';
import { CreateItemDto } from './create-item.dto';
import { Item } from './interfaces';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Item> {
    return this.itemsService.findOne(id);
  }

  @Post()
  createOne(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemsService.createOne(createItemDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string): Promise<Item> {
    return this.itemsService.deleteOne(id);
  }

  @Put(':id')
  updateOne(
    @Param('id') id: string,
    @Body() updateItemDto: CreateItemDto,
  ): Promise<Item> {
    return this.itemsService.updateOne(id, updateItemDto);
  }
}
