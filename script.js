const API_URL =
    "https://6ab92dbbf84897980b7271c0.mockapi.io/api/v1/expenses";


const expenseForm = document.getElementById("expenseForm");

const expenseName = document.getElementById("expenseName");

const amount = document.getElementById("amount");

const category = document.getElementById("category");

const date = document.getElementById("date");

const expenseList = document.getElementById("expenseList");

const totalAmount = document.getElementById("totalAmount");

const submitBtn = document.getElementById("submitBtn");


let editingId = null;


// Get expenses when page loads

document.addEventListener("DOMContentLoaded", function () {
    getExpenses();
});


// Add or update expense

expenseForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const expense = {
        name: expenseName.value,
        amount: Number(amount.value),
        category: category.value,
        date: date.value
    };


    try {

        if (editingId === null) {

            // POST - Add expense

            await fetch(API_URL, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(expense)
            });

        } else {

            // PUT - Update expense

            await fetch(`${API_URL}/${editingId}`, {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(expense)
            });

            editingId = null;

            submitBtn.textContent = "Add Expense";
        }


        expenseForm.reset();

        getExpenses();

    } catch (error) {

        console.error("Error:", error);

        alert("Something went wrong!");

    }

});


// GET - Get all expenses

async function getExpenses() {

    try {

        const response = await fetch(API_URL);

        const expenses = await response.json();

        displayExpenses(expenses);

    } catch (error) {

        console.error("Error:", error);

        expenseList.innerHTML =
            "<p class='text-danger'>Unable to load expenses.</p>";
    }
}


// Display expenses

function displayExpenses(expenses) {

    expenseList.innerHTML = "";

    let total = 0;


    if (expenses.length === 0) {

        expenseList.innerHTML =
            "<p class='text-muted'>No expenses added yet.</p>";

        totalAmount.textContent = "0";

        return;
    }


    expenses.forEach(function (expense) {

        total += Number(expense.amount);


        const expenseItem = document.createElement("div");

        expenseItem.className = "expense-item";


        expenseItem.innerHTML = `

            <div class="row align-items-center">

                <div class="col-md-3">

                    <h5>${expense.name}</h5>

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
                        class="btn btn-warning btn-sm me-2"
                        onclick="editExpense('${expense.id}')"
                    >
                        Edit
                    </button>


                    <button
                        class="btn btn-danger btn-sm"
                        onclick="deleteExpense('${expense.id}')"
                    >
                        Delete
                    </button>

                </div>

            </div>

        `;


        expenseList.appendChild(expenseItem);

    });


    totalAmount.textContent = total;

}


// Edit expense

async function editExpense(id) {

    try {

        const response = await fetch(`${API_URL}/${id}`);

        const expense = await response.json();


        expenseName.value = expense.name;

        amount.value = expense.amount;

        category.value = expense.category;

        date.value = expense.date;


        editingId = id;

        submitBtn.textContent = "Update Expense";


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {

        console.error("Error:", error);

        alert("Unable to edit expense.");

    }

}


// DELETE - Delete expense

async function deleteExpense(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete this expense?");


    if (!confirmDelete) {
        return;
    }


    try {

        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });


        getExpenses();

    } catch (error) {

        console.error("Error:", error);

        alert("Unable to delete expense.");

    }

}
