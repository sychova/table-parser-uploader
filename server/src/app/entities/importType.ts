import { Entity, Column, OneToMany } from "typeorm";

import Base from "./base";
import UploadsLog from "./uploadsLog";
import ImportTypeActions from "./importTypeActions";

@Entity("import_type")
export default class ImportType extends Base {
  @Column()
  name: string;

  @OneToMany(() => UploadsLog, (upload) => upload.importType)
  uploads: UploadsLog[];

  @OneToMany(
    () => ImportTypeActions,
    (importTypeAction) => importTypeAction.importType
  )
  actions: ImportTypeActions[];
}
