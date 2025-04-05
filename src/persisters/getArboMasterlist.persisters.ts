import NoDataFoundError from '../errors/NoDataFoundError.ts';
import { CryptGetArboMasterlistResModel } from '../model/crypt/getArboMasterlistCrypt.model.ts';
import DB from '../service/db.service.ts';
import { encrypt } from '../utils/crypt.util.ts';

const getArboMasterlist = async (params?: CryptGetArboMasterlistResModel[], requestSearch?: boolean) => {
  const sql = `SELECT * FROM arbo_masterlist`;
  if (!requestSearch) {
    const res = (await DB.execute(sql)) as [];
    if (res.length === 0) {
      throw new NoDataFoundError([{ message: 'data not found' }]);
    }
    return res;
  }
  const result = await conditionalData(sql, params);

  return result;
};

// to follow
const conditionalData = async (sql: string, params?: CryptGetArboMasterlistResModel[]) => {
  const encyptedNull = encrypt(null);
  for (const data of params!) {
    if (data.region_name !== encyptedNull) {
      const query = ' WHERE region_name = ?';
      const input = [data.region_name];

      const res = (await DB.addConditionQuery(sql, query, input)) as [];

      if (res.length === 0) {
        throw new NoDataFoundError([{ message: 'not found' }]);
      }
      return res;
    }
    if (data.id !== encyptedNull) {
      const query = ' WHERE id = ?';
      const input = [data.id];

      const res = (await DB.addConditionQuery(sql, query, input)) as [];

      if (res.length === 0) {
        throw new NoDataFoundError([{ message: 'not found' }]);
      }
      return res;
    }
  }
};

export default getArboMasterlist;
