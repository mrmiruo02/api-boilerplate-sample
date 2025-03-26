import express from 'express';
import sampleUploadController from '../controllers/sampleUploadController';
import { upload } from '../components/imageUpload';

const sampleUploadRoute = express.Router();

// register users
sampleUploadRoute.post(
  '/',
  upload.single('image'),
  (req: express.Request, res: express.Response) => {
    sampleUploadController(req, res);
  }
);

export default sampleUploadRoute;
