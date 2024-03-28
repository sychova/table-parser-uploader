import { Repository } from "typeorm";
import XLSX from "xlsx";

import { AppDataSource } from "../../data-source";
import { ImportTypeActions, UploadsLogActionsParams } from "../entities";
import DimensionCoordinates from "../entities/dimensionCoordinates";

const dimensionCoordinatesRepository: Repository<DimensionCoordinates> =
  AppDataSource.getRepository(DimensionCoordinates);

const importTypeActionsRepository: Repository<ImportTypeActions> =
  AppDataSource.getRepository(ImportTypeActions);

const uploadsLogActionsParams: Repository<UploadsLogActionsParams> =
  AppDataSource.getRepository(UploadsLogActionsParams);

const parseCSV = async (file: any): Promise<any> => {
  console.log("csv");
};

const parseXLSX = async (file: any): Promise<any> => {
  const fileRead = XLSX.readFile(`${file.destination}/${file.originalname}`);
  const fileSheets = fileRead.SheetNames;

  const data = XLSX.utils.sheet_to_json(fileRead.Sheets[fileSheets[0]], {
    blankrows: false,
    defval: "",
  });

  const actions = XLSX.utils.sheet_to_json(fileRead.Sheets[fileSheets[1]], {
    blankrows: false,
    defval: "",
  });

  return {
    data,
    actions,
  };
};

const parse = async (file: any): Promise<void> => {
  const fileFormat = file.originalname
    .slice(file.originalname.lastIndexOf(".") + 1)
    .toLowerCase();

  switch (fileFormat) {
    case "csv":
      return parseCSV(file);
    case "xls":
      return parseXLSX(file);
    case "xlsx":
      return parseXLSX(file);
    default:
      console.log("File format not supported");
  }
};

const saveData = async (logId: any, parsedData: any) => {
  const data = parsedData.map((elem: any) => {
    elem.importData = logId;
    return elem;
  });

  await dimensionCoordinatesRepository
    .createQueryBuilder()
    .insert()
    .into("dimension_coordinates")
    .values(data)
    .execute();
};

const saveActions = async (logId: any, parsedActions: any) => {
  const actionsIds: any = {};
  for (const elem of parsedActions) {
    const actionId: any = await importTypeActionsRepository.findOne({
      select: ["id"],
      where: { name: elem.action },
    });

    actionsIds[elem.action] = actionId.id;
  }

  const actions = await parsedActions.map((elem: any) => {
    elem.upload = logId;
    elem.action = actionsIds[elem.action];
    return elem;
  });

  await uploadsLogActionsParams
    .createQueryBuilder()
    .insert()
    .into("uploads_log_actions_params")
    .values(actions)
    .execute();
};

export { parse, saveData, saveActions };
