
export function getCurrentMonthDays(date = new Date) {
  const dates = [];
  const today = date;
  const year = today.getFullYear();
  const month = today.getMonth();
  const currentDay = today.getDate();

  for (let day = 1; day <= currentDay; day++) {
    const date = new Date(year, month, day);
    dates.push(date.toISOString().split('T')[0]);
  }

  return dates;
}


export function monthName(index)
{
    const months = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
    ];

    return months[index];
}

export function dayName(number = 0)
{
    number = Number(number) ?? 0;
    
    const days = [
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
        'Domingo',
    ]
    number = number >= 7 ? 0: number;

    return days[number];
}