const form = document.querySelector('form');
const allExpensesContainer = document.getElementById('all-expenses');


function addExpenseToLocalStorage(expense) {
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));
}


function displayAllExpenses() {
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  allExpensesContainer.innerHTML = '';

  expenses.forEach((expense, index) => {
    const expenseElement = document.createElement('div');
    expenseElement.classList.add('expense-item');

    expenseElement.innerHTML = `
      <p><strong>Amount:</strong> Rs. ${expense.amount}</p>
      <p><strong>Description:</strong> ${expense.description}</p>
      <p><strong>Category:</strong> ${expense.category}</p>
      <button class="btn btn-danger" onclick="deleteExpense(${index})">Delete</button>
      <button class="btn btn-primary" onclick="editExpense(${index})">Edit</button>
    `;

    allExpensesContainer.appendChild(expenseElement);
  });
}


function deleteExpense(index) {
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  displayAllExpenses();
}


function editExpense(index) {
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  const expenseToEdit = expenses[index];
  const amountInput = document.getElementById('amount');
  const descriptionInput = document.getElementById('Desc');
  const categoryInput = document.getElementById('category');


  amountInput.value = expenseToEdit.amount;
  descriptionInput.value = expenseToEdit.description;
  categoryInput.value = expenseToEdit.category;


  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));

  displayAllExpenses();
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const amount = document.getElementById('amount').value;
  const description = document.getElementById('Desc').value;
  const category = document.getElementById('category').value;

  if (amount && description && category) {
    const expense = {
      amount,
      description,
      category,
    };

    addExpenseToLocalStorage(expense);
    displayAllExpenses();
    form.reset();
  }
});

displayAllExpenses();
