import sampleUploadRoutes from './routes/sampleUploadRout';
import deleteArboMasterlistRoutes from './routes/deleteArboMasterlist.routes';
import getArboMasterlistRoutes from './routes/getArboMasterlist.routes';
import createArboMasterListRoutes from './routes/createArboMasterlist.routes';
import updateArboMasterlistRoute from './routes/updateArboMasterlist.routes';

export const routes = [
  { path: '/api/arbo-masterlist', route: getArboMasterlistRoutes },
  { path: '/api/arbo-masterlist/delete', route: deleteArboMasterlistRoutes },
  { path: '/api/arbo-masterlist/register', route: createArboMasterListRoutes },
  { path: '/api/arbo-masterlist/update', route: updateArboMasterlistRoute },
  { path: '/api/users/upload', route: sampleUploadRoutes },
];
