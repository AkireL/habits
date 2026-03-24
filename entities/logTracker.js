export class LogTracker
{
    #dates = [];

    addLog(date)
    {

        if (typeof date != 'string' || date.length !== 10){
            return null;
        }

        this.#dates.push(date);
        return date;
    }

    getLogs()
    {
        return [...this.#dates];
    }

    removeLogs(date)
    {
        const index = this.#dates.findIndex((item) => item === date)
        if (index !== -1)
        {
            this.#dates.splice(index, 1)
            return true;
        }

        return false;
    }
}