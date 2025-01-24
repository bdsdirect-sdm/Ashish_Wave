import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';


interface FriendAttributes {
    id: number;
    inviterId: number;
    inviteEmail: string;
    inviteMessage: string;
    inviteName: string;
    status: boolean;
    isAccepted: boolean;
    deletedAt: string;
}

interface FriendCreationAttributes extends Optional<FriendAttributes, 'id'> { }



class Friend extends Model<FriendAttributes, FriendCreationAttributes> implements FriendAttributes {
    public id!: number;
    public inviterId!: number;
    public inviteEmail!: string;
    public inviteMessage!: string;
    public inviteName!: string;
    public status!: boolean;
    public isAccepted!: boolean;
    public deletedAt!: string;


}



Friend.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        inviterId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        inviteEmail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        inviteMessage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        inviteName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        isAccepted: {
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
        tableName: 'friend',
        timestamps: true,
        // paranoid: true,
    }
);

export default Friend;