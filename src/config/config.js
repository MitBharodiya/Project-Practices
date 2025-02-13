import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });
  
const config = {
  port: parseInt(process.env.PORT),
  db: {
    mongoURI: process.env.MONGO_URI,
  },
  redis:{
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    username: process.env.REDIS_USERNAME,
    url:process.env.REDIS_URL
  },
  otp:{
    smsapiurl:process.env.SMSAPIURL,
    apikey:process.env.APIKEY,
    sender:process.env.SENDER
  }
}

export default config;