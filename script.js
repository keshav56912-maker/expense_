// Get HTML elements
const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const date = document.getElementById("date");
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");

// Store expenses
let expenses = [];


// Add expense
expenseForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const expense = {
        name: expenseName.value,
        amount: Number(amount.value),
        category: category.value,
        date: date.value
    };

    expenses.push(expense);

    // Store expenses in localStorage
    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    displayExpenses();

    // Clear the form
    expenseForm.reset();
});


// Display expenses
function displayExpenses() {

    expenseList.innerHTML = "";

    let total = 0;

    expenses.forEach(function (expense, index) {

        total += expense.amount;

        const expenseCard = document.createElement("div");

        expenseCard.className = "border rounded p-3 mb-3";

        expenseCard.innerHTML = `
            <div class="row align-items-center">

                <div class="col-md-3">
                    <strong>${expense.name}</strong>
                </div>

                <div class="col-md-2">
                    ₹${expense.amount}
                </div>

                <div class="col-md-2">
                    ${expense.category}
                </div>

                <div class="col-md-2">
                    ${expense.date}
                </div>

                <div class="col-md-3 text-md-end">

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="deleteExpense(${index})"
                    >
                        Delete
                    </button>

                </div>

            </div>
        `;

        expenseList.appendChild(expenseCard);
    });

    totalAmount.textContent = total;
}


// Delete expense
function deleteExpense(index) {

    expenses.splice(index, 1);

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    displayExpenses();
}
