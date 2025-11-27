import express from "express"
import usersRouter from "./users.js"
import moviesRouter from "./movies.js"

const router = express.Router()

router.use("/users", usersRouter)
router.use("/", usersRouter)
router.use("/movies", moviesRouter)

export default router
