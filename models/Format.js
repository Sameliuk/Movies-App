import { DataTypes } from "sequelize"

export default function (sequelize) {
    return sequelize.define(
        "Format",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        },
        {
            tableName: "formats",
            timestamps: false,
            underscored: true,
        }
    )
}
