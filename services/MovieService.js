import MovieRepository from "../repositories/MovieRepository.js"
import FormatRepository from "../repositories/FormatRepository.js"
import ActorRepository from "../repositories/ActorRepository.js"
import parseMoviesFromFile from "../utils/parseMoviesFromFile.js"

export default class MovieService {
    constructor() {
        this.movieRepository = new MovieRepository()
        this.formatRepository = new FormatRepository()
        this.actorRepository = new ActorRepository()
    }

    async addMovie(movieData, userId) {
        let format = await this.formatRepository.getByName(movieData.format)
        if (!format) {
            format = await this.formatRepository.add({ name: movieData.format })
        }

        // Шукаємо дублікати точно
        const duplicate = await this.movieRepository.findDuplicate({
            title: movieData.title.trim(),
            year: Number(movieData.year),
            formatId: format.id,
        })

        if (duplicate) return duplicate // якщо дубль, повертаємо його

        return this.movieRepository.add({
            title: movieData.title.trim(),
            year: Number(movieData.year),
            formatId: format.id,
            userId,
            actors: movieData.actors || [],
        })
    }

    async updateMovie(id, movieData) {
        let format = null
        if (movieData.format) {
            format = await this.formatRepository.getByName(movieData.format)
            if (!format) {
                format = await this.formatRepository.add({
                    name: movieData.format,
                })
            }
        }

        return this.movieRepository.update(id, {
            title: movieData.title?.trim(),
            year: movieData.year ? Number(movieData.year) : undefined,
            formatId: format ? format.id : undefined,
            actors: movieData.actors || undefined,
        })
    }

    async deleteMovie(id) {
        return this.movieRepository.delete(id)
    }

    async getMovieById(id) {
        return this.movieRepository.getById(id)
    }

    async getMovies(params) {
        return this.movieRepository.findAll(params)
    }

    async importMoviesFromFile(filePath, userId) {
        const movies = await parseMoviesFromFile(filePath)
        const addedMovies = []

        for (const movie of movies) {
            let format = await this.formatRepository.getByName(movie.format)
            if (!format) {
                format = await this.formatRepository.add({ name: movie.format })
            }

            const added = await this.movieRepository.add({
                title: movie.title,
                year: movie.year,
                formatId: format.id,
                actors: movie.actors,
                userId,
            })

            addedMovies.push(added)
        }

        return addedMovies
    }
}
