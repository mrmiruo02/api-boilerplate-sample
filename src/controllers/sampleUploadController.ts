import { Request, Response } from "express";
import { imageProcess } from "../components/imageUpload";

const sampleUploadController = async (
  req: Request,
  res: Response
) => {
  if (!req.file) return res.status(400).json({
    success: false,
    message: "Invalid format or No file uploaded."
  });

  const imageData = imageProcess(req.file.path);
  if (imageData.fileName !== '' || imageData.filePath !== '' || imageData.gpsData !== null) {
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${imageData.fileName}`;
    res.json({
      success: true,
      fileUrl,
      gpsData: imageData.gpsData || "No GPS data found",
    });
  } else {
    return res.status(404).json({
      message: 'invalid image format'
    });
  }

};

export default sampleUploadController;
