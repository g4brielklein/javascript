const dayStart = "07:30"
const dayEnd = "17:45"

function scheduleMeeting(startTime, durationMinutes) {
    const isStartTimeValid = startTime >= dayStart
    const isFinishTimeValid = (startTime + durationMinutes) <= dayEnd

    console.log(startTime, durationMinutes)
    console.log(startTime + durationMinutes)

    // return false if vialoted bounds, true if not
    return isStartTimeValid && isFinishTimeValid
}

const wasMeetingScheduled = scheduleMeeting("09:30", 30)

console.log(wasMeetingScheduled)
