import * as multer from 'multer';
// create storege for files
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, './src/task-4/upload');
  },
  filename: function (_req: any, file: any, cb: any) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });
