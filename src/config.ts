import { randomInt } from 'crypto';
import { diskStorage } from 'multer';


export const storageConfig = (folder: string) =>
  diskStorage({
    destination: `uploads/${folder}`,
    filename: (req, file, cb) => {
      cb(null, Date.now() + randomInt(9999) + file.originalname.slice(-6));
    },
  });
