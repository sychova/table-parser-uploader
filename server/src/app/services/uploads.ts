import { Repository } from "typeorm";

import { AppDataSource } from "../../data-source";
import { UploadsLog } from "../entities";

const uploadsRepository: Repository<UploadsLog> =
  AppDataSource.getRepository(UploadsLog);

const getAll = async (): Promise<UploadsLog[]> => {
  const uploads: UploadsLog[] = await uploadsRepository.find();

  return uploads;
};

const create = async (newUploadData: any) => {
  const upload: UploadsLog = new UploadsLog();
  upload.name = newUploadData.name;
  upload.size = newUploadData.size;
  upload.format = newUploadData.format;
  upload.path = newUploadData.path;
  const newUpload: UploadsLog = await uploadsRepository.save(upload);
  return newUpload;
};

export { getAll, create };
