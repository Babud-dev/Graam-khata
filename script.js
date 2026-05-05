// Load saved data
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let total = JSON.parse(localStorage.getItem("total")) || 0;
let categoryTotals = JSON.parse(localStorage.getItem("categoryTotals")) || {};

// Save function
function saveData() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("total", JSON.stringify(total));
    localStorage.setItem("categoryTotals", JSON.stringify(categoryTotals));
}

// Add expense
function addExpense() {
    let desc = document.getElementById("desc").value;
    let amount = parseFloat(document.getElementById("amount").value);
    let category = document.getElementById("category").value;

    if (!desc || !amount) {
        alert("Enter valid data");
        return;
    }

    // Store data
    expenses.push({ desc, amount, category });

    total += amount;
    categoryTotals[category] = (categoryTotals[category] || 0) + amount;

    saveData();

    displayExpenses();
    showSuggestions();
}

// Show all expenses
function displayExpenses() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    expenses.forEach(exp => {
        let li = document.createElement("li");
        li.textContent = `${exp.desc} - ₹${exp.amount} (${exp.category})`;
        list.appendChild(li);
    });

    document.getElementById("total").textContent = total;
}

// Smart suggestions
function showSuggestions() {
    let suggestionBox = document.getElementById("suggestions");
    suggestionBox.innerHTML = "";

    if (categoryTotals["Food"] > 3000) {
        addSuggestion("⚠ You are spending too much on Food");
    }

    if (categoryTotals["Travel"] > 2000) {
        addSuggestion("⚠ Travel expenses are high");
    }

    if (total > 10000) {
        addSuggestion("⚠ Your total spending is very high");
    }

    if (total < 2000) {
        addSuggestion("✅ Good job saving money!");
    }
}

// Helper function
function addSuggestion(text) {
    let li = document.createElement("li");
    li.textContent = text;
    document.getElementById("suggestions").appendChild(li);
}

// Load data on start
displayExpenses();
showSuggestions();