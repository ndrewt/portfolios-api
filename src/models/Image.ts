import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/postgres';
import Portfolio from './Portfolio';

class Image extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public portfolio_id!: number;
    public image!: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Image.init(
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
        portfolio_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Portfolio,
                key: 'id',
            },
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
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
        tableName: 'images',
        timestamps: false,
    },
);

Portfolio.hasMany(Image, { foreignKey: 'portfolio_id' });
Image.belongsTo(Portfolio, { foreignKey: 'portfolio_id' });

export default Image;
