/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
declare module 'exif-parser' {
  // eslint-disable-next-line no-unused-vars
  interface ExifData {
    tags: Record<string, any>;
    imageSize: { width: number; height: number };
  }

  class ExifParser {
    static create(_buffer: Buffer): ExifParser;
    parse(): { tags: Record<string, any> };
  }

  export default ExifParser;
}
