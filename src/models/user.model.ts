import { Model, Table, Column, DataType } from "sequelize-typescript";
import bcrypt from "bcrypt";
import configs from "../configs";

@Table({
  tableName: "users",
  timestamps: true,
  paranoid: true,
})
export default class User extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    field: "id",
  })
  id?: string;

  @Column({
    type: DataType.STRING,
    field: "name",
  })
  name?: string;

  @Column({
    type: DataType.STRING,
    field: "email",
    unique: true,
  })
  email?: string;

  @Column({
    type: DataType.STRING,
    field: "password",
    set(val: string) {
      const saltRounds = parseInt(configs.saltRounds as string, 10) || 10;
      const pass: string = val || "password";
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(`${pass}${configs.saltKey}`, salt);
      this.setDataValue("password", hash);
    },
  })
  password?: string;
  @Column({
    type: DataType.DATE,
    defaultValue: new Date(),
    field: "verified_at",
  })
  verifiedAt?: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    field: "remember_me",
  })
  rememberMe?: boolean;
}
