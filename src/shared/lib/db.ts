import mysql from 'mysql2/promise';

import { SERVER_ENV } from '../config/env';

declare global {
  // Next.js dev 모드에서 HMR 시 풀이 중복 생성되지 않도록 global에 캐싱
  // eslint-disable-next-line no-var
  var _mysqlPool: mysql.Pool | undefined;
}

function createPool(): mysql.Pool {
  return mysql.createPool({
    host: SERVER_ENV.DB_HOST,
    port: SERVER_ENV.DB_PORT,
    user: SERVER_ENV.DB_USER,
    password: SERVER_ENV.DB_PASSWORD,
    database: SERVER_ENV.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

const pool: mysql.Pool = global._mysqlPool ?? createPool();

if (process.env.NODE_ENV !== 'production') {
  global._mysqlPool = pool;
}

export default pool;
