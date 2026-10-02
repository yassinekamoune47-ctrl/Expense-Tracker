const form = document.getElementById("transactionForm");

const descriptionInput =
    document.getElementById("description");

const amountInput =
    document.getElementById("amount");

const typeInput =
    document.getElementById("type");

const transactionList =
    document.getElementById("transactionList");

const balanceElement =
    document.getElementById("balance");

const incomeElement =
    document.getElementById("income");

const expenseElement =
    document.getElementById("expense");


let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];


// =========================
// ADD TRANSACTION
// =========================

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const description =
        descriptionInput.value.trim();

    const amount =
        Number(amountInput.value);

    const type =
        typeInput.value;


    if (description === "") {

        alert("Enter a description");

        return;
    }


    if (amount <= 0) {

        alert("Enter a valid amount");

        return;
    }


    const transaction = {

        id: Date.now(),

        description: description,

        amount: amount,

        type: type

    };


    // Add transaction
    transactions.push(transaction);

    // Save transaction
    saveTransactions();

    // Display transactions
    renderTransactions();

    // Clear form
    form.reset();

});


// =========================
// RENDER TRANSACTIONS
// =========================

function renderTransactions() {

    transactionList.innerHTML = "";


    transactions.forEach(function(transaction) {

        const li =
            document.createElement("li");


        if (transaction.type === "income") {

            li.classList.add("income-item");

        } else {

            li.classList.add("expense-item");

        }


        const sign =
            transaction.type === "income"
                ? "+"
                : "-";


        li.innerHTML = `

            <div class="transaction-info">

                <strong>
                    ${transaction.description}
                </strong>

                <span class="transaction-amount">

                    ${sign}${transaction.amount} DH

                </span>

            </div>


            <button class="delete-btn">
                Delete
            </button>

        `;


        const deleteBtn =
            li.querySelector(".delete-btn");


        deleteBtn.addEventListener("click", function() {

            deleteTransaction(transaction.id);

        });


        transactionList.appendChild(li);

    });


    updateSummary();

}


// =========================
// DELETE TRANSACTION
// =========================

function deleteTransaction(id) {

    transactions =
        transactions.filter(function(transaction) {

            return transaction.id !== id;

        });


    saveTransactions();

    renderTransactions();

}


// =========================
// UPDATE SUMMARY
// =========================

function updateSummary() {

    let income = 0;

    let expense = 0;


    transactions.forEach(function(transaction) {

        if (transaction.type === "income") {

            income += transaction.amount;

        } else {

            expense += transaction.amount;

        }

    });


    const balance =
        income - expense;


    incomeElement.textContent =
        `${income} DH`;

    expenseElement.textContent =
        `${expense} DH`;

    balanceElement.textContent =
        `${balance} DH`;

}


// =========================
// SAVE TRANSACTIONS
// =========================

function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}


// =========================
// INITIAL DISPLAY
// =========================

renderTransactions();
