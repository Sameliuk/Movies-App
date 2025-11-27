import FormatRepository from "../repositories/FormatRepository.js"

export default class FormatService {
    constructor() {
        this.formatRepository = new FormatRepository()
    }

    async addFormat(formatData) {
        return this.formatRepository.add(formatData)
    }

    async getFormatById(id) {
        return this.formatRepository.getById(id)
    }

    async getFormatByName(name) {
        return this.formatRepository.getByName(name)
    }

    async getAllFormats() {
        return this.formatRepository.getAll()
    }

    async deleteFormat(id) {
        return this.formatRepository.delete(id)
    }
}
