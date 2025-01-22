import { Profile } from '../../app/interfaces/profile.interface';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export type ProfileCreationAttributes = Optional<
    Profile,
    'id'
>;

export class ProfileModel
    extends Model<Profile, ProfileCreationAttributes>
    implements Profile {
    public id!: number;
    public userId!: number;
    public profileId!: string;
    public name!: string;
    public doc!: string;
    public status!: string;
    public created_at: string | undefined;
    public updated_at: string | undefined;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


}

export default function (sequelize: Sequelize): typeof ProfileModel {
    ProfileModel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                unique: true,
            },
            profileId: {
                allowNull: false,
                type: DataTypes.STRING(255),
            },
            name: {
                allowNull: false,
                type: DataTypes.INTEGER,
                unique: true,
            },
            doc: {
                allowNull: true,
                type: DataTypes.STRING(255),
            },
            status: {
                allowNull: false,
                type: DataTypes.STRING(255),
            },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            tableName: 'profiles',
            sequelize,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            timestamps: true,
        },
    );

    return ProfileModel;
}
