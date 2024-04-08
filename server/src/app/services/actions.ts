import { Repository } from "typeorm";

import { AppDataSource } from "../../data-source";
import { ImportTypeActions } from "../entities";

const actionsRepository: Repository<ImportTypeActions> =
  AppDataSource.getRepository(ImportTypeActions);

const getAll = async (): Promise<ImportTypeActions[]> => {
  const actions: ImportTypeActions[] = await actionsRepository.find();

  return actions;
};

const moveByX = (coordinates: any, param: number) => {
  const newCoordinates = coordinates.map((coordinate: any) => {
    coordinate.x += param;
  });

  return newCoordinates;
};

const moveByY = (coordinates: any, param: number) => {
  const newCoordinates = coordinates.map((coordinate: any) => {
    coordinate.y += param;
  });

  return newCoordinates;
};

const moveByZ = (coordinates: any, param: number) => {
  const newCoordinates = coordinates.map((coordinate: any) => {
    coordinate.z += param;
  });

  return newCoordinates;
};

const rotateByX = (coordinates: any, param: number) => {
  const angle = (param * Math.PI) / 180;
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);

  const newCoordinates = coordinates.map((coordinate: any) => {
    const { y, z } = coordinate;

    coordinate.y = y * cos - z * sin;
    coordinate.z = y * sin + z * cos;
  });

  return newCoordinates;
};

const rotateByY = (coordinates: any, param: number) => {
  const angle = (param * Math.PI) / 180;
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);

  const newCoordinates = coordinates.map((coordinate: any) => {
    const { x, z } = coordinate;

    coordinate.x = x * cos + z * sin;
    coordinate.z = -x * sin + z * cos;
  });

  return newCoordinates;
};

const rotateByZ = (coordinates: any, param: number) => {
  const angle = (param * Math.PI) / 180;
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);

  const newCoordinates = coordinates.map((coordinate: any) => {
    const { x, y } = coordinate;

    coordinate.x = x * cos - y * sin;
    coordinate.y = x * sin + x * cos;
  });

  return newCoordinates;
};

export { getAll, moveByX, moveByY, moveByZ, rotateByX, rotateByY, rotateByZ };
