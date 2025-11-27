import MovieRepository from "../repositories/MovieRepository.js"
import FormatRepository from "../repositories/FormatRepository.js"
import ActorRepository from "../repositories/ActorRepository.js"

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

        return this.movieRepository.add({
            title: movieData.title,
            year: movieData.year,
            formatId: format.id,
            userId,
            actors: movieData.actors || [],
        })
    }

    async deleteMovie(id) {
        return this.movieRepository.delete(id)
    }

    async getMovieById(id) {
        return this.movieRepository.getById(id)
    }

    async getAllMoviesSorted(options) {
        return this.movieRepository.getAllSorted(options)
    }

    async findMoviesByTitle(title) {
        return this.movieRepository.findByTitle(title)
    }

    async findMoviesByActorName(actorName) {
        return this.movieRepository.findByActorName(actorName)
    }

    async importMoviesFromFile(filePath, userId) {
        return this.movieRepository.importFromFile(filePath, userId)
    }
}
