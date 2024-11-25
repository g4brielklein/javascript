function randMax(max) {
    return Math.trunc(1E9 * Math.random()) % max
}

const reel = {
    symbols: ["X", "Y", "Z", "W", "$", "*", "<", "@"],
    spin: function() {
        if (this.position == null) {
            this.position = randMax(this.symbols.length - 1)
        }

        this.position = (this.position + 100 + randMax(100)) % this.symbols.length
    },
    display: function() {
        if (this.position == null) {
            this.position = randMax(this.symbols.length - 1)
        }

        return this.symbols[this.position]
    }
}

const slotMachine = {
    reels: [
        Object.create(reel),
        Object.create(reel),
        Object.create(reel)
    ],
    spin: function() {
        this.reels.forEach((reel) => {
            reel.spin()
        })
    },
    display: function() {
        let rows = []

        for (let i = -1; i <= 1; i++ ) {
            let row = this.reels.map((reel) => {
                let slot = Object.create(reel)
                slot.position = (reel.symbols.length + reel.position + i) % reel.symbols.length

                return slot.display()
            })

            rows.push(row.join(' | '))
        }

        console.log(rows.join('\n'))
    }
}

slotMachine.spin()
slotMachine.display()
