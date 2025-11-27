import db from "../models/index.js"
import fs from "fs"
import readline from "readline"

export default class MovieRepository {
    async add(movieData) {
        const movie = await db.Movie.create(movieData)

        if (movieData.actors && movieData.actors.length) {
            for (const actorName of movieData.actors) {
                const [actor] = await db.Actor.findOrCreate({
                    where: { name: actorName },
                })
                await movie.addActor(actor)
            }
        }

        return db.Movie.findByPk(movie.id, {
            include: [
                {
                    model: db.Actor,
                    through: { attributes: [] },
                },
                {
                    model: db.Format,
                },
            ],
        })
    }

    async delete(id) {
        return db.Movie.destroy({ where: { id } })
    }

    async getById(id) {
        return db.Movie.findByPk(id, { include: [db.Format, db.Actor] })
    }

    async getAllSorted(options = {}) {
        const { sort = "title", order = "ASC" } = options

        const sortMap = {
            title: "title",
            year: "year",
            createdAt: "createdAt",
        }

        const sortField = sortMap[sort] || "title"

        return db.Movie.findAll({
            order: [[sortField, order.toUpperCase()]],
            include: [db.Format, db.Actor],
        })
    }

    async findByTitle(title) {
        return db.Movie.findAll({
            where: { title: { [db.Sequelize.Op.like]: `%${title}%` } },
            include: [db.Format, db.Actor],
        })
    }

    async findByActorName(actorName) {
        return db.Movie.findAll({
            include: {
                model: db.Actor,
                where: { name: { [db.Sequelize.Op.like]: `%${actorName}%` } },
            },
        })
    }

    async importFromFile(filePath, userId = 1) {
        const addedMovies = []

        const fileStream = fs.createReadStream(filePath)
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        })

        let movie = {}
        for await (const line of rl) {
            if (!line.trim()) {
                if (Object.keys(movie).length) {
                    const added = await this.add({
                        title: movie.title,
                        year: movie.year,
                        formatId: await this._getFormatId(movie.format),
                        actors: movie.actors,
                        userId,
                    })
                    addedMovies.push(added)
                    movie = {}
                }
                continue
            }

            const [keyRaw, ...rest] = line.split(":")
            const key = keyRaw.trim().toLowerCase()
            const value = rest.join(":").trim()

            switch (key) {
                case "title":
                    movie.title = value
                    break
                case "release year":
                case "year":
                    movie.year = parseInt(value)
                    break
                case "format":
                    movie.format = value
                    break
                case "stars":
                case "actors":
                    movie.actors = value.split(",").map((a) => a.trim())
                    break
            }
        }

        if (Object.keys(movie).length) {
            const added = await this.add({
                title: movie.title,
                year: movie.year,
                formatId: await this._getFormatId(movie.format),
                actors: movie.actors,
                userId,
            })
            addedMovies.push(added)
        }

        return addedMovies
    }
}
