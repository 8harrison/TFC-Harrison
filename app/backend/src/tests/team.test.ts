import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import { before } from 'node:test';

chai.use(chaiHttp);

const { expect } = chai;

describe('teste Teams', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;
  let postTeam;
    let getTeam;

  before(async () => {
    try {
        postTeam = await chai.request(app)
        .post('/teams')
        .send({
            teamName: 'Vasco da Gama'
        })

        const {body : {id }} = postTeam;

        getTeam = await chai.request(app)
        .get(`/teams/${id}`);
    } catch(error) {
        // console.error(error.message)
    }
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

  it('testando teams', () => {
    expect(false).to.be.eq(true);
  });
});
