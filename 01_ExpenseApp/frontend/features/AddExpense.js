let editElement = null;
let editId = null;

async function addExpense(event) {
    event.preventDefault();
    const expenseInfo = {
        amount: event.target.amount.value,
        description: event.target.description.value,
        category: event.target.category.value,
    };
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post("http://localhost:4000/expense/add", expenseInfo, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        console.log(response.data);
        alert("Expense Details Added Successfully");
        displayExpenses(response.data);
        event.target.reset();
    } catch (error) {
        console.log(error);
    }
}

function displayExpenses(expenseInfo) {
    const expenses = document.querySelector("ul");
    const expenseList = document.createElement("li");
    expenseList.appendChild(document.createTextNode(`
        ${expenseInfo.amount}-${expenseInfo.description}-${expenseInfo.category}
    `));

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    expenses.appendChild(expenseList);
    expenseList.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", () => deleteExpense(expenseInfo.id, expenseList));
}

async function deleteExpense(id, expenseList) {
    const token = localStorage.getItem('token');
    try {
        await axios.delete(`http://localhost:4000/expense/delete/${id}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        expenseList.remove();
        alert("Expense Removed Successfully");
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get('http://localhost:4000/expense/get', {
            headers: { "Authorization": `Bearer ${token}` }
        });
        response.data.forEach(expense => {
            displayExpenses(expense);
        });
    } catch (error) {
        console.log(error);
    }
});
