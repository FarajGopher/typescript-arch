import fs from 'fs';
import yaml from 'js-yaml';

interface Configuration {
    host: string;
    port: number;
    base_path: string;
    mysql: {
      host: string;
      user: string;
      password: string;
      db: string;
      dialect: string;
      pool: {
        max: number;
        min: number;
        acquire: number;
        idle: number;
      };
    };
    smtp: {
      service: string;
      username: string;
      password: string;
    };
    referral: {
      base_path: string;
      method: string;
    };
    wallet: {
      base_path: string;
      method: string;
    };
  }
  

let config: Configuration
// Read config file
try {
      config = yaml.load(
      fs.readFileSync('/home/faraj/typescript/app/config/default.yaml', 'utf8')
    );
    console.log("Configuration file loaded successfully", config);
  } catch (error) {
    console.log(error);
  }

export default config;