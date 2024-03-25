import multer from "multer";
import { extname } from "path";
import fs from "fs";

const ALLOWED_EXTENSIONS = [".csv", ".xls", ".xlsx", ".png"];

// const singleFile = multer({
//   limits: {
//     fileSize: 10485760,
//   },
//   storage: multer.diskStorage({
//     destination(req, file, cb) {
//       cb(null, "./public/img/products/");
//     },
//     filename(req, file, cb) {
//       cb(null, Date.now() + path.extname(file.originalname));
//     },
//   }),
//   fileFilter(req, file, cb) {
//     const fileExtension = path.extname(file.originalname);
//     if (ALLOWED_EXTENSIONS.includes(fileExtension)) {
//       return cb(null, true);
//     }
//     // req.fileError =
//     //   "This format is not allowed. Allowed formats are jpg, jpeg, png";
//     return cb(null, false);
//   },
// }).single("image");

// const singleFileUpload = (req: any, res: any, next: any) => {
//   singleFile(req, res, (error) => {
//     if (!error || error.code !== "LIMIT_FILE_SIZE") return next();

//     req.fileError = "File size is too big. Max allowed size is 10 Mb.";
//     return next();
//   });
// };

const pathCreator = (originalname: string) => {
  const fullDate = new Date();

  const year = fullDate.getFullYear();
  const month = fullDate.getMonth() + 1;
  const fullMonth = month.toString().length > 1 ? month : `0${month}`;
  const day = fullDate.getDate();

  return `files/${year}/${fullMonth}/${day}`;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = pathCreator(file.originalname);
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const singleFileUpload = multer({ storage }).single("file");

export default singleFileUpload;
