import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

interface WaveAttributes {
    id: number;
    userId: number;
    message: string;
    image: string;
    status: boolean;
    deletedAt: string | null;
}

interface WaveCreationAttributes extends Optional<WaveAttributes, 'id' | 'deletedAt'> {}

class Wave extends Model<WaveAttributes, WaveCreationAttributes> implements WaveAttributes {
    public id!: number;
    public userId!: number;
    public message!: string;
    public image!: string;
    public status!: boolean;
    public deletedAt!: string | null;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Wave.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        deletedAt: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'waves',
        timestamps: true,
        paranoid: true,
    }
);

export default Wave;