import { showMessage } from "./toaster.js";

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
  }
}

export function closeModal(modalId) {
  const modal = document.getElementById(modalId);

  if (modal) {
    modal.classList.remove('active');
  }
}

export function setupModalListeners(habits) {
  document.getElementById('openCreateModal').addEventListener('click', () => {
    openModal('createHabitModal');
  });

  document.getElementById('openRegisterModal').addEventListener('click', () => {
    if (habits.getHabits().length === 0) {
      showMessage('Primero crea un hábito', 'error');
      return;
    }
    openModal('registerModal');
  });

  document.querySelectorAll('.close-modal').forEach((btn) => {
    btn.addEventListener('click', function () {
      closeModal(this.dataset.modal);
    });
  });

  document.querySelectorAll('.btn-secondary').forEach((btn) => {
    btn.addEventListener('click', function () {
      const modalId = this.dataset.modal;
      if (modalId) {
        closeModal(modalId);
      }
    });
  });

  document.querySelectorAll('.modal').forEach((modal) => {
    modal.addEventListener('click', function (e) {
      if (e.target === this) {
        this.classList.remove('active');
      }
    });
  });
}