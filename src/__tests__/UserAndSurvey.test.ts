import request from 'supertest';

import app from '../app';
import createConnection from '../database';
import { surveyResposneStatus, surveyResposneBody } from './SurveyTest';

beforeAll(async () => {
  const connection = await createConnection();
  await connection.dropDatabase();
  await connection.runMigrations();
});

describe("Users", () => {
  
  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/users")
    .send({
      name: "User Example",
      email: "user@example.com",
    });
    
    expect(response.status).toBe(201);
  });

  it("Should not be able to create a new user with exist email", async () => {
    const response = await request(app).post("/users")
    .send({
      name: "User Example",
      email: "user@example.com",
    });
    
    expect(response.status).toBe(400);
  });

});

describe("Surveys", () => {
  it("Should be able to create a new survey", async () => {

    expect(await surveyResposneStatus()).toBe(201);

  });

  it("Should be able to get all surveys", async () => {

    expect(await surveyResposneBody()).toHaveLength(2);

  });

});

/*Outro jeitto de fazer
  afterAll(async () => {
  const connection = await createConnection();
  await connection.dropDatabase();
  await connection.close();
});
 */
