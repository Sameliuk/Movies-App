import express from "express"
import UserController from "../controllers/UserController.js"
import validateUser from "../middlewares/validateUser.js"

const router = express.Router()

router.post("/", validateUser, UserController.signUp.bind(UserController))
router.post("/sessions", UserController.signIn.bind(UserController))

export default router
