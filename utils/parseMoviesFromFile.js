import fs from "fs"
import readline from "readline"

export default async function parseMoviesFromFile(filePath) {
    const movies = []

    const fileStream = fs.createReadStream(filePath)
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    })

    let movie = {}

    for await (const line of rl) {
        if (!line.trim()) {
            if (Object.keys(movie).length) {
                movies.push(movie)
                movie = {}
            }
            continue
        }

        const [keyRaw, ...rest] = line.split(":")
        const key = keyRaw.trim().toLowerCase()
        const value = rest.join(":").trim()

        switch (key) {
            case "title":
                movie.title = value
                break
            case "release year":
            case "year":
                movie.year = Number(value)
                break
            case "format":
                movie.format = value
                break
            case "stars":
            case "actors":
                movie.actors = value.split(",").map((a) => a.trim())
                break
        }
    }

    if (Object.keys(movie).length) {
        movies.push(movie)
    }

    return movies
}
