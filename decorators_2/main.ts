import Koa from 'koa';
import {MyController} from './routers/basic';
import bodyParser from 'koa-bodyparser';
import {attachControllers} from './functions/index';

const app = new Koa();

app.use(bodyParser({enableTypes: ['json', 'form']}));
attachControllers(app, [MyController])

app.listen(3000);