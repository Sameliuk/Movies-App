import dotenv from "dotenv"
dotenv.config()

import express from "express"
import path, { dirname } from "path"
import cookieParser from "cookie-parser"
import session from "express-session"
import logger from "morgan"
import { fileURLToPath } from "url"

import indexRouter from "./routes/index.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
    session({
        secret: process.env.SESSION_SECRET || "secret",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
)

app.use(express.static(path.join(__dirname, "public")))

app.use("/api/v1", indexRouter)

app.use((req, res, next) => {
    res.status(404).json({ status: 0, message: "Route not found" })
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ status: 0, message: err.message })
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

export default app
