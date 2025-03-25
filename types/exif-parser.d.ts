declare module 'exif-parser' {
  interface ExifData {
    tags: Record<string, any>;
    imageSize: { width: number; height: number };
  }

  class ExifParser {
    static create(buffer: Buffer): ExifParser;
    parse(): { tags: Record<string, any> };
  }

  export default ExifParser;
}
