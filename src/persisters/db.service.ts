import { QueryResult } from 'mysql2';
import connection from '../config/db.config';
import createLogger from '../log';

class DB {
  /**
   * adding conditions to the first query
   * @param {string} sql
   * @param {string} sql_query
   * @param {any[]} value
   * @returns {Promise<QueryResult | undefined>}
   */
  static async addConditionQuery(
    sql: string,
    sql_query: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any[]
  ): Promise<QueryResult | undefined> {
    if (!sql || !sql_query || !value.length) return;

    const newSql = sql.concat(sql_query);

    const results = await this.execute(newSql, value);

    return results;
  }

  /**
   * execute a query
   * @param {string} sql
   * @param {any[]} value
   * @returns {Promise<QueryResult | undefined>}
   */

  static async execute(
    sql: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any[]
  ): Promise<QueryResult | undefined> {
    if (!sql) return;
    try {
      createLogger(sql);
      const [results] = await connection.execute(sql, value);

      createLogger(results);

      return results;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}

export default DB;
