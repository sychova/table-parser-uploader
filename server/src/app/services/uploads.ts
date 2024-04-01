import { Repository } from "typeorm";

import { AppDataSource } from "../../data-source";
import { UploadsLog } from "../entities";

const uploadsRepository: Repository<UploadsLog> =
  AppDataSource.getRepository(UploadsLog);

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

export { getAll, getById, create };
