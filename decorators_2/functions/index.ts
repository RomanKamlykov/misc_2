import type Koa from 'koa';

export interface Type extends Function {
  new (...args: any[]);
}

export function getMetadata(target: any) {
  return (target["__metadata__"] = target["__metadata__"] || {});
}

export function registerController(app: Koa, Controller: Type) {
  const controller = new Controller();
  const meta: any = getMetadata(controller);

  for (const methodName of Object.keys(meta)) {
    const { method, url, handler } = meta[methodName];
    controller[method](url, controller[handler]);
  }
  app.use(controller.routes());
  return app;
}

export function attachControllers(app: Koa, controllers: Type[]) {
  controllers.forEach((Controller: Type) =>
    registerController(app, Controller)
  );
}