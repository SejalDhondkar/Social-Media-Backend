const User = require("../models/User");
const mongoose = require('mongoose');

// Require dev dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../index");

chai.should();

chai.use(chaiHttp);

let defaultUser = {
    email: "user1@test.com",
    password: "password"
};

let incorrectUserEmail = {
    email: "userabc@test.com",
    password: "password"
};

let incorrectUserPassword = {
    email: "user1@test.com",
    password: "abc123"
};

let token;

describe('Users APIs', function () {
    this.timeout(10000);
    after(done => {
        // After each test we close the connection
        mongoose.connection.close();
        done();
    });

    describe("POST /api/authenticate", () => {
        it("should login user successfully", done => {
          chai
            .request(app)
            .post("/api/authenticate")
            .send(defaultUser)
            .end((err, res) => {
                token = res.body;
                res.should.have.status(200);
                res.body.should.be.a('string');
                done();
            });
        });

        it("should NOT login user: incorrect email", done => {
            chai
              .request(app)
              .post("/api/authenticate")
              .send(incorrectUserEmail)
              .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  res.text.should.be.eq("User not found!");
                  done();
              });
        });

        it("should NOT login user: incorrect password", done => {
            chai
              .request(app)
              .post("/api/authenticate")
              .send(incorrectUserPassword)
              .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  res.text.should.be.eq("Incorrect credentials");
                  done();
            });
        });
    });

    describe("GET /api/user", () => {
        beforeEach(done => {
            chai
              .request(app)
              .post("/api/authenticate")
              .send(defaultUser)
              .end((err, res) => {
                token = res.body;
                res.should.have.status(200);
                res.body.should.be.a('string');
                done();
              });
          });

        it("should GET user profile", done => {
          chai
            .request(app)
            .get("/api/user")
            .set({ Authorization: `Bearer ${token}` })
            .send(defaultUser)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('username');
                res.body.should.have.property('follower_count');
                res.body.should.have.property('following_count');
                // console.log(res.body);
                done();
            });
        });

        it("should NOT GET user profile", done => {
            chai
              .request(app)
              .get("/api/user")
              .send(defaultUser)
              .end((err, res) => {
                  res.should.have.status(401);
                  res.body.should.have.property('message').eq('Please use a valid token');
                  done();
              });
          });

    });
})

