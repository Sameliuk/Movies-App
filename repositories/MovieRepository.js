import db from "../models/index.js"

const { Op } = db.Sequelize

export default class MovieRepository {
    async add(movieData) {
        const movie = await db.Movie.create(movieData)

        if (movieData.actors?.length) {
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

    async update(id, movieData) {
        const movie = await db.Movie.findByPk(id, {
            include: [
                { model: db.Actor, through: { attributes: [] }, as: "Actors" },
            ],
        })

        if (!movie) throw new Error("Movie not found")

        await movie.update(movieData)

        if (movieData.actors) {
            const actorsToAdd = []
            for (const actorName of movieData.actors) {
                const [actor] = await db.Actor.findOrCreate({
                    where: { name: actorName },
                })
                actorsToAdd.push(actor)
            }
            await movie.setActors(actorsToAdd)
        }

        return db.Movie.findByPk(movie.id, {
            include: [
                { model: db.Actor, through: { attributes: [] }, as: "Actors" },
                { model: db.Format },
            ],
        })
    }

    async delete(id) {
        return db.Movie.destroy({ where: { id } })
    }

    async getById(id) {
        return db.Movie.findByPk(id, {
            include: [db.Format, db.Actor],
        })
    }

    async findDuplicate({ title, year, formatId }) {
        return db.Movie.findOne({
            where: { title, year, formatId },
            include: [db.Format, db.Actor],
        })
    }

    async findAll({
        search,
        actor,
        title,
        sort = "id",
        order = "ASC",
        limit = 20,
        offset = 0,
    } = {}) {
        const include = [
            { model: db.Format },
            {
                model: db.Actor,
                through: { attributes: [] },
                as: "Actors",
                required: false,
            },
        ]

        let where = {}

        if (title) {
            where.title = { [Op.like]: `%${title}%` }
        }

        let movieIds = null

        if (actor) {
            const actorMovies = await db.Movie.findAll({
                include: [
                    {
                        model: db.Actor,
                        as: "Actors",
                        where: { name: { [Op.like]: `%${actor}%` } },
                        attributes: [],
                    },
                ],
                attributes: ["id"],
            })
            movieIds = actorMovies.map((m) => m.id)
            if (movieIds.length === 0) movieIds.push(0)
        }

        if (search) {
            const actorMovies = await db.Movie.findAll({
                include: [
                    {
                        model: db.Actor,
                        as: "Actors",
                        where: { name: { [Op.like]: `%${search}%` } },
                        attributes: [],
                    },
                ],
                attributes: ["id"],
            })
            const actorMovieIds = actorMovies.map((m) => m.id)

            movieIds = [
                ...new Set([
                    ...(movieIds || []),
                    ...(
                        await db.Movie.findAll({
                            where: { title: { [Op.like]: `%${search}%` } },
                            attributes: ["id"],
                        })
                    ).map((m) => m.id),
                    ...actorMovieIds,
                ]),
            ]
            if (movieIds.length === 0) movieIds.push(0)
        }

        if (movieIds) {
            where.id = { [Op.in]: movieIds }
        }

        const sortMap = { id: "id", title: "title", year: "year" }

        return db.Movie.findAll({
            where,
            include,
            distinct: true,
            order: [[sortMap[sort] || "id", order.toUpperCase()]],
            limit: Number(limit),
            offset: Number(offset),
        })
    }
}
