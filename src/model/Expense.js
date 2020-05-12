class Expense {
    constructor(year, month, day, type, description, expenseValue) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.type = type;
        this.description = description;
        this.expenseValue = expenseValue;
    }

    getNextId() {

        let nextId = localStorage.getItem('id');
        return parseInt(nextId) + 1;

    }

    save() {

        let expense = {
            year: this.year,
            month: this.month,
            day: this.day,
            type: this.type,
            description: this.description,
            expenseValue: this.expenseValue
        }

        localStorage.setItem(this.getNextId(), JSON.stringify(expense))
        localStorage.setItem('id', this.getNextId());

    }

    getStorageExpenses() {

        let expensesList = [];
        let id = localStorage.getItem('id');

        for (let i = 1; i <= id; i++) {
            let expense = JSON.parse(localStorage.getItem(i))
            if (expense === null) {
                continue;
            }
            expense.id = i;
            expensesList.push(expense);
        }

        return expensesList;

    }

    delete(id) {
        localStorage.removeItem(id);
    }


}