export default interface BaseDb {
  id: number;
  createdDate: string;
  updatedDate: string;
  deletedDate: string | null;
}
