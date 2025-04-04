import NoDataFoundError from '../errors/NoDataFoundError.ts';
import { CryptGetArboMasterlistResModel } from '../model/crypt/getArboMasterlistCrypt.model.ts';
import DB from './db.service.ts';

const getArboMasterlist = async (params?: CryptGetArboMasterlistResModel[]) => {
  const sql = `SELECT * FROM arbo_masterlist`;
  if (params === undefined) {
    const res = (await DB.execute(sql)) as [];
    if (res.length === 0) {
      throw new NoDataFoundError([{ message: 'data not found' }]);
    }
    return res;
  }
  const result = await conditionalData(params, sql);

  return result;
};

// to follow
const conditionalData = async (params: CryptGetArboMasterlistResModel[], sql: string) => {
  for (const data of params) {
    if (data.total_2) {
      const query = ' WHERE total_2 = ?';
      const input = [data.total_2];

      const res = (await DB.addConditionQuery(sql, query, input)) as [];

      if (res.length === 0) {
        throw new NoDataFoundError([{ message: 'not found' }]);
      }
      return res;
    }
    if (data.baseline_total_arbs) {
      const query = ' WHERE baseline_total_arbs = ?';
      const input = [data.baseline_total_arbs];

      const res = (await DB.addConditionQuery(sql, query, input)) as [];

      if (res.length === 0) {
        throw new NoDataFoundError([{ message: 'not found' }]);
      }
      return res;
    }
  }
};

export default getArboMasterlist;
