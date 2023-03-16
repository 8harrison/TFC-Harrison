import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
// import times from './team.controller.mock'
chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */
  let getTeams: any;

  // let chaiHttpResponse: Response;
  before(async () => {
    try {
      getTeams = await chai.request(app)
      .get('/teams')
    } catch (error: any) {
      console.log(error.message)
    }
    sinon.stub
  describe('teste do requisito 2- testando endpoint teams', async() => {
    it('retorna status 200', async () => {
      const {status} = getTeams

      expect(status).to.be.equal(200);
    })
  })
})
  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });
});
