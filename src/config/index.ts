import path from "node:path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  db: process.env.DB_URL,
  round: process.env.SALT_ROUND,
  secrit: process.env.SECRIT,
  cloudinary_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_secret: process.env.CLOUDINARY_API_SECRET,
};
