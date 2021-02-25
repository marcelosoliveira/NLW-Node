import request from 'supertest';

import app from '../app';

export async function surveyResposneStatus() {
  const response = await request(app).post("/surveys")
  .send({
    title: "Survey title Example",
    description: "Description survey example",
  });
  await request(app).post("/surveys")
  .send({
    title: "Survey title Example2",
    description: "Description survey example2",
  });
  
  return response.status;
}

export async function surveyResposneBody() {
  const response = await request(app).get("/surveys");
  
  return response.body;
}
