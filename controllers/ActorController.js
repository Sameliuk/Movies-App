import ActorService from "../services/ActorService.js"

const actorService = new ActorService()

export default class ActorController {
    async addActor(req, res) {
        try {
            const actor = await actorService.addActor(req.body)
            res.status(201).json({ status: 1, data: actor })
        } catch (err) {
            res.status(400).json({ status: 0, message: err.message })
        }
    }

    async getActorById(req, res) {
        const actor = await actorService.getActorById(req.params.id)
        if (!actor)
            return res
                .status(404)
                .json({ status: 0, message: "Actor not found" })
        res.status(200).json({ status: 1, data: actor })
    }

    async getActorByName(req, res) {
        const actor = await actorService.getActorByName(req.params.name)
        if (!actor)
            return res
                .status(404)
                .json({ status: 0, message: "Actor not found" })
        res.status(200).json({ status: 1, data: actor })
    }

    async getAllActors(req, res) {
        const actors = await actorService.getAllActors()
        res.status(200).json({ status: 1, data: actors })
    }
}
