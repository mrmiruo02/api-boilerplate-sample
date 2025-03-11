import { RowDataPacket } from "mysql2";

export interface IAuthentication extends RowDataPacket {
  name: string;
  password: string;
}