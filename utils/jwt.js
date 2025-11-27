import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const SECRET = process.env.JWT_SECRET
if (!SECRET) throw new Error("JWT_SECRET is not defined in .env")

export function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            fname: user.fname,
            sname: user.sname,
            email: user.email,
        },
        SECRET,
        { expiresIn: "1h" }
    )
}

export function verifyToken(token) {
    return jwt.verify(token, SECRET)
}
