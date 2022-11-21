import { Request } from 'express';
import jwt from 'jsonwebtoken';

async function decodeToken(req: Request) {
  const token = req.headers['authorization'];

  if (token) {
    const jwtPayload = token.split('Bearer ')[1];
    const decoded = jwt.decode(jwtPayload);
    let user = Object(decoded);
    return user.user.id;
  }
}
export default decodeToken;
