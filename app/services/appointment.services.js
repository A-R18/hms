const dayjs = require("dayjs");
const customParseFormat = require("../../node_modules/dayjs/plugin/customParseFormat.js");
const duration = require("../../node_modules/dayjs/plugin/duration.js");
dayjs.extend(customParseFormat);
dayjs.extend(duration);

const generateAllSlots = (start, end, slot_dur) => {
    const startTime = dayjs(start, "HH:mm");
    const endTime = dayjs(end, "HH:mm");
    const docSlotDuration = dayjs.duration(slot_dur, "minutes");
    let generatedSlots = [];
    let i = startTime;
    while (i.isBefore(endTime)) {
        generatedSlots.push(i.format("HH:mm:ss"));
        i = i.add(docSlotDuration);
    }
    return generatedSlots;
}
const generateFilteredSlots = (existingSlots, start_T, end_T, slotDur) => {
    const totalSlots = generateAllSlots(start_T, end_T, slotDur);
    const bookedSlots = existingSlots;
    const filteredSlots = totalSlots.filter(slot=>!bookedSlots.includes(slot));
    return filteredSlots;
    

}

module.exports = { generateAllSlots, generateFilteredSlots };

// If coming daynumber is less than 1 or greater than 6 send error that appointment can't be registered for sunday!