import { DataTypes } from 'sequelize';

const Fixtures = (sequelize) => {
    const Fixtures = sequelize.define(
        'fixtures',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                unique: true,
                primaryKey: true,
                allowNull: false,
            },

            fixture_code: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },

            day: {
                type: DataTypes.DATE,
                allowNull: true, 
            },

            time: {
                type: DataTypes.TIME,
                allowNull: true,
            },

        },
        {
            tableName: 'fixtures',
            timestamps: true,
            underscored: true,
        }
    );

    return Fixtures;
};

export default Fixtures;
