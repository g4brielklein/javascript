const dayStart = "07:30"
const dayEnd = "17:45"
const timezoneOffset = -3

function scheduleMeeting(startTime, meetingDuration) {
    const dayStartTransformed = new Date(`2024-01-01 ${dayStart}`)
    dayStartTransformed.setHours(dayStartTransformed.getHours() + timezoneOffset)

    const dayEndTransformed = new Date(`2024-01-01 ${dayEnd}`)
    dayEndTransformed.setHours(dayEndTransformed.getHours() + timezoneOffset)

    const startTimeTransformed = new Date(`2024-01-01 ${startTime}`)
    startTimeTransformed.setHours(startTimeTransformed.getHours() + timezoneOffset)

    const endTimeTransformed = new Date(`2024-01-01 ${startTime}`)
    endTimeTransformed.setHours(endTimeTransformed.getHours() + timezoneOffset)
    endTimeTransformed.setMinutes(startTimeTransformed.getMinutes() + meetingDuration)

    return startTimeTransformed >= dayStartTransformed && endTimeTransformed <= dayEndTransformed
}

console.log(scheduleMeeting("14:00", 15))
