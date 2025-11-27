import { DataTypes } from "sequelize"

export default function (sequelize) {
    return sequelize.define(
        "MovieActor",
        {
            movieId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                field: "movie_id",
                allowNull: false,
            },
            actorId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                field: "actor_id",
                allowNull: false,
            },
        },
        {
            tableName: "movie_actors",
            timestamps: false,
            underscored: true,
        }
    )
}
