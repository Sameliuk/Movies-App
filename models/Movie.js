import { DataTypes } from "sequelize"

export default function (sequelize) {
    const Movie = sequelize.define(
        "Movie",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            year: {
                type: DataTypes.INTEGER,
                field: "release_year",
                allowNull: false,
            },
            formatId: {
                type: DataTypes.INTEGER,
                field: "format_id",
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                field: "user_id",
                allowNull: false,
            },
        },
        {
            tableName: "movies",
            timestamps: true,
            underscored: true,
        }
    )

    return Movie
}
