function createEmployeeRecord([firstName, familyName, title, payPerHour]){
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(arrayOfArrays){
    return arrayOfArrays.map(createEmployeeRecord)
}

function createTimeInEvent(record, time){
    const [date, hour] = time.split(' ')

    record.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date,
    });

    return record;
}

function createTimeOutEvent(record, time){
    const [date, hour] = time.split(' ')

    record.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date,
    })

    return record;
}

function hoursWorkedOnDate(record, date){
    const timeInEvent = record.timeInEvents.find((e) => e.date === date);
    const timeOutEvent = record.timeOutEvents.find((e) => e.date === date)
    const hoursWorked = timeOutEvent.hour/100 - timeInEvent.hour/100
    return hoursWorked
}

function wagesEarnedOnDate(record, date){
    const hoursWorked = hoursWorkedOnDate(record, date)
    const actualPay = hoursWorked * record.payPerHour
    return actualPay
}

function allWagesFor(record){
    const allDates = record.timeInEvents.map((e) => e.date);
    const totalWages = allDates.reduce((acc, date) => acc + wagesEarnedOnDate(record, date), 0)
    return totalWages;
}

function calculatePayroll(records){
    const totalPayroll = records.reduce((acc, employee) => acc + allWagesFor(employee), 0);
    return totalPayroll
}