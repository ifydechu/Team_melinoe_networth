import assert from "assert";
import * as httpStatus from "http-status-codes";
import superTest from "supertest";
import app from "../index";

describe("POST /login", () => {
  it("should return JSON", done => {
    superTest(app)
      .post("/api/v1/auth/login")
      .send({ email: "sudo@localhost.com", password: "superman" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(httpStatus.OK, done);
  });

  it("should return JSON with JWT token correctly set", done => {
    superTest(app)
      .post("/api/v1/auth/login")
      .send({ email: "sudo@localhost.com", password: "superman" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(httpStatus.OK)
      .end((err, response) => {
        if (err) return done(err);
        assert.notStrictEqual(response.body.data.token, undefined);
        done();
      });
  });

  it("should return HTTP status UNAUTHORIZED with wrong credentials", done => {
    superTest(app)
      .post("/api/v1/auth/login")
      .send({ email: "fakeuser@gmail.com", password: "wrongpassword" })
      .expect("Content-Type", /json/)
      .expect(httpStatus.UNAUTHORIZED)
      .end((err, response) => {
        if (err) return done(err);
        assert.equal(response.body.status, httpStatus.UNAUTHORIZED);
        assert.strictEqual(response.body.data, undefined);
        done();
      });
  });
});

describe("POST /signup", () => {
  it("should create new user successfully", done => {
    superTest(app)
      .post("/api/v1/auth/signup")
      .send({ email: "test@user.com", password: "test" })
      .expect("Content-Type", /json/)
      .expect(httpStatus.CREATED)
      .end((err, response) => {
        if (err) return done(err);
        assert.notStrictEqual(response.body, undefined);
        done();
      });
  });
});
