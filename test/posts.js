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

let postId;

describe('Post APIs', () => {

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

    describe("POST /api/posts", () => {

        it("should create new Post successfully", done => {
            const post = {
                title: 'Title temp',
                description: 'Description'
            };
          chai
            .request(app)
            .post("/api/posts")
            .set({ Authorization: `Bearer ${token}` })
            .send(post)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title').eq('Title temp');
                res.body.should.have.property('description').eq('Description');
                res.body.should.have.property('created_at');
                postId = res.body._id;
                // console.log(res.body);
                done();
            });
        });

        it("should NOT create new Post successfully", done => {
            const post = {
                description: 'Description'
            };
          chai
            .request(app)
            .post("/api/posts")
            .set({ Authorization: `Bearer ${token}` })
            .send(post)
            .end((err, res) => {
                res.should.have.status(400);
                res.text.should.be.eq('Incomplete Data');
                done();
            });
        });

        it("should NOT create new Post successfully", done => {
            const post = {
                title: 'Test'
            };
          chai
            .request(app)
            .post("/api/posts")
            .set({ Authorization: `Bearer ${token}` })
            .send(post)
            .end((err, res) => {
                res.should.have.status(400);
                res.text.should.be.eq('Incomplete Data');
                done();
            });
        });

    });

    describe("GET /api/posts/:id", () => {


        it("should GET post successfully", done => {
          chai
            .request(app)
            .get("/api/posts/"+postId)
            .set({ Authorization: `Bearer ${token}` })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title').eq('Title temp');
                res.body.should.have.property('description').eq('Description');
                res.body.should.have.property('created_at');
                res.body.should.have.property('likes_count');
                res.body.should.have.property('comments');
                // console.log(res.body);
                done();
            });
        });

    });

    describe("GET /api/all-posts", () => {

          it("should GET ALL posts successfully", done => {
            chai
              .request(app)
              .get("/api/all-posts/")
              .set({ Authorization: `Bearer ${token}` })
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                //   console.log(res.body);
                  done();
              });
          });

    });

    describe("DELETE /api/posts/:id", () => {

          it("should DELETE the post successfully", done => {
            chai
              .request(app)
              .delete("/api/posts/" + postId)
              .set({ Authorization: `Bearer ${token}` })
              .end((err, res) => {
                  res.should.have.status(200);
                  res.text.should.be.eq('Post deleted Successfully');
                //   console.log(res.body);
                done();
              });
          });
    });
})
