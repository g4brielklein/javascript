function range(start, end) {
    if (!end) {
        return function range(end) {
            const range = []

            for (let i = start; i <= end; i++) {
                range.push(i)
            }

            return range
        }
    }

    const range = []

    for (let i = start; i <= end; i++) {
        range.push(i)
    }

    return range
}

// console.log(range(5, 8))

const returnedData = range(3)

console.log(returnedData(5))
