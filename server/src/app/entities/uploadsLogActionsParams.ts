import { Entity, Column, ManyToOne } from "typeorm";

import Base from "./base";
import ImportType from "./importType";
import ImportTypeActions from "./importTypeActions";
import UploadsLog from "./uploadsLog";

@Entity("uploads_log_actions_params")
export default class UploadsLogActionsParams extends Base {
  @Column()
  params: string;

  @ManyToOne(() => UploadsLog, (uploadsLog) => uploadsLog.actionParams)
  upload: ImportType;

  @ManyToOne(
    () => ImportTypeActions,
    (importTypeActions) => importTypeActions.actionParams
  )
  action: ImportTypeActions;
}
