import { Entity, Column, ManyToOne, OneToMany } from "typeorm";

import Base from "./base";
import ImportType from "./importType";
import UploadsLogActionsParams from "./uploadsLogActionsParams";

@Entity("import_type_actions")
export default class ImportTypeActions extends Base {
  @Column()
  name: string;

  @ManyToOne(() => ImportType, (importType) => importType.actions)
  importType: ImportType;

  @OneToMany(
    () => UploadsLogActionsParams,
    (uploadsLogActionsParams) => uploadsLogActionsParams.action
  )
  actionParams: UploadsLogActionsParams[];
}
