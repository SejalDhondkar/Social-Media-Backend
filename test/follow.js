const User = require("../models/User");
const Follow = require("../models/Follow");
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

let token;

describe('Follow APIs', function () {
    this.timeout(10000);
    // after(done => {
    //     // After each test we close the connection
    //     mongoose.connection.close();
    //     done();
    // });

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

    describe("POST /api/follow/:id", () => {
        

        it("should Follow user successfully", done => {
            const userId = '641445fc38484fe34e38157c';
          chai
            .request(app)
            .post("/api/follow/" + userId)
            .set({ Authorization: `Bearer ${token}` })
            .send(defaultUser)
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.eq('Followed successfully');
                done();
            });
        });

        it("should NOT Follow user successfully", done => {
            const userId = '641445fc38484fe34e38157c';
          chai
            .request(app)
            .post("/api/follow/" + userId)
            .set({ Authorization: `Bearer ${token}` })
            .send(defaultUser)
            .end((err, res) => {
                res.should.have.status(401);
                res.text.should.be.eq('Already following');
                done();
            });
          });

    });

    describe("POST /api/unfollow/:id", () => {

        it("should Unfollow user successfully", done => {
            const userId = '641445fc38484fe34e38157c';
          chai
            .request(app)
            .post("/api/unfollow/" + userId)
            .set({ Authorization: `Bearer ${token}` })
            .send(defaultUser)
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.eq('Unfollowed successfully');
                done();
            });
        });

        it("should NOT unfollow user successfully", done => {
            const userId = '641445fc38484fe34e38157c';
          chai
            .request(app)
            .post("/api/unfollow/" + userId)
            .set({ Authorization: `Bearer ${token}` })
            .send(defaultUser)
            .end((err, res) => {
                res.should.have.status(401);
                res.text.should.be.eq('Invalid request');
                done();
            });
          });

    });
})
