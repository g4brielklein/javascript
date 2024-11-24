function range(start, end) {
    start = Number(start) || 0

    if (end === undefined) {
        return function range(end) {
            return getRange(start, end)
        }
    }

    return getRange(start, end)
    
    function getRange(start, end) {
        end = Number(end) || 0

        if (start > end) {
            return []
        }

        const rangeArray = []

        for (let i = start; i <= end; i++) {
            rangeArray.push(i)
        }
    
        return rangeArray
    }
}

// console.log(range(5, 8))

const returnedData = range(3)

console.log(returnedData(10))
