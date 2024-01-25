import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import User from "./user.model";

@Table({
  tableName: "login-activities",
  timestamps: true,
  updatedAt: false,
})
export default class LoginActivity extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    field: "id",
  })
  id?: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: "user_id",
  })
  userId?: string;

  @BelongsTo(() => User)
  user?: User;

  @Column({
    type: DataType.STRING,
    field: "device",
  })
  device?: string;

  @Column({
    type: DataType.STRING,
    field: "os",
  })
  os?: string;

  @Column({
    type: DataType.STRING,
    field: "browser",
  })
  browser?: string;

  @Column({
    type: DataType.STRING,
    field: "ip_address",
  })
  ipAddress?: string;
}
