export const isEmptyOrSpaces = (value) =>
    typeof value !== "string" || value.trim().length === 0

export const isValidYear = (year) => {
    const currentYear = new Date().getFullYear()
    return Number.isInteger(year) && year >= 1850 && year <= currentYear
}

export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const isValidActorName = (name) =>
    /^[A-Za-zА-Яа-яЇїІіЄєҐґ'.,\-\s]+$/.test(name.trim())
