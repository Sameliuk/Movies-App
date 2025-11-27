import db from "../models/index.js"

export default class FormatRepository {
    async add(formatData) {
        return db.Format.create(formatData)
    }

    async getById(id) {
        return db.Format.findByPk(id)
    }

    async getByName(name) {
        return db.Format.findOne({ where: { name } })
    }

    async getAll() {
        return db.Format.findAll({ order: [["name", "ASC"]] })
    }

    async delete(id) {
        return db.Format.destroy({ where: { id } })
    }
}
