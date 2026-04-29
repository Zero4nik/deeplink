import prisma from '../../lib/prisma';

export async function cleanupDatabase() {
  await prisma.like.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  
}