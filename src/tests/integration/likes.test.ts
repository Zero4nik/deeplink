import  request  from "supertest";
import app from "../../app";
import { cleanupDatabase } from "../helpers/dbCleanup";


describe('like /api/post',() => {
    let authorId:string
    let postId:string
    let authorToken:string
    let likerToken:string
    beforeEach(async () => {
        await cleanupDatabase()
        jest.clearAllMocks()
        
        const authorUser = await request(app)
        .post("/api/auth/register")
        .send({
        username: "author1",
        email: "author1@gmail.com",
        password: "123456",
        });

    authorToken = authorUser.body.token;
    authorId = authorUser.body.user?.id; 

        const PostRes = await request(app)
            .post("/api/posts")
            .set("Authorization", `Bearer ${authorToken}`)
            .send({ content: "My first post" });
        postId = PostRes.body.id


    const likerUser = await request(app)
        .post("/api/auth/register")
        .send({
        username: "liker",
        email: "liker@gmail.com",
        password: "123456",
        });
    likerToken = likerUser.body.token;
    })
    it("should like a post", async () => {
        const res = await request(app)
        .post(`/api/posts/${postId}/like`)
        .set("Authorization", `Bearer ${likerToken}`);

        expect(res.status).toBe(200);
        expect(res.body.liked).toBe(true);
        expect(res.body.count).toBe(1);
    });
    it("should unlike a post", async () => {
        await request(app)
        .post(`/api/posts/${postId}/like`)
        .set("Authorization", `Bearer ${likerToken}`);

        const res = await request(app)
        .post(`/api/posts/${postId}/like`)
        .set("Authorization", `Bearer ${likerToken}`);

        expect(res.status).toBe(200);
        expect(res.body.liked).toBe(false);
        expect(res.body.count).toBe(0);
    })
    it("should return 404 a post not found",async () => {
         const res = await request(app)
        .post(`/api/posts/non-existent-id/like`)
        .set("Authorization", `Bearer ${likerToken}`);

        expect(res.status).toBe(404);
    })
    it("should return 401 a post not found",async () => {
         const res = await request(app)
        .post(`/api/posts/${postId}/like`)


        expect(res.status).toBe(401);
    })
})