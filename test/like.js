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

describe('Like APIs', () => {

    // after(done => {
    //     // After each test we close the connection
    //     mongoose.connection.close();
    //     done();
    // });

    before(done => {
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

      before(done => {
        const post = {
            title: 'Test Post',
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
            res.body.should.have.property('title').eq('Test Post');
            res.body.should.have.property('description').eq('Description');
            res.body.should.have.property('created_at');
            postId = res.body._id;
            // console.log(res.body);
            done();
        });
      });

      after(done => {
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

    describe("POST /api/like/:id", () => {
        

        it("should Like Post successfully", done => {
          chai
            .request(app)
            .post("/api/like/" + postId)
            .set({ Authorization: `Bearer ${token}` })
            .send(defaultUser)
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.eq('Liked successfully');
                done();
            });
        });

        it("should NOT Like Post successfully", done => {
          chai
            .request(app)
            .post("/api/like/" + postId)
            .set({ Authorization: `Bearer ${token}` })
            .send(defaultUser)
            .end((err, res) => {
                res.should.have.status(401);
                res.text.should.be.eq('Already Liked');
                done();
            });
          });

    });

    describe("POST /api/unlike/:id", () => {

        it("should Unlike Post successfully", done => {
          chai
            .request(app)
            .post("/api/unlike/" + postId)
            .set({ Authorization: `Bearer ${token}` })
            .send(defaultUser)
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.eq('Unliked successfully');
                done();
            });
        });

        it("should NOT unlike Post successfully", done => {
          chai
            .request(app)
            .post("/api/unlike/" + postId)
            .set({ Authorization: `Bearer ${token}` })
            .send(defaultUser)
            .end((err, res) => {
                res.should.have.status(401);
                res.text.should.be.eq('Invalid Request');
                done();
            });
          });

    });
})
