import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import {times} from './team.controller.mock'
import teamsModel from '../database/models/teams.model';
chai.use(chaiHttp);

const { expect } = chai;

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjp7ImlkIjoyLCJ1c2VybmFtZSI6IlVzZXIiLCJyb2xlIjoidXNlciIsImVtYWlsIjoidXNlckB1c2VyLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JFk4QWJpOGpYdnNYeXFtLnJtcDBCLnVRQkE1cVV6N1Q2R2hsZy9DdlZyL2dMeFlqNVVBWlZPIn0sImlhdCI6MTY3OTAwNDExNiwiZXhwIjoxNjc5NjA4OTE2fQ.hFOrzLVoE4tJb6CXpIlci4nHbAb0_XZuVM29ohRUHYo"
describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */
  let getTeams: any;

  // let chaiHttpResponse: Response;
//   before(async () => {
//     // try {
      
//     // } catch (error: any) {
//     //   console.log(error.message)
//     // }
//     // sinon.stub
// })
it('retorna status 200 /teams e retorna lista com times', async () => {
  sinon.stub(teamsModel, 'findAll').resolves(times)
  const result = await chai.request(app)
  .get('/teams')
  expect(result.status).to.be.equal(200);
  expect(result.body).to.deep.equal(times);
})
it('retorna status 200 /logins e retorna login', async () => {
  // sinon.stub(teamsModel, 'findAll').resolves(times)
  const result = await chai.request(app)
  .post('/login').send({
    email: "user@user.com",
    password: "secret_user",
  })
  expect(result.status).to.be.equal(200);
  // expect(result.body).to.deep.equal(times);
})
it('retorna 401 da rota login',async () => {
  const result = await chai.request(app)
  .post('/login').send({
    email: "user@user",
    password: "secret_user",
  })
  expect(result.status).to.be.equal(401)
})

it('retorna 401 do login/role', async () => {
  const result = await chai.request(app)
  .post('/login/role').send({
    email: "user@user",
    password: "secret_user",
  })
  expect(result.status).to.be.equal(404)
})
// it('retorna 200 com id', async() => {
//   const id = 5;
//   const result = await chai.request(app)
//   .get(`/teams/${id}`)
//   expect(result.status).to.be.equal(200)
// })

it('retorna 200 de /matches get', async () => {
  const result = await chai.request(app)
  .get('/matches')
  expect(result.status).to.be.equal(200);
})

it('retorna 200 de /matches/:id', async () => {
  const result = await chai.request(app)
  .patch('/matches').set('Authorization',  `Bearer ${TOKEN}` )
  expect(result.status).to.be.equal(200);
})

it('retorna 200 de /matches post', async () => {
  const result = await chai.request(app)
  .post('/matches').set('Authorization', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjp7ImlkIjoyLCJ1c2VybmFtZSI6IlVzZXIiLCJyb2xlIjoidXNlciIsImVtYWlsIjoidXNlckB1c2VyLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JFk4QWJpOGpYdnNYeXFtLnJtcDBCLnVRQkE1cVV6N1Q2R2hsZy9DdlZyL2dMeFlqNVVBWlZPIn0sImlhdCI6MTY3OTAwNDExNiwiZXhwIjoxNjc5NjA4OTE2fQ.hFOrzLVoE4tJb6CXpIlci4nHbAb0_XZuVM29ohRUHYo")
  expect(result.status).to.be.equal(200);
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
