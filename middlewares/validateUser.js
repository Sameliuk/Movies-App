import { isEmptyOrSpaces, isValidEmail } from "../utils/validators.js"

export const validateRegisterUser = (req, res, next) => {
    const { name, email, password } = req.body

    if (isEmptyOrSpaces(name)) {
        return res.status(400).json({ status: 0, message: "Name is required" })
    }

    if (isEmptyOrSpaces(email) || !isValidEmail(email.trim())) {
        return res.status(400).json({ status: 0, message: "Invalid email" })
    }

    if (isEmptyOrSpaces(password)) {
        return res
            .status(400)
            .json({ status: 0, message: "Password is required" })
    }

    req.body.name = name.trim()
    req.body.email = email.trim()
    req.body.password = password.trim()

    next()
}

export default validateRegisterUser
