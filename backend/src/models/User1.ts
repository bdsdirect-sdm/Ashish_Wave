import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

interface UserAttributes {
    id: number;
    first_name: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

class User1 extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public first_name!: string;

}

User1.init(
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

    },
    {
        sequelize,
        tableName: 'users1',
        timestamps: false,
    }
);

export default User1;