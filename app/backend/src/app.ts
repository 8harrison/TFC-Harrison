import * as express from 'express';
import findAll, { one } from './database/controller/teamsController';
import { createdLogin, loginRole } from './database/controller/user.controller';
import validaToken from './database/midlewares/validaToken';
import getAll from './database/controller/matches.controller';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.get('/login/role', validaToken, loginRole);
    this.app.get('/teams/:id', one);
    this.app.get('/matches', getAll);
    this.app.get('/teams', findAll);

    this.app.post('/login', createdLogin);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
