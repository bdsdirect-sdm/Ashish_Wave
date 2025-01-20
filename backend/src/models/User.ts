import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

interface UserAttributes {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
    gender: 'Male' | 'Female';
    ssn: number;
    dob: Date;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: number;
    marital_status: 'Married' | 'Unmarried';
    kids: number;
    social: string;
    profileIcon: string;
    status: boolean;
    deletedAt: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public first_name!: string;
    public last_name!: string;
    public email!: string;
    public phone_number!: string;
    public password!: string;
    public gender!: 'Male' | 'Female';
    public ssn!: number;
    public dob!: Date;
    public address1!: string;
    public address2!: string;
    public city!: string;
    public state!: string;
    public zip!: number;
    public marital_status!: 'Married' | 'Unmarried';
    public kids!: number;
    public social!: string;
    public profileIcon!: string;
    public status!: boolean;
    public deletedAt!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: true,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.ENUM('Male', 'Female'),
            allowNull: true,
        },
        ssn: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        address1: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        zip: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        marital_status: {
            type: DataTypes.ENUM('Married', 'Unmarried'),
            allowNull: true,
        },
        kids: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        social: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        profileIcon: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        deletedAt: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true,
        paranoid: true,
    }
);

export default User;