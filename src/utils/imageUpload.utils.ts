import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { GPSData } from './types/imageUpload.types';
import ExifParser from 'exif-parser';

dotenv.config();

/**
 * Ensure 'uploads' directory exists
 */
const UPLOADS_FOLDER = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(UPLOADS_FOLDER)) {
  fs.mkdirSync(UPLOADS_FOLDER, { recursive: true });
}

/**
 * Multer setup to store files in 'uploads' folder
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}_${file.originalname}`;
    cb(null, uniqueName);
  },
});

// File filter to reject invalid files before saving
const fileFilter = (
  req: unknown,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedExtensions = ['.jpg', '.jpeg'];
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedExtensions.includes(ext)) {
    return cb(null, false);
  }

  cb(null, true);
};
const upload = multer({ storage, fileFilter });

/**
 * @param {string} filePath
 * Function to extract GPS data from an image
 * @returns { latitude: string, longitude: string, null}
 */
const extractGPS = (filePath: string): GPSData | null => {
  const buffer = fs.readFileSync(filePath);
  const parser = ExifParser.create(buffer);
  const result = parser.parse();

  if (result.tags.GPSLatitude && result.tags.GPSLongitude) {
    return {
      latitude: result.tags.GPSLatitude,
      longitude: result.tags.GPSLongitude,
    };
  }
  return null;
};

/**
 * Process an uploaded image file
 * @param {string} filePath
 * @returns { {filePath: string, fileName: string, gpsData: GPSData | null} }
 */
const imageProcess = (
  filePath: string
): { filePath: string; fileName: string; gpsData: GPSData | null } => {
  const fileName = path.basename(filePath);
  const gpsData = extractGPS(filePath);

  return { filePath, fileName, gpsData };
};

export { imageProcess, upload };
