import UserService from "../services/UserService.js"

const userService = new UserService()

class UserController {
    async signUp(req, res) {
        try {
            const { name, email, password, confirmPassword } = req.body
            if (password !== confirmPassword) {
                return res
                    .status(400)
                    .json({ status: 0, message: "Passwords do not match" })
            }

            const result = await userService.registerUser({
                name,
                email,
                password,
            })
            res.status(201).json({ status: 1, token: result.token })
        } catch (err) {
            res.status(400).json({ status: 0, message: err.message })
        }
    }

    async signIn(req, res) {
        try {
            const { email, password } = req.body
            const result = await userService.authenticateUser({
                email,
                password,
            })
            if (!result)
                return res
                    .status(401)
                    .json({ status: 0, message: "Invalid credentials" })
            res.status(200).json({ status: 1, token: result.token })
        } catch (err) {
            res.status(500).json({ status: 0, message: err.message })
        }
    }
}

export default new UserController()
