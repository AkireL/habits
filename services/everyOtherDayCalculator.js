export class EveryOtherDayCalculator
{
    calculate(logs, today) {
        if (logs.length === 0) {
            return 0;
        }

        const sortedLogs = [...logs].sort((a, b) => b.localeCompare(a));
        const todayDate = new Date(today);
        todayDate.setHours(0, 0, 0, 0);
        const streakToday = this.#calculateStreak(sortedLogs, todayDate);
        const yesterday = new Date(todayDate);
        yesterday.setDate(yesterday.getDate() - 1);
        const streakYesterday = this.#calculateStreak(sortedLogs, yesterday);

        return Math.max(streakToday, streakYesterday);
    }

    #calculateStreak(sortedLogs, startDate) {
        let streak = 0;
        let currentDate = new Date(startDate);

        for (let i = 0; i < sortedLogs.length; i++) {
            const expectedDate = this.#getDateString(currentDate);

            if (sortedLogs[i] === expectedDate) {
                streak++;
                currentDate.setDate(currentDate.getDate() - 2);
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