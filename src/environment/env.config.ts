import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

interface Env {
    PORT?: number
    JWT_SECRET?: string;
}

interface Config {
    PORT?: number
    JWT_SECRET?: string;
}

const getConfig = (): Env => {
  return {
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    JWT_SECRET: process.env.JWT_SECRET ? process.env.JWT_SECRET : undefined
  };
};

const getSanitzedConfig = (config: Env): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env file`);
    }
  }
  return config as Config;
};

const config = getConfig();

const envConfig = getSanitzedConfig(config);

export default envConfig;

