import { Entity, Column, ManyToOne } from "typeorm";

import Base from "./base";
import ImportType from "./importType";

@Entity("import_type_actions")
export default class ImportTypeActions extends Base {
  @Column()
  name: string;

  @ManyToOne(() => ImportType, (importType) => importType.actions)
  importType: ImportType;
}
