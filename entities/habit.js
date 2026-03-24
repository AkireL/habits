import { DailyStreakCalculator } from "../services/dailyStreakCalculator.js";
import { EveryOtherDayCalculator } from "../services/everyOtherDayCalculator.js";
import { WeeklyStreakCalculator } from "../services/weeklyStreakCalculator.js";
import { LogTracker } from "./logTracker.js";


const STREAK_CALCULATOR = {
    "daily": new DailyStreakCalculator(),
    "weekly": new WeeklyStreakCalculator(),
    "every_other_day": new EveryOtherDayCalculator(),
}

export class Habit {
    #id;
    #name;
    #frequency;
    #createdAt;
    #tracker;

    static createdId() {
        return Date.now() + Math.floor(Math.random() * 1000)
    }

    static daily(name) {
        return new Habit(name, 'daily');
    }

    static weekly(name) {
        return new Habit(name, 'weekly');
    }

    constructor(name, frequency) {
        this.#id = Habit.createdId();
        this.name = name;
        this.frequency = frequency;
        this.#createdAt = new Date().toISOString();
        this.#tracker = new LogTracker();
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get frequency() {
        return this.#frequency;
    }

    get createdAt() {
        return this.#createdAt;
    }

    set name(value) {
        let newValue = value?.trim() ?? '';
        if (newValue.length <= 3) {
            throw new Error("El nombre debe ser mayor a tres caracteres.")
        }

        this.#name = newValue;
    }

    set frequency(value) {
        const newValue = value?.trim() ?? '';

        if (newValue.length <= 0) {
            throw new Error("Ingrese frecuencia");
        }

        const frequencies = ["weekly", "daily", "monthly", "yearly", "every_other_day"];

        if (!frequencies.includes(newValue)) {
            throw new Error("Frecuencia incorrecta.");
        }

        this.#frequency = newValue;
    }

    toDisplayString() {
        return `${this.name} - ${this.frequency}`;
    }

    registerCheckIn(date) {
        const createdAt = this.#tracker.addLog(date)
        if (!createdAt) {
            return null;
        }
        return {
            habitId: this.id,
            date: date
        }
    }

    getLogs() {
        return this.#tracker.getLogs();
    }

    removeCheckIn(date) {
        return this.#tracker.removeLogs(date);
    }

    calculateStreak(today = new Date) {
        const calculator = STREAK_CALCULATOR[this.frequency];
        if (!calculator) {
            throw new Error("Racha no soportada.");
        }

        return calculator.calculate(this.getLogs(), today);
    }
}