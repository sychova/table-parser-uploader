import multer from "multer";
import path from "path";

const ALLOWED_EXTENSIONS = [".csv", ".xls", ".xlsx"];

const singleFile = multer({
  limits: {
    fileSize: 10485760,
  },
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./public/img/products/");
    },
    filename(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
  fileFilter(req, file, cb) {
    const fileExtension = path.extname(file.originalname);
    if (ALLOWED_EXTENSIONS.includes(fileExtension)) {
      return cb(null, true);
    }
    req.fileError =
      "This format is not allowed. Allowed formats are jpg, jpeg, png";
    return cb(null, false);
  },
}).single("image");

const singleFileUpload = (req: any, res: any, next: any) => {
  singleFile(req, res, (error) => {
    if (!error || error.code !== "LIMIT_FILE_SIZE") return next();

    req.fileError = "File size is too big. Max allowed size is 10 Mb.";
    return next();
  });
};

export default singleFileUpload;
