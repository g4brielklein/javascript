function randMax(max) {
    return Math.trunc(1E9 * Math.random()) % max
}

var reel = {
    symbols: ["X", "Y", "Z", "W", "$", "*", "<", "@"],
    spin: () => {
        console.log(this.symbols)

        if (this.position == null) {
            this.position = randMax(this.symbols.length - 1)
        }

        this.position = (this.position + 100 + randMax(100) % this.symbols.length)
    },
    display: () => {
        if (this.position == null) {
            this.position = randMax(this.symbols.length - 1)
        }

        return this.symbols[this.position]
    }
}

var slotMachine = {
    reels: [
        Object.create(reel),
        Object.create(reel),
        Object.create(reel)
    ],
    spin: () => {
        console.log(this.reels)
    }
}

console.log(slotMachine.reels[0])
slotMachine.reels[0].position = 0
slotMachine.reels[1].position = 1
slotMachine.reels[2].position = 2
console.log(slotMachine.reels)
