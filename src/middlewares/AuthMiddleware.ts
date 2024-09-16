import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

class AuthMiddleware {
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }
  hasToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header("Authorization");
    if (!token) {
      res.status(401).json({
        status: false,
        statusCode: 401,
        message: "Access Denied. No token provided.",
      });
      return;
    }
    try {
      const verified = jwt.verify(token, this.secretKey) as JwtPayload;
      // req.isVerify = verified;
      next();
    } catch (err) {
      res.status(400).json({
        status: false,
        statusCode: 400,
        message: "Invalid Token",
      });
    }
  };
}

export default AuthMiddleware;
