export class WeeklyStreakCalculator {
    calculate(logs, today) {
        if (logs.length === 0) {
            return 0;
        }

        const weeks = this.#groupByWeek(logs);
        const sortedWeeks = Object.keys(weeks).sort((a, b) => b.localeCompare(a));

        let streak = 0;
        let expectedWeek = this.#getWeekKey(today);

        for (const week of sortedWeeks) {
            if (week === expectedWeek) {
                streak++;
                expectedWeek = this.#getPreviousWeek(expectedWeek);
            } else {
                break;
            }
        }

        return streak;
    }

    #groupByWeek(logs) {
        const weeks = {};
        logs.forEach((log) => {
            const weekKey = this.#getWeekKey(new Date(log + 'T00:00:00'));
            if (!weeks[weekKey]) {
                weeks[weekKey] = [];
            }
            weeks[weekKey].push(log);
        });
        return weeks;
    }

    #getWeekKey(date) {
        const year = date.getFullYear();
        const week = this.#getWeekNumber(date);
        return `${year}-W${String(week).padStart(2, '0')}`;
    }

    #getWeekNumber(date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        const yearStart = new Date(d.getFullYear(), 0, 1);
        const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
        return weekNo;
    }

    #getPreviousWeek(weekKey) {
        const [year, weekStr] = weekKey.split('-W');
        let week = parseInt(weekStr);
        let y = parseInt(year);

        week--;
        if (week < 1) {
            y--;
            week = 52;
        }

        return `${y}-W${String(week).padStart(2, '0')}`;
    }
}