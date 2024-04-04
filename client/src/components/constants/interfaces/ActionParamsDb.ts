import { ActionDb, BaseDb } from ".";

export default interface ActionParamsDb extends BaseDb {
  param: number;
  action: ActionDb;
}
