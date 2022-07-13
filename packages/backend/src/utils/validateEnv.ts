import { cleanEnv, port, str } from "envalid";

function validateEnv(): void {
  cleanEnv(process.env, {
    NODE_ENV: str({ choices: ["development", "production"] }),
    MONGO_PASSWORD: str(),
    MONGO_PATH: str(),
    MONGO_USER: str(),
    PORT: port({ default: 5000 }),
    JWT_SECRET: str(),
    STRIPE_API_SECRET_KEY: str(),
    GOOGLE_MAPS_API_KEY: str(),
  });
}

export default validateEnv;
