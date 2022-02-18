import {getMetadata} from "../functions/index";

// записывает в свойство "__metadata__" класса по ключу "routeKey" объект { method, url, handler }
function decoratorFactory(method: string, url: string) {
    return (target: Object, handler: string) => {
      const meta: any = getMetadata(target);
      const routeKey = `${method} ${url}`;
      meta[routeKey] = {method, url, handler};
    };
  }
  
export function Get(url: string) {
    return decoratorFactory('get', url);
}

export function Post(url: string) {
    return decoratorFactory('post', url);
}