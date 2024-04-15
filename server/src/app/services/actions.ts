import { Repository } from "typeorm";

import { AppDataSource } from "../../data-source";
import {
  DimensionCoordinates,
  ImportTypeActions,
  UploadsLogActionsParams,
} from "../entities";
import { Coordinate } from "../constants/interfaces";

const actionsRepository: Repository<ImportTypeActions> =
  AppDataSource.getRepository(ImportTypeActions);

const dataProcessingActions: { [key: string]: Function } = {
  moveByX: (coordinate: Coordinate, param: number) => {
    coordinate.x += param;

    return coordinate;
  },
  moveByY: (coordinate: Coordinate, param: number) => {
    coordinate.y += param;

    return coordinate;
  },
  moveByZ: (coordinate: Coordinate, param: number) => {
    coordinate.z += param;

    return coordinate;
  },
  rotateByX: (coordinate: Coordinate, param: number) => {
    const angle = (param * Math.PI) / 180;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    const { y, z } = coordinate;

    coordinate.y = y * cos - z * sin;
    coordinate.z = y * sin + z * cos;

    return coordinate;
  },
  rotateByY: (coordinate: Coordinate, param: number) => {
    const angle = (param * Math.PI) / 180;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    const { x, z } = coordinate;

    coordinate.x = x * cos + z * sin;
    coordinate.z = -x * sin + z * cos;

    return coordinate;
  },
  rotateByZ: (coordinate: Coordinate, param: number) => {
    const angle = (param * Math.PI) / 180;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    const { x, y } = coordinate;

    coordinate.x = x * cos - y * sin;
    coordinate.y = x * sin + x * cos;

    return coordinate;
  },
};

const getAll = async (): Promise<ImportTypeActions[]> => {
  const actions: ImportTypeActions[] = await actionsRepository.find();

  return actions;
};

const processData = async (
  data: DimensionCoordinates[],
  actions: UploadsLogActionsParams[]
) => {
  data.forEach(async (elem: DimensionCoordinates) => {
    actions.forEach((action: UploadsLogActionsParams) => {
      elem = dataProcessingActions[action.action.name](elem, action.param);
    });
  });

  return data;
};

export { getAll, processData };
