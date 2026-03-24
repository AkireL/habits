import { MAX_HABITS } from "../shared/dictionary.js";

export class ListHabits {
    #habits = [];

    addHabit(habit) {
        if (this.#habits.length > MAX_HABITS) {
            return null;
        }

        try {
            this.#habits.push(habit);
            return habit;
        } catch (error) {
            return null;
        }
    }

    getHabits() {
        return this.#habits;
    }

    trackHabit(habitId, date) {
        const habit = this.#habits.find((h) => h.id === habitId)

        if (!habit) {
            return null;
        }
        return habit.registerCheckIn(date);
    }

    removeLog(habitId, date) {
        const habit = this.#habits.find((h) => h.id === habitId);
        if (habit) {
            habit.removeCheckIn(date);
        }
    }

    logHabit(habitId, date) {
        const habit = this.#habits.find((h) => h.id === habitId);

        if (!habit) {
            return null;
        }

        return habit.registerCheckIn(date);
    }
}