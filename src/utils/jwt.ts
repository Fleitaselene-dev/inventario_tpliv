import jwt from 'jsonwebtoken';
import { IUserResponse } from '../types/IUser';

//  Helper para manejar tokens JWT
export class JWTHelper {
  private static readonly SECRET = process.env.JWT_SECRET || 'fallback_secret';
  private static readonly EXPIRES_IN =  '24h';

  //  Crea la carga útil del token JWT
   
  private static jwtPayload(user: IUserResponse): {
    id: string;
    email: string;
    role: 'admin' | 'user';
    name: string;
  } {
    return {
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name
    };
  }


   
  private static jwtOptions(): jwt.SignOptions {
    return {
      expiresIn: this.EXPIRES_IN
    };
  }

 
   
  public static generateToken(user: IUserResponse): string {
    const payload = this.jwtPayload(user);
    const options = this.jwtOptions();

    return jwt.sign(payload, this.SECRET, options);
  }

  public static verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.SECRET);
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }
  }

  public static decodeToken(token: string): any {
    return jwt.decode(token);
  }

  // Extrae el token del encabezado de autorización
  public static extractToken(authHeader: string | undefined): string | null {
    if (!authHeader) {
      return null;
    }

    const parts = authHeader.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      return parts[1];
    }

    return null;
  }
}