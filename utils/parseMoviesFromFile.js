import fs from "fs"
import readline from "readline"

const ALLOWED_FORMATS = ["DVD", "Blu-Ray", "VHS"]
const MIN_YEAR = 1850
const MAX_YEAR = 2025

const isNonEmptyString = (str) => typeof str === "string" && str.trim() !== ""
const isValidYear = (year) =>
    Number.isInteger(year) && year >= MIN_YEAR && year <= MAX_YEAR
const isValidActorName = (name) => /^[\p{L}\s\-\.'’]+$/u.test(name.trim())

export default async function parseMoviesFromFile(filePath) {
    const movies = []

    const fileStream = fs.createReadStream(filePath)
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    })

    let movie = {}

    for await (const line of rl) {
        const trimmedLine = line.trim()
        if (!trimmedLine) {
            if (Object.keys(movie).length) {
                if (
                    isNonEmptyString(movie.title) &&
                    isValidYear(movie.year) &&
                    ALLOWED_FORMATS.includes(movie.format) &&
                    Array.isArray(movie.actors) &&
                    movie.actors.length > 0 &&
                    movie.actors.every(isValidActorName)
                ) {
                    movies.push(movie)
                }
                movie = {}
            }
            continue
        }

        const [keyRaw, ...rest] = trimmedLine.split(":")
        const key = keyRaw.trim().toLowerCase()
        const value = rest.join(":").trim()

        switch (key) {
            case "title":
                if (isNonEmptyString(value)) movie.title = value
                break
            case "release year":
            case "year":
                const yearNum = Number(value)
                if (isValidYear(yearNum)) movie.year = yearNum
                break
            case "format":
                if (ALLOWED_FORMATS.includes(value)) movie.format = value
                break
            case "stars":
            case "actors":
                if (isNonEmptyString(value)) {
                    const actors = value
                        .split(",")
                        .map((a) => a.trim())
                        .filter(isValidActorName)
                    if (actors.length) movie.actors = actors
                }
                break
        }
    }

    if (Object.keys(movie).length) {
        if (
            isNonEmptyString(movie.title) &&
            isValidYear(movie.year) &&
            ALLOWED_FORMATS.includes(movie.format) &&
            Array.isArray(movie.actors) &&
            movie.actors.length > 0 &&
            movie.actors.every(isValidActorName)
        ) {
            movies.push(movie)
        }
    }

    return movies
}
