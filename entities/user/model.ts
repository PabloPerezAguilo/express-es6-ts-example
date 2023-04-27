import { Table, Model, Column, Unique } from 'sequelize-typescript';

@Table
export class User extends Model<User> {

  @Unique
  @Column
  email: string;

  @Column
  password: string;

  @Column
  role: string;
}

export default User;