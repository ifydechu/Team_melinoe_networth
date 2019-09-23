const assert = require("assert");
const httpStatus = require("http-status-codes");
const request = require("supertest");
const { app } = require("../index");

describe("POST /login", () => {
  it("should return JSON", done => {
    request(app)
      .post("/api/v1/auth/login")
      .send({ username: "sudo@localhost.com", password: "superman" })
      .set("Accept", "application/json")
      .expect("Conent-Type", /json/)
      .expect(httpStatus.OK, done);
  });

  it("should return JSON with JWT token correctly set", done => {
    request(app)
      .post("/api/v1/auth/login")
      .send({ email: "sudo@localhost.com", password: "superman" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(httpStatus.OK)
      .end((err, response) => {
        if (err) return done(err);
        assert.notStrictEqual(response.body.token, undefined);
        done();
      });
  });

  it("should return HTTP status UNAUTHORIZED with wrong credentials", done => {
    request(app)
      .post("/api/v1/auth/login")
      .send({ email: "fakeuser@gmail.com", password: "wrongpassword" })
      .expect("Content-Type", /json/)
      .expect(httpStatus.UNAUTHORIZED)
      .end((err, response) => {
        if (err) return done(err);
        assert.equal(response.body.status, httpStatus.UNAUTHORIZED);
        assert.strictEqual(response.body.token, undefined);
        done();
      });
  });
});
