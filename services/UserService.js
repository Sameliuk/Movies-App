import bcrypt from "bcrypt"
import { generateToken } from "../utils/jwt.js"
import UserRepository from "../repositories/UserRepository.js"

export default class UserService {
    constructor() {
        this.userRepository = new UserRepository()
    }

    async registerUser({ name, email, password }) {
        const existingUser = await this.userRepository.findByEmail(email)
        if (existingUser) {
            throw new Error("User with this email already exists")
        }

        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = await this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        })

        const payload = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
        }

        const token = generateToken(payload)

        return { user: payload, token }
    }

    async authenticateUser({ email, password }) {
        const user = await this.userRepository.findByEmail(email)
        if (!user) return null

        const isPasswordValid = await bcrypt.compare(
            password,
            user.passwordHash
        )

        if (!isPasswordValid) return null

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
        }

        const token = generateToken(payload)

        return { user: payload, token }
    }
}
