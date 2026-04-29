import request from "supertest";
import app from "../../app";
import { cleanupDatabase } from "../helpers/dbCleanup";

describe("Post API", () => {
  let token: string;
  let userId: string;

  beforeEach(async () => {
    await cleanupDatabase();

    const registerUser = await request(app)
      .post("/api/auth/register")
      .send({
        username: "user1",
        email: "username@gmail.com",
        password: "123456",
      });



    token = registerUser.body.token;
    userId = registerUser.body.user?.id; 
  });

  describe("POST /api/posts", () => {
    it("create a new post", async () => {
      const res = await request(app)
        .post("/api/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ content: "My first post" });

      expect(res.status).toBe(201);
      expect(res.body.content).toBe("My first post");
      expect(res.body.authorId).toBe(userId);
    });

    it("token not found, error 401", async () => {
      const res = await request(app)
        .post("/api/posts")
        .send({ content: "My first post" });

      expect(res.status).toBe(401);
    });

    it("content not found, error 400", async () => {
      const res = await request(app)
        .post("/api/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ content: "" });

      expect(res.status).toBe(400);
    });
  });

  describe("/api/posts/feed", () => {
    let authorId: string;
    let authorToken: string;

    beforeEach(async () => {

  
  const registerAuthor = await request(app)
    .post("/api/auth/register")
    .send({
      username: "Author",
      email: "Authorname@gmail.com",
      password: "123456",
    });

  authorToken = registerAuthor.body.token;
  authorId = registerAuthor.body.user.id;


  // Подписка
  const followRes = await request(app)
    .post(`/api/users/${authorId}/follow`)
    .set("Authorization", `Bearer ${token}`);

  // Пост от автора
  const postRes = await request(app)
    .post("/api/posts")
    .set("Authorization", `Bearer ${authorToken}`)
    .send({ content: "My author post" });


  expect(postRes.status).toBe(201);
});

    it("feed should return posts from followed users", async () => {
      const res = await request(app)
        .get("/api/posts/feed") 
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.posts).toBeDefined();
      expect(Array.isArray(res.body.posts)).toBe(true);
      expect(res.body.posts.length).toBe(1);
    });

    it("should return empty array if not following anyone", async () => {
      const registerUser3 = await request(app)
        .post("/api/auth/register")
        .send({
          username: "user3",
          email: "username3@gmail.com",
          password: "123456",
        });
      const threeToken = registerUser3.body.token;

      const res = await request(app)
        .get("/api/posts/feed")
        .set("Authorization", `Bearer ${threeToken}`);

      expect(res.status).toBe(200);
      expect(res.body.posts).toEqual([]);
    });

    describe("DELETE /api/posts/:id", () => {
      let postId: string;

      beforeEach(async () => {
        const postRes = await request(app)
          .post("/api/posts")
          .set("Authorization", `Bearer ${token}`)
          .send({ content: "To be deleted" });
        postId = postRes.body.id;
      });

      it("should delete own post, status 204", async () => {
        const res = await request(app)
          .delete(`/api/posts/${postId}`)
          .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(204);

        const checkDeleted = await request(app)
          .get(`/api/posts/${postId}`)
          .set("Authorization", `Bearer ${token}`);

        expect(checkDeleted.status).toBe(404); // 
      });

      it("should return 403 if deleting someone else's post", async () => {
        const otherUser = await request(app)
          .post("/api/auth/register")
          .send({
            username: "otherUser",
            email: "otherUser@gmail.com",
            password: "123456",
          });
        const otherToken = otherUser.body.token;

        const res = await request(app)
          .delete(`/api/posts/${postId}`)
          .set("Authorization", `Bearer ${otherToken}`);

        expect(res.status).toBe(403);
      });
    });
  });
});