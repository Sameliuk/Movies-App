import MovieService from "../services/MovieService.js"

const movieService = new MovieService()

class MovieController {
    async getAllMoviesSorted(req, res) {
        const { sort, order, limit, offset, actor, title, search } = req.query
        const movies = await movieService.getAllMoviesSorted({
            sort,
            order,
            limit,
            offset,
            actor,
            title,
            search,
        })

        const formattedMovies = movies.map((movie) => ({
            id: movie.id,
            title: movie.title,
            year: movie.releaseYear ?? movie.year,
            format: movie.Format?.name,
            createdAt: movie.createdAt,
            updatedAt: movie.updatedAt,
        }))

        res.status(200).json({
            status: 1,
            meta: { total: formattedMovies.length },
            data: formattedMovies,
        })
    }

    async getMovieById(req, res) {
        const movie = await movieService.getMovieById(req.params.id)
        if (!movie)
            return res
                .status(404)
                .json({ status: 0, message: "Movie not found" })

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
    }

    async addMovie(req, res) {
        const movie = await movieService.addMovie(req.body, req.user.id)

        res.status(201).json({
            status: 1,
            data: {
                id: movie.id,
                title: movie.title,
                year: movie.year,
                format: movie.Format.name,
                actors: movie.Actors,
                createdAt: movie.createdAt,
                updatedAt: movie.updatedAt,
            },
        })
    }

    async deleteMovie(req, res) {
        await movieService.deleteMovie(req.params.id)
        res.status(200).json({ status: 1 })
    }

    async importMoviesFromFile(req, res) {
        if (!req.file) {
            return res
                .status(400)
                .json({ status: 0, message: "No file uploaded" })
        }

        const filePath = req.file.path

        await movieService.importMoviesFromFile(filePath, req.user.id)
        const allMovies = await movieService.getAllMoviesSorted({})

        const formattedMovies = allMovies.map((m) => ({
            id: m.id,
            title: m.title,
            year: m.year.toString(),
            format: m.Format?.name,
            createdAt: m.createdAt,
            updatedAt: m.updatedAt,
        }))

        res.json({
            status: 1,
            meta: {
                imported: formattedMovies.length,
                total: formattedMovies.length,
            },
            data: formattedMovies,
        })
    }
}

export default new MovieController()
