import mysql, { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';

declare global {
  // eslint-disable-next-line no-var
  var __astro_db_pool: Pool | undefined;
}

function getPool(): Pool {
  if (global.__astro_db_pool) {
    return global.__astro_db_pool;
  }

  const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'astro',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000,
    timezone: '+05:30', // Indian Standard Time (IST)
    decimalNumbers: true,
  });

  if (process.env.NODE_ENV !== 'production') {
    global.__astro_db_pool = pool;
  }

  return pool;
}

export const pool = getPool();

/**
 * Execute a structured SELECT query with prepared statement parameters
 */
export async function query<T = RowDataPacket[]>(sql: string, params: any[] = []): Promise<T> {
  const [rows] = await pool.execute(sql, params);
  return rows as T;
}

/**
 * Execute an INSERT / UPDATE / DELETE statement with prepared parameters
 */
export async function execute(sql: string, params: any[] = []): Promise<ResultSetHeader> {
  const [result] = await pool.execute(sql, params);
  return result as ResultSetHeader;
}

/**
 * Run a multi-statement transaction safely
 */
export async function withTransaction<T>(
  callback: (connection: mysql.PoolConnection) => Promise<T>
): Promise<T> {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  try {
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export default pool;
