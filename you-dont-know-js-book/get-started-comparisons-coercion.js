const dayStart = "07:30"
const dayEnd = "17:45"

function scheduleMeeting(startTime, durationMinutes) {
    const [h, m] = startTime.split(':')
    const date = new Date()
    date.setUTCHours(h, m, 0)
    const meetingStartHour = date.getUTCHours() >= 10 ? date.getUTCHours() : `0${date.getUTCHours()}`
    const meetingStartTime = `${meetingStartHour}:${date.getMinutes()}`
    
    const isStartTimeValid = meetingStartTime >= dayStart

    const sum = date.getMinutes() + durationMinutes
    date.setMinutes(sum)
    const meetingEndHour = date.getUTCHours() >= 10 ? date.getUTCHours() : `0${date.getUTCHours()}`
    const meetingEndTime = `${meetingEndHour}:${date.getMinutes()}`

    const isEndTimeValid = meetingEndTime <= dayEnd

    // return false if vialoted bounds, true if not
    return isStartTimeValid && isEndTimeValid
}

const wasMeetingScheduled = scheduleMeeting("09:30", 30)

console.log(wasMeetingScheduled)
