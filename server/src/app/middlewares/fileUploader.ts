import multer from "multer";
import fs from "fs";

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
