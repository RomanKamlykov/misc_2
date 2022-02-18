import Router from "koa-router";
import {Get, Post} from "../decorators/index";

export class MyController extends Router {
  constructor() {
    super()
  }

  @Get('/')
  getIndex(ctx, next) {
    ctx.body = 'Hello /';
  }

  @Get('/test')
  getTest(ctx, next) {
    ctx.body = 'Hello Test';
  }
  
  @Get('/params/:id')
  getParams(ctx, next) {
    ctx.body = ctx.params;
  }
  
  @Get('/query')
  getQuery(ctx, next) {
    ctx.body = ctx.query;
  }
  
  @Post('/json')
  postJson(ctx, next) {
    ctx.body = ctx.request.body;
  }
  
  @Post('/form')
  postForm(ctx, next) {
    ctx.body = ctx.request.body;
  }
}