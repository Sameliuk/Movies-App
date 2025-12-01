const uaAlphabet = [
    "А",
    "Б",
    "В",
    "Г",
    "Ґ",
    "Д",
    "Е",
    "Є",
    "Ж",
    "З",
    "И",
    "І",
    "Ї",
    "Й",
    "К",
    "Л",
    "М",
    "Н",
    "О",
    "П",
    "Р",
    "С",
    "Т",
    "У",
    "Ф",
    "Х",
    "Ц",
    "Ч",
    "Ш",
    "Щ",
    "Ь",
    "Ю",
    "Я",
]

const charOrder = {}

uaAlphabet.forEach((char, index) => {
    charOrder[char] = index
    charOrder[char.toLowerCase()] = index
})

export function compareUATitles(a, b) {
    const len = Math.max(a.length, b.length)
    for (let i = 0; i < len; i++) {
        const charA = a[i] || ""
        const charB = b[i] || ""

        const posA = charOrder[charA] ?? charA.toUpperCase().charCodeAt(0)
        const posB = charOrder[charB] ?? charB.toUpperCase().charCodeAt(0)

        if (posA < posB) return -1
        if (posA > posB) return 1
    }
    return 0
}
