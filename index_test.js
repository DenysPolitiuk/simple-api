const api = require("./index.js");
const server = require("supertest")(api);
const should = require("should");

describe("unit test", () => {
  it("/ should return 404", done => {
    server.get("/").expect(404, done);
  });

  it("hello should return 200", done => {
    server.get("/hello").expect(200, done);
  });

  it("hello should return default text", done => {
    server
      .get("/hello")
      .expect(200)
      .end((err, res) => {
        res.text.should.containEql("Hello stranger!");
      });
    done();
  });

  it("hello should return name", done => {
    server
      .get("/hello?name=Denys")
      .expect(200)
      .end((err, res) => {
        res.text.should.containEql("Hello Denys!");
      });
    done();
  });
});
