function randMax(max) {
    return Math.trunc(1E9 * Math.random()) % max
}

var reel = {
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

var slotMachine = {
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
        let rows = ['', '', '']

        for (let i = 0; i < rows.length; i++) {
            let reelCount = 0

            this.reels.forEach((reel) => {
                let reelLine = Object.create(reel)
                reelLine.spin()

                reelCount++

                reelCount < 3 
                    ? rows[i] += `${reelLine.display()} | `
                    : rows[i] += reelLine.display()
            })

            console.log(rows[i])
        }
    }
}

slotMachine.spin()
slotMachine.display()
