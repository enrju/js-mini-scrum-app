import {createPool} from 'mysql2/promise';
import { dbConfig } from "../../config/db-config";

export const pool = createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  database: dbConfig.database,
  namedPlaceholders: true,
  decimalNumbers: true,
});