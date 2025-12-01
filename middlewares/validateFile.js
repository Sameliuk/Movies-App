export const validateFileType = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({
            status: 0,
            message: "No file uploaded",
        })
    }

    if (!req.file.originalname.endsWith(".txt")) {
        return res.status(415).json({
            status: 0,
            message: "Unsupported file format",
        })
    }

    next()
}

export default validateFileType
