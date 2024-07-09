import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/postgres';
import Image from './Image';
import User from './User';

class Comment extends Model {
    public id!: number;
    public content!: string;
    public image_id!: number;
    public user_id!: number;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Image,
                key: 'id',
            },
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
        tableName: 'comments',
        timestamps: false,
    },
);

Image.hasMany(Comment, { foreignKey: 'image_id' });
Comment.belongsTo(Image, { foreignKey: 'image_id' });
User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

export default Comment;
