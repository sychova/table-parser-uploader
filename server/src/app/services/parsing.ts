import { Repository } from "typeorm";
import XLSX from "xlsx";

import { AppDataSource } from "../../data-source";
import { UploadsLog } from "../entities";

const uploadsRepository: Repository<UploadsLog> =
  AppDataSource.getRepository(UploadsLog);

const parseCSV = async (file: any): Promise<void> => {
  console.log("csv");
};

const parseXLSX = async (file: any): Promise<void> => {
  console.log("xls or xlsx");

  const fileRead = XLSX.readFile(`${file.destination}/${file.originalname}`);
  const fileSheets = fileRead.SheetNames;
  const fileData = XLSX.utils.sheet_to_json(fileRead.Sheets[fileSheets[0]], {
    blankrows: false,
    defval: "",
  });

  const fileActions = XLSX.utils.sheet_to_json(fileRead.Sheets[fileSheets[1]], {
    blankrows: false,
    defval: "",
  });

  console.log("fileData", fileData);

  console.log("fileActions", fileActions);
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
