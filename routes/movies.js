import express from "express"
import MovieController from "../controllers/MovieController.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import validateFileType from "../middlewares/validateFile.js"
import validateMovie from "../middlewares/validateMovie.js"
import multer from "multer"

const router = express.Router()
const upload = multer({ dest: "uploads/" })

router.get("/", authMiddleware, MovieController.getMovies.bind(MovieController))
router.get(
    "/:id",
    authMiddleware,
    MovieController.getMovieById.bind(MovieController)
)

router.post(
    "/",
    authMiddleware,
    validateMovie,
    MovieController.addMovie.bind(MovieController)
)
router.patch(
    "/:id",
    authMiddleware,
    validateMovie,
    MovieController.updateMovie.bind(MovieController)
)

router.delete(
    "/:id",
    authMiddleware,
    MovieController.deleteMovie.bind(MovieController)
)

router.post(
    "/import",
    authMiddleware,
    upload.single("movies"),
    validateFileType,
    MovieController.importMoviesFromFile.bind(MovieController)
)

export default router
