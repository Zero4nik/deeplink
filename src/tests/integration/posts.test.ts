import  request  from "supertest";
import app from "../../app";
import { cleanupDatabase } from "../helpers/dbCleanup";

describe('API POST',  () => {
    let token: string;
    let userId: string;

    beforeEach(async () => {
    await cleanupDatabase();

    const registerUser = await request(app)
        .post("/api/auth/register")
        .send({
        username: "user12",
        email: "username12@gmail.com",
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

        describe("POST /api/posts/:id", () => {
            it('should return 200 a post by id', async () => {
        const createRes = await request(app)
            .post('/api/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({ content: 'Test post' });
            

        const res = await request(app)
            .get(`/api/posts/${createRes.body.id}`)
            .set('Authorization', `Bearer ${token}`);


                
        expect(res.status).toBe(200);
        expect(res.body.content).toBe('Test post');
        });
            it('should return 404 a post not found',async () => {
            const res = await request(app)
            .get(`/api/posts/non-existent-id`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(404);
            })
    }) 
        describe("DELETE /api/posts", () => {
            it('should return 204 a post by deleted',async () => {
        const createRes = await request(app)
            .post('/api/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({ content: 'To be deleted' });

            const res = await request(app)
            .delete(`/api/posts/${createRes.body.id}`)
            .set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(204)
            })
            it('should return 403 a post delete another  user post',async () =>{
                let otherToken
                const otherUser = await request(app)
                .post("/api/auth/register")
                .send({
                username: "user1",
                email: "username@gmail.com",
                password: "123456",
                });

            otherToken = otherUser.body.token;
            
            const createRes = await request(app)
            .post('/api/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({ content: 'To be deleted' });

            const res = await request(app)
            .delete(`/api/posts/${createRes.body.id}`)
            .set('Authorization', `Bearer ${otherToken}`);

            expect(res.status).toBe(403)
            })
        })
        
})
