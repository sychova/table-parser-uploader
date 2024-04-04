import { ActionParamsDb } from ".";

export default interface UploadDb {
  actionParams: ActionParamsDb[];
  createdDate: string;
  deletedDate: string | null;
  format: string;
  id: number;
  importType: string;
  name: string;
  path: string;
  size: number;
  updatedDate: string;
}
