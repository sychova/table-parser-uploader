import { Repository } from "typeorm";

import { AppDataSource } from "../../data-source";
import {
  UploadsLog,
  DimensionCoordinates,
  UploadsLogActionsParams,
} from "../entities";

const uploadsRepository: Repository<UploadsLog> =
  AppDataSource.getRepository(UploadsLog);

const dimensionCoordinates: Repository<DimensionCoordinates> =
  AppDataSource.getRepository(DimensionCoordinates);

const uploadsLogActionsParams: Repository<UploadsLogActionsParams> =
  AppDataSource.getRepository(UploadsLogActionsParams);

const getAll = async (): Promise<UploadsLog[]> => {
  const uploads: UploadsLog[] = await uploadsRepository.find({
    relations: ["importType", "actionParams", "actionParams.action"],
  });

  return uploads;
};

const getById = async (uploadId: any): Promise<any> => {
  const upload = await uploadsRepository.findOne({
    where: { id: uploadId },
    relations: ["importType", "actionParams", "actionParams.action"],
  });

  return upload;
};

const create = async (newUploadData: any) => {
  const upload: UploadsLog = uploadsRepository.create({
    name: newUploadData.name,
    size: newUploadData.size,
    format: newUploadData.format,
    path: newUploadData.path,
  });

  await uploadsRepository.save(upload);

  return upload;
};

const getUploadData = async (id: number) => {
  const data: DimensionCoordinates[] = await dimensionCoordinates.find({
    where: { importData: { id } },
    select: ["x", "y", "z"],
  });

  return data;
};

const getUploadActions = async (id: number) => {
  const actionsDb: UploadsLogActionsParams[] =
    await uploadsLogActionsParams.find({
      relations: ["action"],
      where: {
        upload: { id },
      },
      select: ["action", "param"],
    });

  return actionsDb;
};

export { getAll, getById, create, getUploadData, getUploadActions };
