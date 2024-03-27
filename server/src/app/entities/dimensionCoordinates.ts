import { Entity, Column, ManyToOne } from "typeorm";

import Base from "./base";
import UploadsLog from "./uploadsLog";
import ImportTypeActions from "./importTypeActions";

@Entity("dimension_coordinates")
export default class DimensionCoordinates extends Base {
  @Column()
  x: number;

  @Column()
  y: number;

  @Column()
  z: number;

  @ManyToOne(() => UploadsLog, (uploadsLog) => uploadsLog.data)
  importData: UploadsLog;
}
