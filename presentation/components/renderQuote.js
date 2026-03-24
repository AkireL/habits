const motivationalQuotes = [
  'La fuerza no viene de la capacidad. Viene de la voluntad.',
  'El éxito es la suma de pequeños esfuerzos repetidos día tras día.',
  'No esperes. El momento nunca será perfecto.',
  'El único modo de hacer un gran trabajo es amar lo que haces.',
  'El futuro pertenece a quienes creen en la belleza de sus sueños.',
  'Tu tiempo es limitado, no lo desperdicies viviendo la vida de otros.',
  'El fracaso es la oportunidad de empezar de nuevo con más inteligencia.',
  'No cuentes los días, haz que los días cuenten.',
  'La disciplina es el puente entre metas y logros.',
  'Pequeños pasos diarios llevan a grandes cambios.',
  'La persistencia es el camino del éxito.',
  'Hoy es el primer día del resto de tu vida.',
  'El secreto para avanzar es empezar.',
  'Cada día es una nueva oportunidad para ser mejor.',
  'Los límites solo existen en tu mente.',
  'La acción es la clave fundamental para todo éxito.',
  'Transforma tus hábitos, transforma tu vida.',
  'El progreso es progreso, no importa lo pequeño que sea.',
  'La consistencia vence al talento.',
  'Hoy es el mañana que esperabas ayer.',
];

function getRandomQuote()
{
    return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
}

export function renderQuote() {
  const savedQuote = document.getElementById('savedQuote');
  savedQuote.textContent = getRandomQuote() || 'Escribe tu frase del día...';
}