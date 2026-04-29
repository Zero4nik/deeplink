import { PrismaClient } from '@prisma/client';
import redis from '../lib/redis';
const prisma = new PrismaClient()
afterAll(async () => {
  await redis.quit();
});
beforeEach(async () =>{
    await prisma.user.deleteMany()
    await prisma.post.deleteMany();
    await prisma.like.deleteMany();
    await prisma.follow.deleteMany();
})