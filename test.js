import { Habit } from "./habit.js";

const swimming = new Habit("swimming", "daily");
const reading = new Habit("reading", "every_other_day");

swimming.registerCheckIn("2026-01-06")
swimming.registerCheckIn("2026-01-09")
swimming.registerCheckIn("2026-01-10")
swimming.registerCheckIn("2026-01-11")
swimming.registerCheckIn("2026-01-12")

// const streakSwimming = swimming.calculateStreak(new Date("2026-01-13"))

reading.registerCheckIn("2026-01-05")
reading.registerCheckIn("2026-01-07")
reading.registerCheckIn("2026-01-09")

const streakReading = reading.calculateStreak(new Date("2026-01-11"))

// console.log(streakSwimming)
console.log(streakReading)