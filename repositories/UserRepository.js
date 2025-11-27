import db from "../models/index.js"

export default class UserRepository {
    async create({ name, email, password }, transaction = null) {
        const data = {
            name,
            email,
            passwordHash: password,
        }

        return db.User.create(data, { transaction })
    }

    async findById(id) {
        return db.User.findByPk(id)
    }

    async findByEmail(email) {
        return db.User.findOne({ where: { email } })
    }
}
