import { Entity, Column } from "typeorm";

import Base from "./base";

@Entity("uploads")
export default class Uploads extends Base {
  @Column()
  name: string;
}
