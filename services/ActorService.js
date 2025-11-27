import ActorRepository from "../repositories/ActorRepository.js"

export default class ActorService {
    constructor() {
        this.actorRepository = new ActorRepository()
    }

    async addActor(actorData) {
        return this.actorRepository.add(actorData)
    }

    async getActorById(id) {
        return this.actorRepository.getById(id)
    }

    async getActorByName(name) {
        return this.actorRepository.getByName(name)
    }

    async getAllActors() {
        return this.actorRepository.getAll()
    }
}
