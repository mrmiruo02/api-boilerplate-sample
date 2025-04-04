import { RowDataPacket } from 'mysql2';
import { z } from 'zod';

// for delete response model
export const deleteArboMasterlistResModel = z.array(
  z.object({
    id: z.string(),
  })
);
export type DeleteArboMasterlistResModel = z.infer<typeof deleteArboMasterlistResModel> & RowDataPacket;
