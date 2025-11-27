import express from "express"
import UserController from "../controllers/UserController.js"

const router = express.Router()

router.post("/", UserController.signUp.bind(UserController))
router.post("/sessions", UserController.signIn.bind(UserController))

export default router
