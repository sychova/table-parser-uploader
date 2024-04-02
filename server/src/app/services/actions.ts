import { Repository } from "typeorm";

import { AppDataSource } from "../../data-source";
import { ImportTypeActions } from "../entities";

const actionsRepository: Repository<ImportTypeActions> =
  AppDataSource.getRepository(ImportTypeActions);

const getAll = async (): Promise<ImportTypeActions[]> => {
  const actions: ImportTypeActions[] = await actionsRepository.find();

  return actions;
};

export { getAll };
