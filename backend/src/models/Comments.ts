import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

interface CommentAttributes {
    id: number;
    commenterId: number;
    waveId: number;
    commenterFirstName: string;
    commenterLastName: string;
    comment: string;
    status: boolean;
    deletedAt: string | null;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, 'id' | 'deletedAt'> {}

class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
    public id!: number;
    public commenterId!: number;
    public waveId!: number;
    public commenterFirstName!: string;
    public commenterLastName!: string;
    public comment!: string;
    public status!: boolean;
    public deletedAt!: string | null;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        commenterId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        waveId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        commenterFirstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        commenterLastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
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
        tableName: 'comments',
        timestamps: true,
        paranoid: true,
    }
);

export default Comment;