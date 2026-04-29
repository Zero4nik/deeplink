import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log('1. Middleware вызван');
    const authHeader = req.headers['authorization'];
    console.log('2. authHeader:', authHeader);
    
    if(!authHeader){
        console.log('3. Нет заголовка');
        return res.status(401).json({error:'no token provided'})
    }

    const token = authHeader.split(' ')[1]
    console.log('4. token:', token);
    
    if(!token){
        console.log('5. Нет токена');
        return res.status(401).json({error:'Invalid token format'})
    }
    
    try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    console.log('6. Декодировано:', decoded);
    (req as any).user = { id: decoded.userId };
    console.log('7. req.user установлен:', (req as any).user);
    next();
} catch(error) {
    console.log('8. Ошибка верификации:', error);
    return res.status(401).json({ error: 'invalid token' });
}
}