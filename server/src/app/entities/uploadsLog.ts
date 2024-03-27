import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";

import Base from "./base";
import ImportType from "./importType";
import ImportTypeActions from "./importTypeActions";

@Entity("uploads_log")
export default class UploadsLog extends Base {
  @Column()
  name: string;

  @Column({ default: null })
  size: number;

  @Column({ default: null })
  format: string;

  @Column({ default: null })
  path: string;

  @ManyToOne(() => ImportType, (importType) => importType.uploads)
  importType: ImportType;

  @ManyToMany(() => ImportTypeActions)
  @JoinTable()
  actions: ImportTypeActions[];
}
