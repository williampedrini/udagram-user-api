import {Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt} from 'sequelize-typescript';

@Table
export default class User extends Model<User> {

    @PrimaryKey
    @Column
    public email!: string;

    @Column
    public passwordHash!: string;

    @Column
    @CreatedAt
    public createdAt: Date = new Date();

    @Column
    @UpdatedAt
    public updatedAt: Date = new Date();
}
