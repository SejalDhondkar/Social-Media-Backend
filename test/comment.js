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

      beforeEach(done => {
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

    afterEach(done => {
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

    describe("POST /api/comment", () => {

        it("should add comment successfully", done => {
            const data = {
                comment: 'Sample Comment'
            };
          chai
            .request(app)
            .post("/api/comment/"+postId)
            .set({ Authorization: `Bearer ${token}` })
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('string');
                console.log(res.body);
                done();
            });
        });
    });


})
