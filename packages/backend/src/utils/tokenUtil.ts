import jwt from "jsonwebtoken";
import UserDocument from "../resources/user/user.interface";
import Token from "../utils/interfaces/token.interface";
import { ConfigService } from "./ConfigService";

const configService = new ConfigService();
export const createToken = (user: UserDocument): string => {
  return jwt.sign(
    { id: user._id },
    configService.get("JWT_SECRET") as jwt.Secret,
    {
      expiresIn: "1h",
    }
  );
};

export const verifyToken = async (
  token: string
): Promise<jwt.VerifyErrors | Token> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      configService.get("JWT_SECRET") as jwt.Secret,
      (err, payload) => {
        if (err) return reject(err);
        resolve(payload as Token);
      }
    );
  });
};

export default { createToken, verifyToken };
