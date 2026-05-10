import express, { Express } from "express";
import authRouter from "./routes/auth.routes";
import router from './routes/post.routes';
import userRouter from "./routes/user.routes";
import cors from 'cors';
const app: Express = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://deeplink-ivory-rho.vercel.app'],
  credentials: true,
}));
app.use(express.json());
app.use('/api/posts', router);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;
