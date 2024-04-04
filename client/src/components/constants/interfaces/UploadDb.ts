import { ActionParamsDb, BaseDb } from ".";

export default interface UploadDb extends BaseDb {
  actionParams: ActionParamsDb[];
  format: string;
  importType: string;
  name: string;
  path: string;
  size: number;
}
