import { QueryResult } from 'mysql2';
import connection from '../config/db.config';
import { errorLogger } from '../log';

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const [results]: any = await connection.query(sql, value);

      return results;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      errorLogger(err);
      throw new Error(err.message);
    }
  }
}

export default DB;
