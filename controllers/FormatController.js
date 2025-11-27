import FormatService from "../services/FormatService.js"

const formatService = new FormatService()

export default class FormatController {
    async addFormat(req, res) {
        try {
            const format = await formatService.addFormat(req.body)
            res.status(201).json({ status: 1, data: format })
        } catch (err) {
            res.status(400).json({ status: 0, message: err.message })
        }
    }

    async getFormatById(req, res) {
        const format = await formatService.getFormatById(req.params.id)
        if (!format)
            return res
                .status(404)
                .json({ status: 0, message: "Format not found" })
        res.status(200).json({ status: 1, data: format })
    }

    async getAllFormats(req, res) {
        const formats = await formatService.getAllFormats()
        res.status(200).json({ status: 1, data: formats })
    }

    async deleteFormat(req, res) {
        await formatService.deleteFormat(req.params.id)
        res.status(204).send()
    }
}
