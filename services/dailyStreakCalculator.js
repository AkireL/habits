export class DailyStreakCalculator {
    calculate(logs, today) {
        if (logs.length === 0) {
            return 0;
        }

        const sortedLogs = [...logs].sort((a, b) => b.localeCompare(a));

        let streak = 0;
        let currentDate = new Date(today);
        currentDate.setHours(0, 0, 0, 0);

        for (let i = 0; i < sortedLogs.length; i++) {
            const expectedDate = this.#getDateString(currentDate);
            if (sortedLogs[i] === expectedDate) {
                streak++;
                currentDate.setDate(currentDate.getDate() - 1);
            } else {
                break;
            }
        }

        return streak;
    }

    #getDateString(date) {
        return date.toISOString().split('T')[0];
    }
}