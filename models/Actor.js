import { DataTypes } from "sequelize"

export default function (sequelize) {
    return sequelize.define(
        "Actor",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            tableName: "actors",
            timestamps: true,
            underscored: true,
        }
    )
}
