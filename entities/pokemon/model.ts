import { Table, Model, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from '../user/model.js';

@Table
export class Pokemon extends Model<Pokemon> {

  @Column
  name: string;

  @Column
  type: string;

  @Column
  description: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
export default Pokemon;


