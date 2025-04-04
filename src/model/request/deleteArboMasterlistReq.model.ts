import { z } from 'zod';

// for delete request model
export const deleteArboMasterlistReqModel = z.object({
  id: z.string(),
});
export type DeleteArboMasterlistReqModel = z.infer<typeof deleteArboMasterlistReqModel>;
