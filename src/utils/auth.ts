

export const requireAuth = (userId: string | undefined): string => {
  if (!userId) throw new Error('Unauthorized');
  return userId;
};