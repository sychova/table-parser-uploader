import { Repository } from "typeorm";
import XLSX from "xlsx";
import csvtojson from "csvtojson";

import { AppDataSource } from "../../data-source";
import { ImportTypeActions, UploadsLogActionsParams } from "../entities";
import DimensionCoordinates from "../entities/dimensionCoordinates";
import {
  Action,
  Coordinate,
  ParsedFile,
  ActionParam,
  FileData,
} from "../constants/interfaces";

const dimensionCoordinatesRepository: Repository<DimensionCoordinates> =
  AppDataSource.getRepository(DimensionCoordinates);

const importTypeActionsRepository: Repository<ImportTypeActions> =
  AppDataSource.getRepository(ImportTypeActions);

const uploadsLogActionsParams: Repository<UploadsLogActionsParams> =
  AppDataSource.getRepository(UploadsLogActionsParams);

const parseCSV = async (
  file: FileData
): Promise<{ data: Coordinate[]; actions: Action[] }> => {
  const data: Coordinate[] = await csvtojson().fromFile(
    `${file.destination}/${file.originalname}`
  );

  return {
    data,
    actions: [],
  };
};

const parseXLSX = async (
  file: FileData
): Promise<{ data: Coordinate[]; actions: Action[] }> => {
  const fileRead = XLSX.readFile(`${file.destination}/${file.originalname}`);
  const fileSheets = fileRead.SheetNames;

  const data: Coordinate[] = XLSX.utils.sheet_to_json(
    fileRead.Sheets[fileSheets[0]],
    {
      blankrows: false,
      defval: "",
    }
  );

  const actions: Action[] = XLSX.utils.sheet_to_json(
    fileRead.Sheets[fileSheets[1]],
    {
      blankrows: false,
      defval: "",
    }
  );

  return {
    data,
    actions,
  };
};

const parse = async (file: FileData): Promise<ParsedFile> => {
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
      return Promise.reject(new Error("File format not supported"));
  }
};

const getActionIds = async (actions: Action[]) => {
  const actionsIds: { [key: string]: number } = {};

  for (const elem of actions) {
    const actionId: ImportTypeActions =
      (await importTypeActionsRepository.findOne({
        select: ["id"],
        where: { name: elem.action },
      })) as ImportTypeActions;

    actionsIds[elem.action] = actionId.id;
  }

  return actionsIds;
};

const saveData = async (logId: number, parsedData: Coordinate[]) => {
  const data = parsedData.map((elem: Coordinate) => {
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

const saveActions = async (
  logId: number,
  fileExtension: string,
  parsedActions: Action[]
) => {
  if (fileExtension === ".csv") {
    const actions: ActionParam[] = parsedActions.map((elem: Action) => {
      const elemResult: ActionParam = {
        param: elem.param,
        action: elem.id!,
        upload: logId,
      };

      return elemResult;
    });

    await uploadsLogActionsParams
      .createQueryBuilder()
      .insert()
      .into("uploads_log_actions_params")
      .values(actions)
      .execute();
  }

  if ([".xls", ".xlsx"].includes(fileExtension)) {
    const actionsIds: { [key: string]: number } = await getActionIds(
      parsedActions
    );

    const actions: ActionParam[] = parsedActions.map((elem: Action) => {
      const elemResult: ActionParam = {
        param: elem.param,
        upload: logId,
        action: actionsIds[elem.action],
      };

      return elemResult;
    });

    await uploadsLogActionsParams
      .createQueryBuilder()
      .insert()
      .into("uploads_log_actions_params")
      .values(actions)
      .execute();
  }
};

export { parse, saveData, saveActions, getActionIds };
