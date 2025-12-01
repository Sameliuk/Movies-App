import {
    isEmptyOrSpaces,
    isValidYear,
    isValidActorName,
} from "../utils/validators.js"

const ALLOWED_FORMATS = ["DVD", "Blu-Ray", "VHS"]

export const validateMovie = (req, res, next) => {
    const { title, year, format, actors } = req.body

    if (isEmptyOrSpaces(title)) {
        return res.status(400).json({ status: 0, message: "Title is required" })
    }

    if (!isValidYear(Number(year))) {
        return res.status(400).json({ status: 0, message: "Invalid year" })
    }

    if (!ALLOWED_FORMATS.includes(format)) {
        return res
            .status(400)
            .json({ status: 0, message: "Invalid movie format" })
    }

    if (!Array.isArray(actors) || actors.length === 0) {
        return res
            .status(400)
            .json({ status: 0, message: "Actors are required" })
    }

    for (const actor of actors) {
        if (isEmptyOrSpaces(actor) || !isValidActorName(actor)) {
            return res
                .status(400)
                .json({ status: 0, message: "Invalid actor name" })
        }
    }

    req.body.title = title.trim()
    req.body.actors = actors.map((a) => a.trim())

    next()
}

export default validateMovie
