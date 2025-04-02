import sampleUploadRoute from './routes/sampleUploadRout';
import userDeleteRoute from './routes/userDeleteRout';
import userGetRoute from './routes/userGetroute';
import createArboMasterListRoute from './routes/createArboMasterlist.route';

export const routes = [
  { path: '/api/users', route: userGetRoute },
  { path: '/api/users/delete', route: userDeleteRoute },
  { path: '/api/arbo-masterlist/register', route: createArboMasterListRoute },
  { path: '/api/users/upload', route: sampleUploadRoute },
];
