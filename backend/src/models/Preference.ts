import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';
import User from './User';

interface PreferenceAttributes {
    id: number;
    userId: string;
    language: string;
    breakfast: string;
    lunch: string;
    dinner: string;
    wakeTime: string;
    bedTime: string;
    weight: 'Kg' | 'lbs';
    height: 'cm' | 'ft/inches';
    bloodGlucose: 'mmo/l' | 'mg/dl';
    cholesterol: 'mmo/l' | 'mg/dl';
    bloodPressure: 'kPa' | 'mmHg';
    distance: 'km' | 'miles';
    systemEmails: boolean;
    memberServiceEmails: boolean;
    sms: boolean;
    phoneCall: boolean;
    post: boolean;
}

interface PreferenceCreationAttributes extends Optional<PreferenceAttributes, 'id'> {}

class Preference extends Model<PreferenceAttributes, PreferenceCreationAttributes> implements PreferenceAttributes {
    public id!: number;
    public userId!: string;
    public language!: string;
    public breakfast!: string;
    public lunch!: string;
    public dinner!: string;
    public wakeTime!: string;
    public bedTime!: string;
    public weight!: 'Kg' | 'lbs';
    public height!: 'cm' | 'ft/inches';
    public bloodGlucose!: 'mmo/l' | 'mg/dl';
    public cholesterol!: 'mmo/l' | 'mg/dl';
    public bloodPressure!: 'kPa' | 'mmHg';
    public distance!: 'km' | 'miles';
    public systemEmails!: boolean;
    public memberServiceEmails!: boolean;
    public sms!: boolean;
    public phoneCall!: boolean;
    public post!: boolean;
}

Preference.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {

            type: DataTypes.INTEGER,
    
            allowNull: false,
    
        },
        language: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        breakfast: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lunch: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dinner: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        wakeTime: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bedTime: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        weight: {
            type: DataTypes.ENUM('Kg', 'lbs'),
            allowNull: false,
        },
        height: {
            type: DataTypes.ENUM('cm', 'ft/inches'),
            allowNull: false,
        },
        bloodGlucose: {
            type: DataTypes.ENUM('mmo/l', 'mg/dl'),
            allowNull: false,
        },
        cholesterol: {
            type: DataTypes.ENUM('mmo/l', 'mg/dl'),
            allowNull: false,
        },
        bloodPressure: {
            type: DataTypes.ENUM('kPa', 'mmHg'),
            allowNull: false,
        },
        distance: {
            type: DataTypes.ENUM('km', 'miles'),
            allowNull: false,
        },
        systemEmails: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        memberServiceEmails: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        sms: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        phoneCall: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        post: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Preference',
        tableName: 'preferences',
        timestamps: false,
    }
);

// User.hasMany(Preference, { foreignKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
// Preference.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

export default Preference;