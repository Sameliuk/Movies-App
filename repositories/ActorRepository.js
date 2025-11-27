import db from "../models/index.js"

export default class ActorRepository {
    async add(actorData) {
        return db.Actor.create(actorData)
    }

    async getById(id) {
        return db.Actor.findByPk(id)
    }

    async getByName(name) {
        return db.Actor.findOne({ where: { name } })
    }

    async getAll() {
        return db.Actor.findAll({ order: [["name", "ASC"]] })
    }
}
