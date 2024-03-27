import { Repository } from "typeorm";

import { AppDataSource } from "../../data-source";
import { UploadsLog } from "../entities";

const uploadsRepository: Repository<UploadsLog> =
  AppDataSource.getRepository(UploadsLog);

const parseCSV = async (file: any): Promise<void> => {
  console.log("csv");
  console.log("file", file);
};

const parseXLSX = async (file: any): Promise<void> => {
  console.log("xls or xlsx");
  console.log("file", file);
};

const parse = async (file: any): Promise<void> => {
  const fileFormat = file.originalname
    .slice(file.originalname.lastIndexOf(".") + 1)
    .toLowerCase();

  switch (fileFormat) {
    case "csv":
      parseCSV(file);
      break;
    case "xls":
      parseXLSX(file);
      break;
    case "xlsx":
      parseXLSX(file);
      break;
    default:
      console.log("File format not supported");
  }
};

export { parse };
