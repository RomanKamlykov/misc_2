import express from 'express';
import { Response, Params, Controller, Get, attachControllers } from '@decorators/express';
  
@Controller('/users')
class UsersController {
  
    constructor() {}
  
    @Get('/:id')
    getData(@Response() res: express.Response, @Params('id') id: string) {
      res.send('Hello' + id);
    }
}
  
let app = express();
attachControllers(app, [UsersController]);
  
app.listen(3000);