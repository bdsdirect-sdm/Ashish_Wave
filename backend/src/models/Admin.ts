import { DataTypes, Model, Optional } from 'sequelize';
import  sequelize  from '../config/db';

interface AdminAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    status: string;
    deletedAt: string | null;
}

interface AdminCreationAttributes extends Optional<AdminAttributes, 'id' | 'deletedAt'> {}

class Admin extends Model<AdminAttributes, AdminCreationAttributes> implements AdminAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public status!: string;
    public deletedAt!: string | null;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Admin.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deletedAt: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'admins',
        timestamps: true,
        paranoid: true,
    }
);

export default Admin;