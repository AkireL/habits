import { Habit } from "../../entities/habit.js";
import { ListHabits } from "../../services/listHabit.js";
import { setupModalListeners } from "../components/renderModal.js";
import { renderQuote } from "../components/renderQuote.js";
import { renderBtn, renderHabits } from "../components/renderUI.js";

function initApp() {
    const demoHabit1 = Habit.daily('Leer');
    demoHabit1.registerCheckIn('2026-03-10');
    demoHabit1.registerCheckIn('2026-03-11');
    demoHabit1.registerCheckIn(new Date().toDateString());

    const demoHabit2 = Habit.weekly('Estudiar');
    demoHabit2.registerCheckIn('2026-03-06');
    demoHabit2.registerCheckIn('2026-03-13');

    const demoHabit3 = Habit.weekly('Nadar');
    demoHabit3.registerCheckIn('2026-03-06');
    demoHabit3.registerCheckIn('2026-03-13');

    const listHabits = new ListHabits()
    listHabits.addHabit(demoHabit1)
    listHabits.addHabit(demoHabit2)
    listHabits.addHabit(demoHabit3)
    setupModalListeners(listHabits)
    renderHabits(listHabits)
    renderQuote()
    renderBtn(listHabits)
}

document.addEventListener('DOMContentLoaded', initApp);