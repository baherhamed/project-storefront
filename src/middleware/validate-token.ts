import { Request, Response } from 'express';
import isJwtTokenExpired from 'jwt-check-expiry';

async function validateToken(req: Request, res: Response, next: () => void) {
  const token = req.headers['authorization'];

  if (token) {
    try {
      const jwtPayload = token.split('Bearer ')[1];
      const isExpired = isJwtTokenExpired(jwtPayload);
      if (isExpired) {
        res.status(401);
        res.json({ message: 'Unauthorized Please login' });
        return;
      } else {
        next();
      }
    } catch (err) {
      console.log('err', err);
        res.status(401);
    res.json({ error: `${err}` });
    }
  } else {
    res.status(401);
    res.json({ message: 'Unauthorized Please login' });
  }
}
export default validateToken;
