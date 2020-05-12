class AddExpenseController {
    constructor() {
        this.valid = [];
        this.inputEl = document.querySelectorAll('.form-control');
        this.setExpenseToPage();
        this.initEvents();

        let id = localStorage.getItem('id');

        if (!id) {
            localStorage.setItem('id', 0);
        }
    }

    initEvents() {
        
        let btnCad = document.querySelector('#btnCad');
        let btnSearch = document.querySelector('#btnSearch');

        let cadExpenses = {};

        if (btnCad) {

            btnCad.addEventListener('click', event => {

                let fields = this.inputEl;

                fields.forEach(field => {

                    cadExpenses[field.id] = field.value;
                    this.valid.push(field.value);

                });

                this.validateData(cadExpenses);

            });
        }

        if (btnSearch) {
            btnSearch.addEventListener('click', event => {
                let fields = this.inputEl;

                fields.forEach(field => {

                    cadExpenses[field.id] = field.value;
                    this.valid.push(field.value);


                });
                this.expenseFilter(cadExpenses);
            });
        }

    }

    validateData(expense) {

        if (this.valid.indexOf('') > -1) {

            this.alertModal(false);
            this.valid = [];
            return false;

        } else {

            this.alertModal();

        }

        this.valid = [];

        let expenseData = new Expense(
            expense.year,
            expense.month,
            expense.day,
            expense.type,
            expense.description,
            expense.expenseValue
        );

        expenseData.save();

        this.clearFields();

    }

    alertModal(success = true) {
        if (success) {
            document.querySelector('#modal-title').innerHTML = 'Cadastro efetuado com sucesso!';
            document.querySelector('#modal-title').className = 'modal-title text-success';
            document.querySelector('.modal-body').innerHTML = 'Sua despesa foi cadastrada com sucesso.';
            document.querySelector('#modal-btn').innerHTML = 'Fechar';
            document.querySelector('#modal-btn').className = 'btn btn-success';
            $('#alertModal').modal('show');
        } else {
            document.querySelector('#modal-title').innerHTML = 'Erro ao efetuar o cadastro!';
            document.querySelector('#modal-title').className = 'modal-title text-danger';
            document.querySelector('.modal-body').innerHTML = 'Alguns campos obrigatórios não foram preenchidos, verifique e tente novamente.';
            document.querySelector('#modal-btn').innerHTML = 'corrigir';
            document.querySelector('#modal-btn').className = 'btn btn-danger';
            $('#alertModal').modal('show');
        }
    }

    clearFields() {

        this.inputEl.forEach(field => {

            field.value = '';

        });

    }

    setExpenseToPage() {
        let expense = new Expense();
        let expenses = expense.getStorageExpenses();
        let tableBody = document.querySelector('tbody');

        if (tableBody) {

            expenses.forEach(e => {

                switch (e.type) {
                    case '1':
                        e.type = 'Alimentação';
                        break;
                    case '2':
                        e.type = 'Educação';
                        break;
                    case '3':
                        e.type = 'Lazer';
                        break;
                    case '4':
                        e.type = 'Saúde';
                        break;
                    case '5':
                        e.type = 'Transporte';
                        break;
                }

                let row = tableBody.insertRow();

                let btnDelete = document.createElement('button');
                btnDelete.className = 'btn btn-danger';
                btnDelete.innerHTML = '<i class="fas fa-times"></i>';
                btnDelete.id = `${e.id}`;
                btnDelete.addEventListener('click', e => {

                    let expenseObj = new Expense();
                    expenseObj.delete(btnDelete.id);
                    window.location.reload();

                })

                row.insertCell(0).innerHTML = `${e.day}/${e.month}/${e.year}`;
                row.insertCell(1).innerHTML = `${e.type}`;
                row.insertCell(2).innerHTML = `${e.description}`;
                row.insertCell(3).innerHTML = `R$ ${e.expenseValue}`;
                row.insertCell(4).appendChild(btnDelete);

            });

        }

    }

    expenseFilter(expense) {

        let expenses = new Expense();
        let storage = expenses.getStorageExpenses();
        let tableExpense = document.querySelector('tbody');

        if (expense.year != '') {
            storage = storage.filter(e => e.year == expense.year);
        }

        if (expense.month != '') {
            storage = storage.filter(e => e.month == expense.month);
        }

        if (expense.day != '') {
            storage = storage.filter(e => e.day == expense.day);
        }

        if (expense.type != '') {
            storage = storage.filter(e => e.type == expense.type);
        }

        if (expense.description != '') {
            storage = storage.filter(e => e.description == expense.description);
        }

        if (expense.expenseValue != '') {
            storage = storage.filter(e => e.expenseValue == expense.expenseValue);
        }

        tableExpense.innerHTML = '';

        storage.forEach(e => {
       
            switch (e.type) {
                case '1':
                    e.type = 'Alimentação';
                    break;
                case '2':
                    e.type = 'Educação';
                    break;
                case '3':
                    e.type = 'Lazer';
                    break;
                case '4':
                    e.type = 'Saúde';
                    break;
                case '5':
                    e.type = 'Transporte';
                    break;
            }

            let row = tableExpense.insertRow();

            let btnDelete = document.createElement('button');
            btnDelete.className = 'btn btn-danger';
            btnDelete.innerHTML = '<i class="fas fa-times"></i>';
            btnDelete.id = `${e.id}`;
            btnDelete.addEventListener('click', e => {

                let expenseObj = new Expense();
                expenseObj.delete(btnDelete.id);
                window.location.reload();

            })

            row.insertCell(0).innerHTML = `${e.day}/${e.month}/${e.year}`;
            row.insertCell(1).innerHTML = `${e.type}`;
            row.insertCell(2).innerHTML = `${e.description}`;
            row.insertCell(3).innerHTML = `R$${e.expenseValue}`;
            row.insertCell(4).appendChild(btnDelete);

        });

    }

}