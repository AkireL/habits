import { Habit } from "../../entities/habit.js";
import { closeModal } from "./renderModal.js";
import { showMessage } from "./toaster.js";
import { getCurrentMonthDays } from "../../shared/utils.js";
import { MAX_HABITS } from "../../shared/dictionary.js";

export function renderHabits(habits) {
  const habitsTable = document.getElementById('habitsTable');
  const habitSelect = document.getElementById('habitSelect');
  const createHabitBtn = document.getElementById('openCreateModal');

  if (habits.getHabits().length === 0) {
    habitsTable.innerHTML =
      '<p class="empty-state">No hay hábitos. Haz clic en "Crear Hábito" para comenzar.</p>';
    habitSelect.innerHTML = '<option value="">Selecciona un hábito</option>';
    createHabitBtn.style.display = 'block';
    return;
  }

  if (habits.getHabits().length >= MAX_HABITS) {
    createHabitBtn.style.display = 'none';
  } else {
    createHabitBtn.style.display = 'block';
  }

  const monthDays = getCurrentMonthDays();

  const headerRow = `
    <div class="habit-row habit-header">
      <span class="habit-day-label">Día</span>
      ${habits.getHabits().map((habit) => `<span class="habit-name">${habit.name}</span>`).join('')}
    </div>
  `;

  const dayRows = monthDays
    .map((date, index) => {
      const dateObj = new Date(date + 'T00:00:00');
      const dayLabel = String(dateObj.getDate()).padStart(2, '0');

      return `
        <div class="habit-row">
          <span class="habit-day">${dayLabel}</span>
          ${habits.getHabits()
            .map((habit) => {
              const habitLogs = habit.getLogs();
              const isChecked = habitLogs.includes(date);
              return `<div class="habit-checkbox ${isChecked ? 'checked' : ''}" 
                         data-habit-id="${habit.id}" 
                         data-date="${date}"></div>`;
            })
            .join('')}
        </div>
      `;
    })
    .join('');

  habitsTable.innerHTML = headerRow + dayRows;

  habitSelect.innerHTML =
    '<option value="">Selecciona un hábito</option>' +
    habits.getHabits().map((habit) => `<option value="${habit.id}">${habit.name}</option>`).join('');

  attachCheckboxListeners(habits);
}

function attachCheckboxListeners(habits) {
  document.querySelectorAll('.habit-checkbox').forEach((checkbox) => {
    checkbox.addEventListener('click', function () {
      const habitId = parseInt(this.dataset.habitId);
      const date = this.dataset.date;

      if (this.classList.contains('checked')) {
        habits.removeLog(habitId, date);
        this.classList.remove('checked');
        showMessage('Check-in removido', 'success');
      } else {
        const log = habits.logHabit(habitId, date);
        if (log) {
          this.classList.add('checked');
          showMessage('Check-in registrado', 'success');
        }
      }
    });
  });
}

export function renderBtn(habits) {
    document.getElementById('createHabitBtn').addEventListener('click', () => {
        const name = document.getElementById('habitName').value;
        const frequency = document.getElementById('habitFrequency').value;

        const habit = new Habit(name, frequency);

        if (habit) {
            showMessage(`Hábito "${habit.name}" creado exitosamente`, 'success');
            document.getElementById('habitName').value = '';
            habits.addHabit(habit);
            renderHabits(habits);
            closeModal('createHabitModal');

            if (habits.getHabits().length >= MAX_HABITS) {
                showMessage('Has alcanzado el límite máximo de 5 hábitos', 'success');
            }
        }
    });

    document.getElementById('checkInBtn').addEventListener('click', () => {
        const habitId = parseInt(document.getElementById('habitSelect').value);
        const date = document.getElementById('checkInDate').value;

        if (!habitId || !date) {
            showMessage('Selecciona un hábito y una fecha', 'error');
            return;
        }

        const log = habits.trackHabit(habitId, date);
        
        if (log) {
            const habit = habits.getHabits().find((h) => h.id === habitId);
            showMessage(`Check-in registrado para ${habit.name}`, 'success');
            renderHabits(habits);
            closeModal('registerModal');
        }
    });
}