import MovieService from "../services/MovieService.js"

const movieService = new MovieService()

class MovieController {
    async getMovies(req, res) {
        try {
            const movies = await movieService.getMovies(req.query)

            const formattedMovies = movies.map((m) => ({
                id: m.id,
                title: m.title,
                year: m.year,
                format: m.Format?.name,
                createdAt: m.createdAt,
                updatedAt: m.updatedAt,
            }))

            res.json({
                status: 1,
                meta: {
                    total: formattedMovies.length,
                    limit: Number(req.query.limit) || 20,
                    offset: Number(req.query.offset) || 0,
                },
                data: formattedMovies,
            })
        } catch (err) {
            res.status(500).json({
                status: 0,
                message: "Failed to fetch movies",
            })
        }
    }

    async getMovieById(req, res) {
        try {
            const movie = await movieService.getMovieById(req.params.id)

            if (!movie) {
                return res.status(404).json({
                    status: 0,
                    message: "Movie not found",
                })
            }

            const formattedMovie = {
                id: movie.id,
                title: movie.title,
                year: movie.year,
                format: movie.Format?.name,
                actors:
                    movie.Actors?.map((actor) => ({
                        id: actor.id,
                        name: actor.name,
                        createdAt: actor.createdAt,
                        updatedAt: actor.updatedAt,
                    })) || [],
                createdAt: movie.createdAt,
                updatedAt: movie.updatedAt,
            }

            res.status(200).json({
                status: 1,
                data: formattedMovie,
            })
        } catch (err) {
            res.status(500).json({
                status: 0,
                message: "Failed to fetch movie",
            })
        }
    }

    async addMovie(req, res) {
        try {
            const movie = await movieService.addMovie(req.body, req.user.id)

            res.status(200).json({
                status: 1,
                data: {
                    id: movie.id,
                    title: movie.title,
                    year: movie.year,
                    format: movie.Format.name,
                    actors:
                        movie.Actors?.map((actor) => ({
                            id: actor.id,
                            name: actor.name,
                            createdAt: actor.createdAt,
                            updatedAt: actor.updatedAt,
                        })) || [],
                    createdAt: movie.createdAt,
                    updatedAt: movie.updatedAt,
                },
            })
        } catch (err) {
            res.status(500).json({
                status: 0,
                message: "Failed to add movie",
            })
        }
    }

    async updateMovie(req, res) {
        try {
            const movie = await movieService.updateMovie(
                req.params.id,
                req.body
            )

            if (!movie) {
                return res.status(404).json({
                    status: 0,
                    message: "Movie not found",
                })
            }

            const formattedMovie = {
                id: movie.id,
                title: movie.title,
                year: movie.year,
                format: movie.Format?.name,
                actors:
                    movie.Actors?.map((actor) => ({
                        id: actor.id,
                        name: actor.name,
                        createdAt: actor.createdAt,
                        updatedAt: actor.updatedAt,
                    })) || [],
                createdAt: movie.createdAt,
                updatedAt: movie.updatedAt,
            }

            res.status(200).json({
                status: 1,
                data: formattedMovie,
            })
        } catch (err) {
            res.status(500).json({
                status: 0,
                message: "Failed to update movie",
            })
        }
    }

    async deleteMovie(req, res) {
        try {
            const deletedCount = await movieService.deleteMovie(req.params.id)

            if (!deletedCount) {
                return res.status(404).json({
                    status: 0,
                    message: "Movie not found",
                })
            }

            res.status(200).json({ status: 1 })
        } catch (err) {
            res.status(500).json({
                status: 0,
                message: "Failed to delete movie",
            })
        }
    }

    async importMoviesFromFile(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    status: 0,
                    message: "No file uploaded",
                })
            }

            const addedMovies = await movieService.importMoviesFromFile(
                req.file.path,
                req.user.id
            )
            const formattedMovies = addedMovies.map((m) => ({
                id: m.id,
                title: m.title,
                year: m.year.toString(),
                format: m.Format?.name,
                createdAt: m.createdAt,
                updatedAt: m.updatedAt,
            }))

            res.status(200).json({
                status: 1,
                meta: {
                    imported: formattedMovies.length,
                    total: formattedMovies.length,
                },
                data: formattedMovies,
            })
        } catch (err) {
            res.status(500).json({
                status: 0,
                message: err.message || "Failed to import movies",
            })
        }
    }
}

export default new MovieController()
