import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/postgres';
import User from './User';

class Portfolio extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public user_id!: number;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Portfolio.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'portfolios',
        timestamps: false,
    },
);

User.hasMany(Portfolio, { foreignKey: 'user_id' });
Portfolio.belongsTo(User, { foreignKey: 'user_id' });

export default Portfolio;
