import { Sequelize } from "sequelize"

import UserModel from "./User.js"
import MovieModel from "./Movie.js"
import FormatModel from "./Format.js"
import ActorModel from "./Actor.js"
import MovieActorModel from "./MovieActors.js"

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: process.env.DB_PATH || "database.sqlite",
    logging: false,
})

const User = UserModel(sequelize)
const Movie = MovieModel(sequelize)
const Format = FormatModel(sequelize)
const Actor = ActorModel(sequelize)
const MovieActor = MovieActorModel(sequelize)

User.hasMany(Movie, { foreignKey: "userId" })
Movie.belongsTo(User, { foreignKey: "userId" })

Format.hasMany(Movie, { foreignKey: "formatId" })
Movie.belongsTo(Format, { foreignKey: "formatId" })

Movie.belongsToMany(Actor, {
    through: MovieActor,
    foreignKey: "movieId",
    otherKey: "actorId",
})

Actor.belongsToMany(Movie, {
    through: MovieActor,
    foreignKey: "actorId",
    otherKey: "movieId",
})

const db = {
    sequelize,
    Sequelize,
    User,
    Movie,
    Format,
    Actor,
    MovieActor,
}

export default db
