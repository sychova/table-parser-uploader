import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";

import Base from "./base";
import ImportType from "./importType";
import DimensionCoordinates from "./dimensionCoordinates";
import UploadsLogActionsParams from "./uploadsLogActionsParams";

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

  @OneToMany(
    () => DimensionCoordinates,
    (coordinateSet) => coordinateSet.importData
  )
  data: DimensionCoordinates[];

  @OneToMany(
    () => UploadsLogActionsParams,
    (uploadsLogActionsParams) => uploadsLogActionsParams.upload
  )
  actionParams: UploadsLogActionsParams[];
}
