import { Request, Response } from 'express';
import { imageProcess } from '../utils/imageUpload.utils';
import ValidationError from '../errors/ValidationError';

const sampleUploadController = async (req: Request, res: Response) => {
  if (!req.file)
    return res.status(400).json({
      success: false,
      message: 'Invalid format or No file uploaded.',
    });

  const imageData = imageProcess(req.file.path);
  if (
    imageData.fileName !== '' ||
    imageData.filePath !== '' ||
    imageData.gpsData !== null
  ) {
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${imageData.fileName}`;
    res.status(201).json({
      success: true,
      fileUrl,
      gpsData: imageData.gpsData || 'No GPS data found',
    });
  } else {
    throw new ValidationError([
      {
        property: 'image',
        message: 'Invalid image format',
      },
    ]);
  }
};

export default sampleUploadController;
